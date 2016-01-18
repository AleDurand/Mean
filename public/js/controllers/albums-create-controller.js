angular.module('meanApp')
.controller('AlbumsCreateController', function($http) {
	var controller = this;
	this.saveAlbum = function(album) {
		controller.errors = null;
		$http({method: 'POST', url: '/albums', data: album})
			.catch(function(note) {
				controller.errors = note.data.error;
			})
	};
});