import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./app/App";
import "mini.css"
import {Provider} from "react-redux";
import configureStore from './redux/store';
import { syncHistoryWithStore } from 'react-router-redux';
import {browserHistory} from 'react-router';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'));
