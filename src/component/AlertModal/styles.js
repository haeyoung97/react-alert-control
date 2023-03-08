import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

export const ModalContent = styled.div`
  position: fixed;
  min-width: 600px;
  top: calc(100vh - 50%);
  left: calc(100vw - 50%);
  transform: translate(-50%, -50%);
  z-index: 99;
  height: fit-content;
  overflow-x: hidden;
  outline: 0;
  background-color: white;
  padding: 40px;

  @media all and (max-width: 1200px) {
    min-width: calc(100% - 200px);
  }
`;
