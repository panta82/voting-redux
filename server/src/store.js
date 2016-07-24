"use strict";

import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer';

/**
 * @returns {Store}
 */
export default function makeStore(/* middleware */) {
	const createStoreWithMiddleware = applyMiddleware.apply(null, arguments)(createStore);
	return createStoreWithMiddleware(reducer);
}
