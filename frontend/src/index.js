import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css";
import "assets/index.scss";
import "assets/custom.scss";
import '../node_modules/leaflet-draw/dist/leaflet.draw.css';
import '../node_modules/leaflet-easybutton/src/easy-button.css';
import '../node_modules/leaflet/dist/leaflet.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);