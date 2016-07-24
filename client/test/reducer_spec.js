import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import ACTIONS from '../src/actions';

import reducer from '../src/reducer';

describe('reducer', () => {

	function setStateTest(initialState, newState) {
		const action = {
			type: ACTIONS.SET_STATE,
			state: newState
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS(newState));
	}


	it('handles ' + ACTIONS.SET_STATE, () => {
		setStateTest(Map(), fromJS({
			vote: {
				pair: ['A', 'B'],
				tally: {A: 1}
			}
		}));
	});

	it('handles ' + ACTIONS.SET_STATE + ' with plain JS payload', () => {
		setStateTest(Map(), {
			vote: {
				pair: ['A', 'B'],
				tally: {A: 1}
			}
		});
	});

	it('handles ' + ACTIONS.SET_STATE + ' without initial state', () => {
		setStateTest(undefined, {
			vote: {
				pair: ['A', 'B'],
				tally: {A: 1}
			}
		});
	});

});
