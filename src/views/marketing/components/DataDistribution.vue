<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="21" style="text-align: right">
        <el-tag>数据更新时间: 2020 年 2 月 2 日</el-tag>
        <el-button
          class="ml-8"
          type="primary"
          size="small"
          icon="el-icon-refresh-left"
          >更新数据</el-button
        >
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <BarEcharts />
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      style="background-color: #fafbfc; padding: 30px 20px;"
    >
      <el-col :span="7">
        <PieEcharts />
      </el-col>

      <el-col :span="6" :offset="1">
        <ProductSuggestions />
      </el-col>
      <el-col :span="6" :offset="1">
        <ProductSuggestions />
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      style="background-color: #fafbfc; padding: 20px;"
    >
      <el-col :span="21">
        <Checklist />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import PieEcharts from '@/components/Echarts/pie'
import ProductSuggestions from './ProductSuggestion'
import Checklist from './Checklist'

export default {
  components: {
    BarEcharts,
    PieEcharts,
    ProductSuggestions,
    Checklist
  },

  data() {
    return {}
  }
}
</script>
