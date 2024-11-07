import React from "react";
import ReactDOM from "react-dom";
function Modal({isOpen,onClose,children}){
    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button onClick={onClose}>Kapat</button>
            </div>
        </div>,document.getElementById("modal-root")
    );
}
export default Modal;