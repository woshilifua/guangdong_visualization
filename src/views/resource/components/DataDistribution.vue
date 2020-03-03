<template>
  <div style="min-height: 450px;">
    <el-row>
      <el-col style="height: 240px;">
        <BarEcharts :data="barData" :region="region" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12" style="height: 220px;">
        <PieEcharts :data="pieData" />
      </el-col>
      <el-col :span="12" style="height: 220px;">
        <PieEcharts :data="pieData" />
      </el-col>
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
        title: '',
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
      if (!this.pieDataList.length) return
      this.pieData = this.pieDataList[index]
    })
  },

  methods: {
    getData(adcode) {
      getData(adcode).then(res => {
        // 柱状图显示的数据
        this.barData = Object.assign({}, this.barData, res)
        this.barData.title = this.setBarChartsTitle(res.data)

        // 饼状图显示的数据, 默认第一个为初始化的数据
        this.pieDataList = res.structure
        this.pieData = this.pieDataList[0]
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
  },

  beforeDestroy() {
    this.$eventBus.$off('active-bar')
  }
}
</script>
