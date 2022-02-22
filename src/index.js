import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import Street from './Street';

ReactDOM.render(
  <React.StrictMode>
	<div>
	<App/>
	

	</div>
  </React.StrictMode>,
  document.getElementById('root')
);
//imageId={App.get('iframeURL')}
//<Street imageId= {document.getElementsByClassName('sidebar').innerHTML} />