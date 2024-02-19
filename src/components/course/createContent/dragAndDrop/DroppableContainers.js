import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";

class DroppableContainers extends Component {
    render() {
        const { className } = this.props;

        return (
            <Droppable droppableId={this.props.droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={className}
                    >
                        <h3 className={'mb-auto'}>{this.props.title}</h3>
                        {this.props.children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export default DroppableContainers;
