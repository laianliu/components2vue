<template>
  <la-panel v-show="showPanel" title="上传" @closePanel="closePanel">
    <div class="screenTxt">对比范围：</div>
    <el-upload class="fileBox"
               ref="additionalRef"
               action="/la-document/document/upload/"
               :before-upload="fileFormatChecking"
               :http-request="annexUpload"
               :on-success="uploadSuccess"
               :on-error="upLoadError"
               :on-change="change"
               :show-file-list="false"
               :multiple="true"
               accept=".shp, .dbf, .geojson, .prj, .sbn, .sbx, .xml, .shx, .zip">
      <el-button size="medium"
                 round
                 icon="el-icon-upload2"
                 style="margin-bottom:5px;margin-top:15px;">上传文件</el-button>
      <div slot="tip"
           style="color:#999;">
        支持扩展名：
        <span v-for="(item,index) in extName"
              :key="index">.{{item}}&nbsp;</span>
      </div>
    </el-upload>

    <div class="fileNameBox"
         v-for="(item,index) in fileNameList"
         :key="index">
      <div>
        <i class="el-icon-paperclip"></i>
        <span>{{item.name}}</span>
      </div>
      <i class="el-icon-delete"
         style="width:8%;text-align:right;cursor: pointer;"
         @click="handleClickDelName(index)"></i>
    </div>

    <div style="display:flex; align-items: center;justify-content:flex-end;"
         v-if="isAnalysis==true">
      <el-button type="primary"
                 size="small"
                 @click="handleClickAnalysis">文件解析</el-button>
    </div>
  </la-panel>
</template>
<script>
import shp from 'shpjs'
import Terraformer from 'terraformer-arcgis-parser'
export default {
  props: ['showMessage'],
  name: 'LaUpload',
  componentName: '上传',
  inject: ['mapAppId'],
  data() {
    return {
      showBox: '',
      extName: [
        'shp',
        'dbf',
        'geojson',
        'prj',
        'sbn',
        'sbx',
        'xml',
        'shx',
        'zip'
      ],
      docSize: 10, // 自定义上传文件大小限制，单位 MB
      fileIndex: 0, //

      fileNameList: [],
      isAnalysis: false,
      isFileDetail: false,
      length: 0,
      fileList: [], // 文件存储中间量
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showPanel: false,
      mapApp: null
    }
  },
  mounted() {
    const me = this
    this.$bus.$on('showUpload', res => {
      me.showPanel = res
    })
  },
  methods: {
    closePanel(res) {
      this.showPanel = res
      this.mapApp.view.graphics.removeAll()
    },
    fileFormatChecking(file) {
      let me = this
      // 附件上传格式验证
      let extName = file.name.split('.').slice(-1)[0]
      const fileTyState = this.extName.indexOf(extName)
      let docSize = file.size / Math.pow(1024, 2)
      if (extName === ('zip' || 'shp') && docSize <= 10) {
        const reader = new FileReader()
        reader.onload = function (event) {
          shp(event.target.result).then(function (geojson) {
            if (!me.mapApp) {
              me.mapApp = me.$findMapApp(me.mapAppId)
            }
            me.mapApp.parseJsonLayer(geojson, Terraformer)
            me.treeData = geojson.features
            me.isFileDetail = true
          })
        }
        reader.readAsArrayBuffer(file)
      } else {
        if (fileTyState === -1) {
          this.$message.error(`上传附件不能是 ${extName} 格式!`)
          return false
        }
        if (docSize > this.docSize) {
          this.$message.error(`上传附件大小不能超过 ${this.docSize} MB!`)
          return false
        }
        // for (var key in this.fileNameList) {
        //   if (file.name == this.fileNameList[key].name) {
        //     this.$message.error(`文件列表已存在该文件, 请不要上传重复文件!`);
        //   }
        // }
      }
    },
    annexUpload(files) {
      // 附件上传
      let formData = new FormData()
      if (this.fileList.length > 0) {
        this.fileList.forEach(file => {
          formData.append('files', file)
        })
        if (formData.getAll('files').length === this.length && this.length > 0) {
          this.$useAppend('/la-document/document/upload', formData).then(
            res => {
              this.fileList = []
              // 此处重置文件中间存储变量是为了相同文件能够重复传递
              if (res.state === 'SUCCESS') {
                files.onSuccess(res)
                this.$message.success('上传成功!')
              }
            }
          )
        }
      }
    },
    change() {
      // 判断上传文件数量
      this.length = document.querySelector('input[type=file]').files.length
      if (this.length > 0) {
        Array.from(document.querySelector('input[type=file]').files).forEach(
          file => {
            let extName = file.name.split('.').slice(-1)[0]
            let docSize = file.size / Math.pow(1024, 2)
            if (
              this.fileList.indexOf(file) === -1
              && !(extName === 'zip' && docSize <= 4)
            ) {
              this.fileList.push(file)
            }
          }
        )
      }
      return false
    },
    uploadFunction(formData, files) {
      // 上传方法
      this.$useAppend('/la-document/document/upload', formData).then(res => {
        if (res.state === 'SUCCESS') {
          files.onSuccess(res)
          this.$message.success('上传成功!')
        }
      })
    },
    uploadSuccess(res, file, fileList) {
      // 上传成功回调
      for (var key in res.data) {
        this.fileNameList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }
      if (this.fileNameList.length > 0) {
        this.isAnalysis = true
      }
    },
    upLoadError() {
      // 上传失败回调
      this.$message.error('文件上传失败啦!')
    },
    handleClickDelName(index) {
      this.fileNameList.splice(index, 1)
      if (this.fileNameList.length === 0) {
        this.isAnalysis = false
        this.isFileDetail = false
      }
    },
    async handleClickAnalysis() {
      var documentIdList = []
      var extNameList = []
      for (var key in this.fileNameList) {
        documentIdList.push(this.fileNameList[key].id)
        extNameList.push(this.fileNameList[key].extName)
      }

      let documentId = documentIdList.join(',')
      let res = await this.$get(
        `/la-onemap/admin/mapgeodoucment/getGeoJson?documentId=${documentId}`
      )
      if (res.code === 0) {
        res.result.forEach(item => {
          this.treeData = JSON.parse(item).features
          let geojson = JSON.parse(item)
          if (!this.mapApp) {
            this.mapApp = this.$findMapApp(this.mapAppId)
          }
          this.mapApp.parseJsonLayer(geojson, Terraformer)
        })
        this.isFileDetail = true
        this.$message.success('解析成功')
      } else {
        this.$message.error('解析失败')
      }
    },
    handleClickLocation() {
    },
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes()
      let arr = []
      res.forEach(item => {
        arr.push(item.id)
      })
    },
    handleClickClose() {
      this.showBox = false
    }
  },
  created() {
    this.showBox = this.showMessage
    // console.log(this.showBox);
  },
  // mounted() {
  //   document.body.addEventListener(
  //     "click",
  //     () => {
  //       if (this.showBox == true) {
  //         this.showBox = false;
  //       } else if (this.showBox == false) {
  //         return;
  //       }
  //     },
  //     true
  //   );
  // },
  watch: {
    showMessage(val) {
      this.showBox = val
    }
  }
}
</script>
<style scoped>
#dataDetailBox {
  position: absolute;
  top: 6.625rem;
  right: 0.9rem;
}
.data_title {
  width: 415px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  position: relative;
}
.data_content {
  width: 415px;
  height: 650px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px 20px 10px 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.data_content::-webkit-scrollbar {
  display: none;
}
.screenTxt {
  font-size: 16px;
  margin-bottom: 15px;
}
.fileBox {
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}
.fileNameBox {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
}
.treeBox {
  width: 100%;
  height: 350px;
  border: 1px solid #999;
  box-sizing: border-box;
  margin: 10px 0;
}
</style>
<style>
</style>
