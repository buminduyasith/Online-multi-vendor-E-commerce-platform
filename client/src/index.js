import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateProvider} from "./states/StateProvider"
import reducer, {initialState} from "./states/reducer"
 import {AuthProvider} from "./states/UserProvider"

ReactDOM.render(
  <React.StrictMode>

    <AuthProvider>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    
    </ AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

