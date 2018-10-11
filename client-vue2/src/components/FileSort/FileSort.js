import axios from 'axios'
import qs from 'qs'

const apiAxios = axios.create({
  baseURL: '/api',
})

apiAxios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log(config.headers)
    config.headers['x-csrf-token'] = Cookies.get('csrfToken')
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

function bitWidth(len) {
  // 10进制位宽, 0-99 2位, 100-999 3位 ...
  if (len < 101) {
    // 因为是从0开始计数, 需要比正常多1
    return 2
  }
  return Math.floor(Math.log10(len)) + 1
}

function prefix0(val, len) {
  let rs = val + ''
  while (rs.length < len) {
    rs = '0' + rs
  }
  return rs
}

export default {
  data() {
    return {
      allSep: '',
      queryPath: '',
      pathSepList: [],
      fileList: [],
      sortOptions: {
        handle: '.move',
      },
      prevIndex: -1,
    }
  },
  watch: {},
  computed: {
    isAllChecked() {
      return this.fileList.every(vv => {
        return vv.checked
      })
    },
    checkedList() {
      return this.fileList.filter(vv => vv.checked)
    },
  },
  methods: {
    async doSave() {
      const { queryPath } = this
      const needRenameList = this.checkedList.filter(
        vv => vv.name !== vv.newName
      )
      if (needRenameList.length) {
        const { data } = await apiAxios.put(`/`, {
          queryPath,
          needRenameList,
        })

        if (!data.code) {
          needRenameList.forEach(vv1 => {
            vv1.name = vv1.newName
          })
        }
      }
    },
    async changePath(vv1) {
      history.pushState(
        vv1,
        vv1.name,
        '/?' + qs.stringify({ queryPath: vv1.url }, { encode: false })
      )
      await this.getDir()
    },
    async getDir() {
      const { data } = await apiAxios.get(`/`, {
        params: qs.parse(location.search, { ignoreQueryPrefix: true }),
      })
      data.fileList.forEach(vv1 => {
        vv1.checked = false
        vv1.newName = ''
      })
      this.queryPath = data.queryPath
      this.pathSepList = data.pathSepList
      this.fileList = data.fileList
    },
    checkAll(ee) {
      const { checked } = ee.target
      this.fileList.forEach(vv1 => {
        vv1.checked = checked
      })
      this.renameAll()
    },
    clickOne(vv1, index1, ee) {
      const { fileList } = this
      if (this.prevIndex !== -1 && ee.shiftKey && this.prevIndex !== index1) {
        const targetValue = fileList[this.prevIndex].checked
        let from = Math.min(this.prevIndex, index1)
        let to = Math.max(this.prevIndex, index1)
        for (; from <= to; from++) {
          fileList[from].checked = targetValue
        }
      } else {
        vv1.checked = !vv1.checked
      }
      this.prevIndex = index1
      this.renameAll()
    },
    renameAll() {
      const { allSep, checkedList } = this
      let bitLen = bitWidth(checkedList.length)
      checkedList.forEach(function(vv1, index1) {
        vv1.newName = vv1.name.replace(/(^\d+([.-]))?(.+)/, function(
          mm,
          aa,
          bb,
          cc
        ) {
          return prefix0(index1, bitLen) + (allSep || bb || '.') + cc
        })
      })
    },
  },
  async mounted() {
    await this.getDir()
    history.replaceState(
      {
        name: 'initState',
        url: this.queryPath,
      },
      'initState',
      '/?' + qs.stringify({ queryPath: this.queryPath }, { encode: false })
    )
    window.onpopstate = () => {
      this.getDir()
    }
  },
}
