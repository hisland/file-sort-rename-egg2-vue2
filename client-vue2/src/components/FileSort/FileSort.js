import apiAxios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      leftCurrentItem: {},

      isRemoving: false,
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
    async saveEdit() {
      const editItem = this.popEdit.editModel
      const { id } = editItem
      const isUpdate = !!id
      const { data } = isUpdate
        ? await apiAxios.put(`${moduleUrl}/${id}`, editItem)
        : await apiAxios.post(`${moduleUrl}`, editItem)
      this.$message.success(data.message)
      this.popEdit.isVisible = false
      if (isUpdate) {
        this.updateOne(data.result)
      } else {
        data.result.regions = []
        this.leftQueryList.push(data.result)
      }
    },
  },
  async mounted() {
    // await this.loadData()
  },
}
