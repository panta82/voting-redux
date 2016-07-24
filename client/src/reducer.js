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
	if (pair && pair.includes(entry)) {
		return state.set('hasVoted', entry);
	}
	return state;
}

/**
 * @param {Map} state
 */
function resetVote(state) {
	const hasVoted = state.get('hasVoted');
	const pair = state.getIn(['vote', 'pair'], List());
	if (hasVoted && !pair.includes('hasVoted')) {
		return state.remove('hasVoted');
	}
	return state;
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