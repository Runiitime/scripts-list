import * as React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import rootReducer from './store'
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);