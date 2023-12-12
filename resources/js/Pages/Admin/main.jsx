import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import React from 'react';

// ----------------------------------------------------------------------

function Main(){
  return <HelmetProvider>
  <BrowserRouter basename='/admin'>
    <Suspense>
      <App />
    </Suspense>
  </BrowserRouter>
</HelmetProvider>
}


export default Main;


