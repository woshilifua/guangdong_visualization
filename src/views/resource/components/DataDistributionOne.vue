<template>
  <div class="charts-container">
    <el-row>
      <el-col>
        <BarEcharts :data="echartsData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'

export default {
  data() {
    return {
      echartsData: {
        data: [],
        dataTypes: []
      }
    }
  },

  components: {
    BarEcharts
  }
}
</script>
