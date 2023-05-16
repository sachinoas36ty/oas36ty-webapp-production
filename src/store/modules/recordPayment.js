import recordPayment from '@/api/recordPayment'

const getDefaultState = () => {
  return {
    isLoading: false,
    successMessage: "",
    sidebarLoading:false,
    errorMessage: "",
    allData: [],
    all:[],
    single: {},
    errors: {}
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
      recordPayment.fetch().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
         setTimeout(() => resolve(), 1000);
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
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      recordPayment.store(payload).then(({ data }) => {
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
  storeMultiple({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      recordPayment.storeMultiple(payload).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  get({ commit }, id) {
    state.all = []
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);

    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      recordPayment.get(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
        //   commit('SET_SINGLE_RECORD', data.data);
          commit('SET_ALL_SINGLE', data.data);

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        commit('SET_IS_LOADING', false)
    // commit('SET_IS_LOADING_LEADS', false);
      
      })
    })
  },
  // update({ commit }, {payload, id}) {
  //   commit('RESET_MESSAGES');
  //   commit('SET_SIDEBAR_LOADING', true);
  //   return new Promise((resolve, reject) => {
  //     status.update({payload, id}).then(({ data }) => {
  //       if(data.status == true){
  //         commit('SET_SUCCESS_MESSAGE', data.message);
  //         resolve()
  //       } else {
  //         commit('SET_ERROR_MESSAGE', data.message);
  //         reject()
  //       }
  //     }).catch(({ response }) => {
  //       if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
  //       else commit('SET_ERROR_MESSAGE', response.data.message);
  //       reject()
  //     }).finally(() => commit('SET_IS_LOADING', false))
  //   })
  // },
  destroy({ commit }, id) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      recordPayment.destroy(id).then(({ data }) => {
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

// mutations
const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  RESET_MESSAGES(state) {
    state.successMessage = ""
    state.errorMessage = ""
  },
  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_SIDEBAR_LOADING(state, status){
    state.sidebarLoading = status
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_ALL(state, payload) {
    state.allData = payload
  },
  SET_ALL_SINGLE(state, payload) {
    state.all = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}