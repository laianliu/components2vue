import widget from './src/widget'
widget.install = function (Vue) {
  Vue.component(widget.name, widget)
}
export default widget
