import Vue from 'vue'

// axios
import axios from 'axios'

const userData = JSON.parse(localStorage.getItem('userData'))
const tenant = userData?.tenant?.id

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 3000000000,
  headers: {
    "Content-Type": "application/json",
    // "X-Tenant": tenant
  }
})

if (typeof tenant !== 'undefined'){
  axiosIns.defaults.headers.common["X-Tenant"] = tenant;
}

Vue.prototype.$http = axiosIns

export default axiosIns
