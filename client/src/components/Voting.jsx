"use strict";

import React from 'react';
import PureComponent from './PureComponent';

import Vote from './Vote';
import Winner from './Winner';

export default class Voting extends PureComponent {
	render() {
		if (this.props.winner) {
			return (
				<Winner ref="winner" winner={this.props.winner}/>
			);
		}

		return (
			<Vote {...this.props} />
		);
	}
};