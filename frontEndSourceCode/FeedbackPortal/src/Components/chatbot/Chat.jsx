import React from 'react'
import ChatSystem from "./chat_system/ChatSystem";

const Chat = ({visitorAndPsArray}) => {
  return (
    <div>
      <ChatSystem visitorAndPsArray={visitorAndPsArray}/>
    </div>
  )
}

export default Chat
