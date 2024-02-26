import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableContainers from "./DroppableContainers";
import DraggableItem from "./DraggableItem";
import PreviewActivityModal from "../../../utils/previewActivty/PreviewActivityModal";
import DragAndDropActivity from "../../../activities/created/dragAndDrop/DragAndDropActivity";
import "../../../activities/created/dragAndDrop/DragAndDropActivity.css";
import DndActivityOptions from "./DndActivityOptions";
import EditableInput from "../../../utils/editableInput/EditableInput";

class DragAndDropCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableContainers: [{
                id: 1,
                title: "",
                draggableItems: []
            }],
            newDraggable: {
                isEditable: false,
                content: "",
            },
            extraAnswers: [],
            isOrdered: false,
            hasExtraAnswers: false,
            displayPreview: false,
            activityTitle: "",
        }
    }

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


    resetNewDraggable = () => {
        this.setState({
            newDraggable: {
                isEditable: false,
                content: "",
            }
        });
    }

    handleDrag = (result) => {
        console.log(result)
        const { source, destination } = result;
        // dropped outside the list
        if(!destination) return;
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;
        if(source.droppableId === 'New' && result.draggableId === 'New Draggable'){
          alert('Please update the draggable');
            return;
        }

        if(source.droppableId === destination.droppableId) {

            this.setState({
                droppableContainers: this.state.droppableContainers.map((container) => {
                    if (container.id === parseInt(source.droppableId)) {
                        const [removed] = container.draggableItems.splice(source.index, 1);
                        container.draggableItems.splice(destination.index, 0, removed);
                    }
                    return container;
                })
            });
        }else {
            if (destination.droppableId === 'trash-bin') {
                if(source.droppableId === "extraAnswers") {
                    this.setState({
                        extraAnswers: this.state.extraAnswers.filter((item, index) => index !== source.index)
                    });
                }else{
                    this.setState({
                        droppableContainers: this.state.droppableContainers.map((container) => {
                            if (container.id === parseInt(source.droppableId)) {
                                container.draggableItems.splice(source.index, 1);
                            }
                            return container;
                        })
                    });
                }
            } else {
                console.log('dropped in a different container')
                // remove from current container
                this.setState({
                    droppableContainers: this.state.droppableContainers.map((container) => {
                        if (container.id === parseInt(source.droppableId)) {
                            container.draggableItems.splice(source.index, 1);
                        }
                        return container;
                    })
                });
                const draggable = {
                    content: result.draggableId
                }

                if(destination.droppableId === 'extraAnswers') {
                    this.setState({
                        extraAnswers: [...this.state.extraAnswers, draggable]
                    });
                }else{
                    this.setState({
                        droppableContainers: this.state.droppableContainers.map((container) => {
                            if (container.id === parseInt(destination.droppableId)) {
                                container.draggableItems.splice(destination.index, 0, draggable);
                            }
                            return container;
                        })
                    });

                }
            }

            if(source.droppableId === 'New') {
                this.resetNewDraggable()
            }
        }
    }

    addContainer = () => {
        const newContainer = {
            id: this.state.droppableContainers.length + 1,
            title: ``,
            draggableItems: []
        }
        this.setState({
            droppableContainers: [...this.state.droppableContainers, newContainer]
        });
    }

    removeContainer = (id) => {
        return () => {
            this.setState({
                droppableContainers: this.state.droppableContainers.filter((container) => container.id !== id)
            });
        }
    }

    actionButtons = () => {
        return (
            <>
                <div className="ml-auto m-1">
                    <button className={'btn btn-outline-secondary'}>Tutorial</button>
                </div>
                <div className="m-1">
                    <button className={'btn btn-outline-info'} onClick={this.displayPreview}>Preview</button>
                </div>
                <div className="m-1 mr-auto mr-md-0">
                    <button className={'btn btn-outline-success'}>Save</button>
                </div>
            </>
        )
    }

    render() {
        return (
            <div className={'container-xs text-center mr-md-5 p-2'}>
                <DragDropContext onDragEnd={this.handleDrag}>
                    <div className="row">
                        {this.actionButtons()}
                    </div>
                    <div className="row ml-sm-1  ml-xs-3">
                        <div className="w-100 h1 text-center">
                            <EditableInput
                                placeholder={'Activity Title'}
                                value={this.state.activityTitle}
                                onSave={(value) => this.setState({activityTitle: value})}
                            />
                        </div>
                    </div>
                    <div className="dnd">
                        <div className="w-100 mb-auto d-flex flex-row justify-content-end align-items-end">
                            <button className="container-btn m-2" onClick={this.addContainer}><span>+</span></button>
                        </div>
                        <div className="row m-auto d-flex flex-fill justify-content-center align-items-center">
                        {this.state.droppableContainers.map((container) => {
                                return (
                                    <div key={container.id} className="card p-2">
                                        <div className="card-title border-bottom h3">
                                            <div className="row justify-content-center align-items-center">
                                                <div className="col-10">
                                                    <EditableInput
                                                        placeholder={'Container Title'}
                                                        value={container.title}
                                                        onSave={(value) => this.setDroppableTitle(value, container.id)}
                                                    />
                                                </div>
                                                <div className="col-1 d-flex flex-fill justify-content-center align-items-center">
                                                    <button className="container-btn remove" onClick={this.removeContainer(container.id)}><span>-</span></button>
                                                </div>
                                            </div>
                                        </div>
                                        <DroppableContainers
                                            className={'card-body droppable'}
                                            droppableId={container.id.toString()}
                                            container={container}
                                            placeholder={container.draggableItems.length === 0}>
                                            {
                                                container.draggableItems.map((item, index) => {
                                                    return (
                                                        <DraggableItem
                                                            key={index}
                                                            className={'border border-dark draggable'}
                                                            draggableId={item.content}
                                                            index={index}>
                                                            <p className={'m-auto'}>
                                                                {item.content}
                                                            </p>
                                                        </DraggableItem>
                                                    );
                                                })
                                            }
                                        </DroppableContainers>
                                    </div>
                                );
                            })}
                            {
                                this.state.hasExtraAnswers &&
                                <div className="card p-2">
                                    <div className="card-title border-bottom h3">
                                        Extra Answers
                                    </div>
                                    <DroppableContainers
                                        className={'card-body droppable'}
                                        droppableId={'extraAnswers'}
                                        container={{id: 404, title: "Extra Answers"}}>
                                        {
                                            this.state.extraAnswers.map((item, index) => {
                                                return (
                                                    <DraggableItem
                                                        key={index}
                                                        className={'border border-dark draggable'}
                                                        draggableId={item.content}
                                                        index={index}>
                                                        <p className={'m-auto'}>
                                                            {item.content}
                                                        </p>
                                                    </DraggableItem>
                                                );
                                            })
                                        }
                                    </DroppableContainers>
                                </div>
                            }
                        </div>

                    </div>
                    <DndActivityOptions
                        state={this.state}
                        displayPreview={this.displayPreview}
                        setState={(state) => this.setState(state)}
                    />
                    {
                        this.state.displayPreview &&
                        <PreviewActivityModal onClose={this.displayPreview}>
                            <DragAndDropActivity
                                droppableContainers={this.state.droppableContainers}
                                extraAnswers={this.state.extraAnswers}
                                isOrdered={this.state.isOrdered}
                                activityTitle={this.state.activityTitle}
                            />
                        </PreviewActivityModal>
                    }
                </DragDropContext>
            </div>
        )
    }
}

export default DragAndDropCreation;
