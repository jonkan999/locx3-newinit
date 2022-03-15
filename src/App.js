
import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import { MapNodes } from './MapNodes.js';
import { MapPolygons } from './MapPolygons.js';
import Street from './Street';
import CollapsibleHornstull from './CollapsibleHornstull';
import CollapsibleTjoget from './CollapsibleTjoget';
import PulldownPopup from './PulldownPopup';
import addSymbolLayer from './addSymbolLayer.js';

import listing_icon from './icons/listing_icon.png';
import drinks_icon from './icons/drink_icon.png';
import food_icon from './icons/food_icon.png';
import empty_brf from './icons/empty_brf.png';

	
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg';

var minion;
var renderer;
var scene;
var camera;
const defaultStart= [18.036,59.316] 
const marker_types = [['empty_brf',empty_brf],['listing_icon',listing_icon],['food_icon',food_icon],['drinks_icon',drinks_icon]]

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: defaultStart[0],
      lat: defaultStart[1],
      zoom: 15.31,
	  activeCSS: 'default',
	  iframeURL: '301208651534614',
	  hnetURL: '',
	  realtorURL: '',
	  spriteLng: defaultStart[0],
	  spriteLat: defaultStart[1],
	  spriteBearing: 1,
	  hnetHeader: '',
	  hnetBody1: '',
	  hnetBody2: '',
	  hnetBody3: '',
	  PopupHeader: '',
	  PopupContent: ''
	  
	  
	  
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

		var i = 0
		for (i; i < marker_types.length; i++) {
			addSymbolLayer(marker_types[i][0],this.map,MapPolygons,marker_types[i][1],marker_types[i][0],zoom)
		}
		
	});
	var i = 0
	for (i; i < marker_types.length; i++) {
		this.map.on('click', marker_types[i][0], (e) => {
			var arrayLength = MapPolygons.length;
			var i = 0;


			
			if (this.map.getLayoutProperty(e.features[0].properties.title,'visibility')==='none') {
				for (i; i < arrayLength; i++) {
					//Turn off all but clicked highlights
					if (e.features[0].properties.title === MapPolygons[i][0]) {

						this.map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'visible');
						this.setState({
							activeCSS: MapPolygons[i][1],
							iframeURL: MapPolygons[i][6],
							hnetURL: MapPolygons[i][7],
							realtorURL: MapPolygons[i][9],
							hnetHeader: MapPolygons[i][10],
							hnetBody1: MapPolygons[i][11],
							hnetBody2: MapPolygons[i][12],
							hnetBody3: MapPolygons[i][13],
							PopupHeader: MapPolygons[i][0],
							PopupContent: MapPolygons[i][8]
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
	}

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
			'https://my3sbucket.s3.eu-north-1.amazonaws.com/penguin-old.glb',
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
	map.doubleClickZoom.disable();
	
	//ENDTEST
	
	
  }
  

  
      handleCallback = (position,pov) =>{
        this.setState({spriteLat: position.lat,
					   spriteLng: position.lng,
					   spriteBearing: pov.bearing})
    }
	
	
		componentDidUpdate(prevProps,prevState) {
		if (prevState.spriteLng !== this.state.spriteLng) {
			
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
    const { iframeURL} = this.state;
	
	let exp_ind;
	if (this.state.activeCSS==='Hornstull') {
		exp_ind=
		<CollapsibleHornstull>

				</CollapsibleHornstull>;
	} else if (this.state.activeCSS==='Tjoget'){
		exp_ind=
				<CollapsibleTjoget>

				</CollapsibleTjoget>

				;
		
	}
	
	else {
	  exp_ind=
	  <div>
	  <PulldownPopup PopupHeader={this.state.PopupHeader} PopupContent={this.state.PopupContent} style={{ paddingTop: "0vh"}} >
	  </PulldownPopup>
	  <div className={this.state.activeCSS+"-container"}>
					<h1>{this.state.hnetHeader}</h1>
					<p> {this.state.hnetBody1} <br/> {this.state.hnetBody2} <br/> {this.state.hnetBody3} </p> 
					<a className='hnet' href={this.state.hnetURL} target="_blank" title="Opens in a new window">Hemnet</a>
					<a className='realtor' href={this.state.realtorURL} target="_blank" title="Opens in a new window">Mäklare</a>
				
				</div>;
				</div>
	}
	
    return (
	<div>
		<Street parentCallback = {this.handleCallback.bind(this)}  imageId={iframeURL} />
			<div ref={this.mapContainer} className="map-container" />

			<div>
				{exp_ind}
			</div>
				
		
			
	</div>

    );
  }
}
	    //<div class="sidebar">
	    //    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Photoid: {iframeURL}
		//</div>

