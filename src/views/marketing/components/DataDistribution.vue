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
        <BarEcharts :barData="barData" :barStyle="barStyle" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import marketing from '@/api/marketing/data'

import { dataZoom } from '@/utils/echarts/data-zoom-style'

export default {
  components: {
    BarEcharts
  },

  props: {
    type: {
      type: String
    }
  },

  data() {
    return {
      barData: {
        title: '',
        data: null,
        related: true,
        option: Object.assign({}, dataZoom)
      },
      barStyle: {
        height: '300px'
      }
    }
  },

  watch: {
    type: {
      handler(val) {
        this.getMarketingData(val)
      }
    }
  },

  mounted() {
    this.getMarketingData(this.type)
  },

  methods: {
    getMarketingData(type) {
      marketing.getData(type).then(res => {
        // 柱状图显示的数据
        Object.assign(this.barData, res)
      })
    }
  }
}
</script>
