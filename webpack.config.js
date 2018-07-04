module.exports = {
    entry: './src/historical-dates.ts',
    output: {
        filename: './dist/historical-dates.js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
}
