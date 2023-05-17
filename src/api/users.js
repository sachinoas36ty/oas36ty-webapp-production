import axios from '@axios'

import { APP_URL } from './Url'

const END_POINT = APP_URL+'/users'
// const END_POINT = 'https://api-office36ty.protracked.in/v1/users';
// const END_POINT = 'http://localhost:8000/v1/users'

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
const assign_emails = async () => await axios.get(END_POINT+ '/get-emails-to-assign', config);
const reInvite = payload =>  axios.post(END_POINT+ '/re-invite',payload, config);

const store = payload => axios.post(END_POINT, payload, config)

const get = id => axios.get(`${END_POINT}/${id}`, {}, config)
const updateProfile = (payload) => axios.post(`${END_POINT}/update-profile-image`,payload,config);
const userSignature = ({payload,id}) => axios.put(`${END_POINT}/${id}/update-signature`,payload,config)
const fetchUserSignature = id => axios.get(`${END_POINT}/${id}/get-signature`,{},config)

const updatePassword = (payload) => axios.post(`${END_POINT}/update-password`,payload,config);
const deactivate = ({payload,id}) => axios.post(`${END_POINT}/${id}/deactivate`,payload,config);


const update = ({ payload, id }) => axios.put(`${END_POINT}/${id}`, payload, {headers: {


  currrent: currentTenant,
  'Content-type': 'application/json',

  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
}})
const updateProfileData = ({ payload, id }) => axios.put(`${END_POINT}/${id}/update-profile`, payload, {headers: {


  currrent: currentTenant,
  'Content-type': 'application/json',

  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
}})


const destroy = id => axios.delete(`${END_POINT}/${id}`, {}, config)

export default {
  fetch,
  assign_emails,
  updateProfileData,
  userSignature,
  fetchUserSignature,
  updateProfile,
  deactivate,
  updatePassword,
  store,
  get,
  reInvite,
  update,
  destroy,
}
