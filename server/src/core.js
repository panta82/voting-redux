"use strict";

import {List} from 'immutable';

/**
 * @param {Map} state
 * @param entries
 * @returns {*}
 */
export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}