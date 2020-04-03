import Vue from 'vue'
import { loadScript, loadCss, loadModules } from 'esri-loader'
import { MAPAPP_URI, MAPAPP_INITCONF, WIDGET_CONF } from './epf-mapview/src/mapapp.conf'
import { resolve } from 'tinymce'

Vue.prototype.$addMapAppIntoRoot = function (mapApp) {
  if (!this.$root.mapApps) {
    this.$root.mapApps = []
  }
  this.$root.mapApps.push(mapApp)
}
Vue.prototype.$getMapAppFromRoot = function () {
  return this.$root.mapApps
}
Vue.prototype.deleteMapAppFromRoot = function (mapAppId) {
  for (let i = 0; i < this.$root.mapApps.length; i++) {
    if (this.$root.mapApps[i].mapview.container === mapAppId) {
      this.$root.mapApps.splice(i, 1)
      break
    }
  }
}
Vue.prototype.$setMapAppFactory = function (instance) {
  this.$root.mapAppFactory = instance
}
Vue.prototype.$findMapAppFactory = function () {
  return this.$root.mapAppFactory || null
}
Vue.prototype.$findMapApp = function (mapAppId) {
  if (this.$root.mapAppFactory) {
    return this.$root.mapAppFactory.findMapApp(mapAppId)
  }
  return null
}

Vue.prototype.$loadGISModules = function (modules) {
  let me = this
  const myModules = modules || [MAPAPP_URI.rootPath]
  return new Promise(resolve => {
    loadModules(myModules).then(args => {
      let gisConstructor = {}
      let name = null
      for (let k in args) {
        name = myModules[k].split('/').pop()
        gisConstructor[name] = args[k]
      }
      me.$root.GISConstructor = gisConstructor
      resolve(me.$root.GISConstructor[name])
    })
  })
}
Vue.prototype.$loadGISUri = function () {
  const jsUri = MAPAPP_URI.jsUri
  const cssUris = MAPAPP_URI.cssUris
  return new Promise(resolve => {
    cssUris.forEach(cssUri => {
      loadCss(cssUri)
    })
    loadScript({ url: jsUri }).then(res => {
      resolve('GIS资源加载完成。')
    })
  })
}
Vue.prototype.$cloneDeep = function (obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = this.deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
Vue.prototype.$getMapAppInitConf = function () {
  return this.$cloneDeep(MAPAPP_INITCONF)
}
Vue.prototype.$getWidgetConf = function () {
  return this.$cloneDeep(WIDGET_CONF)
}
Vue.prototype.$addLayerToMap = function({mapApp, mapAppId}, option) {
  return new Promise(resolve => {
    const me = this
    if (!mapApp) {
      mapApp = this.$findMapApp(mapAppId)
    }
    if (mapApp && option) {
      this.$bus.$emit('layerLoading', true)
      mapApp.addLayerToMap(option).then(res => {
        me.$bus.$emit('layerLoading', false)
        resolve(res)
      })
    }
  })
}
Vue.prototype.$print = function(message, style) {
  console.log(`%c ${message}`, style || 'color:red;font-size:20px;')
}
