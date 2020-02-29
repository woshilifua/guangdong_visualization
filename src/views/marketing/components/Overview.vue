<template>
  <div>
    <el-row class="header">
      <el-col :span="6">
        <span>32002 家</span>
        <span>客户总数</span>
      </el-col>
      <el-col :span="6">
        <span>300,000 元</span>
        <span>收入总数</span>
      </el-col>
      <el-col :span="6">
        <span>12 元</span>
        <span>平均客户收入</span>
      </el-col>
      <el-col :span="6">
        <span>第二</span>
        <span>平均客户收入排名</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style>
.header span {
  text-align: left;
  display: block;
  line-height: 24px;
  font-size: 14px;
}
.header span:first-of-type {
  color: #022c54;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 6px;
}
</style>
