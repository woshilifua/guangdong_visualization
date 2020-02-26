<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :span="24">
        <Region-Selector :region="region" />
        <Map :region="region" />
      </el-col>
      <!-- <el-col :span="14"> </el-col> -->
    </el-row>
  </div>
</template>
<script>
import Map from './components/Map'
import RegionSelector from './components/RegionSelector'
export default {
  components: {
    Map,
    RegionSelector
  },

  data() {
    return {
      region: {
        name: '广东省',
        level: 'city',
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
