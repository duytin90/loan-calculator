'use strict';

var React = require('react');
var connect = require('react-redux').connect;
var InputField = require('../components/InputField');
var DisplayField = require('../components/DisplayField');
var styles = require('../styles');
var actionCreators = require('../actions');

function App (props) {
	return (
		<div className="app" style={styles.app}>
			<h1>Loan Calculator</h1>
			<InputField type="number" id="loan-amount" label="Loan Amount $" onChange={props.updateAmount}/>
			<InputField type="number" id="apr" label="APR (%)" title="Annual Percentage Rate" onChange={props.updateAPR} />
			<InputField type="number" id="number-years" label="Number of years " onChange={props.updateDuration}/>
			<DisplayField id="payment" label="Monthly Payment $" value={props.payment.toFixed(2)}/>
			<DisplayField id="total-interest-paid" label="Total Interest Paid $" value={props.interest.toFixed(2)}/>
		</div>
	);
}

function mapStateToProps (state) {
	return {
		payment: state.payment,
		interest: state.interest
	};
}

module.exports = connect(
	mapStateToProps,
	actionCreators
)(App);
