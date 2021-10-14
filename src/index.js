import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import styles from './styles.scss'
//import triangles from './pictures/triangles.jpg'

render(
  <div>
    <App />
  </div>,
  document.getElementById('app'),
)
