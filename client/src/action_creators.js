import ACTIONS from './actions';

export function setState(state) {
	return {
		type: ACTIONS.SET_STATE,
		state
	};
}

export function vote(entry) {
	return {
		type: ACTIONS.VOTE,
		entry
	};
}