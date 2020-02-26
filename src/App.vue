<template>
  <div id="app">
    <router-view v-if="mapLoaded" />
  </div>
</template>

<script>
import remoteLoad from '@/utils/remote-load'
export default {
  name: 'App',
  data() {
    return {
      mapLoaded: false
    }
  },
  beforeMount() {
    this.loadMap()
  },
  methods: {
    async loadMap() {
      // TODO 地图加载出错的处理
      await remoteLoad(process.env.VUE_APP_MAP_API_URL)
      await remoteLoad(process.env.VUE_APP_MAP_UI_API_URL)
      this.mapLoaded = true
    }
  }
}
</script>
