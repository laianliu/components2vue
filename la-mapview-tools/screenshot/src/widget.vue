<template>
  <div>
    <div id="screenshotDiv" class="hide">
      <div id="screenshotTitle" style="width:750px">截图</div>
      <img id="screenshotImage" class="screenshotImage" />
      <div id="btnBox" style="width:750px">
        <button id="downloadBtn" class="action-button" title="下载图片" @click="downloadBtnClick">下载图片</button>
        <button id="closeBtn" class="action-button" title="回到地图" @click="closeBtnClick">回到地图</button>
      </div>
    </div>
    <div id="maskDiv" class="hide"></div>
  </div>
</template>
<script>
export default {
  name: 'LaScreenshot',
  inject: ['mapAppId'],
  data() {
    return {
      screenshotDataUrl: null,
      mapApp: null
    }
  },

  mounted() {
    const me = this
    this.$bus.$on('startupScreenshot', res => {
      me.startup()
    })
  },

  methods: {
    startup() {
      if (!this.mapAppId) return
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      let area = null
      let me = this
      this.mapApp.view.container.classList.add('screenshotCursor')
      this.mapApp.view.dragHandler = this.mapApp.view.on('drag', event => {
        event.stopPropagation()
        if (event.action !== 'end') {
          area = me.getArea(event)
          me.setMaskPosition(area)
        } else {
          me.mapApp.view.dragHandler.remove()
          me.mapApp.view
            .takeScreenshot({ area: area, format: 'png' })
            .then(screenshot => {
              me.screenshotDataUrl = screenshot.dataUrl
              me.showPreview(screenshot)
              me.mapApp.view.container.classList.remove('screenshotCursor')
              me.setMaskPosition(null)
            })
        }
      })
    },

    getArea(event) {
      const xmin = this.clamp(
        Math.min(event.origin.x, event.x),
        0,
        this.mapApp.view.width
      )
      const xmax = this.clamp(
        Math.max(event.origin.x, event.x),
        0,
        this.mapApp.view.width
      )
      const ymin = this.clamp(
        Math.min(event.origin.y, event.y),
        0,
        this.mapApp.view.height
      )
      const ymax = this.clamp(
        Math.max(event.origin.y, event.y),
        0,
        this.mapApp.view.height
      )
      return {
        x: xmin,
        y: ymin,
        width: xmax - xmin,
        height: ymax - ymin
      }
    },

    showPreview(screenshot) {
      debugger
      document.querySelector('#screenshotDiv').classList.remove('hide')
      const screenshotImage = document.querySelector('#screenshotImage')

      screenshotImage.width = 730
      screenshotImage.height = 450

      screenshotImage.src = screenshot.dataUrl
    },

    getImageWidthText(screenshot) {
      const imageData = screenshot.data
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = imageData.height
      canvas.width = imageData.width
      context.putImageData(imageData, 0, 0)
      return canvas.toDataURL()
    },

    downloadImage(filename, dataUrl) {
      console.log(dataUrl)
      if (!window.navigator.msSaveOrOpenBlob) {
        const element = document.createElement('a')
        element.setAttribute('href', dataUrl)
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      } else {
        const byteString = atob(dataUrl.split(',')[1])
        const mimeString = dataUrl
          .split(',')[0]
          .split(':')[1]
          .split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        const blob = new Blob([ab], { type: mimeString })
        window.navigator.msSaveOrOpenBlob(blob, filename)
      }
    },

    setMaskPosition(area) {
      let dom = document.querySelector('#maskDiv')
      if (area) {
        dom.classList.remove('hide')
        dom.style.left = area.x + 'px'
        dom.style.top = area.y + 'px'
        dom.style.width = area.width + 'px'
        dom.style.height = area.height + 'px'
      } else {
        dom.classList.add('hide')
      }
    },

    clamp(value, from, to) {
      return value < from ? from : value > to ? to : value
    },

    downloadBtnClick(event) {
      event.stopPropagation()
      if (this.screenshotDataUrl) {
        this.downloadImage('新建截图.png', this.screenshotDataUrl)
      }
    },
    closeBtnClick() {
      document.querySelector('#screenshotDiv').classList.add('hide')
    }
  }
}
</script>
<style scoped>
#maskDiv {
  position: absolute;
  background: rgba(255, 51, 0, 0.1);
  border: 2px dashed rgb(255, 51, 0);
}

.screenshotCursor {
  cursor: crosshair;
}

.hide {
  display: none;
}

#screenshotDiv {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.screenshotImage {
  border-top: 55px solid white;
  border-left: 10px solid white;
  border-right: 10px solid white;
  border-bottom: 80px solid white;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.action-button {
  padding: 0.6em;
  border: 1px solid #0079c1;
  text-align: center;
  background-color: white;
  cursor: pointer;
}
.action-button:nth-child(1) {
  margin-right: 80px;
}

.action-button:hover,
.action-button:focus {
  background: #0079c1;
  color: white;
}
#screenshotTitle {
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: left;
  line-height: 45px;
  margin: 0 auto;
  padding-left: 20px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  position: relative;
  top: 45px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#btnBox {
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
  top: -70px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
