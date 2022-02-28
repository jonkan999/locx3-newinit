
import React from 'react';
import App from './App.js';
import {Viewer} from 'mapillary-js';



 export default class Street extends React.Component {

    constructor(props) {
      super(props);
	  this.state = {
    };
      this.streetContainer = React.createRef();
    }

	
    componentDidMount() {
        this.viewer = new Viewer({
		
        accessToken: 'MLY|4745356748910970|2a48362afcc51b2c2876492e13bf157a',
        container: this.streetContainer.current,
		imageId: this.props.imageId,
		component: {cover: false}
      });

    }
	
	componentDidUpdate(prevProps,prevState) {
		if (prevProps.imageId !== this.props.imageId) {
			this.viewer.moveTo(this.props.imageId);
			console.log(prevProps.imageId);
			console.log(this.props.imageId);
			this.viewer.on('position', async (event) => {
				const position = await this.viewer.getPosition();
				const pov = await this.viewer.getPointOfView();
				console.log(pov.bearing)
				this.props.parentCallback(position,pov);
			});
		}
	}
	
				



    render() {
      return (
	  <div>
		<div ref={this.streetContainer}  class="street-container" >
	
		</div>
	</div>
	
	  );
    }
	
  }

