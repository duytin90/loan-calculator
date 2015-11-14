var React = require('react');
var ReactDOM = require('react-dom');

function Label (props) {
	return (
		<label htmlFor={props.id}>{props.label}</label>
	);
}

function Input (props) {
	var label;
	if (props.label) {
		label = <Label label={props.label}/>
	}
	return (
		<div className="field">
			{label}
			<input type={props.type} id={props.id} value={props.value} onChange={props.onChange}/>
		</div>
	);
}

function DisplayField (props) {
	return (
		<div className="displayField">
			<Label label={props.label}/>
			<span className="value" id={props.id}>{props.value}</span>
		</div>
	);
}

Input.defaultProps = {
	type: 'text'
}

function App (props) {
	return (
		<div className="app">
			<Input type="number" id="loan-amount" label="Loan Amount $" onChange={getPayment}/>
			<Input type="number" id="apr" label="Annual percentage rate (APR) (%)" onChange={getPayment} />
			<Input type="number" id="number-years" label="Number of years " onChange={getPayment}/>
			<DisplayField id="payment" label="Monthly Payment $"/>
			<DisplayField id="total-interest-paid" label="Total Interest Paid $"/>
		</div>
	);
}

function getPayment (e) {
	e.preventDefault();
	var loanAmount = Number(document.querySelector('#loan-amount').value.trim()) * 100;
	var apr = Number(document.querySelector('#apr').value.trim());
	var numberYears = Number(document.querySelector('#number-years').value.trim());
	var payment = calculateMonthlyPayment(loanAmount, apr, numberYears * 12);
	document.querySelector('#payment').innerHTML = (payment / 100).toFixed(2);
	totalInterest();
}

function calculateMonthlyPayment (L, apr, n) {
	var r = apr / 1200;
	return L * r * Math.pow(1 + r, n)  / (Math.pow(1 + r, n) - 1);
}

function totalInterest () {
	var monthlyPayment = Number(document.querySelector('#payment').innerHTML.trim());
	var numberYears = Number(document.querySelector('#number-years').value.trim());
	var loanAmount = Number(document.querySelector('#loan-amount').value.trim());
	document.querySelector('#total-interest-paid').innerHTML = (monthlyPayment * numberYears * 12 - loanAmount).toFixed(2);
}

function getDuration (){
	
}

ReactDOM.render(<App/>, document.querySelector('.main'));
	
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
