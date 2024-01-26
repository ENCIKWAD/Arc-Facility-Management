import { createRouter, createWebHistory } from 'vue-router'
import TenantHome from '../views/TenantHome.vue';
import OwnerHome from '../views/OwnerHome.vue';
import AdminHome from '../views/AdminHome.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import NotAllowed from '@/views/NotAllowed.vue';
import ManageFacility from '@/views/ManageFacility.vue';
import AddFacility from '@/views/AddFacility.vue';
import Facility from '@/views/Facility.vue';
import EditFacility from '@/views/EditFacility.vue';
import DeleteFacility from '@/views/DeleteFacility.vue';

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
  {
    path: '/owner/manageFacility',
    name: 'manageFacility',
    component: ManageFacility,
  },
  {
    path: '/owner/addFacility',
    name: 'addFacility',
    component: AddFacility,
  },
  {
    path: '/owner/facility/:id',
    name: 'ownerFacility',
    component: Facility
  },
  {
    path: '/owner/deleteFacility/:id',
    name: 'deleteFacility',
    component: DeleteFacility
  },
  {
    path: '/tenant/facility/:id',
    name: 'tenantFacility',
    component: Facility
  },
  {
    path: '/owner/editFacility/:id',
    name: 'editFacility',
    component: EditFacility
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
