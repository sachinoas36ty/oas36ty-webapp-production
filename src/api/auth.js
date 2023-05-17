import axios from '@axios'
// import {} from '.env'
import { APP_URL } from './Url'

const END_POINT = APP_URL
// const END_POINT = 'https://api-office36ty.protracked.in/v1';
import {debounce} from 'lodash'
// const END_POINT = 'http://localhost:8000/v1'

const config = {
  headers: {
    'Content-type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },

}

const login = payload => axios.post(`${END_POINT}/login`, payload)
const updateOrganization = payload => axios.post(`${END_POINT}/update-organization`, payload)
const fetchOrganization = payload => axios.post(`${END_POINT}/fetch-organization`, payload)



// eslint-disable-next-line no-return-await
const signupSendEmail = async payload => await axios.post(`${END_POINT}/signup/send-email`, payload, config)

const signupVerifyEmail = payload => axios.post(`${END_POINT}/signup/verify-email`, payload, config)

const signupOrganization = payload => axios.put(`${END_POINT}/signup/organization`, payload, config)

// eslint-disable-next-line no-return-await, no-undef
const signupComplete = async payload => await axios.post(`${END_POINT}/signup/complete`, payload, config)

const forgotOrganization = payload => axios.post(`${END_POINT}/forgot-organization`, payload, config)

const forgotPassword = payload => axios.post(`${END_POINT}/forgot-password`, payload, config)

const resetPassword = payload => axios.post(`${END_POINT}/reset-password`, payload, config)
const invitation = payload => axios.post(`${END_POINT}/set-password`, payload, config)
const acceptInvite = payload => axios.post(`${END_POINT}/accept-invite`, payload, config)
const declineInvite = payload => axios.post(`${END_POINT}/decline-invite`, payload, config)


const switchOrg = payload => axios.post(`${END_POINT}/switch`, payload, config)

const logout = () => axios.post(`${END_POINT}/logout`, {
  // token : localStorage.getItem('accessToken'),
}, config)

export default {
  login,
  signupSendEmail,
  signupVerifyEmail,
  updateOrganization,
  fetchOrganization,
  signupOrganization,
  signupComplete,
  forgotOrganization,
  forgotPassword,
  invitation,
  acceptInvite,
  
  declineInvite,
  resetPassword,
  switchOrg,
  logout,
}
