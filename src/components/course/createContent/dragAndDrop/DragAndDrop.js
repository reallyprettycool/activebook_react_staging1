import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableContainers from "./DroppableContainers";
import DraggableItem from "./DraggableItem";
import "../createContent.css"
import "./dragAndDrop.css";

class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableContainers: [
                {
                    id: 1,
                    title: 'Container'
                }
            ],
            draggableItems: [
                {
                    content: 'Item 1',
                    parentId: 1
                }
            ],
            isOrdered: false,
            newDraggable: {}
        };
    }

    updateContainerCount = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Retrieve new container count from the input
        const newContainerCount = parseInt(e.target.value);

        // Retrieve current container count from the state
        const { droppableContainers } = this.state;

        // If the new container count is greater than the current container count, add new containers
        if (newContainerCount > droppableContainers.length) {
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

            console.log("New containers added: ", newContainers);
        }

        // If the new container count is less than the current container count, remove containers
        if (newContainerCount < droppableContainers.length) {
            const removedContainers = droppableContainers.slice(newContainerCount);

            this.setState({
                droppableContainers: droppableContainers.slice(0, newContainerCount),
                draggableItems: this.state.draggableItems.filter((item) => {
                    return item.parentId <= newContainerCount;
                })
            });

            console.log("Removed containers: ", removedContainers);
        }
    };

    addDraggable = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Retrieve new draggable content and parent ID from the state
        const { newDraggable, draggableItems } = this.state;

        // Create new draggable item
        const newDraggableItem = {
            content: newDraggable.content,
            parentId: parseInt(newDraggable.parentId)
        };

        // Update draggableItems state with the new draggable item
        this.setState({
            draggableItems: [...draggableItems, newDraggableItem],
            newDraggable: { content: "", parentId: "" } // Reset newDraggable state
        });

        console.log("New draggable item added: ", newDraggableItem);
    };

    changeDroppableTitle = (e, droppableId) => {
        // Retrieve new droppable title from the input
        const newDroppableTitle = e.target.value;

        // Retrieve current droppable containers from the state
        const { droppableContainers } = this.state;

        // Find the index of the droppable container with the specified ID
        const droppableIndex = droppableContainers.findIndex((container) => {
            return container.id === droppableId;
        });

        // Create a new array of droppable containers with the updated title
        const updatedDroppableContainers = droppableContainers.map((container, index) => {
            if (index === droppableIndex) {
                return {
                    ...container,
                    title: newDroppableTitle
                };
            }

            return container;
        });

        // Update droppableContainers state with the new array of droppable containers
        this.setState({
            droppableContainers: updatedDroppableContainers
        });

        console.log("Droppable title updated: ", updatedDroppableContainers[droppableIndex]);

    }


    render() {
        return (
            <div className={'container-xs text-center'}>
                <h1 className={''}>Drag and Drop</h1>
                <DragDropContext onDragEnd={() => console.log("Dragging")}>
                    <div className="row w-100 dnd ml-sm-1 ml-xs-3">
                        {this.state.droppableContainers.map((container) => {
                            return (
                                <DroppableContainers
                                    className={'col-5 border droppable'}
                                    key={container.id}
                                    droppableId={container.id.toString()}
                                >
                                    <input
                                        className={'mb-auto droppable-title'}
                                        value={container.title}
                                        onChange={(e) => this.changeDroppableTitle(e, container.id)}
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
                    <div className={'row col-5 '}>
                        <label className={'m-1'}>Number of Containers:</label>
                        <input
                            className={'m-1'}
                            type="number" value={this.state.droppableContainers.length}
                               min="1" max="10" onChange={this.updateContainerCount}/>
                    </div>
                    <form className={'col-7 row'} action="" onSubmit={this.addDraggable}>
                        <div className="m-1">
                            <input
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
                        </div>
                        <div className="m-1">
                            <select
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
                        </div>
                        <div className="m-1">
                            <button className={'btn btn-primary'} type={'submit'}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default DragAndDrop;
