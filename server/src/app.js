import makeStore from './store';
import startServer from './server';
import ACTIONS from './actions';

export function app(port, entries) {
	const store = makeStore(
		store => next => action => {
			console.log(JSON.stringify(action));
			next(action);
		}
	);

	store.dispatch({
		type: ACTIONS.SET_ENTRIES,
		entries: entries
	});

	store.dispatch({
		type: ACTIONS.NEXT
	});

	startServer(store, port);

	console.log(`Listening on ${port}`);
}
