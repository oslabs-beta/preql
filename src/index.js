import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import styles from './styles.scss'

render(
  <div>
    <App />
  </div>,
  document.getElementById('app'),
)
