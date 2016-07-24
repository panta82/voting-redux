const path = require('path');

import makeStore from './src/store';
import startServer from './src/server';
import ACTIONS from './src/actions';

const PORT = 8090;

export const store = makeStore(
	store => next => action => {
		console.log(JSON.stringify(action));
		next(action);
	}
);

store.dispatch({
	type: ACTIONS.SET_ENTRIES,
	entries: require(path.resolve(__dirname, 'entries.json'))
});

store.dispatch({
	type: ACTIONS.NEXT
});

startServer(store, PORT);

console.log(`Listening on ${PORT}`);