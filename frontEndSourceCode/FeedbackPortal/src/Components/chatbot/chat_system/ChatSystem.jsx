import React, { useState, useEffect } from "react";
import { ChatWrapper } from "../styles/chatbox.styled";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatSend from "./ChatSend";
import PopIcon from "./PopIcon";
import Chat_sound from "../../../assets/audios/game-sounds/Message-pop.mp3";
import axios from "axios";
import { baseUrls } from "../../../GlobalConfig/config";

const ChatSystem = ({ visitorAndPsArray }) => {

  const [messageHistory, setMessageHistory] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  useEffect(() => {
    if (visitorAndPsArray.length > 0) {
      const psData = []
      visitorAndPsArray.forEach(element => {
        // const isoDateTimeString = element.visitTime;

        // const dateTime = new Date(isoDateTimeString);

        // // Set the time zone to 'Asia/Kolkata' (Indian Standard Time)
        // const options = {
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric',
        //   hour: 'numeric',
        //   minute: 'numeric',
        //   second: 'numeric',
        //   timeZone: 'Asia/Kolkata'
        // };

        // const readableDateTime = new Intl.DateTimeFormat('en-US', options).format(dateTime);
        // console.log(readableDateTime);

        psData.push({
          isSenderBot: true,
          message: `You visited ${element.psName} on ${element.visitTime}. Please give your feedback in the form.`
        })
        document.getElementById("myForm").style.display = "block";
        setIsChatboxOpen(true)
      });
      setMessageHistory(messageHistory.concat(psData))
    }
  }, [visitorAndPsArray])

  // Unseen chats
  const [unseenChats, setUnseenChats] = useState(0);

  // Chat audio
  const [playNewMessageSound, setPlayNewMessageSound] = useState(false);

  const playSound = () => {
    const audio = new Audio(Chat_sound);
    audio.play();
  };


  // useEffect(() => {
  //   // Whenever a message is received
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev) => [...prev, JSON.parse(lastMessage.data)]);

  //     // To check unseen chats from others
  //     const newMessage = JSON.parse(lastMessage.data);
  //     if (!isChatboxOpen) {
  //       if (newMessage.from === localStorage.getItem("symbol")) {
  //         setUnseenChatsFromSender((prevCount) => prevCount + 1);
  //       } else {
  //         setUnseenChatsFromOthers((prevCount) => prevCount + 1);
  //         setPlayNewMessageSound(true);
  //       }
  //     }
  //   }
  // }, [lastMessage, setMessageHistory]);

  // Function to reset unseen chats to zero
  const markMessagesAsSeen = () => {
    setUnseenChats(0);
  };

  useEffect(() => {
    if (playNewMessageSound) {
      playSound();
      // Set the state back to false after playing the sound
      setPlayNewMessageSound(false);
    }
  }, [playNewMessageSound]);
  

  async function postToBot(message) {
    const arr = []
    try {
      arr.push(message[0])
      setMessageHistory(messageHistory.concat(arr));
      const submit = await axios({
        method: 'post',
        url: `${baseUrls.chatBotUrl}/chat`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "message" : message[0].message
        }

      });

      // console.log(submit.data.response);
      const arr2 = []
      arr2.push(message[0])
      arr2.push({
        isSenderBot: true,
        message: submit.data.response
      })

      // console.log(arr)

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

          <ChatBody messageHistory={messageHistory} />

          <div className="chat-send-wrapper">
            <ChatSend sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </ChatWrapper>
  );
};

export default ChatSystem;
