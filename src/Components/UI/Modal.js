import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
const Overlay = (props) => {
  return <div className={styles.modal}>{props.orders}</div>;
};

const Backdop = (props) => {
  return (
    <div onClick={props.onClose} className={styles.backdrop}>
      <Overlay orders={props.children} />
    </div>
  );
};

const portalEl = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdop onClose={props.onClose} children={props.children} />,
        portalEl
      )}
      {/* {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalEl)} */}
    </React.Fragment>
  );
};
export default Modal;
