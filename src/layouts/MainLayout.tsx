import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Container } from "@mui/material";
import pokeLogo from "../assets/logos/pokeball_logo.png";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Grid container>
      <AppBar position="static" sx={{ bgcolor: "#FFCB05" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              src={pokeLogo}
              alt="logo"
              width={50}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            />

            <Grid container justifyContent="center" alignItems="center">
              <Box
                component="img"
                src={pokeLogo}
                alt="logo"
                width={50}
                sx={{
                  display: { xs: "flex", md: "none" },
                }}
              />
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid container item xs={12}>
        <Grid item sx={{ width: "100%" }}>
          <Grid item container justifyContent="center" alignItems="center">
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
