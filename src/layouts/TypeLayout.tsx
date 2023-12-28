import * as React from "react";
import { Grid } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const TypeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Grid container>
      <Grid item> layout</Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default TypeLayout;
