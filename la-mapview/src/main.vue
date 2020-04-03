<template>
  <div class="la-mapview__wrapper"
       :id="name"
       v-show="visible">
    <la-loading v-show="loading"
                 :content="loadingText"></la-loading>
    <slot></slot>
  </div>
</template>

<script>
import { MAPAPP_INITCONF, WIDGET_CONF } from './mapapp.conf'
import analyse from './mixins/analyse'

export default {
  name: 'LaMapview',
  mixins: [analyse],
  props: {
    name: {
      type: String,
      default: `id-mapapp${Math.floor(Math.random() * 10000)}`
    },
    visible: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 0
    },
    linked: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: false
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    mapAppInitConf: {
      type: Object,
      default: null
    },
    widgetConf: {
      type: Object,
      default: null
    },
    fn: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      myLoading: null,
      loadingText: '初次加载，请耐心等待...',
      mapAppFactory: null,
      mapApp: null,
      loading: false,
      areaInfo: null,
      viewLoaded: false,
      startTime: null,
      endTime: null
    }
  },
  beforeCreate () {
    const startTime = new Date().getMilliseconds()
    const me = this
    if (!window.dojo) {
      this.$loadGISUri().then(res => {
        me.$loadGISModules()
      })
    }
  },
  created () {
  },
  mounted () {
    const me = this
    this.loading = true
    this.$bus.$on('layerLoading', bol => {
      if (bol) {
        me.loadingText = '图层加载中，请耐心等待...'
      }
      me.loading = bol
    })
    this.$bus.$on('analysing', bol => {
      if (bol) {
        me.loadingText = '分析进行中，请耐心等待...'
      }
      me.loading = bol
    })
    this.creatMapApp()
  },
  beforeDestroy () {
    this.$bus.$off('layerLoading')
    this.$bus.$off('analysing')
    if (this.linked) {
      if (this.mapAppFactory) {
        this.mapAppFactory.removeEventLinstener(this.$el.id)
      }
    }
  },
  destroyed () {
    if (this.mapAppFactory) {
      this.mapAppFactory.destroyMapApp(this.$el.id)
    }
  },

  provide () {
    return {
      mapAppId: this.name,
      mapAppConf: this.mapAppConf
    }
  },

  methods: {
    async creatMapApp (layerInfo) {
      if (!MAPAPP_INITCONF || !WIDGET_CONF) return
      this.mapAppConf = {
        ...(this.mapAppInitConf || MAPAPP_INITCONF),
        ...(this.widgetConf || WIDGET_CONF)
      }
      if (this.name) {
        this.mapAppConf.mapview.container = this.$el.id
        this.mapAppConf.mapview.linked = this.linked
        let previewConf = null
        if (this.custom && !layerInfo) {
          return
        } else if (this.custom && layerInfo) {
          previewConf = this.getPreviewConf(layerInfo, this.mapAppConf)
        }
        this.mapAppFactory = this.$findMapAppFactory()
        if (!this.mapAppFactory) {
          const mapAppFactoryConstructor = await this.$loadGISModules()
          this.mapAppFactory = mapAppFactoryConstructor.getInstance()
          this.$setMapAppFactory(this.mapAppFactory)
        }
        const me = this
        this.$nextTick(() => {
        
          if (me.delay > 0) {
            setTimeout(()=>{
              me.initMapApp(previewConf)
            }, me.delay)
          } else {
            me.initMapApp(previewConf)
          }
        })
      }
    },

    initMapApp (previewConf) {
      const me = this
      this.mapAppFactory.createMapApp((previewConf || this.mapAppConf), (this.fn || this.$message.error)).then(mapApp => {
        me.mapApp = mapApp
        me.loading = false
        me.viewLoaded = true
        me.endTime = new Date().getMilliseconds()
        const usedTime = Math.floor(this.endTime - this.startTime)
        me.$print(`${this.$el.id} loading time : ${usedTime}ms`)
        me.$bus.$emit('viewLoaded', me.name)
        me.$emit('viewLoaded', me.mapApp)
      })
    },

    getPreviewConf (layerInfo, mapAppConf) {
      let previewConf = this.$cloneDeep(mapAppConf)
      previewConf.map.basemaps = []
      previewConf.map.basemaps.push([
        {
          id: layerInfo.id,
          title: layerInfo.serviceName,
          type: layerInfo.serviceType,
          url: layerInfo.url
        }
      ])
      previewConf.widgets = this.mapAppConf.widgets
      return previewConf
    },

    getMapApp () {
      return this.mapApp || this.$findMapApp(this.name)
    }
  }
}
</script>

<style scoped>
.la-mapview__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
</style>
