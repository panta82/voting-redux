"use strict";

import React from 'react';
import PureComponent from './PureComponent';

export default class Winner extends PureComponent {
	render() {
		return (
			<div className="winner">
				Winner is {this.props.winner}!
			</div>
		);
	}
};