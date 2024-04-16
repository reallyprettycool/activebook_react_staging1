import React, { Component } from 'react';
import axios from 'axios';
import { activities } from '../../activities/ActivityList';
import {RingLoader} from "react-spinners";
import PopUpModal from "../../utils/popUpModal/popUpModal";
import AddModule from "./addModule/addModule";


class Modules extends Component {
    constructor(props){
        super(props);
        this.state = {
            modules: [],
            spinner: false,
            popUp: {
                title: "Add Module",
                display: false,
                screen: <AddModule/>
            }
        };

        // you need to include credentials if you are using req.user in Express ------------------------------------------- `|´
        this.service = axios.create({ baseURL: process.env.REACT_APP_BASE_URL +'/courses', withCredentials: true});
        this.activities = activities;
    }

    showModules = () => {
        return(
            <div className={'container-fluid'}>
                <table className={'table table-striped'}>
                    <thead>
                        <tr>
                            <th scope={'col'}>Module Name</th>
                            <th scope={'col'}>Due Date</th>
                            <th scope={'col'}>Availability</th>
                            <th scope={'col'}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.modules.map((module, index) => {
                            return(
                                <tr key={index}>
                                    <td>{module.moduleName}</td>
                                    <td>{module.dueDate}</td>
                                    <td>{module.availability.startDate} - {module.availability.endDate}</td>
                                    <td>
                                        <button className="btn btn-primary m-2">Edit</button>
                                        <button className="btn btn-danger m-2">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }

    actionButtons = () => {
        return(
            <div className="d-flex justify-content-center">
                <button className="btn btn-success m-2" onClick={() => this.setState({
                    popUp: {
                        title: "Add Module",
                        display: true,
                        screen: <AddModule/>
                    }
                })}>Add New Module</button>
            </div>
        )
    }


    render(){
        return (
            <div className="container text-center p-2 border rounded">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xs-10">
                        <h2>Modules</h2>
                    </div>
                </div>
                <div className="row m-2">
                    {this.actionButtons()}
                </div>
                <div className="d-flex pt-2 justify-content-center">
                    {this.showModules()}
                    {this.state.spinner && (
                        <div className="spinner">
                            <div className="spinner-container">
                                <RingLoader
                                    color="#36D7B7"
                                    loading={this.state.spinner}
                                    size={200}
                                />w
                            </div>
                        </div>
                    )}
                </div>
                {
                    this.state.popUp.display && (
                        <PopUpModal
                            title={this.state.popUp.title}
                            onClose={() => this.setState({popUp: { title: '', display: false, screen: null}})}
                        >
                            {this.state.popUp.screen}
                        </PopUpModal>
                    )
                }
            </div>
        )
    }

}

export default Modules;
