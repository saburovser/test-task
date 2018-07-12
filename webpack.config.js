const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'production';


    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, 
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, 
            
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img/',
                    name: '[name].[ext]',
                }
            }]
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    };
};