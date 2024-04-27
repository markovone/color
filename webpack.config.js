const path = require('path')

module.exports = env => {
    return {
		entry: [
			path.resolve(__dirname, 'client/react', 'index.js'),
			path.resolve(__dirname, 'client/scss', 'index.scss'),
		],
		output: {
			path: path.resolve(__dirname, 'public'),
			filename: 'js/index.min.js',
		},
		resolve: {
			alias: {
				src: path.resolve(__dirname, 'client/react'),
			}
		},
		module: {
			rules: [
				{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'file-loader',
							options: { outputPath: 'css/', name: '[name].min.css'},
						},
						'sass-loader'
					]
				  },
			  
			]
		}
    }
}
