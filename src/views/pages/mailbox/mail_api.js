import { APP_URL } from '@/api/Url'
// const APP_URL = 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1';
import axios from '@axios'

const config = {
  
};
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchEmails(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(APP_URL+'/apps/email/emails', { payload }, {headers: {
            currrent: localStorage.getItem('userData'),
            'Content-type': 'application/json',
        
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
          },})
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(APP_URL+'/apps/email/update-emails', payload)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEmailLabels(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(APP_URL+'/apps/email/update-emails-label', payload)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    paginateEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(APP_URL+'/apps/email/paginate-email', { params: payload })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}