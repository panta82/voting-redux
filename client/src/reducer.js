"use strict";

import {Map} from 'immutable';

import ACTIONS from './actions';

export default function reducer(state = Map(), action) {
	switch (action.type) {
		case ACTIONS.SET_STATE:
			return state.merge(state, action.state);
	}

	return state;
}