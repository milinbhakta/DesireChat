import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";

let currentD = new Date();
let startHappyHourD = new Date();
startHappyHourD.setHours(7, 40, 0); // 5.30 pm
let endHappyHourD = new Date();
endHappyHourD.setHours(19, 17, 0);
let prefersDarkMode = true;
if (currentD >= startHappyHourD && currentD < endHappyHourD) {
  prefersDarkMode = false;
}
const theme = createMuiTheme({
  palette: {
    type: prefersDarkMode ? "dark" : "light",
    primary: blue,
    secondary: pink
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,

  document.getElementById("root")
);
