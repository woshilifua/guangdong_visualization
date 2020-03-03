<template>
  <div class="map-container" v-loading="loading">
    <div id="map" class="map" tabindex="0" />
  </div>
</template>

<script>
/*
  页面所有的变更都由 adCode 来触发
  props 中的 adCode 变更会导致 areaNode 的变更
  切换 adCode
    事件
      1. 点击区域         #featureClick 事件
      2. 返回上级         #outsideClick 事件
      3. 下拉框选择       #通过 watch adCode 触发
      4. 返回按钮
    方法
      switch2AreaNode
        设置当前的 AreaNode
        调用 renderAreaNode
          1. 清除已有的绘制
          2. 绘制边界
          3. 清除已有的标签
          4. 添加标签
*/
// TODO 添加返回按钮 Done
// TODO 添加区域的限制
import { mapStyles } from '@/config/map'
import mixins from '../mixins/map'

const levelMap = {
  province: 'nation',
  city: 'province',
  district: 'city'
}

export default {
  props: {
    region: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      districtExplorer: null,
      currentAreaNode: null,
      areaNodeLabels: []
    }
  },
  mixins: [mixins],
  computed: {
    adCode() {
      return this.region.adcode
    }
  },
  watch: {
    adCode: {
      handler(adCode) {
        // TODO adCode 切换处理
        this.switch2AreaNode(adCode)
        console.log(adCode, '地图根据 adCode 切换样式')
      },
      immediate: false
    }
  },
  methods: {
    initDistrictExplorer(adCode) {
      // eslint-disable-next-line
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        this.districtExplorer = new DistrictExplorer({
          eventSupport: true,
          map: this.map
        })
        this.switch2AreaNode(adCode)
        this.addDistrictEvents()
      })
    },

    addDistrictEvents() {
      this.districtExplorer.on(
        'featureMouseout featureMouseover',
        (e, feature) => {
          let isHover = e.type === 'featureMouseover'
          // 触发悬停效果
          this.toggleHoverFeature(feature, isHover)
        }
      )

      this.districtExplorer.on('featureClick', (e, feature) => {
        let props = feature.properties
        if (props.adcode === this.adCode) return
        this.$eventBus.$emit('change-region', {
          adcode: props.adcode,
          level: props.level
        })
      })

      this.districtExplorer.on('outsideClick', () => {
        //TODO 最后一层点击的时候有问题
        this.blackToParentAreaNode()
      })
    },

    blackToParentAreaNode() {
      let parentFeature = this.currentAreaNode.getParentFeature()
      let acroutes = parentFeature.properties.acroutes
      let level = levelMap[parentFeature.properties.level]
      /*
        判断 level 的等级，如果不在 userRegion 的 scope 里，并且不等于 userRegion 的 level, 则判定为超出了 userRegion 的范围
      */
      if (acroutes.length > 1) {
        this.$eventBus.$emit('change-region', {
          adcode: this._.last(acroutes),
          level: level
        })
      }
    },

    loadAreaNode(adCode) {
      // 根据 adCode 获取 areaNode
      this.districtExplorer.loadAreaNode(adCode, (err, areaNode) => {
        if (err) {
          return
        }
        this.currentAreaNode = areaNode
        this.districtExplorer.setAreaNodesForLocating([this.currentAreaNode])
        // 根据当前节点设置地图边界
        this.map.setBounds(this.currentAreaNode.getBounds(), null, null, true)
        // 清除已有的绘制内容
        this.districtExplorer.clearFeaturePolygons()
        // 绘制 AreaNode
        this.renderAreaNode(areaNode)
        this.renderSubAreaNode(areaNode)
        // 清除已绘制的 Label
        this.removeAreaNodeLables()
        // 通过 districtExplorer.renderSubFeatures 方法加载到 subAreaNodes
        this.setAreaNodeLabel(areaNode)
      })
    },

    renderAreaNode(areaNode) {
      let hasSub = this._.has(areaNode, '_data.geoData.lngLatSubList')
      if (!hasSub) {
        mapStyles.areaNodeStyle.fillColor = mapStyles.fillColor
      } else {
        mapStyles.areaNodeStyle.fillColor = null
      }
      this.districtExplorer.renderParentFeature(
        areaNode,
        mapStyles.areaNodeStyle
      )
    },

    renderSubAreaNode(areaNode) {
      this.districtExplorer.renderSubFeatures(areaNode, () => {
        return mapStyles.subAreaNodeStyle
      })
    },

    triggerAreaNodeSuspension(adCode, action) {
      let fillOpacity = action === 'on' ? 0.8 : 0.2
      let polys = this.districtExplorer.findFeaturePolygonsByAdcode(adCode)
      polys.forEach(item => {
        item.setOptions({
          fillOpacity: fillOpacity
        })
      })
    },

    toggleHoverFeature(feature, isHover) {
      let props = feature.properties
      let polys = this.districtExplorer.findFeaturePolygonsByAdcode(
        props.adcode
      )
      polys.forEach(item => {
        item.setOptions({
          fillColor: isHover ? mapStyles.fillHoverColor : mapStyles.fillColor
        })
      })
    },

    setAreaNodeLabel(areaNode) {
      let hasSub = this._.has(areaNode, '_data.geoData.lngLatSubList')
      if (hasSub) {
        let subAreaNodes = areaNode._data.geoData.lngLatSubList
        this.renderSubAreaNodeLabel(subAreaNodes)
      } else {
        this.renderAreaNodeLable(areaNode)
      }
    },

    renderAreaNodeLable(areaNode) {
      let props = areaNode._data.geoData.parent.properties
      this.addLabelToMap(props)
    },

    renderSubAreaNodeLabel(subAreaNodes) {
      subAreaNodes.forEach(item => {
        let props = item.properties
        this.addLabelToMap(props)
      })
    },

    addLabelToMap(props) {
      let position = []
      if (this._.has(props, 'centroid')) {
        position = [props.centroid[0], props.centroid[1]]
      } else {
        position = [props.center[0], props.center[1]]
      }
      // eslint-disable-next-line
      let label = new AMap.Text({
        text: props.name,
        position: position,
        style: mapStyles.areaNodeLabelStyle
      })
      this.areaNodeLabels.push(label)
      label.setMap(this.map)
    },

    removeAreaNodeLables() {
      this.map.remove(this.areaNodeLabels)
    },

    switch2AreaNode(adCode) {
      // 跳转到指定的行政区域
      if (this.currentAreaNode && this.currentAreaNode.getAdcode() == adCode)
        return
      // 加载 Area Node
      this.loadAreaNode(adCode)
    }
  }
}
</script>

<style scoped>
.map-container {
  border: none;
  position: relative;
}
.map {
  height: 440px;
}
</style>
