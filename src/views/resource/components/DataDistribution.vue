<template>
  <div style="min-height: 450px;" ref="right">
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
        <BarEcharts :barData="barData" :region="region" />
      </el-col>
    </el-row>
    <el-row
      type="flex"
      v-if="$route.name === 'Building' || $route.name === 'Format'"
    >
      <el-col :span="24">
        <el-tabs v-model="activeLabel">
          <el-tab-pane :label="`${activeKey}细分构成`" name="first">
            <PieEcharts
              :pieData="pieData"
              :pieStyle="buildingPieStyle"
              v-if="activeLabel === 'first'"
            />
            <Discription
              class="mt-20"
              :activeKey="activeKey"
              v-if="$route.name === 'Building'"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row v-if="$route.name === 'Company'">
      <el-col :span="24">
        <el-tabs v-model="activeLabel">
          <el-tab-pane :label="`${activeKey}细分构成`" name="first">
            <PieEcharts
              :pieData="pieData"
              :pieStyle="pieStyle"
              v-if="activeLabel === 'first'"
            />
          </el-tab-pane>
          <el-tab-pane :label="`${activeKey}行业构成`" name="second">
            <PieEcharts
              :pieData="pieDataOne"
              :pieStyle="pieStyle"
              v-if="activeLabel === 'second'"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarEcharts from '@/components/Echarts/bar'
import PieEcharts from '@/components/Echarts/pie'
import Discription from './Discription'
import { getData } from '@/api/resource'
import { getFirstStructure } from '@/utils/common'

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
        data: null,
        related: true // 是否是关联的 Echarts, false 的时候不需要监听 Echarts 的变化
      },
      pieData: {
        title: '',
        data: null
      },
      pieDataOne: {
        title: '',
        data: null
      },
      pieStyle: {
        height: '240px'
      },
      buildingPieStyle: {
        height: '200px'
      },
      activeLabel: 'first',
      activeKey: ''
    }
  },

  components: {
    BarEcharts,
    PieEcharts,
    Discription
  },

  watch: {
    // 监听 region 的变化获取 data
    region: {
      handler(region) {
        this.getData(region, this.$route.name)
      },
      deep: true,
      immediate: false
    },

    activeKey: {
      handler() {
        this.setPieData()
      }
    }
  },

  mounted() {
    this.getData(this.region, this.$route.name)
    // 监听 bar 的变化
    this.$eventBus.$on('active-bar', key => {
      this.activeKey = key
    })

    this.$eventBus.$on('data-updated', () => {
      this.$eventBus.$emit('change-left-height', this.$refs.right.clientHeight)
    })

    this.$nextTick(function() {
      this.$eventBus.$emit('change-left-height', this.$refs.right.clientHeight)
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
         *       structure: {}, // 第一个 pie 的数据
         *       structureOne: {} // 第二个 pie 的数据
         *    },
         *    高端聚类: {
         *    }
         *  }
         *
         * barData 数据的排序会在 bar component 里面进行
         */
        Object.assign(this.barData, res)
        this.activeKey = getFirstStructure(res, 'structure').title
        this.setPieData()
        // this.$eventBus.$emit('active-bar', this.pieData.title)
      })
    },

    setPieData() {
      if (this.barData.data === null) {
        // 如果 barData 的数据为空，则需要把两个 pie data 都置为空
        this.pieData.data = this.pieDataOne.data = null
      } else {
        let data = this.barData.data[this.activeKey]
        if (!data) return
        Object.assign(this.pieData, {
          title: this.activeKey,
          data: data.structure ? data.structure : null
        })
        Object.assign(this.pieDataOne, {
          title: this.activeKey,
          data: data.structureOne ? data.structureOne : null
        })
      }
    }
  },

  beforeDestroy() {
    this.$eventBus.$off('active-bar')
    this.$eventBus.$off('data-updated')
  }
}
</script>
