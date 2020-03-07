<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="7">
          <FormatSelector />
        </el-col>
        <el-col :span="13" :offset="1">
          <Overview />
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="mt-20">
      <DataDistribution :region="region" />
    </el-card>
  </div>
</template>

<script>
import Overview from './components/Overview'
import DataDistribution from './components/DataDistribution'
import FormatSelector from './components/FormatSelector'

export default {
  components: {
    Overview,
    FormatSelector,
    DataDistribution
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
