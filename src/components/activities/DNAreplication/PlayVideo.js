import React, { Component } from 'react';



class YouTubePlayer extends Component {

  render () {
    return (
      <iframe id="ytplayer" type="text/html" title="DNA replication"
      src="https://www.youtube.com/embed/8kK2zwjRV0M" 
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
    )

  }
}

export default YouTubePlayer;

