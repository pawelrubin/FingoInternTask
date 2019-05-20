import React from 'react';
import './components/ReservationTable';
import ReservationTable from './components/ReservationTable';

const openHour = 6; 

const closeHour = 22;

const courts = [
  {
    id: 1,
    name: 'Awesome Court'
  },
  {
    id: 2,
    name: 'Court Of Joy'
  },
  {
    id: 3,
    name: 'Tennis Temple'
  },
  {
    id: 4,
    name: 'Courtroom'
  },
  {
    id: 5,
    name: 'Just Court'
  },
  {
    id: 6,
    name: 'The Best Court',
  },
]

// Array of six arrays. 
// Each of them contains reservations data for particular court
let reservations = [
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

  constructor(props) {
    super(props);
    this.state = {
      reservation: {}
    };
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(response => response.json())
      .then((data) => {
        this.setState({ message: data.message });
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
    let courtID = res.courtID;
    // console.log("From App.js:", res);
    reservations[courtID-1].push(res);
  }

  render() {
    const openHours = this.makeHours(openHour, closeHour);
    return (
      <ReservationTable openHours = {openHours} courts = {courts} reservations = {reservations} newReservation={this.newReservation}/>
    );
  }
}

export default App;
