'use strict'

module.exports = appInfo => {
  const config = {}

  config.cors = {
    origin: '*',
    // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  return config
}
