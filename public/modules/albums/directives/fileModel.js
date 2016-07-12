'use strict';

angular.module('AlbumsModule')
    .directive('fileModel', ['$parse', '$q', function ($parse, $q) {

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';
            var resizeArea = document.getElementById(resizeAreaId);
            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
            }
            return resizeArea;
        }

        var resizeImage = function (origImage, filename, options) {
            var maxHeight = options.resizeMaxHeight || 1080;
            var maxWidth = options.resizeMaxWidth || 1920;
            var quality = 0.7;
            var type = 'image/jpeg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            //draw image on canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(origImage, 0, 0, width, height);

            // get the data from canvas as 70% jpg (or specified type).
            var dataURI =  canvas.toDataURL(type, quality);
            var arr = dataURI.split(',');
            var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            var fname = filename.substring(filename.lastIndexOf('/')+1, filename.lastIndexOf('.'));
            var file = new File([u8arr], fname + ".jpg", { type : type });
            return file; 
        };

        var createImage = function(url, callback) {
            var image = new Image();
            image.onload = function() {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var isMultiple = attrs.multiple;
                var modelSetter = model.assign;

                var doResizing = function(imageResult, callback) {
                    createImage(imageResult.url, function(image) {
                        var file = resizeImage(image, imageResult.name, scope);
                        imageResult._file = file;
                        callback(imageResult);
                    });
                };

                element.bind('change', function () {
                    var values = [];
                    angular.forEach(element[0].files, function (item) {

                        var imageResult = {
                            name: item.name,
                            size: item.size,
                            url: URL.createObjectURL(item),
                            _file: item
                        };

                        fileToDataURL(item).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        doResizing(imageResult, function(imageResult) {
                                values.push(imageResult);
                        });
                    });
                    scope.$apply(function () {
                        if (isMultiple) {
                            modelSetter(scope, values);
                        } else {
                            modelSetter(scope, values[0]);
                        }
                    });
                });
            }
        };
    }]);

