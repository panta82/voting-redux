import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

require('./style.css');

const pair = ['A', 'B'];

ReactDOM.render(
	<Voting pair={pair} hasVoted="A" winner="A"/>,
	document.getElementById('app')
);
