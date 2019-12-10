const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/users': {
        target: 'http://localhost:3000'
      },
      '/order': {
        target: 'http://localhost:3000'
      },
      '/products': {
        target: 'http://localhost:3000'
      },
      '/tags': {
        target: 'http://localhost:3000'
      },
      '/categories': {
        target: 'http://localhost:3000'
      }
    }
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
