import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ReserveDialog extends React.Component {

  render() {

    const { onClose, show, onSubmit } = this.props;
    
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
              To reserve the court, please enter your name.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Your Name"
              type="name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary">
              Reserve
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

}

ReserveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default (ReserveDialog);