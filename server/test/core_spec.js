"use strict";

import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
	describe('setEntries', () => {
		it('adds entries to the state', () => {
			const state = Map();
			const entries = List.of('A', 'B');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				initialEntries: List.of('A', 'B'),
				entries: List.of('A', 'B')
			}));
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['A', 'B'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				initialEntries: List.of('A', 'B'),
				entries: List.of('A', 'B')
			}));
		});

		it(`doesn't change initialEntries`, () => {
			const state = fromJS({
				initialEntries: ['C', 'D'],
				entries: ['C', 'D']
			});
			const entries = ['A', 'B'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				initialEntries: List.of('C', 'D'),
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
					round: 1,
					pair: List.of('A', 'B')
				}),
				entries: List.of('C')
			}));
		});

		it('puts the winner back to entries', () => {
			const state = Map({
				vote: Map({
					round: 1,
					pair: List.of('A', 'B'),
					tally: Map({
						'A': 4,
						'B': 2
					})
				}),
				entries: List.of('C', 'D', 'E')
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					round: 2,
					pair: List.of('C', 'D')
				}),
				entries: List.of('E', 'A')
			}));
		});

		it('puts both tied contestants back to entries', () => {
			const state = Map({
				vote: Map({
					round: 1,
					pair: List.of('A', 'B'),
					tally: Map({
						'A': 5,
						'B': 5
					})
				}),
				entries: List.of('C', 'D', 'E')
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					round: 2,
					pair: List.of('C', 'D')
				}),
				entries: List.of('E', 'A', 'B')
			}));
		});


		it('marks winner when only one entry left', () => {
			const state = Map({
				vote: Map({
					round: 1,
					pair: List.of('A', 'B'),
					tally: Map({
						'A': 6,
						'B': 1
					})
				}),
				entries: List()
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				winner: 'A'
			}));
		});

	});

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
				round: 1,
				pair: List.of('A', 'B')
			});

			const nextState = vote(state, 'B');

			expect(nextState).to.equal(Map({
				round: 1,
				pair: List.of('A', 'B'),
				tally: Map({
					'B': 1
				})
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				round: 1,
				pair: List.of('A', 'B'),
				tally: Map({
					'A': 3,
					'B': 2
				})
			});

			const nextState = vote(state, 'A');

			expect(nextState).to.equal(Map({
				round: 1,
				pair: List.of('A', 'B'),
				tally: Map({
					'A': 4,
					'B': 2
				})
			}));
		});

		it(`doesn't update tally for invalid votes`, () => {
			const state = fromJS({
				round: 1,
				pair: ['A', 'B'],
				tally: {
					'A': 3,
					'B': 2
				}
			});

			const nextState = vote(state, 'C');

			expect(nextState).to.equal(fromJS({
				round: 1,
				pair: ['A', 'B'],
				tally: {
					'A': 3,
					'B': 2
				}
			}));
		});
	});
});