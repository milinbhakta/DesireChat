// import React, { Component } from "react";
// import mapboxGl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// import "./MapSelector.css";
// mapboxGl.accessToken =
//   "pk.eyJ1IjoibWlsaW5iaGFrdGEiLCJhIjoiY2s3bXRvMzJlMDcyMTNrcTg2ZWI5ODRlaSJ9.lJhVMW_A65jIeG_oFINQoA";

// export default class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 114.1441,
//       lat: 22.375,
//       zoom: 11,
//       features: [],
//       isLoading: false,
//       userLocation: {}
//     };
//   }

//   componentDidMount() {
//     const geojson = {
//       type: "FeatureCollection",
//       features: [
//         {
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [-77.032, 38.913]
//           },
//           properties: {
//             title: "Mapbox",
//             description: "Washington, D.C."
//           }
//         },
//         {
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [-122.414, 37.776]
//           },
//           properties: {
//             title: "Mapbox",
//             description: "San Francisco, California"
//           }
//         }
//       ]
//     };

//     const map = new mapboxGl.Map({
//       container: this.mapContainer,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [this.state.lng, this.state.lat],
//       zoom: this.state.zoom
//     });

//     map.on("load", () => {
//       this.setState({
//         features: this.state.features
//       });
//       map.addSource("hk-schools-loc", {
//         type: "geojson",
//         data: geojson
//       });
//     });

//     // geojson.features.forEach(function(marker) {
//     //   // create a HTML element for each feature
//     //   var el = document.createElement("div");
//     //   el.className = "marker";

//     //   // make a marker for each feature and add to the map
//     //   new mapboxGl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
//     // });
//   }
//   render() {
//     return (
//       <div>
//         <div ref={el => (this.mapContainer = el)} className="mapContainer" />
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@material-ui/icons/LocationOn";
const TOKEN =
  "pk.eyJ1IjoibWlsaW5iaGFrdGEiLCJhIjoiY2s3bXRvMzJlMDcyMTNrcTg2ZWI5ODRlaSJ9.lJhVMW_A65jIeG_oFINQoA";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 43.708805,
        longitude: -79.48043,
        zoom: 16,
        bearing: 0,
        pitch: 0,
        width: "100%",
        height: "100%"
      },
      popupInfo: null
    };
  }

  // showDetails=() => {
  // this.setState({popupInfo: true});
  // }

  // hideDetails= ()=> {
  // this.setState({popupInfo: null});
  // }

  // renderPopup(index) {
  //   return (
  //     this.state.popupInfo && (
  //       <Popup
  //         tipSize={5}
  //         anchor="bottom-right"
  //         longitude={markerList[index].long}
  //         latitude={markerList[index].lat}
  //         onMouseLeave={() => this.setState({ popupInfo: null })}
  //         closeOnClick={true}
  //       >
  //         <p>Available beds:{markerList[index].info}</p>
  //       </Popup>
  //     )
  //   );
  // }

  render() {
    const { viewport } = this.state;
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <MapGL
          {...viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({ viewport })}
            />
            <div>
              {" "}
              <Marker
                longitude={-79.48043}
                latitude={43.708805}
              >
                <LocationOnIcon name="Current Location" size="big" />
              </Marker>{" "}
              {/* {this.renderPopup(index)} */}
            </div>

            {/* {markerList.map((marker, index) => {
              return (
                <div key={index}>
                  {" "}
                  <Marker longitude={marker.long} latitude={marker.lat}>
                    <LocationOnIcon
                      name="hospital"
                      size="big"
                      onMouseEnter={() => this.setState({ popupInfo: true })}
                      onMouseLeave={() => this.setState({ popupInfo: null })}
                    />
                  </Marker>{" "}
                  {this.renderPopup(index)}
                </div>
              );
            })} */}
          </div>
        </MapGL>
      </div>
    );
  }
}
