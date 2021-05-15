import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar";
import {Box, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Breadcrumbs from "./components/Breadcrumbs";
import theme from "./theme";

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>
              <Navbar/>
              <Box paddingTop={'70px'}>
                  <Breadcrumbs/>
                  <AppRouter/>
              </Box>
          </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
