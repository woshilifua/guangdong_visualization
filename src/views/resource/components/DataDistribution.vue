<template>
  <div style="min-height: 450px;">
    <div style="height: 210px; padding: 0;" :ref="'echarts'"></div>
    <el-row :gutter="20" style="height: 160px;">
      <el-col :span="12">12</el-col>
      <el-col :span="12">12</el-col>
    </el-row>
  </div>
</template>

<script>
import mixins from '../mixins/echarts'
import initBarOption from '@/utils/echarts/bar'
import { getTrade } from '@/api/resource'

export default {
  mixins: [mixins],

  data() {
    return {}
  },

  mounted() {
    this.initEcharts(this.$refs['echarts'])
    this.getTrade()
  },

  methods: {
    setEchartsOption(option) {
      this.echarts.setOption(option)
    },

    getTrade() {
      getTrade().then(res => {
        let option = initBarOption(res.data.dataAxis, res.data.data)
        this.setEchartsOption(option)
      })
    }
  }
}
</script>
