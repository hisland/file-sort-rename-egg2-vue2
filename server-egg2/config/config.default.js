'use strict'
const fs = require('fs')
const path = require('path')

module.exports = appInfo => {
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539171337087_9858'

  // add your config here
  config.middleware = []

  config.security = {}

  config.cluster = {
    listen: {
      port: 9990,
    },
  }

  config.static = {
    prefix: '/',
  }

  return config
}
