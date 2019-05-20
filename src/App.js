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
const reservations = [
  [
    {
      hour: 6,
      person: "John Smith"
    },
    {
      hour: 7,
      person: "Zygmunt Dzwon"
    },
    {
      hour: 21,
      person: "Tony Stark"
    }
  ],
  [
    {
      hour: 21,
      person: "Sean Pean"
    },
    { 
      hour: 7,
      person: "Gerald"
    }
  ],
  [
    {
      hour: 13,
      person: "Malcolm XD"
    },
    {
      hour: 11,
      person: "Herbie Hancock"
    },
    { 
      hour: 6,
      person: "Hungry Joe"
    },
    { 
      hour: 8,
      person: "Zbigniew Stonoga"
    }
  ],
  [
    {
      hour: 15,
      person: "Mike Portnoy"
    },
    {
      hour: 9,
      person: "Donal Trump"
    },
    { 
      hour: 8,
      person: "Tom Cruise"
    },
    { 
      hour: 6,
      person: "Krzysztof Komeda"
    }
  ],
  [
    {
      hour: 17,
      person: "Frank Zappa"
    },
    {
      hour: 20,
      person: "John Coltrane"
    },
    { 
      hour: 19,
      person: "Beny Golson"
    },
    { 
      hour: 18,
      person: "Guthrie Govan"
    }
  ],
  [
    {
      hour: 14,
      person: "Jan Nowak"
    },
    {
      hour: 11,
      person: "Kubuś Puchatek"
    },
    { 
      hour: 8,
      person: "John Petrucci"
    },
    { 
      hour: 12,
      person: "Johny Cash"
    }
  ],
]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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
     
  render() {
    const openHours = this.makeHours(openHour, closeHour);
    return (
      <ReservationTable openHours = {openHours} courts = {courts} reservations = {reservations}/>
    );
  }
}

export default App;
