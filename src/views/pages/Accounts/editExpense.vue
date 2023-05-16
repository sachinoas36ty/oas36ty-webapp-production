<template>
    <div class="mt--4">
      <div>
        <b-modal no-close-on-backdrop id="edit-expense" ref="edit-expense" size="lg" hide-footer>
          <!-- <b-card-body> -->
            <template #modal-header>
            <h5 class="modal-title">
  
              <span>
                Edit expense
              </span>
            </h5>
            <ul>
              <!-- <li>
    
              
            <div>
    
              <div class="switch">
              <label >
                <input type="checkbox" v-model="switchOption" @click="{
                  if(switchOption) {
                    switchOption = true
                  // desig_type.text = 'ToggleRightIcon'
                } else {
                  switchOption = false
                  // desig_type.text = 'ToggleLeftIcon'
                }
              }">
              <span class="slider round"></span>
              Internal
              
            </label>
          </div>
        </div>
      </li> -->
    </ul>
    
  </template>
  
  {{setData}}
  <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
    
    <b-form @submit.prevent="handleSubmit(onSubmit)">
  
            
              <b-row class="mt-2">
                <b-col :md="'3'">
                  <validation-provider #default="validationContext" name="description" vid="desc" rules="required">
  
                    <b-form-group label="Description *">
                      <b-form-input id="desc" v-model="formData.description" placeholder="Description">
  
                      </b-form-input>
                      <!-- <create-contact/> -->
                      <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                        <!-- {{ validationContext.errors[0] }} -->
                        This field is required
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
  
                </b-col>
  
                <b-col :md="'3'">
  
                  <b-form-group label="Assigned to">
                    <v-select v-model="formData.users" multiple label="name" :options="users_data" id="user"></v-select>
                    <!-- <create-contact/> -->
  
                  </b-form-group>
  
                </b-col>
                <b-col :md="'3'">
  
                  <b-form-group label="Date">
                    <!-- <v-select v-model="formData.date" :options="users_data" id="user"></v-select> -->
                    <!-- <create-contact/> -->
                    <vue-date-picker format="DD-MM-YYYY" style="border:1px solid #d8d6de;border-radius: 0.357rem;"
                      v-model="formData.date" :minDate="currentDate" />
                  </b-form-group>
  
                </b-col>
                <b-col :md="'3'">
                  <validation-provider #default="validationContext" name="expense" vid="expense" rules="required">
  
                    <b-form-group label="Expense *">
                      <b-form-input step="any" @keypress="isNumber($event)" id="expense" type="number" v-model.number="formData.expense" placeholder="Expense">
  
                      </b-form-input>
                      <!-- <create-contact/> -->
                      <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                        <!-- {{ validationContext.errors[0] }} -->
                        This field is required
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
  
                </b-col>
              </b-row>
  
  
  
  
  
  
  
              <div class="mt-1 text-right ">
  
                <b-button size="sm" variant="primary" @click="closeModal()">
                  Cancel
                </b-button>&emsp;
                <b-button size="sm" :disabled="$store.state.leads.isSidebarLoading" variant="primary" type="submit">
                  Update
                  <b-spinner small class="ml-1" v-if="$store.state.leads.isSidebarLoading" />
                </b-button>
              </div>
            </b-form>
          </validation-observer>
          <!-- </b-card-body> -->
        </b-modal>
      </div>
    </div>
  </template>
  <script>
  import { VueDatePicker } from '@mathieustan/vue-datepicker';
  import wordIcon from '../../../assets/images/logo/word-icon.png'
  import excelIcon from '../../../assets/images/logo/excel-icon.png'
  import slideIcon from '../../../assets/images/logo/slide-icon.png'
  import browseIcon from '../../../assets/images/logo/browse-icon.png'
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component'
  
  import {
    BModal,
    BFormInvalidFeedback, BFormDatepicker, VBTooltip, BAvatar, BMediaAside, BImg,
    BBadge,
    BForm, VBModal, BFormInput, BFormGroup, BCard, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner
  } from 'bootstrap-vue';
  import store from '@/store';
  import formValidation from '@/@core/comp-functions/forms/form-validation';
  import { ref, computed } from "@vue/composition-api";
  import { required, email } from "@validations";
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  // import { mapGetters } from 'vuex'
  //   import CreateContact from './CreateContactLead.vue';
  //   import CreateClients from './CreateClientLead.vue';
  
  // eslint-disable-next-line
  import 'quill/dist/quill.snow.css'
  // eslint-disable-next-line
  import 'quill/dist/quill.bubble.css'
  import { Mentionable } from 'vue-mention'
  
  // import InviteUser from '../users/InviteUser.vue';
  export default {
    components: {
      quillEditor, VueDatePicker,
      //   CreateContact,
      //   CreateClients
      VBTooltip, BMediaAside, BImg,
      flatPickr, Mentionable,
      BFormDatepicker, BAvatar, BBadge,
      BForm,
      BFormGroup, BDropdown, BDropdownItem,
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
    props:{
        task_details:{
        type: Object,
        required:true,
        }
    },
    data() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear()
      return {
        task: null,
        description: "",
        users: [],
        currentDate: `${year}-0${month}-${day}`,
  
        date: `${year}-0${month}-${day}`,
        expense: null,
      }
    },
    directives: {
      'b-modal': VBModal,
      'b-tooltip': VBTooltip
    },
    computed: {
      setData(){
        console.log(this);
      this.formData.description = this.task_details.description
      this.formData.expense = this.task_details.expense;

        return;
      },
      allData() {
        return this.$store.state.leads.all;
      },
      users_data() {
        this.formData.users = this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)
        return this.$store.state.users.all.filter(e => e.status === 'active')
      }
  
  
    },
    methods: {
      isNumber(ev){
        const keysAllowed= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
      const keyPressed = ev.key;
      
      if (!keysAllowed.includes(keyPressed)) {
             ev.preventDefault()
      }
      },
      buttonVariant(status) {
        if (status == "open") {
          return "primary";
        } else if (status == "completed") {
          return "success";
        } else if (status == "invoiced") {
          return "warning";
        } else if (status == "closed") {
          return "secondary";
        } else {
          return "warning";
        }
      },
  
  
      fetchContactPeople() {
        this.$store.dispatch('contactPeople/fetchForLeads')
      },
      fetchAllUsers() {
        this.$store.dispatch('allUsers/fetch')
      },
  
      resetFormData2() {
       this.formData.task = null;
       this.formData.description = this.task_details.description;
  
       this.formData.expense = this.task_details.expense;
       this.formData.users = this.users_data.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email);
       this.formData.date = this.currentDate;
  
  
  
  
        //   this.formData.email = '';
  
        // this.formData.due_date = 2;
        // this.formData.users = [];
  
      },
      closeModal() {
        this.$refs['edit-expense'].hide()
        this.resetFormData2()
      },
      onSubmit() {
        let users = []
        this.formData.users.forEach(element => {
          users.push({
            user_id:element.id
          })
        });
        // this.formData.task.id = this.task_id
        console.log(this.formData);
        const data = {
          task_id: this.task_details.task_id,
          description:this.formData.description,
          date:this.formData.date,
          expense:this.formData.expense,
          users:users
        }
        this.$store.dispatch("expenses/update",{payload:data, id:this.task_details.id}).then(() => {
          // this.$store.dispatch("expenses/fetch")
          this.$refs['edit-expense'].hide()
          this.$toast.success("Updated Successfully!", {
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
      }
    },
    updated() {
      this.setData
    },
    setup(props) {
        // const task = props.task_details
      const date = new Date();
  
      const day = date.getDate()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      // blankFormData.users = default_users
      const blankFormData = {
        users: [],
        task: null,
        date: `${year}-0${month}-${day}`,
        expense: null,
        description: ""//props.task_details.description,
  
        //   email: "",
      };
  
      const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
  
      // let email = JSON.parse(localStorage.getItem('userData')).email
      // function onBeforeUpdate(() => {
  
      //   if(store.state.users.all.length > 0){
  
      //     store.state.users.all.forEach(element => {
      //       if(element.email === email){
      //         // this.formData.users.push(element)
      //         formData.value.users.push(element)
      //       }
      //     });
      //   }
      // })
      const resetFormData = () => {
        formData.value = JSON.parse(JSON.stringify(blankFormData));
      };
  
      const errors = computed(() => {
        return JSON.parse(JSON.stringify(store.state.leads.errors));
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
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 21px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 13px;
    bottom: 0;
    background-color: #818181;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 19px;
    left: -1px;
    bottom: 2px;
    background-color: #f1f1f1;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked+.slider {
    background-color: #F75949;
  }
  
  input:focus+.slider {
    box-shadow: 0 0 1px #F75949;
  }
  
  input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  </style>
  <style>
  label {
    color: #202126;
    font-size: 14px;
  }
  
  .modal-lg {
    margin-top: 6.5rem;
  }
  
  @media (min-width:992px) {
    #edit-expense .modal-lg {
      max-width: 1300px;
    }
  }
  
  .modal-title {
    text-transform: uppercase;
  }</style>