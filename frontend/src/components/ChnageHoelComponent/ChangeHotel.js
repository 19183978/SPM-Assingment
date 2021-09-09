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
        const Hoetl ={
            id:"611db3426c5b91332fc70730",
            Hotel_Name: this.state.Full_Name,
            Hotel_Address:this.state.Email,
            Website: this.state.Password,
            NO_Rooms: this.state.Age,
            Price_Max:"200",
            Price_Min:"100",
        };
        console.log(Hoetl);
        axios.put('http://localhost:8089/admin/update_hotel', Hoetl)
            .then(res => console.log(res.data));
       
    }

    componentDidMount() {
        console.log("test")
        axios.get('http://localhost:8089/admin/get_hotelData')
        .then(response => {
          this.setState({ Full_Name: response.data.data[0].Hotel_Name });
          this.setState({ Email: response.data.data[0].Hotel_Address });
          this.setState({ Password: response.data.data[0].Website });
          this.setState({ Age: response.data.data[0].NO_Rooms });
          this.setState({ options: response.data.data });
          console.log(response.data.data)
          console.log("test11")
        })
      }
    render() {
        return (
            <div className="container">

                <h3>Change Hotel</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label>Hotel Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Full_Name}
                            onChange={this.onChangeFullName}

                        />
                    </div>
                    <div className="form-group">
                        <label>Hotel Address: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Email}
                            onChange={this.onChangeEmail}

                        />
                    </div>
                    <div className="form-group">
                        <label>Website: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}

                        />
                    </div>

                    <div className="form-group">
                        <label>Number Of Rooms: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.onChnageAge}

                        />
                    </div>
                  
                   
                   
                  

                    <br></br>

                    <div className="form-group">
                        <input type="submit" value="Change Hotel Details" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}

export default AddVehicle;