"use strict";

import React from 'react';

import Vote from './Vote';
import Winner from './Winner';

export default class Voting extends React.Component {
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