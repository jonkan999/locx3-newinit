
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
      lat: 59.317,
      zoom: 15.31,
	  activePoint: 'default',
	  iframeURL: '394639591619707',
	  linkURL: ''
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/jonkanx3/ckzkcsi4t002w15sekpsbw7xt',
      center: [lng, lat],
      zoom: zoom
    });
	
	map.getCanvas().style.cursor = 'pointer';
	

	
	map.on('load', () => {

		var arrayLength = MapPolygons.length;
		var i = 0;
		for (i; i < arrayLength; i++) {
			map.addSource(MapPolygons[i][0], {
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
			map.addLayer({
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
		map.addSource('points', {
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
		map.addLayer({
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

	map.on('click', 'points', (e) => {
		const coordinates = e.features[0].geometry.coordinates.slice();
		//var ObjectArray = ['BRFBulten','Hornstull'];
		var arrayLength = MapPolygons.length;
		var i = 0;


		
		if (map.getLayoutProperty(e.features[0].properties.title,'visibility')==='none') {
			for (i; i < arrayLength; i++) {
				//Turn off all but clicked highlights
				if (e.features[0].properties.title === MapPolygons[i][0]) {
					var popup = new mapboxgl.Popup({closeButton: false, className: e.features[0].properties.title, 'border-top-color': 'rgba(205, 205, 205,0)' })
					.setLngLat(coordinates)
					.setHTML(e.features[0].properties.description)
					.setMaxWidth('none')
					.addTo(map);
					map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'visible');
					this.setState({
						activePoint: MapPolygons[i][0],
						iframeURL: MapPolygons[i][5],
						linkURL: MapPolygons[i][6],
					  });
				} else {
					map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'none');
				}
			}
		} else {
			for (i; i < arrayLength; i++) {
				//Turn off all
				map.setLayoutProperty(MapPolygons[i][0], 'visibility', 'none');
			}
		}
		//if (e.features[0].properties.title==='Hornstull') {
		//	const visibility = map.getLayoutProperty(
		//		e.features[0].properties.title,
		//		'visibility'
		//	);
		//	 
		//	// Toggle layer visibility by changing the layout object's visibility property.
		//	if (visibility === 'visible') {
		//		map.setLayoutProperty(e.features[0].properties.title, 'visibility', 'none');
		//		map.setLayoutProperty(e.features[0].properties.title+'-outline', 'visibility', 'none');
		//	} else {
		//		this.className = 'active';
		//		map.setLayoutProperty(
		//			e.features[0].properties.title,
		//			'visibility',
		//			'visible'
		//		);
		//		map.setLayoutProperty(
		//			'fill-extrusion',
		//			'visibility',
		//			'none'
		//		);
		//		map.setLayoutProperty(
		//			e.features[0].properties.title+'-outline',
		//			'visibility',
		//			'visible'
		//		);
		//	}
        //
		//} else if (e.features[0].properties.title==='BRFBulten') {
		//	const visibility = map.getLayoutProperty(
		//		e.features[0].properties.title,
		//		'visibility'
		//	);
		//	 
		//	// Toggle layer visibility by changing the layout object's visibility property.
		//	if (visibility === 'visible') {
		//		map.setLayoutProperty(e.features[0].properties.title, 'visibility', 'none');
		//		map.setLayoutProperty(e.features[0].properties.title+'-outline', 'visibility', 'none');
		//		this.className = '';
		//	} else {
		//		this.className = 'active';
		//		map.setLayoutProperty(
		//			e.features[0].properties.title,
		//			'visibility',
		//			'visible'
		//		);
		//		map.setLayoutProperty(
		//			e.features[0].properties.title+'-outline',
		//			'visibility',
		//			'visible'
		//		);
		//	}
        //
		//} else {
		//}
		//
	});

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }
  render() {
    const { lng, lat, zoom, iframeURL } = this.state;
    return (
	<div>
		<Street imageId={iframeURL} />
			<div ref={this.mapContainer} class="map-container" />
			<div>
				<div class={this.state.activePoint+"-container"}>
				<a href='https://www.hemnet.se/bostad/lagenhet-2rum-sodermalm-hogalid-stockholms-kommun-lorensbergsgatan-5a-18333355' target="_blank" title="Opens in a new window">Link</a>
				</div>
			</div>
				
		
			
	</div>

    );
  }
}
	    //<div class="sidebar">
	    //    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Photoid: {iframeURL}
		//</div>

