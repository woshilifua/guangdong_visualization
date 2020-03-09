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
      <DataDistribution />
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
  }
}
</script>
<style scoped>
.app-container {
  background-color: #f2f3f8;
}
</style>
