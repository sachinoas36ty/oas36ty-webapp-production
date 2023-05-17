<template>
      <b-modal
            no-close-on-backdrop
            
      id="edit-modal-categories"
      ref="edit-modal-categories"
      size="md"
      title="edit category"
      hide-footer
      :visible="isEditSidebarActive"
    @hidden="resetForm"
    @change="(val) => $emit('update:is-edit-sidebar-active', val)"
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
            <b-form-group  label="Name" label-for="contact">
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
      <b-row>
          <b-col md="12 ">
            <b-form-group  label="Default Assignee" label-for="contact">
              <v-select multiple placeholder="Search Employees" label="name" :options="allUsers" v-model="formData.users" >
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
        </b-row>
      <validation-provider
        #default="validationContext"
        name="due_date"
        vid="date"
        rules="required"
      >
        <b-row>
          <b-col md="12">
            <b-form-group  label="Due Date" label-for="contact">
              <b-form-input    
              
              id="date" v-model="formData.due_date">

              </b-form-input>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>

        
      </validation-provider>
     
        <div class="text-right ">
           <b-button size="sm" variant="primary" @click="closeModal()">
            Cancel
          </b-button>&emsp;
 <b-button size="sm"  :disabled="$store.state.categories.isSidebarLoading"  variant="primary" type="submit" >
  Update    
  <b-spinner small class="ml-1" v-if="$store.state.categories.isSidebarLoading"/>
</b-button >
</div>
      </b-form>
      </validation-observer>
    <!-- </b-card-body> -->
    </b-modal>

</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref, computed, watch } from "@vue/composition-api";
import { required, email } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import {
  BSidebar,
  BButton,
  BModal,BCol,
  BForm,BRow,
  BFormInput,
  BSpinner,
  BFormInvalidFeedback,
  BFormGroup,
  BCardText,
  BFormSelect,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import store from "@/store";
import vSelect from 'vue-select'
// import InviteUser from "../users/InviteUser.vue";

export default {
  components: {
    BSidebar,
    vSelect,
    BButton,
    BModal,
    BForm,
    BRow,
    BFormInput,
    BCol,
    BFormInvalidFeedback,
    BCardText,
    BSpinner,
    BFormGroup,
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
    // InviteUser
},
  directives: {
    Ripple,
  },
  model: {
    prop: "isEditSidebarActive",
    event: "update:is-edit-sidebar-active",
  },
  props: {
    isEditSidebarActive: {
      type: Boolean,
      required: true,
    },
    editItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      due_date:"",
      // validation rules'
      required,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.categories.sidebarLoading;
    },
    successMessage() {
      return this.$store.state.categories.successMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.categories.errors));
    },
    allUsers() {
      
      return this.$store.state.users.all.filter(e => e.status === 'active')
    },
  },
  methods:{
    resetFormData(){
      this.formData.name = ''
      this.formData.users = []
      this.formData.due_date = ''

    },
    closeModal(){
      this.resetFormData();
      this.$refs['edit-modal-categories'].hide()
    }
  },
  created(){
    // this.$store.dispatch('allUsers/fetch')

  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id);

    const blankFormData = {
      name: props.editItem.name,
      due_date: props.editItem.due_date,
      users: String(props.editItem.users),
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.categories.errors));
    });

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetFormData);

    watch(props, (newValue) => {
      editID.value = newValue.editItem.id;
      formData.value.name = newValue.editItem.name;
      formData.value.due_date = newValue.editItem.due_date;
      formData.value.users = newValue.editItem.users;

    });

    const onSubmit = () => {
      store
        .dispatch("categories/update", {
          payload: formData.value,
          id: editID.value,
        })
        .then(() => {
          emit("refetch-data");
          emit("update:is-edit-sidebar-active", false);
        })
        .catch(() => {
          refFormObserver.value.setErrors(errors.value);
        });
    };

    return {
      formData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

</style>
