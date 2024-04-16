import React, {Component} from 'react';
import ModuleDetails from "./moduleDetails";

class AddModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moduleDetails: {
                moduleName: "",
                dueDate: "",
                dueTime: "23:59",

                availability: {
                    startDate: "",
                    startTime: "00:00",

                    endDate: "",
                    endTime: "23:59"
                },

                latePolicy : {
                    deduction: 0,
                    unit: "none",
                    maxDeduction: 0
                }
            },

            selectedActivitiesId: [],

            screens: [
                <ModuleDetails
                    moduleDetails={this.moduleDetails}
                    onChange={this.moduleDetailsInputChange}
                />
            ],
            currentScreen: 0


        }
    }

    componentDidMount() {
        this.setState({
            screens: [
                <ModuleDetails
                    moduleDetails={this.state.moduleDetails}
                    onChange={this.moduleDetailsInputChange}
                />
            ]
        });
    }

    moduleDetailsInputChange = (moduleDetails) => {
        this.setState({moduleDetails: moduleDetails});
    }

    onBack = () => {
        if(this.state.currentScreen > 0){
            this.setState({currentScreen: this.state.currentScreen - 1});
        }
    }
    onNext = () => {
        if(this.state.currentScreen < this.state.screens.length - 1){
            this.setState({currentScreen: this.state.currentScreen + 1});
        }
    }
    directionButtons = () => {
        return (
            <>
                <button className="btn btn-primary m-2" onClick={this.onBack}>Back</button>
                {
                    this.state.currentScreen === this.state.screens.length - 1 ?
                        <button className="btn btn-outline-success m-2">Save</button> :
                        <button className="btn btn-primary m-2" onClick={this.onNext}>Next</button>
                }
            </>
        )
    }

    getScreen = () => {
        return this.state.screens[this.state.currentScreen];
    }

    render() {

        return (
            <>
                <div className="container">
                    <div className="container-fluid justify-content-center align-items-center">
                        <div className="col-xs-12">
                            {this.getScreen()}
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center mt-2">
                        {this.directionButtons()}
                    </div>
                </div>
            </>
        );
    }
}

export default AddModule;