'use strict'

module.exports = appInfo => {
  const config = {}

  config.security = {
    // csrf: false, // TODO 用 curl 暂时关闭,
  }
  config.cors = {
    origin: '*',
    // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  return config
}
