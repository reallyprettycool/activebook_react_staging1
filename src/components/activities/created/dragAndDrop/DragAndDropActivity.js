import './DragAndDropActivity.css';
import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainers from '../../../course/createContent/dragAndDrop/DroppableContainers';
import DraggableItem from '../../../course/createContent/dragAndDrop/DraggableItem';
import ResultsModal from "./resultsModal";

class DragAndDropActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableContainers: props.droppableContainers || [], // Array of containers with draggable items
            extraAnswers: props.extraAnswers || [], // Extra answers to be added to the answer bank
            isOrdered: props.isOrdered || false, // Determines if the answers are ordered
            activityTitle: props.activityTitle || 'Drag and Drop Activity', // Title of the activity
            activityContainers: [], // Array of containers with draggable items used to display the activity
            allAnswers: [], // Array of all draggable items for the answer bank
            showResults: false, // Determines if the results modal is shown
            resultMsg: '' // Message to be displayed in the results modal
        };
    }

    // Reset the activity to its initial state
    resetActivity = () => {
        this.setState({
            allAnswers: this.getAllAnswers(this.state.droppableContainers),
            activityContainers: this.getEmptyContainers(this.state.droppableContainers),
        });
    }


    // Check the answers
    checkAnswers = () => {
        const isOrdered = this.state.isOrdered;
        let result;

        // Check if the answers are ordered
        if (isOrdered) {
            const correctContainers = this.state.droppableContainers.map(container => ({...container}));
            const userContainers = this.state.activityContainers.map(container => ({...container}));

            result = correctContainers.every((correctContainer, index) => {
                const userContainer = userContainers[index];

                // Compare the length of draggableItems first
                if (correctContainer.draggableItems.length !== userContainer.draggableItems.length) {
                    return false;
                }

                // Compare each item in the containers
                return correctContainer.draggableItems.every((correctItem, i) => {
                    const userItem = userContainer.draggableItems[i];
                    return userItem && correctItem.content === userItem.content;
                });
            });
            // Set the result message
            if(result){
                this.setState({resultMsg: 'Correct!'});
            }else{
                this.setState({resultMsg: 'Incorrect. The order of which the answers are inputted are important. Try again!'});
            }

        } else {
            const correctItems = this.state.allAnswers.map(item => item.content);
            const userItems = this.state.activityContainers.flatMap(container => container.draggableItems.map(item => item.content));

            result = correctItems.length === userItems.length && correctItems.every((item, index) => item === userItems[index]);

            if(result) {
                this.setState({resultMsg: 'Correct!'});
            }else{
                this.setState({resultMsg: 'Incorrect. Try again!'});
            }
        }

        this.setState({showResults: true});
        this.resetActivity(); // Reset the activity
    };


    // Get all the answers from the containers and extra answers
    getAllAnswers = (containers) =>{
        let answers = [];
        containers.forEach(container => {
            container.draggableItems.forEach(item => {
                answers.push(item);
            });
        });
        if(this.state.extraAnswers.length > 0){
            this.state.extraAnswers.forEach(answer => {
                answers.push(answer);
            });
        }

        // shuffle the answers
        answers.sort(() => Math.random() - 0.5);
        return answers;
    }

    // Get containers with no draggable items
    getEmptyContainers = (containers) => {
        return containers.map(container => {
            return {
                ...container,
                draggableItems: []
            };

        });
    }

    // Handles the drag and drop logic
    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) return;

        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        // Item dropped in same place
        if (sourceId === destinationId && sourceIndex === destinationIndex) return;
        if(sourceId === 'answer-bank') {
            // move from answer bank to answer bank
            if(destinationId === 'answer-bank'){
                const [removed] = this.state.allAnswers.splice(sourceIndex, 1);
                this.state.allAnswers.splice(destinationIndex, 0, removed);
                this.setState({allAnswers: this.state.allAnswers});
            }else{
                // move from answer bank to container
                const [removed] = this.state.allAnswers.splice(sourceIndex, 1);
                const destinationContainer = this.state.activityContainers.find(container => container.id.toString() === destinationId);
                destinationContainer.draggableItems.splice(destinationIndex, 0, removed);
                this.setState({allAnswers: this.state.allAnswers, activityContainers: this.state.activityContainers});
            }
        }else{
            if(destinationId === 'answer-bank'){
                // move from container to answer bank
                const sourceContainer = this.state.activityContainers.find(container => container.id.toString() === sourceId);
                const [removed] = sourceContainer.draggableItems.splice(sourceIndex, 1);
                this.state.allAnswers.splice(destinationIndex, 0, removed);
                this.setState({allAnswers: this.state.allAnswers, activityContainers: this.state.activityContainers});
            }else{
                // move containers and indexes
                const sourceContainer = this.state.activityContainers.find(container => container.id.toString() === sourceId);
                const destinationContainer = this.state.activityContainers.find(container => container.id.toString() === destinationId);
                const [removed] = sourceContainer.draggableItems.splice(sourceIndex, 1);
                destinationContainer.draggableItems.splice(destinationIndex, 0, removed);
                this.setState({activityContainers: this.state.activityContainers});
            }
        }

    }


    // Update the state once with the new values
    componentDidMount() {
        this.setState({
            allAnswers: this.getAllAnswers(this.state.droppableContainers),
            activityContainers: this.getEmptyContainers(this.state.droppableContainers)
        });
    }
    render() {
        return (
            <div className={'container-fluid border border-dark rounded'}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-column dnd border-0">
                                    <div className="col-12 border-bottom mb-auto">
                                        <h2>{this.state.activityTitle}</h2>
                                    </div>
                                <div className="row col-12 justify-content-center align-items-center m-1 ">
                                    <div className="col-9">
                                        <div className="row justify-content-center align-items-center">
                                            {
                                                this.state.activityContainers.map((container) => {
                                                    return (
                                                        <div key={container.id} className="card border-dark p-3">
                                                            <div className="card-title border-bottom h3">
                                                                {container.title}
                                                            </div>
                                                            <DroppableContainers
                                                                className={'card-body droppable'}
                                                                droppableId={container.id.toString()}
                                                                container={container}>
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
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="card border-dark p-2">
                                            <h3 className={'card-title border-bottom'}>Answers</h3>
                                            <DroppableContainers className={'card-body droppable'} droppableId="answer-bank">
                                                <div
                                                    className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                                                    {
                                                        this.state.allAnswers.map((answer, index) => {
                                                            return (
                                                                <DraggableItem
                                                                    key={index}
                                                                    className={'border border-secondary draggable'}
                                                                    draggableId={answer.content}
                                                                    index={index}>
                                                                    <p className={'m-auto'}>
                                                                        {answer.content}
                                                                    </p>
                                                                </DraggableItem>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </DroppableContainers>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
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
                        </div>
                    </div>
                </DragDropContext>
                {
                    this.state.showResults && <ResultsModal onClose={()=> this.setState({showResults: false})}>
                        {this.state.resultMsg}
                    </ResultsModal>
                }
            </div>
        );
    }
}

export default DragAndDropActivity;
