import timesheet from '@/api/timesheet'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingDelete: false,
    successMessage: "",
    isSidebarLoading:false,
    errorMessage: "",
    all: [],
    hours:{},
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
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      timesheet.fetch().then(({ data }) => {
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
  get({ commit }, id) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      timesheet.get(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => 
      {
        commit('SET_IS_LOADING', false)
    //     commit('SET_IS_LOADING', false)
    // commit('SET_IS_LOADING_LEADS', false);
    // commit('SET_ALL_SINGLE', data.data);

      }
      )
    })
  },
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      timesheet.store(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SUCCESS_STORE_ALL', data.data);
          // commit('SET_SUCCESS_STORE_ALL', data.data.result);


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
  update({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      timesheet.update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SUCCESS_SINGLE_ALL', data.data[0]);

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
  destroy({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_DELETE', true);
    return new Promise((resolve, reject) => {
      timesheet.destroy(id).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_LOADING_DELETE', false))
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
  SET_IS_LOADING_DELETE(state, status){
    state.isLoadingDelete = status
  },
  SET_SIDEBAR_LOADING(state, status){
    state.isSidebarLoading = status
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_SUCCESS_STORE_ALL(state,payload){
    state.hours = payload
  },
  SET_SUCCESS_SINGLE_ALL(state,payload){
    let index = state.all.findIndex(e => e.id === payload.id)
    state.all.splice(index,1)
    state.all.push(payload)
  },
  SET_ALL(state, payload) {
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