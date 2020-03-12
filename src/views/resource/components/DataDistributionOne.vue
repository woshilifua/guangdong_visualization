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
        related: false
      },
      barStyle: {
        height: '400px'
      }
    }
  },

  watch: {
    region: {
      handler(region) {
        this.getRegionData(region, this.$route.name)
      },
      deep: true,
      immediate: false
    }
  },

  mounted() {
    this.getRegionData(this.region, this.$route.name)
  },

  methods: {
    getRegionData(region, scene) {
      getRegionData(region, scene).then(res => {
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
