var path = require('path');

if (['-h', '--help'].indexOf(process.argv[2]) >= 0) {
	console.log('Usage: node ' + process.argv[1] + ' [path-to-entries.json]');
	process.exit(0);
}

var appDir = process.env['NODE_ENV'] === 'production' ? 'dist' : 'src';
var port = process.env['PORT'] || 8090;
var entriesPath = process.argv[2] || path.resolve(__dirname, 'entries.json');
var entries = require(entriesPath);

var app = require('./' + appDir + '/app').app;
app(port, entries);
