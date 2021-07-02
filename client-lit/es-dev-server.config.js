module.exports = {
   port: 8000,
   watch: true,
   nodeResolve: true,
   open: false,
   appIndex: 'index.html',
   plugins: [],
   moduleDirs: ['node_modules'],
   module: {
      rules: [
         {
            test: /\.svg$/,
            loader: 'lit-svg-loader'
         }
      ]
   }
};