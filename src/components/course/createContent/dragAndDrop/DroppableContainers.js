import React from "react";
import {Droppable} from "react-beautiful-dnd";


function DroppableContainers({ container, className, placeholder,children, ...props}) {

    return (
        <Droppable droppableId={props.droppableId} type={'answer'} direction="vertical">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className = {className}>
                    <div  className={'d-flex flex-column w-100 h-100 justify-content-center align-items-center'}>
                        {/*display children*/}
                        {children}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}

export default DroppableContainers;
