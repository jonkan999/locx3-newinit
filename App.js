
import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import { MapNodes } from './MapNodes.js';
import { MapPolygons } from './MapPolygons.js';
import Street from './Street';


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg';
var minion;
var renderer;
var scene;
var camera;
const defaultStart= [18.036,59.316] 
export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: defaultStart[0],
      lat: defaultStart[1],
      zoom: 15.31,
	  activePoint: 'default',
	  iframeURL: '394639591619707',
	  linkURL: '',
	  spriteLng: defaultStart[0],
	  spriteLat: defaultStart[1],
	  spriteBearing: 1
	  
    };
    this.mapContainer = React.createRef();
  }
  
  

	
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      //style: 'mapbox://styles/jonkanx3/ckzkcsi4t002w15sekpsbw7xt',
	  style: 'mapbox://styles/jonkanx3/cl083pslf002714qdhi3qle09',
      center: [lng, lat],
	  pitch: 60,
	  bearing: 40,
      zoom: zoom,
	  antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });
	
	this.map.getCanvas().style.cursor = 'pointer';
	

	

	
	this.map.on('load', () => {

		var arrayLength = MapPolygons.length;
		var i = 0;
		for (i; i < arrayLength; i++) {
			this.map.addSource(MapPolygons[i][0], {
				'type': 'geojson',
				'data': {
					'type': 'Feature',
					'geometry': {
						'type': 'Polygon',
						// These coordinates outline Hornstull.
						'coordinates': [
							
							MapPolygons[i][1]
							
						]
					}
				}
			});
		}
		
		i=0;
		var pointsData = {};
		pointsData['type'] = 'FeatureCollection';
		pointsData['features'] = [];
		
		for (i; i < arrayLength; i++) {
			//points
			var newFeature = {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": MapPolygons[i][2]
				},
				"properties": {
					"title": MapPolygons[i][0],
					'color': MapPolygons[i][3],
					"description": MapPolygons[i][7]
				}
			}
			pointsData['features'].push(newFeature);
			
			//extrusions
			this.map.addLayer({
				'id': MapPolygons[i][0],
				'type': 'fill-extrusion',
				'source': MapPolygons[i][0], // reference the data source
				'layout': {
					'visibility': 'none'
				},
				'paint': {
					'fill-extrusion-color': MapPolygons[i][3], // blue color fill
					'fill-extrusion-opacity': 0.4,
					'fill-extrusion-height': MapPolygons[i][4]
				}
			});

			
		}
		this.map.addSource('points', {
			'type': 'geojson',
			'data': pointsData
		});
		//map.addLayer({
		//	'id': 'BRFBulten-outline',
		//	'type': 'line',
		//	'source': 'BRFBulten',
		//	'layout': {
		//		'visibility': 'none'
		//	},
		//	'paint': {
		//		'line-color': '#000',
		//		'line-width': {
		//			'type': 'exponential',
		//			'base': 1,
		//			'stops': [
		//				[0, 1 * Math.pow(1, (0 - zoom))],
		//				[24, 1 * Math.pow(1, (24 - zoom))]
		//			]
		//		}
		//	}
		//});
		this.map.addLayer({
			'id': 'points',
			'type': 'circle',
			'source': 'points',
			'paint': {
				// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
				// with three steps to implement three types of circles:
				//   * Blue, 20px circles when point count is less than 100
				//   * Yellow, 30px circles when point count is between 100 and 750
				//   * Pink, 40px circles when point count is greater than or equal to 750
				'circle-color': ['get', 'color'],
				//'#16DF35',
				'circle-radius': {
					'base': 2,
					'stops': [
						[0, 150 * Math.pow(1.5, (0 - zoom))],
						[24, 150 * Math.pow(1.5, (24 - zoom))]
					]
				},
				'circle-stroke-width': {
					'base': 2,
					'stops': [
						[0, 15 * Math.pow(1.5, (0 - zoom))],
						[24, 15 * Math.pow(1.5, (24 - zoom))]
					]
				}
			}
		});
	});

	this.map.on('click', 'points', (e) => {
		const coordinates = e.features[0].geometry.coordinates.slice();
		//var ObjectArray = ['BRFBulten','Hornstull'];
		var arrayLength = MapPolygons.length;
		var i = 0;


		
		if (this.map.getLayoutProperty(e.features[0].properties.title,'visibility')==='none') {
			for (i; i < arrayLength; i++) {
				//Turn off all but clicked highlights
				if (e.features[0].properties.title === MapPolygons[i][0]) {
					var popup = new mapboxgl.Popup({closeButton: false, className: e.features[0].properties.title, 'border-top-color': 'rgba(205, 205, 205,0)' })
					.setLngLat(coordinates)
					.setHTML(e.features[0].properties.description)
					.setMaxWidth('none')
					.addTo(this.map);
					this.map.triggerRepaint();
					this.map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'visible');
					this.setState({
						activePoint: MapPolygons[i][0],
						iframeURL: MapPolygons[i][5],
						linkURL: MapPolygons[i][6],
					  });
				} else {
					this.map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'none');
				}
			}
		} else {
			for (i; i < arrayLength; i++) {
				//Turn off all
				this.map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'none');
			}
		}
	});

    this.map.on('move', () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
	
	//TEST
	
	// parameters to ensure the model is georeferenced correctly on the map
	const modelOrigin = [defaultStart[0], defaultStart[1]];
	const modelAltitude = 20;
	const modelRotate = [Math.PI / 2, 0, 0];
	
	const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
		modelOrigin,
		modelAltitude
	);
	
	// transformation parameters to position, rotate and scale the 3D model onto the map
	const modelTransform = {
		translateX: modelAsMercatorCoordinate.x,
		translateY: modelAsMercatorCoordinate.y,
		translateZ: modelAsMercatorCoordinate.z,
		rotateX: modelRotate[0],
		rotateY: modelRotate[1],
		rotateZ: modelRotate[2],
		/* Since the 3D model is in real world meters, a scale transform needs to be
		* applied since the CustomLayerInterface expects units in MercatorCoordinates.
		*/
		scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
	};
	
	const THREE = window.THREE;
	const map = this.map

	
	// configuration of the custom layer for a 3D model per the CustomLayerInterface
	const customLayer = {
		id: '3d-model',
		type: 'custom',
		renderingMode: '3d',
		onAdd: function(map, gl) {
			camera = new THREE.Camera();
			scene = new THREE.Scene();
	
			// create two three.js lights to illuminate the model
			//const directionalLight = new THREE.DirectionalLight(0xffffff);
			//directionalLight.position.set(0, -70, 100).normalize();
			//this.scene.add(directionalLight);
			//
			//const directionalLight2 = new THREE.DirectionalLight(0xffffff);
			//directionalLight2.position.set(0, 70, 100).normalize();
			//this.scene.add(directionalLight2);
			
			const light = new THREE.AmbientLight('#FFFFFF');
			scene.add(light);
	
			// use the three.js GLTF loader to add the 3D model to the three.js scene
			const loader = new THREE.GLTFLoader();
			loader.load(
			//'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
			'penguin-old.glb',
			(gltf) => {
				minion=gltf.scene;
			scene.add(minion);
			}
			);
			this.map = map;
	
			// use the Mapbox GL JS map canvas for three.js
			renderer = new THREE.WebGLRenderer({
				canvas: map.getCanvas(),
				context: gl,
				antialias: true
			});
	
			renderer.autoClear = false;
		},
		render: function(gl, matrix) {
			const rotationX = new THREE.Matrix4().makeRotationAxis(
				new THREE.Vector3(1, 0, 0),
				modelTransform.rotateX
			);
			const rotationY = new THREE.Matrix4().makeRotationAxis(
				new THREE.Vector3(0, 1, 0),
				modelTransform.rotateY
			);
			const rotationZ = new THREE.Matrix4().makeRotationAxis(
				new THREE.Vector3(0, 0, 1),
				modelTransform.rotateZ
			);
	
			const m = new THREE.Matrix4().fromArray(matrix);
			const l = new THREE.Matrix4()
				.makeTranslation(
					modelTransform.translateX,
					modelTransform.translateY,
					modelTransform.translateZ
				)
				.scale(
					new THREE.Vector3(
						modelTransform.scale*13,
						-modelTransform.scale*13,
						modelTransform.scale*13
					)
				)
				.multiply(rotationX)
				.multiply(rotationY)
				.multiply(rotationZ);
	
			camera.projectionMatrix = m.multiply(l);
			renderer.resetState();
			renderer.render(scene, camera);
			this.map.triggerRepaint();
		}
	};
	
	map.on('load', () => {
		map.addLayer(customLayer);
	});
	
	
	//ENDTEST
	
	
  }
  

  
      handleCallback = (position,pov) =>{
        this.setState({spriteLat: position.lat,
					   spriteLng: position.lng,
					   spriteBearing: pov.bearing})
    }
	
		componentDidUpdate(prevProps,prevState) {
		if (prevState.spriteLng !== this.state.spriteLng) {
			//convert coords
			//const modelOrigin = [this.state.spriteLng, this.state.spriteLat];
			//const modelAltitude = 20;
			//
			//const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
			//	modelOrigin,
			//	modelAltitude
			//);
			//
			//// transformation parameters to position, rotate and scale the 3D model onto the map
			//const modelTransform = {
			//	translateX: modelAsMercatorCoordinate.x,
			//	translateY: modelAsMercatorCoordinate.y,
			//	translateZ: modelAsMercatorCoordinate.z,
			//
			//	/* Since the 3D model is in real world meters, a scale transform needs to be
			//	* applied since the CustomLayerInterface expects units in MercatorCoordinates.
			//	*/
			//	scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
			//};
			//
			//console.log('x'+modelTransform.translateX);
			//console.log('y'+modelTransform.translateY);
			//console.log('z'+modelTransform.translateZ);
			minion.rotation.y = -this.state.spriteBearing*(Math.PI / 180) + Math.PI/2;
			minion.position.x = (this.state.spriteLng-defaultStart[0])*4300;		
			minion.position.z = (defaultStart[1]-this.state.spriteLat)*9000;		
			//minion.position.x = modelTransform.translateX*10;
			//minion.position.z = modelTransform.translateY*10;				
			renderer.resetState();
			renderer.render(scene, camera);
			this.map.triggerRepaint();
			
		//	console.log(this.map.getSource('sprite')._data.features[0].geometry.coordinates);
		//			this.map.getSource('sprite').setData({
		//	"type": "FeatureCollection",
		//			"features": [{
		//				"type": "Feature",
		//				"geometry": {
		//					"type": "Point",
		//					"coordinates": [this.state.spriteLng, this.state.spriteLat]
		//				},
		//				"properties": {
		//					'rotation': this.state.spriteBearing
		//				}
		//			}]
		//});
			
		}
	}

	
  render() {
    const { iframeURL, spriteLat} = this.state;
    return (
	<div>
		<Street parentCallback = {this.handleCallback.bind(this)}  imageId={iframeURL} />
			<div ref={this.mapContainer} class="map-container" />
			<div>
				<div class={this.state.activePoint+"-container"}>
				<a href='https://www.hemnet.se/bostad/lagenhet-2rum-sodermalm-hogalid-stockholms-kommun-lorensbergsgatan-5a-18333355' target="_blank" title="Opens in a new window">Link</a>
				<h>{}</h>
				</div>
			</div>
				
		
			
	</div>

    );
  }
}
	    //<div class="sidebar">
	    //    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Photoid: {iframeURL}
		//</div>

