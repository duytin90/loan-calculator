'use strict';

var React = require('react');
var Label = require('./Label');
var styles = require('../styles');
var _ = require('lodash');

function InputField (props) {
	var label, input;
	if (props.label) {
		label = <Label {...props}/>;
	}
	return (
		<div className="field" style={styles.field}>
			{label}
			<input {...props} style={_.assign(styles.input, styles.value)}
				ref={function (node) {
					input = node;
				}}
				onChange={function () {
					props.onChange(input.value);
				}}
			/>
		</div>
	);
}

InputField.defaultProps = {
	type: 'text'
};

module.exports = InputField;
