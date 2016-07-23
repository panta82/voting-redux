"use strict";

import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

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

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('A', 'B', 'C')
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('A', 'B')
				}),
				entries: List.of('C')
			}));
		});
	});

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
				vote: Map({ pair: List.of('A', 'B') }),
				entries: List()
			});

			const nextState = vote(state, 'B');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('A', 'B'),
					tally: Map({
						'B': 1
					})
				}),
				entries: List()
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('A', 'B'),
					tally: Map({
						'A': 3,
						'B': 2
					})
				}),
				entries: List()
			});

			const nextState = vote(state, 'A');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('A', 'B'),
					tally: Map({
						'A': 4,
						'B': 2
					})
				}),
				entries: List()
			}));
		});
	});
});