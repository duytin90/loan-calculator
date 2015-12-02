'use strict';

var React = require('react');
var Label = require('./Label');
var styles = require('../styles');

function DisplayField (props) {
	return (
		<div className="displayField" style={styles.field}>
			<Label label={props.label}/>
			<span className="value" id={props.id} style={styles.value}>{props.value}</span>
		</div>
	);
}

module.exports = DisplayField;
