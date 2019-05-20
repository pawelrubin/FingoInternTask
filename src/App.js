import React from 'react';
import './components/ReservationTable';
import ReservationTable from './components/ReservationTable';
import Statistics from './components/Statistics';
import { LinearProgress } from '@material-ui/core';
import FailDialog from './components/dialogs/FailDialog';
// Array of six arrays. 
// Each of them contains reservations data for particular court
let reservationsArray = [
  [
    {
      courtID: 1,
      hour: 6,
      person: "John Smith"
    },
    {
      courtID: 1,
      hour: 7,
      person: "Zygmunt Dzwon"
    },
    {
      courtID: 1,
      hour: 21,
      person: "Tony Stark"
    }
  ],
  [
    {
      courtID: 2,
      hour: 21,
      person: "Sean Pean"
    },
    { 
      courtID: 2,
      hour: 7,
      person: "Gerald"
    }
  ],
  [
    {
      courtID: 3,
      hour: 13,
      person: "Malcolm XD"
    },
    {
      courtID: 3,
      hour: 11,
      person: "Herbie Hancock"
    },
    { 
      courtID: 3,
      hour: 6,
      person: "Hungry Joe"
    },
    { 
      courtID: 3,
      hour: 8,
      person: "Zbigniew Stonoga"
    }
  ],
  [
    {
      courtID: 4,
      hour: 15,
      person: "Mike Portnoy"
    },
    {
      courtID: 4,
      hour: 9,
      person: "Donal Trump"
    },
    { 
      courtID: 4,
      hour: 8,
      person: "Tom Cruise"
    },
    { 
      courtID: 4,
      hour: 6,
      person: "Krzysztof Komeda"
    }
  ],
  [
    {
      courtID: 5,
      hour: 17,
      person: "Frank Zappa"
    },
    {
      courtID: 5,
      hour: 20,
      person: "John Coltrane"
    },
    { 
      courtID: 5,
      hour: 19,
      person: "Beny Golson"
    },
    { 
      courtID: 5,
      hour: 18,
      person: "Guthrie Govan"
    }
  ],
  [
    {
      courtID: 6,
      hour: 14,
      person: "Jan Nowak"
    },
    {
      courtID: 6,
      hour: 11,
      person: "Kubuś Puchatek"
    },
    { 
      courtID: 6,
      hour: 8,
      person: "John Petrucci"
    },
    { 
      courtID: 6,
      hour: 12,
      person: "Johny Cash"
    }
  ],
]

class App extends React.Component {

  state = {
    courts: [],
    reservations: [],
    openHour: null,
    closeHour: null,
    fetched: false,
    failDialog: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('/api/res')
    .then(response => response.json())
    .then((data) => {
        this.setState(data);
        this.setState({fetched: true})
    })
    .catch(error => {
      console.log("Api error: " + error);
    });
  }

  sendNewReservation = (res) => {
    console.log(res);
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
        this.setState({ failDialog: true });
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
    if (this.state.fetched) { 
      const openHours = this.makeHours(this.state.openHour, this.state.closeHour);
      return (
        <div>
          <ReservationTable openHours = {openHours} courts = {this.state.courts} reservations = {this.state.reservations} newReservation={this.newReservation}/>
          <Statistics/>
          <FailDialog 
            onClose={() => this.setState({failDialog: false})}
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
