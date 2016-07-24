"use strict";

import React from 'react';
import {connect} from 'react-redux';

import PureComponent from './PureComponent';

import Winner from './Winner';

export class Results extends PureComponent {
	getPair () {
		return this.props.pair || [];
	}

	getVotes(entry) {
		if (this.props.tally && this.props.tally.has(entry)) {
			return this.props.tally.get(entry);
		}
		return 0;
	}

	render() {
		if (this.props.winner) {
			return (
				<Winner ref="winner" winner={this.props.winner} />
			);
		}

		const entries = this.getPair().map(entry => {
			return (
				<div key={entry} className="entry">
					<h1>{entry}</h1>
					<div className="voteCount">
						{this.getVotes(entry)}
					</div>
				</div>
			)
		});

		return (
			<div className="results">
				<div className="tally">
					{entries}
				</div>
				<div className="management">
					<button ref="next"
						className="next"
						onClick={this.props.next} />
				</div>
			</div>
		);
	}
}

export const ResultsContainer = connect(state => {
	return {
		pair: state.getIn(['vote', 'pair']),
		tally: state.getIn(['vote', 'tally']),
		winner: state.get('winner'),
	};
})(Results);