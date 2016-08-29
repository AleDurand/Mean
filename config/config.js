'use strict';

var _ = require('lodash');

module.exports = _.extend(
    require('./all'),
    require('./' + (process.env.NODE_ENV || 'development'))
);