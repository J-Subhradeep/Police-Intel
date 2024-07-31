import React, { useEffect } from "react";
// import img4 from "images/game_page/download.png";
import { ChatHeadWrapper } from "../styles/chatheader.styled";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
// import img2 from "images/game_page/close-icon-30.png";

const ChatHeader = ({ setIsChatboxOpen, isChatboxOpen }) => {
  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
    setIsChatboxOpen(false);
  };

  return (
    <div>
      <ChatHeadWrapper>
        <div className="strip">
          <div className="heading">
            <MessageIcon className="icon" />
            <h2 className="head-text">Helper Chatbot 🤖</h2>
          </div>
          <div className="close">
            {isChatboxOpen && (
              // <img src="close-icon-30.png" alt="" className="cancel" onClick={closeForm} />
              <CloseIcon className="cancel" onClick={closeForm} />
            )}
          </div>
        </div>
      </ChatHeadWrapper>
    </div>
  );
};

export default ChatHeader;
