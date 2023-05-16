import axios from '@axios'

import { APP_URL } from './Url'

const END_POINT = APP_URL+'/all-users'
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

// eslint-disable-next-line no-return-await
const fetch = async () => await axios.get(END_POINT, config)
// const fetch_emails = async () => await axios.get('http://127.0.0.2:8000/api/recieve-emails', {
const fetch_emails = async payload => await axios.post(APP_URL+'/fetch-latestEmails',payload, {
// const fetch_emails = async payload => await axios.post('https://mail-office36ty.protracked.in/v1/recieve-emails',payload, {


  headers: {
    currrent: currentTenant,
    'Content-type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  }
})
export default {
  fetch,
  fetch_emails
}
