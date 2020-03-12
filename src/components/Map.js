import Pin from "./Pin";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker
} from "react-map-gl";
import  { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import "./MapSelector.css";

const token =
  "pk.eyJ1IjoibWlsaW5iaGFrdGEiLCJhIjoiY2s3bXRvMzJlMDcyMTNrcTg2ZWI5ODRlaSJ9.lJhVMW_A65jIeG_oFINQoA";

const navStyle = {
    float:"right",
    top: 0,
    left: 0,
    padding: '5px',
    margin:`5px`
  };

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3,
        bearing: 0,
        pitch: 0
      },
      searchResultLayer: null,
      marker: {
        latitude: 37.785164,
        longitude: -100
      },
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
    console.log("ViewPort",viewport);
    this.setState({marker:{latitude:viewport.latitude,longitude:viewport.longitude}})
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
    const { viewport, marker } = this.state;
    return (
      <div style={{ height: "600px", width: "600px", margin: "50px" }}>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={token}
          height="inherit"
          width="inherit"
        >
          {" "}
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            offsetTop={-5}
            offsetLeft={-5}
            draggable
            onDragStart={this._onMarkerDragStart}
            onDrag={this._onMarkerDrag}
            onDragEnd={this._onMarkerDragEnd}
          >
            <Pin size={20} />
          </Marker>{" "}
          />
         
          <div className="nav" style={navStyle}>
            <GeolocateControl
            style={{marginBottom:`5px`}}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <NavigationControl onViewportChange={this._updateViewport} />
          </div>
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={token}
            position="top-left"
          />
        </MapGL>
        {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
      </div>
    );
  }
}

export default Map;
