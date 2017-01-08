module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'bundle/bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules']
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.hbs/,
				loader:'handlebars-loader',
				exclude: /(node_modules|bower_components)/
			},

			{
				test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
				}
			}

		]
	}
};