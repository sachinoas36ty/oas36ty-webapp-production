<template>
  <b-sidebar
    id="contact-people-create-sidebar"
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
        <h5 class="mb-0">Add New Contact Person Email</h5>

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
            name="Email"
            vid="email"
            rules="required|email"
          >
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="formData.email"
                autofocus
                 
                trim
                placeholder="Contact Person Email"
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
            >
              Add
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
  BModal,
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

export default {
  components: {
    BSidebar,
    BButton,
    BModal,
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
    cpID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // validation rules'
      required,
      email,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.contactPersonEmails.isLoading;
    },
    successMessage() {
      return this.$store.state.contactPersonEmails.successMessage;
    },
    errorMessage() {
      return this.$store.state.contactPersonEmails.errorMessage;
    },
    errors() {
      return JSON.parse(
        JSON.stringify(this.$store.state.contactPersonEmails.errors)
      );
    },
  },
  setup(props, { emit }) {
    const blankFormData = {
      email: "",
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.contactPersonEmails.errors));
    });

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetFormData);

    const onSubmit = () => {
      store
        .dispatch("contactPersonEmails/store", {
          payload: formData.value,
          cpID: props.cpID,
        })
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

<style></style>
