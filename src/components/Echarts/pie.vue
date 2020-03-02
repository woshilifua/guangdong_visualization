<template>
  <div class="pie-container">
    <div :ref="'echarts'" style=" height: 180px;"></div>
  </div>
</template>

<script>
import mixins from './mixins/'
import initOption from '@/utils/echarts/pie'

const data = {
  name: '楼宇细分属性构成',
  items: [
    {
      name: 'A类',
      value: 1525
    },
    {
      name: 'B类',
      value: 444
    },
    {
      name: 'C类',
      value: 127
    }
  ]
}
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
    let option = initOption(data)
    this.setOption(option)
  }
}
</script>

<style></style>
