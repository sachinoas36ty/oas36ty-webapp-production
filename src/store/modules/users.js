import users from '@/api/users'

const getDefaultState = () => {
  return {
    isLoading: false,
    profileLoading:false,
    sidebarLoading:false,
    reInviteLoading: false,
    successMessage: "",
    errorMessage: "",
    user_emails: [],
    all: [],
    emails:[],
    isGetLoading:false,
    accessToken:null,
    signAll:[],
    timesheet:[],
    signatureLoading:false,
    profileLoading:false,
    single: {},
    errors: {},
    path: '',
  };
};

// initial state
const state = getDefaultState();

// getters
const getters = {}

// actions
const actions = {
  fetch({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      users.fetch().then(({ data }) => {
        if(data.status == true){
          document.cookie = `${'global_id' + '='}${data.data.owner_global_id || ''}`

          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data.users)
          commit('SET_USER_EMAILS', data.data.user_emails)
          // commit('SET_TIMESHEET', data.data.timesheet)
          commit('SET_ACCESS_TOKEN', data.data.access_token)

          commit('SET_PATH',data.data.path)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  assign_emails({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      users.assign_emails().then(({ data }) => {
        if(data.status == true){
          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_EMAILS', data.data)
         
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message.msg);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  store({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
        users.store(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          console.log(data.message);
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log(response.data);
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
       commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_SIDEBAR_LOADING', false))
    })
  },
  updateProfile({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_PROFILE_LOADING', true);
    return new Promise((resolve, reject) => {
        users.updateProfile(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          console.log(data.message);
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log(response.data);
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
       commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_PROFILE_LOADING', false))
    })
  },
  updatePassword({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_PROFILE_LOADING', true);
    return new Promise((resolve, reject) => {
        users.updatePassword(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          console.log(data.message);
          commit('SET_ERROR_MESSAGE', data.errors.old_password ? data.errors.old_password[0] : data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log(response.data);
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
       commit('SET_ERROR_MESSAGE', response.data.errors.old_password ? response.data.errors.old_password[0] : response.data.message);
        reject()
      }).finally(() => commit('SET_PROFILE_LOADING', false))
    })
  },
  reInvite({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_SIGNATURE_LOADING', true);
    return new Promise((resolve, reject) => {
        users.reInvite(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          console.log(data.message);
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log(response.data);
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
       commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_REINVITE_LOADING', false))
    })
  },
  get({ commit }, id) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_GET_LOADING', true);
    return new Promise((resolve, reject) => {
      users.get(id).then(({ data }) => {
        if(data.status == true){

          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data.users)
          commit('SET_USER_EMAILS', data.data.user_emails)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_GET_LOADING', false))
    })
  },
  fetchUserSignature({ commit }, id) {
    // commit('RESET_MESSAGES');
    commit('SET_SIGNATURE_LOADING', true);
    return new Promise((resolve, reject) => {
      users.fetchUserSignature(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SIGNATURE_ALL', data.data);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_SIGNATURE_LOADING', false))
    })
  },
  update({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
        users.update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_SIDEBAR_LOADING', false))
    })
  },
  deactivate({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
        users.deactivate({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_SIDEBAR_LOADING', false))
    })
  },
  updateProfileData({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_PROFILE_LOADING', true);
    return new Promise((resolve, reject) => {
        users.updateProfileData({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_PROFILE_LOADING', false))
    })
  },
  userSignature({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_SIGNATURE_LOADING', true);
    return new Promise((resolve, reject) => {
        users.userSignature({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_SIGNATURE_LOADING', false))
    })
  },
  destroy({ commit }, id) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
        users.destroy(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  }
}
  const mutations = {
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    SET_ACCESS_TOKEN(state,payload){
      state.accessToken = JSON.parse(payload)
    },
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message
    },
    SET_IS_LOADING(state, status) {
      state.isLoading = status
    },
    SET_REINVITE_LOADING(state, status) {
      state.reInviteLoading = status
    },
    SET_PROFILE_LOADING(state,status){
      state.profileLoading = status
    },
    SET_IS_GET_LOADING(state,status){
      state.isGetLoading = status
    },
    SET_SIGNATURE_LOADING(state, status) {
      state.signatureLoading = status
    },
    SET_SIGNATURE_ALL(state,paylaod)
    {
      state.signAll = paylaod
    },
    SET_TIMESHEET(state,payload){
      state.timesheet = payload
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    },
    SET_SIDEBAR_LOADING(state, status){
      state.sidebarLoading = status
    },
    SET_PROFILE_LOADING(state, status){
      state.profileLoading = status
    },
    SET_SINGLE_RECORD(state, payload){
      state.single = payload
    },
    SET_USER_EMAILS(state, payload){
      state.user_emails = payload
    },
    SET_ALL(state, payload) {
      state.all = payload
    },
    SET_ALL_EMAILS(state, payload){
      state.emails = payload
    },
    SET_ERRORS(state, error){
      state.errors = error
    },
    SET_PATH(state, path){
      state.path = path
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
