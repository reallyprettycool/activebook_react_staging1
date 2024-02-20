import React from 'react';
import './PreviewActivityModal.css'; // Import CSS file for styling

function PreviewActivityModal(props) {
    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h5 className="modal-title">Preview</h5>
                    <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default PreviewActivityModal;
