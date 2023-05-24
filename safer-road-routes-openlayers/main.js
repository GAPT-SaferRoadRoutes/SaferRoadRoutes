import '/style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import TileWMS from 'ol/source/TileWMS.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import {FullScreen, defaults as defaultControls} from 'ol/control.js';
import {Image as ImageLayer} from 'ol/layer.js';
import XYZ from 'ol/source/XYZ.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import * as olProj from 'ol/proj';
import Overlay from 'ol/Overlay.js';
import {toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';

var checkmark = document.getElementsByClassName("togglebox");
var radiomark = document.getElementsByClassName("radiobox");
var markerbutton = document.getElementsByClassName("startendbutton");
var safetysetter = document.getElementsByClassName("routingradio");
var clearbutton = document.getElementsByClassName("clearbutton");
var routingbutton = document.getElementsByClassName("routingbutton");

var setType = 0;
var startSet = 0;
var endSet = 0;
var costfunction = "riskcost";

var transform = olProj.getTransform('EPSG:3857', 'EPSG:4326');
var result;

var startcontainer = document.getElementById("popup1");
var startcontent = document.getElementById("popup1-content");
var endcontainer = document.getElementById("popup2");
var endcontent = document.getElementById("popup2-content");

const overlay1 = new Overlay({
  element: startcontainer
});

const overlay2 = new Overlay({
  element: endcontainer
});

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

var startPoint = new Feature();
var endPoint = new Feature();

var vectorLayer =
  new VectorLayer({
    source: new VectorSource({
      features: [startPoint, endPoint]
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
  vectorLayer,
];

var map = new Map({
  layers: layerList,
  target: 'map',
  view: new View({
    center: [1609000, 4287500],
    zoom: 12,
  }),
  overlays: [overlay1, overlay2],
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

for(var i=0; i<markerbutton.length; i++){
  markerbutton[i].onclick = function settingSetType(){
    setType = this.alt;
  }
}

map.on('click', function(event) {
  if(setType==1){
    startPoint.setGeometry(new Point(event.coordinate));
    setType = 0;
    startSet = 1;
    overlay1.setPosition(event.coordinate);
    startcontent.innerHTML = '<p style="margin:0px">Start Point</p>';
  }else if(setType==2){
    endPoint.setGeometry(new Point(event.coordinate));
    setType = 0;
    endSet = 1;
    overlay2.setPosition(event.coordinate);
    endcontent.innerHTML = '<p style="margin:0px">End Point</p>';
  }
});

for(var i=0; i<safetysetter.length; i++){
  safetysetter[i].onclick = function setCostFunction(){
    if(this.alt==0){
      costfunction="riskcost";
    }else{
      costfunction="cost";
    }
  }
}

for(var i=0; i<clearbutton.length; i++){
  clearbutton[i].onclick = function clearMarkers(){
    startSet = 0;
    endSet = 0;
    map.removeLayer(result);
    overlay1.setPosition(undefined);
    overlay2.setPosition(undefined);
  }
}

for(var i=0; i<routingbutton.length; i++){
  routingbutton[i].onclick = function routePGrouting(){
    if(startSet==1){
      if(endSet==1){
        map.removeLayer(result);
        var startCoord = transform(startPoint.getGeometry().getCoordinates());
        var endCoord = transform(endPoint.getGeometry().getCoordinates());
        var params = {'LAYERS': 'Safer-Road-Routes:pgrouting'};
        var viewparams = [
          'y1:' + startCoord[1],
          'costfunction:' + costfunction, 'x1:' + startCoord[0],
          'y2:' + endCoord[1], 'x2:' + endCoord[0]
        ];
        params.viewparams = viewparams.join(';');
        result = 
          new ImageLayer({
            source: new ImageWMS({
              url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
              params: params,
              serverType: 'geoserver',
            }),
        });
        map.addLayer(result);
      }
    }
  }
}