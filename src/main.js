import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Certifique-se de que o pacote está instalado
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Configuração do Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

// Criação do app Vue
createApp(App).use(router).use(vuetify).mount('#app');
