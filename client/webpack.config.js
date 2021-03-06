module.exports = {
    // simple config from http://webpack.github.io/docs/configuration.html
    entry: [
                "./src/js/main.js",
                "./src/styles/main.sass"
            ],
    output: { 
			path: __dirname + "/public/js", 
			filename: "bundle.js" 
	},

    // using webpack loader
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loader: "style-loader!css-loader!autoprefixer-loader!sass-loader",
                exclude: [/node_modules/, /public/]
            },{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
