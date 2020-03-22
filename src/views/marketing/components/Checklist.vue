<template>
  <div
    element-loading-spinner="null"
    element-loading-text="暂无该分类数据"
    v-loading="type !== '网吧' || city !== '广州市'"
  >
    <el-table
      :data="checklist"
      height="360"
      style="width: 100%; font-size: 12px"
    >
      <el-table-column prop="district" sortable label="区域" width="140px">
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="location" label="地理位置"> </el-table-column>
      <!-- <el-table-column prop="type" label="类型" width="100px" v-if="type">
      </el-table-column> -->
      <!-- <el-table-column prop="amount" label="房间数量" width="70px">
      </el-table-column> -->
      <el-table-column label="客户质量" width="80px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.score" size="small" style="width: 50px;">
            {{ scope.row.score | quality }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" align="middle">
      <el-col :span="6"><span></span></el-col>
      <el-col :span="12" style="text-align: center;">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-col>
      <el-col :span="6">
        <el-button size="small" type="primary" class="mt-20 mb-20 fr"
          >导出该类型客户为 Excel</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDemoList } from '@/api/table'
export default {
  props: {
    city: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      value: 3,
      checklist: [],
      dataLoading: false
    }
  },

  methods: {
    getDemoList(city, type) {
      getDemoList(city, type).then(res => {
        if (!res.data) return
        this.checklist = res.data
      })
    }
  },

  mounted() {
    this.getDemoList(this.city, this.type)
  },

  filters: {
    quality: val => {
      switch (val) {
        case 'success':
          return '优秀'
        case 'warning':
          return '良好'
        default:
          return '优秀'
      }
    }
  }
}
</script>
