import auth from '@/api/auth'
import useJwt from '@/auth/jwt/useJwt'
import {current_date,time_check,date_plus} from '../../api/DateFunction'
const date = new Date();

const getDefaultState = () => ({
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  current_date :`${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`,

  declineLoading: false,
  errors: {},
  all: [],
  org:{},
  passwordNotRequired: false,
})
const state = getDefaultState()
// function setCookie(name,value,days) {
//   var expires = "";
//   if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days*24*60*60*1000));
//       expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "");
// }
// initial state

// getters
const getters = {}

// actions
const actions = {
  login({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.login(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          commit('SET_ALL', data.data)
          const userData = {
            // userAccess: data.data.UserAccess,
            user_role_id:data.data.user_role_id,
            name: data.data.name, email: data.data.email, id:data.data.id, avatar:data.data.avatar, tenant: data.data.current_tenant, all_tenants: data.data.all_tenants,
          }
          const d = {
            designation_name: data.data.UserAccess[0].designation_name,
            id:data.data.UserAccess[0].id,
            masters:data.data.UserAccess[0].masters,
            // privileges:data.data.UserAccess[0].privileges,

            // name: data.data.name, email: data.data.email, id:data.data.id, avatar:data.data.avatar, tenant: data.data.current_tenant, all_tenants: data.data.all_tenants,
          }
          commit('SET_ORG', userData)
          useJwt.setToken(data.data.token)

          // useJwt.setExpiration(data.data.expires_in)
          useJwt.setTenant(data.data.current_tenant.id)
          localStorage.removeItem('privileges');

          localStorage.setItem('userData', JSON.stringify(userData))
          if(data.data.userTimesheet.latest_date === null){

            localStorage.setItem('userTimesheet', JSON.stringify(null))
          }else{
            const b = current_date;
            localStorage.setItem('userTimesheet', JSON.stringify(data.data.userTimesheet))

            if(data.data.userTimesheet.latest_date !== b ){
              if(time_check(data.data.userTimesheet.total_worked_hour) === 'less than'){

                localStorage.setItem('userTimesheet', JSON.stringify(data.data.userTimesheet))
              }else if(time_check(data.data.userTimesheet.total_worked_hour) === 'greater than'){
                let abc = {
                  latest_date:date_plus(data.data.userTimesheet.latest_date),
                  total_worked_hour:'00:00'
                }
                localStorage.setItem('userTimesheet', JSON.stringify(abc))
                
              }
            }

          }

          localStorage.setItem('privileges', JSON.stringify(d))

          document.cookie = `${'currentTenant' + '='}${JSON.stringify(userData) || ''}`
          document.cookie = `${'Privileges' + '='}${JSON.stringify(d) || ''}`
          if(data.data.userTimesheet.latest_date === null){

          document.cookie = `${'userTimesheet' + '='}${JSON.stringify(null)}`
          }else{
          document.cookie = `${'userTimesheet' + '='}${JSON.stringify(data.data.userTimesheet)}`

          }

          document.cookie = `${'accessToken' + '='}${data.data.token || ''}`

          sessionStorage.setItem('accessToken',data.data.token)
          // setCookie("currentTenant", JSON.stringify(userData), 7);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        // if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        // else 
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  updateOrganization({ commit }, payload) {
    // commit('RESET_STATE')
    // commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.updateOrganization(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          // commit('SET_ALL', data.data)
         
          commit('SET_ALL', data.data)
          const userData = {
            // userAccess: data.data.UserAccess,
            name: data.data.name, email: data.data.email, id:data.data.id, avatar:data.data.avatar, tenant: data.data.current_tenant, all_tenants: data.data.all_tenants,
          }
          commit('SET_ORG', userData)
        
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        // if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        // else 
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  fetchOrganization({ commit }, payload) {
    // commit('RESET_STATE')
    // commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.fetchOrganization(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          // commit('SET_ALL', data.data)
         
          commit('SET_ALL', data.data)
          const userData = {
            // userAccess: data.data.UserAccess,
            name: data.data.name, email: data.data.email, id:data.data.id, avatar:data.data.avatar, tenant: data.data.current_tenant, all_tenants: data.data.all_tenants,
          }
          commit('SET_ORG', userData)
        
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        // if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        // else 
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  signupSendEmail({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    localStorage.removeItem('signupEmail')
    localStorage.removeItem('signupToken')
    localStorage.removeItem('signupEmailVerified')
    localStorage.removeItem('signupOrgName')
    localStorage.removeItem('signupOrgURL')
    return new Promise((resolve, reject) => {
      auth.signupSendEmail(payload).then(({ data }) => {
        if (data.status === true) {
          // console.log(data);

          commit('SET_SUCCESS_MESSAGE', data.message)
          localStorage.setItem('signupEmail', data.data.email)
          localStorage.setItem('signupToken', data.data.signup_token)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  signupVerifyEmail({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.signupVerifyEmail(payload).then(({ data }) => {
        if (data.status === true) {
          if(data.status_code == 401){
            commit('SET_ERROR_MESSAGE', data.message)
            reject()
          }else{
            commit('SET_SUCCESS_MESSAGE', data.message)
            localStorage.setItem('signupEmailVerified', true)
            resolve()
          }
        }
        
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  signupOrganization({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.signupOrganization(payload).then(({ data }) => {
        if (data.passwordNotRequired === true) {
          console.log('password is not required')
          commit('SET_PASSWORD_FIELD')
        }
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          localStorage.setItem('signupOrgName', payload.organization_name)
          localStorage.setItem('signupOrgURL', payload.organization_url)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  signupComplete({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.signupComplete(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          localStorage.removeItem('signupEmail')
          localStorage.removeItem('signupToken')
          localStorage.removeItem('signupEmailVerified')
          localStorage.removeItem('signupOrgName')
          localStorage.removeItem('signupOrgURL')
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  forgotOrganization({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.forgotOrganization(payload).then(({ data }) => {
        if (data.status === true) {
          // console.log("hh");
          commit('SET_SUCCESS_MESSAGE', data.message)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  forgotPassword({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.forgotPassword(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  resetPassword({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.resetPassword(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  invitation({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.invitation(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
 
  acceptInvite({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.acceptInvite(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        // if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        // else 
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  declineInvite({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_DECLINE_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.declineInvite(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        //if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
       // else 
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_DECLINE_LOADING', false))
    })
  },
  switchOrg({ commit }, payload) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.switchOrg(payload).then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          const userData = {
            user_role_id:data.data.UserAccess[0].masters[0].user_role_id,
            name: data.data.name, email: data.data.email, avatar:data.data.avatar, id:data.data.id,tenant: data.data.current_tenant, all_tenants: data.data.all_tenants,
          }
          const d = {
            designation_name: data.data.UserAccess[0].designation_name,
            id:data.data.UserAccess[0].id,
            masters:data.data.UserAccess[0].masters,
            // privileges:data.data.UserAccess[0].privileges,

            // name: data.data.name, email: data.data.email, id:data.data.id, avatar:data.data.avatar, tenant: data.data.current_tenant, all_tenants: data.data.all_tenants,
          }
          useJwt.setToken(data.data.token)
          useJwt.setTenant(data.data.current_tenant.id)
          localStorage.removeItem('privileges');
          localStorage.setItem('userData', JSON.stringify(userData))
          if(data.data.userTimesheet.latest_date === null){

            localStorage.setItem('userTimesheet', JSON.stringify(null))
          }else{
            const b = current_date;
            localStorage.setItem('userTimesheet', JSON.stringify(data.data.userTimesheet))

            if(data.data.userTimesheet.latest_date !== b ){
              if(time_check(data.data.userTimesheet.total_worked_hour) === 'less than'){

                localStorage.setItem('userTimesheet', JSON.stringify(data.data.userTimesheet))
              }else if(time_check(data.data.userTimesheet.total_worked_hour) === 'greater than'){
                let abc = {
                  latest_date:date_plus(data.data.userTimesheet.latest_date),
                  total_worked_hour:'00:00'
                }
                localStorage.setItem('userTimesheet', JSON.stringify(abc))
                
              }
            }

          }
          localStorage.setItem('privileges', JSON.stringify(d))

          localStorage.setItem('userData', JSON.stringify(userData))
          document.cookie = `${'currentTenant' + '='}${JSON.stringify(userData) || ''}`
          // document.cookie = `${'Privileges' + '='}${JSON.stringify(data.data.UserAccess) || ''}`

          // document.cookie = `${'accessToken' + '='}${data.data.token || ''}`

          // sessionStorage.setItem('accessToken',data.data.token)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  logout({ commit }) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      auth.logout().then(({ data }) => {
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          useJwt.removeToken()
          useJwt.removeTenant()
          localStorage.removeItem('userData');
          localStorage.removeItem('signupToken')
          localStorage.removeItem('privileges')
          localStorage.removeItem('userTimesheet')


          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  clear({ commit }) {
    commit('RESET_STATE')
    useJwt.removeToken()
    useJwt.removeTenant()
    localStorage.removeItem('userData')
  },
}

// mutations
const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_PASSWORD_FIELD(state) {
    state.passwordNotRequired = true
  },

  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_DECLINE_LOADING(state, status){
    state.declineLoading = status
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_ALL(state, payload) {
    state.all = payload
  },
  SET_ORG(state,payload){
    state.org = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
