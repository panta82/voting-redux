"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';

import Results from '../../src/components/Results';

describe('Results', () => {

	it('renders entries with vote count or zero', () => {
		const pair = List.of('A', 'B');
		const tally = Map({
			'A': 5
		});
		const component = renderIntoDocument(
			<Results pair={pair} tally={tally}/>
		);

		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [a, b] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(a).to.contain('A');
		expect(a).to.contain('5');
		expect(b).to.contain('B');
		expect(b).to.contain('0');
	});

	it('invokes the next callback when next button is clicked', () => {
		let nextInvoked = false;
		const nextFn = () => nextInvoked = true;

		const pair = List.of('A', 'B');
		const component = renderIntoDocument(
			<Results pair={pair}
				tally={Map()}
				next={nextFn}/>
		);
		Simulate.click(ReactDOM.findDOMNode(component.refs.next));

		expect(nextInvoked).to.equal(true);
	});

	it('renders the winner if there is one', () => {
		const pair = List.of('A', 'B');
		const component = renderIntoDocument(
			<Results
				winner="A"
				pair={pair}
				tally={Map()}/>
		);

		const winner = ReactDOM.findDOMNode(component.refs.winner);

		//noinspection BadExpressionStatementJS
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('A');
	});

});