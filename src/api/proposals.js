import router from '@/router'
import axios from '@axios'
import { APP_URL } from './Url'

const END_POINT = APP_URL
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


// eslint-disable-next-line no-return-await
const fetch =  () =>  axios.get(`${END_POINT}/proposal-templates`,{}, config)

const store =  (payload) =>  axios.post(`${END_POINT}/proposal-templates`,payload, config)
const update = ({ payload, id }) => axios.put(`${END_POINT}/proposal-templates/${id}`, payload, config)
const destroy = id => axios.delete(`${END_POINT}/proposal/${id}`, config)

const get = (id) => axios.get(END_POINT + '/proposal/'+id,{}, config)
const getAll = () => axios.get(END_POINT + '/proposal',{}, config)
// const fetch _emails = async () => await axios.get('http://127.0.0.2:8000/api/recieve-emails', {
  const create = async payload => await axios.post(`${END_POINT}/proposal`, payload, config)
  const proposal_update = ({ payload, id }) => axios.put(`${END_POINT}/proposal/${id}`, payload, config)
  const bank_create = (payload) => axios.post(`${END_POINT}/bank-details`,payload, config)
const bank_fetch =  () =>  axios.get(`${END_POINT}/bank-details`,{}, config)
const bank_update = ({ payload, id }) => axios.put(`${END_POINT}/bank-details/${id}`, payload, config)
const bank_delete = id => axios.delete(`${END_POINT}/bank-details/${id}`, config)

  

export default {
  store,
  bank_create,
  bank_fetch,
  bank_delete,
  destroy,
  bank_update,
  fetch,
  update,
  create,
  proposal_update,
  get,
  getAll
  
}
