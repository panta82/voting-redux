"use strict";

import React from 'react';

export default class Voting extends React.Component {
	getPair () {
		return this.props.pair || [];
	}

	isDisabled() {
		return !!this.props.hasVoted;
	}

	hasVotedFor(entry) {
		return this.props.hasVoted === entry;
	}

	render() {
		if (this.props.winner) {
			return (
				<div ref="winner">Winner is {this.props.winner}!</div>
			);
		}

		const buttons = this.getPair().map(entry => (
			<button key={entry}
					onClick={() => this.props.vote(entry)}
					disabled={this.isDisabled()}>
				<h1>{entry}</h1>
				{this.hasVotedFor(entry)
					? <div className="label">Voted</div>
					: null}
			</button>
		));

		return (
			<div className="voting">
				{buttons}
			</div>
		);
	}
};