<template>
  <la-panel title="定位" @closePanel="closePanel" v-show="visible">
    <div class="la-map-content">
      <div>
        <p class="input-label">输入坐标</p>
        <el-input placeholder="格式参考：113.22,23.22"
                  v-model="coordinateText"
                  type="textarea"
                  clearable></el-input>
      </div>
      <div class="buttonList">
        <el-button type="info"
                   size="medium"
                   @click="handleCleanClick">清空</el-button>
        <el-button type="primary"
                   size="medium"
                   @click="handleLocationClick">定位</el-button>
      </div>
    </div>
  </la-panel>
</template>

<script>
export default {
  name: 'LaLocate',
  componentName: '定位',
  inject: ['mapAppId'],
  props: {
    layer: Object,
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      coordinateText: '',
      centerPoint: null,
      title: null,
      mapApp: null
    }
  },
  mounted() {
    const me = this
    this.$bus.$on('showLocate', res => {
      me.visible = res
    })
  },
  methods: {
    closePanel(res) {
      this.visible = res
      this.mapApp.view.graphics.removeAll()
    },
    handleCleanClick() {
      this.coordinateText = ''
    },
    handleLocationClick() {
      if (this.coordinateText !== '') {
        const coordinate = this.coordinateText.split(',')

        const x = Number(coordinate[0])
        const y = Number(coordinate[1])
        if (!this.mapApp) {
          this.mapApp = this.$findMapApp(this.mapAppId)
        }
        this.mapApp.addPoint(x, y)
        this.mapApp.view.goTo({
          target: [x, y],
          zoom: 12
        })
      }
    },
    addPoint(x, y) {
      let wkid = this.mapApp.view.spatialReference.wkid
      let coordinateConversion = this.mapApp.widgets.find(
        e => e.coordinateConversion
      )
      this.centerPoint = coordinateConversion.createCenter(wkid, x, y)
    }
  }
}
</script>

<style scoped>
.input-label {
  margin: 10px 0px;
}
.buttonList {
  margin-top: 1rem;
  text-align: center;
}
</style>
