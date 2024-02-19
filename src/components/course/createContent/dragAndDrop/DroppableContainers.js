import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import "./dragAndDrop.css";

class DroppableContainers extends Component {
    render() {
        const { className } = this.props;

        return (
            <Droppable droppableId={this.props.droppableId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={className}
                    >
                        {this.props.children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export default DroppableContainers;
