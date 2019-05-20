import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class FailDialog extends React.Component {

  render() {

    const { onClose, show } = this.props;

    return (
      <div>
        <Dialog
          open={show}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Error</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The court is already reserved...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

FailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default (FailDialog);