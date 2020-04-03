import laMapview from './src/main.vue'
laMapview.install = function (Vue) {
  Vue.component(laMapview.name, laMapview)
}
export default laMapview
