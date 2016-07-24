"use strict";

import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('A', 'B');
const tally = Map({
	A: 5,
	B: 4
});

export default class App extends React.Component {
	render() {
		return React.cloneElement(this.props.children, {
			pair: pair,
			tally: tally
		});
	}
};