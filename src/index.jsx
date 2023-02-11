import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from "./auth/AuthContextProvider";
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

defineCustomElements(window);