import React, { Component } from "react";
import EventDataService from "../services/events.service";
import UserDataService from "../services/user.service"

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onChangeCity = this.onChangeCity.bind(this)
        this.saveEvent = this.saveEvent.bind(this);


        this.state = {
            id: null,
            userid:"",
            name: "",
            description: "",
            url:"",
            start:"",
            end:"",
            address:"",
            city:"",
            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }

    onChangeStart = (e) => {
        this.setState({
            start: e.target.value
        });
    }

    onChangeEnd = (e) => {
        this.setState({
            end: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }



    saveEvent() {
        const data = {
            name: this.state.name,
            userid: localStorage.getItem('userid'),
            description: this.state.description,
            url: this.state.url,
            start: this.state.start,
            end: this.state.end,
            address: this.state.address,
            city: this.state.city
        };

        EventDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    userid: response.data.userid,
                    name: response.data.name,
                    description: response.data.description,
                    url : response.data.url,
                    start: response.data.start,
                    end: response.data.end,
                    address: response.data.address,
                    city: response.data.city,
                    submitted: true
                });

                const id =  localStorage.getItem('userid').toString()


                const data = {

                    status: 2
                }

                if(localStorage.getItem('access') < 3)
                {
                    UserDataService.update(id,data)
                    localStorage.setItem("access",'2')
                    console.log(response.data);
                }

            })
            .catch(e => {
                console.log(e);
            });
             setTimeout(() => {
                 window.location.href = '/users'
        },1000)

    }



    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>

                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Event Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Event Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">Event Website URL</label>
                            <input
                                type="url"
                                className="form-control"
                                id="url"
                                required
                                value={this.state.url}
                                onChange={this.onChangeURL}
                                name="url"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="start">Event Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="start"
                                required
                                value={this.state.start}
                                onChange={this.onChangeStart}
                                name="start"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end">Event End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="end"
                                required
                                value={this.state.end}
                                onChange={this.onChangeEnd}
                                name="end"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Event Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                required
                                value={this.state.address}
                                onChange={this.onChangeAddress}
                                name="address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">Event City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                required
                                value={this.state.city}
                                onChange={this.onChangeCity}
                                name="city"
                            />
                        </div>

                        <button onClick={this.saveEvent} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}