module.exports = {
    // simple config from http://webpack.github.io/docs/configuration.html
    entry: "./src/js/main.js",
    output: { 
			path: __dirname + "/public/js", 
			filename: "bundle.js" 
	},

    // using webpack loader
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
