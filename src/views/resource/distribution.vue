<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card shadow="never">
          <Region-Selector :region="region" />
          <Map :region="region" class="mt-20" />
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="never">
          <DataDistribution />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt-20">
      <el-col :span="24">
        <el-card shadow="never">
          <DataDistributionOne />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Map from './components/Map'
import RegionSelector from '@/components/RegionSelector'
import DataDistribution from './components/DataDistribution'
import DataDistributionOne from './components/DataDistributionOne'

export default {
  components: {
    Map,
    RegionSelector,
    DataDistribution,
    DataDistributionOne
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
