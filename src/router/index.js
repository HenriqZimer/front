import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/Login/LoginForm.vue'; // Componente de login
import Home from '../views/Home.vue';
import UsuarioView from '../views/UsuarioView.vue';
import CarroView from '../views/CarroView.vue';
import AluguelView from '../views/AluguelView.vue';
import PagamentoView from '../views/PagamentoView.vue';
import UsuarioList from '../components/Usuario/UsuarioList.vue';
import UsuarioForm from '../components/Usuario/UsuarioForm.vue';
import CarroForm from '../components/Carro/CarroForm.vue';
import CarroList from '../components/Carro/CarroList.vue';
import AluguelForm from '../components/Aluguel/AluguelForm.vue';
import PagamentoForm from '../components/Pagamento/PagamentoForm.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginForm }, // Rota de login

  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { requiresAuth: true }, // Remover temporariamente para testar
  },

  // Rotas de usuários
  { path: '/usuarios', name: 'Usuarios', component: UsuarioView },
  { path: '/usuarios', name: 'UsuarioList', component: UsuarioList },
  { path: '/usuarios/novo', name: 'NovoUsuario', component: UsuarioForm },
  { path: '/usuarios/:id/editar', name: 'UsuarioEdit', component: UsuarioForm, props: true },

  // Rotas de carros
  { path: '/carros', name: 'Carros', component: CarroView },
  { path: '/carros', name: 'CarroList', component: CarroList },
  { path: '/carros/novo', name: 'CarroForm', component: CarroForm },
  { path: '/carros/:id/editar', name: 'CarroEdit', component: CarroForm, props: true },

  // Rotas de aluguéis
  { path: '/alugueis', name: 'Alugueis', component: AluguelView },
  { path: '/alugueis/novo', name: 'NovoAluguel', component: AluguelForm },

  // Rotas de pagamentos
  { path: '/pagamentos', name: 'Pagamentos', component: PagamentoView },
  { path: '/pagamentos/novo', name: 'NovoPagamento', component: PagamentoForm },

  { path: '/:catchAll(.*)', redirect: '/login' }, // Qualquer rota inválida redireciona para login
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Temporariamente remover a verificação de autenticação para testar
router.beforeEach((to, from, next) => {
  next(); // Permitir todas as rotas, sem autenticação
});

export default router;
