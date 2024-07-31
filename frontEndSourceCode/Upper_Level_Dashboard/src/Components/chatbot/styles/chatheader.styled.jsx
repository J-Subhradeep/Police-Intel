import styled from '@emotion/styled'

export const ChatHeadWrapper = styled.div`
  position: relative;
  z-index: 1;
  .strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #d6d7defc;
    /* box-shadow: 0px 1px 8px; */
    /* border-top-radius: 0.6rem; */
    border-top-right-radius: 0.6rem;
    border-top-left-radius: 0.6rem;
    height: 2.8rem;

    .heading {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        font-size: 22px;
        /* color:white; */
        /* padding-top: 0rem; */
      }

      .head-text {
        font-family: sans-serif;
        font-size: 17px;
        /* color:white; */
      }
    }

    .cancel {
      float: right;
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      cursor: pointer;
      width: 1.3rem;
      height: 1.3rem;
      transition: background-color 0.3s; /* Add smooth transition effect */

      &:hover {
        background-color: #a3a3a3;
        border-radius: 50%; 
      }
    }
  }
`;
