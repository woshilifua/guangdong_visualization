const echarts = require('echarts/lib/echarts')
require('echarts/theme/customed')
require('echarts/lib/chart/bar')
// import { echartsStyle } from '@/config/echarts'

export default {
  data() {
    return {
      echarts: null
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