import React from 'react';
import SearchForm from './SearchForm';
import './App.css';
import StayCard from './StayCard';
import {Navbar, Nav} from 'react-bootstrap';
import Logo from './img/triangle.svg';


class App extends React.Component {

 staysJson = require('./stays.json');
 
 state = {
   stays : this.staysJson,
   numberOfStays : 0
 }

 componentWillMount(){
  const nbOfStays = this.state.stays.length;
  console.log(nbOfStays);
  this.setState({numberOfStays: nbOfStays});
 }

 handleSubmit = (city, guestCounter) => {
  console.log("search");
  //const {city, guestCounter} = this.state;
  console.log(city);
  var stays = require("./stays.json");
  var results = [];
  stays.map( stay => {
    if (city === stay.city && guestCounter <= stay.maxGuests) {
      results.push(stay);
    }
  });
  console.log(results);
  
  this.setState({
    stays : results,
    numberOfStays : results.length
  });
}

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg" className="justify-content-between">
        <Navbar.Brand> 
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
              windbnb
            </Navbar.Brand>
            <Nav>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <SearchForm onSearch={this.handleSubmit}/>
              </Navbar.Collapse>
            </Nav>
        </Navbar>
        <div id="main" className="m-5" >
          <div className="d-flex justify-content-between">
            <h2>Stays in Finland</h2>
          <p><small>{this.state.numberOfStays} stays</small></p>
          </div>
          <div className="d-flex flex-wrap  align-content-stretch justify-content-center ">
            {this.state.stays.map((stay,index) => (
              <StayCard stay={stay} index={index} />
            ))}
          </div>  
          </div>
          <Navbar>
          <Navbar.Text>
            By Alexis Lagodka
          </Navbar.Text>
          </Navbar>
      </div>
    );
  }
}

export default App;
