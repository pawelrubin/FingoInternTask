import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class DetailsDialog extends React.Component {

  render() {

    const { onClose, show, reservation } = this.props;
    
    return (
      <div>
        <Dialog
          open={show}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reserve</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The court is reserved by { (reservation != null) ? reservation.person : ''}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


DetailsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  reservation: PropTypes.object
};

export default (DetailsDialog);