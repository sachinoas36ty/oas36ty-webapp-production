<template>
  <b-sidebar
    id="categories-create-sidebar"
    :visible="isCreateSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-create-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">Add New Category</h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

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
                placeholder="Enter Category"
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


          
          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              :disabled="isLoading"
            >
              Add
             
      <b-spinner small class="ml-1"  v-if="isLoading" />

    
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
  </b-sidebar>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref, computed } from "@vue/composition-api";
import { required, email } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import {
  BSidebar,
  BButton,
  BModal,BSpinner,
  BForm,
  BFormInput,
  BFormInvalidFeedback,
  BFormGroup,
  BCardText,
  BFormSelect,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import store from "@/store";
import vSelect from 'vue-select'

export default {
  components: {
    BSidebar,
    BButton,
    vSelect,
    BModal,BSpinner,
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    BCardText,
    BFormGroup,
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isCreateSidebarActive",
    event: "update:is-create-sidebar-active",
  },
  props: {
    isCreateSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      due_date:'',
      users:[],
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
    const blankFormData = {
      name: "",
      due_date: 2,
      users:[]
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

    const onSubmit = () => {
      store
        .dispatch("categories/store", formData.value)
        .then(() => {
          emit("refetch-data");
          emit("update:is-create-sidebar-active", false);
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
