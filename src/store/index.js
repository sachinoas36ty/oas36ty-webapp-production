import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './modules/auth'
import branches from './modules/branches'
import categories from './modules/categories'
import clients from './modules/clients'
import contactPeople from './modules/contactPeople'
import contactPersonEmails from './modules/contactPersonEmails'
import leads from './modules/leads'
import tasks from './modules/tasks'
import expenses from './modules/expenses'


import allUsers from './modules/allusers'
import users from './modules/users'
import emails from './modules/emails'
import comments from './modules/comments'
import appTodo from './modules/appTodo'
import status from './modules/statusMaster'
import proposals from './modules/proposals'
import invoice from './modules/invoice'
import recordPayment from './modules/recordPayment'
import designation from './modules/designation'

import attachments from './modules/attachments'
import timesheet from './modules/timesheet'
import emailTemplate from './modules/emailTemplate'
import subtaskTemplate from './modules/subtaskTemplate'
import officeTimings from './modules/officeTimings'
import followUp from './modules/followUp'








Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    officeTimings,
    expenses,
    timesheet,
    appConfig,
    followUp,
    subtaskTemplate,
    emailTemplate,
    verticalMenu,
    auth,
    branches,
    categories,
    designation,
    status,
    clients,
    contactPeople,
    invoice,
    recordPayment,
    contactPersonEmails,
    leads,
    proposals,
    tasks,
    allUsers,
    users,
    emails,
    comments,
    appTodo,
    attachments
  },
  strict: process.env.DEV,
})
