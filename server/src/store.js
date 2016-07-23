"use strict";

import {createStore} from 'redux';

import reducer from './reducer';

/**
 * @returns {Store}
 */
export default function makeStore() {
	return createStore(reducer);
}
