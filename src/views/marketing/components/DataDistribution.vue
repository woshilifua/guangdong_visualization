<template>
  <div>
    <el-row>
      <el-col>
        <BarEcharts />
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      style="background-color: #fafbfc; padding: 20px;"
    >
      <el-col :span="8">
        <PieEcharts />
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12">
            <ProductSuggestions />
          </el-col>
          <el-col :span="12">
            <ProductSuggestions />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      style="background-color: #fafbfc; padding: 20px;"
    >
      <el-col :span="20">
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
