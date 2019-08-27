import React from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReserveDialog from './dialogs/ReserveDialog';
import DetailsDialog from './dialogs/DetailsDialog';
import TableButton from './TableButton';

class ReservationTable extends React.Component {
  
  state = {
    openDetails: false,
    openReserve: false,
    reservation: {}
  };

  openDialog = () => {
    if (this.state.reservation.person === "" || this.state.reservation === undefined) {
      this.setState(() => ({ openReserve: true })); 
    } else {
      this.setState(() => ({ openDetails: true })); 
    }
  }

  closeDialog = () => {
    this.setState(() => ({
      openDetails: false,
      openReserve: false,
      reservation: {}
    }))
  }

  setChosenRes = (res) => {    
    this.setState(() => ({
      reservation: res
    }), () => {
      this.openDialog();
    })
  }

  // After receiving person's name of a new reservation, we will send the data to the parent Component. 
  createReservation = (name) => {
    this.props.newReservation({
      courtID: this.state.reservation.courtID,
      hour: this.state.reservation.hour,
      person: name
    })
  }

  render() {
    const openHours = this.props.openHours;
    const courts = this.props.courts;
    const reservations = this.props.reservations;

    return (
      <Paper style={{overflow: 'auto', marginBottom: 8}}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Hours</CustomTableCell>
              {courts.map((court) => (
                <CustomTableCell align="center" key={court.id}> {court.name}</CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {openHours.map((openHour) => (
              <TableRow key={openHour.id}>
                <CustomTableCell align="center">{openHour.interval}</CustomTableCell>
                {courts.map((court) => {
                  let res = reservations[court.id - 1].find((e) => e.hour === openHour.id);
                  let taken = (res != null) ? true : false
                  if (res == null) {
                    res = {
                      courtID: court.id,
                      hour: openHour.id,
                      person: ''
                    }
                  }
                  // console.log("From ReservationTable.js: ", res);
                  return (
                    <CustomTableCell key={court.id} align="center">
                      <TableButton 
                        reservation={res} 
                        setChosenRes={this.setChosenRes} 
                        child={ taken ? "taken" : "free" }>
                      </TableButton>
                    </CustomTableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ReserveDialog 
          show = {this.state.openReserve}
          onClose = {this.closeDialog}
          createReservation = {this.createReservation}
        />

        <DetailsDialog
          show = {this.state.openDetails}
          onClose = {this.closeDialog}
          reservation = {this.state.reservation}
        />

      </Paper>

    );
  }
}

const CustomTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    fontSize: 13,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    backgroundColor: '#e0e0e0',
    fontSize: 14
  },
}))(TableCell);


export default (ReservationTable);
