import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function NavBar() {
  let navigate = useNavigate();
  const handleClick = (destination) => {
    navigate(destination);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#FFD717" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              fontFamily: "Scope One",
              cursor: "pointer",
              fontFamily: "Rubik",
            }}
            onClick={() => handleClick("/lotto")}
          >
            
            <img src="../logo.png" style={{width:"30px"}}></img>
            LottoBoo!
          </Typography>

          <IconButton onClick={() => handleClick("/favorite")}>
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={() => handleClick("/profile")}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
