const path = require('path')

module.exports = {
  baseUrl: '',
  outputDir: path.join(__dirname, '../server-egg2/app/public/'),
  devServer: {
    proxy: 'http://127.0.0.1:7001',
  },
}
