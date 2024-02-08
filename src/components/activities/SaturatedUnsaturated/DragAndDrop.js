import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// fake data generator
// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}`,
//         content: `item ${k + offset}`
//     }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 1.5,
    margin: `0 0 ${grid}px 0`,
    color: 'white',
    borderRadius: '4px',

    // change background colour if dragging
    background: isDragging ? '#4da3ff' : '#007bff',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : 'white',
    border: '1px solid lightgrey',
    padding: grid,
    // width: 250,
    borderRadius: '4px',
    minHeight: '10vh',
});

class DragAndDrop extends Component {
    state = {
        items: this.props.choices,
        selectedLeft: [],
        selectedRight: [],
        updateDrag:this.props.updateDrag,
    };

    // shouldComponentUpdate() {
    //   console.log('component should update')
    //   // if (this.state.updateDrag) {
    //   //   this.setState (
    //   //     {
    //   //       items: this.props.choices,
    //   //       selectedLeft: [],
    //   //       selectedRight: [],
    //   //   }, () => this.props.setUpdateDrag())
    //   // }
    // }
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable1: 'selectedLeft',
        droppable2: 'selectedRight'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
      this.props.setUpdateDrag();
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selectedRight: items };
            }

            if (source.droppableId === 'droppable1') {
              state = { selectedLeft: items };
            }

            if (source.droppableId === 'droppable') {
              state = { items: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            const items = result.droppable ? result.droppable : [];
            const selectedLeft = result.droppable1 ? result.droppable1 : [];
            const selectedRight = result.droppable2 ? result.droppable2 : []; 

            if (!result.hasOwnProperty('droppable1')) { // don't update state for columns with no change
              this.setState({ 
                items, selectedRight, 
              });
              this.props.afterDrag(this.state.selectedLeft, selectedRight)
            }

            if (!result.hasOwnProperty('droppable')) { // don't update state for columns with no change
              this.setState({ 
                selectedRight, selectedLeft,
              });
              this.props.afterDrag(selectedLeft, selectedRight)
            }
            
            if (!result.hasOwnProperty('droppable2')) { // don't update state for columns with no change
            this.setState({ 
              items, selectedLeft, 
            });
            this.props.afterDrag(selectedLeft, this.state.selectedRight)
          }
        }
    };

    showDragAndDrop () {
      // console.log ('update drag?  ', this.state.updateDrag, 'the props: ', this.props.updateDrag)
      if (this.props.updateDrag) {
        this.props.setUpdateDrag()
        this.setState({
          items: this.props.choices,
          selectedLeft: [],
          selectedRight: [],
          updateDrag: false,
        })
      } else {
        return (
          <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='col-4'>
          <h6>{this.props.headings.column1}</h6>
          <Droppable droppableId="droppable1">
                  {(provided, snapshot) => (
                      <div  
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}>
                          {this.state.selectedLeft.map((item, index) => (
                              <Draggable 
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                      <div className='draggableItem'
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                          )}>
                                          {item.content}
                                      </div>
                                  )}
                              </Draggable>
                          ))}
                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
              </div>
              <div className='col-4'>
              <h6>{this.props.headings.column2}</h6>
              <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                      <div 
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}>
                          {this.state.items.map((item, index) => (
                              <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                      <div className='draggableItem'
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                          )}>
                                          {item.content}
                                      </div>
                                  )}
                              </Draggable>
                          ))}
                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
              </div>
              <div className='col-4'>
              <h6>{this.props.headings.column3}</h6>
              <Droppable droppableId="droppable2">
                  {(provided, snapshot) => (
                      <div className='draggableItem'
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}>
                          {this.state.selectedRight.map((item, index) => (
                              <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                      <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                          )}>
                                          {item.content}
                                      </div>
                                  )}
                              </Draggable>
                          ))}
                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
              </div>
          </DragDropContext>
        )
      }
    }
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {

        return (
          <div className='row'>
            {this.showDragAndDrop()}
          </div>
        );
    }
}

export default DragAndDrop
