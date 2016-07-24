"use strict";

import {expect} from 'chai';
import {fromJS} from 'immutable';

import {INITIAL_STATE} from '../src/core';
import ACTIONS from '../src/actions';
import makeStore from '../src/store';

describe('store', () => {

	it('is a redux store with the correct reducer', () => {
		const store = makeStore();

		expect(store.getState()).to.equal(INITIAL_STATE);

		store.dispatch({
			type: ACTIONS.SET_ENTRIES,
			entries: ['A', 'B']
		});

		expect(store.getState()).to.equal(fromJS({
			initialEntries: ['A', 'B'],
			entries: ['A', 'B']
		}));
	});

});