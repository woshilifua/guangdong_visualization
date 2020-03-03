<template>
  <div style="min-height: 450px;">
    <el-row>
      <el-col style="height: 240px;">
        <BarEcharts :data="barData" :region="region" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="20">
      <el-col :span="12" style="height: 220px; padding-top: 10px;">
        <PieEcharts :data="pieData" />
      </el-col>
      <el-col :span="12">12</el-col>
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
      barData: {
        data: [0, 0, 0, 0],
        dataAxis: ['楼宇', '园区', '专业市场', '高端聚类']
      },
      pieData: {
        data: {
          name: '',
          items: []
        }
      },
      pieDataList: []
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
    // 监听 bar 的变化
    this.$eventBus.$on('active-bar', index => {
      this.pieData = this.pieDataList[index]
    })
  },

  methods: {
    getData(adcode) {
      getData(adcode).then(res => {
        // 柱状图显示的数据
        this.barData = res
        if (res.structure) {
          this.pieDataList = res.structure
          // 饼状图显示的数据, 默认第一个为初始化的数据
          this.pieData = this.pieDataList[0]
        }
      })
    }
  },

  beforeDestroy() {
    this.$eventBus.$off('active-bar')
  }
}
</script>
