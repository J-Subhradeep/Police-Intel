import styled from '@emotion/styled'

export const ChatBodyWrapper = styled.div`
  
  gap: 0.1rem;
  padding-top: 0.3rem;
  padding-left: 3px;
  .chat-messages {
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow: auto;
    margin-bottom: 15px;

    .message {
      display: flex;
      align-items: center;
      gap:2px;

      .robocop{
        width:35px;
        height:35px;
        margin-right:3px 
      }

      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1px 12px;
        font-size: 14px;
        font-family: sans-serif;
        font-weight: 500;
        border-radius: 1.5rem;
        color: black;
        background-color: white;
        box-shadow: 1px 1px 2px;
      }

      .message::after {
        content: "";
        clear: both;
        display: table;
      }
    }

    .sender {
      justify-content: flex-end;
      .content {
        background-color: #2196f3;
        box-shadow: 1px 1px 2px black;
        color: white;
      }
      .sender-icon{
        width:30px;
        height:30px;
      }
    }
  }
`;
