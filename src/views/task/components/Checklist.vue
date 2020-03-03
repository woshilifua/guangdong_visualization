<template>
  <div>
    <el-table :data="checklist" height="320" border style="width: 100%">
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
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
import { getChecklist } from '@/api/table'
export default {
  data() {
    return {
      checklist: []
    }
  },

  methods: {
    getChecklist() {
      getChecklist().then(res => {
        this.checklist = res.data.items
      })
    }
  },

  mounted() {
    this.getChecklist()
  }
}
</script>
