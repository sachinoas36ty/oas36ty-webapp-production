import router from '@/router'
import axios from '@axios'
import { APP_URL } from './Url'

const END_POINT = APP_URL+'/tasks'
// const END_POINT = 'https://api-office36ty.protracked.in/v1/tasks';
// const END_POINT = 'http://localhost:8000/v1/tasks'

const currentTenant = localStorage.getItem('userData')
// var route = router.currentRoute;
const config = {
  headers: {
    currrent: currentTenant,
    // route: route,
    // route2: router.currentRoute,
    'Content-type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',

  },
}
const config2 = {
  headers: {
    currrent: currentTenant,
    // route: route,
    // route2: router.currentRoute,
    'Content-type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',

  },
}

// eslint-disable-next-line no-return-await
const fetch = async () => await axios.get(`${END_POINT}?route=${(router.currentRoute.name==='dashboard'||router.currentRoute.name==='clients') ? 'tasks' : router.currentRoute.name}`,{}, config)
const fetchwithoutLoading = async () => await axios.get(`${END_POINT}?route=${router.currentRoute.name!=null ? router.currentRoute.name : 'tasks'}`,{}, config)

const store = payload => axios.post(END_POINT, payload, config)

const get = id => axios.get(`${END_POINT}/${id}`, {}, config)
const getAttachments = id => axios.get(`${END_POINT}/${id}/attachments`, {}, config)

const audits = () =>  axios.get(`${APP_URL}/task-audits/`,{}, config)
const update = ({ payload, id }) => axios.put(`${END_POINT}/${id}`, payload, config)

const destroy = id => axios.delete(`${END_POINT}/${id}`, config)
const filter = payload => axios.post(`${END_POINT}/filter-data?route=${(router.currentRoute.name==='dashboard'||router.currentRoute.name==='clients') ? 'tasks' : router.currentRoute.name}`, payload, config)
const inline_update = payload => axios.post(`${END_POINT}/inlineUpdate?route=${router.currentRoute.name}`, payload, config)
const saveToExcel = payload => axios.post(`${APP_URL}/create-google-sheet`, payload, config)
const saveToWord = payload => axios.post(`${APP_URL}/create-google-doc`, payload, config)
const convertToClient = payload => axios.post(`${APP_URL}/attchment-convert-to-client`, payload, config)
const convertToTask = payload => axios.post(`${APP_URL}/attchment-convert-to-task`, payload, config)

const deleteFromTask = id => axios.delete(`${APP_URL}/attchment-delete-from-task/${id}`, config)

const upload_file_s3 = payload => axios.post(APP_URL+'/apps/email/add-attach', payload, config2);
const remove_file_s3 = payload => axios.post(APP_URL+'/apps/email/delete-attach', payload, config);
// const expensesStore = payload => axios.post(APP_URL+'/expenses', payload, config)

export default {
  fetch,
  // expensesStore,
  store,
  upload_file_s3,
  convertToTask,
  fetchwithoutLoading,
  deleteFromTask,
  convertToClient,
  remove_file_s3,
  filter,
  getAttachments,
  saveToExcel,
  saveToWord,
  get,audits,
  update,
  destroy,inline_update
}
