<template>
  <div>
    <div style="height: 240px; padding: 0;" :ref="'echarts'"></div>
    <el-row
      type="flex"
      justify="center"
      style="background-color: #fafbfc; padding: 20px;"
    >
      <el-col :span="8">
        <PieEcharts :data="pieData" />
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
import mixins from '../mixins/echarts'
import initBarOption from '@/utils/echarts/bar'
import PieEcharts from '@/components/Echarts/pie'
import ProductSuggestions from './ProductSuggestion'
import Checklist from './Checklist'
import { getTrade } from '@/api/resource'

export default {
  components: {
    PieEcharts,
    ProductSuggestions,
    Checklist
  },

  mixins: [mixins],

  data() {
    return {
      pieData: {
        name: '楼宇细分属性构成',
        'e-type': 'pie',
        items: [
          {
            name: 'A类',
            value: 1525
          },
          {
            name: 'B类',
            value: 444
          },
          {
            name: 'C类',
            value: 127
          }
        ]
      }
    }
  },

  mounted() {
    this.initEcharts(this.$refs['echarts'])
    this.getTrade()
  },

  methods: {
    setEchartsOption(option) {
      this.echarts.setOption(option)
    },

    getTrade() {
      getTrade().then(res => {
        let option = initBarOption(res.data.dataAxis, res.data.data)
        this.setEchartsOption(option)
      })
    }
  }
}
</script>
