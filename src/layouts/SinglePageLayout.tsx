import * as React from "react";
import { Box, Grid } from "@mui/material";
import pokeLogo from "../assets/logos/pokeball_logo.png";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const SinglePageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Grid container rowGap={1}>
      <Grid
        className="laysus"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={920}
          height={70}
          sx={{ bgcolor: "#FFCB05", borderRadius: 10 }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnGap={7}
          >
            <Grid
              item
              sx={{
                fontSize: 20,
                "&:hover": {
                  textDecoration: "underline",
                  bgcolor: "whitesmoke",
                },
              }}
            >
              <Link to={"/p"} style={{ textDecoration: "none" }}>
                home
              </Link>
            </Grid>
            <Box
              component="img"
              src={pokeLogo}
              alt="logo"
              width={70}
              sx={{
                transition: "transform .15s ease-in",
                "&:hover": { transform: "rotate(360deg)" },
              }}
            />
            <Grid
              item
              sx={{
                fontSize: 20,
                "&:hover": {
                  textDecoration: "underline",
                  bgcolor: "whitesmoke",
                },
              }}
            >
              <Link to={"/p"} style={{ textDecoration: "none" }}>
                type
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* content */}
      <Grid container justifyContent="center">
        {children}
      </Grid>
    </Grid>
  );
};

export default SinglePageLayout;
