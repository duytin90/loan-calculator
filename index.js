var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./containers/App');
var configureStore = require('./store');
var Provider = require('react-redux').Provider;

ReactDOM.render(
	<Provider store={configureStore()}>
		<App />
	</Provider>,
	document.querySelector('.main')
);

