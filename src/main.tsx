import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes.tsx';
import GlobalProvider from './contexts/GlobalContextProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <Router/>
    </GlobalProvider>
  </React.StrictMode>,
)
