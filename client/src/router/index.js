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
import Announcement from '@/views/Announcement.vue';
import Report from '@/views/Report.vue';
import Inbox from '@/views/Inbox.vue';
import DeleteReport from '@/views/DeleteReport.vue';
import ManageAnnouncement from '@/views/ManageAnnouncement.vue';
import AddAnnouncement from '@/views/AddAnnouncement.vue';
import EditAnnouncement from '@/views/EditAnnouncement.vue';
import ManageAccount from '@/views/ManageAccount.vue';
import DeleteAnnouncement from '@/views/DeleteAnnouncement.vue';
import MangeTenant from '@/views/ManageTenant.vue';

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
  },
  {
    path: '/announcement',
    name: 'announcement',
    component: Announcement
  },
  {
    path: '/admin/manageAnnouncement',
    name: 'manageAnnouncement',
    component: ManageAnnouncement
  },
  {
    path: '/admin/addAnnouncement',
    name: 'addAnnouncement',
    component: AddAnnouncement,
  },
  {
    path: '/admin/EditAnnouncement/:id',
    name: 'editAnnouncement',
    component: EditAnnouncement,
  },
  {
    path: '/admin/deleteAnnouncement/:id',
    name: 'deleteAnnouncement',
    component: DeleteAnnouncement
  },
  {
    path: '/admin/manageTenant/',
    name: 'manageTenant',
    component: MangeTenant
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: Inbox
  },
  {
    path: '/inbox/:id',
    name: 'deleteReport',
    component: DeleteReport
  },
  {
    path: '/manageAccount',
    name: 'manageAccount',
    component: ManageAccount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
