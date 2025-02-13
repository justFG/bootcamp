import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const FadeMenu = ({ onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="fade-menu-trigger" onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>Modifier</MenuItem>
        <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
      </Menu>
    </div>
  );
};

export default FadeMenu;
