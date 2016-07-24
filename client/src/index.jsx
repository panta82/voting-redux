import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import ACTIONS from './actions';
import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const store = createStore(reducer);
store.dispatch({
	type: ACTIONS.SET_STATE,
	state: {
		vote: {
			pair: ['Test1', 'Test2'],
			tally: {
				'Test1': 2
			}
		}
	}
});

require('./style.css');

const routes = (
	<Route component={App}>
		<Route path="/" component={VotingContainer} />
		<Route path="/results" component={ResultsContainer} />
	</Route>
);

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);
