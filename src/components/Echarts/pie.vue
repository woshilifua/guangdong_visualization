<template>
  <div
    element-loading-spinner="null"
    element-loading-text="暂无该分类数据"
    v-loading="dataLoading"
    :style="pieStyle"
  >
    <div :ref="'echarts'" :style="pieStyle"></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/pie'

export default {
  mixins: [mixins],

  props: {
    pieData: {
      type: Object,
      required: false
    },
    pieStyle: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      dataLoading: true
    }
  },

  watch: {
    pieData: {
      handler(obj) {
        this.setOption(obj)
      },
      deep: true
    }
  },

  mounted() {
    this.initEcharts('echarts')
    this.setOption(this.pieData)
  },

  methods: {
    setOption(obj) {
      if (obj.data === null) {
        this.dataLoading = true
      } else {
        this.dataLoading = false
        let option = initOption(obj)
        this.echarts.clear()
        this.echarts.setOption(option)
      }
    }
  }
}
</script>
