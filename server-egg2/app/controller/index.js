'use strict'

const nodePath = require('path')
const glob = require('glob')
const fs = require('fs')

const Controller = require('egg').Controller

class UserController extends Controller {
  async save() {
    const { ctx } = this
    const { request, service, params } = ctx
    const { query, body } = request
    const { queryPath, needRenameList } = body

    let count = 0
    for (let ii of needRenameList) {
      let oldPath = nodePath.join(queryPath, ii.name)
      let newPath = nodePath.join(queryPath, ii.newName)
      if (oldPath !== newPath && fs.existsSync(oldPath)) {
        console.log(`rename: ${oldPath} -> ${newPath}`)
        fs.renameSync(oldPath, newPath)
        count++
      }
    }

    this.ctx.body = {
      code: 0,
      message: 'rename ' + count + ' count',
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
