<template>
  <div class="charts-container">
    <el-row>
      <el-col>
        <BarEcharts :barData="barData" :region="region" :barStyle="barStyle" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import regionAPI from '@/api/resource/region'
import { dataZoom } from '@/utils/echarts/data-zoom-style'

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
        title: null,
        data: null,
        correlationData: null,
        related: false,
        option: Object.assign(
          {},
          {
            ...dataZoom,
            legend: {
              show: true,
              left: 'right'
            }
          }
        )
      },
      barStyle: {
        height: '400px'
      },
      industry: '零星商铺'
    }
  },

  computed: {
    conditions() {
      // 监听 region，route 和 industry 的变化
      return [this.region, this.$route.name, this.industry]
    }
  },

  watch: {
    conditions: {
      handler() {
        this.getRegionData(this.region, this.$route.name, this.industry)
      },
      deep: true
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
      regionAPI.getData(region, scene, industry).then(res => {
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
