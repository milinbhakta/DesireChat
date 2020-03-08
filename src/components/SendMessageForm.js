import React, { Component, createRef } from "react";
import "./SendMessageForm.css";
import { FilledInput, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      open: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.anchorRef = createRef();
    this.prevOpen = createRef(this.state.open);
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

  handleToggle = () => {
    // setOpen(prevOpen => !prevOpen);
  };

  handleClose = event => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    this.setState({ open: false });
  };

  handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({ open: false });
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
      plus: {}
    };
    return (
      <form onSubmit={this.onSubmit}>
        <Grid item xs style={styles.inputmessage}>
          <Button
            ref={this.anchorRef}
            aria-controls={this.state.open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
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
        <Popper
          open={this.state.open}
          anchorEl={this.anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList
                    autoFocusItem={this.state.open}
                    id="menu-list-grow"
                    onKeyDown={this.handleListKeyDown}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
