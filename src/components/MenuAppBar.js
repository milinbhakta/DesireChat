import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField, Button, createMuiTheme } from "@material-ui/core";
import JoinableRoomList from "./JoinableRoomList";


class MenuAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: "",
      open: false,
      roomname: "",
      openlistdialog: false,
      joinableRooms: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.onChangeCreateRoomText = this.onChangeCreateRoomText.bind(this);
    this.handleClickOpenListDialog = this.handleClickOpenListDialog.bind(this);
    this.handleCloseListDialog = this.handleCloseListDialog.bind(this);
  }

 componentDidMount() {
    if (this.state.joinableRooms.length === 0) {
      this.setState({ joinableRooms: this.props.joinableRooms });
    }
  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose(event) {
    this.setState({ anchorEl: null });
  }

  handleClickOpen(event) {
    this.setState({ open: true });
    this.handleClose(event);
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  onChangeCreateRoomText(e) {
    this.setState({ roomname: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.roomname);
    this.setState({ roomname: '' });
    this.handleCloseDialog();
  }

  handleCloseListDialog(value) {
    this.setState({ openlistdialog: false });
    this.handleClose(value);
    // setSelectedValue(value);
  }

  handleClickOpenListDialog() {
    this.setState({ openlistdialog: true });
  }

  render() {
    const theme = createMuiTheme();
    const styles = {
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2) 
      },
      title: {
        flexGrow: 1
      }
    };

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={styles.title}>
              {this.props.currentRoom.name}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClickOpen}>Create Room</MenuItem>
              <MenuItem onClick={this.handleClickOpenListDialog}>
                Join Room
              </MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
            <Dialog
              open={this.state.open}
              onClose={this.handleCloseDialog}
              aria-labelledby="form-dialog-title"
            >
              <form onSubmit={this.onSubmit}>
                <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Create Room and chat with your friends. No one can see your
                    chats.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room Name"
                    type="text"
                    fullWidth
                    onChange={this.onChangeCreateRoomText}
                    value={this.state.roomname}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.onSubmit} color="primary">
                    Create Room
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  joinableRooms: PropTypes.array.isRequired,
  currentRoom:PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// function MenuAppBar(props) {
//   const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1
//     },
//     menuButton: {
//       marginRight: theme.spacing(2)
//     },
//     title: {
//       flexGrow: 1
//     }
//   }));

//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [open, setOpen] = React.useState(false);
//   const [roomname, setroomname] = React.useState("");
//   const [openlistdialog, setOpenlistdialog] = React.useState(false);
//   const [joinableRooms, setjoinableRooms] = React.useState({});

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = event => {
//     if (event.target.innerText === "Join Room") {
//       // console.log(props);
//     }
//     setAnchorEl(null);
//   };

//   const handleClickOpen = event => {
//     setOpen(true);
//     handleClose(event);
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//   };

//   const onChangeCreateRoomText = e => {
//     setroomname(e.target.value);
//   };

//   const onSubmitRoom = e => {
//     e.preventDefault();
//     props.onSubmit(roomname);
//     setroomname("");
//     handleCloseDialog();
//   };

//   const handleCloseListDialog = value => {
//     setOpenlistdialog(false);
//     handleClose(value);
//     // setSelectedValue(value);
//   };

//   const handleClickOpenListDialog = () => {
//     setOpenlistdialog(true);
//   };

//   useEffect(() =>{
//     if(!joinableRooms){
//       props.currentUser
//           .getJoinableRooms()
//           .then(rooms => {
//             setjoinableRooms({ rooms });
//           })
//           .catch(err => {
//             console.log(`Error getting joinable rooms: ${err}`);
//           });
//     }
//   });

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             Photos
//           </Typography>
//           <IconButton
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleClick}
//             color="inherit"
//           >
//             <AccountCircle />
//           </IconButton>
//           <Menu
//             id="simple-menu"
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleClickOpen}>Create Room</MenuItem>
//             <MenuItem onClick={handleClickOpenListDialog}>Join Room</MenuItem>
//             <MenuItem onClick={handleClose}>Logout</MenuItem>
//           </Menu>
//           <Dialog
//             open={open}
//             onClose={handleCloseDialog}
//             aria-labelledby="form-dialog-title"
//           >
//             <form onSubmit={onSubmitRoom}>
//               <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Create Room and chat with your friends. No one can see your
//                   chats.
//                 </DialogContentText>
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   id="name"
//                   label="Room Name"
//                   type="text"
//                   fullWidth
//                   onChange={onChangeCreateRoomText}
//                   value={roomname}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleCloseDialog} color="primary">
//                   Cancel
//                 </Button>
//                 <Button onClick={onSubmitRoom} color="primary">
//                   Create Room
//                 </Button>
//               </DialogActions>
//             </form>
//           </Dialog>
//           <Dialog onClose={handleCloseListDialog} open={openlistdialog}>
//             <DialogTitle>Join Room</DialogTitle>
//             <List>
//               {joinableRooms.map((room) => {
//                 <ListItem button onClick={handleCloseListDialog} key={room.id}>
//                   <ListItemAvatar>
//                     <Avatar className={classes.avatar}>
//                       <PersonIcon />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText primary={room.name} />
//                 </ListItem>;
//               })}
//             </List>
//           </Dialog>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

export default MenuAppBar;