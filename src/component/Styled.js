import styled from "styled-components";

export const NameWrapper = styled.div`
  width: 90%;
  margin: auto;
  @media screen and (max-width: 400px) {
    width: 95%;
  }
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
        //transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(55, 55, 55, 0.15);
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
  .add-btn {
    width: 100%;
    margin: 20px auto;
    height: 50px;
  }
`;

export const ReceiptWrapper = styled.div`
  width: 90%;
  background: #fff;
  margin: 40px auto;
  padding: 20px 0;
  position: relative;
  @media screen and (max-width: 400px) {
    width: 95%;
    padding: 12px 0;
  }
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    width: 100%;
    height: 20px;
    background-image: 
        /* Bottom jagged */ linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 50%
      ),
      linear-gradient(
        -45deg,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 50%
      );
    background-position:
    /* Top jagged */ top center, top center,
      /* Bottom jagged */ bottom center, bottom center;
    background-size:
    /* Top + bottom jagged */ 0.75rem 0.75rem,
      0.75rem 0.75rem, 0.75rem 0.75rem, 0.75rem 0.75rem;
    background-repeat: repeat-x;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    width: 100%;
    height: 20px;
    background-image: /* Top jagged */ linear-gradient(
        135deg,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 50%
      ),
      linear-gradient(
        -135deg,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 50%
      );
    background-position:
    /* Top jagged */ top center, top center,
      /* Bottom jagged */ bottom center, bottom center;
    background-size:
    /* Top + bottom jagged */ 0.75rem 0.75rem,
      0.75rem 0.75rem, 0.75rem 0.75rem, 0.75rem 0.75rem;
    background-repeat: repeat-x;
  }
  .title {
    margin: 0 auto 20px;
    text-align: center;
  }
  table {
    padding: 10px 20px;
    width: 100%;
    font-family: "Inconsolata", monospace;
    thead {
      tr {
        th {
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
          text-align: left;
          padding: 10px 0;
          &.shared {
            text-align: right;
          }
          &.center {
            text-align: center;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: left;
          vertical-align: text-top;
          position: relative;
          padding-top: 10px;
          width: 33%;
          &.shared {
            text-align: right;
          }
          &.center {
            text-align: center;
          }
        }
      }
    }
    tfoot {
      tr {
        td {
          border-top: 1px dashed #000;
          text-align: right;
          font-weight: bold;
        }
      }
    }
    tr {
      height: 30px;
      &.shared-row {
        td {
          padding-top: 4px;
          padding-bottom: 20px;
        }
      }
    }
    input {
      border: 0;
      outline: none;
      background: transparent;
      border-bottom: 1px dashed #ccc;
      height: 30px;
      font-size: 16px;
      font-weight: bold;
      font-family: "Inconsolata", monospace;
      width: 100%;
      &:focus {
        border-color: #333;
      }
    }
    .amount {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
    }
    .total {
      margin-left: auto;
      font-weight: bold;
      @media screen and (max-width: 400px) {
        white-space: pre;
      }
    }
    .delete {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 30px;
      width: 30px;
      right: 0;
      background: #f50057;
      border: 0;
      outline: none;
      cursor: pointer;
      color: #fff;
    }
    .add-new-item {
      cursor: pointer;
      width: 100%;
      background: #ececec;
      height: 40px;
      margin-bottom: 20px;
      outline: none;
      border: 0;
      font-family: "Inconsolata", monospace;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      > svg {
        margin-right: 4px;
      }
      &:hover {
        background: #ccc;
      }
    }
    .share-list {
      display: flex;
      align-items: center;
      flex-flow: row wrap;
      .share-item {
        cursor: pointer;
        height: 20px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid currentColor;
        border-radius: 20px;
        padding: 0 12px;
        margin-bottom: 4px;
        position: relative;
        &:not(:last-child) {
          margin-right: 10px;
        }
        &.disabled {
          opacity: 0.2;
        }
        &:before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 20px;
          background: currentColor;
          opacity: 0.1;
        }
      }
    }
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;
