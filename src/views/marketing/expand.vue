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
      <DataDistribution :type="type" />
      <el-row type="flex" justify="center">
        <el-col :span="21">
          <el-divider content-position="left"
            >{{ this.city }}{{ this.type }}行业细分构成及建议产品</el-divider
          >
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" :gutter="20">
        <el-col :span="8">
          <PieEcharts :pieData="pieData" :pieStyle="pieStyle" />
        </el-col>
        <el-col :span="13">
          <ProductSuggestions :type="type" />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="mt-20">
        <el-col :span="21">
          <el-divider content-position="left">
            {{ this.city }}{{ this.type }}行业客户清单
          </el-divider>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="mt-20">
        <el-col :span="21">
          <Checklist :city="city" :type="type" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Overview from './components/Overview'
import DataDistribution from './components/DataDistribution'
import FormatSelector from './components/FormatSelector'
import Checklist from './components/Checklist'
import PieEcharts from '@/components/Echarts/pie'
import ProductSuggestions from './components/ProductSuggestion'
import marketing from '@/api/marketing/data'

export default {
  components: {
    Overview,
    FormatSelector,
    DataDistribution,
    PieEcharts,
    ProductSuggestions,
    Checklist
  },
  data() {
    return {
      city: '广州市',
      type: '网吧',
      pieData: {
        title: '',
        data: null
      },
      pieStyle: {
        height: '180px'
      }
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
        this.getMarketingStructureData(this.city, this.type)
      },
      immediate: true
    }
  },

  mounted() {
    this.$eventBus.$on('active-bar', city => {
      this.city = city
    })
    this.$eventBus.$on('change-type', type => {
      this.type = type
    })
  },

  methods: {
    getMarketingStructureData(city, type) {
      marketing.getStructData(city, type).then(res => {
        Object.assign(this.pieData, res)
      })
    }
  },

  beforeDestroy() {
    this.$eventBus.$off('change-type')
  }
}
</script>
<style scoped>
.app-container {
  background-color: #f2f3f8;
}
</style>
