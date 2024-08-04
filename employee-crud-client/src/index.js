import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './App.css';

// The root element where the React app will be rendered
const rootElement = document.getElementById('root');

// Render the App component inside a Router to enable routing
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  rootElement
);

