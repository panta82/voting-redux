"use strict";

import React from 'react';
import {connect} from 'react-redux';

import PureComponent from './PureComponent';

import Vote from './Vote';
import Winner from './Winner';

export class Voting extends PureComponent {
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
}

export const VotingContainer = connect(state => {
	return {
		pair: state.getIn(['vote', 'pair']),
		winner: state.get('winner')
	};
})(Voting);