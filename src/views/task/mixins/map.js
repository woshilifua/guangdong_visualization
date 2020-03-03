import { mapConfig } from '@/config/map'

export default {
  data() {
    return {
      map: null,
      loading: true
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // eslint-disable-next-line
      this.map = new AMap.Map('map', Object.assign(mapConfig.global, { center: this.region.center }))
      this.map.on('complete', () => {
        this.loading = false
        this.setMapZoom()
      })
      if (this._.has(this, 'districtExplorer')) {
        this.initDistrictExplorer(this.region.adcode)
      }
    },
    setMapZoom() {
      this.map.setZoom(this.zoom)
    }
  }
}