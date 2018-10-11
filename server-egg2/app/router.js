'use strict'

module.exports = app => {
  const { router, controller } = app

  router.get('list', '/', controller.index.index)
  router.put('save', '/', controller.index.save)
}
