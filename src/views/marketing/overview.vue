<template>
  <div
    style="background-color: #FFF; border-top: 1px solid #eee; padding-bottom: 30px;"
  >
    <p class="title">广东省农商客户概况</p>
    <el-row type="flex" justify="center" align="top" :gutter="10">
      <el-col :span="17">
        <el-row :gutter="10">
          <el-col :span="6" v-for="item in items" v-bind:key="item.name">
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
                  >{{ item.name }}</el-card
                >
              </el-col>
            </el-row>
            <el-row class="mt-8">
              <el-col v-for="(subItem, index) in item.list" v-bind:key="index">
                <div class="item" :style="getItemStyle(subItem, index)">
                  <p class="item-name">{{ subItem[1] }}</p>
                  <p class="item-count">
                    数量:
                    <span>{{ subItem[2] | tranNumber }}</span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card
          :body-style="{
            padding: '8px',
            'font-weight': '500',
            'font-size': '14px',
            'text-align': 'center'
          }"
          shadow="never"
          >连锁商铺</el-card
        >
        <TreeMapEcharts
          :treeMapData="treeMapData"
          :treeMapStyle="treeMapStyle"
          class="mt-8"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { data, treeMapData } from '@/data/marketing/overview'
import TreeMapEcharts from '@/components/Echarts/tree-map'
import { tranNumber } from '@/utils/format'

const BGCOLORS = [
  '#8776e6',
  '#4b8afa',
  '#67c4e5',
  '#4f8df7',
  '#ec6a52',
  '#e7c45b',
  '#4b8afa'
]

export default {
  components: {
    TreeMapEcharts
  },

  filters: {
    tranNumber: value => {
      return tranNumber(value)
    }
  },

  data() {
    return {
      items: data,
      treeMapData: treeMapData,
      treeMapStyle: {
        height: '440px'
      }
    }
  },

  methods: {
    getItemStyle(item, index) {
      return {
        height: item[3],
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
  position: relative;
  height: 120px;
  font-size: 13px;
  background-color: #4f8df7;
  color: #fff;
  padding: 8px;
  border-radius: 2px;
  border: 1px solid #fff;
}
.item .item-count {
  position: absolute;
  bottom: 8px;
  right: 8px;
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
