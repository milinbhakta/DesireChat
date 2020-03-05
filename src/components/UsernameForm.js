import React, { Component } from "react";
import { withStyles, Grid, TextField, Button, Card } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const styles = theme => ({
  margin: {
    margin: theme.spacing(10)
  },
  padding: {
    padding: theme.spacing.unit
  },
  root: {
    margin: 50
  }
});

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <div className={classes.root}>
            <Card className={classes.padding} elevation={3}>
              <form onSubmit={this.onSubmit}>
                <div className={classes.margin}>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                      <h1>Desire Chat</h1>
                    </Grid>
                  </Grid>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                      <h3>Login</h3>
                    </Grid>
                  </Grid>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item lg={true} md={true} sm={true} xs={true}>
                      <TextField
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        autoFocus
                        placeholder="Your Full Name"
                        required
                        onKeyPress={this.onChange}
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "10px" }}
                  >
                    <Button
                      id="login"
                      variant="outlined"
                      color="primary"
                      style={{ textTransform: "none", cursor: "pointer" }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Grid>
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UsernameForm);
