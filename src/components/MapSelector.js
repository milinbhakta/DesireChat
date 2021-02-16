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


export default class MapSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      marker: {
        latitude: 0,
        longitude: 0
      },
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClosebtn = this.handleClosebtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }


  handleClose = () => {
    this.props.onClose(this.state.marker);
  };

  handleClosebtn = () =>{
    this.props.onClose(null)
  }

  handleSave(marker){
    this.setState({marker});
    console.log("Map Selector",marker);
  }

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
          onClose={this.handleClosebtn}
          TransitionComponent={Transition}
        >
          <AppBar style={classes.appBarLocation}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClosebtn}
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
          <Map onSave={this.handleSave}/>
        </Dialog>
      </div>
    );
  }
}
