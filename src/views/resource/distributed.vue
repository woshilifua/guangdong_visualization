<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :span="10">
        <Map :region="region" />
      </el-col>
      <el-col :span="14"> </el-col>
    </el-row>
  </div>
</template>
<script>
import Map from './components/Map'

export default {
  components: {
    Map
  },
  data() {
    return {
      region: {
        name: '湖南省',
        level: 'city',
        'ad-code': 440000,
        center: [113.280637, 23.125178],
        scope: ['city', 'district'],
        parents: {
          nation: {
            name: '中国',
            'ad-code': 10000
          },
          province: {
            name: '湖南省',
            'ad-code': 430000
          }
        }
      }
    }
  }
}
</script>
