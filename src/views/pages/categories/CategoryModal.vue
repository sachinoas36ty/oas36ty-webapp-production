<template>
  <b-modal
    no-close-on-backdrop
    class="mt-6 b-overlay position-relative"
    id="modal-new-categories"
    ref="modal-new-categories"
    size="md"
    title="Add category"
    hide-footer
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
              <b-form-group label="Name" label-for="contact">
                <b-form-input
                  placeholder="Enter Name"
                  id="name"
                  v-model="formData.name"
                >
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
            <b-form-group label="Default Assignee" label-for="user">
              <v-select
                multiple
                placeholder="Search Employees"
                label="name"
                :options="allUsers"
                v-model="formData.users"
              >
                <template #list-header class="add_users">
                  <div class="ml-2 mb-1 mt-1" v-b-modal.modal-user>
                    <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                    <a href="#">
                      <feather-icon
                        size="14"
                        style="margin-right: 0.5rem;"
                        icon="PlusIcon"
                      />
                      New Employee</a
                    >
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
              <b-form-group label="Due Date" label-for="contact">
                <b-form-input id="date" v-model="formData.due_date">
                </b-form-input>
                <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-provider>

        <div class="text-right">
          <b-button size="sm" variant="primary" @click="closeModal()">
            Cancel </b-button
          >&emsp;
          <b-button
            size="sm"
            :disabled="$store.state.categories.isSidebarLoading"
            variant="primary"
            type="submit"
          >
            Save
            <b-spinner
              small
              class="ml-1"
              v-if="$store.state.categories.isSidebarLoading"
            />
          </b-button>
        </div>
      </b-form>
    </validation-observer>
    <!-- </b-card-body> -->
    <div
      v-if="$store.state.categories.isSidebarLoading"
      class="b-overlay position-absolute"
      style="inset: 0px; z-index: 10; /* display: none; */"
    >
      <div
        class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"
      ></div>
      <div
        class="position-absolute d-flex align-items-center flex-column"
        style="
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        "
      >
        <span aria-hidden="true" class="spinner-border text-primary">
          <!----></span
        >
        <br /><span>Adding New Category..</span>
      </div>
    </div>
  </b-modal>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate"

import {
  BModal,
  BFormInvalidFeedback,
  // BSpinner,
  BForm,
  VBModal,
  BFormInput,
  BFormGroup,
  BCard,
  BContainer,
  BRow,
  BCol,
  BPagination,
  BTable,
  BButton,
  BDropdown,
  BDropdownItem,
  BSpinner,
} from "bootstrap-vue"
import store from "@/store"
import formValidation from "@/@core/comp-functions/forms/form-validation"
import { ref, computed } from "@vue/composition-api"
import { required, email } from "@validations"
import vSelect from "vue-select"
import { created } from "vue-echarts"
// import InviteUser from '../users/InviteUser.vue';

import router from "@/router"

export default {
  components: {
    BForm,
    BFormGroup,
    BButton,
    BModal,
    BFormInvalidFeedback,
    BFormInput,
    BRow,
    BCol,
    ValidationObserver,
    // InviteUser,
    ValidationProvider,
    BSpinner,
    vSelect,
  },
  data() {
    return {
      name: "",
      due_date: "",
      users: [],
      required,
    }
  },
  directives: {
    "b-modal": VBModal,
  },
  computed: {
    allUsers() {
      return this.$store.state.users.all.filter((e) => e.status === "active")
    },
  },
  mounted() {
    // this.$store.dispatch('users/assign_emails')
    // this.$store.dispatch("users/fetch");
    // console.log();
    // if(router.currentRoute.name === 'categories'){

    // console.log(router.currentRoute);
    if (
      router.currentRoute.name == "leads" ||
      router.currentRoute.name == "tasks" ||
      router.currentRoute.name == "categories" ||
      router.currentRoute.name == "users" ||
      router.currentRoute.name == "apps-email"
    ) {
      // this.$store.dispatch('allUsers/fetch')
    }
    // }
    // this.$store.dispatch('users/assign_emails')
  },
  beforeUpdate() {
    // this.$store.dispatch("users/fetch");
    // this.$store.dispatch('allUsers/store')
  },
  methods: {
    resetForm() {
      this.formData.name = ""
      this.formData.due_date = 2
      this.formData.users = []
    },
    closeModal() {
      this.resetForm()
      this.$refs["modal-new-categories"].hide()
    },
    onSubmit() {
      // console.log(formData);
      this.$store
        .dispatch("categories/store", this.formData)
        .then(() => {
          this.$emit("refetch-data")
          // ref('modal-branches').hide();
          // emit("update:is-create-sidebar-active", false);
          this.$refs["modal-new-categories"].hide()
          this.$store.dispatch("categories/fetch")
        })
        .catch(() => {
          // refFormObserver.value.setErrors(errors.value);
        })
    },
  },
  setup() {
    const blankFormData = {
      name: "",
      due_date: 2,
      users: [],
    }

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.categories.errors))
    })

    const { refFormObserver, getValidationState } = formValidation()
    //  const onSubmit = () => {
    //   console.log(formData);
    // store
    //   .dispatch("categories/store", formData.value)
    //   .then(() => {
    //     emit("refetch-data");
    //     // ref('modal-branches').hide();
    //     // emit("update:is-create-sidebar-active", false);
    //   })
    //   .catch(() => {
    //     refFormObserver.value.setErrors(errors.value);
    //   });
    //   store.dispatch('categories/fetch')
    // };
    return {
      formData,
      // onSubmit,

      refFormObserver,
      getValidationState,
      // resetForm,
    }
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
<style>
.modal-lg {
  margin-top: 6.5rem;
}
.modal-title {
  text-transform: uppercase;
}
</style>
