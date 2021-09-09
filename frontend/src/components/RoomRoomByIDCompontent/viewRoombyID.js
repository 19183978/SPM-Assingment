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
            categories :[],
            idx:''

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
            id:this.state.idx,
            Room_Name: this.state.Full_Name,
            Room_Type:this.state.Email,
            Beds: this.state.Password,
            Floor: this.state.Age,
            Price:this.state.Phone,

        };
        console.log(User);
        axios.post('http://localhost:8089/rooms/updateroom', User)
            .then(res => console.log(res.data));
       
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        const Room={
            id:this.props.match.params.id
        }
        axios.post('http://localhost:8089/rooms/get_room_dataByID',Room)
        .then(response => {
      
          this.setState({ Full_Name: response.data.data[0].Room_Name });
          this.setState({ Email: response.data.data[0].Room_Type });
          this.setState({ Password: response.data.data[0].Beds });
          this.setState({ Age: response.data.data[0].Floor });
          this.setState({ Phone: response.data.data[0].Price });
          this.setState({ idx: response.data.data[0]._id });
         
          console.log(response.data,"hsh")
          console.log("test1221")
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
                        <input type="submit" value="Update Room" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}

export default AddVehicle;