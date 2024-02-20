import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableContainers from "./DroppableContainers";
import DraggableItem from "./DraggableItem";
import "../createContent.css"
import "./dragAndDrop.css";
import ToggleSwitch from "../../../utils/toggleSwitch/ToggleSwitch";
import PreviewActivityModal from "../../../utils/previewActivty/PreviewActivityModal";
import DragAndDropActivity from "../../../activities/created/dragAndDrop/DragAndDropActivity";

class DragAndDropCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableContainers: [
                {
                    id: 1,
                    title: "Container 1"
                }
            ],
            draggableItems: [],
            newDraggable: {
                content: "",
                parentId: "0"
            },
            isOrdered: false,
            displayPreview: true,
            activityTitle: ""
        }
    }

    updateContainerCount = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const { droppableContainers } = this.state; // Retrieve current droppableContainers state
        const newContainerCount = parseInt(e.target.value); // Retrieve new container count from the input field
        if (newContainerCount > droppableContainers.length) { // If the new container count is greater than the current container count, add containers
            const newContainers = [];
            for (let i = droppableContainers.length + 1; i <= newContainerCount; i++) {
                newContainers.push({
                    id: i,
                    title: `Container ${i}`
                });
            }
            this.setState({
                droppableContainers: [...droppableContainers, ...newContainers]
            });
        }else{
            // remove droppables associated with deleted container then delete the container
            const newDroppableContainers = droppableContainers.filter((container) => container.id <= newContainerCount);
            const newDraggableItems = this.state.draggableItems.filter((item) => item.parentId <= newContainerCount);
            this.setState({
                droppableContainers: newDroppableContainers,
                draggableItems: newDraggableItems
            });
        }
    };

    addDraggable = (content, parentId) => {
        // Check if both content and parentId are provided
        if (content && parentId) {
            const newDraggableItem = {
                content: content,
                parentId: parentId
            };

            // Update draggableItems state with the new draggable item
            this.setState(prevState => ({
                draggableItems: [...prevState.draggableItems, newDraggableItem],
            }));

            console.log("New draggable item added: ", newDraggableItem);
        } else {
            const error = "Content and parentId are required";
            // do an alert
            alert(error);
            console.log(error);
        }
    };

    // Used to update the title of the droppable container
    setDroppableTitle = (title, droppableId) => {
        this.setState({
            droppableContainers: this.state.droppableContainers.map((container) => {
                if (container.id === parseInt(droppableId)) {
                    container.title = title;
                }

                return container;
            })
        });
    }

    displayPreview = () => {
        this.setState({
            displayPreview: !this.state.displayPreview
        });
        console.log(this.state.displayPreview)
    }

    render() {
        return (
            <div className={'container-xs text-center'}>
                <div className="row w-100 ml-sm-1  ml-xs-3">
                    <input
                        className={'col-12 h-100 border-0 h2 text-center'}
                        type="text"
                        value={this.state.activityTitle}
                        placeholder={'Activity Title'}
                        onChange={(e) => this.setState({activityTitle: e.target.value})}
                    />
                </div>
                <DragDropContext onDragEnd={() => console.log("Dragging")}>
                    <div className="row w-100 ml-sm-1 ml-xs-3 dnd">
                        {this.state.droppableContainers.map((container) => {
                            return (
                                <DroppableContainers
                                    className={'col-md-5 border rounded p-1 droppable'}
                                    key={container.id}
                                    droppableId={container.id.toString()}
                                    container={container}
                                >
                                    <input
                                        className={'mb-auto droppable-title'}
                                        value={container.title}
                                        onChange={(e) => this.setDroppableTitle(e.target.value, container.id)}
                                    />
                                    {this.state.draggableItems.map((item, index) => {
                                        if (item.parentId === container.id) {
                                            return (
                                                <DraggableItem
                                                    className={'row border border-dark draggable'}
                                                    key={index}
                                                    draggableId={index.toString()}
                                                    index={index}
                                                >
                                                    {item.content}
                                                </DraggableItem>
                                            );
                                        }
                                    })}
                                </DroppableContainers>
                            );
                        })}
                    </div>
                </DragDropContext>
                <div className="row w-100 ml-sm-1">
                    <div className={'col-md-2 m-1'}>
                        <div className="row">
                            <label className={'col'}>Number of Categories:</label>
                            <input
                                className={'col'}
                                type="number" value={this.state.droppableContainers.length}
                                min="1" max="10" onChange={this.updateContainerCount}/>
                        </div>
                    </div>
                    <div className="col-md-2 m-1">
                        Is Ordered:
                        <ToggleSwitch
                            value={this.state.isOrdered}
                            onChange={(value)=>{ this.setState({isOrdered: value})}}
                        />
                    </div>
                    <form className={'col-md'} action="" onSubmit={this.addDraggable}>
                        <div className="row justify-content-center m-2">
                        <input
                                className={'col-md-4 mr-1'}
                                type="text"
                                value={this.state.newDraggable.content || ""} // Ensure it's a string or provide a fallback value
                                placeholder="Add Item"
                                onChange={(e) => this.setState({
                                    newDraggable: {
                                        ...this.state.newDraggable,
                                        content: e.target.value
                                    }
                                })}
                            />
                            <select
                                className={'col-md-4 mt-xs-1'}
                                value={this.state.newDraggable.parentId || '0'} // Ensure it's a string or provide a fallback value
                                onChange={(e) => this.setState({
                                    newDraggable: {
                                        ...this.state.newDraggable,
                                        parentId: e.target.value
                                    }
                                })}
                            >
                                <option value='0' disabled={true} hidden={true}>Select Container</option>
                                {this.state.droppableContainers.map((container) => {
                                    return (
                                        <option key={container.id} value={container.id}>
                                            {container.title}
                                        </option>
                                    );
                                })}
                            </select>
                            <button className={'btn btn-primary ml-1 mt-xs-1 col-md-2'} type={'submit'}>
                                Add
                            </button>
                        </div>
                    </form>
                    <button className="btn btn-primary m-1 col-md-1" onClick={this.displayPreview}>
                        Preview
                    </button>
                    <button className="btn btn-primary m-1 col-md-1">
                        Save
                    </button>
                </div>
                {
                    this.state.displayPreview &&
                    <PreviewActivityModal onClose={this.displayPreview}>
                        <DragAndDropActivity
                            droppableContainers={this.state.droppableContainers}
                            draggableItems={this.state.draggableItems}
                            isOrdered={this.state.isOrdered}
                        />
                    </PreviewActivityModal>
                }
            </div>
        )
    }
}

export default DragAndDropCreation;
