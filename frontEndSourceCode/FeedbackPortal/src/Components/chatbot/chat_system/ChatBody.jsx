import React, { useRef, useEffect, useState } from "react";
import { ChatBodyWrapper } from "../styles/chatbody.styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import robocop from "../../../assets/images/game_page/robocop.png";


const ChatBody = ({ messageHistory }) => {
  const chatBoxRef = useRef(null);

  // Scroll to the bottom of the chat box
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  return (
    <div className="messages" ref={chatBoxRef} id="scrollChat">
      <ChatBodyWrapper>

        <div className="chat-messages">
          {messageHistory.map((data, index) => {

            return (
              <div>
                {!data.isSenderBot ?
                  <div className="message sender">
                    <div className="content">
                      <p>{data.message}</p>
                    </div>
                    <AccountCircleIcon class="sender-icon" />
                  </div> :
                  <div className="message">
                    <img src={robocop} alt="logo" className="robocop" />
                    <div className="content">
                      <p>{data.message}</p>
                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>

      </ChatBodyWrapper>
    </div>
  );
};

export default ChatBody;
