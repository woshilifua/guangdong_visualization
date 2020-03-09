<template>
  <div>
    <el-table
      :data="checklist"
      height="320"
      border
      style="width: 100%; font-size: 12px"
    >
      <el-table-column prop="district" label="所在区域" width="80px">
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="location" label="地理位置"> </el-table-column>
      <el-table-column prop="type" label="类型" width="100px">
      </el-table-column>
      <el-table-column prop="amount" label="房间数量" width="80px">
      </el-table-column>
      <el-table-column label="客户质量" width="100px" align="center">
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
  data() {
    return {
      value: 3,
      checklist: []
    }
  },

  methods: {
    getDemoList() {
      getDemoList().then(res => {
        this.checklist = res.data
      })
    }
  },

  mounted() {
    this.getDemoList()
  },

  filters: {
    quality: val => {
      switch (val) {
        case 'success':
          return '优秀'
        case 'warning':
          return '良好'
        default:
          return '一般'
      }
    }
  }
}
</script>
