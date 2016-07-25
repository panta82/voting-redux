var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/index.jsx'
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel']
		}, {
			test: /\.css$/,
			loader: 'style!css!autoprefixer?browsers=last 2 versions'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};