const path = require('path');

module.exports = {
    module: {
        rules: [
            {
            test: /\.css$/i,
            use: ["css-loader"],
            },
        ],
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}