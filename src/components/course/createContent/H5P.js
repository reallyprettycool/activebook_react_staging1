import React, { Component } from "react";
import axios from "axios";

class H5P extends Component {
  render() {
    return (
      <div>
        {" "}
        <iframe
          src="https://elsik.h5p.com/content/1292175767311136998/embed"
          aria-label="Prueba"
          width="1088"
          height="637"
          frameBorder="0"
          allowFullScreen="allowfullscreen"
          allow="autoplay *; geolocation *; microphone *; camera *; midi *; encrypted-media *"
        ></iframe>
        <script src="https://elsik.h5p.com/js/h5p-resizer.js" charSet="UTF-8"></script>
      </div>
    );
  }
}

export default H5P;
