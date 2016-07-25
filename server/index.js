var path = require('path');

var entries = require(path.resolve(__dirname, 'entries.json'));

var appDir = process.env['NODE_ENV'] === 'production' ? 'dist' : 'src';

var app = require('./' + appDir + '/app').app;

var port = process.env['PORT'] || 8090;

app(port, entries);
