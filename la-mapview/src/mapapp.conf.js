// api资源配置
export const MAPAPP_URI = {
  jsUri: 'http://39.108.106.59:8089/api/4.11/init.js',
  cssUris: [
    'http://39.108.106.59:8089/api/4.11/esri/css/main.css',
    'http://39.108.106.59:8089/api/4.11/dojo/gislib/app/css/mymain.css'
  ],
  rootPath: 'gislib/app/MapAppFactory'
}
// mapapp初始化参数配置
export const MAPAPP_INITCONF = {
  map: {
    '3D': false,
    '2D': true,
    noSupport: ['3857'],
    areaCode: '440000',
    basemaps: [
      [{
        title: '天地图电子图(经纬度坐标)',
        type: 'wmts',
        layer: 'vec_c',
        key: '6a92e00bdfafade25568c053a5ba6de4'
      },
      {
        title: '天地图矢量注记(经纬度坐标)',
        type: 'wmts',
        layer: 'cva_c',
        key: '6a92e00bdfafade25568c053a5ba6de4'
      }
      ],
      [{
        title: '天地图影像图(经纬度坐标)',
        type: 'wmts',
        layer: 'img_c',
        key: '6a92e00bdfafade25568c053a5ba6de4'
      },
      {
        title: '天地图影像注记(经纬度坐标)',
        type: 'wmts',
        layer: 'cia_c',
        key: '6a92e00bdfafade25568c053a5ba6de4'
      }
      ],
      [{
        title: '技术中心电子图(经纬度坐标)',
        type: 'wmts',
        useProxy: true,
        url: 'http://19.16.240.227:7001/Wy5mwp/DLG_PAD/wmts'
      }],
      [{
        title: '技术中心影像图(经纬度坐标)',
        type: 'wmts',
        useProxy: true,
        url: 'http://19.16.240.232/DOM_PAD/wmts'
      }],
      [{
        title: '广东省国土空间规划地图',
        type: 'wmts',
        useProxy: false,
        url: 'http://172.16.8.122:6080/arcgis/rest/services/国土空间规划底图/实施监督预警底图/MapServer'
      }]
    ],
    maskService: {
      disable: false,
      title: '行政区划边界服务',
      type: 'image',
      url: 'http://172.16.8.122:6080/arcgis/rest/services/广东省界合并2000/MapServer',
      symbol: {
        type: 'simple-fill',
        color: [128, 128, 128, 0.6],
        outline: {
          color: [56, 125, 232],
          width: 2
        }
      }
    },
    xzqhService: {
      disable: false,
      needTransform: false,
      title: '广东省地市边界图层',
      id: 'XZQHLayer',
      url: 'http://172.16.8.122:6080/arcgis/rest/services/国土空间规划底图/市县区边界线/MapServer/0',
      url2: 'http://120.77.57.182:6080/arcgis/rest/services/test/区划/MapServer/0',
      url3: 'http://172.16.8.102:6080/arcgis/rest/services/广东省行政区界线/MyMapService/MapServer/0',
      colors: [
        [230, 209, 192, 0.8],
        [245, 248, 195, 0.8],
        [208, 231, 207, 0.8]
      ]
    }

  },
  mapview: {
    spatialReference: {
      wkid: 4326
    },
    constraints: {
      minZoom: 6,
      maxZoom: 17
    },
    center: [113.754645, 23.198923]
  },
  httpProxy: {
    useProxy: true,
    items: [
      'http://172.16.8.102:8089/proxy/', // 技术中心局域网代理
      'http://39.108.106.59:8089/tdt/', // 互联网天地图代理
      'http://172.16.8.102:8089/geoapi/', // 技术中心空间分析代理
      'http://172.16.8.107:9994/gmap/proxyHandler/' // 粤政图服务代理
    ]
  }
}

// omemap模块配置
export const WIDGET_CONF = {
  widgets: [{
    name: 'Compass',
    position: 'customRight'
  },
  {
    name: 'Home',
    position: 'customRight'
  },
  {
    name: 'Fullscreen',
    position: 'customRight'
  },
  {
    name: 'Sketch',
    position: 'customRight'
  },
  {
    name: 'Measurement2D',
    position: 'customRight'
  },
  {
    name: 'Coordinate',
    position: 'customRight'
  },
  {
    name: 'Draw',
    position: 'customRight'
  },
  {
    name: 'Buffer',
    position: 'customRight'
  },
  {
    name: 'LayerList',
    position: 'customRight'
  },
  {
    name: 'Legend',
    position: 'customRight'
  },
  {
    name: 'BasemapGallery',
    position: 'bottom-right'
  },
  {
    name: 'ScaleBar',
    position: 'bottom-left'
  }
  ]
}
