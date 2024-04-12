import styled from '@emotion/styled'

export const PopIconWrapper = styled.div`
  .transition-3 {
    transition: all 0.33s ease;
    -webkit-transition: all 0.33s ease;
    -moz-transition: all 0.33s ease;
  }

  .css-kmh32b-MuiBadge-root {
    right: 10px;
    bottom: -10px;
  }

  .hello {
    // Position
    position: absolute;

    left: calc(-70%);
    top: calc(30% - 28px);
    // Layering
    z-index: 10000;
    box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.33);
    // Border
    padding: 10px 10px 10px 14px;
    border-radius: 24px;
    // Color
    /* background-color: #e3c5f7; */
    background-color: white;
    font-weight: bold;
    font-size: 12px;
    opacity: 0;
    color: black;
    cursor: pointer;
  }

  .chatButton {
    cursor: pointer;
    color: white;
    padding: 0;
    border: none;
    opacity: 0.9;
    width: 70px;
    height: 70px;
  }
  .chatButton:hover,
  .icon .chatButton:hover ~ .hello {
    opacity: 1;
  }

  /* @media only screen and (max-height: 550px) {
    .chatButton {
      width: 90px;
      height: 80px;
    }
  } */

  @media only screen and (min-width: 426px) and (max-width: 768px) {
    .chatButton {
      width: 70px;
      height: 70px;
    }
    .hello {
      left: calc(-100%);
      padding: 10px 10px 10px 12px;
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 426px) {
    .chatButton {
      width: 52px;
      height: 50px;
    }
    .hello {
      left: calc(-70%);
      top: calc(30% - 24px);
      font-size: 10px;
      padding: 5px 5px 5px 8px;
    }
  }
`;
