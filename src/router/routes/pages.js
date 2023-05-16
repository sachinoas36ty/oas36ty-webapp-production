import { t } from '@/@core/libs/i18n/utils';
import store from '@/store'
var pages = [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    // component: () => import('@/views/pages/miscellaneous/Error.vue'),
    
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/form',
    name: 'form-ca',
    component: () => import('@/views/form-ca.vue'),
    meta: {
      layout: 'full',
      // resource: 'Auth',
      // redirectIfLoggedIn: true,
    },
  },
  {
    path: '/signup',
    name: 'auth-register',
    component: () => import('@/views/pages/authentication/Signup/SendEmail.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/signup/step2',
    name: 'auth-register-step2',
    component: () => import('@/views/pages/authentication/Signup/VerifyEmail.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/signup/step3',
    name: 'auth-register-step3',
    component: () => import('@/views/pages/authentication/Signup/Organization.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/signup/step4',
    name: 'auth-register-step4',
    component: () => import('@/views/pages/authentication/Signup/Complete.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/reset-password',
    name: 'auth-reset-password',
    component: () => import('@/views/pages/authentication/ResetPassword.vue'),
    meta: {
      layout: 'full',
      // resource: 'Auth',
      // redirectIfLoggedIn: true,
    },
  },
  {
    path: '/forgot-organization',
    name: 'auth-forgot-organization',
    component: () => import('@/views/pages/authentication/ForgotOrganization.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
    },
  },
  // {
  //   path: '/templates',
  //   name: 'templates',
  //   component: () => import('@/views/pages/templates/List.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //   },
  // },
  // {
  //   path: '/bank_details',
  //   name: 'bank_details',
  //   component: () => import('@/views/pages/bank_details/List.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //   },
  // },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('@/views/pages/profile/Profile.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //   },
  // },

  // {
  //   path: '/branches',
  //   name: 'branches',
  //   component: () => import('@/views/pages/branches/List.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //   },
  // },
  // {
  //   path: '/categories',
  //   name: 'categories',
  //   component: () => import('@/views/pages/categories/List.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //   },
  // },
  {
    path: '/clients',
    name: 'clients',
    // redirect:'error-404',
    component: () => import('@/views/pages/clients/List.vue'),
    meta: {
      title:'Clients',
      redirectIfNotLoggedIn: true,
    },
  },
  // {
  //   path: '/contact-people',
  //   name: 'contact-people',
  //   component: () => import('@/views/pages/contact-people/List.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //   },
  // },
  {
    path: '/contact-people/:cpID/emails',
    name: 'contact-people-emails',
    component: () => import('@/views/pages/contact-people/emails/List.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
    },
  },
  {
    path: '/contact-people/:cpID/phones',
    name: 'contact-people-phones',
    component: () => import('@/views/pages/contact-people/emails/List.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
    },
  },
  
  
  {
    path: '/leads',
    name: 'leads',
    component: () => import('@/views/pages/leads/List.vue'),
   
    meta: {
      PrivilegeSet:true,
      title:'Leads',
      redirectIfNotLoggedIn: true,
    },
  },
  // {
  //   path: '/accounts',
  //   name: 'Accounts',
  //   component: () => import('@/views/pages/miscellaneous/UnderMaintenance.vue'),
  //   meta: {
  //     // redirectIfNotLoggedIn: true,
  //     layout: 'full',
  //     resource: 'Auth',
  //     action: 'read',
  //   },
  // },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import('@/views/pages/Accounts/List.vue'),
    meta: {
      PrivilegeSet:true,
      title:"Accounts",
      redirectIfNotLoggedIn: true,
      // layout: 'full',
      // resource: 'Auth',
      // action: 'read',
    },
  },
  {
    path: '/getting-started',
    name: 'GettingStarted',
    component: () => import('@/views/getting-started.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
      // layout: 'full',
      // resource: 'Auth',
      // action: 'read',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/pages/settings/List.vue'),
    meta: {
      PrivilegeSet:true,
      title:'Settings',
      redirectIfNotLoggedIn: true,
    },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/pages/tasks/List.vue'),
    meta: {
      PrivilegeSet:true,
      title:"Tasks",
      redirectIfNotLoggedIn: true,
      // contentClass: 'todo-application',
      // contentRenderer: 'sidebar-left',
      // contentClass: 'email-application',
      // contentRenderer: 'sidebar-left',

    },
    
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import('@/views/pages/todos/Todo.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
    
  }, 
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/pages/users/List.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
      title:'Employees',
      PrivilegeSet:true,
    },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/pages/Calendar/List.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
      title:'Calendar',
      PrivilegeSet:true,
    },
  },
  {
    path: '/invitation',
    name: 'invite',
    component: () => import('@/views/pages/authentication/SetPassword.vue'),
    meta: {
      layout: 'full',
      // resource: 'Auth',
      // redirectIfLoggedIn: true,
    },
  },
  {
    path: '/accept-invitation',
    name: 'accept-invite',
    component: () => import('@/views/pages/authentication/AcceptInvitation.vue'),
    meta: {
      layout: 'full',
      // resource: 'Auth',
      // redirectIfLoggedIn: true,
    },
  },
  // {
  //   path: '/leads/:id',
  //   name: 'leads-inner',
  //   component: () => import('@/views/pages/leads/InnerPage.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //     contentRenderer: 'sidebar-left',
  //     contentClass: 'todo-application',
  //   },
  // },
  // {
  //   path: '/leads/commentss/:id',
  //   name: 'comments-inner',
  //   component: () => import('@/views/pages/leads/CardAdvanceChat.vue'),
  //   meta:{
  //     redirectIfNotLoggedIn: true,
  //     contentRenderer: 'sidebar-left',
  //     // contentClass: ['todo-application', 'email-application'], 
  //     contentClass: 'chat-application',

  //     // contentClass: 'email-application',
  
  //   }
  // },
  // {
  //   path: '/leads/:folder/:id',
  //   name: 'leads-inner-folder',
  //   component: () => import('@/views/pages/leads/InnerPage.vue'),
  //   meta: {
  //     redirectIfNotLoggedIn: true,
  //     contentRenderer: 'sidebar-left',
  //     contentClass: ['todo-application', 'chat-application'], 
  //     // contentClass: 'chat-application',

  //     // contentClass: 'email-application',
  //     navActiveLink: 'leads-inner',

  //   },
  //   beforeEnter(to, _, next) {
  //     if (['comments', 'todo', 'starred', 'attachments', 'activities'].includes(to.params.folder)) next()
  //     else next({ name: 'error-404' })
  //   },
  // },

  {
    path: '/emails',
    name: 'emails',
    component: () => import('@/views/pages/Emails/List.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
    },
  },
  {
    path: '/emails/:emailID',
    name: 'edit-emails',
    component: () => import('@/views/pages/Emails/EditSidebar.vue'),
    meta: {
      redirectIfNotLoggedIn: true,
    },
  },
  {
    path: '/apps/email',
    name: 'apps-email',
    component: () => import('@/views/pages/mailbox/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      redirectIfNotLoggedIn: true,
      title:'Mails',
      PrivilegeSet:true,
      

    },
  },
  {
    path: '/apps/email/:folder',
    name: 'apps-email-folder',
    component: () => import('@/views/pages/mailbox/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'apps-email',
      redirectIfNotLoggedIn: true,
      PrivilegeSet:true,
    },
    beforeEnter(to, _, next) {
      if (['sent', 'draft', 'starred', 'spam', 'trash'].includes(to.params.folder)) next()
      else next({ name: 'error-404' })
    },
  },
  // {
  //   path: '/apps/email/label/:label',
  //   name: 'apps-email-label',
  //   component: () => import('@/views/pages/mailbox/Email.vue'),
  //   meta: {
  //     contentRenderer: 'sidebar-left',
  //     contentClass: 'email-application',
  //     navActiveLink: 'apps-email',
  //   },
  //   beforeEnter(to, _, next) {
  //     if (['personal', 'company', 'important', 'private'].includes(to.params.label)) next()
  //     else next({ name: 'error-404' })
  //   },
  // },
];
let arr =[]



// console.log(arr);

export default pages