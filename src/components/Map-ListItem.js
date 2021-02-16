import Pin from "./Pin";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import { GeoJsonLayer } from "deck.gl";
import "./MapSelector.css";

const token =
  "pk.eyJ1IjoibWlsaW5iaGFrdGEiLCJhIjoiY2s3bXRvMzJlMDcyMTNrcTg2ZWI5ODRlaSJ9.lJhVMW_A65jIeG_oFINQoA";

class MapList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: this.props.Marker.latitude,
        longitude: this.props.Marker.latitude,
        zoom: 9,
        bearing: 0,
        pitch: 0
      },
      searchResultLayer: null,
      events: {}
    };

    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(
      this
    );
    this.handleOnResult = this.handleOnResult.bind(this);
    this._onMarkerDragStart = this._onMarkerDragStart.bind(this);
    this._onMarkerDrag = this._onMarkerDrag.bind(this);
    this._onMarkerDragEnd = this._onMarkerDragEnd.bind(this);
  }
  mapRef = React.createRef();

  handleViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange(viewport) {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    console.log("ViewPort", viewport);
    this.setState({
      marker: { latitude: viewport.latitude, longitude: viewport.longitude }
    });
    this.props.onSave(this.state.marker);
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  }

  handleOnResult(event) {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragStart = event => {
    this._logDragEvent("onDragStart", event);
  };

  _onMarkerDrag = event => {
    this._logDragEvent("onDrag", event);
  };

  _onMarkerDragEnd = event => {
    this._logDragEvent("onDragEnd", event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
  };

  render() {
    return (
      <div style={{ height: "15vh", width: "60vw" }}>
        <MapGL
          ref={this.mapRef}
          longitude={this.props.Marker.longitude}
          latitude={this.props.Marker.latitude}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={token}
          height="inherit"
          width="inherit"
          zoom={16}
        >
          {" "}
          <Marker
            longitude={this.props.Marker.longitude}
            latitude={this.props.Marker.latitude}
            offsetTop={-5}
            offsetLeft={-5}
          >
            <Pin size={20} />
          </Marker>{" "}
        </MapGL>
        {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
      </div>
    );
  }
}

export default MapList;
