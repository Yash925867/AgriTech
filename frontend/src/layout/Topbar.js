import { AppBar, Toolbar, Typography } from "@mui/material";

function Topbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
      <Toolbar>
        <Typography variant="h6">
          Agricultural Production Analytics
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;