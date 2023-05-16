import axios from '@axios'

import { APP_URL } from './Url'

const END_POINT = APP_URL;
// const END_POINT = 'https://api-office36ty.protracked.in/v1/all-users';
// const END_POINT = 'http://localhost:8000/v1/all-users'

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

const paginate = url =>  axios.get(url, config)

// eslint-disable-next-line no-return-await
const getAll = id =>  axios.get(END_POINT + '/to-dos/', config)

const fetch = id =>  axios.get(END_POINT + '/to-dos/'+id, config)
// const fetch_emails = async () => await axios.get('http://127.0.0.2:8000/api/recieve-emails', {
  const store = async payload => await axios.post(`${END_POINT}/to-dos`, payload, config)

  const update = ({ payload, id }) => axios.put(`${END_POINT}/to-dos/${id}`, payload, config)
  const destroy = id => axios.delete(`${END_POINT}/to-dos/${id}`, {}, config)

export default {
  // fetch,
  paginate,
  fetch,update,store,destroy,getAll,
//   fetch_emails
}