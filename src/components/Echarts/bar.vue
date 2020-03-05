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
      handler(obj) {
        // 判断数据为空的情况
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
    setOption(data) {
      let option = initOption(data)
      this.echarts.setOption(option)
    },

    setEchartsEvent() {
      this.echarts.on('mouseover', 'series', params => {
        this.$eventBus.$emit('active-bar', params.name)
      })
    }
  }
}
</script>

<style></style>
