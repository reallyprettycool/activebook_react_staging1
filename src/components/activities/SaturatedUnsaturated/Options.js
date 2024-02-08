import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Option extends React.Component {
  render() {
    const styles = {
      border: '1px solid lightgrey',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
    }
    return ( 
      <Draggable draggableId={this.props.options.id} index={this.props.index}>
        {(provided) => (
          <p className='m-2 py-2' style={styles} {...provided.draggableProps} {...provided.dragHandleProps}  innerRef={provided.innerRef}>
            {this.props.options.content}
          </p>
        )}
      </Draggable>
    )
  }
}