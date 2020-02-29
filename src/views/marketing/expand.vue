<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="9">
          <RegionSelector :region="region" />
        </el-col>
        <el-col :span="15">
          <Overview />
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="mt-20">
      <DataDistribution />
      <Checklist />
    </el-card>
  </div>
</template>

<script>
import Overview from './components/Overview'
import RegionSelector from './components/RegionSelector'
import DataDistribution from './components/DataDistribution'
import Checklist from './components/Checklist'

export default {
  components: {
    Overview,
    RegionSelector,
    DataDistribution,
    Checklist
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
