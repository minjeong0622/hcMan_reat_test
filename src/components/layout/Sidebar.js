import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = ({ menu, onMenuClick }) => {
  const [open, setOpen] = useState({});

  const handleClick = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigate = (item) => {
    if (item.path) {
      onMenuClick(item);
    } else {
      handleClick(item.id);
    }
  };

  // 공통 hover 스타일
  const hoverStyle = {
    transition: "background-color 0.2s ease",
    "&:hover": { backgroundColor: "rgba(135, 206, 250, 0.4)" },
  };

  return (
    <List>
      {menu.children?.map((subMenu) => (
        <div key={subMenu.id}>
          <ListItem button onClick={() => handleNavigate(subMenu)} sx={hoverStyle}>
            <ListItemText primary={subMenu.title} />
            {subMenu.children ? (open[subMenu.id] ? <ExpandLess /> : <ExpandMore />) : null}
          </ListItem>
          {subMenu.children && (
            <Collapse in={open[subMenu.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subMenu.children.map((child) => (
                  <ListItem
                    button
                    key={child.id}
                    sx={{ pl: 4, ...hoverStyle }}
                    onClick={() => handleNavigate(child)}
                  >
                    <ListItemText primary={child.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

export default Sidebar;
