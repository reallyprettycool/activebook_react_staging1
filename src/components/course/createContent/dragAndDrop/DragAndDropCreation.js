import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableContainers from "./DroppableContainers";
import DraggableItem from "./DraggableItem";
import PreviewActivityModal from "../../../utils/previewActivty/PreviewActivityModal";
import DragAndDropActivity from "../../../activities/created/dragAndDrop/DragAndDropActivity";
import "../../../activities/created/dragAndDrop/DragAndDropActivity.css";
import DndActivityOptions from "./DndActivityOptions";
import EditableInput from "../../../utils/editableInput/EditableInput";

/**
 * This component is used to create a drag and drop activity.
 * @param props - droppableContainers, extraAnswers, isOrdered, activityTitle
 * @returns {JSX.Element}
 */
class DragAndDropCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableContainers: [{ // Default container
                id: 1,
                title: "",
                draggableItems: []
            }],
            newDraggable: { // Default draggable
                isEditable: false,
                content: "",
            },
            extraAnswers: [],       // Extra answers list
            isOrdered: false,       // Determines if the answers have a specific order
            hasExtraAnswers: false, // Toggle for extra answers
            displayPreview: false,  // Displays the preview modal
            activityTitle: "",      // Activity title
        }

        this.saveActivity = props.saveActivity;
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


    // Resets the new draggable item
    resetNewDraggable = () => {
        this.setState({
            newDraggable: {
                isEditable: false,
                content: "",
            }
        });
    }

    // Handles the drag and drop functionality
    handleDrag = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if(!destination) return;
        // Prevents the draggable from being dropped in the same location
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;
        // Prevents the draggable from being dropped without being updated
        if(source.droppableId === 'New' && result.draggableId === 'New Draggable'){
          alert('Please update the draggable');
          return;
        }

        // If dropped in the same container -> not new draggable container
        if(source.droppableId === destination.droppableId && source.droppableId !== 'New') {
            // move order of draggable items
            if(source.droppableId !== 'extraAnswers'){
                this.setState({
                    droppableContainers: this.state.droppableContainers.map((container) => {
                        if (container.id === parseInt(source.droppableId)) {
                            const [removed] = container.draggableItems.splice(source.index, 1);
                            container.draggableItems.splice(destination.index, 0, removed);
                        }
                        return container;
                    })
                });
            }else{
                // move order of extra answers
                const [removed] = this.state.extraAnswers.splice(source.index, 1);
                this.state.extraAnswers.splice(destination.index, 0, removed);
                this.setState({extraAnswers: this.state.extraAnswers});
            }
        }else {
            if(source.droppableId === 'New') {
                const newDraggable = this.state.newDraggable;
                if(destination.droppableId === 'extraAnswers') {
                    let updatedAnswers = this.state.extraAnswers;
                    updatedAnswers.splice(destination.index, 0, newDraggable);
                    this.setState({extraAnswers: updatedAnswers});
                }else if (destination.droppableId === 'trash'){
                    this.resetNewDraggable();
                }else {
                    this.setState({
                        droppableContainers: this.state.droppableContainers.map((container) => {
                            if (container.id === parseInt(destination.droppableId)) {
                                container.draggableItems.splice(destination.index, 0, this.state.newDraggable);
                            }
                            return container;
                        })
                    });
                }

                this.resetNewDraggable();
            }else if (source.droppableId === 'extraAnswers') {
                if(destination.droppableId === 'trash'){
                    this.setState({
                        extraAnswers: this.state.extraAnswers.filter((item, index) => index !== source.index)
                    });
                }else {
                    const [removed] = this.state.extraAnswers.splice(source.index, 1);

                    this.setState({
                        droppableContainers: this.state.droppableContainers.map((container) => {
                            if (container.id === parseInt(destination.droppableId)) {
                                container.draggableItems.splice(destination.index, 0, removed);
                            }
                            return container;
                        })
                    });
                }
            }else {
                // remove draggable from container
                const [removed] = this.state.droppableContainers.find(container => container.id === parseInt(source.droppableId)).draggableItems.splice(source.index, 1);

                // add draggable to extra answers
                if (destination.droppableId === 'extraAnswers') {
                    let updatedExtraAnswers = this.state.extraAnswers;
                    updatedExtraAnswers.splice(destination.index, 0, removed);
                    this.setState({extraAnswers: updatedExtraAnswers})
                } else {
                    // add draggable to container
                    this.setState({
                        droppableContainers: this.state.droppableContainers.map((container) => {
                            if (container.id === parseInt(destination.droppableId)) {
                                container.draggableItems.splice(destination.index, 0, removed)
                            }
                            return container;
                        })
                    });
                }
            }
        }
    }

    // Adds a new container
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

    // Removes a container
    removeContainer = (id) => {
        return () => {
            this.setState({
                droppableContainers: this.state.droppableContainers.filter((container) => container.id !== id)
            });
        }
    }

    // The following three functions are for the action buttons
    displayPreview = () => {
        this.setState({
            displayPreview: !this.state.displayPreview
        });
    }

    onSave = () => {
        const activity = {
            title: this.state.activityTitle,
            description: "Drag and Drop Activity",
            activityParameters: {
                droppableContainers: this.state.droppableContainers,
                extraAnswers: this.state.extraAnswers,
                isOrdered: this.state.isOrdered
            },
        }

        return async () => {
            await this.saveActivity(activity);
        }
    }

    // Renders the action buttons
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
                    <button className={'btn btn-outline-success'} onClick={this.onSave()}>Save</button>
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
                            {/*  Activity Title  */}
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
                        {/*     Show all droppable containers with appropriate draggables    */}
                        {this.state.droppableContainers.map((container) => {
                                return (
                                    <div key={container.id} className="card p-2">
                                        <div className="card-title border-bottom h3">
                                            <div className="row justify-content-center align-items-center">
                                                <div className="col-10">
                                                    {/*     Allow for the title to be editable      */}
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
                                                            {/*     Allow for draggable to be edited    */}
                                                            <EditableInput
                                                                placeholder={'Activity Title'}
                                                                value={item.content}
                                                                onSave={(value) => {
                                                                    container.draggableItems[index].content = value;
                                                                    this.setState({droppableContainers: this.state.droppableContainers});
                                                                }}/>
                                                        </DraggableItem>
                                                    );
                                                })
                                            }
                                        </DroppableContainers>
                                    </div>
                                );
                            })}
                            {/*     Show the extra answers container if there are extra answers    */}
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
                                                        {/*     Allow for draggable to be edited    */}
                                                        <EditableInput
                                                            placeholder={'Activity Title'}
                                                            value={item.content}
                                                            onSave={(value) => {
                                                                this.state.extraAnswers[index].content = value;
                                                                this.setState({extraAnswers: this.state.extraAnswers});
                                                            }}/>
                                                    </DraggableItem>
                                                );
                                            })
                                        }
                                    </DroppableContainers>
                                </div>
                            }
                        </div>

                    </div>
                    {/*     Display the options and the preview modal    */}
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
