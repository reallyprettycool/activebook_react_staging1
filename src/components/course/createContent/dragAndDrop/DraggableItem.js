import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

class DraggableItem extends Component {
    render() {
        const { draggableId, index, className } = this.props;

        return (
            <Draggable draggableId={draggableId} index={index}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         className={className} // Apply the className prop here
                    >
                        {this.props.children}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default DraggableItem;
