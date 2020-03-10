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
import {
  GridList,
  GridListTile,
  ListSubheader,
  Divider
} from "@material-ui/core";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      selectedavatar: "",
      selected: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleImageOnclick = this.handleImageOnclick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose = () => {
    this.setState({ selectedavatar: "", selected: false });
    this.props.onClose();
  };

  handleImageOnclick(e) {
    console.log(e.target.src);
    this.setState({ selectedavatar: e.target.src, selected: true });
  }

  handleSave() {
    fetch("http://localhost:3001/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.props.currentUser.id,
        AvatarUrl: this.state.selectedavatar
      })
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error("error", error));
    this.setState({ selectedavatar: "", selected: false });
    this.handleClose();
  }

  render() {
    const theme = createMuiTheme();
    const classes = {
      appBar: {
        position: "relative"
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1
      },
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
      },
      imgtile: {
        height: "48px",
        width: "48px",
        overflow: "hidden"
      },
      gridList: {
        marginLeft: theme.spacing(2)
      },
      selecteddiv:{
        display:this.state.selected ?'block':'none',
        margin:"50px",
        alignSelf: "center"
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
          <AppBar style={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={classes.title}>
                Settings
              </Typography>
              <Button autoFocus color="inherit" onClick={this.handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <GridList cellHeight={60} style={classes.gridList} cols={8}>
              <GridListTile key="Subheader" cols={8}>
                <ListSubheader component="div">
                  Select Your Avatar
                </ListSubheader>
              </GridListTile>
              {this.props.avatars.map(tile => (
                <GridListTile
                  key={tile.title}
                  onClick={this.handleImageOnclick}
                >
                  <img
                    src={tile.src}
                    alt={tile.title}
                    style={classes.imgtile}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <Divider />
          <div style={classes.selecteddiv}>
            <img src={this.state.selectedavatar} alt="Selected Avatar"></img>
          </div>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default FullScreenDialog;
