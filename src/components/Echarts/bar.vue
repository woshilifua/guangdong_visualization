<template>
  <div>
    <div :ref="'echarts'" style=" height: 220px;"></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/bar'

var dataAxis = ['写字楼', '园区', '聚类', '市场']
var data = [220, 182, 191, 234]

export default {
  mixins: [mixins],

  props: {
    data: {
      type: Object,
      required: false
    }
  },

  mounted() {
    this.initEcharts('echarts')
    let option = initOption(dataAxis, data)
    this.setOption(option)
  }
}
</script>

<style></style>
