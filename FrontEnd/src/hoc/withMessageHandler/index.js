import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

const withMessageHandler = (WrappedComponent) => (props) => (
  <>
    <Snackbar
      open={props.showAlert}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.severity}
        variant="filled"
      >
        { props.message }
      </Alert>
    </Snackbar>
    <WrappedComponent {...props} />
  </>
);

withMessageHandler.propTypes = {
  organizationTypes: PropTypes.arrayOf(PropTypes.number),
};

const mapStateToProps = (state) => ({
  showAlert: state.messageHandler.showAlert,
  severity: state.messageHandler.severity,
  message: state.messageHandler.message,
});

const mapDispatchToProps = () => ({
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMessageHandler,
);
