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
            User_Name: "Shehan2222"
        }
        axios.post('http://localhost:8089/reservation/get_all_Reservations_byUserID', User)
            .then(response => {
                this.setState({ options: response.data.data });
                console.log(response.data)
                console.log("test11")
            })
    }

    DeleteReservation(e, ID) {
        const User = {
            id: ID
        }
        axios.post('http://localhost:8089/reservation/RemoveUserReservation', User)
            .then(response => {
                this.setState({ options: response.data.data });
                console.log(response.data.data)
                console.log("test11")
            })
        window.location = `/myReservations`
    }



    render() {
        return (
            <div className="container">
                <h1>My Reservations</h1>
                {this.state.options.length > 0 && this.state.options.map((item, index) => (

                    <div key={index} className="card mb-3">
                        <div className="p-3" >

                            <h4> Room Name : {item.Room_ID}</h4>
                            <h4> From Date : {item.From_Date}</h4>
                            <h4> To Date : {item.To_Date}</h4>
                            <h4> Price : {item.Price}</h4>
                            <div className="form-group">
                                <input type="submit" onClick={e => this.DeleteReservation(e, item._id)} value="Delete Reservation" className="btn btn-primary" />
                            </div>
                      
                        </div>
                    </div>

                ))}
            </div>
        )
    }
}


export default GetallCategories;