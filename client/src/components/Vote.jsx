"use strict";

import React from 'react';
import PureComponent from './PureComponent';

export default class Vote extends PureComponent {
	getPair () {
		return this.props.pair || [];
	}

	hasVoted() {
		return !!this.props.hasVoted;
	}

	hasVotedFor(entry) {
		return this.props.hasVoted === entry;
	}

	render() {
		const buttons = this.getPair().map(entry => (
			<button key={entry}
					className={this.hasVoted() ? 'voted' : ''}
					onClick={() => this.props.vote(entry)}
					disabled={this.hasVoted()}>
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