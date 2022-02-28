
import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import { MapNodes } from './MapNodes.js';
import { MapPolygons } from './MapPolygons.js';
import Street from './Street';


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 18.036,
      lat: 59.316,
      zoom: 15.31,
	  activePoint: 'default',
	  iframeURL: '394639591619707',
	  linkURL: '',
	  spriteLng: 18.036,
	  spriteLat: 59.316,
	  spriteBearing: 1
	  
    };
    this.mapContainer = React.createRef();
  }
  
  

	
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/jonkanx3/ckzkcsi4t002w15sekpsbw7xt',
      center: [lng, lat],
	  pitch: 60,
	  bearing: 40,
      zoom: zoom
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
		
		//Adding Mapillary sprite
		this.map.loadImage(
			'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
			(error, image) => {
				if (error) throw error;

				// Add the image to the map style.
				this.map.addImage('cat', image);

				// Add a data source containing one point feature.
				this.map.addSource('sprite', {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': [{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [this.state.spriteLng, this.state.spriteLat]
							},
							'properties': {
								'rotation': 90
							}
						}]
					}
				});

				// Add a layer to use the image to represent the data.
				this.map.addLayer({
					'id': 'cat-sprite',
					'type': 'symbol',
					'source': 'sprite', // reference the data source
					'layout': {
						'icon-image': 'cat', // reference the image
						'icon-size': 0.15,
						'icon-rotate': ['get', 'rotation']
						
					}
				});
			}
		);
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
  }
  

  
      handleCallback = (position,pov) =>{
        this.setState({spriteLat: position.lat,
					   spriteLng: position.lng,
					   spriteBearing: pov.bearing})
    }
	
		componentDidUpdate(prevProps,prevState) {
		if (prevState.spriteLng !== this.state.spriteLng) {
			console.log(this.map.getSource('sprite')._data.features[0].geometry.coordinates);
					this.map.getSource('sprite').setData({
			"type": "FeatureCollection",
					"features": [{
						"type": "Feature",
						"geometry": {
							"type": "Point",
							"coordinates": [this.state.spriteLng, this.state.spriteLat]
						},
						"properties": {
							'rotation': this.state.spriteBearing
						}
					}]
		});
			
		}
	}

	
  render() {
    const { lng, lat, zoom, iframeURL, spriteLat} = this.state;
    return (
	<div>
		<Street parentCallback = {this.handleCallback.bind(this)}  imageId={iframeURL} />
			<div ref={this.mapContainer} class="map-container" />
			<div>
				<div class={this.state.activePoint+"-container"}>
				<a href='https://www.hemnet.se/bostad/lagenhet-2rum-sodermalm-hogalid-stockholms-kommun-lorensbergsgatan-5a-18333355' target="_blank" title="Opens in a new window">Link</a>
				<h>{this.state.spriteBearing}</h>
				</div>
			</div>
				
		
			
	</div>

    );
  }
}
	    //<div class="sidebar">
	    //    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Photoid: {iframeURL}
		//</div>

