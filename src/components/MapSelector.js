import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Map from "./Map";
import "./MapSelector.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWlsaW5iaGFrdGEiLCJhIjoiY2s3bXRvMzJlMDcyMTNrcTg2ZWI5ODRlaSJ9.lJhVMW_A65jIeG_oFINQoA";

export default class MapSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      userLocation: {}
    };
    this.handleClose = this.handleClose.bind(this);
    this.setUserLocation = this.setUserLocation.bind(this);
  }

  componentDidMount() {
    this.setUserLocation();
  }

  handleClose = () => {
    this.props.onClose();
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation
      });
    });
  };

  render() {
    const theme = createMuiTheme();
    const classes = {
      appBarLocation: {
        position: "relative"
      },
      titlelocation: {
        marginLeft: theme.spacing(2),
        flex: 1
      },
      mapStyles: {
        height: "100%",
        width: "100%"
      },
      navStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        padding: "10px"
      }
    };
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar style={classes.appBarLocation}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={classes.titlelocation}>
                Select Location
              </Typography>
              <Button autoFocus color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          {/* map here */}
          <Map userLocation={this.state.userLocation}/>
        </Dialog>
      </div>
    );
  }
}
