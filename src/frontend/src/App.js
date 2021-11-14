import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Button} from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import {GiCoffeePot} from 'react-icons/gi';
import {BiCoffee} from 'react-icons/bi';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      coffeeStatus : "OFF",
      beforeCoffeeStatus : "OFF", 
      seconds: 12 ,
      remainingCups : 0
    };
    this.timer = 0;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.takePot = this.takePot.bind(this);
    this.placePot = this.placePot.bind(this);
    this.fillTank = this.fillTank.bind(this);
    this.setDone = this.setDone.bind(this);
    this.startTime  = this.startTime.bind(this);
    this.countDown = this.countDown.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.showTimeAndCoffee = this.showTimeAndCoffee.bind(this);
  }
        
  showTimeAndCoffee(){
    return (<div>
      <Card>
        <Card.Title>cups: {this.state.remainingCups}</Card.Title>
        <Card.Body>
          <Card.Text>
          {this.state.coffeeStatus == "BREWING" || this.state.beforeCoffeeStatus == "BREWING" ? ("Kalan zaman: " + this.state.seconds) : "Kaynamıyor"}          
          </Card.Text>
          <h1>
          <GiCoffeePot/> <BiCoffee/>
        </h1>
        </Card.Body>
        </Card>
    </div>);
  }

  stopTime(){
    clearInterval(this.timer);
    console.log("Time is STOPPED! Remaining brewing time: ", this.state.seconds);
  }

  countDown(){
    if(this.state.seconds > 0){
    this.setState((state) =>({seconds : state.seconds - 1}));
    console.log("Remaining brewing time: ", this.state.seconds);
    this.setState((state) =>({remainingCups : state.remainingCups + 1}));
    console.log("Remaining new cups: " , this.state.remainingCups);
    } else{
      clearInterval(this.timer);
      console.log("Remaining brewing time: ", this.state.seconds, " and timer is stopped.");
      this.setDone();
    }
  }

  startTime(){
    console.log("startTime() funciton is running...");
    this.timer = setInterval(this.countDown, 1000);
  }

  async start(){
    console.log("Start");
    await fetch('http://localhost:8080/maker/start',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "BREWING"
          });
          this.startTime();
        }
    })
    .catch(err => console.log(err));
  }

  async stop(){
    console.log("Stop");
    await fetch('http://localhost:8080/maker/stop',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          if(this.state.coffeeStatus ==  "BREWING"){
            // stop the timer 
            this.stopTime();
          }
          this.setState({
            coffeeStatus : "OFF"
          });
        }
    })
    .catch(err => console.log(err))
  
  }
  
  async takePot(){
    console.log("Take Pot");
    await fetch('http://localhost:8080/maker/takePot',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          if(this.state.coffeeStatus ===  "BREWING"){
            this.setState({beforeCoffeeStatus : "BREWING"});
          // stop the timer 
          this.stopTime();
          }
          this.setState({
            coffeeStatus : "WAITING"
          });
        }
    })
    .catch(err => console.log(err))

    if(this.state.remainingCups > 0){
      this.setState((state) =>({remainingCups : state.remainingCups - 1}));
      console.log("Remainging cups after take pot: " , this.state.remainingCups);
    }
  
  }

  async placePot(){
    console.log("Place Pot");
     await fetch('http://localhost:8080/maker/placePot',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          if(this.state.beforeCoffeeStatus ==  "BREWING"){
            console.log("BURAYA GELDİM ŞİMDİ STATE GÜNCELLENECEK");
            this.setState({coffeeStatus : "BREWING", beforeCoffeeStatus : "WAITING"});
            // start the timer 
            this.startTime();
          } else{
          //TODO Burayı düzlet!!!
          this.setState({
            coffeeStatus : "DONE"
          });

        }
    }
  })
    .catch(err => console.log(err))
  
  }

  async fillTank(){
    console.log("Fill Tank");
    await fetch('http://localhost:8080/maker/fillTank',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "FILL WITH WATER"
          });
        }
    })
    .catch(err => console.log(err))
  
  }

  async setDone(){
    console.log("Set Done");
    await fetch('http://localhost:8080/maker/setDone',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "DONE"
          });
        }
    })
    .catch(err => console.log(err));
  
  }

render(){
    return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <this.showTimeAndCoffee stat={this.state.coffeeStatus}/>
        <h3>Status: {this.state.coffeeStatus}</h3>
        <ButtonGroup>
        <Button className="Button" onClick={this.start}>Start</Button>
        <Button className="Button" onClick={this.stop}>Stop</Button>
        <Button className="Button" onClick={this.takePot}>Take Pot</Button>
        <Button className="Button" onClick={this.placePot}>Place Pot</Button>
        <Button className="Button" onClick={this.fillTank}>Water</Button>
        </ButtonGroup>
      </header>
    </div>
    );
  }
}

export default App;
