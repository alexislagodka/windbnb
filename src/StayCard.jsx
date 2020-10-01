import React, {Component} from "react";
import {Card, Badge} from "react-bootstrap";
import Star from "./img/star.svg";

class StayCard extends Component {
   
    
    render() {
        const {stay, index} = this.props;

        return <Card  style={{ width: '395px'}} className="stayCard m-5" key={index} >
            <Card.Img  variant="top" src={stay.photo} alt={stay.title} style={{ height: '269px' }}/>
            <Card.Body>
                
                <Card.Subtitle className="d-flex justify-content-around">
                    {stay.superHost ? <div><Badge pill variant="secondary">SUPER HOST</Badge></div> : ""}
                    <div>{stay.type}, {stay.beds} beds</div>
                    <div ><img src={Star} alt="rating"></img> {stay.rating}</div>
                </Card.Subtitle>
                <Card.Text>{stay.title}</Card.Text>
            </Card.Body>
        </Card>
        
    }
}

export default StayCard