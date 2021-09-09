import React, { Component } from 'react';
import axios from 'axios';

class GetallCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {

            options: [],
            Code: '',
            Model: '',
            Type: '',
            Name: '',
            categories: []

        };
    }


    componentDidMount() {
        console.log("test")
        const User = {
            id: "sheh@gmail.com"
        }
        axios.post('http://localhost:8089/user/get_UserData', User)
            .then(response => {
                this.setState({ options: response.data.data });
                console.log(response.data.data)
                console.log("test11")
            })
    }



    UpdateProfile(e, ID) {
        window.location = `/UpdateProfile/${ID}`
    }


    render() {
        return (
            <div className="container">
                <h1>Profile</h1>
                {this.state.options.length > 0 && this.state.options.map((item, index) => (

                    <div key={index} className="card mb-3">
                        <div className="p-3">

                            <h4> User Name : {item.Full_Name}</h4>
                            <h4> Email  : {item.Email}</h4>
                            <h4>  Age : {item.Age}</h4>
                            <h4> Phone : {item.Phone}</h4>
                            <h4> Sex : {item.Sex}</h4>
                            <div className="form-group">
                                <input type="submit" onClick={e => this.UpdateProfile(e, item.Email)} value="Update Profile" className="btn btn-primary" />
                            </div>

                        </div>
                    </div>

                ))}
            </div>
        )
    }
}


export default GetallCategories;