import React, { Component } from "react";
import {Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import Search from './img/search.svg';

class SearchForm extends Component {

    state = {
      locationsOptions : [],
      city:"",
      guestCounter: 0,
      numberOfAdults : 0,
      numberOfChildrens : 0,
      textSearch : "",
      searchResult : []
    };

  componentWillMount(){
    console.log("Component mount")
    const stays = require("./stays.json");
      var locations = [];
      // Make the list of city we can select
      stays.map((stay) => {
         locations.push({
            "city": stay.city,
            "country": stay.country
          }); 
      });
      const filteredLocations = locations.reduce((acc, current) => {
        const x = acc.find(item => item.city === current.city);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      this.setState({
        locationsOptions: filteredLocations,
        city : filteredLocations[0].city
      });
  }

  handleChangeCity = (e) => this.setState({city : e.target.value});
  
  handleInputChange = (event) => {
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    console.log(value);
    this.setState({
      [name]: value
    }); 
  }

  handleClick = (event) => {
    const name = event.target.name;
    var guestCounter = this.state.guestCounter;
    var numberOfAdults = this.state.numberOfAdults;
    var numberOfChildrens = this.state.numberOfChildrens;

    
    switch (name) {
      case 'addAdults':
        console.log("addAdults");
        numberOfAdults++;
        break
      case 'removeAdults':
        console.log("removeAdults");
        if(numberOfAdults > 0)  numberOfAdults--;
        break
      case 'addChildrens':
        console.log("addChildren");
        numberOfChildrens++
        break;
      case 'removeChildrens':
        console.log("removeChildren");
        if(numberOfChildrens > 0) numberOfChildrens--;
        break
      default: 
        console.log('Error'); 
    }
    guestCounter = numberOfAdults + numberOfChildrens;
    this.setState({
      guestCounter,
      numberOfAdults,
      numberOfChildrens
    });
     
  }

  render() {

      return <Form inline>
          <Form.Control as="select" name="city" id="city-select" onChange={this.handleInputChange} >
            {this.state.locationsOptions.map((stay,index)=>(
              <option value={stay.city} key={index}>{stay.city}, {stay.country}</option>
            ))}
          </Form.Control>
          <div id="guestForm">
           
            <NavDropdown title={(this.state.guestCounter)+" Guests"} id="basic-nav-dropdown" >
              <div className="allCounter justify-content-center ">
                <div>Adults</div>
                <div>Ages 13 or above</div>
                  <Form inline>
                    <Button variant="outline-secondary" name="removeAdults" onClick={this.handleClick}>-</Button>
                    <div>{this.state.numberOfAdults}</div>
                    <Button variant="outline-secondary" name="addAdults" onClick={this.handleClick}>+</Button>
                  </Form>
                  <NavDropdown.Divider />
                  <div>Childrens</div>
                  <div>Ages 2 - 12</div>
                  <Form inline>
                    <Button variant="outline-secondary" name="removeChildrens" onClick={this.handleClick}>-</Button>
                    <div>{this.state.numberOfChildrens}</div>
                    <Button variant="outline-secondary" name="addChildrens" onClick={this.handleClick}>+</Button>
                  </Form>
              </div>
            </NavDropdown>
          </div>

          <FormControl name="textSearch" type="text" onChange={this.handleInputChange} value={this.state.textSearch}/>
          <Button variant="primary" name="search" onClick={() => this.props.onSearch(this.state.city, this.state.guestCounter)}><img src={Search} alt="search"/></Button>
        </Form>
      
    }
}

export default SearchForm