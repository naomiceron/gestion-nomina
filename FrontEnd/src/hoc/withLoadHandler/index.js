import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const withLoadHandler = (WrappedComponent) => (props) => {
  const useStyles = makeStyles(() => ({
    backDrop: {
      zIndex: 999,
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Backdrop open={props.isLoading} className={classes.backDrop}>
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
      </Backdrop>
      <WrappedComponent {...props} />
    </div>
  );
};

withLoadHandler.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadHandler.isLoading,
});

const mapDispatchToProps = () => ({
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLoadHandler,
);
