import contactPeople from '@/api/contactPeople'

const getDefaultState = () => ({
  isLoading: false,
  isLoadingLeads: false,
  successMessageLeads: '',
  successMessage: '',
  isSidebarLoading:false,
  errorMessage: '',
  latestCreated:{},
  all: [],
  emails: [],
  phones:[],
  allForLeads: [],
  single: {},
  singleData:{},
  errors: {},
  id: [],
  // length:0,
})

// initial state
const state = getDefaultState()

// getters
const getters = {

}

// actions
const actions = {
  fetch({ commit }) {
    commit('RESET_STATE')
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      contactPeople.fetch().then(({ data }) => {
        console.log(data.data)
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index]
          console.log(element)
        }
        if (data.status === true) {
          // let element
          // eslint-disable-next-line no-plusplus

          commit('SET_SUCCESS_MESSAGE', data.message)
          commit('SET_ALL', data.data.result)
          commit('SET_EMAILS', data.data.email)
          commit('SET_PHONES', data.data.phone)


          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        console.log(response)
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  showAll({ commit }) {
    // commit('RESET_STATE')
    state.all = []
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      contactPeople.showAll().then(({ data }) => {
        console.log(data.data)
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index]
          console.log(element)
        }
        if (data.status === true) {
          // let element
          // eslint-disable-next-line no-plusplus

          commit('SET_SUCCESS_MESSAGE', data.message)
          commit('SET_ALL', data.data.result)
          // commit('SET_ALL_FOR_LEADS', data.data.result)
         

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        console.log(response)
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  get({ commit }, id) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      contactPeople.get(id).then(({ data }) => {
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
  fetchForLeads({ commit }) {
    // commit('RESET_STATE')
    commit('SET_LEADS_LOADING', true)
    return new Promise((resolve, reject) => {
      contactPeople.fetchForLeads().then(({ data }) => {
        console.log('d', data)
        if (data.status === true) {
          // let element
          // eslint-disable-next-line no-plusplus

          commit('SET_SUCCESS_MESSAGE_LEADS', data.message)
          commit('SET_ALL_FOR_LEADS', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        console.log(response)
        commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_LEADS_LOADING', false))
    })
  },
  store({ commit }, payload) {
    commit('RESET_MESSAGES')
    commit('SET_SIDEBAR_LOADING', true)
    return new Promise((resolve, reject) => {
      contactPeople.store(payload).then(({ data }) => {
        if (data.status == true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
         
          commit('SET_SINGLE', data.data)
          commit('SET_LATEST_RECORD', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code == 'INVALID') commit('SET_ERROR_MESSAGE', response.data.message)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_SIDEBAR_LOADING', false))
    })
  },
  update({ commit }, { payload, id }) {
    commit('RESET_MESSAGES')
    commit('SET_SIDEBAR_LOADING', true)
    return new Promise((resolve, reject) => {
      contactPeople.update({ payload, id }).then(({ data }) => {
        if (data.status == true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          commit('SET_SINGLE_DATA', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally(() => commit('SET_SIDEBAR_LOADING', false))
    })
  },
  destroy({ commit }, id) {
    commit('RESET_MESSAGES')
    state.singleData = {}
    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      contactPeople.destroy(id).then(({ data }) => {
        if (data.status == true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
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
}

// mutations
const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  RESET_MESSAGES(state) {
    state.successMessage = ''
    state.errorMessage = ''
  },
  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message
    // state.length = state.all.data.length
  },
  SET_SINGLE_DATA(state, payload){
    state.single = payload
  },
  SET_SINGLE(state,payload){
    state.singleData = payload
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_SIDEBAR_LOADING(state, status){
    state.isSidebarLoading = status
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_SUCCESS_MESSAGE_LEADS(state,message){
    state.successMessageLeads = message
  },
  SET_LEADS_LOADING(state,status){
    state.isLoadingLeads = status
  },
  SET_EMAILS(state, payload){
    state.emails = payload
  },
  SET_PHONES(state, payload){
    state.phones = payload
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_ALL(state, payload) {
    state.all = payload
  },
  SET_ALL_FOR_LEADS(state, payload) {
    state.allForLeads = payload
  },
  SET_LATEST_RECORD(state,payload){
    state.latestCreated = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
