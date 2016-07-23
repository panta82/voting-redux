"use strict";

import Server from 'socket.io';

export default function startServer(port = 8090) {
	const io = new Server();
	io.attach(port);
};