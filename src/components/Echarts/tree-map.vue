<template>
  <div>
    <div
      :ref="'echarts'"
      style="height: 420px;"
      element-loading-spinner="null"
      element-loading-text="暂无该分类数据"
      v-loading="dataLoading"
    ></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/tree-map'

export default {
  mixins: [mixins],

  data() {
    return {
      dataLoading: false
    }
  },

  props: {
    treeMapData: {
      type: Object,
      required: false
    }
  },

  mounted() {
    this.initEcharts('echarts')
    this.setOption(this.treeMapData)
  },

  methods: {
    setOption(obj) {
      let option = initOption(obj)
      this.echarts.setOption(option)
    }
  }
}
</script>

<style></style>
