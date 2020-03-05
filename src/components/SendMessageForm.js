import React, { Component } from "react";
import "./SendMessageForm.css";
import { FilledInput, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";

class SendMessageForm extends Component {
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
      }
    };
    return (
      <form onSubmit={this.onSubmit}>
        <Grid item xs style={styles.inputmessage}>
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
      </form>
      // <React.Fragment>
      //   <CssBaseline />
      //   <Container maxWidth="lg">
      //     <form onSubmit={this.onSubmit}>
      //       <Table>
      //         <TableBody>
      //           <TableRow>
      //             <TableCell>
      //               <FilledInput
      //                 className="input"
      //                 type="text"
      //                 placeholder="Type a message here then hit ENTER"
      //                 onChange={this.onChange}
      //                 value={this.state.text}
      //               />
      //             </TableCell>
      //             <TableCell>
      //               <Button
      //                 variant="contained"
      //                 color="primary"
      //                 endIcon={<Send />}
      //                 onClick={this.onSubmit}
      //               >
      //                 Send
      //               </Button>
      //             </TableCell>
      //           </TableRow>
      //         </TableBody>
      //       </Table>
      //     </form>
      //   </Container>
      // </React.Fragment>
    );
  }
}

export default SendMessageForm;
