import React from "react";
import { Droppable } from "react-beautiful-dnd";


function DroppableContainers({ container, className, children, ...props}) {
    return (
        <Droppable droppableId={props.droppableId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={className}
                >
                    {/*display children*/}
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default DroppableContainers;
