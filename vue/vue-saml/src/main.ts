import { createApp } from 'vue';
import { createIDMesh } from 'idmesh-vue';
import './style.css'
import App from './App.vue'

const app = createApp(App);

app.use(
  createIDMesh({
    domain: '1145141.idmesh.site',
    clientId: '1612410298688342016',
    // authorizeTimeoutInSeconds: 5,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app');
