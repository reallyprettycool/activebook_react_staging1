import React from 'react';
import Options from './Options'
import { Droppable } from 'react-beautiful-dnd';


export default class Column extends React.Component {
  render() {
    const styles = {
      border: '1px solid lightgrey',
      borderRadius: '4px',
      minHeight: '8vh'
    }

    return (
      <div className='col-4'>
        <h6>{this.props.column.title}</h6>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <div style={styles} ref={provided.innerRef} innerRef={provided.innerRef} {...provided.droppableProps}>
              {this.props.options.map((option, index) => <Options options={option} key={option.id} index={index}/> )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

    )
  }
}