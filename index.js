var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./containers/App');
var store = require('./store');

function render () {
	ReactDOM.render(<App {...store.getState()}/>, document.querySelector('.main'));
}

store.subscribe(render);

render();

