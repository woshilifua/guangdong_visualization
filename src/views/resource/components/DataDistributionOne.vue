<template>
  <div class="charts-container">
    <el-row>
      <el-col>
        <BarEcharts :data="barData" :region="region" :barStyle="barStyle" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import { getRegionData } from '@/api/resource'

export default {
  props: {
    region: {
      type: Object,
      required: true
    }
  },

  components: {
    BarEcharts
  },

  data() {
    return {
      barData: {
        title: '',
        data: null,
        correlationData: null,
        related: false
      },
      barStyle: {
        height: '400px'
      },
      industry: '写字楼'
    }
  },

  computed: {
    conditions() {
      // 监听 region， $route 和 industry 的变化
      return [this.region, this.$route.name, this.industry]
    }
  },

  watch: {
    conditions: {
      handler() {
        this.getRegionData(this.region, this.$route.name, this.industry)
      }
    }
  },

  beforeMount() {
    this.$eventBus.$on('active-bar', key => {
      this.industry = key
    })
  },

  mounted() {
    this.getRegionData(this.region, this.$route.name, this.industry)
  },

  methods: {
    getRegionData(region, scene, industry) {
      getRegionData(region, scene, industry).then(res => {
        // 柱状图显示的数据
        /*
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
      })
    }
  }
}
</script>
