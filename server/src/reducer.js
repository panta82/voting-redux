"use strict";

import ACTIONS from './actions';

import {setEntries, next, vote, INITIAL_STATE} from '../src/core';

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
	}
	return state;
}