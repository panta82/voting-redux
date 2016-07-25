"use strict";

import ACTIONS from './actions';

import {setEntries, next, vote, restart, INITIAL_STATE} from './core';

/**
 * @param {Map} state
 * @param action
 */
export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONS.SET_ENTRIES:
			return setEntries(state, action.entries);

		case ACTIONS.NEXT:
			return next(state);

		case ACTIONS.VOTE:
			return state.update('vote', vs => vote(vs, action.entry));

		case ACTIONS.RESTART:
			let newState = next(restart(state));
			console.log(newState.toJSON());
			return newState;
	}
	return state;
}
