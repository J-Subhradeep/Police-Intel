import React, { useState, useEffect } from "react";
import { ChatWrapper } from "../styles/chatbox.styled";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatSend from "./ChatSend";
import PopIcon from "./PopIcon";
import Chat_sound from "../../../assets/audios/game-sounds/Message-pop.mp3";
import axios from "axios";
import { baseUrls } from "../../../GlobalConfig/config";

const ChatSystem = ({ }) => {

  const [messageHistory, setMessageHistory] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const autoMessage = [
      {
        isSenderBot: true,
        message: "Hello! What can I do for you?"
      }
    ]
      setMessageHistory(messageHistory.concat(autoMessage))
  }, [])

  // Unseen chats
  const [unseenChats, setUnseenChats] = useState(0);

  // Chat audio
  const [playNewMessageSound, setPlayNewMessageSound] = useState(false);

  const playSound = () => {
    const audio = new Audio(Chat_sound);
    audio.play();
  };

  const markMessagesAsSeen = () => {
    setUnseenChats(0);
  };

  useEffect(() => {
    if (playNewMessageSound) {
      playSound();
      setPlayNewMessageSound(false);
    }
  }, [playNewMessageSound]);
  

  async function postToBot(message) {
    setIsLoading(true)
    let arr = []
    try {
      arr.push(message[0])
      setMessageHistory(messageHistory.concat(arr));
      const submit = await axios({
        method: 'post',
        url: baseUrls.chatbotUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "text" : message[0].message
        }

      });

      // console.log(submit.data.Response);
      let arr2 = []
      arr2.push(message[0])
      arr2.push({
        isSenderBot: true,
        message: submit.data.Response
      })

      // console.log(arr)
      setIsLoading(false)
      setMessageHistory(messageHistory.concat(arr2));

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const sendMessage = (message) => {
    // setMessageHistory(messageHistory.concat(message));
    // console.log(message.message)
    postToBot(message)
  }


  return (
    <ChatWrapper>
      <div className="container">
        <PopIcon
          // unseenChats={
          //   localStorage.getItem("symbol") === "sender"
          //     ? unseenChatsFromSender
          //     : unseenChatsFromOthers
          // }
          onClick={markMessagesAsSeen}
          setIsChatboxOpen={setIsChatboxOpen}
          isChatboxOpen={isChatboxOpen}
        />

        <div className="chat-popup" id="myForm">
          <ChatHeader
            setIsChatboxOpen={setIsChatboxOpen}
            isChatboxOpen={isChatboxOpen}
          />

          <ChatBody messageHistory={messageHistory} isLoading={isLoading} />

          <div className="chat-send-wrapper">
            <ChatSend sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </ChatWrapper>
  );
};

export default ChatSystem;
