<template>
  <div
    style="height:100%; background-color: #fafbfc; padding: 20px;"
    element-loading-spinner="null"
    element-loading-text="暂无该分类数据"
    v-loading="dataLoading"
  >
    <div :ref="'echarts'" style="height:100%;"></div>
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
    }
  },

  data() {
    return {
      dataLoading: true
    }
  },

  watch: {
    data: {
      handler(val) {
        if (!val || val.items === undefined) {
          this.dataLoading = true
          return
        }
        this.dataLoading = false
        this.setOption(val)
      },
      deep: true
    }
  },

  mounted() {
    this.initEcharts('echarts')
  },

  methods: {
    setOption(data) {
      let option = initOption(data)
      this.echarts.setOption(option)
    }
  }
}
</script>
