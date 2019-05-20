const express = require('express');
let router = new express.Router();

const openHour = 6; 
const closeHour = 22;

let reservations =  [
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

let courts = [
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

router.get('/res', (_, res) => {
  res.json({ 
    reservations: reservations,
    courts: courts,
    openHour: openHour,
    closeHour: closeHour
  });
});

router.post('/new', (req, res) => {
  let newRes = req.body;
  let id = newRes.courtID - 1;
  let message = '';
  
  if (reservations[id].some((e) => e.hour === newRes.hour)) {
    message = 'failure';
  } else {
    message = 'success';
    reservations[newRes.courtID - 1].push(newRes);
  }

  res.json({
    reservations: reservations,
    message: message
  })
});

module.exports = router;
