import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EditRole from '../views/role/EditRole.vue'
import RoleList from '../views/role/RoleList.vue'
import Employees from '../views/employee/Employees.vue'
import EditEmployees from '../views/employee/EditEmployees.vue'
import Manage from '../views/manageEmployees/Manage.vue'
import ManageList from '../views/manageEmployees/ManageList.vue'
import DefendManage from '../views/defendProductTable/DefendManage.vue'
import HealthExaminationTable from '../views/HealthExaminationProgram/HealthExaminationTable.vue'
import ReportAndRecord from '../views/HealthExaminationProgram/ReportAndRecord.vue'
import ShowTables from '../views/HealthExaminationProgram/ShowTables.vue'
import SuspectedTable from '../views/HealthExaminationProgram/SuspectedTable.vue'
import template from '../views/template.vue'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      { path: '/role/create', component: EditRole},
      { path: '/role/edit/:id', component: EditRole, props:true },
      { path: '/role/list', component: RoleList},
      
      { path: '/role/createemployees', component: EditEmployees},
      { path: '/role/createemployees/:id', component: EditEmployees, props:true },
      { path: '/role/employees', component: Employees},

      { path: '/role/manage', component: Manage},
      { path: '/role/manage/:id', component: Manage, props:true },
      { path: '/role/managelist', component: ManageList},
    ]
  },
  {
    path:'/defend',
    name:'DefendManage',
    component:DefendManage
  },
  {
    path:'/HealthExaminationTable',
    name:'HealthExaminationTable',
    component:HealthExaminationTable
  },
  {
    path:'/ShowTables',
    name:'ShowTables',
    component: ShowTables
  },
  {
    path:'/SuspectedTable',
    name:'SuspectedTable',
    component: SuspectedTable
  },
  {
    path:'/ReportAndRecord',
    name:'ReportAndRecord',
    component: ReportAndRecord
  },
  {
    path:'/template',
    name:'template',
    component: template
  }
]

const router = new VueRouter({
  routes
})

export default router
