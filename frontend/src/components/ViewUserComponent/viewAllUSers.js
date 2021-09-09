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
        axios.get('http://localhost:8089/user/get_all_Users')
            .then(response => {
                this.setState({ options: response.data.data });
                console.log(response.data.data)
                console.log("test11")
            })
    }


    DeleteUSer(e, ID) {
        const User={
            id:ID
        }
        axios.post('http://localhost:8089/admin/removeUser',User)
        .then(response => {
            this.setState({ options: response.data.data });
            console.log(response.data.data)
            console.log("test11")
        })
        window.location = `/ViewAlluser`
    }
    render() {
        return (
            <div className="container">
                <h1>Users</h1>
                {this.state.options.length > 0 && this.state.options.map((item, index) => (

                    <div key={index} className="card mb-3">
                        <div className="p-3" >

                            <h4> Full Name : {item.Full_Name}</h4>
                            <h4> Email : {item.Email}</h4>
                            <h4> Age : {item.Age}</h4>
                            <h4> Phone : {item.Phone}</h4>
                            <h4> Sex : {item.Sex}</h4>
                            <div className="form-group">
                                <input type="submit" onClick={e => this.DeleteUSer(e, item._id)} value="Delete User" className="btn btn-primary" />
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        )
    }
}


export default GetallCategories;