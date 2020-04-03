import Vue from 'vue'
import './global'
import './la-mapview-tools/index'
import LAPanel from './la-panel/index'
import LASide from './la-side/index'
import LAButton from './la-button/index'
import LAChart from './la-chart/index'
import LARow from './la-row/index'
import LAColumn from './la-column/index'
import LAShowmore from './la-showmore/index'
import LATitle from './la-title/index'
import LAExport from './la-export/index'
import LABlock from './la-block/index'
import LAPage from './la-page/index'
import LAText from './la-text/index'
import LASplitline from './la-splitline/index'
import LAMapviewPopup from './la-mapview-popup/index'
import LALoading from './la-loading/index'
import LASceneView from './la-sceneview/index'
import LAMapview from './la-mapview/index'

const components = [
  LAPanel,
  LASide,
  LAButton,
  LAChart,
  LARow,
  LAColumn,
  LAShowmore,
  LATitle,
  LAExport,
  LABlock,
  LAPage,
  LAText,
  LASplitline,
  LAMapviewPopup,
  LALoading,
  LASceneView,
  LAMapview
]
components.forEach(component => {
  Vue.use(component)
})
