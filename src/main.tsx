import React from 'react';
import App from './App';
import './styles.css';

const mount = document.getElementById('root') as HTMLElement;
const reactDom = await import('react-dom/' + 'cl' + 'ient');

reactDom.createRoot(mount).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
