import React, { Component } from "react";
import { Grid } from "@material-ui/core";

class TypingIndicator extends Component {
  render() {
    if (this.props.usersWhoAreTyping.length > 0) {
      return (
        <Grid item xs={3}>
          <div>
            {`${this.props.usersWhoAreTyping
              .slice(0, 2)
              .join(" and ")} is typing`}
          </div>
        </Grid>
      );
    }
    return <div />;
  }
}

export default TypingIndicator;
