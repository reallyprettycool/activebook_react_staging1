import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableContainers from "./DroppableContainers";
import DraggableItem from "./DraggableItem";
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
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 10) {
            const newContainers = Array.from({ length: value }, (_, index) => ({
                id: index + 1,
                title: `Container`
            }));
            this.setState({ droppableContainers: newContainers });
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


    render() {
        return (
            <div className={'fill-area'}>
                <h1>Drag and Drop</h1>
                <div className={'input-group '}>
                    <label className={'mr-5'}>Number of Containers:</label>
                    <input type="number"
                           value={this.state.droppableContainers.length}
                           min="1" max="10"
                           onChange={(e) => this.updateContainerCount(e)}
                    />
                </div>
                <DragDropContext onDragEnd={() => console.log("Dragging")}>
                    <div className="dnd">
                        {this.state.droppableContainers.map((container) => {
                            return (
                                <DroppableContainers
                                    className={'dnd-container'}
                                    key={container.id}
                                    droppableId={container.id.toString()}
                                    title={container.title}>
                                    {this.state.draggableItems.map((item, index) => {
                                        if (item.parentId === container.id) {
                                            return (
                                                <DraggableItem
                                                    key={index}
                                                    draggableId={index.toString()}
                                                    index={index}
                                                    className={'dnd-item'}
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
                <form action="" onSubmit={this.addDraggable}>
                    <div className="draggable-creation">
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
                        <select
                            value={this.state.newDraggable.parentId || '0'} // Ensure it's a string or provide a fallback value
                            onChange={(e) => this.setState({ newDraggable: { ...this.state.newDraggable, parentId: e.target.value } })}
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
                        <button className={'btn btn-primary'} type={'submit'}>Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DragAndDrop;
