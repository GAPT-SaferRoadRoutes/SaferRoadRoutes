import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import TileWMS from 'ol/source/TileWMS.js';

const layers = [
  new TileLayer({
    source: new OSM(),
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/Safer-Road-Routes/wms',
      params: {'LAYERS': 'Safer-Road-Routes:roadsrisk', 'TILED': true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
  }),
];

const map = new Map({
  target: 'map',
  layers: layers,
  view: new View({
    center: [1609000, 4287500],
    zoom: 12,
  }),
});