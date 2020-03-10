<template>
  <div
    style="height:100%; padding: 20px;"
    element-loading-spinner="null"
    element-loading-text="暂无该分类数据"
    v-loading="dataLoading"
  >
    <div :ref="'echarts'" style="height:100%;" :style="pieStyle"></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/pie'

export default {
  mixins: [mixins],

  props: {
    data: {
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
    data: {
      handler(obj) {
        if (obj.data === null) {
          this.dataLoading = true
          return
        }
        this.dataLoading = false
        this.setOption(obj)
      },
      deep: true
    }
  },

  mounted() {
    this.initEcharts('echarts')
  },

  methods: {
    setOption(obj) {
      let option = initOption(obj)
      this.echarts.setOption(option)
    }
  }
}
</script>
