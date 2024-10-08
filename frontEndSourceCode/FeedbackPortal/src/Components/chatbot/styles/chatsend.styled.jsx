import styled from '@emotion/styled'

export const ChatSendWrapper = styled.div`
  display: grid;
  grid-template-columns: 3;
  align-items: center;
  /* background-color: #f1f1f1; */
  /* background-color: #c4c7c7e4; */
  /* padding-bottom: 0.3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem; */
  border-radius: 2rem;
  /* .send {
    border-radius: 100%;
    height: 3rem;
  } */

  .lower-strip {
    /* background-color: #53525234; */
    /* background-color: #e3ecf5; */
    background-color: #d6d7defc;
    /* box-shadow: 1px 1px 5px black; */
    /* width:100%; */
    
    height: 60px;
    border-radius: 0.5rem;
    border-top-right-radius:0rem;
    border-top-left-radius:0rem;
    display: flex;
    align-content: center;
    gap: 0.2rem;

    /* .btn-container {
      display: flex;
      align-items: center;
      color: #000;
      padding-bottom: 0.2rem; */

    /* gap:1rem; */
    /* .emoji {
        position: relative;
        padding-left: 0.5rem;
        padding-top:0.2rem;
        .smile {
          font-size: 1.5rem;
          color: black;
          cursor: pointer;
          
        }
        .emoji-picker {
          position: absolute;
          top: -470px;
          left:-120px;
          z-index: 1;
          background-color: #f1f1f1;
          box-shadow: 1px 1px 5px black;
          border-radius: 0.5rem;
          padding: 0.5rem;

        }
      } */
  }

  .form-container {
    margin-top: 0.4rem;
    .msg {
      width: 12rem;
      height: 70%;
      background-color: white;
      color: black;
      border: none;
      border-radius: 0.5rem;
      margin-top: 0.3rem;
      resize: none;
      margin-left: 0.6rem;
      margin-right: 0.5rem;
      padding: 0.7rem;
      font-family: sans-serif;
      font-size: 12px;
      &::selection {
        /* background-color: #9186f3; */
        background-color: #7bb8ea;
        overflow: hidden;
      }

      &:focus {
        outline: none;
        overflow: hidden;
      }
    }
    
    .button {
      padding: 0.4rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      /* background-color:#9e5eff; */
      /* background-color: #eaf0f7; */
      background-color: #2196f3;
      /* color:#260483; */
      color: white;
      box-shadow: 1px 1px 5px black;
      /* background-color: #9a86f3; */
      /* background-color: #260483; */
      /* color:white; */
      align-items: center;
      border: none;
      margin-top: 5px;
      
    }
    
  }
`;
