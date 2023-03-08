import React from "react";
import ReactDOM from "react-dom";
import { ModalContent, ModalOverlay } from "./styles";

const index = (props) => {
  const { isOpen, onClose, title } = props;
  if (isOpen) {
    return ReactDOM.createPortal(
      <>
        <ModalOverlay />
        <ModalContent aria-modal aria-hidden tabIndex={-1} role="dialog">
          <h2>{title}</h2>
          <button onClick={() => onClose()}>Close</button>
        </ModalContent>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default index;
