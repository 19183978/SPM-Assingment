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
            Full_Name: this.state.Full_Name,
            Email:this.state.Email,
            Password: this.state.Password,
            Age: this.state.Age,
            Phone:this.state.Phone,
            Sex:this.state.Sex,
        };
        console.log(User);
        axios.post('http://localhost:8089/user/add_user', User)
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

                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label>Full Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Full_Name}
                            onChange={this.onChangeFullName}

                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Email}
                            onChange={this.onChangeEmail}

                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}

                        />
                    </div>

                    <div className="form-group">
                        <label>Age: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.onChnageAge}

                        />
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Phone}
                            onChange={this.onChangePhone}

                        />
                    </div>
                    <div className="form-group">
                        <label>Sex: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Sex}
                            onChange={this.onChangeSex}

                        />
                    </div>
                   
                  

                    <br></br>

                    <div className="form-group">
                        <input type="submit" value="Add Vehicle" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}

export default AddVehicle;