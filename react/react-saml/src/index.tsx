import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IDMeshProvider } from 'idmesh-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <IDMeshProvider
    domain="1145141.idmesh.site"
    clientId="1612410298688342016"
    authorizeTimeoutInSeconds={5}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </IDMeshProvider>
);
