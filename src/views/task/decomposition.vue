<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <Filters />
        </el-col>
        <el-col :span="12">
          <Map :region="region" />
        </el-col>
      </el-row>
      <Checklist />
    </el-card>
  </div>
</template>

<script>
import Filters from './components/Filter'
import Map from './components/Map'
import Checklist from './components/Checklist'

export default {
  components: {
    Filters,
    Map,
    Checklist
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
  }
}
</script>

<style scoped>
.app-container {
  background-color: #f2f3f8;
}
</style>
