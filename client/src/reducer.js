"use strict";

import {Map, List, fromJS} from 'immutable';

import ACTIONS from './actions';

function setState(state, newState) {
	newState = fromJS(newState);

	let nextEntries = newState.get('entries');
	let prevEntries = state.get('entries');
	if (nextEntries && prevEntries && nextEntries.count() > prevEntries.count()) {
		// Restart
		state = state
			.remove('myVote')
			.remove('vote')
			.remove('tally')
			.remove('winner');
	}

	return state.merge(newState);
}

/**
 * @param {Map} state
 * @param entry
 */
function vote(state, entry) {
	/** @type {List} pair */
	const pair = state.getIn(['vote', 'pair']);
	const round = state.getIn(['vote', 'round']);
	if (pair && pair.includes(entry)) {
		return state.set('myVote', Map({
			round: round,
			entry
		}));
	}
	return state;
}

/**
 * @param {Map} state
 */
function resetVote(state) {
	const votedForRound = state.getIn(['myVote', 'round']);
	const currentRound = state.getIn(['vote', 'round']);
	if (votedForRound === currentRound) {
		return state;
	}
	return state.remove('myVote');
}

export default function reducer(state = Map(), action) {
	switch (action.type) {
		case ACTIONS.SET_STATE:
			return resetVote(setState(state, action.state));
		case ACTIONS.VOTE:
			return vote(state, action.entry);
	}

	return state;
}