import "./App.css";
import ReactPlayer from "react-player";
import React, { Component } from "react";

/** This is the Interactive Video Feature (Cropped Video Feature) which allows 
 * the instructor to crop their preferred video. 
 * 
 * @Author: Shanice Bandoo
 * 
 */


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            duration: null,
            stopSeconds: 0,
            currentTime: 0,
            timeStamps: [],
            selectedTimeStamp: 0,
        };
        this.playerRef = React.createRef();
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

    handleStopSecondsChange = (event) => {
        this.setState({ stopSeconds: event.target.value });
    };

    handleStopVideo1 = () => {
        const { stopSeconds } = this.state;
        const stopTime = parseInt(stopSeconds);
        const player = this.playerRef.current.getInternalPlayer();
        if (player) {
            player.seekTo(stopTime, 'seconds');
            // You can try using player.pauseVideo() for certain player implementations
            if (typeof player.pause === 'function') {
                player.pause();
            } else if (typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        }

        handleStopVideo2 = () => {
            const { stopSeconds } = this.state;
            const stopTime = parseInt(stopSeconds);
            const player = this.playerRef.current.getInternalPlayer();
            if (player) {
                player.seekTo(stopTime, 'seconds');
                // You can try using player.pauseVideo() for certain player implementations
                if (typeof player.pause === 'function') {
                    player.pause();
                } else if (typeof player.pauseVideo === 'function') {
                    player.pauseVideo();
                }
            }

            // Reset stopSeconds after adding it to timeStamps
            this.setState({ stopSeconds: 0 });
        };

        handleTimeUpdate = (currentTime) => {
            this.setState({ currentTime });
        };

        handleActivitySelection = (timeStamp, activityType) => {
            this.setState((prevState) => ({
                activityChoices: {
                    ...prevState.activityChoices,
                    [timeStamp]: activityType
                }
            }));
        };

        render(); {
            return (
                <div className="linkVideo">
                    <h2>Cropped Video</h2>
                    <p>Please enter the video link you want to use:</p>
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleVideoLoaded}>Load Video</button>
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
                                value={this.state.stopSeconds}
                                onChange={this.handleStopSecondsChange}
                            />
                            {"\t"}seconds{"\t"}
                            <button onClick={this.handleStopVideo1}> Start Here </button>

                            <p>Stop Time: </p>
                            <input
                                type="number"
                                value={this.state.stopSeconds}
                                onChange={this.handleStopSecondsChange}
                            />
                            {"\t"}seconds{"\t"}
                            <button onClick={this.handleStopVideo2}> Stop Here </button>
                        </div>
                    )}
                </div>
            );
        }
    }
}
export default App;
