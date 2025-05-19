// src/components/Header.js
import React, { useState } from "react";
import { AppBar, Toolbar, Button, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import { menuItems } from "../data/menuItems";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsSidebarOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {menuItems.map((menu) => (
            <Button
              key={menu.id}
              color="inherit"
              onClick={() => handleMenuClick(menu)}
            >
              {menu.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <Sidebar menu={selectedMenu} />
      </Drawer>
    </>
  );
};

export default Header;
