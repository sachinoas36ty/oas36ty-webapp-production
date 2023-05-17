<template>
  <div class="mt--2">
   
    <div>
      {{ defaultEmail }}
      <b-modal no-close-on-backdrop id="modal-due-date" ref="modal-due-date" size="md" hide-footer>
        <template #modal-header>
          <h5 class="modal-title">
            REASON FOR DUE DATE CHANGE
          </h5>
        </template>
        <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">

        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <validation-provider #default="validationContext" name="reason" vid="contact" rules="required"
                >
          <b-form-input v-model="reason" placeholder="Enter Your Reason" ></b-form-input>
          <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                    <!-- {{ validationContext.errors[0] }} -->
                    This field is required
                  </b-form-invalid-feedback> 
          </validation-provider>
         
          
          <b-row class="mt-1" >
            <b-col style="margin-left: 310px;" >
              <b-button variant="primary" size="sm" type="submit" >Submit</b-button>
           
              <b-button variant="primary" size="sm" @click="onCancel" style="margin-left: 4px;">Cancel</b-button>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>

        
      </b-modal>
    </div>
    
  </div>
</template>
<script>
import {VueDatePicker} from '@mathieustan/vue-datepicker';
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
  // BSpinner,
  BForm, VBModal, BFormInput, BFormGroup, BCard, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner
} from 'bootstrap-vue';
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
import { Mentionable } from 'vue-mention'

// import InviteUser from '../users/InviteUser.vue';
export default {
  components: {
    quillEditor,VueDatePicker,
    CreateContact,
    CreateClients, VBTooltip, BMediaAside, BImg,
    flatPickr, Mentionable,
    BFormDatepicker, BAvatar,
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
  data() {
    const date = new Date()
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return {
     
     
      reason:'',
      isChecked:false,
      subject: '',
      contact_person_id: null,
      company_id: null,
      branch_id: null,
      category_id: null,
      users: [],
      default_branch_id: '',
      textHeader: 'Choose from Templates',
      type: 'task',
      description: '',
      todo_field: [],
      nextTodoId: 2,
      file_name: [],
      file_name2:[],
      default_todo: [],
      file: null,
      previewImage: null,
      additional_todo: [],
      subtask_mentions: [],
      required,
      search: '',
         email: '',
    }
  },
  directives: {
    'b-modal': VBModal,
    'b-tooltip': VBTooltip
  },

 
  methods: {
    onSubmit() {
      
      console.log('Reason for due date change:', this.reason);
      const task_id = this.taskIdForDueDate;
      const data = {
        due_date_reason:this.reason,
        task_id:task_id,
      };
      console.log(data);
      // this.$store.dispatch("comments/store",{payload:data}).
      // then(() => {
        this.inline_due_date(this.$store.state.leads.due_date)
        
        // this.reason = null
        // this.$refs['modal-due-date'].hide();
      // });
      this.reason=null
      this.$refs['modal-due-date'].hide();
      
    },
    onCancel(){
      this.$refs['modal-due-date'].hide();
    },
  
    inline_due_date(due_date) {
      var task_id = this.$store.state.leads.expandedTaskId
      var t = "info";
      if (due_date == "") {
        this.closed();
      }
      if (due_date != "") {
        var date = {
        

          due_date: due_date,
          task_id: task_id,
        };
        // if (this.$router.currentRoute.name == "leads") {
          this.$store.dispatch("leads/inline_update2", { due_date_reason:this.reason,date }).then(() => {
            this.startDate2 = this.currentDate;
            // this.fetchAll()

            // this.$store.dispatch("leads/fetch");
            // if (this.successMessage) {
              this.$refs['modal-due-date'].hide()
            this.$toast.success("Due Date Updated Successfully!", {
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
            // }
          });
       
      }

      this.startDate2 = "";
    },
      
    
  },
  setup(){
    const { refFormObserver, getValidationState, resetForm } =
      formValidation();
      return {
        refFormObserver,getValidationState,resetForm,formValidation
      }
  },
  computed:{
    taskIdForDueDate(){
      return this.$store.state.leads.expandedTaskId

      
    }
  }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
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
  #modal-due-date .modal-lg {
    max-width: 1300px;
  }
}

.modal-title {
  text-transform: uppercase;
}
</style>