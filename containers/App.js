'use strict';

var React = require('react');
var InputField = require('../components/InputField');
var DisplayField = require('../components/DisplayField');
var store = require('../store');
var styles = require('../styles');

function App (props) {
	return (
		<div className="app" style={styles.app}>
			<h1>Loan Calculator</h1>
			<InputField type="number" id="loan-amount" label="Loan Amount $" onChange={function (val) {
				store.dispatch({
					type: 'AMOUNT',
					value: val
				});
			}}/>
			<InputField type="number" id="apr" label="APR (%)" title="Annual Percentage Rate" onChange={function (val) {
				store.dispatch({
					type: 'APR',
					value: val
				});
			}} />
			<InputField type="number" id="number-years" label="Number of years " onChange={function (val) {
				store.dispatch({
					type: 'DURATION',
					value: val
				});
			}}/>
			<DisplayField id="payment" label="Monthly Payment $" value={props.payment.toFixed(2)}/>
			<DisplayField id="total-interest-paid" label="Total Interest Paid $" value={props.interest.toFixed(2)}/>
		</div>
	);
}

module.exports = App;
