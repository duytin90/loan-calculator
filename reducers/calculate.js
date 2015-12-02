'use strict';

var _ = require('lodash');

function calculate (state, action) {
	if (!state) {
		return {
			amount: 0,
			apr: 0,
			duration: 0,
			payment: 0,
			interest: 0
		};
	}
	var newState;
	switch (action.type) {
		case 'AMOUNT':
			newState = _.assign({}, state, {
				amount: action.value
			});
			break;
		case 'APR':
			newState = _.assign({}, state, {
				apr: action.value
			});
			break;
		case 'DURATION':
			newState = _.assign({}, state, {
				duration: action.value
			});
			break;
		default:
			return state;
	}
	newState.payment = calculateMonthlyPayment(newState.amount, newState.apr, newState.duration);
	newState.interest = calculateTotalInterest(newState.amount, newState.payment, newState.duration);
	return newState;
}
/**
 * @param {Number} L loan amount
 * @param {Number} apr Annual Percentage Rate (eg. 1.5)
 * @param {Number} n duration of loan in years
 */
function calculateMonthlyPayment (L, apr, n) {
	// get monthly rate
	var r = apr / 1200;
	// get number of months
	var m = n * 12;
	// do calculation in cents
	var a = L * 100;

	var p = a * r * Math.pow(1 + r, m) / (Math.pow(1 + r, m) - 1);

	return p / 100;
}

function calculateTotalInterest (loanAmount, monthlyPayment, numberYears) {
	return monthlyPayment * numberYears * 12 - loanAmount;
}

// monthly payment
// P = r * L * (1 + r) ^ n / ( (1 + r) ^ n - 1 )

// L // m0
// L (1+r) - P   // m1
// (L (1+r) - P) (1+r) - P = L(1+r)^2 - P(1+r)  - P // m2
// (L(1+r)^2 - P(1+r) - P)(1+r) - P = L(1+r)^3 - P(1+r)^2 - P(1+r) - P // m3
// L(1+r)^n - P(1+r)^(n-1) - P(1+r)^(n-2) - ... - P(1+r) - P // mn
// k = 1 + r
// L(1+r)^n - P(k^(n-1) + k^(n-2) + ... + k + 1)
// L* k^n = P(1 + k + k^2 +... + k^(n-1))
// P = L * k^n / (1 + k + k^2 + ... + k^(n-1))
// P = L * k^n / ( (k^n - 1) / (k-1) )
// P = L * (1+r)^n * r / ((1 + r)^n -1)

// S = 1 + h ^ 1 + ... + h ^ n
// h + h ^ 2 + ... + h ^ (n + 1) = S * h
// 1 + h + h ^ 2 + ... + h ^ (n + 1) = S * h + 1
// S + h ^ (n + 1) = S * h + 1
// S * (h - 1) + 1 = h ^ (n + 1)
// S = (h ^ (n + 1) - 1) / (h -1)
// 1 + h ^ 1 + ... + h ^ n = (h ^ (n + 1) - 1) / (h -1)

module.exports = calculate;
