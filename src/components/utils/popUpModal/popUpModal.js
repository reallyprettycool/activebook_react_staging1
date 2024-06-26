import React from 'react';
import './popUpModal.css'; // Import CSS file for styling

/**
 * This component is a modal that displays a preview of the activity.
 * @param props - The props of the component
 * @returns {JSX.Element}
 * @constructor
 */

function PopUpModal(props) {

    // Function to close the modal
    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h5 className="modal-title">{props.title || 'preview'}</h5>
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

export default PopUpModal;
