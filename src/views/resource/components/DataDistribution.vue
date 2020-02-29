<template>
  <div style="min-height: 450px;">
    <el-row>
      <el-col>
        <BarEcharts />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 160px;">
      <el-col :span="12">
        <PieEcharts />
      </el-col>
      <el-col :span="12">12</el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import PieEcharts from '@/components/Echarts/pie'

export default {
  data() {
    return {}
  },

  components: {
    BarEcharts,
    PieEcharts
  }
}
</script>
