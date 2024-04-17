import "./Interactive.css";
import ReactPlayer from "react-player";
import React, { Component } from "react";

/** This is the Interactive Video Feature (Cropped Video Feature) which allows 
 * the instructor to crop their preferred video. 
 * 
 * @Author: Shanice Bandoo
 * 
 */
class InteractiveVideoCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            duration: null,
            startTime: 0,
            endTime: 0,
            currentTime: 0,
        };
        this.playerRef = React.createRef();
        this.newPlayerRef = React.createRef();
    }

    handleChange = (event) => {
        this.setState({ text: event.target.value });
    };

    handleVideoLoaded = () => {
        const player = this.playerRef.current.getInternalPlayer();
        if (player) {
            const duration = player.getDuration();
            this.setState({ duration });
        }
    };

    handleTimeUpdate = (currentTime) => {
        this.setState({ currentTime });
    };

    handleStartTimeChange = (event) => {
        const value = event.target.value;
        this.setState({ startTime: value });
    };

    handleStartTimeButton = () => {
        const { currentTime } = this.state;
        this.setState({ startTime: currentTime });
        const player = this.playerRef.current.getInternalPlayer();
        if (player) {
            player.seekTo(currentTime, 'seconds');
            // You can try using player.pauseVideo() for certain player implementations
            if (typeof player.pause === 'function') {
                player.pause();
            } else if (typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        }
    };

    handleEndTimeButton = (event) => {
        const value = event.target.value;
        this.setState({ endTime: value });
    };

    handleEndTimeChange = () => {
        const { currentTime } = this.state;
        const stopTime = parseInt(currentTime);
        const player = this.playerRef.current.getInternalPlayer();
        if (player) {
            player.seekTo(stopTime, 'seconds');
            if (typeof player.pause === 'function') {
                player.pause();
            } else if (typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        }
    };

    render() {
        return (
            <div className="linkVideo">
                <h2>Interactive Video</h2>
                <p>Please enter the video link you want to use:</p>
                <input
                    type="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleVideoLoaded}>Load Video Metrics</button>{' '}

                <ReactPlayer
                    ref={this.playerRef}
                    controls={true}
                    url={this.state.text}
                    height="250px"
                    width="450px"
                    onProgress={({ playedSeconds }) =>
                        this.handleTimeUpdate(playedSeconds)
                    }
                />

                {this.state.duration && (
                    <div className="videoContent">
                        <p>Duration of the video: {this.state.duration.toFixed(2)} seconds</p>
                        <p>Current Time: {this.state.currentTime.toFixed(2)} seconds</p>
                        <p>Start Time: </p>
                        <input
                            type="number"
                            value={this.state.number}
                            onChange={this.handleStartTimeChange}
                            placeholder="Enter seconds here"
                        />
                        {"\t"}seconds{"\t"}
                        <button onClick={this.handleStartTimeButton}> Enter </button>

                        <p>End Time: </p>
                        <input
                            type="number"
                            value={this.state.number}
                            onChange={this.handleEndTimeChange}
                            placeholder="Enter seconds here"
                        />

                        {"\t"}seconds{"\t"}
                        <button onClick={this.handleEndTimeButtonCLick}> Enter </button>
                        <div className="second">
                            <h>Your Trimmed Video: </h>
                            <ReactPlayer
                                ref={this.newPlayerRef}
                                controls={false}
                                url={this.state.text} // Use the same URL for the new video
                                height="250px"
                                width="450px"
                                startTime={this.state.startTime}
                                endTime={this.state.endTime}
                            />
                        </div>
                    </div>

                )}
            </div>
        );
    }
}
export default InteractiveVideoCreation;