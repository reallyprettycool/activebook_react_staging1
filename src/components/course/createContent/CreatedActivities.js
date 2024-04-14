import React, { Component } from "react";
import AuthService from "../../auth/auth-service";
import axios from "axios";
import { RingLoader } from "react-spinners";

class CreatedActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: this.props.userInSession,
            redirect: false,
            pageSize: 10,
            page: 1,
            searchItem: "",
            searchValue: "",
            spinner: false,
        };
        this.service = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true,
        });
        this.serviceAuth = new AuthService();
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser() {
        console.log("fetchUser");
        this.serviceAuth
            .loggedin()
            .then((response) => {
                this.setState({ loggedInUser: response, redirect: false });
                this.getAllActivities();
                console.log("getAllActivities", response);
            })
            .catch((err) => {
                this.setState({ redirect: true });
            });
    }

    getAllActivities = async () => {
        await this.setState({ spinner: true });
        this.service
            .get("/activities/textImages", {
                params: {
                    page: this.state.page,
                    pageSize: this.state.pageSize,
                    filterField: this.state.searchItem,
                    filterValue: this.state.searchValue,
                },
            })
            .then(async (responseFromApi) => {
                await this.setState({ spinner: false });
                console.log("the response ", responseFromApi.data);
                this.setState({
                    activities: responseFromApi.data,
                });
            })
            .catch(async (err) => {
                await this.setState({ spinner: false });
                console.log(err);
            });
    };
    showActivities() {
        if (this.state.activities) {
            return this.state.activities.map((oneActivity, index) => {
                return (
                    <div
                        className="col-m-3 shadow row"
                        style={{ borderRadius: "20px", padding: "10px", margin: "5px" }}
                        key={index}
                    >
                        <img className="img-activity col-4" src={oneActivity.url}></img>
                        <div className="col-8">
                            <div>Title: {oneActivity.title}</div>
                            <div>Description: {oneActivity.description}</div>
                        </div>
                    </div>
                );
            });
        }
    }
    render() {
        return (
            <div className="row">
                {this.state.spinner && (
                    <div className="spinner">
                        <div className="spinner-container">
                            <RingLoader
                                color="#36D7B7"
                                loading={this.state.spinner}
                                size={200}
                            />
                        </div>
                    </div>
                )}
                {this.showActivities()}
            </div>
        );
    }
}

export default CreatedActivities;
