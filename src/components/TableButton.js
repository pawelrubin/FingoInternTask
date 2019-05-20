import React from 'react';
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types';

class TableButton extends React.Component {

  handleClick = () => {
    console.log(this.props.reservation);
    this.props.setChosenRes(this.props.reservation);
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        {this.props.child}
      </Button>
    )
  }
}

TableButton.propTypes = {
  reservation: PropTypes.object,
  setChosenRes: PropTypes.func,
  child: PropTypes.string
}

export default (TableButton);

