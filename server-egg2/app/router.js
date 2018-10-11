'use strict'

module.exports = app => {
  const { router, controller } = app

  router.redirect('/', '/index.html', 302)

  router.get('list', '/api/', controller.index.index)
  router.put('save', '/api/', controller.index.save)
}
