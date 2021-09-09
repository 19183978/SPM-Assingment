import React, { Component} from 'react';
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
        categories :[]

    };
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
      <h1>Rooms</h1>
      {this.state.options.length > 0 && this.state.options.map((item, index) => (
        
        <div key={index} className="card mb-3">
          <div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}> 
          
            <h4> Room Name : {item.Room_Name}</h4>
            <h4> Room Type : {item.Room_Type}</h4>
            <h4> Beds : {item.Beds}</h4>
            <h4> Floor : {item.Floor}</h4>
            <h4> Price : {item.Price}</h4>
            </div>
          </div>
       
      ))}
    </div>
  )
}
}


export default GetallCategories;