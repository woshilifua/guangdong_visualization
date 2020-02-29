const echarts = require('echarts/lib/echarts')
require('echarts/theme/customed')
require('echarts/lib/chart/bar')
// import { echartsStyle } from '@/config/echarts'

export default {
  data() {
    return {
      loading: true,
      echarts: null,
      echartsData: null
    }
  },

  mounted() {
    // echarts 需要 el 加载完成才能初始化，所以要放到 mounted 中, echartsData
    // echartsData 需要 echarts 初始化完成才能初始化，可以忽略 rander 的耗时
    // eslint-disable-next-line

    // this.$store.dispatch(this.option.action, this.option.key)
  },

  computed: {
    sandTableData() {
      // 监听数据变化
      // return this.$store.state.data[this.option.key]
    }
  },

  watch: {
    sandTableData: {
      handler(val) {
        this.setOption(val)
      },
      immediate: false
    }
  },

  methods: {
    setOption(option) {
      this.echarts.setOption(option)
    },

    initEcharts(key) {
      // eslint-disable-next-line
      this.echarts = echarts.init(this.$refs[key], 'customed')
      this.echarts.on('rendered', () => {
        this.loading = false
      })
    }
  }
}