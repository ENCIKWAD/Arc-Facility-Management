import { createRouter, createWebHistory } from 'vue-router'
import TenantHome from '../views/tenantHome.vue';
import OwnerHome from '../views/ownerHome.vue';
import AdminHome from '../views/adminHome.vue';
import Login from '../views/login.vue';
import SignUp from '../views/signUp.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/tenant',
    name: 'tenantHome',
    component: TenantHome
  },
  {
    path: '/owner',
    name: 'ownerHome',
    component: OwnerHome
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: AdminHome
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
