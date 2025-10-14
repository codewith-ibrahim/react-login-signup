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
  ListItemButton,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getDashboardData } from "../../../api/dashboard";

const drawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  const dashboardInfo = {
    companyLogo:
      "https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg",
    companyName: "Company Name",
    userProfile: "https://mui.com/static/images/avatar/2.jpg",
    userName: "Ibrahim",
  };

  const handleDrawerToggle = () => setOpen(!open);

  const toggleSubMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };
  // async function getdata() {
  //   try {
  //     const res = await fetch(
  //       "https://servermaltex.whdevs.com/menus/getMenusUserIDWise",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userID: 1 }),
  //       }
  //     );
  //     if (!res.ok) throw new Error("Network error");
  //     const data = await res.json();
  //     console.log("API Response:", data);
  //     return data;
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardData(1);
        console.log("Dashboard API Response:", data);
        setMenuData(data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    }
    fetchData();
  }, []);

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
              src={dashboardInfo.companyLogo}
              alt="Company Logo"
              sx={{ width: 32, height: 32, borderRadius: "50%" }}
            />
            <Typography variant="h6" noWrap component="div">
              {dashboardInfo.companyName}
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
              src={dashboardInfo.userProfile}
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
              {dashboardInfo.userName}
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
            {menuData && menuData.length > 0 ? (
              menuData.map((head) => (
                <Box key={head.headMenu}>
                  <ListItemButton onClick={() => toggleSubMenu(head.headMenu)}>
                    <ListItemText
                      primary={head.headMenu}
                      sx={{ fontWeight: "bold" }} 
                    />
                    {openMenus[head.headMenu] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openMenus[head.headMenu]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {head.ArrSubMenu?.map((sub) => (
                        <ListItem disablePadding>
                          <ListItemButton
                            component="a"
                            href={sub.menuURL}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={sub.subMenu} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))
            ) : (
              <Typography sx={{ pl: 2, pt: 2 }}>Loading menu...</Typography>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Dashboard;
