import epfPage from './main.vue'
epfPage.install = function (Vue) {
  Vue.component(epfPage.name, epfPage)
}
export default epfPage
