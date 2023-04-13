/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.tsx"
  },
  devServer: {
    open: true
  },
  builtins: {
    html: [
      {
        template: "./index.html"
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: 'css',
      },
    ]
  },
};
