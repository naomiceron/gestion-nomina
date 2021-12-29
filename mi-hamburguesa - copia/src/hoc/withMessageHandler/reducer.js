const initialState = {
  showAlert: false,
  message: '',
  severity: 'success',
};

const messageHandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {
        message: action.message,
        severity: action.severity,
        showAlert: true,
      };
    case 'HIDE_MESSAGE':
      return {
        ...state,
        showAlert: false,
      };

    default:
      return state;
  }
};

export default messageHandlerReducer;
