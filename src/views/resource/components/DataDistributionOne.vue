<template>
  <div class="charts-container">
    <div style="height: 210px; padding: 0;" :ref="'echarts'"></div>
  </div>
</template>

<script>
import mixins from '../mixins/echarts'
import initBarOption from '@/utils/echarts/bar'
import { getTrade } from '@/api/resource'

export default {
  mixins: [mixins],

  data() {
    return {}
  },

  mounted() {
    this.initEcharts(this.$refs['echarts'])
    this.getTrade()
  },

  methods: {
    setEchartsOption(option) {
      this.echarts.setOption(option)
    },

    getTrade() {
      getTrade().then(res => {
        let option = initBarOption(res.data.dataAxis, res.data.data)
        this.setEchartsOption(option)
      })
    }
  }
}
</script>
