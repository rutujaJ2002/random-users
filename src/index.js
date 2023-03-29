import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./store/index";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

/*
Two ways to fetch data in redux:
1. Async thunk function - slightly older and more complicated way
2. Redxu toolkit query -  newer and fancier way
*/