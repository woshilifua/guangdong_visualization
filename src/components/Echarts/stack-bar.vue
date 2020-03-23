<template>
  <div>
    <div
      :ref="'echarts'"
      element-loading-spinner="null"
      element-loading-text="暂无该分类数据"
      v-loading="dataLoading"
      :style="barStyle"
    ></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/stack-bar'

export default {
  mixins: [mixins],

  data() {
    return {
      dataLoading: true
    }
  },

  props: {
    barData: {
      type: Object,
      required: false
    },
    barStyle: {
      type: Object,
      required: true
    }
  },

  watch: {
    barData: {
      handler(obj) {
        this.setOption(obj)
      },
      deep: true
    }
  },

  mounted() {
    this.initEcharts('echarts')
    this.setOption(this.barData)
  },

  methods: {
    setOption(obj) {
      this.dataLoading = true
      if (obj.data === null) return
      this.dataLoading = false
      let option = initOption(obj)
      this.echarts.clear()
      this.echarts.setOption(option)
    }
  }
}
</script>

<style></style>
