<template>
  <div>
    <el-tag>业态类型</el-tag>
    <el-select
      v-model="type"
      value-key="name"
      placeholder="选择类型"
      size="small"
      @change="handleTypeChange(type)"
    >
      <el-option
        v-for="item in types"
        :key="item.name"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: {
        name: '网吧'
      },
      types: [
        { name: '餐饮' },
        { name: '房产建筑' },
        { name: '房产中介' },
        { name: '会展会务' },
        { name: '酒店住宿' },
        { name: '旅行社' },
        { name: '律所' },
        { name: '农业生产经营' },
        { name: '商超' },
        { name: '网吧' },
        { name: '药店' }
      ]
    }
  },

  methods: {
    handleTypeChange(type) {
      this.$eventBus.$emit('change-type', type.name)
    }
  }
}
</script>

<style></style>
