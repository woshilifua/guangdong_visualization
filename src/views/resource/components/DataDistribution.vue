<template>
  <div style="min-height: 450px;">
    <el-row>
      <el-col style="height: 240px;">
        <BarEcharts :echartsData="echartsData" :region="region" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="20" style="height: 160px;">
      <el-col :span="10">
        <PieEcharts />
      </el-col>
      <el-col :span="10">12</el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import PieEcharts from '@/components/Echarts/pie'
import { getData } from '@/api/resource'

export default {
  props: {
    region: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      echartsData: {
        data: [0, 0, 0, 0],
        dataAxis: ['楼宇', '园区', '专业市场', '高端聚类']
      }
    }
  },

  components: {
    BarEcharts,
    PieEcharts
  },

  computed: {
    adCode() {
      return this.region.adcode
    }
  },

  watch: {
    adCode: {
      handler(val) {
        this.getData(val)
      },
      immediate: false
    }
  },

  mounted() {
    this.getData(this.region.adcode)
  },

  methods: {
    getData(adcode) {
      getData(adcode).then(res => {
        this.echartsData = res
      })
    }
  }
}
</script>
