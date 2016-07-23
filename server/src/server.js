"use strict";

import Server from 'socket.io';

/**
 * @param {Store} store
 * @param port
 */
export default function startServer(store, port = 8090) {
	const io = new Server();
	io.attach(port);

	store.subscribe(() => {
		io.emit('state', store.getState().toJS());
	});

	io.on('connection', socket => {
		socket.emit('state', store.getState().toJS());
		socket.on('action', store.dispatch.bind(store));
	});
};