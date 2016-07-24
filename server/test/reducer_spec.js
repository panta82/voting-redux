"use strict";

import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {setEntries, next, vote} from '../src/core';
import ACTIONS from '../src/actions';
import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles ' + ACTIONS.SET_ENTRIES, () => {
		const initialState = Map();
		const entries = ['A'];
		const action = {type: ACTIONS.SET_ENTRIES, entries: entries};
		const expected = setEntries(initialState, entries);

		const reduced = reducer(initialState, action);

		expect(expected).to.equal(reduced);
	});

	it('handles ' + ACTIONS.NEXT, () => {
		const initialState = fromJS({
			round: 1,
			entries: ['A', 'B']
		});
		const action = {type: ACTIONS.NEXT};
		const expected = next(initialState);

		const reduced = reducer(initialState, action);

		expect(expected).to.equal(reduced);
	});

	it('handles ' + ACTIONS.VOTE, () => {
		const initialState = fromJS({
			vote: {
				round: 1,
				pair: ['A', 'B']
			},
			entries: []
		});
		const action = {type: ACTIONS.VOTE, entry: 'B'};
		const expected = vote(initialState.get('vote'), 'B');

		const reduced = reducer(initialState, action);

		expect(expected).to.equal(reduced.get('vote'));
	});

	it('handles an initial state', () => {
		const action = {type: ACTIONS.SET_ENTRIES, entries: ['A']};
		const nextState = reducer(undefined, action);
		expect(nextState).to.equal(fromJS({
			initialEntries: ['A'],
			entries: ['A']
		}));
	});

	it('can be used with reduce', () => {
		const actions = [
			{type: ACTIONS.SET_ENTRIES, entries: ['A', 'B']},
			{type: ACTIONS.NEXT},
			{type: ACTIONS.VOTE, entry: 'A'},
			{type: ACTIONS.VOTE, entry: 'B'},
			{type: ACTIONS.VOTE, entry: 'A'},
			{type: ACTIONS.NEXT}
		];

		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			initialEntries: ['A', 'B'],
			winner: 'A'
		}));
	});

});