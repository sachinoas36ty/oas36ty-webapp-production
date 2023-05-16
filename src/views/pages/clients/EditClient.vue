<template>
  <b-container id="clients-edit" bg-variant="white" shadow backdrop no-header right @hidden="resetForm"
    @change="(val) => $emit('update:is-edit-sidebar-active', val)">
    <!--    :visible="isEditSidebarActive"   sidebar-class="sidebar-lg"-->
    <template>
      <!-- Header 
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">Edit Company</h5>
  
          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>-->

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

        <b-form @submit.prevent="handleSubmit(onSubmit)">

          <b-row>
            <b-col md="6">
              <validation-provider #default="validationContext" name="name" vid="name" rules="required">
                <b-form-group label="Client" label-for="contact">
                  <b-form-input   id="name" v-model="formData.name">

                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="6">
              <validation-provider #default="validationContext" name="location" vid="location" rules="required">
                <b-form-group label="Location" label-for="location">
                  <b-form-input   id="location"
                    v-model="formData.location">

                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div v-if="showMore === true">
            <b-row>
              <b-col md="12">
                <b-form-group label="Client Address" label-for="address">
                  <b-form-input id="address" v-model="formData.address">

                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <div class="d-flex justify-content-between mt-1" style="text-transform: uppercase;">
              More Details
            </div>
            <hr style="border-color:#F75949">
            <b-row>
              <b-col md="6">
                <b-form-group label="GST Number" label-for="gst">
                  <b-form-input id="gst" v-model="formData.gst_number" @input="pan">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="State" label-for="state">
                  <v-select @input="stateCode" v-model="selectedState" placeholder="Search States"
                    class="select-size-md" label="name" :options="allStates">

                  </v-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="PAN" label-for="pan">
                  <b-form-input id="pan" v-model="formData.pan">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="TAN" label-for="tan">
                  <b-form-input id="tan" v-model="formData.tan">

                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Client Type" label-for="client_type">
                  <v-select placeholder="Search Client Types" class="select-size-md" label="name"
                    :options="allClientTypes" v-model="selectedClientType">

                  </v-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Annual Turnover" label-for="turnover">
                  <b-form-input type="number" id="turnover" v-model="formData.annual_turn_over">

                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Opening Balance" label-for="opening_balance">
                  <b-form-input type="number" id="opening_balance" v-model="formData.opening_balance">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Opening Balance Date" label-for="opening_balance_date">

                  <!-- <b-form-datepicker id="opening_bal_date" v-model="formData.opening_bal_date" /> -->
                  <VueDatePicker format="DD-MM-YYYY" style="border:1px solid #d8d6de;border-radius: 0.357rem;" :minDate="currentDate" id="proposalDate" v-model="formData.opening_bal_date" />


                </b-form-group>
              </b-col>
            </b-row>
          </div>

          <div class="text-right ">
             <b-button size="sm" variant="primary" @click="closeModal()">
              Cancel
            </b-button>&emsp;
             <b-button size="sm" :disabled="$store.state.clients.isSidebarLoading" variant="primary" type="submit">
              Update
              <b-spinner small class="ml-1" v-if="$store.state.clients.isSidebarLoading" />
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
  BSpinner,
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
    BContainer,
    BButton,
    BModal,
    BSpinner,
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
    // prop: "isEditSidebarActive",
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
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return {
      name: "",
      currentDate:`${year}-${month < 10 ? '0'+month:month}-${year}`,
      // validation rules'
      required,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.clients.sidebarLoading;
    },
    successMessage() {
      return this.$store.state.clients.successMessage;
    },
    errorMessage() {
      return this.$store.state.clients.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.clients.errors));
    },
  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id);

    const blankFormData = {
      name: props.editItem.name,
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.clients.errors));
    });

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetFormData);

    watch(props, (newValue) => {
      editID.value = newValue.editItem.id;
      formData.value.name = newValue.editItem.name;
    });

    const onSubmit = () => {
      store
        .dispatch("clients/update", {
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
  
<style>

</style>
  
