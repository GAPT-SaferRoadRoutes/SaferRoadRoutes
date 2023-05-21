import '/style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import TileWMS from 'ol/source/TileWMS.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import LayerSwitcher from 'ol-layerswitcher/dist/ol-layerswitcher.js';
import {FullScreen, defaults as defaultControls} from 'ol/control.js';
import {Image as ImageLayer} from 'ol/layer.js';
import XYZ from 'ol/source/XYZ.js';

var checkmark = document.getElementsByClassName("togglebox");
var radiomark = document.getElementsByClassName("radiobox");

var OSMlayer =
  new TileLayer({
    source: new OSM(),
  });

var worldImagery = new TileLayer({
  source: new XYZ({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/' +
          'World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19,
      }),
});

var roadsLayer = 
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:roadsrisk', 'TILED': true},
      serverType: 'geoserver',
    }),
  });

var busstopLayer =
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:busstop', 'TILED': true},
      serverType: 'geoserver',
      visible: false,
    }),
  });

var restaurantsLayer =
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:restaurants', 'TILED': true},
      serverType: 'geoserver',
      visible: false,
    }),
  });

var barsLayer =
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:bars', 'TILED': true},
      serverType: 'geoserver',
      visible: false,
    }),
  });

var heatmapLayer =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:roadsriskheatmap'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var pharmacyLayer =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:pharmacy'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var policeLayer =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:policestations'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var hotelLayer =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:hotels'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var beachLayer =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:beaches'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var museumLayer =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:museums'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var riskLabel =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:roadsrisklabels',
		'STYLES': 'Safer-Road-Routes:risklabel'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var fatalityLabel =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:roadsrisklabels',
		'STYLES': 'Safer-Road-Routes:fatalitylabel'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var acciLabel =
  new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:roadsrisklabels',
		'STYLES': 'Safer-Road-Routes:accilabel'},
      serverType: 'geoserver',
      visible: 'false',
    }),
  });

var layerList = [
  OSMlayer,
  worldImagery,
  roadsLayer,
  busstopLayer,
  restaurantsLayer,
  barsLayer,
  heatmapLayer,
  pharmacyLayer,
  policeLayer,
  hotelLayer,
  beachLayer,
  museumLayer,
  riskLabel,
  fatalityLabel,
  acciLabel,
];

var map = new Map({
  layers: layerList,
  target: 'map',
  view: new View({
    center: [1609000, 4287500],
    zoom: 12,
  }),
});


worldImagery.setVisible(false);
for(var i=3; i<layerList.length; i++){
  layerList[i].setVisible(false);
}

for(var i=0; i<checkmark.length; i++){
  checkmark[i].onclick = function toggleVisibility(){
    var thisLayer = layerList[this.alt];
    var state = thisLayer.getVisible();
    if(state==true){
      thisLayer.setVisible(false);
    }else if(state==false){
      thisLayer.setVisible(true);
    }
  }
}

for(var i=0; i<radiomark.length; i++){
  radiomark[i].onclick = function radioVisibility(){
    var thisLayer = layerList[this.alt];
    layerList[12].setVisible(false);
    layerList[13].setVisible(false);
    layerList[14].setVisible(false);
    if(this.alt!=0){
      thisLayer.setVisible(true);
    }
  }
}