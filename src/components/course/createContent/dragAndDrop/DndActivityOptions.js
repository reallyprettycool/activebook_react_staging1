import React from 'react';
import ToggleSwitch from "../../../utils/toggleSwitch/ToggleSwitch";
import DroppableContainers from "./DroppableContainers";
import DraggableItem from "./DraggableItem";
import EditableInput from "../../../utils/editableInput/EditableInput";

const DndActivityOptions = (props) => {
    const {state, setState} = props;
    const {droppableContainers, newDraggable, isOrdered} = state;

    // Ensures the draggable item does not already exist
    const onSaveNewDraggable = (value) => {
        const draggableExists = droppableContainers.some(
            container => container.draggableItems.some(draggable => draggable.content === value)
        );
        if(!draggableExists) {
            setState({newDraggable: {content: value}});
        }else{
            alert('Draggable already exists!');
        }
    }

    const setExtraAnswers = (value) => {
        if(state.hasExtraAnswers && !value) {
            setState({hasExtraAnswers: value});
            setState({extraAnswers: []});
        }else{
            setState({hasExtraAnswers: value});
        }
    }

    return (
        <div className="row ml-sm-1 justify-content-center align-items-center">
            <div className="col-lg-2 m-1">
                <div className="row d-flex flex-row justify-content-center align-items-center">
                    <div className="col border-top mt-2">
                        <label>Ordered Answers:</label>
                        <ToggleSwitch
                            value={isOrdered}
                            onChange={(value) => {
                                setState({isOrdered: value});
                            }}
                        />
                    </div>
                    <div className="col border-top mt-2">
                        <label>Extra Answers:</label>
                        <ToggleSwitch value={state.hasExtraAnswers}
                            onChange={(value) => {
                                setExtraAnswers(value);
                            }}/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 d-flex flex-column">
                <div className="row justify-content-around align-items-center">
                    <div className="col-5 d-flex flex-column justify-content-center align-items-center border  rounded">
                        <p>Double click to edit:</p>
                        <DroppableContainers
                            droppableId={'New'}
                            container={{id: "New", title: "New"}}
                        >
                            <DraggableItem
                                className={'border border-dark draggable'}
                                draggableId={newDraggable.content || "New Draggable"}
                                index={0}
                            >
                                <EditableInput
                                    placeholder={'New Draggable'}
                                    value={newDraggable.content}
                                    onSave={(value) => onSaveNewDraggable(value)}
                                />
                            </DraggableItem>

                        </DroppableContainers>
                    </div>
                    <div className="col-5 d-flex flex-column justify-content-center align-items-center">
                        <DroppableContainers
                            className={'trash-bin'}
                            droppableId={'trash'}
                            container={{id: 'trash', title: "trash"}}>
                            <p className="h3 ml-3 mr-3">
                                Remove Draggable
                            </p>
                        </DroppableContainers>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DndActivityOptions;