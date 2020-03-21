<template>
  <div>
    <div
      :ref="'echarts'"
      style="height: 240px;"
      element-loading-spinner="null"
      element-loading-text="暂无该分类数据"
      v-loading="dataLoading"
      :style="barStyle"
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
    barStyle: {
      type: Object,
      required: false
    },
    /*
     * @barData 的结构
     * @title  视图的标题
     * @data   第一组数据
     * @dataName 第一组数据的名称
     * @correlationData 第二组数据
     * @correlationDataName 第二组数据的名称
     * @related 是否有关联的数据
     * @option bar 的一些配置选项
     */
    barData: {
      type: Object,
      required: true
    },
    region: {
      type: Object,
      required: false
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
    },

    setEchartsEvent() {
      if (!this.barData.related) return // 没有关联的数据不需要监听
      this.echarts.on('mouseover', 'series', params => {
        this.$eventBus.$emit('active-bar', params.name)
      })
    }
  }
}
</script>

<style></style>
