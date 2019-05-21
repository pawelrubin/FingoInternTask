import React from 'react';
import './components/ReservationTable';
import ReservationTable from './components/ReservationTable';
import Statistics from './components/Statistics';
import { LinearProgress } from '@material-ui/core';
import FailDialog from './components/dialogs/FailDialog';
class App extends React.Component {

  state = {
    courts: [],
    reservations: [],
    openHour: null,
    closeHour: null,
    resFetched: false,
    failDialog: false,
    stats: {},
    numForNames: {}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('/api/res')
    .then(response => response.json())
    .then((data) => {
        this.setState(() => ({...data, resFetched: true}))
    })
    .catch(error => {
      console.log("Api error: " + error);
    });
  }

  fetchStats = () => {
    return fetch('/api/stats')
      .then(response => response.json())
      .then((data) => {
        this.setState(() => data);
      })
      .catch((error) => {
      console.log("Api error: " + error);
      })
  }

  sendNewReservation = (res) => {
    fetch('/api/new', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(res)
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState(data);
      if (data.message !== 'success') {
        this.setState(() => ({ failDialog: true }));
      } else {
        this.fetchStats(); // Let's update statistics
      }
    })
    .catch(error => {
      console.log("Api error: " + error);
    });
  }
  
  makeHours = (openHour, closeHour) => 
    Array(closeHour - openHour)
      .fill(openHour)
      .map((hour, i) => ({
        id: hour + i,
        interval: (hour + i) + "-" + (hour + i + 1)
      }))
     
  newReservation = (res) => {
    this.sendNewReservation(res);
  }

  render() {
    if (this.state.resFetched) { 
      const openHours = this.makeHours(this.state.openHour, this.state.closeHour);
      return (
        <div>
          <ReservationTable 
            openHours = {openHours}
            courts = {this.state.courts}
            reservations = {this.state.reservations} 
            newReservation={this.newReservation}
          />
          <Statistics 
            fetchData={this.fetchStats}
            courts={this.state.courts}
            stats={this.state.stats}
            numForNames={this.state.numForNames}
          />
          <FailDialog 
            onClose={() => this.setState(() => ({failDialog: false}))}
            show={this.state.failDialog}
          />
        </div> 
      ) 
    } else {
      return (<LinearProgress/>)
    }

  }
}

export default App;
