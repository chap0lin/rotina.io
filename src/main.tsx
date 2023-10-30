import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import GlobalProvider from './contexts/GlobalContextProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <Router/>
    </GlobalProvider>
  </React.StrictMode>,
)
