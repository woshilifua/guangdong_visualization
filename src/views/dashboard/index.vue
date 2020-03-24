<template>
  <div
    style="background-color: #FFF; border-top: 1px solid #eee; padding-bottom: 30px;"
  >
    <el-row type="flex" justify="start" align="top" :gutter="10" class="mt-20">
      <el-col :span="6" :offset="1">
        <Region-Selector :region="region" :regionLevels="regionLevels" />
      </el-col>
      <el-col :span="12">
        <span class="title">{{ this.region.name }}农商客户行业分布概况</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="top" :gutter="10" class="mt-20">
      <el-col :span="22">
        <el-row :gutter="10">
          <el-col :span="8" v-for="item in items" v-bind:key="item.name">
            <el-row>
              <el-col :span="24">
                <el-card
                  :body-style="{
                    padding: '8px',
                    'font-weight': '500',
                    'font-size': '14px',
                    'text-align': 'center'
                  }"
                  shadow="never"
                  >{{ item.name }}数量: {{ item.value | tranNumber }}</el-card
                >
              </el-col>
            </el-row>
            <el-row class="mt-8">
              <el-col v-for="(subItem, index) in item.list" v-bind:key="index">
                <div class="item" :style="getItemStyle(subItem, index)">
                  <p class="item-name">{{ subItem.name }}</p>
                  <p class="item-count">
                    数量:
                    <span>{{ subItem.value | tranNumber }}</span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { tranNumber } from '@/utils/format'
import RegionSelector from '@/components/RegionSelector'
import dashboard from '@/api/dashboard/data'

const BGCOLORS = [
  '#ec6a52',
  '#4b8afa',
  '#67c4e5',
  '#4f8df7',
  '#8776e6',
  '#e7c45b',
  '#4b8afa'
]

export default {
  components: {
    RegionSelector
  },

  filters: {
    tranNumber: value => {
      return tranNumber(value)
    }
  },

  data() {
    return {
      items: [],
      regionLevels: ['province', 'city'],
      region: {
        adcode: 440000,
        name: '广东省'
      }
    }
  },

  watch: {
    region: {
      handler(val) {
        this.getData(val)
      },
      deep: true
    }
  },

  mounted() {
    this.getData(this.region)
    this.$eventBus.$on('change-region', obj => {
      Object.assign(this.region, obj)
    })
  },

  methods: {
    getData(region) {
      dashboard.getData(region).then(res => {
        this.items = res.data
        this.$forceUpdate()
      })
    },
    getItemStyle(item, index) {
      return {
        height: item.proportion * 30 + 'px',
        'background-color': BGCOLORS[index]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 30px;
  font-size: 23px;
  font-weight: 600;
  text-align: center;
}
.sub-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  border: 1px solid #fff;
}
.item {
  height: 80px;
  font-size: 13px;
  background-color: #4f8df7;
  color: #fff;
  padding: 8px;
  border-radius: 2px;
  border: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item .item-count {
}
.item .item-name {
  font-weight: 500;
}
.item .item-count span {
  font-weight: 500;
  font-size: 20px;
}
.test {
  color: #8776e6;
  color: #fdbf36;
  color: #67c4e5;
  color: #4f8df7;
  color: #ec6a52;
  color: #e7c45b;
  color: #4b8afa;
}
</style>
