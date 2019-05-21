import React from 'react';
import { LinearProgress, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class Statistics extends React.Component {

  state = {
    fetched: false
  }

  componentDidMount() {
    this.props.fetchData()
    .then(() => {
      this.setState({fetched: true});
    })
  }

  render() {
    if (this.state.fetched) {
      return (
        <div>
          <Paper style={{overflow: 'auto', marginBottom: 8}}>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell align="center">Stats</CustomTableCell>
                {this.props.courts.map((court) => (
                  <CustomTableCell align="center" key={court.id}>{court.name}</CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.props.stats).map((statKey, _) => {
                let stat = this.props.stats[statKey];
                let statArr = Object.keys(stat).map((key) => {
                  return stat[key];
                })
                let avg = (statArr.reduce((a,b) => a + b, 0) / statArr.length).toFixed(0);
                return(
                  <TableRow key={statKey}>
                    <CustomTableCell align="center">
                      <p>{statKey} </p>
                      <p>total: {avg}%</p>
                    </CustomTableCell>
                    {Object.keys(stat).map((court, _) => {
                      return(
                        <CustomTableCell key={court} align="center">{stat[court].toFixed(0)}%</CustomTableCell> 
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <Paper style={{overflow: 'auto'}}>
        <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell align="center">Names</CustomTableCell>
                <CustomTableCell align="center">Number of reservations</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.props.numForNames)
                .sort((a, b) => (this.props.numForNames[b]- this.props.numForNames[a])) // Sorting in descending order by values.
                .map((name, _) => {
                  return (
                    <TableRow key={name}>
                      <CustomTableCell align="center">
                      {name}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                      {this.props.numForNames[name]}
                      </CustomTableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </Paper>
        </div>
      )
    } else {
      return (<LinearProgress/>)
    }
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

Statistics.propTypes = {
  fetchData: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  numForNames: PropTypes.object.isRequired,
  courts: PropTypes.array.isRequired
}

export default (Statistics);