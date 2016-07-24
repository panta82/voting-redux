"use strict";

import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

/**
 * @param {Map} state
 * @param entries
 * @returns {*}
 */
export function setEntries(state, entries) {
	entries = List(entries);
	if (!state.get('initialEntries')) {
		state = state.set('initialEntries', entries);
	}
	return state.set('entries', entries);
}

/**
 * @param {Map} vote
 */
function getWinners(vote) {
	if (!vote) {
		return [];
	}

	const [a, b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);

	if (aVotes > bVotes) {
		return [a];
	}
	if (aVotes < bVotes) {
		return [b];
	}
	return [a, b];
}

/**
 * @param {Map} state
 */
export function next(state) {
	const entries = state.get('entries')
		.concat(getWinners(state.get('vote')));

	if (entries.size === 1) {
		return state.remove('vote')
			.remove('entries')
			.set('winner', entries.first());
	}

	return state.merge({
		vote: Map({
			round: state.getIn(['vote', 'round'], 0) + 1,
			pair: entries.take(2)
		}),
		entries: entries.skip(2)
	});
}

/**
 * @param {Map} state
 * @param entry
 */
export function vote(state, entry) {
	const pair = state.get('pair');
	if (!pair.contains(entry)) {
		return state;
	}

	return state.updateIn(
		['tally', entry],
		0,
		tally => tally + 1
	);
}

/**
 * @param {Map} state
 */
export function restart(state) {
	return state
		.remove('tally')
		.remove('vote')
		.remove('winner')
		.set('entries', state.get('initialEntries'));
}