'use strict'

const nodePath = require('path')
const glob = require('glob')
const fs = require('fs')

const Controller = require('egg').Controller

class UserController extends Controller {
  async save() {
    this.ctx.body = {
      ok: 1,
    }
  }
  async index() {
    const { ctx } = this
    const { query } = ctx

    let { queryPath } = query
    if (!queryPath) {
      queryPath = '.'
    }
    queryPath = nodePath.resolve(queryPath)
    let pathList = queryPath.split('/')
    pathList.shift()
    let nextOne = '/'
    let pathSepList = [
      {
        name: '',
        url: nextOne,
      },
    ]
    for (let i of pathList) {
      nextOne += i + '/'
      pathSepList.push({
        name: i,
        url: nextOne,
      })
    }

    let fileList = glob.sync('*', {
      cwd: queryPath,
    })
    fileList = fileList.map(function(oneFile) {
      let fileStat = fs.statSync(nodePath.join(queryPath, oneFile))
      if (fileStat.isDirectory()) {
        return {
          name: oneFile,
          url: nodePath.join(queryPath, oneFile),
        }
      } else {
        return {
          name: oneFile,
        }
      }
    })

    ctx.body = {
      queryPath,
      pathSepList,
      fileList,
    }
  }
}

module.exports = UserController
