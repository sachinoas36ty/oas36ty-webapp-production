import router from '@/router'
import axios from '@axios'

import { APP_URL } from './Url'


// const END_POINT = 'https://api-office36ty.protracked.in/v1/branches';
// const END_POINT = 'http://localhost:8000/v1/branches'
// var task_id = 1;
const END_POINT = APP_URL+'/tasks'

const currentTenant = localStorage.getItem('userData')
const config = {
  headers: {
    currrent: currentTenant,
    
    'Content-type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
}
// eslint-disable-next-line no-return-await
const fetch = id =>  axios.get(END_POINT+'/'+id+'/comments', {},config)
const fetch_assigned_user =  async() => await axios.get(`${END_POINT}/${router.currentRoute.params.id}/comments/assigned_users`,config)


const store = ({payload,id}) => axios.post(END_POINT+'/'+id+'/comments', payload, config)
const mailToComment = ({payload,id}) => axios.put(APP_URL+'/mail-to-comments/'+id, payload, config)


const get = id => axios.get(`${END_POINT}/${id}`, {}, config)
const getMailComment = id => axios.get(`${END_POINT}/${id}/mail-thread`, {}, config)


const update = ({ payload, id }) => axios.put(`${END_POINT}/${id}`, payload, config)

const destroy = id => axios.delete(`${END_POINT}/${id}`, {}, config)

export default {
  fetch,
  getMailComment,
  store,
  get,fetch_assigned_user,
  update,
  mailToComment,
  destroy,
}
