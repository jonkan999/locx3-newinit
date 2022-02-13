import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 18.036,
      lat: 59.317,
      zoom: 15.31
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
	map.on('load', () => {
		map.addSource('Hornstull', {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'geometry': {
					'type': 'Polygon',
					// These coordinates outline Hornstull.
					'coordinates': [
						[
							[18.033466, 59.315227],
							[18.034969, 59.315230],
							[18.033320, 59.317945],
							[18.031628, 59.317828],
							[18.033466, 59.315227]
						]
					]
				}
			}
		});
		map.addSource('BRFBulten', {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'geometry': {
					'type': 'Polygon',
					// These coordinates outline Hornstull.
					'coordinates': [
						[
							
							[18.033901, 59.316236],
							[18.034647, 59.316325],
							[18.034257, 59.316970],
							[18.034698, 59.316986],
							[18.035178, 59.316137],
							[18.034012, 59.316037],
							[18.033901, 59.316236]
						]
					]
				}
			}
		});
		map.addSource('points', {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': [
					{
						// feature for point Hornstull
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [18.033153, 59.316858]
						},
						'properties': {
							'title': 'Hornstull',
							'color': '#CF9FFF'
						}
						
					},
					{
						// feature for BRF Bulten
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [18.034865, 59.316240]
						},
						'properties': {
							'title': 'BRFBulten',
							'color': '#A34646'
						}
					}
				]
			}
		});
		// Add a point layer
		map.addLayer({
			'id': 'Hornstull',
			'type': 'fill-extrusion',
			'source': 'Hornstull', // reference the data source
			'layout': {
				'visibility': 'none'
			},
			'paint': {
				'fill-extrusion-color': '#CF9FFF', // blue color fill
				'fill-extrusion-opacity': 0.4,
				'fill-extrusion-height': 10
			}
		});
		// Add a black outline around the polygon.
		map.addLayer({
			'id': 'Hornstull-outline',
			'type': 'line',
			'source': 'Hornstull',
			'layout': {
				'visibility': 'none'
			},
			'paint': {
				'line-color': '#000',
				'line-width': {
					'type': 'exponential',
					'base': 1,
					'stops': [
						[0, 1 * Math.pow(1, (0 - zoom))],
						[24, 1 * Math.pow(1, (24 - zoom))]
					]
				}
			}
		});
		map.addLayer({
			'id': 'BRFBulten',
			'type': 'fill-extrusion',
			'source': 'BRFBulten', // reference the data source
			'layout': {
				'visibility': 'none'
			},
			'paint': {
				'fill-extrusion-color': '#A34646', // blue color fill
				'fill-extrusion-opacity': 0.4,
				'fill-extrusion-height': 35
			}
		});
		map.addLayer({
			'id': 'BRFBulten-outline',
			'type': 'line',
			'source': 'BRFBulten',
			'layout': {
				'visibility': 'none'
			},
			'paint': {
				'line-color': '#000',
				'line-width': {
					'type': 'exponential',
					'base': 1,
					'stops': [
						[0, 1 * Math.pow(1, (0 - zoom))],
						[24, 1 * Math.pow(1, (24 - zoom))]
					]
				}
			}
		});
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
						[0, 7 * Math.pow(2, (0 - zoom))],
						[24, 7 * Math.pow(2, (24 - zoom))]
					]
				},
				'circle-stroke-width': {
					'base': 2,
					'stops': [
						[0, 0.5 * Math.pow(2, (0 - zoom))],
						[24, 0.5 * Math.pow(2, (24 - zoom))]
					]
				}
			}
		});
		
	});
	
	map.on('click', 'points', (e) => {
		if (e.features[0].properties.title==='Hornstull') {
			const visibility = map.getLayoutProperty(
				e.features[0].properties.title,
				'visibility'
			);
			 
			// Toggle layer visibility by changing the layout object's visibility property.
			if (visibility === 'visible') {
				map.setLayoutProperty(e.features[0].properties.title, 'visibility', 'none');
				map.setLayoutProperty(e.features[0].properties.title+'-outline', 'visibility', 'none');
			} else {
				this.className = 'active';
				map.setLayoutProperty(
					e.features[0].properties.title,
					'visibility',
					'visible'
				);
				map.setLayoutProperty(
					e.features[0].properties.title+'-outline',
					'visibility',
					'visible'
				);
			}
        
		} else if (e.features[0].properties.title==='BRFBulten') {
			const visibility = map.getLayoutProperty(
				e.features[0].properties.title,
				'visibility'
			);
			 
			// Toggle layer visibility by changing the layout object's visibility property.
			if (visibility === 'visible') {
				map.setLayoutProperty(e.features[0].properties.title, 'visibility', 'none');
				map.setLayoutProperty(e.features[0].properties.title+'-outline', 'visibility', 'none');
				this.className = '';
			} else {
				this.className = 'active';
				map.setLayoutProperty(
					e.features[0].properties.title,
					'visibility',
					'visible'
				);
				map.setLayoutProperty(
					e.features[0].properties.title+'-outline',
					'visibility',
					'visible'
				);
			}
        
		} else {
		}
		
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
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}
