import axios from '@axios'

import { APP_URL } from './Url'

// const END_POINT = 'https://api-office36ty.protracked.in/v1/branches';
// const END_POINT = 'http://localhost:8000/v1/branches'

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

const add =  payload => axios.post(`${APP_URL}/task-client/add-attach`, payload, config)

const remove =  payload => axios.post(`${APP_URL}/task-client/delete-attach`, payload, config)

const store = payload => axios.post(`${APP_URL}/tasks/add-attachment`, payload, config)


export default {
  store,
  // saveToExcel,
  // saveToWord,
add, remove
}
