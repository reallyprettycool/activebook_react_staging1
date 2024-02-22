import './DragAndDropActivity.css';
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
            isOrdered: props.isOrdered || false,
            activityTitle: props.activityTitle || 'Drag and Drop Activity',
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
                <div className="container-fluid">
                    <div className="row border-bottom mb-3 justify-content-center align-items-center">
                        <h2 >{this.state.activityTitle}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row justify-content-center align-items-center">
                                {this.state.droppableContainers.map((container, index) => {
                                    return (
                                        <DroppableContainers
                                            className={'col-md-3 border border-dark rounded p-2 droppable'}
                                            key={container.id}
                                            droppableId={container.id.toString()}
                                            container={container}
                                        >
                                            <h3 className={'mb-auto droppable-title'} >{container.title}</h3>
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
                            </div>
                        </div>
                        <div className="col-md-2 ml-auto">
                            <DroppableContainers className={'border rounded p-1 answer-container'} droppableId="answers">
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
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row justify-content-center align-items-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.checkAnswers(this.state.isOrdered)}
                                >
                                    Check Answers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}

export default DragAndDropActivity;
