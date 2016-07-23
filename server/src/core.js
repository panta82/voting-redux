"use strict";

import {List, Map} from 'immutable';

/**
 * @param {Map} state
 * @param entries
 * @returns {*}
 */
export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

/**
 * @param {Map} state
 */
export function next(state) {
	const entries = state.get('entries');
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	});
}

/**
 * @param {Map} state
 * @param entry
 */
export function vote(state, entry) {
	return state.updateIn(
		['vote', 'tally', entry],
		0,
		tally => tally + 1
	);
}