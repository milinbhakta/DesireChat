import React, { Component } from "react";
import MapSelector from "./MapSelector";
import "./SendMessageForm.css";
import {
  FilledInput,
  Grid,
  createMuiTheme,
  Menu,
  MenuItem
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import ImageIcon from "@material-ui/icons/Image";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { DropzoneDialog } from "material-ui-dropzone";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      anchorEl: null,
      open: false,
      files: [],
      openLocation: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleFileClick = this.handleFileClick.bind(this);
    this.handleLocationOpen = this.handleLocationOpen.bind(this);
    this.handleLocationClose = this.handleLocationClose.bind(this);
    this.handleSaveImage = this.handleSaveImage.bind(this);
    this.handleImageOpen = this.handleImageOpen.bind(this);
  }

  componentDidMount() {}

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  handleImageClick = () => {
    this.handleImageOpen();
    this.handleClose();
  };

  handleFileClick = () => {
    this.handleClose();
  };

  handleLocationOpen = () => {
    this.setState({ openLocation: true });
  };

  handleLocationClose = () => {
    this.setState({ openLocation: false });
    this.handleClose();
  };

  handleSaveImage = files => {
    this.setState({
      files: files,
      open: false
    });
    console.log(files);
    this.props.onFileSubmit(files);
  };

  handleImageOpen() {
    this.setState({
      open: true
    });
  }

  render() {
    const theme = createMuiTheme();
    const styles = {
      root: {
        flexGrow: 1
      },
      inputmessage: {
        display: "flex",
        flexdirection: "row"
      },
      btn: {
        marginTop: "10px"
      },
      plus: {},
      paper: {
        marginRight: theme.spacing(2)
      }
    };
    return (
      <form onSubmit={this.onSubmit}>
        <Grid item xs style={styles.inputmessage}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <AddIcon />
          </Button>
          <FilledInput
            className="input"
            type="text"
            placeholder="Type a message here then hit ENTER"
            onChange={this.onChange}
            value={this.state.text}
          />
          <Grid item xs style={styles.btn}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Send />}
              onClick={this.onSubmit}
            >
              Send
            </Button>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          transitionDuration={343}
        >
          <MenuItem onClick={this.handleImageOpen}>
            <ImageIcon /> Image
          </MenuItem>
          <MenuItem onClick={this.handleFileClick}>
            <AttachFileIcon /> File
          </MenuItem>
          <MenuItem onClick={this.handleLocationOpen}>
            <LocationOnIcon /> Location
          </MenuItem>
        </Menu>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSaveImage}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose}
        />

        <MapSelector
          open={this.state.openLocation}
          onClose={this.handleLocationClose}
        />
      </form>
    );
  }
}

export default SendMessageForm;
