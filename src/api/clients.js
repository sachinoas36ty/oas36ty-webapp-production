import axios from '@axios'

import { APP_URL } from './Url'

const END_POINT = APP_URL+'/Companys'
// const END_POINT = 'https://api-office36ty.protracked.in/v1/clients';
// const END_POINT = 'http://localhost:8000/v1/clients'

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
const fetch = async () => await axios.get(END_POINT, config)

const store = payload => axios.post(END_POINT, payload, config)

const get = id => axios.get(`${END_POINT}/${id}`, {}, config)

const update = ({ payload, id }) => axios.put(`${END_POINT}/${id}`, payload, config)

const destroy = id => axios.delete(`${END_POINT}/${id}`, config)

export default {
  fetch,
  store,
  get,
  update,
  destroy,
}
