import laButton from './main.vue'
laButton.install = function (Vue) {
  Vue.component(laButton.name, laButton)
}
export default laButton
