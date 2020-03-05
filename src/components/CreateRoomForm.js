import React, { Component } from "react";
import { FilledInput, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";

class CreateRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

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

  render() {
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
      input:{
          color:"white"
      }
    };
    return (
      <form onSubmit={this.onSubmit}>
        <Grid item xs style={styles.inputmessage}>
          <FilledInput
          style={styles.input}
            type="text"
            placeholder="Type a message here then hit ENTER"
            onChange={this.onChange}
            value={this.state.text}
          />
          <Grid item xs style={styles.btn}>
            <Button variant="contained" color="primary" onClick={this.onSubmit}>
              <AddBoxIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default CreateRoomForm;
