import axios from '@axios'
import { APP_URL } from './Url'

const END_POINT = APP_URL
// const END_POINT = 'https://api-office36ty.protracked.in/v1/tasks';
// const END_POINT = 'http://localhost:8000/v1/tasks'

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

const fetch = async () => await axios.post(END_POINT + '/get-emails', config)
const google_connect = async () => await axios.get('https://api-office36ty.protracked.in/google/login', config)

const fetch_emails = async payload => await axios.post(END_POINT+'/apps/email/emails',payload, config);
const markSpamTrash = async payload => await axios.post(END_POINT+'/apps/email/marked-spam-trash',payload, config);

const store = payload => axios.post(END_POINT + '/store-email', payload, config)

const get = id => axios.post(`${END_POINT}/find-emails`, id, config)

const inbound_get = id => axios.post(`${END_POINT}/email-inbound/${id}`, {}, config)
const update = ({ payload, id }) => axios.put(`${END_POINT}/update-email/${id}`, payload, config)

const destroy = id => axios.delete(`${END_POINT}/delete/${id}`, config)
// inbound emails api
const storeEmailInbound = payload => axios.post(END_POINT + '/email-inbound', payload, config)
const update_email_inbound = ({ payload, id }) => axios.put(`${END_POINT}/email-inbound/${id}`, payload, config)
// out bound emails api
const storeEmailOutbound = payload => axios.post(END_POINT + '/email-outbound', payload, config)
const update_email_outbound = ({ payload, id }) => axios.put(`${END_POINT}/email-outbound/${id}`, payload, config)

const sendEmail = payload => axios.post(END_POINT + '/sendEmail-outBound', payload, config);
// const filter = payload => axios.post(`${END_POINT}/filter-data`, payload, config)
const fetch_all_out_mails = async () => axios.get(END_POINT + '/assignedEmails-outBound', config);
const reply_all = payload => axios.post(END_POINT+'/apps/email/reply-to-all', payload, config);
const toggleStarred = payload => axios.post(END_POINT+'/apps/email/update-emails', payload, config);


export default {
  fetch,
  fetch_emails,markSpamTrash,
  toggleStarred,
  // upload_file_s3,
  google_connect,
  store,
  fetch_all_out_mails,
  //   filter,
  storeEmailOutbound,
  update_email_inbound,
  storeEmailInbound,
  update_email_outbound,
  inbound_get,
  get,
  update,
  destroy,
  sendEmail,
  reply_all,
}
