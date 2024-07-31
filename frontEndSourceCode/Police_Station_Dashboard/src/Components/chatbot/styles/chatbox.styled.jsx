import styled from '@emotion/styled'

export const ChatWrapper = styled.div`

* {
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
}


.chat-popup {
    display: none;
    position: fixed;
    bottom: 0;
    right: 2px;
    /* border: 3px solid ; */
    border-radius: 1rem;
    z-index: 100;
    height: 450px;
    width: 300px; 
    
    /* background-color:  #f8f6f8; */
    background-color: #f1f3f5;
    /* background-color: #e3ecf5; */
    /* background-color: white; */

}

/* Hide scrollbar for Chrome, Safari and Opera */
/* .messages::-webkit-scrollbar {
    display: none;
} */

/* Hide scrollbar for IE, Edge and Firefox */
.messages {
  /* -ms-overflow-style: none;  
  scrollbar-width: none;   */
  padding:0.2rem;
  height:78%;
  overflow: auto;

  @media only screen and (max-height: 410px) and (min-height:365px) {
    height: 76%;
    }
  @media only screen and (max-height: 364px) and (min-height:330px) {
    height: 74%;
    }
  @media only screen and (max-height: 329px) and (min-height:280px) {
    height: 70%;
    }
  @media only screen and (max-height: 280px)  {
    height: 65%;
    }
  
}

.messages::-webkit-scrollbar {
    width: 8px;
}
 
.messages::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
.messages::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

.btn {
    padding: 0;
    border-radius: 100%;
    border: none;
    cursor: pointer;
    width: fit-content;
    height:fit-content;
     /* margin-bottom: 15px; */
    float:right;
}


.btn:hover
{
    opacity: 1;
}

.chat-send-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    
  }
  
@media only screen and (max-height: 550px) {
    .chat-popup{
        height:100%;
          }
    .gyCPYO {
    position: absolute;
    bottom: 0;
            }
  }

  @media only screen and (max-width: 280px)  {
    /* Adjust the width for Galaxy Fold folded version */
    .chat-popup {
      width: 100%;
    }
  }
  
`
