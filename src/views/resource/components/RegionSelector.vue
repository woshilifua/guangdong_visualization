<template>
  <div class="block">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select v-model="province" placeholder="请选择" disabled>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-select v-model="city" value-key="adcode" placeholder="市">
          <el-option
            v-for="item in cityList"
            :key="item.adcode"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-select v-model="district" placeholder="区">
          <el-option
            v-for="item in districtList"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDistrict } from '@/api/map'

export default {
  props: {
    region: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      province: '广东省',
      cityList: [],
      city: null,
      districtList: [],
      district: null
    }
  },

  mounted() {
    this.getDistrict()
  },

  computed: {
    adCode() {
      return this.region.adcode
    }
  },

  watch: {
    /*
     * 监听 region 的 adcode 变化
     */
    adCode: {
      handler() {
        this.handleSelector(this.region)
      },
      immediate: false
    },

    city: {
      handler(val) {
        if (val === null) return
        this.district = null
        this.districtList = val.districts
        this.$eventBus.$emit('change-region', {
          adcode: Number(val.adcode)
        })
      },
      immediate: false
    },

    district: {
      handler(val) {
        if (val === null) return
        this.district = null
        this.districtList = val.districts
        this.$eventBus.$emit('change-region', {
          adcode: Number(val.adcode)
        })
      },
      immediate: false
    }
  },

  methods: {
    getDistrict() {
      let params = {
        key: process.env.VUE_APP_MAP_API_KEY,
        keywords: '广东',
        subdistrict: 3,
        extensions: 'base'
      }
      getDistrict(params).then(rep => {
        this.cityList = rep.districts[0].districts
      })
    },

    // TODO bug 区域和地图没有对应上
    handleSelector(region) {
      if (region.level === 'province') {
        this.city = null
      } else if (region.level === 'city') {
        this.district = null
        this.cityList.forEach(item => {
          if (item.adcode === String(region.adcode)) {
            this.city = item
          }
        })
      } else if (region.level === 'district') {
        this.districtList.forEach(item => {
          if (item.adcode === String(region.adcode)) {
            this.district = item
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.map-container {
  margin-top: 20px;
}
</style>
