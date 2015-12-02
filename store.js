'use strict';

var createStore = require('redux').createStore;
var rootReducer = require('./reducers/calculate');

module.exports = function (initialState) {
	return createStore(rootReducer, initialState);
};
