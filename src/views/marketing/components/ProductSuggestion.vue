<template>
  <div>
    <span>产品需求建议</span>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; margin-top: 8px"
    >
      <el-table-column prop="name" label="建议产品需求"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '弹性公网IP（EIP）'
        },
        {
          name: '虚拟私有云（VPC）'
        },
        {
          name: '弹性负载均衡（ELB）'
        }
      ]
    }
  }
}
</script>
