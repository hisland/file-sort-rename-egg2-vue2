'use strict'

module.exports = app => {
  const { router, controller } = app

  router.get('list', '/api/', controller.index.index)
  router.put('save', '/api/', controller.index.save)
}
