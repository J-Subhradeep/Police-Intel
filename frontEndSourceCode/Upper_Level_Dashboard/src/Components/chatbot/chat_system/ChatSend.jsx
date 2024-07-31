import React, { useState } from "react";
import { ChatSendWrapper } from "../styles/chatsend.styled";
import MicIcon from '@mui/icons-material/Mic';
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Spttxt from "../tts_stt/Spttxt";

const ChatSend = ({ sendMessage }) => {
  const [messageInput, setMessageInput] = useState("");

  const handleInputChange = (e) => {
      setMessageInput(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(messageInput != "") {
    const message = [{
      isSenderBot: false,
      message: messageInput
    }]
    sendMessage(message)
    setMessageInput("")
  }
  }

  const SpeechToText = (message) => {
    setMessageInput(message);
  }

  return (
    <div className="lower-strip-size">
      <ChatSendWrapper>
        <div className="lower-strip">
          <form className="form-container" onSubmit={handleSendMessage} noValidate>
            <textarea
              placeholder="Type message.."
              className="msg"
              value={messageInput}
              onChange={handleInputChange}
              required
            />

            {messageInput.trim() !== "" ?
              (<button type="submit" className="btn button">
                <SendOutlinedIcon />
              </button>) : (<Spttxt SpeechToText={SpeechToText} />)}
          </form>
        </div>
      </ChatSendWrapper>
    </div>
  );
};

export default ChatSend;
