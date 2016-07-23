"use strict";

import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
	describe('a number', () => {
		function increment(state) {
			return state + 1;
		}

		it('is immutable', () => {
			let state = 42;
			let next = increment(state);

			expect(state).to.equal(42);
			expect(next).to.equal(43);
		});
	});

	describe('a list', () => {
		function addMovie(list, m) {
			return list.push(m);
		}

		it('is immutable', () => {
			let state = List.of('A', 'B');
			let next = addMovie(state, 'C');

			expect(state).to.equal(List.of('A', 'B'));
			expect(next).to.equal(List.of('A', 'B', 'C'));
		});
	});

	describe('a tree', () => {
		/**
		 * @param {Map} state
		 * @param m
		 * @returns {*}
		 */
		function addMovie(state, m) {
			return state.update('movies', l => l.push(m));
		}

		it('is immutable', () => {
			let state = Map({
				'movies': List.of('A', 'B')
			});
			let next = addMovie(state, 'C');

			expect(state).to.equal(Map({
				movies: List.of('A', 'B')
			}));
			expect(next).to.equal(Map({
				movies: List.of('A', 'B', 'C')
			}));
		});
	});
});