<template>
  <div
    element-loading-spinner="null"
    element-loading-text="暂无该分类数据"
    v-loading="echartsLoading"
  >
    <div :ref="'echarts'" style=" height: 240px;"></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/bar'

export default {
  mixins: [mixins],

  data() {
    return {
      echartsLoading: true
    }
  },

  props: {
    echartsData: {
      type: Object,
      required: true
    },
    region: {
      type: Object,
      required: false
    }
  },

  watch: {
    echartsData: {
      handler(val) {
        this.echartsLoading = val.data.length === 0 ? true : false
        this.setOption()
      },
      deep: true
    }
  },

  mounted() {
    this.initEcharts('echarts')
  },

  methods: {
    setOption() {
      let option = initOption(
        this.echartsData.dataAxis,
        this.echartsData.data,
        this.region
      )
      this.echarts.setOption(option)
    }
  }
}
</script>

<style></style>
