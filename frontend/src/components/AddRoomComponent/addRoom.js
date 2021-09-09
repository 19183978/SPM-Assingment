import React, { Component } from 'react';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';

class AddVehicle extends Component {
    constructor(props) {
        super(props);

        this.onChangeFullName=this.onChangeFullName.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChnageAge=this.onChnageAge.bind(this);
        this.onChangePhone=this.onChangePhone.bind(this);
        this.onChangeSex=this.onChangeSex.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     

        
        this.state = {

            options: [],
            Full_Name: '',
            Email: '',
            Password: '',
            Age: '',
            Phone:'',
            Sex:'',
            categories :[]

        };
    }

    onChangeFullName(e) {
        this.setState({
            Full_Name: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        })
    }

    onChnageAge(e) {
        this.setState({
            Age: e.target.value
        })
    }
    onChangePhone(e) {
        this.setState({
            Phone: e.target.value
        })
    }

    onChangeSex(e) {
        this.setState({
            Sex: e.target.value
        })
    }





   
    onSelect(selectedList, selectedItem) {
        this.setState({
            categories:selectedList
        })
       

    }

    onSubmit(e){
        e.preventDefault();
        const User ={
            Room_Name: this.state.Full_Name,
            Room_Type:this.state.Email,
            Beds: this.state.Password,
            Floor: this.state.Age,
            Price:this.state.Phone,

        };
        console.log(User);
        axios.post('http://localhost:8089/rooms/add_room', User)
            .then(res => console.log(res.data));
       
    }

    componentDidMount() {
        console.log("test")
        axios.get('http://localhost:8089/category/get_all_categories')
        .then(response => {
          this.setState({ options: response.data });
          console.log(response.data)
          console.log("test11")
        })
      }
    render() {
        return (
            <div className="container">

                <h3>Add Room</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label>Room Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Full_Name}
                            onChange={this.onChangeFullName}

                        />
                    </div>
                    <div className="form-group">
                        <label>Room Type: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Email}
                            onChange={this.onChangeEmail}

                        />
                    </div>
                    <div className="form-group">
                        <label>Beds: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}

                        />
                    </div>

                    <div className="form-group">
                        <label>Floor: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.onChnageAge}

                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Phone}
                            onChange={this.onChangePhone}

                        />
                    </div>
                   
                   
                  

                    <br></br>

                    <div className="form-group">
                        <input type="submit" value="Add Room" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}

export default AddVehicle;