const initialState = {
  isLoading: false,
};

const loadHandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {
        isLoading: true,
      };
    case 'HIDE_LOADER':
      return {
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loadHandlerReducer;
