import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainers from '../../../course/createContent/dragAndDrop/DroppableContainers';
import DraggableItem from '../../../course/createContent/dragAndDrop/DraggableItem';

class DragAndDropActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableContainers: props.droppableContainers || [],
            draggableItems: props.draggableItems || [],
            isOrdered: props.isOrdered || false
        };
    }

    onDragEnd = () => {
        console.log('dragging');
    };

    checkAnswers = (isOrdered) => {
        // Your logic for checking answers
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                test
                <div className="container-fluid">
                    {this.state.droppableContainers.map((container, index) => {
                        return (
                            <DroppableContainers
                                className={'col-md-5 border rounded p-1 droppable'}
                                key={container.id}
                                droppableId={container.id.toString()}
                                container={container}
                            >
                                <h3>{container.title}</h3>
                                {container.draggables && container.draggables.map((draggable, index) => {
                                    return (
                                        <DraggableItem
                                            className={'row border border-dark draggable'}
                                            key={index}
                                            draggableId={draggable.id.toString()}
                                            index={index}
                                        >
                                            {draggable.content}
                                        </DraggableItem>
                                    );
                                })}
                            </DroppableContainers>
                        );
                    })}
                    <DroppableContainers className={'col-md-5 border rounded p-1 droppable'} droppableId="answers">
                        <h3>Answers</h3>
                        {this.state.draggableItems && this.state.draggableItems.map((draggable, index) => {
                            return (
                                <DraggableItem
                                    className={'row border border-dark draggable'}
                                    key={index}
                                    draggableId={draggable.id.toString()}
                                    index={index}
                                >
                                    {draggable.content}
                                </DraggableItem>
                            );
                        })}
                    </DroppableContainers>
                </div>
            </DragDropContext>
        );
    }
}

export default DragAndDropActivity;
