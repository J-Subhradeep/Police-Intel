import React, { useState, useEffect } from 'react'
import { PopIconWrapper } from "../styles/popicon.styled";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import roboblue from "../../../assets/images/game_page/roboblue.png";

const PopIcon = ({ unseenChats, onClick, isChatboxOpen, setIsChatboxOpen }) => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
          right: -73,
          top: -65,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: "0 4px",
        },
      }));
    
      const openForm = () => {
        document.getElementById("myForm").style.display = "block";
        setIsChatboxOpen(true);
        onClick();
      };
    
  return (
    <div
      className="whole"
      style={{ position: "fixed", bottom: "15px", right: "15px", zIndex: 10 }}
    >
      <PopIconWrapper>
        <div className="icon">
          {unseenChats > 0 && !isChatboxOpen && (
            <StyledBadge
              badgeContent={unseenChats}
              color="secondary"
              className="badge"
            ></StyledBadge>
          )}
          <img
            src={roboblue}
            alt="logo"
            className=" transition-3 chatButton"
            onClick={openForm}
          />

          <div className="transition-3 hello">Let's Chat 🤙</div>
        </div>
      </PopIconWrapper>
    </div>                           
  )
}

export default PopIcon
