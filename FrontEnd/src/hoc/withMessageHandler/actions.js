const withMessageHandlerActions = {
  showMessage: (message, severity) => (

    (dispatch) => {
      setTimeout(() => {
        dispatch({
          type: 'HIDE_MESSAGE',
        });
      }, 3000);

      dispatch({
        type: 'SHOW_MESSAGE',
        message,
        severity,
      });
    }
  ),
  hideMessage: () => ({
    type: 'HIDE_MESSAGE',
  }),
};

export default withMessageHandlerActions;
