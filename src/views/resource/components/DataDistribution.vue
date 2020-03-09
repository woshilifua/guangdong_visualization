<template>
  <div style="min-height: 450px;">
    <el-row>
      <el-col>
        <el-button
          class="ml-8 fr"
          type="primary"
          size="small"
          icon="el-icon-refresh-left"
          >更新数据</el-button
        >
        <el-tag class="fr">数据更新时间: 2020-02-02</el-tag>
      </el-col>
      <el-col style="height: 240px;">
        <BarEcharts :data="barData" :region="region" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16" style="height: 220px;">
        <PieEcharts :data="pieData" />
      </el-col>
      <el-col :span="12" style="height: 220px;"></el-col>
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
        data: null
      },
      pieData: {
        title: '',
        data: null
      },
      pieDataList: []
    }
  },

  components: {
    BarEcharts,
    PieEcharts
  },

  watch: {
    region: {
      handler(region) {
        this.getData(region, this.$route.name)
      },
      deep: true,
      immediate: false
    }
  },

  mounted() {
    this.getData(this.region, this.$route.name)
    // 监听 bar 的变化
    this.$eventBus.$on('active-bar', key => {
      this.pieData.title = key
      this.pieData.data = this.barData.data[key]
        ? this.barData.data[key].structure
        : null
    })
  },

  methods: {
    getData(region, scene) {
      getData(region, scene).then(res => {
        /* 柱状图显示的数据
         * res = {
         *  title: '广东省楼宇总数 7321',
         *  data: {
         *    写字楼: {
         *       total: 123,
         *       structure: {}
         *    },
         *    高端聚类: {
         *    }
         *  }
         */
        Object.assign(this.barData, res)

        // 饼状图显示的数据, 默认第一个为初始化的数据
        if (res.data === null) {
          this.pieData.data = null
        } else {
          this.pieData.title = Object.keys(res.data)[0]
          this.pieData.data = res.data[Object.keys(res.data)[0]].structure
        }
      })
    }
  },

  beforeDestroy() {
    this.$eventBus.$off('active-bar')
  }
}
</script>
