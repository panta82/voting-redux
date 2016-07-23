"use strict";

import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries} from '../src/core';

describe('application logic', () => {
	describe('setEntries', () => {
		it('adds entries to the state', () => {
			const state = Map();
			const entries = List.of('A', 'B');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('A', 'B')
			}));
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['A', 'B'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('A', 'B')
			}));
		});
	});
});