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

		it(`doesn't remove myVote if pair remains the same`, () => {
			const state = fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 },
					round: 1
				},
				myVote: {
					entry: 'A',
					round: 1
				}
			});
			const action = {type: ACTIONS.SET_STATE, state: {
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 2 },
					round: 1
				}
			}};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 2 },
					round: 1
				},
				myVote: {
					entry: 'A',
					round: 1
				}
			}));
		});

		it(`removes myVote if pair changes`, () => {
			const state = fromJS({
				vote: {
					pair: ['A', 'B'],
					tally: { 'A': 1 },
					round: 1
				},
				myVote: {
					entry: 'A',
					round: 1
				}
			});
			const action = {type: ACTIONS.SET_STATE, state: {
				vote: {
					pair: ['C', 'D'],
					round: 2
				}
			}};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['C', 'D'],
					round: 2
				}
			}));
		});
	});

	describe('on ' + ACTIONS.VOTE, () => {
		it('sets myVote', () => {
			const state = fromJS({
				vote: {
					round: 42,
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				}
			});
			const action = {type: ACTIONS.VOTE, entry: 'A'};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					round: 42,
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				},
				myVote: {
					round: 42,
					entry: 'A'
				}
			}));
		});

		it(`doesn't set myVote on invalid entry`, () => {
			const state = fromJS({
				vote: {
					round: 42,
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				}
			});
			const action = {type: ACTIONS.VOTE, entry: 'C'};

			const nextState = reducer(state, action);

			expect(nextState).to.equal(fromJS({
				vote: {
					round: 42,
					pair: ['A', 'B'],
					tally: { 'A': 1 }
				}
			}));
		});
	});

});
