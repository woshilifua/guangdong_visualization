<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6">
          <RegionSelector :region="region" />
        </el-col>
        <el-col :span="15">
          <Overview />
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="mt-20">
      <DataDistribution />
    </el-card>
  </div>
</template>

<script>
import Overview from './components/Overview'
import RegionSelector from '@/components/RegionSelector'
import DataDistribution from './components/DataDistribution'

export default {
  components: {
    Overview,
    RegionSelector,
    DataDistribution
  },

  data() {
    return {
      region: {
        level: 'province',
        adcode: 440000,
        center: [113.280637, 23.125178]
      }
    }
  },

  mounted() {
    this.$eventBus.$on('change-region', obj => {
      Object.assign(this.region, obj)
    })
  },

  beforeDestroy() {
    this.$eventBus.$off('change-region')
  }
}
</script>
<style scoped>
.app-container {
  background-color: #f2f3f8;
}
</style>
