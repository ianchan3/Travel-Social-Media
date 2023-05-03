import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import {GoogleOAuthProvider} from '@react-oauth/google';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="887814228853-0v5p9b6336a511bi2k01a22suiurk149.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root')
);