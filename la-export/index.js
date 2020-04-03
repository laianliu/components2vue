import laExport from './main.vue'
laExport.install = function (Vue) {
  Vue.component(laExport.name, laExport)
}
export default laExport
