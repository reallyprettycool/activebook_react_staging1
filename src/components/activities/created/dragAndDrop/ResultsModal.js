import React from 'react';

function ResultsModal(props) {

    const wrapperStyle = {
        height: "30%",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "10px",
    }

    const headerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "10%",
        backgroundColor: "lightgray",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
    }

    return (
        <>
            <div className="modal-overlay">
                <div style={wrapperStyle}>
                    <div style={headerStyle}>
                        <div className="col-11">
                            <h5 className="modal-title">Results</h5>
                        </div>
                        <div className="col-1">
                            <button type="button" aria-label="Close" onClick={props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultsModal;