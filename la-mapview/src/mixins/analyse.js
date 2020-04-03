export default {
  methods: {
    findSelectFeatures(mapAppId, layerId) {
      const mapApp = this.$findMapApp(mapAppId)
      return [...mapApp.selectedFeatures['' + layerId]]
    },
    getRequestParam(mapAppId, layerId) {
      const selectedFeatures = this.findSelectFeatures(mapAppId, layerId)
      let geometries = []
      selectedFeatures.map(feature => {
        geometries.push(feature.geometry.toJSON())
      })
      var blocks = []
      for (let i = 0; i < geometries.length; i++) {
        blocks.push({
          DK_ID: i + 1 + '',
          GeoJson: JSON.stringify(geometries[i])
        })
      }
      return {
        requestInfo: JSON.stringify({
          ApplicationGUID: 'e6a2f1da-e961-482a-8737-9b9e09fee561',
          AnalysisID: '',
          SFFHTX: false,
          Blocks: blocks
        })
      }
    },
    parseGHParams({ mapAppId, layerId, year, url }, httpProxy) {
      let mapApp = this.$findMapApp(mapAppId)
      let selectedFeatures = [...mapApp.selectedFeatures['' + layerId]]

      let geometries = []
      selectedFeatures.map(feature => {
        geometries.push(feature.geometry.toJSON())
      })

      // var params = this.getParams(geometries)
      // return params
      let sq = mapApp.createSpatialQuery(mapApp, layerId, null)
      const match = /^(http?:\/\/)([0-9a-z.]+)(:[0-9]+)?/i
      let proxyUrl
      if (mapApp.httpProxy.analystUseProxy) {
        const index = match.exec(url)[0].length
        proxyUrl
          = mapApp.httpProxy.analystProxyUrl + url.substring(index, url.length)
      }
      const params = this.getRequestParam(mapAppId, layerId)
      return sq.createQueryTask2(proxyUrl || url, params)
    },
    startAnalyst({ mapAppId, layerId, year, url }) {
      let mapApp = this.$findMapApp(mapAppId)
      let selectedFeatures = [...mapApp.selectedFeatures['' + layerId]]

      let geometries = []
      selectedFeatures.map(feature => {
        geometries.push(feature.geometry.toJSON())
      })
      var features = {
        DH: selectedFeatures[0].attributes['DH'] || '38',
        geometries: geometries
      }
      features = JSON.stringify(features)
      var params = {
        year: year,
        features: features,
        where: '',
        f: 'pjson'
      }
      let sq = mapApp.createSpatialQuery(mapApp, layerId, null)
      return sq.createQueryTask(url, params)
    }
  }
}
