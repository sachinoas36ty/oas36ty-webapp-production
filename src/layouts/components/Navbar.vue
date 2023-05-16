<template>
  <div class="navbar-container d-flex content align-items-center ">

    <!-- <snackbar ref="snackbar"  class="hello" position="bottom-left" :multiple="false" style="
    z-index: 2000!important;
    
    "  /> -->

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>
    <div class="navbar-container d-flex content align-items-center " id="mainDiv">
      <!-- Left Col -->
      <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
        <!-- <dark-Toggler class="d-none d-lg-block" /> -->
        <!-- <feather-icon icon="MailIcon" size="25"/> -->
      </div>


      <b-navbar-nav class="nav align-items-center ml-auto">
        <search-bar style="margin-right: 0.5rem;" />
        <feather-icon size="20" style="margin-right: 0.5rem;" icon="ClockIcon" v-b-modal.timesheet-modal />
        <feather-icon class="cursor-pointer" size="20" style="margin-right: 0.5rem;" icon="FileIcon" @click="openSidebar" />

        <!-- <notification-dropdown/> -->
        <bookmarks />

        <b-sidebar id="sidebar-right" bg-variant="white" right no-header backdrop shadow
          v-model="$store.state.leads.isSidebarOpen">
          <div class="b-overlay-wrap position-relative">

          <div class="p-1">
            <Mentionable
                      style="width: 100%;"
                      :keys="['@']"
                      :items="users_to_assign"
                      offset="6"
                      insert-space
                      @open="onOpen"
                      @apply="onApply"
                    >
            <b-form-input @input="checkValid" @keydown.enter="handleEnter" v-model="to_do" @keydown.ctrl.enter="handleCtrlEnter" placeholder="Type and (ctrl + enter) to add ..."></b-form-input>
            <b-form-invalid-feedback class="d-block">
            {{ errors.todo }}
            </b-form-invalid-feedback>
            <template #no-result>
                        <div class="dim">
                          No result
                        </div>
                      </template>

                      <template #item-@="{ item }">
                        <div class="user">
                          <b-avatar :src="item.avatar"> </b-avatar>
                          <span class="ml-1">
                            {{ item.value }}
                            <!-- ({{ item.name }}) -->
                          </span>
                        </div>
                      </template>
            </Mentionable>
          
            <b-dropdown class="mt-1 " text="Filter" variant="primary" size="sm">
              <b-dropdown-item @click="showAll()">
                List All
              </b-dropdown-item>
              <b-dropdown-item @click="showMyTodos()">
                My Todos
              </b-dropdown-item>
              <b-dropdown-item @click="showPersonal()">
                Personal
              </b-dropdown-item>
              <b-dropdown-item @click="showPending()">
                List Pending
              </b-dropdown-item>
              <b-dropdown-item @click="showComplete()">
                List Completed
              </b-dropdown-item>
            </b-dropdown>
            <!-- <div class="text-right"> -->

    <!-- </div> -->



          </div>
          <div v-if="allTodos.length > 0">

          <div class="todo-list" style="margin-left:-1rem;">
              <div class="todo-note">
                <b-form id="notes-form">
                  <!-- <ul class="todo-list-ul" style="list-style:none;overflow-y: auto;max-height: 40rem;"> -->
                    <vue-perfect-scrollbar id="scrollContainer" @scroll="handleScroll" :settings="{
      maxScrollbarLength: 60,
    }" class=" todo-list search-list search-list-bookmark scroll-area"
          :class="{ 'show': allTodos.length }" tagname="ul">
                    <li v-for="data in allTodos" :key="String(Number(data.id+1))" style="padding-bottom: 1rem;
    border-bottom: 1px solid #b9b9c3 ;">
                      <del  v-if="data.status === 'done'">
                      <div  class="demo-checkbox mt-1 disabled">
                        <input disabled @change="updateTodo()" v-model="data.checked" type="checkbox" name="" id="" style="vertical-align: middle;">
                        <span class="break-word pre-formatted ">
                            {{ data.to_do }}
                          <b-badge v-if="data.task_id" class="cursor-pointer" @click="goToTask(data.task_id)" variant="primary">
                            #{{data.task_id}}
                          </b-badge>
                        </span>
                      </div>
                    </del>
                    <div v-else class="demo-checkbox mt-1">
                        <input @change="updateTodo()" v-model="data.checked" type="checkbox" name="" id="" style="vertical-align: middle;">
                        <span class="break-word pre-formatted ">
                            {{ data.to_do }}
                          <b-badge v-if="data.task_id" class="cursor-pointer" @click="goToTask(data.task_id)" variant="primary">
                            #{{data.task_id}}
                          </b-badge>
                        </span>
                      </div>
                      <span :class="{'disabled':data.status === 'done'}" style="margin-top:1rem;font-size: 11px;
    color: #aaa;
    position: relative;
    bottom: -3px;
    display: inline-block;
    width: 100%;
    text-align: right;
    right: 10px;" class="ownership">{{getUserName(data.user_id)}} - {{getDate(data)}}</span>
                    </li>
                    </vue-perfect-scrollbar>
                  <!-- </ul> -->
                </b-form>

              </div>
            </div>
            <div class="text-right" >
              <button  :disabled="$store.state.appTodo.page_info.prev_page_url === null" class="text-right   btn btn-primary btn-sm mt-1 ml-1" @click="getPreviousTodos()">
                <feather-icon icon="ChevronLeftIcon" />
              </button>
            <button :disabled="$store.state.appTodo.page_info.next_page_url === null" class="text-right btn btn-primary btn-sm mt-1 ml-1" @click="getNextTodos()">
              <feather-icon icon="ChevronRightIcon" />
            
            </button>
          </div>
          </div>
          
          <div v-else class="p-1 text-center">
            No Records to show
          </div>
          <div v-if="$store.state.appTodo.isL" class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;/* display: none; */">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
                <br><span style="margin-left:-2rem;">Fetching Todolist..</span>
              </div>
            </div>
</div>


          <!-- <sidebar-content /> -->
        </b-sidebar>
        <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
          <template #button-content>
            <div class="d-sm-flex d-none user-nav">
              <!-- <p class="user-name font-weight-bolder mb-0">
              {{ name }} ({{ tenant.organization.name }})
            </p> -->

              <!-- <span class="user-status">{{ email }}</span> -->
            </div>
            <!-- <b-avatar 
            size="40"
            variant="light-primary"
            badge
            :src="JSON.parse(localStorage.getItem('userData')).avatar  ? JSON.parse(localStorage.getItem('userData')).avatar : require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
         -->
            <!-- {{localStorage.getItem('userData')}} -->
            <b-avatar size="40" variant="light-primary" badge :src="avatar" class="badge-minimal"
              badge-variant="success" />
            <!-- <b-avatar 
            size="40"
            variant="light-primary"
            badge
            :src="'https://ui-avatars.com/api/?name='+name"
            class="badge-minimal"
            badge-variant="success"
            /> -->
            <feather-icon icon="ChevronDownIcon" />



          </template>

          <b-dropdown-item v-b-modal.profile-modal link-class="d-flex align-items-center">
            <feather-icon size="16" icon="UserIcon" class="mr-50" />
            <span>Profile</span>
          </b-dropdown-item>

          <b-dropdown-item link-class="d-flex align-items-center" v-b-modal.modal-switch-organization>
            <feather-icon size="16" icon="RefreshCcwIcon" class="mr-50" />
            <span>Switch</span>
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
            <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
            <span>Logout</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <modal-switch-organization />

    </div>







  </div>
</template>

<script>
import SearchBar from '../../@core/layouts/components/app-navbar/components/SearchBar.vue'
import NotificationDropdown from '../../@core/layouts/components/app-navbar/components/NotificationDropdown.vue'
import { Mentionable } from "vue-mention";

// import {BSidebar} from 'bootstrap-vue'

import {
  BLink,BForm,BBadge,BFormInvalidFeedback,
  BNavbarNav,
  BNavItemDropdown, VBToggle, BDropdown,
  BDropdownItem, BSidebar,
  BDropdownDivider, BFormInput,
  BAvatar
  ,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import "vue-toastification/dist/index.css";

import { getUserData } from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import ModalSwitchOrganization from "./ModalSwitchOrganization.vue";
import ProfileModal from "./ProfileModal.vue";
// import { BDropdown } from 'bootstrap-vue'
import Snackbar from 'vuejs-snackbar';
import storeAll from '../../store/index'
import Bookmarks from '@/@core/layouts/components/app-navbar/components/Bookmarks.vue';
import store from '@/store';
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  data() {
    return {
      errors:{
        todo:'',
      },
      scrollEndCalled:false,
      list:{
        all:true,
        myTodos:false,
        personal:false,
        complete:false,
        pending:false,

      },
      show: true,
      isOpen: false,
      to_do:'',
      subtask_mentions:[],
      search:''

    }
  },
  created() {
    this.$store.dispatch('appTodo/getAll')
    const data = { email: JSON.parse(localStorage.getItem('userData')).email, tenant_id: JSON.parse(localStorage.getItem('userData')).tenant.id }
    this.$store.state.auth.org = JSON.parse(localStorage.getItem('userData'))
    this.$store.dispatch('auth/fetchOrganization', data)
    // this.$store.dispatch(`users/get`, JSON.parse(localStorage.getItem('userData')).id);  
  },
  computed: {
    allTodos(){
      let all = this.$store.state.appTodo.allTodo
      let arr = []
      all.forEach(element => {
        if(this.list.all === true){
          
          arr.push(element)
        }
        if(this.list.myTodos === true){
          if(element.task_id ){

            arr.push(element)
          }
        }
        if(this.list.personal === true){
          if(!element.task_id ){

          arr.push(element)
          }
        }
        if(this.list.complete === true){
          if(element.status === 'done' ){

          arr.push(element)
          }
        }
        if(this.list.pending === true){
          if(element.status === 'not-done' ){

          arr.push(element)
          }
        }
      });
      arr.forEach(element => {
        element.checked = false
      });
      return arr;
    },
    users_to_assign() {
      var items = this.$store.state.users.all.filter(
        (e) => e.email !== JSON.parse(localStorage.getItem("userData")).email
      );
      var data = [];
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead");
      var user_assigned = [];

      // return user_assigned;
      for (let index = 0; index < items.length; index++) {
        // for (let i = 0; i < leads.length; i++) {
        // for (let j = 0; j < leads[i].users.length; j++) {
        //  user_assigned[j] = {
        //     id: leads[i].users[j].id,
        //     name: leads[i].users[j].name,
        //     avatar: leads[i].users[j].avatar,

        //  }
        // user_assigned = leads[i]
        // }

        data[index] = {
          id: items[index].id,
          value: items[index].name,

          name: items[index].name,
          avatar: items[index].avatar,
        };
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }

        // }
        // }
      }
      return data
      // .filter((country) =>
      //   country.name
      //     .toLocaleLowerCase()
      //     .includes(this.search.toLocaleLowerCase())
      // );
    },
    avatar() {
      var id = JSON.parse(localStorage.getItem('userData')).id;
      var user_data = this.$store.state.users.all;
      var index = user_data.findIndex(e => e.id === id);

      // return JSON.parse(localStorage.getItem('userData')).avatar != null ? JSON.parse(localStorage.getItem('userData')).avatar : 'https://ui-avatars.com/api/?name='+JSON.parse(localStorage.getItem('userData')).name
      return index !== -1 ? user_data[index].avatar : JSON.parse(localStorage.getItem('userData')).avatar
    },
    name() {
      return this.$store.state.auth.org.name;
    },
    email() {
      return this.$store.state.auth.org.email;

    },
    tenant() {
      return this.$store.state.auth.org.tenant;

    }



    // isLogout:false,

  },
  directives: {
    'b-toggle': VBToggle,
  },
  components: {
    BLink,
    SearchBar,
    BNavbarNav,VuePerfectScrollbar,
    BNavItemDropdown,
    Snackbar,
    BDropdownItem, VBToggle,
    ProfileModal, BSidebar,BForm,BBadge,
    NotificationDropdown, BDropdown,
    BDropdownDivider,
    BAvatar, BFormInput,BFormInvalidFeedback,
    // Navbar Components
    Mentionable,
    DarkToggler,
    ModalSwitchOrganization,
    Bookmarks
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },
  methods: {
    checkValid(){
      if(this.to_do.trim()){
        this.errors.todo = null
      }
    },
    updateTodo(){
      let todo_id = 0;
      this.allTodos.forEach(element => {
        if(element.checked){
          todo_id = element.id
        }
      });
      this.$store.dispatch('appTodo/update', {
        payload:{
          status:'done'
        },
        id:todo_id
      }).then(() => {
        this.$store.dispatch('appTodo/getAll')
      })
    },
    handleScroll(){
      console.log('h');
      const container = document.getElementById('scrollContainer')
      const scrollPosition = container.scrollTop + container.clientHeight;
      const scrollHeight = container.scrollHeight;

      // Check if the scroll is about to finish (within a threshold, e.g., 20 pixels)
      if (scrollPosition >= scrollHeight - 10 ) {
        // Call your desired function when scroll is about to finish
        // this.getNextTodos();
        this.scrollEndCalled = true;

      }
    },
    getNextTodos(){
      let next_url = this.$store.state.appTodo.page_info.next_page_url;
      this.$store.dispatch('appTodo/paginate', next_url)
      // this.scrollEndCalled = false
      // alert('hey')
      // document.getElementById('scrollContainer').scrollTop = 0

    },
    getPreviousTodos(){
      let prev_url = this.$store.state.appTodo.page_info.prev_page_url;
      // alert(prev_url)
      this.$store.dispatch('appTodo/paginate', prev_url)
    },
    showAll(){
      this.list.all = true
      this.list.personal = false
      this.list.myTodos = false
      
      this.list.pending = false
      this.list.complete= false


    },
    showMyTodos(){
      this.list.myTodos = true
      this.list.all = false
      this.list.pending = false

      this.list.personal = false
      this.list.complete= false
    },
    showPersonal(){
      this.list.personal = true
      this.list.myTodos = false
      this.list.all = false
      this.list.pending = false
      this.list.complete= false
    },
    showComplete(){
      this.list.complete = true
      this.list.personal = false
      this.list.myTodos = false
      this.list.all = false
      this.list.pending = false
    },
    showPending(){
      this.list.complete = false
      this.list.personal = false
      this.list.myTodos = false
      this.list.all = false
      this.list.pending = true
    },
    onOpen(){

    },
    onApply(item, key, replacedWith) {
      let count = 0
      this.subtask_mentions.forEach(element => {
        if(element.id === item.id){
          count++
        }
      });
      if(count === 0){
        this.subtask_mentions.push({ name: item.name, id: item.id })
      }else{

        let index = this.subtask_mentions.findIndex(e => e.id === item.id)
        if(index !=-1){
          
          this.subtask_mentions.splice(index,count)
        }
        
      }

      console.log(item, `has been replaced with ${replacedWith}`)
    },
    handleEnter(event){
      console.log('fdjkm');
      event.preventDefault()
    },
    handleCtrlEnter(event) {
      if (event.keyCode === 13) { // Check if Enter key is pressed
        event.preventDefault();
        let d = this.to_do.trim()
        if(d){
          
          this.handleButtonClick();
        }else{
          this.errors.todo = 'This field is required!'
          return;
      //     const regex = /^[a-zA-Z\s]+$/;
      // return !regex.test(this.to_do);
        }
      }
    },
    handleButtonClick(){
      
      let data = [
        {
          to_do:this.to_do,
          user_ids:this.subtask_mentions,
          
        }
      ]
      this.$store.dispatch('appTodo/store',{
        to_dos:data
      }).then(() => {
        this.to_do = null
        this.$store.dispatch('appTodo/getAll')
      })
    },
    goToTask(id){
      if(this.$router.currentRoute.name === 'tasks' || this.$router.currentRoute.name === 'leads'){
        this.$store.dispatch('leads/get',id)
      }else{
        let type = this.$store.state.leads.all.filter(e => e.id === id)[0].type

      
      if (type === 'task') {

this.$router.push({
  name: 'tasks',
  params: {
    status: true,
    lead_id:  id
  }
})
} else {
this.$router.push({
  name: 'leads',
  params: {
    status: true,
    lead_id: id
  }
})
}
      }
    },
    getDate(data){
      const d = new Date(data.created_at)
      return d.toDateString()
    },
    getUserName(id){
      let user = JSON.parse(localStorage.getItem('userData'))
      if(user.id === id){
        return user.name;
      }
    },
    openSidebar() {
      // this.$bvToggle.show('sidebar-right')
      this.$store.dispatch('appTodo/getAll').then(() => {

        this.$store.state.leads.isSidebarOpen = !this.$store.state.leads.isSidebarOpen
      })
    },
    reset_store_variables() {
      let stor = this.$store.state;
      stor.expenses.all = []
      stor.expenses.single = []
      stor.expenses.errors = {}

      stor.categories.all = []
      stor.categories.single = []
      stor.categories.errors = {}


      stor.designation.all = []
      stor.designation.single = []
      stor.designation.errors = {}


      stor.status.all = []
      stor.status.all_master = []
      stor.status.single = []
      stor.status.errors = {}


      stor.clients.all = []
      stor.clients.single = []
      stor.clients.errors = {}

      stor.users.all = []
      stor.allUsers.single = []
      stor.allUsers.errors = {}

      stor.attachments.all = []
      stor.attachments.links = []

      stor.attachments.single = []
      stor.attachments.errors = {}

      stor.users.all = []
      stor.users.user_emails = []
      stor.users.emails = []

      stor.users.single = []
      stor.users.errors = {}

      stor.contactPeople.all = []
      stor.contactPeople.single = []
      stor.contactPeople.emails = []
      stor.contactPeople.phones = []
      stor.contactPeople.allForLeads = []
      stor.contactPeople.errors = {}

      stor.invoice.all = []
      stor.invoice.allData = []
      stor.invoice.single = []
      stor.invoice.errors = {}


      stor.recordPayment.all = []
      stor.recordPayment.allData = []
      stor.recordPayment.single = []
      stor.recordPayment.errors = {}

      stor.proposals.all = []
      stor.proposals.allBank = []
      stor.proposals.allProposals = []

      stor.proposals.single = []
      stor.proposals.errors = {}


      stor.leads.all = []
      stor.leads.filter = []
      stor.leads.single = []
      stor.leads.errors = {}

      stor.tasks.all = []
      stor.tasks.filter = []
      stor.tasks.s3_url = []

      stor.tasks.single = []
      stor.tasks.errors = {}

      stor.subtaskTemplate.all = []
      stor.subtaskTemplate.single = []
      stor.subtaskTemplate.errors = {}

      stor.emailTemplate.all = []
      stor.emailTemplate.single = []
      stor.emailTemplate.errors = {}

      stor.branches.all = []
      stor.branches.single = []
      stor.branches.businessTypes = []
      stor.branches.states = []
      stor.branches.logo = []

      stor.branches.errors = {}

    },

    logout() {
      // var t = 'info';
      // this.$refs.snackbar[t](this.$store.state.auth.successMessage)

      this.$store.dispatch("auth/logout").then(() => {

        this.$toast.success('Logged Out Successfully!', {
          position: "bottom-left",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
        router.push({ name: "auth-login" });
        // storeAll.commit('branches','RESET_STATE')
        //         let state = this.$store.state;
        // let newState = {};
        localStorage.clear()
        this.reset_store_variables()
        // Object.keys(state).forEach(key => {
        //   newState[key] = null; // or = initialState[key]
        // });

        // this.$store.replaceState({});

      });
      // var t = 'info';
      //   this.$refs.snackbar[t]('You have successfully logged out!')
      // if(this.isLogout == true){
      //   var t = 'info';
      //   this.$refs.snackbar[t](this.$store.state.auth.successMessage)
      //   this.isLogout = false;
      // }
    },

  },
};
</script>
<style  >#hi {
  display: none !important;
}

#mobileMenu {
  display: none !important;
}

/* @media (max-width: 365px){
        #mainDiv{
          display: none !important;
        }
        #mobileMenu{
  display: block !important;
}

  
    }
   */
.header-navbar .navbar-container ul.navbar-nav li>a.nav-link {
  margin: -4px;
}</style>
