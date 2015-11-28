var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var createStore = require('redux').createStore;

var styles = {
	app: {
		paddingLeft: '3rem'
	},
	label: {
		flexBasis: '30%'
	},
	field: {
		display: 'flex',
		padding: '.5rem'
	},
	input: {
		fontSize: '1rem',
		padding: '.3rem'
	},
	value: {
		flexBasis: '65%',
		height: '2rem'
	}
};

function Label (props) {
	return (
		<label htmlFor={props.id} style={styles.label} title={props.title}>{props.label}</label>
	);
}

function Input (props) {
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

function DisplayField (props) {
	return (
		<div className="displayField" style={styles.field}>
			<Label label={props.label}/>
			<span className="value" id={props.id} style={styles.value}>{props.value}</span>
		</div>
	);
}

Input.defaultProps = {
	type: 'text'
};

function App (props) {
	return (
		<div className="app" style={styles.app}>
			<h1>Loan Calculator</h1>
			<Input type="number" id="loan-amount" label="Loan Amount $" onChange={function (val) {
				store.dispatch({
					type: 'AMOUNT',
					value: val
				});
			}}/>
			<Input type="number" id="apr" label="APR (%)" title="Annual Percentage Rate" onChange={function (val) {
				store.dispatch({
					type: 'APR',
					value: val
				});
			}} />
			<Input type="number" id="number-years" label="Number of years " onChange={function (val) {
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

function calculator (state, action) {
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
var store = createStore(calculator);

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

function render () {
	ReactDOM.render(<App {...store.getState()}/>, document.querySelector('.main'));
}

store.subscribe(render);

render();

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
