import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const logoStyle = {
  width: "auto",
  height: "32px",
  cursor: "pointer",
};

const AppAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Toolbar variant="regular" sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={"./static/aceresume_logo.svg"}
              style={logoStyle}
              alt="Logo"
            />

              <div className="text-2xl text-black tracking-wide ml-2 font-semibold">
            ace<span className="text-indigo-900">resume</span>
          </div>

          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <MenuItem
              onClick={() => scrollToSection("features")}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <Typography>Features</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => scrollToSection("testimonials")}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <Typography>Testimonials</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => scrollToSection("highlights")}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <Typography>Highlights</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => scrollToSection("pricing")}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <Typography>Pricing</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => scrollToSection("faq")}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <Typography>FAQ</Typography>
            </MenuItem>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              component="a"
              href="/sign-in/"
              sx={{ width: 100 }}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              color="primary"
              component="a"
              href="/sign-up/"
              sx={{ width: 100 }}
            >
              Sign up
            </Button>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <Button
              variant="text"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            minWidth: "250px",
            p: 2,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <MenuItem onClick={() => scrollToSection("features")}>
            Features
          </MenuItem>
          <MenuItem onClick={() => scrollToSection("testimonials")}>
            Testimonials
          </MenuItem>
          <MenuItem onClick={() => scrollToSection("highlights")}>
            Highlights
          </MenuItem>
          <MenuItem onClick={() => scrollToSection("pricing")}>
            Pricing
          </MenuItem>
          <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default AppAppBar;
