<template>
  <div class="app-container">
    <el-card shadow="never">
      <!-- 当视口在 lg 及以上尺寸时隐藏 -->
      <el-row :gutter="20">
        <el-col :span="12" :xl="6">
          <Filters />
        </el-col>
        <el-col :span="12" :xl="18">
          <Map :region="region" />
        </el-col>
        <el-col :span="24" class="mt-20">
          <Checklist />
        </el-col>
      </el-row>
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

@media only screen and (max-width: 1920px) {
  .hidden-lg-and-down {
    display: none !important;
  }
  .map {
    height: 800px;
  }
}

@media only screen and (min-width: 1920px) {
  .hidden-lg-and-up {
    display: none !important;
  }
  .map {
    height: 800px;
  }
}
</style>
