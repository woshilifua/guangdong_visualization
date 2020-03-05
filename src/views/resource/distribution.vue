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
          <DataDistribution :region="region" />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt-20">
      <el-col :span="24">
        <el-card shadow="never">
          <DataDistributionOne :region="region" />
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
import adCode from '@/utils/adcode'

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
        name: '广东省',
        center: [113.280637, 23.125178]
      }
    }
  },

  mounted() {
    this.$eventBus.$on('change-region', obj => {
      if (adCode[obj.adcode]) {
        obj.name = adCode[obj.adcode]
      }
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
