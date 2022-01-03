import axios from 'axios';
import reduxStore from './store';
import withMessageHandlerActions from './hoc/withMessageHandler/actions';
import withLoaderHandlerActions from './hoc/withLoadHandler/actions';

const instance = axios.create({
  baseURL: "https://swift-lizard-carpet.glitch.me/",
  timeout: 3000,
});
instance.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
instance.defaults.headers.common.Accept = 'application/vnd.api+json';

const { dispatch } = reduxStore;
 
///hoc
const errorHandler = (error) => {
  dispatch(withMessageHandlerActions.showMessage(error.message, 'error'));
  dispatch(withLoaderHandlerActions.hideLoader());
  return Promise.reject(error);
};

const successHandler = (response) => {
  dispatch(withLoaderHandlerActions.hideLoader());
  return response;
};

instance.interceptors.request.use(
  (request) => {
    dispatch(withLoaderHandlerActions.showLoader());
    return request;
  },
  (error) => errorHandler(error),
);

instance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

export default instance;
