<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; margin-top: 8px; font-size: 12px;"
      element-loading-spinner="null"
      element-loading-text="暂无该分类数据"
      v-loading="type !== '网吧'"
    >
      <el-table-column label="建议产品" width="120px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <img
              src="@/assets/images/product_1.png"
              width="475px"
              height="375px;"
            />
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="产品描述"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      tableData: [
        {
          name: '基础通信',
          desc: '小微宽带'
        },
        {
          name: '客房服务',
          desc: '云WiFi|上网信息安全审计|智能固话|和商务TV|云PBX'
        },
        {
          name: '运营管理',
          desc: '智能烟感|云酒店管理|和支付'
        }
      ]
    }
  }
}
</script>
