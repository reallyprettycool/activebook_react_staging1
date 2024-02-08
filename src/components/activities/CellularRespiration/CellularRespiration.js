import React, { Component } from 'react';
import Animation from './Animation';


class CellularRespiration extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { 
    // }
  }

  render(){
    return (
      // <div className="activity-container">    
      //       <h3 className='my-2'>Cellular Respiration</h3>
            <Animation 
              postAttempt={this.props.postAttempt}
            />
      // </div>
    )
  }

}

export default CellularRespiration