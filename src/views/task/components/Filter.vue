<template>
  <el-form
    ref="form"
    class="form"
    :model="form"
    label-width="80px"
    :label-position="'left'"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="title">省份选择</span>
        <el-form-item label="省份" class="mt-20">
          <el-select v-model="form.province" placeholder="省份选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="form.city" placeholder="城市选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <span class="title">场景选择</span>
        <el-form-item label="建筑" class="mt-20">
          <el-select v-model="form.region" placeholder="建筑类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业态">
          <el-select v-model="form.region" placeholder="业态类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <span class="title">目标提升任务</span>
        <el-form-item label="任务周期" label-width="120px" class="mt-20">
          <el-radio-group v-model="form.range">
            <el-radio label="年度"></el-radio>
            <el-radio label="半年"></el-radio>
            <el-radio label="季度"></el-radio>
            <el-radio label="月度"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户规模增长" label-width="120px">
          <el-input v-model="form.city" placeholder="客户规模增长"> </el-input>
        </el-form-item>
        <el-form-item label="客户规模增长" label-width="120px">
          <el-input
            v-model="form.city"
            label-width="120px"
            placeholder="客户规模增长"
          >
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        province: '',
        city: '',
        structure: '',
        format: '',
        range: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
.form {
  padding: 20px;
}
.title {
  font-weight: 600;
  font-size: 20px;
  display: block;
  line-height: 36px;
  height: 36px;
}
</style>
