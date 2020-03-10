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



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.props.onClose();
  };

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
        minWidth: 275,
      },
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
                Sound
              </Typography>
              <Button autoFocus color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    );
  }
}

export default FullScreenDialog;
