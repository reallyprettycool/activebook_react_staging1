import React, { Component } from 'react';



class YouTubePlayer extends Component {

  render () {
    return (
      <iframe id="ytplayer" type="text/html" title="DNA replication"
      src="https://www.youtube.com/embed/O5gN-IK6uKs" 
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
    )

  }
}

export default YouTubePlayer;

