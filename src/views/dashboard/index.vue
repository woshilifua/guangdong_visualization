<template>
  <div style="background-color: #FFF; border-top: 1px solid #eee">
    <el-row type="flex" justify="center" class="mt-20">
      <el-col :span="22">
        <TreeMapEcharts :treeMapData="treeMapData" />
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <BarEcharts :barData="barData" :barStyle="barStyle" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeMapEcharts from '@/components/Echarts/tree-map'
import BarEcharts from '@/components/Echarts/bar'
import { treeMapData, barData } from '@/data/dashboard/index'
export default {
  components: {
    TreeMapEcharts,
    BarEcharts
  },

  data() {
    return {
      barStyle: {
        height: '330px'
      },
      barData: barData,
      treeMapData: treeMapData
    }
  }
}
</script>

<style lang="scss" scoped></style>
