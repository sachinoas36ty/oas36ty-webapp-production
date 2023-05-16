<template>
    <div>
      
            <b-modal
            no-close-on-backdrop
      id="modal-user"
      ref="modal-user"
      size="md"
      title="Invite New User"
      hide-footer
      class="b-overlay position-relative"
    >
    <!-- <b-card-body> -->
      <validation-observer #default="{handleSubmit}" ref="refFormObserver">

      <b-form @submit.prevent="handleSubmit(onSubmit)">
     
        <validation-provider
        #default="validationContext"
        name="name"
        vid="name"
        rules="required"
      >
        <b-row>
          <b-col md="12 ">
            <b-form-group class="font-14 my-custom-select"  label="Name *" label-for="contact" >
              <b-form-input  
              placeholder="Enter Name"
              id="name" v-model="formData.name">

              </b-form-input>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>
      </validation-provider>

      <validation-provider
        #default="validationContext"
        name="email"
        vid="email"
        rules="required|email"
      >
        <b-row>
          <b-col md="12 ">
            <b-form-group  label="Email *" label-for="contact" class="my-custom-select">
              <b-form-input 
               placeholder="Enter Email"               
               id="email"
               v-model="formData.email"
               type="email"
               @input="checkDuplicateEmployees"
               @change="checkblank"
               >

              </b-form-input>
              <b-form-invalid-feedback class="d-block" v-if="validationContext.errors.length > 0">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
              
              <!-- <b-form-invalid-feedback class="d-block">
                {{ $store.state.users.errorMessage }}
              </b-form-invalid-feedback> -->

              <b-form-invalid-feedback
                    v-else-if="duplicacyContact === true"
                    class="d-block"
                  >
                    {{ "This email has already been taken!" }}
                  </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>
      </validation-provider>
      <validation-provider
        #default="validationContext"
        name="desig_id"
        vid="desig_id"
        rules="required"
      >
      <b-row>
          <b-col md="12 ">
            <b-form-group  label="Assign Designation *" class="my-custom-select">
              <v-select id="desig_id" v-model="formData.desig_id" placeholder="Choose Designations" :options="$store.state.designation.all" label="designation_name">
                <template #list-header class="add_categories">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.designation-modal>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Designation</a>
            </div>
            </template>
               
              </v-select>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>
        </validation-provider>
      <!-- <b-row>
          <b-col md="12 ">
            <b-form-group  label="Category" label-for="contact">
              <v-select v-model="formData.category" multiple placeholder="Choose Category" :options="categories" label="name">

                <template #list-header class="add_categories">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-categories>
              
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Category</a>
            </div>
            </template>
              </v-select>
            
            </b-form-group>
          </b-col>
          
        </b-row>
        <b-row>
          <b-col md="12 ">
            <b-form-group  label="Assign Emails" label-for="contact">
              <v-select multiple v-model="formData.emails" placeholder="Choose Emails" :options="allEmails" label="email">

               
              </v-select>
            
            </b-form-group>
          </b-col>
          
        </b-row> -->
        <b-row>
          <b-col md="12 ">
            <validation-provider
        #default="validationContext"
        name="branch_id"
        vid="branch_id"
        rules="required"
      >
            <b-form-group  label="Assign Branch *" class="my-custom-select">
              <v-select  id="branch_id" v-model="formData.branch_id" placeholder="Choose Branches" :options="branches" label="name">

                <template #list-header >
            <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-branches>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-contact>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
              <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Branch</a>
            </div>
          </template>
              </v-select>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
          </b-col>
          
        </b-row>
        <b-row>
          <b-col md="12 ">
            <validation-provider
        #default="validationContext"
        name="monthly_cost"
        vid="monthly_cost"
        rules="required"
      >
            <b-form-group  label="Monthly Cost *" class="my-custom-select">
              <b-form-input id="monthly_cost" type="number" step="any" placeholder="Enter Monthly Cost" v-model="formData.monthly_cost" @keypress="isNumber($event)">

              </b-form-input>
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
 <b-button size="sm"  :disabled="$store.state.users.sidebarLoading"  variant="primary" type="submit" >
  Send    
  <b-spinner small class="ml-1" v-if="$store.state.users.sidebarLoading"/>
</b-button >
</div>
      </b-form>
      </validation-observer>
    <!-- </b-card-body> -->
    <div v-if="$store.state.users.sidebarLoading" class="b-overlay position-absolute"
    style="inset: 0px;z-index: 10;/* display: none; */">
    <div class="position-absolute bg-white rounded-sm"
      style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
    <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
      <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
      <br><span>Inviting User..</span>
    </div>
  </div>
    </b-modal>
    </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import {BModal,
  BFormInvalidFeedback,
  // BSpinner,
  BForm,VBModal, BFormInput,BFormGroup, BCard, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner  } from 'bootstrap-vue';
import store from '@/store';
import formValidation from '@/@core/comp-functions/forms/form-validation';
import { ref, computed } from "@vue/composition-api";
import { required, email } from "@validations";
import vSelect from 'vue-select';
import CreateCategoryVue from '../categories/CreateCategory.vue';
import router from '@/router';
import branches from '@/api/branches';
import { isUserLoggedIn } from '@/auth/utils';
export default {
  components:{
    BForm,BFormGroup,BButton,BModal,BFormInvalidFeedback,
    BFormInput,BRow,BCol, ValidationObserver,ValidationProvider,
    BSpinner,vSelect,CreateCategoryVue,
  },
  data(){
    return { 
      duplicacyContact:'',
      name:'',
      required,
      email: '',
      category:[],
      emails:[],
      toggleArr:[],
      design_name:'',
      branch_id:null,
      desig_id:null,
    }
  },
  directives:{
    'b-modal': VBModal,
  },
  created(){
  
    // if(router.currentRoute.name == "leads" || router.currentRoute.name == "tasks" || router.currentRoute.name == "categories" || router.currentRoute.name == "users" || router.currentRoute.name == "apps-email"){
    //   console.log(router.currentRoute);
    //   this.$store.dispatch('categories/fetch')
    //   this.$store.dispatch('users/assign_emails')
    // }

  },
  computed:{
    
    categories(){
      return this.$store.state.categories.all;
    },
    allEmails(){
      return this.$store.state.users.emails;
    },
    branches(){
      return this.$store.state.branches.all
    }
  },
  methods:{
    checkblank(e){
      if(e===''){
        this.duplicacyContact=false
      }
    },
    checkDuplicateEmployees(e){
      let emails=this.$store.state.users.all
      // console.log(emails);
      let isDuplicate=false
      for (let i = 0; i < emails.length; i++) {
    if (emails[i].email === e) {
      isDuplicate = true;
      // console.log(emails[i].email)
      
    }
      this.duplicacyContact = isDuplicate;
    }
  },
    isNumber(ev){
      const keysAllowed= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const keyPressed = ev.key;
    
    if (!keysAllowed.includes(keyPressed)) {
           ev.preventDefault()
    }
    },
    createDesignation() {
            var data = [];
            var privileges_id_arr = []
            var all_master_id = 0;
            var filter = []
            this.toggleArr.forEach(element => {
                filter = element.privileges.filter(e => e.all_master_id === element.id);
                all_master_id = element.id
                filter.forEach(e => {
                    e.privileges_id = e.id
                    // if ( e.all_master_id === element.id) {

                    // privileges_id_arr.push({
                    //     privileges_id: e.id
                    // })

                    // }
                });
                // privileges_id_arr = 
                if (element.privileges.length > 0) {

                    data.push({
                        all_master_id: all_master_id,
                        privileges: filter

                    })
                }
            });

            const desig_data = {
                designation_name: this.design_name,
                masterAccess: data
            };


            this.$store.dispatch('designation/store', desig_data).then(() => {
                this.$store.dispatch('designation/fetch').then(() => {
                    this.toggleArr.forEach(element => {
                        if(element.switchOption == true){
                            element.switchOption = false
                        }
                        element.privileges = []
                    });
                    this.$refs['designation-for-invite'].hide()

                })
            })

            console.log(data, this.design_name);
        },
    
    closeModal(){
      this.resetUserForm()
      this.$refs['modal-user'].hide()
    },
    onSubmit(){
      if(this.duplicacyContact==true ){

          return;
          }
        const data = {
        branch_id : this.formData.branch_id.id,
        user_role_id :this.formData.desig_id.id,
        category: this.formData.category,
        emails: this.formData.emails,
        email:this.formData.email,
        name:this.formData.name,
        monthly_cost : this.formData.monthly_cost,
        desig_id : this.formData.desig_id,

      }
      // console.log(this.formData);
      // this.formData.branch_id = this.formData.branch_id.id
      // this.formData.user_role_id = this.formData.desig_id.id
    this.$store
      .dispatch("users/store", data)
      .then(() => {
        this.resetUserForm()
        this.$emit("refetch-data");
        // ref('modal-branches').hide();
        // emit("update:is-create-sidebar-active", false);
        this.$refs['modal-user'].hide()
        this.$store.dispatch('allUsers/fetch')
        this.$store.dispatch('users/fetch')
        this.$store.dispatch('users/assign_emails');
        this.$toast.success("Invitation Sent Successfully!", {
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
        rtl: false,
      });
      })
      .catch(() => {
        // refFormObserver.value.setErrors(errors.value);
      });

  },
  resetUserForm(){
    this.formData.branch_id = null
    this.formData.desig_id = null
    this.formData.category = null
    this.formData.emails = null
    this.formData.email = null
    this.formData.name = null
    this.formData.monthly_cost=null
    this.duplicacyContact=false
  }
  },
  setup(){
    const blankFormData = {
      name: "",
      email: "",
      category: [],
      emails: [],
      desig_id:null,
      monthly_cost:null,
      branch_id:null
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.users.errors));
    });

    const { refFormObserver, getValidationState,  } =
      formValidation();
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
      // resetForm,
    }
  }
}
</script>
<style>

.modal-lg{
  margin-top: 6.5rem;
}
.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}
.modal-title{
    text-transform: uppercase;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

</style>