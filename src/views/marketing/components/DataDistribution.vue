<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="21" style="text-align: right">
        <el-tag>数据更新时间: 2020-02-02</el-tag>
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
      <el-col :span="21" class="mt-20">
        <BarEcharts :barData="barData" :region="region" :barStyle="barStyle" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="21">
        <el-divider content-position="left"
          >{{ this.city }}客户细分构成及建议产品</el-divider
        >
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" :gutter="20">
      <el-col :span="8">
        <PieEcharts :pieData="pieData" :pieStyle="pieStyle" />
      </el-col>
      <el-col :span="13">
        <ProductSuggestions />
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="mt-20">
      <el-col :span="21">
        <el-divider content-position="left">{{ this.city }}客户清单</el-divider>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="mt-10">
      <el-col :span="21">
        <Checklist :city="city" :type="type"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import PieEcharts from '@/components/Echarts/pie'
import ProductSuggestions from './ProductSuggestion'
import Checklist from './Checklist'
import { getFirstCity } from '@/utils/common'
import { getMarketingData, getMarkeitngStructureData } from '@/api/resource'

export default {
  components: {
    BarEcharts,
    PieEcharts,
    ProductSuggestions,
    Checklist
  },

  data() {
    return {
      region: {
        level: 'province',
        adcode: 440000,
        name: '广东省',
        center: [113.280637, 23.125178]
      },
      barData: {
        title: '',
        data: null,
        related: true
      },
      barStyle: {
        height: '300px'
      },
      pieData: {
        title: '',
        data: null
      },
      pieStyle: {
        height: '180px'
      },
      city: '广州市',
      type: '餐饮'
    }
  },

  computed: {
    conditions() {
      return [this.city, this.type]
    }
  },

  watch: {
    conditions: {
      handler() {
        this.getMarkeitngStructureData(this.city, this.type)
      },
      immediate: true
    }
  },

  mounted() {
    this.getMarketingData(this.region, '餐饮')

    this.$eventBus.$on('change-type', type => {
      this.type = type
      this.getMarketingData(this.region, type)
    })

    this.$eventBus.$on('active-bar', city => {
      this.city = city
    })
  },

  methods: {
    getMarketingData(region, type) {
      getMarketingData(region, type).then(res => {
        // 柱状图显示的数据
        Object.assign(this.barData, res)
        this.city = getFirstCity(res)
        this.type = type
      })
    },

    getMarkeitngStructureData(city, type) {
      getMarkeitngStructureData(city, type).then(res => {
        Object.assign(this.pieData, res)
      })
    }
  },

  beforeDestroy() {
    this.$eventBus.$off('change-type')
  }
}
</script>
