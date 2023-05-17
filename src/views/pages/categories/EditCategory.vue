<template>
    <b-container
      id="categories-edit"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
 >
    <!--   :visible="isEditSidebarActive"   sidebar-class="sidebar-lg"   @hidden="resetForm"   @change="(val) => $emit('update:is-edit-sidebar-active', val)"-->
      <template>
        <!-- Header 
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">Edit Category</h5>
  
          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>-->
  
        <!-- BODY -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
            @reset.prevent="resetForm"
          >
            <validation-provider
              #default="validationContext"
              name="Name"
              vid="name"
              rules="required"
            >
              <b-form-group label="Name" label-for="name">
                <b-form-input
                  id="name"
                  v-model="formData.name"
                  autofocus
                   
                  trim
                  placeholder="Main Category"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
        
            <b-form-group
              label="Default Assignee"
              label-for="users"
            >
              <v-select
              id="users"
                v-model="formData.users"
                multiple
                placeholder="Select an option"
                label="name"
                :options="allUsers"
              />
  
              <!-- <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback> -->
            </b-form-group>
            <validation-provider
              #default="validationContext"
              name="due_date"
              vid="date"
              rules="required"
            >
            <b-form-group label="Due Date" label-for="date">
                <b-form-input
                  id="date"
                  type="number"
                  v-model="formData.due_date"
                  autofocus
                   
                  trim
                  placeholder="Due Date"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
  
  
            <!-- <validation-provider
              #default="validationContext"
              name="users"
              vid="users"
              rules="required"
            > -->
          
            <!-- </validation-provider> -->
            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
                :disabled="isLoading"
              >
                Update
        
        <b-spinner  small class="ml-1" v-if="isLoading" />
  
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="hide"
              >
                Cancel
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </template>
    </b-container>
  </template>
  
  <script>
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import { ref, computed, watch } from "@vue/composition-api";
  import { required, email } from "@validations";
  import formValidation from "@core/comp-functions/forms/form-validation";
  import {
    BContainer,
    BButton,
    BModal,
    BForm,
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
import router from "@/router";
  
  export default {
    components: {
      BContainer,
      vSelect,
      BButton,
      BModal,
      BForm,
      BFormInput,
      BFormInvalidFeedback,
      BCardText,
      BSpinner,
      BFormGroup,
      BFormSelect,
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      Ripple,
    },
    model: {
    //  prop: "isEditSidebarActive",
      //event: "update:is-edit-sidebar-active",
    },
    props: {
      /*isEditSidebarActive: {
        type: Boolean,
        required: true,
      },*/
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
    created(){
      // this.$store.dispatch('allUsers/fetch')
  
    },
    setup(props, { emit }) {
        console.log("propsCategory:",props.editItem)
      const editID = ref(props.editItem.id);
  
      const blankFormData = {
        name: props.editItem.name,
        due_date: props.editItem.due_date,
        users: props.editItem.users,
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
           // emit("update:is-edit-sidebar-active", false);
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
  
