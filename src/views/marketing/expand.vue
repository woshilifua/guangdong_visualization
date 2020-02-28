<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row type="flex" align="middel" class="header">
        <el-col :span="8">
          <RegionSelector :region="region" style="height: 100%" />
        </el-col>
        <el-col :span="4">
          <span>32002 家</span>
          <span>客户总数</span>
        </el-col>
        <el-col :span="4">
          <span>300,000 元</span>
          <span>收入总数</span>
        </el-col>
        <el-col :span="4">
          <span>12 元</span>
          <span>平均客户收入</span>
        </el-col>
        <el-col :span="4">
          <span>第二</span>
          <span>平均客户收入排名</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import RegionSelector from './components/RegionSelector'

export default {
  components: {
    RegionSelector
  },

  data() {
    return {
      region: {
        level: 'province',
        adcode: 440000,
        center: [113.280637, 23.125178]
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100%;
  background-color: #f2f3f8;
}
.header span {
  text-align: left;
  display: block;
  line-height: 24px;
  font-size: 14px;
}
.header span:first-of-type {
  color: #022c54;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 6px;
}
.bl {
  border-left: 1px solid #022c54;
}
</style>
