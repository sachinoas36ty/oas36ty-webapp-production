/* eslint-disable no-useless-concat */
import axios from '@axios'

import { APP_URL } from './Url'

const END_POINT = APP_URL+'/contact-people'
// const END_POINT = 'https://api-office36ty.protracked.in/v1/contact-people';
// const END_POINT = 'http://localhost:8000/v1/contact-people'

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

const fetch = cpID => axios.get(`${END_POINT}/${cpID}/emails`, config)

const store = ({ cpID, payload }) => axios.post(`${END_POINT}/${cpID}/emails`, payload, config)

const get = ({ cpID, id }) => axios.get(`${END_POINT}/${cpID}/emails` + `/${id}`, {}, config)

const update = ({ cpID, payload, id }) => axios.put(`${END_POINT}/${cpID}/emails` + `/${id}`, payload, config)

const destroy = ({ cpID, id }) => axios.delete(`${END_POINT}/${cpID}/emails` + `/${id}`, config)

export default {
  fetch,
  store,
  get,
  update,
  destroy,
}
