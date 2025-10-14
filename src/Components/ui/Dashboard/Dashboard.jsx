import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const data = {
    siderList: ["Home", "About", "Contact"],
  };
  console.log("before api call", data);

  async function getdata() {
    try {
      const res = await fetch("https://servermaltex.whdevs.com/menus/getMenusUserIDWise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
        }),
      });
  
      if (!res.ok) throw new Error("Network error");
  
      const data = await res.json();
      console.log("API Response:", data);
      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  }
  
  getdata();
  
  

//   useEffect(() => {
//     getdata();
//   }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          transition: "all 0.3s ease",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open ? `${drawerWidth}px` : 0,
          padding: "10px",
          backgroundColor: "#3d5164",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src={data?.companyLogo || "https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"}
              alt="Company Logo"
              sx={{ width: 32, height: 32, borderRadius: "50%" }}
            />
            <Typography variant="h6" noWrap component="div">
              {data?.companyName || "Company Name"}
            </Typography>
          </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src={data?.userProfile || "https://mui.com/static/images/avatar/2.jpg"}
                alt="User Avatar"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, fontSize: "14px" }}
              >
                {data?.userName || "Ibrahim"}
              </Typography>
            </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fff",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {data?.siderList.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Dashboard;
