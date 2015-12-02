'use strict';

function updateAmount (value) {
	return {
		type: 'AMOUNT',
		value: value
	};
}

function updateAPR (value) {
	return {
		type: 'APR',
		value: value
	};
}

function updateDuration (value) {
	return {
		type: 'DURATION',
		value: value
	};
}

module.exports.updateAmount = updateAmount;
module.exports.updateAPR = updateAPR;
module.exports.updateDuration = updateDuration;
