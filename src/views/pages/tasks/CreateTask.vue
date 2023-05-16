<template>
    <div>
         <b-button size="sm" variant="primary"  v-b-modal.modal-leads>
              <span class="text-nowrap">Create</span>
            </b-button>
            <b-modal 
            no-close-on-backdrop
      id="modal-leads"
      ref="modal-leads"
      size="lg"
      title="add new task"
      hide-footer
    >
    <!-- <b-card-body> -->
      <validation-observer #default="{handleSubmit}" ref="refFormObserver">

      <b-form @submit.prevent="handleSubmit(onSubmit)">
     
        <b-row v-if="branches.length > 1">
            <b-col md="3" >
                <b-form-group  label="Contact Person">
                    <v-select  v-model="formData.contact_person_id" :options="contactPeople" label="name" placeholder="Search Contact" >
                        <template #list-header class="add_contacts">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-contact>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Contact
            </a>
            
            
        </div>
    </template>
    <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">
                      
                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
</v-select>
<!-- <create-contact/> -->
                    
                </b-form-group>
            </b-col>
            
            <b-col md="3">
                <b-form-group label="Client">
                    <v-select :options="clients" label="name" v-model="formData.company_id" placeholder="Search Client">
                        <template #list-header class="add_clients">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-clients>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Client</a>
            </div>
            </template>
            <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                    </v-select>
                    <!-- <create-clients /> -->
                </b-form-group>
            </b-col>
            <b-col md="3">
                <b-form-group label="Category">
                    <v-select placeholder="Search Category" v-model="formData.category_id" label="name" :options="categories" @input="categoryUser">
                      <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                      </v-select>

                </b-form-group>
            </b-col>
            <b-col md="3">
                <validation-provider
                #default="validationContext"
                name="branch_id"
                vid="branch"
                rules="required"
                >

                    <b-form-group label="Branch">
                        <v-select   id="branch" placeholder="Search Branch" v-model="formData.branch_id" label="name" :options="branches">
                          <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                          </v-select>
                        <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>

        <b-row v-if="(branches.length === 1)">
            <!-- <b-form-input  id="branches"  :value="branches[0].id" /> -->
            
            <b-col md="4">
              <b-form-group  label="Contact Person">
                    <v-select  v-model="formData.contact_person_id" :options="contactPeople" label="name" placeholder="Search Contact" >
                        <template #list-header class="add_contacts">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-contact>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Contact
            </a>
            
            
        </div>
    </template>
    <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
</v-select>
<!-- <create-contact/> -->
                    
                </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group label="Client">
                    <v-select :options="clients" label="name" v-model="formData.company_id" placeholder="Search Client">
                        <template #list-header class="add_clients">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-clients>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Client</a>
            </div>
            </template>
            <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                    </v-select>
                    <!-- <create-clients /> -->
                </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Category">
                    <v-select placeholder="Search Category" v-model="formData.category_id" label="name" :options="categories" @input="categoryUser"/>

                </b-form-group>
            </b-col>
            
        </b-row>



      <validation-provider
        #default="validationContext"
        name="subject"
        vid="subject"
        rules="required"
      >
        <b-row>
          <b-col md="12 ">
            <b-form-group  label="Subject" label-for="contact">
              <b-form-input   
              placeholder="Enter Subject"
              id="subject" v-model="formData.subject">

              </b-form-input>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>
      </validation-provider>
      <b-row>
          <b-col md="12 ">
            <b-form-group  label="Description" label-for="contact">
                <quill-editor  v-model="formData.description" :options="editorOption">

<div id="toolbar" slot="toolbar">
  <!-- Add a bold button -->

</div>
</quill-editor>
              <!-- <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback> -->
            </b-form-group>
          </b-col>
          
        </b-row>

        <b-row>
            <b-col md="4">
                <b-form-group label="Assigned To">
                    <v-select multiple placeholder="Search Employee" label="name" v-model="formData.users" :options="allUsers" >
                      <template #list-header class="add_users">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-user>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Employee</a>
            </div>
            </template>
                    </v-select>
                   
                </b-form-group>
            </b-col>
            <!-- <InviteUser /> -->
            <b-col md="4">
            <validation-provider
            #default="validationContext"
        name="due_date"
        vid="due_date"
        rules="required"
            >

                <b-form-group label="Due Date">
                    <flat-pickr id="due_date"  
                  v-model="formData.due_date" class="form-control" placeholder="Due Date" />
                    <!-- <b-form-datepicker placeholder="Due Date" id="due_date"   
                  v-model="formData.due_date"  /> -->
                  <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
        </b-col>

            <b-col md="4">
                <validation-provider
                #default="validationContext"
                name="priority"
        vid="priority"
        rules="required"
                >

                    <b-form-group label="Priority">
                        <v-select   autofocus v-model="formData.priority" label="id" :options="importance.slice().reverse()" input-id="priority" placeholder="Search Priority" >
                          <template #option="{ id, icon }">
            <div v-if="(id === 1)">

              <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16" class="align-middle mr-50" />Lowest
            </div>
            <div v-if="(id === 2)">

              <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16" class="align-middle mr-50" />Low
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
            </div>
            <div v-if="(id === 3)">

              <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16" class="align-middle mr-50" />Medium
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
            </div>

            <div v-if="(id === 4)">

              <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16" class="align-middle mr-50" />High
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
            </div>
            <div v-if="(id === 5)">

              <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16" class="align-middle mr-50" />Highest
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
              <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

            </div>
            <!-- <feather-icon v-if="star === '* * *'"

            icon="StarIcon"
            size="16"
            class="align-middle mr-50"
          /> -->
            <!-- <span> {{ title }}</span> -->
          </template>

          <template #selected-option="{ id, icon }">
              <div v-if="(formData.priority.id === id && id === 1)">

<feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16" class="align-middle mr-50" />Lowest
</div>
<div v-if="(formData.priority.id === id && id === 2)">

<feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16" class="align-middle mr-50" />Low
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
</div>
<div v-if="(formData.priority.id === id && id === 3)">

<feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16" class="align-middle mr-50" />Medium
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
</div>

<div v-if="(formData.priority.id === id && id === 4)">

<feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16" class="align-middle mr-50" />High
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
</div>
<div v-if="(formData.priority.id === id && id === 5)">

<feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16" class="align-middle mr-50" />Highest
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
<!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

</div>
            <!-- <feather-icon v-if="star === '* * *'"

            icon="StarIcon"
            size="16"
            class="align-middle mr-50"
          /> -->
            <!-- <span> {{ title }}</span> -->
          </template>
                        </v-select>
                        <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>
        <div class="text-right ">
           <b-button size="sm" variant="primary" @click="closeModal()">
            Cancel
          </b-button>&emsp;
 <b-button size="sm"  :disabled="$store.state.tasks.isSidebarLoading"  variant="primary" type="submit" >
  Save    
  <b-spinner small class="ml-1" v-if="$store.state.tasks.isSidebarLoading"/>
</b-button >
</div>
      </b-form>
      </validation-observer>
    <!-- </b-card-body> -->
    </b-modal>
    </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'

import {BModal,
  BFormInvalidFeedback,BFormDatepicker,VBTooltip,
  // BSpinner,
  BForm,VBModal, BFormInput,BFormGroup, BCard, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner  } from 'bootstrap-vue';
import store from '@/store';
import formValidation from '@/@core/comp-functions/forms/form-validation';
import { ref, computed } from "@vue/composition-api";
import { required, email } from "@validations";
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
// import { mapGetters } from 'vuex'
import CreateContact from '../leads/CreateContactLead.vue';
import CreateClients from '../leads/CreateClientLead.vue';

// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
// import InviteUser from '../users/InviteUser.vue';
export default {
  components:{
    quillEditor,
    CreateContact,
    CreateClients,
    flatPickr,
    BFormDatepicker,
    BForm,
    BFormGroup,VBTooltip,
    BButton,
    BModal,
    BFormInvalidFeedback,
    BFormInput,
    BRow,
    BCol,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    vSelect,
    // InviteUser
},
  data(){
    return { 
        importance: [{ id: 1, star: '*' }, { id: 2, star: '* *' }, { id: 3, star: '* * *' }, { id: 4, star: '* * * *' }, { id: 5, star: '* * * * *' }],

        editorOption: {
        modules: {
          toolbar: false,
        },
        placeholder: 'Enter Description'
      },
      subject:'',
      due_date: '',
      priority:[],
      contact_person_id:null,
      company_id:null,
      branch_id:null,
      category_id:null,
      users: [],
      default_branch_id:'',
      type: 'lead',
      description: '',
      required,
    //   email: '',
    }
  },
  directives:{
    'b-modal': VBModal,
    'b-tooltip':VBTooltip,
  },
  computed:{
    isLoading() {
      return this.$store.state.tasks.isSidebarLoading
    },
    successMessage() {
      return this.$store.state.tasks.successMessage
    },
    errorMessage() {
      return this.$store.state.tasks.errorMessage
    },
    // errors() {
    //   return JSON.parse(JSON.stringify(this.$store.state.leads.errors))
    // },
    categoryLength() {
      return this.categories.length
    },
    categories() {
      return this.$store.state.categories.all
    },
    branches() {
      if(this.$store.state.branches.all.length === 1){
        this.default_branch_id = this.$store.state.branches.all[0].id
      }
      console.log('Branches:', this.$store.state.branches.all)
      // this.value_of_branches =  this.$store.state.branches.all[0].id
      return this.$store.state.branches.all
    },
    clients() {
      return this.$store.state.clients.all
    },
    contactPeople() {
      return this.$store.state.contactPeople.allForLeads
    },
    allUsers() {
      return this.$store.state.users.all
    },
  },
  created(){
    this.fetchBranches()
    // console.log(this);
    this.fetchCategories()
    this.fetchClients()
    this.fetchContactPeople()
    this.fetchAllUsers()
  },
  beforeUpdate(){
    if(this.formData.category_id == ''){
            this.formData.users = [];
            this.formData.due_date = ''
        }
  },
  methods:{
//     onSubmit(){
   
//    if (this.$store.state.branches.all.length === 1) {
//      // console.log(formData);
//      alert('hehe')
//      this.formData.branch_id = { b_id: this.default_branch_id };
//    }
//    if(this.branches.length === 0){
//     this.$toast.error('Branch is Required', {
//         position: "bottom-left",
//         timeout: 5000,
//         closeOnClick: true,
//         pauseOnFocusLoss: true,
//         pauseOnHover: true,
//         draggable: true,
//         draggablePercent: 0.6,
//         showCloseButtonOnHover: false,
//         hideProgressBar: true,
//         closeButton: "button",
//         icon: true,
//         rtl: false
//     })
//    }
//    var leadsData = {
//      branch_id: this.formData.branch_id,
//      category_id: this.formData.category_id,
//      contact_person_id: this.formData.contact_person_id,
//      company_id: this.formData.company_id,
//      subject: this.formData.subject,
//      description: this.formData.description,
//      type: 'lead',
//      priority: this.formData.priority,
//      due_date: this.formData.due_date,
//      users: this.formData.users
   
//    }
//    // e.preventDefault();
//    // console.log(formData.value)
//    this.$store
//      .dispatch('leads/store', leadsData)
//      .then(() => {
   
//        this.$emit('refetch-data')
//        this.$emit('update:is-create-sidebar-active', false)
//        // this._props.isCreateSidebarActive = false;
//        this.fetch();
//        if(this.$store.state.leads.successMessage){

// this.$toast.success(this.$store.state.leads.successMessage, {
// position: "bottom-left",
// timeout: 5000,
// closeOnClick: true,
// pauseOnFocusLoss: true,
// pauseOnHover: true,
// draggable: true,
// draggablePercent: 0.6,
// showCloseButtonOnHover: false,
// hideProgressBar: true,
// closeButton: "button",
// icon: true,
// rtl: false
// })
// } 

//        var t = 'info';
//        // toast('hello')
//      })
//      .catch(() => {
//        // refFormObserver.value.setErrors(errors.value)
//        if(this.$store.state.leads.errors.branch_id){

//          this.$toast.error('Branch is required.', {
//            position: "bottom-left",
//        timeout: 5000,
//        closeOnClick: true,
//        pauseOnFocusLoss: true,
//        pauseOnHover: true,
//        draggable: true,
//        draggablePercent: 0.6,
//        showCloseButtonOnHover: false,
//        hideProgressBar: true,
//        closeButton: "button",
//        icon: true,
//        rtl: false
//      })
//    }
//    })
//  },
    categoryUser(data){
        // console.log(data);
      
      var d = new Date();
      var date = data.due_date;
        if(date != null){

            d.setDate(d.getDate() + date)
            this.formData.due_date = d;
        }
      if(data.users.length > 0){

          this.formData.users = data.users;
        }
    },
    fetchBranches() {
      this.$store.dispatch('branches/fetch')
    },
    fetchCategories() {
      this.$store.dispatch('categories/fetch')
    },
    fetchClients() {
      this.$store.dispatch('clients/fetch')
    },
    fetchContactPeople() {
      this.$store.dispatch('contactPeople/fetchForLeads')
    },
    fetchAllUsers() {
      this.$store.dispatch('allUsers/fetch')
    },

    resetFormData(){
      this.formData.subject = '';
    //   this.formData.email = '';

      // this.formData.due_date = 2;
      // this.formData.users = [];

    },
    closeModal(){
      this.resetFormData()
      this.$refs['modal-leads'].hide()
    },
    onSubmit(){
      if(this.branches.length === 1){
        this.formData.branch_id = {b_id: this.default_branch_id}
      }
         if(this.branches.length === 0){
    this.$toast.error('Branch is Required', {
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
    })
   }
      // console.log(formData);
    this.$store
      .dispatch("tasks/store", this.formData)
      .then(() => {
        this.$emit("refetch-data");
        // ref('modal-branches').hide();
        // emit("update:is-create-sidebar-active", false);
        this.$refs['modal-leads'].hide()
        this.$store.dispatch('tasks/fetch')
        // this.$store.dispatch('users/assign_emails');

      })
      .catch(() => {
        // refFormObserver.value.setErrors(errors.value);
      });

  }
  },
  setup(){
    const blankFormData = {
      subject: "",
      due_date: '',
      priority:{id:3},
      contact_person_id:null,
      company_id:null,
      branch_id:null,
      category_id:null,
      users: [],
      type: 'task',
      description: '',

    //   email: "",
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.tasks.errors));
    });

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetFormData);
    //    const onSubmit = () => {
    //     console.log(formData);
    //   store
    //     .dispatch("clients/store", formData.value)
    //     .then(() => {
    //       emit("refetch-data");
    //       // ref('modal-branches').hide();
    //       // emit("update:is-create-sidebar-active", false);
    //     })
    //     .catch(() => {
    //       refFormObserver.value.setErrors(errors.value);
    //     });
    //     store.dispatch('clients/fetch')
    //   };
    return {
      formData,
    //   onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
<style>
label{
    color: #202126;
    font-size: 14px;
}
.modal-lg{
  margin-top: 6.5rem;
}
@media (min-width:992px){
   #modal-leads .modal-lg{
        max-width: 1300px;
    }
}
.modal-title{
    text-transform: uppercase;
}
</style>