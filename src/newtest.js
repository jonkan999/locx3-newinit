componentDidMount() {
    this.viewer = new Mapillary.Viewer(
      'mapillary-viewer',
      this.props.clientId,
      null,
      this.props.options,
    );
    // Initialize with .moveToKey because passing the imageKey in the constructor
    // does not update the viewer until the user clicks explore
    this.viewer.on(Mapillary.Viewer.nodechanged, this.onNodeChanged);

    /* eslint-disable no-underscore-dangle */
    this.viewer._container.renderService.renderCamera$.subscribe(
      this.handleCameraChanges,
    );

    this.viewer._container.renderService.bearing$.subscribe(
      this.handleBearingChanges,
    );

    window.addEventListener('resize', this.handleWindowResize);
    if (this.props.filter) {
      this.viewer.setFilter(this.props.filter);
    }
    this.viewer.moveToKey(this.props.imageKey);
    this.viewer.on(Mapillary.Viewer.moveend, this.onMoveEnd);
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageKey !== prevProps.imageKey) {
      this.viewer.moveToKey(this.props.imageKey);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.viewer.off(Mapillary.Viewer.nodechanged, this.onNodeChanged);
    this.viewer.off(Mapillary.Viewer.moveend, this.onMoveEnd);
    this.viewer._container.renderService.renderCamera$.unsubscribe(
      this.handleCameraChanges,
    );

    this.viewer._container.renderService.bearing$.unsubscribe(
      this.handleBearingChanges,
    );
  }

  handleWindowResize = () => {
    this.viewer.resize();
  }

  handleBearingChanges = (bearing) => {
    if (this.props.onBearingChanged && !this.state.transition) {
      this.props.onBearingChanged(bearing);
    }
  }

  handleCameraChanges = (camera) => {
    // subscribe to tilt changes
    const tilt = (camera.rotation.theta * 180) / Math.PI;
    if (tilt !== this.state.tilt && !this.state.transition) {
      if (this.props.onTiltChanged) {
        this.props.onTiltChanged(tilt);
      }
      this.setState({ tilt });
    }

    const fov = camera.perspective.fov;
    if (fov !== this.state.fov && !this.state.transition) {
      if (this.props.onFovChanged) {
        this.props.onFovChanged(fov);
      }
      this.setState({ fov });
    }
  }

  onNodeChanged = (event) => {
    this.setState({ transition: true });
    if (this.props.onNodeChanged) {
      this.props.onNodeChanged(event);
    }
  }

  onMoveEnd = () => this.setState({ transition: false })

  render() {
    return (
      <div
        id="mapillary-viewer"
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}