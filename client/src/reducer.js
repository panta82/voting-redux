"use strict";

import {Map, List} from 'immutable';

import ACTIONS from './actions';

function setState(state, newState) {
	return state.merge(state, newState);
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