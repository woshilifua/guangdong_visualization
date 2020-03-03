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
    <el-row type="flex" justify="center">
      <el-col :span="21">
        <BarEcharts :data="barData" :region="region" />
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
import { getData } from '@/api/resource'

export default {
  props: {
    region: {
      type: Object,
      required: true
    }
  },

  components: {
    BarEcharts,
    PieEcharts,
    ProductSuggestions,
    Checklist
  },

  data() {
    return {
      barData: {
        title: '',
        data: [0, 0, 0, 0],
        dataAxis: ['楼宇', '园区', '专业市场', '高端聚类']
      }
    }
  },

  mounted() {
    this.getData(this.region.adcode)
  },

  methods: {
    getData(adcode) {
      getData(adcode).then(res => {
        // 柱状图显示的数据
        this.barData = Object.assign({}, this.barData, res)
        this.barData.title = this.setBarChartsTitle(res.data)
      })
    },

    setBarChartsTitle(data) {
      if (!data.length) return
      let result = 0
      data.forEach(item => {
        result += Number(item)
      })
      return `${this.region.name}楼宇数量: ${result}（栋）`
    }
  }
}
</script>
