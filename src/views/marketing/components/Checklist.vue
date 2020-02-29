<template>
  <div>
    <el-table :data="checklist" height="320" border style="width: 100%">
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
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
