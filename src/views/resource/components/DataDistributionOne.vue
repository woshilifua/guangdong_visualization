<template>
  <div class="charts-container">
    <el-row>
      <el-col>
        <BarEcharts />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'

export default {
  data() {
    return {}
  },

  components: {
    BarEcharts
  }
}
</script>
