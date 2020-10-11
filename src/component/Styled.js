import styled from "styled-components";

export const NameWrapper = styled.div`
  width: 90%;
  margin: auto;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      background: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 2px 4px rgba(55, 55, 55, 0.05);
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      position: relative;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        width: 100%;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: left;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      &:focus-within {
        &:before {
          transform: scaleX(1);
        }
      }
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 6px rgba(55, 55, 55, 0.05);
        > button {
          transform: translateX(0);
          opacity: 1;
        }
      }
      &:not(:last-child) {
        margin-bottom: 12px;
      }
      .input-wrapper {
        height: 80%;
        flex-grow: 1;
        position: relative;
        > input {
          width: 100%;
          height: 100%;
          background: transparent;
          outline: none;
          border: 0;
          font-size: 16px;
          font-weight: bold;
          color: currentColor;
          position: relative;
        }
      }
      > button {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50px;
        background: #f50057;
        outline: none;
        border: 0;
        color: #fff;
        transform: translateX(100%);
        opacity: 0;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
`;
