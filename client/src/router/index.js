import { createRouter, createWebHistory } from 'vue-router'
import TenantHome from '../views/TenantHome.vue';
import OwnerHome from '../views/OwnerHome.vue';
import AdminHome from '../views/AdminHome.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import NotAllowed from '@/views/NotAllowed.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    props: true
  },
  {
    path: '/notAllowed',
    name: 'notAllowed',
    component: NotAllowed,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
    props: true
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
