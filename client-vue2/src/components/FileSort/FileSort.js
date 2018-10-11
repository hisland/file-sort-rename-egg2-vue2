import axios from 'axios'
import qs from 'qs'
window.aaa = qs
const apiAxios = axios.create({
  baseURL: 'http://127.0.0.1:7001',
})

export default {
  data() {
    return {
      queryPath: '',
      pathSepList: [],
      fileList: [],
    }
  },
  watch: {},
  computed: {
    groupList() {
      const { listPROVINCE, listCITY } = cityToAlphaGroup(
        this.leftCurrentItem.regions
      )
      return [
        {
          name: '省列表',
          list: listPROVINCE,
        },
        {
          name: '市列表',
          list: listCITY,
        },
      ]
    },
  },
  methods: {
    async doSave() {
      const { data } = await apiAxios.put(`/`, {
        queryPath: this.queryPath,
      })

      console.log(data)
    },
    async changePath(vv1) {
      history.pushState(
        vv1,
        vv1.name,
        '/?' + qs.stringify({ path: vv1.url }, { encode: false })
      )
      await this.getDir()
    },
    async getDir() {
      const { data } = await apiAxios.get(`/`, {
        params: qs.parse(location.search, { ignoreQueryPrefix: true }),
      })
      this.queryPath = data.queryPath
      this.pathSepList = data.pathSepList
      this.fileList = data.fileList
    },
  },
  async mounted() {
    await this.getDir()
  },
}
