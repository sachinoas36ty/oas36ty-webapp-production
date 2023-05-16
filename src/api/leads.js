import router from '@/router'
import axios from '@axios'
import { APP_URL } from './Url'
function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}
const END_POINT = APP_URL+'/tasks'
// const END_POINT = 'https://api-office36ty.protracked.in/v1/tasks';
// const END_POINT = 'http://localhost:8000/v1/tasks'

const currentTenant = localStorage.getItem('userData')
// var route = router.currentRoute;
const config = {
  headers: {
    currrent: currentTenant,
    // route: route,
    'global_id':getCookie('global_id'),
    // route2: router.currentRoute,
    'Content-type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',

  },
}

// eslint-disable-next-line no-return-await
const fetch = async () => await axios.get(`${END_POINT}?route=${(router.currentRoute.name==='dashboard'||router.currentRoute.name==='clients' || router.currentRoute.name==='GettingStarted') ? 'leads' : router.currentRoute.name}`,{}, config)
const fetchwithoutLoading = async () => await axios.get(`${END_POINT}?route=${router.currentRoute.name!=null ? router.currentRoute.name : 'leads'}`,{}, config)



const store = payload => axios.post(END_POINT, payload, config)
const markAsRead = payload => axios.post(APP_URL+'/tasks-read', payload, config)


const get = id => axios.get(`${END_POINT}/${id}`, {}, config)
const userViseTasks = id => axios.get(`${APP_URL}/user-tasks/${id}`, {}, config)

const audits = async () => await axios.get(`${APP_URL}/audits?route=${router.currentRoute.name}&id=${router.currentRoute.params.id}`,{}, config)
const update = ({ payload, id }) => axios.put(`${END_POINT}/${id}`, payload, config)
const strip = payload => axios.post(END_POINT+'/strip-tags', payload, config)
const markTask = payload => axios.post(END_POINT+'/mark-as-completed-closed', payload, config)


const destroy = id => axios.delete(`${END_POINT}/${id}`, config)
const filter = payload => axios.post(`${END_POINT}/filter-data?route=${(router.currentRoute.name==='dashboard'||router.currentRoute.name==='clients') ? 'leads' : router.currentRoute.name}`, payload, config)
const inline_update = payload => axios.post(`${END_POINT}/inlineUpdate?route=${(router.currentRoute.name==='dashboard'||router.currentRoute.name==='clients'||router.currentRoute.name==='users') ? 'leads' : router.currentRoute.name}`, payload, config)

export default {
  fetch,
  fetchwithoutLoading,
  strip,
  store,
  filter,
  get,audits,
  update,
  userViseTasks,
  markTask,
  markAsRead,
  destroy,inline_update
}
