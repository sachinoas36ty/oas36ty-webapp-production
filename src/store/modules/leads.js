import leads from '@/api/leads'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingLeads: false,
    updateRow:false,
    successMessage: "",
    isSidebarOpen:false,
    errorMessage: "",
    description:"",
    expandedTaskId:null,
    isSidebarLoading:false,
    all: [],
    filter:[],
    checkRead:[],
    audits: [],
    single: {},
    errors: {},
    preventExpand:{}
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
    commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      leads.fetch().then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        commit('SET_IS_LOADING_LEADS', false)
        commit('SET_IS_LOADING', false)
      })
    })
  },
  fetchwithoutLoading({ commit }) {
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);
    // commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      leads.fetchwithoutLoading().then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        // commit('SET_IS_LOADING_LEADS', false)
        // commit('SET_IS_LOADING', false)
      })
    })
  },

  audits({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true)

    return new Promise((resolve, reject) => {
      leads.audits().then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_AUDITS', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        
        commit('SET_IS_LOADING_LEADS', false)
        commit('SET_IS_LOADING', false)
    
    })
    })
  },
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.store(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SUCCESS_SINGLE_ALL', data.data[0]);
          commit('SET_SUCCESS_FILTER_ALL', data.data[0]);


          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  markAsRead({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.markAsRead(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SUCCESS_READ', data.data[0]);

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  markTask({ commit }, payload) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.markTask(payload).then(({ data }) => {
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
      }).finally(() =>{ 
        // commit('SET_IS_SIDEBAR_LOADING', false)
    })
    })
  },
  strip({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.strip(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_STRIP_DESCRIPTION', data.data);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  get({ commit }, id) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING_LEADS', true);

    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.get(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SINGLE_RECORD', data.data);
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
    commit('SET_IS_LOADING_LEADS', false);
      
      })
    })
  },
  userViseTasks({ commit }, id) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING_LEADS', true);

    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.userViseTasks(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_SINGLE_RECORD', data.data);
          commit('SET_ALL', data.data);

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
    commit('SET_IS_LOADING_LEADS', false);
      
      })
    })
  },
  update({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SINGLE_RECORD_ALL', data.data[0])
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  filter({ commit }, payload) {
    // commit('RESET_STATE')
    // commit('SET_IS_LOADING_LEADS', true)
    return new Promise((resolve, reject) => {
      leads.filter(payload).then(({ data }) => {
        console.log(data);
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally( () => {
        commit('SET_IS_LOADING_LEADS', false)
      })
      
    })
  },
  inline_update({ commit }, payload) {
    // commit('RESET_STATE')
    commit('SET_IS_LOADING_LEADS', true);

    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      leads.inline_update(payload).then(({ data }) => {
        console.log(data);
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          // reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally( () =>{ commit('SET_IS_LOADING', false)
    commit('SET_IS_LOADING_LEADS', false)

    })
    })
  },
  inline_update2({ commit }, payload) {
    // commit('RESET_STATE')
    commit('SET_IS_LOADING_LEADS', true);

    commit('SET_IS_LOADING', true)
    return new Promise((resolve, reject) => {
      leads.inline_update(payload).then(({ data }) => {
        console.log(data);
        if (data.status === true) {
          commit('SET_SUCCESS_MESSAGE', data.message)
          // commit('SET_ALL', data.data)

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message)
          // reject()
        }
      }).catch(({ response }) => {
        if (response.data.code === 'INVALID') commit('SET_ERRORS', response.data.errors)
        else commit('SET_ERROR_MESSAGE', response.data.message)
        reject()
      }).finally( () =>{ commit('SET_IS_LOADING', false)
    commit('SET_IS_LOADING_LEADS', false)

    })
    })
  },
  destroy({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      leads.destroy(id).then(({ data }) => {
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
  SET_AUDITS(state, payload){
    state.audits = payload
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_SUCCESS_READ(state,payload){
    state.checkRead = []

    state.checkRead.push(payload)
  },
  SET_SUCCESS_FILTER_ALL(state,payload){
    state.filter = []
    state.filter.push(payload)
  },
  SET_IS_LOADING_LEADS(state, status){
    state.isLoadingLeads = status;
  },
  SET_FILTER(state, payload){
    state.filter = payload
  },
  SET_IS_SIDEBAR_LOADING(state, status){
    state.isSidebarLoading = status;
  },
  SET_SUCCESS_SINGLE_ALL(state,payload){
    state.all.push(payload)
  },
  SET_STRIP_DESCRIPTION(state,payload){
    state.description = payload
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
  SET_ALL_SINGLE(state, payload){
    state.all = [payload]
  },
  SET_UPDATE_ROW(state, status){
    state.updateRow = status
  },
  SET_SINGLE_RECORD(state, payload){
    state.single = payload
  },
  SET_SINGLE_RECORD_ALL(state,payload){
    let index = state.all.findIndex(e => e.id === payload.id);
    state.all.splice(index,1)
    state.all.push(payload)
    state.preventExpand = payload
  }
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}