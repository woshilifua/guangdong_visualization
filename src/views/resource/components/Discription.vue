<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      :show-header="false"
      style="width: 100%; font-size: 10px;"
    >
      <el-table-column prop="name" width="40px" align="center">
      </el-table-column>
      <el-table-column prop="desc"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
const TYPEDISCRIPTIONS = {
  写字楼: [
    {
      name: 'A类',
      desc:
        '楼宇企业平均办公面积大且部分为企业独栋，企业类型主要为大中型企业，楼宇及入驻企业价值高，该部分楼宇物业一般签署网络排他协议'
    },
    {
      name: 'B类',
      desc:
        '楼宇企业平均办公面积较大，企业类型主要为规模型中小型企业，企业人员30人左右，具备基本的IT系统等信息化应用，以带宽30-100M的独享网络为主，客户价值较高，是高质量客户的生力军'
    },
    {
      name: 'C类',
      desc:
        '楼宇企业平均办公面积小，企业类型主要为小微企业， 企业人员10人左右，无IT与系统化应用，该部分楼宇拓展难度低，可作为主要拓展市场'
    }
  ],
  园区: [
    {
      name: '产业园区',
      desc:
        '是指以为促进某一产业发展为目标而创立的特殊区位环境，是区域经济发展、产业调整升级的重要空间聚集形式，担负着聚集创新资源、培育新兴产业、推动城市化建设等一系列的重要使命'
    },
    { name: '化工园区', desc: '又称化学工业区，是指化工类公司所聚集的园区' },
    {
      name: '工业园区',
      desc:
        '是一个国家或区域的政府根据自身经济发展的内在要求，通过行政手段划出一块区域，聚集各种生产要素，在一定空间范围内进行科学整合，提高工业化的集约强度，突出产业特色，优化功能布局，使之成为适应市场竞争和产业升级的现代化产业分工协作生产区'
    },
    {
      name: '物流园区',
      desc:
        '是指在物流作业集中的地区，在几种运输方式衔接地，将多种物流设施和不同类型的物流企业在空间上集中布局的场所，也是一个有一定规模的和具有多种服务功能的物流企业的集结点'
    }
  ],
  高端聚类: [
    {
      name: '商业综合体 ',
      desc:
        '是将城市中商业、办公、居住、旅店、展览、餐饮、会议、文娱等城市生活空间的三项以上功能进行组合，并在各部分间建立一种相互依存、相互裨益的能动关系，从而形成一个多功能、高效率、复杂而统一的综合体'
    },
    {
      name: '商业街区： ',
      desc:
        '是由众多商店、餐饮店、服务店共同组成，按一定结构比例规律排列的商业繁华街道，是城市商业的缩影和精华，是一种多功能、多业种、多业态的商业集合体，既设置了集中商业，又有零散店n'
    }
  ],
  专业市场: [
    {
      name: '农贸市场',
      desc:
        '是农副产品生产者与消费者双方直接进行买卖活动的场所，指经营两类及两类以上农产品的交易市场'
    },
    {
      name: '批发市场',
      desc:
        '是指向再销售者（二次及其以下的批发商和零售商），产业和事业用户销售商品和服务的商业市场'
    },
    {
      name: '综合市场',
      desc:
        '综合型商品交易市场，是指经营不同种类商品的商品交易市场，如果市场中农产品和工业品混杂经营，成交额难以分清主次的，市场类别应为其他综合市场'
    }
  ]
}
export default {
  data() {
    return {
      key: '写字楼',
      tableData: TYPEDISCRIPTIONS['写字楼']
    }
  },

  mounted() {
    this.$eventBus.$on('active-bar', key => {
      if (key === this.key) return
      this.key = key
      this.tableData = TYPEDISCRIPTIONS[key]
      this.$nextTick(function() {
        this.$eventBus.$emit('data-updated')
      })
    })
  }
}
</script>

<style></style>
