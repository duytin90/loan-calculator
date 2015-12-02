'use strict';

var React = require('react');
var styles = require('../styles');
function Label (props) {
	return (
		<label htmlFor={props.id} style={styles.label} title={props.title}>{props.label}</label>
	);
}

module.exports = Label;

