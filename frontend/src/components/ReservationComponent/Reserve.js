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
        const Reservation ={
            User_Name: "User",
            Room_ID:this.state.categories[0],
            From_Date: this.state.Code,
            To_Date:this.state.Ammount,
            Price :"Price",
            Status:"Status"
        };
        console.log(Reservation);
        axios.post('http://localhost:8089/reservation/make_reservation', Reservation)
            .then(res => console.log(res.data));
       
    }

    componentDidMount() {
        console.log("test")
        axios.get('http://localhost:8089/rooms/get_all_rooms')
        .then(response => {
          this.setState({ options: response.data });
          console.log(response.data)
          console.log("test11")
        })
      }
    render() {
        return (
            <div className="container">


                <h3>Make Reservation</h3>
                <form onSubmit={this.onSubmit}>

                <div className="form-group">
                        <label>Room: </label>
                        <Multiselect
                            options={this.state.options}
                            selectedValues={this.state.selectedValue}
                            onSelect={this.onSelect}
                            onRemove={this.onRemove}
                            displayValue="Room_Name"
                            value={this.state.selectedValue}
                            onSelect={this.onSelect}
                        />
                    </div>
                    <div className="mb-3">
                        <label>From Date: </label>
                        <input
                            type="date"
                            className="form-control"
                            value={this.state.Code}
                            onChange={this.onChangeCode}

                        />
                    </div>
                    <div className="form-group">
                        <label>To Date: </label>
                        <input
                            type="date"
                            className="form-control"
                            value={this.state.Ammount}
                            onChange={this.OnchnageAmmount}

                        />
                    </div>

               
                   

                    <br></br>

                    <div className="form-group">
                        <input type="submit" value="Make Reservation" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}

export default AddVehicle;