
export default function addSymbolLayer(layer_id,map,polygons,image_id,image_src,zoom) {
  	
		var arrayLength = polygons.length;
		var i = 0;
		var new_polygons=[];
		var poly_i = 0;
		for (i; i < arrayLength; i++) {
			if (polygons[i][14] === image_src) {
				new_polygons[poly_i] = polygons[i];
				poly_i=poly_i+1;
			}
		}
		polygons=new_polygons;
		arrayLength = polygons.length;
		i = 0;
		for (i; i < arrayLength; i++) {
			map.addSource(polygons[i][0], {
				'type': 'geojson',
				'data': {
					'type': 'Feature',
					'geometry': {
						'type': 'Polygon',
						// These coordinates outline Hornstull.
						'coordinates': [
							
							polygons[i][2]
							
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
					"coordinates": polygons[i][3]
				},
				"properties": {
					"title": polygons[i][0],
					'color': polygons[i][4],
					"description": polygons[i][8]
				}
			}
			pointsData['features'].push(newFeature);

			
			//extrusions
			map.addLayer({
				'id': polygons[i][0],
				'type': 'fill-extrusion',
				'source': polygons[i][0], // reference the data source
				'layout': {
					'visibility': 'none'
				},
				'paint': {
					'fill-extrusion-color': polygons[i][4], // blue color fill
					'fill-extrusion-opacity': 0.4,
					'fill-extrusion-height': polygons[i][5]
				}
			});

			
		}
		map.addSource(layer_id, {
			'type': 'geojson',
			'data': pointsData
		});
		map.loadImage(
		image_id,
		(error, image) => {
			if (error) throw error;
			map.addImage(image_src, image);
			map.addLayer({
				'id': layer_id,
				'type': 'symbol',
				'source': layer_id, // reference the data source
				'layout': {
					'icon-image': image_src, // reference the image
					'icon-size': 0.02 * Math.pow(1.5, Math.max((24 - zoom),2)),
      'icon-allow-overlap': true
				}
			});
		});
}