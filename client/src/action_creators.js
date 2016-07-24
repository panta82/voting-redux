import ACTIONS from './actions';

export function setState(state) {
	return {
		type: ACTIONS.SET_STATE,
		state
	};
}

export function vote(entry) {
	return {
		meta: {remote: true},
		type: ACTIONS.VOTE,
		entry
	};
}

export function next() {
	return {
		meta: {remote: true},
		type: ACTIONS.NEXT
	};
}