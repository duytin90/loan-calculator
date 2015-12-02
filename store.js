'use strict';

var createStore = require('redux').createStore;
var rootReducer = require('./reducers/calculate');

module.exports = createStore(rootReducer);
