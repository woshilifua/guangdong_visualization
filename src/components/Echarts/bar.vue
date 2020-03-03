<template>
  <div>
    <div
      :ref="'echarts'"
      style=" height: 240px;"
      element-loading-spinner="null"
      element-loading-text="暂无该分类数据"
      v-loading="dataLoading"
    ></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/bar'

export default {
  mixins: [mixins],

  data() {
    return {
      dataLoading: true
    }
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    region: {
      type: Object,
      required: false
    }
  },

  watch: {
    data: {
      handler(val) {
        // 判断数据为空的情况
        if (!val.data.length) {
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
    },

    setEchartsEvent() {
      this.echarts.on('mouseover', 'series', params => {
        this.$eventBus.$emit('active-bar', params.dataIndex)
      })
    }
  }
}
</script>

<style></style>
