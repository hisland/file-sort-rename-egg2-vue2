'use strict'

module.exports = app => {
  const { router, controller } = app

  router.resources('user', '/api/v1/user', controller.user)
}
