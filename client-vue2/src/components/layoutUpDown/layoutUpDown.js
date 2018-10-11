export default {
  components: {},
  data() {
    return {}
  },
  watch: {},
  props: {
    fullType: {
      type: String,
      default: 'abs', // abs, flex, size
    },
    upHeight: {
      type: [Number, String],
      default: 0,
    },
    downHeight: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    fullClz() {
      return this.fullType + 'FullType'
    },
    upStyle() {
      const { upHeight } = this
      const ww =
        typeof upHeight === 'string'
          ? upHeight
          : upHeight > 0 ? `${upHeight}px` : ''
      if (ww) {
        return `height:${ww};position:relative`
      } else {
        return ''
      }
    },
    downStyle() {
      const { downHeight } = this
      const ww =
        typeof downHeight === 'string'
          ? downHeight
          : downHeight > 0 ? `${downHeight}px` : ''
      if (ww) {
        return `height:${ww};position:relative`
      } else {
        return ''
      }
    },
  },
  methods: {},
  async mounted() {
    if (!this.$slots.up && !this.$slots.down) {
      throw Error('layoutUpDown up,down slot 至少设置1个')
    }
  },
}
