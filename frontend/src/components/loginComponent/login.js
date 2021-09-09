import React, { Component } from 'react';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';

class AddVehicle extends Component {
    constructor(props) {
        super(props);

        this.onChangeCode=this.onChangeCode.bind(this);
        this.OnchnageAmmount=this.OnchnageAmmount.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeSize=this.onChangeSize.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     

        
        this.state = {

            options: [],
            Code: '',
            Ammount: '',
            name: '',
            size: '',
            categories :[]

        };
    }

    onChangeCode(e) {
        this.setState({
            Code: e.target.value
        })
    }

    OnchnageAmmount(e) {
        this.setState({
            Ammount: e.target.value
        })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeSize(e) {
        this.setState({
            size: e.target.value
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
            Email: this.state.Code,
            Password:this.state.Ammount,
           
        };
        console.log(User);
        axios.post('http://localhost:8089/user/login', User)
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
                        <label>Email: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Code}
                            onChange={this.onChangeCode}

                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Ammount}
                            onChange={this.OnchnageAmmount}

                        />
                    </div>

                  
             
                    <br></br>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}

export default AddVehicle;