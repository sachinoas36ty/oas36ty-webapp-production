import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import pages from './routes/pages'
import store from '@/store'
// let arr = []

var pa = [...pages]
let arr = [];
// let items = []

let data = localStorage.getItem('privileges') ? JSON.parse(localStorage.getItem('privileges')).masters : []
if(data.length > 0){

  data.forEach(x => {
    if(x.all_master_id === 1){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Leads');
        // pa.splice(index,1)
        // pa[index].redirect = 'misc-not-authorized'
        pa[index].meta.PrivilegeSet = false

      }
    }
    if(x.all_master_id === 2){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Tasks');
        // pa.splice(index,1)
        // pa[index].redirect = 'misc-not-authorized'
        pa[index].meta.PrivilegeSet = false

      }
    }
    if(x.all_master_id === 3){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Mails');
        // pa.splice(index,1)
        // pa[index].redirect = 'misc-not-authorized'
        pa[index].meta.PrivilegeSet = false

      }
    }

    if(x.all_master_id === 6){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Clients');
        // pa.splice(index,1)
        pa[index].meta.PrivilegeSet = false
      }
    }
    if(x.all_master_id === 7){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Employees');
        // pa.splice(index,1)
        // pa[index].redirect = 'misc-not-authorized'
        pa[index].meta.PrivilegeSet = false

      }
    }
    if(x.all_master_id === 8){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Accounts');
        // pa.splice(index,1)
        // pa[index].redirect = 'misc-not-authorized'
        pa[index].meta.PrivilegeSet = false

      }
    }
    if(x.all_master_id === 13){
      if(x.status === 'inactive'){
        let index = pa.findIndex(e => e.meta.title === 'Settings');
        // pa.splice(index,1)
        // pa[index].redirect = 'misc-not-authorized'
        pa[index].meta.PrivilegeSet = false

      }
    }
  });
}





// console.log(arr);
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'auth-login' } },
    ...pa,
    { path: '/accept-invitaion' , redirect: { name: 'auth-login'}},
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// console.log(pages);
router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  
  // if (!canNavigate(to)) {
  //   // Redirect to login if not logged in
  //   if (!isLoggedIn) return next({ name: 'auth-login' })

  //   // If logged in => not authorized
  //   return next({ name: 'misc-not-authorized' })
  // }

  // Redirect if not logged in
  if (to.meta.redirectIfNotLoggedIn && !isLoggedIn) {
    next({name: 'auth-login'})
  }

  // Redirect if logged in
  if ((to.meta.redirectIfLoggedIn && isLoggedIn)) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }
  if(to.meta.PrivilegeSet === false){
    next({name:'misc-not-authorized'})
  }
  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload()
  }
})

export default router
