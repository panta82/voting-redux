"use strict";

import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import ACTIONS from '../src/actions';

import reducer from '../src/reducer';

describe('reducer', () => {

	describe('on ' + ACTIONS.SET_STATE, () => {
		function setStateTest(initialState, newState) {
			const action = {
				type: ACTIONS.SET_STATE,
				state: newState
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.equal(fromJS(newState));
		}


		it('handles new state', () => {
			setStateTest(Map(), fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: {A: 1}
				}
			}));
		});

		it('handles plain JS payload', () => {
			setStateTest(Map(), {
				vote: {
					pair: ['A', 'B'],
					tally: {A: 1}
				}
			});
		});

		it('handles empty initial state', () => {
			setStateTest(undefined, {
				vote: {
					pair: ['A', 'B'],
					tally: {A: 1}
				}
			});
		});

		it(`removes hasVoted if pair changes`, () => {
			const state = fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				},
				hasVoted: 'B'
			});
			const action = {type: ACTIONS.SET_STATE, state: {
				vote: {
					pair: ['C', 'D']
				}
			}};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['C', 'D']
				}
			}));
		});
	});

	describe('on ' + ACTIONS.VOTE, () => {
		it('sets hasVoted', () => {
			const state = fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				}
			});
			const action = {type: ACTIONS.VOTE, entry: 'A'};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				},
				hasVoted: 'A'
			}));
		});

		it(`doesn't set hasVoted on invalid entry`, () => {
			const state = fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				}
			});
			const action = {type: ACTIONS.VOTE, entry: 'C'};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				}
			}));
		});
	});

});
