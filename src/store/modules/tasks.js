import leads from '@/api/leads';
import mLeads from '../modules/leads'
import tasks from '@/api/tasks'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingLeads: false,
    isLoadingUrl: false,
    s3_url:[],
    updateRow:false,
    successMessage: "",
    errorMessage: "",
    isSidebarLoading:false,
    otherAttachments:[],
    all: [],
    filter:[],
    audits: [],
    isAttachment:false,
    single: {},
    errors: {},
    isDriveAttachment:false,
    allAttachments:[]
  };
};

// initial state
const state = getDefaultState();

// getters
const getters = {}



// actions
const actions = {


  upload_file_s3({ commit },payload) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING_URL', true);
    return new Promise((resolve, reject) => {
      tasks.upload_file_s3(payload).then(({ data }) => {
        if(data.status_code == 200){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_ALL', data.data)
          commit('SET_URL', data.data)
          resolve()
        } if(data.status_code == 201 || data.status_code == 500) {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_URL', false))
    })
  },
  remove_file_s3({ commit },payload) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING_URL', true);
    return new Promise((resolve, reject) => {
      tasks.remove_file_s3(payload).then(({ data }) => {
        if(data.status_code == 200){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_ALL', data.data)
          // commit('SET_URL', data.data)
          resolve()
        } if(data.status_code == 201 || data.status_code == 500) {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_URL', false))
    })
  },
  fetch({ commit }) {
    mLeads.state.all = []

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
    commit('RESET_STATE');
    commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true)

    return new Promise((resolve, reject) => {
      tasks.audits().then(({ data }) => {
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
      tasks.store(payload).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  convertToClient({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_DRIVE_LOADING', true);
    return new Promise((resolve, reject) => {
      tasks.convertToClient(payload).then(({ data }) => {
        if(data.status == true){

          commit('SET_SUCCESS_MESSAGE', data.message);
          // const arr = []
          // commit('SET_')
          commit('SET_ALL_ATTACHMENTS2', data.data);

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
  convertToTask({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_DRIVE_LOADING', true);
    return new Promise((resolve, reject) => {
      tasks.convertToTask(payload).then(({ data }) => {
        if(data.status == true){

          commit('SET_SUCCESS_MESSAGE', data.message);
          // const arr = []
          // commit('SET_')
          commit('SET_ALL_ATTACHMENTS2', data.data);

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
  saveToWord({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_DRIVE_LOADING', true);
    commit('SET_IS_DRIVE_ATTACHMENT', true);

    return new Promise((resolve, reject) => {
      tasks.saveToWord(payload).then(({ data }) => {
        if(data.status == true){

          commit('SET_SUCCESS_MESSAGE', data.message);
          const arr = []
          data.data.forEach(element => {
            arr.push({
              name:element.original_name,
              attachment:element.drive_url
            });
          });
          commit('SET_ALL_ATTACHMENTS', arr);

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {commit('SET_DRIVE_LOADING', false)
      commit('SET_IS_DRIVE_ATTACHMENT', false)
    })
    })
  },
  saveToExcel({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_DRIVE_LOADING', true);
    commit('SET_IS_DRIVE_ATTACHMENT', true)

    return new Promise((resolve, reject) => {
      tasks.saveToExcel(payload).then(({ data }) => {
        if(data.status == true){

          commit('SET_SUCCESS_MESSAGE', data.message);
          const arr = []
          data.data.forEach(element => {
            arr.push({
              name:element.original_name,
              attachment:element.drive_url
            });
          });
          commit('SET_ALL_ATTACHMENTS', arr);

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() =>{ commit('SET_DRIVE_LOADING', false)
      commit('SET_IS_DRIVE_ATTACHMENT', false)
    
    })
    })
  },

  get({ commit }, id) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING_LEADS', true);

    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      tasks.get(id).then(({ data }) => {
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
      }).finally(() => 
      {
        commit('SET_IS_LOADING', false)
    commit('SET_IS_LOADING_LEADS', false);
    // commit('SET_ALL_SINGLE', data.data);

      }
      )
    })
  },
  getAttachments({ commit }, id) {
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);
    state.allAttachments = []

    commit('SET_IS_ATTACHMENT', true);
    return new Promise((resolve, reject) => {
      tasks.getAttachments(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          const arr = []
          // data.data.forEach(element => {
          //   if(element.drive_url){
          //     arr.push({
          //       attachment:element.drive_url,
          //       name:element.original_name
          //     });
          //   }else{
          //     arr.push({
          //       attachment:element.attachment,
          //       name:element.original_name
          //     });
          //   }
          // });
          commit('SET_ALL_ATTACHMENTS2', data.data);

          // commit('SET_SINGLE_REC/ORD', data.data);
          // commit('SET_ALL_Att', data.data);

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
        // commit('SET_IS_LOADING', false)
    commit('SET_IS_ATTACHMENT', false);
    // commit('SET_ALL_SINGLE', data.data);

      }
      )
    })
  },
  update({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      tasks.update({payload, id}).then(({ data }) => {
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
      tasks.filter(payload).then(({ data }) => {
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
    commit('SET_IS_LOADING', true)
    commit('SET_IS_LOADING_LEADS', true)

    return new Promise((resolve, reject) => {
      tasks.inline_update(payload).then(({ data }) => {
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
      }).finally(() => {
        commit('SET_IS_LOADING', false)
    commit('SET_IS_LOADING_LEADS', false)

      })
    })
  },
  destroy({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      tasks.destroy(id).then(({ data }) => {
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
  },
  deleteFromTask({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      tasks.deleteFromTask(id).then(({ data }) => {
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
    payload.forEach(element => {
      if(element.event === 'created' || element.event === 'updated'){

        state.audits.push(element)
      }
    });
  },
  SET_IS_ATTACHMENT(state,status){
    state.isAttachment = status
  },
  SET_IS_DRIVE_ATTACHMENT(state,status){
    state.isDriveAttachment = status
  },
  SET_ALL_ATTACHMENTS(state,payload){
    payload.forEach(element => {
      
      state.otherAttachments.push(element)
    });
  },
  SET_ALL_ATTACHMENTS2(state,payload){
    // payload.forEach(element => {
      
    // });
    state.allAttachments = payload
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_IS_LOADING_URL(state, status) {
    state.isLoadingUrl = status
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
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_ALL(state, payload) {
    mLeads.state.all = payload
    state.all = payload
  },
  SET_SUCCESS_SINGLE_ALL(state,payload){
    mLeads.state.all.push(payload)
      state.all.push(payload)
    
  },
  SET_ALL_SINGLE(state, payload){
    state.all = [payload]
  },
  SET_URL(state, payload) {
    payload.forEach(element => {
      
      state.s3_url.push(element)
    });
  },
  SET_UPDATE_ROW(state, status){
    state.updateRow = status
  },
  SET_SINGLE_RECORD(state, payload){
    state.single = payload
  },
  SET_SINGLE_RECORD_ALL(state,payload){
    let index = mLeads.state.all.findIndex(e => e.id === payload.id);
    mLeads.state.all.splice(index,1)
    mLeads.state.all.push(payload)
  }
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}