<template>
  <b-modal id="branches-edit-modal" ref="clients-edit-modal" no-close-on-backdrop :visible="isEditSidebarActive"
    size="lg" title="edit client" hide-footer @hidden="resetForm"
    @change="(val) => $emit('update:is-edit-sidebar-active', val)">
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
                <b-form-input   id="location" v-model="formData.location">

                </b-form-input>
                <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
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
                <v-select @input="stateCode" v-model="selectedState" placeholder="Search States" class="select-size-md"
                  label="name" :options="allStates">

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
                  :options="allClientTypes" v-model="selectedClientType" @input="clientTypeID">

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
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref, computed, watch } from "@vue/composition-api";
import { required, email } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import vSelect from 'vue-select'
import {
  BSidebar,
  BButton,
  BModal,
  BForm,
  BSpinner, BRow, BCol,
  BFormInput,
  BFormInvalidFeedback,
  BFormGroup,
  BCardText,
  BFormSelect,
  BFormDatepicker
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { VueDatePicker } from '@mathieustan/vue-datepicker';

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import store from "@/store";

export default {
  components: {
    BSidebar,
    BButton,
    BFormDatepicker,
    vSelect,
    BModal,
    VueDatePicker,
    BSpinner, BRow, BCol,
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
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return {
      name: "",
      // validation rules'
      currentDate:`${year}-${month < 10 ? '0'+month:month}-${day < 10 ?'0'+day:day}`,

      required,
      selectedState: '',
      selectedClientType: '',
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
    allStates() {
      let data = this.$store.state.branches.states;
      let allStates = []
      data.forEach(y => {
        allStates.push(y.name)
      })
      return allStates;
    },
    allClientTypes() {
      let data = this.$store.state.branches.businessTypes;
      let allClientTypes = []
      data.forEach(y => {
        allClientTypes.push(y.bussiness_type)
      })
      return allClientTypes;
    },
  },
  mounted() {
    if(this.$store.state.branches.states.length === 0){

// this.$store.dispatch("branches/states")
}
if(this.$store.state.branches.businessTypes.length === 0){

// this.$store.dispatch("branches/states")
// this.$store.dispatch("branches/states")
// this.$store.dispatch("branches/business")
}
  },
  methods: {
    onSubmit(){
      this.$store
        .dispatch("clients/update", {
          payload: this.formData,
          id: this.editItem.id,
        })
        .then(() => {
          // emit("refetch-data");
          this.$emit("update:is-edit-sidebar-active", false);
          this.$toast.success("Client Updated Successfully!", {
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
    closeModal() {
      this.$refs['clients-edit-modal'].hide()
    },
    pan() {
      if (this.formData.gst_number.length === 15) {
        if (isNaN(this.formData.gst_number.slice(0, 2) + this.formData.gst_number.slice(7, 10) + this.formData.gst_number.slice(14, 15)) === false && isNaN(this.formData.gst_number.slice(2, 7) + this.formData.gst_number.slice(11, 12) + this.formData.gst_number.slice(13, 14)) && (9 > +this.formData.gst_number.slice(12, 13) > 0 || isNaN(this.formData.gst_number.slice(12, 13)))) {
          this.formData.pan = this.formData.gst_number.slice(2, 12);
          let states = this.$store.state.branches.states;
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.formData.gst_number.slice(0, 2)
          });
          console.log(stateFilter, 'sssss')
          this.selectedState = stateFilter[0].name;
          this.gsterr = false;
        }
      }
      else {
        this.formData.pan = ''
        this.formData.state = ''
      }
    },
    stateCode() {
      let stateCode = this.$store.state.branches.states.filter((x) => {
        return x.name === this.selectedState;
      })
      this.formData.state_code = stateCode[0].fips_code;
    },
    clientTypeID() {
      let clientTypeID = this.$store.state.branches.businessTypes.filter((x) => {
        return x.bussiness_type === this.selectedClientType
      })
      this.formData.client_types = clientTypeID[0].id;
    },
  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id);

    const blankFormData = {
      name: props.editItem.name,
      location: props.editItem.location,
      address: props.editItem.address,
      gst_number: props.editItem.gst_number,
      state_code: props.editItem.state_code,
      pan: props.editItem.pan,
      tan: props.editItem.tan,     
      client_types: props.editItem.client_types,
      annual_turn_over: props.editItem.annual_turn_over,
      opening_balance: props.editItem.opening_balance,
      opening_bal_date: String(props.editItem.opening_bal_date),
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
      formData.value.location= newValue.editItem.location;
      formData.value.address= newValue.editItem.address;
      formData.value.gst_number= newValue.editItem.gst_number;
      formData.value.state_code= newValue.editItem.state_code;
      formData.value.pan= newValue.editItem.pan;
      formData.value.tan= newValue.editItem.tan;
      formData.value.client_types= newValue.editItem.client_types;
      formData.value.annual_turn_over= newValue.editItem.annual_turn_over;
      formData.value.opening_balance= newValue.editItem.opening_balance;
      formData.value.opening_bal_date= newValue.editItem.opening_bal_date;
    });

    // const onSubmit = () => {
    //   store
    //     .dispatch("clients/update", {
    //       payload: formData.value,
    //       id: editID.value,
    //     })
    //     .then(() => {
    //       // emit("refetch-data");
    //       emit("update:is-edit-sidebar-active", false);
    //     })
    //     .catch(() => {
    //       refFormObserver.value.setErrors(errors.value);
    //     });
    // };

    return {
      formData,
      // onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
};
</script>

<style>

</style>
