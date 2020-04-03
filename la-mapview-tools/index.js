import Vue from 'vue'
import Locate from './locate/index'
import Screenshot from './screenshot/index'
import Upload from './upload/index'
const components = [
  Locate,
  Screenshot,
  Upload
]
components.forEach(component => {
  Vue.use(component)
})