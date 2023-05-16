<template>
  <b-card-code title="Email Out Bound">

    <b-form @submit.prevent>
      <b-row>
        <b-col cols="12">
          <b-form-group label="Method" label-for="h-method" label-cols-md="4">
            <v-select required id="h-method" placeholder="Method" v-model="method" disabled label="option" :options="method" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Host" label-for="h-host" label-cols-md="4">
            <b-form-input required id="h-host" type="text" v-model="mail_host" placeholder="Host" />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Port" label-for="h-port" label-cols-md="4">
            <b-form-input required id="h-port" type="number" v-model="mail_port" placeholder="Port" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Username" label-for="h-email2" label-cols-md="4">
            <b-form-input autocomplete="off" required id="h-email2" onfocus="this.removeAttribute('readonly')" name="ksk"  v-model="mail_username_real"  type="text" placeholder="Username" />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Password" label-for="h-password" label-cols-md="4">
            <b-form-input required autocomplete="off" id="h-password" onfocus="this.removeAttribute('readonly')" type="password" v-model="mail_password" placeholder="Password" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Encryption" label-for="h-encryption" label-cols-md="4">
            <v-select required id="h-ecryption" placeholder="Select the Encryption" v-model="mail_encryption" label="option"
              :options="encrypt" />
          </b-form-group>
        </b-col>
        <!-- <b-col
            md="8"
            offset-md="4"
          >
            <b-form-group>
              <b-form-checkbox
                id="checkbox-2"
                name="checkbox-2"
                value="Remember_me"
              >
                Remember me
              </b-form-checkbox>
            </b-form-group>
          </b-col> -->

        <!-- submit and reset -->
        <b-col offset-md="4">
           <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1"
            :disabled="isLoading" @click="responseOutBound()">
            Submit
            <b-spinner small class="ml-1" v-if="isLoading" />
          </b-button>
           <b-button size="sm" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
            Reset
          </b-button>
        </b-col>
      </b-row>

    </b-form>

    <template #code>
      {{ codeHorizontal }}
    </template>
  </b-card-code>
</template>
  
<script>
import BCardCode from '@core/components/b-card-code'
import {
  BRow, BCol, BSpinner, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { codeHorizontal } from './code'
import vSelect from 'vue-select'
import router from '@/router'
import { ref, computed } from '@vue/composition-api'
import formValidation from '@core/comp-functions/forms/form-validation'
import Vue from 'vue';
import DisableAutocomplete from 'vue-disable-autocomplete';
Vue.use(DisableAutocomplete);
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
import "vue-toastification/dist/index.css";

export default {
  components: {
    BCardCode,
    BRow,
    BSpinner,
    ValidationObserver,
    ValidationProvider,
    BCol,
    vSelect,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
  },
  directives: {
    Ripple,
  },
  computed: {
    isLoading() {
      return this.$store.state.emails.out_bound_loading;
    },
    SuccessMessage() {
      return this.$store.state.emails.successMessage;
    },
    ErrorMessage() {
      return this.$store.state.emails.errorMessage;
    },
    items(){
      return this.$store.state.emails.all;

    }
  },
  data() {
    return {
      method: [{ option: 'SMTP' }],

      encrypt: [{ option: 'SSL' }, { option: 'TLS' }, { option: 'STARTLS' }],
      codeHorizontal,
      mail_encryption: null,
      mail_host: "",
      mail_port: "",
      mail_username_real: "",
      mail_password: ""
    }
  },
  mounted() {
    this.get_outbound_emails()
    console.log(document.getElementById('h-email2'))
    // console.log(router.currentRoute.params.emailID);
  },

  methods: {
    get_outbound_emails(){
      this.$store.dispatch('emails/get', { id: router.currentRoute.params.emailID }).then(() => {
        // this.email_master = this.items
        this.mail_host = this.items.email_outbound ? this.items.email_outbound.mail_host : ''
        this.mail_port = this.items.email_outbound ? this.items.email_outbound.mail_port : ''
        this.mail_username_real = this.items.email_outbound ? this.items.email_outbound.mail_username : ''
        this.mail_password = this.items.email_outbound ? this.items.email_outbound.mail_password : ''
        this.mail_port = this.items.email_outbound ? this.items.email_outbound.mail_port : ''
        this.mail_transport = this.items.email_outbound ? this.items.email_outbound.mail_transport.toUpperCase() : ''

        this.mail_encryption = this.items.email_outbound ? {option:  this.items.email_outbound.mail_encryption.toUpperCase()} : null



        
      });
    },
    responseOutBound() {
      const blankFormData = {
        id: router.currentRoute.params.emailID,
        mail_transport: "smtp",
        mail_host: this.mail_host,
        mail_port: this.mail_port,
        mail_username: this.mail_username_real,
        mail_password: this.mail_password,
        mail_encryption: this.mail_encryption

      };
      if(this.items.email_outbound === null){

        this.$store.dispatch('emails/storeEmailOutbound',
        blankFormData
      ).then(() => {
        if (this.SuccessMessage != "") {

          this.$toast.success(this.SuccessMessage, {
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
          rtl: false
        })
        }

      }).catch(() => {
        if (this.ErrorMessage != "") {

          this.$toast.error(this.ErrorMessage, {
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
          rtl: false
        })
        }
      })
    }
    if(this.items.email_outbound !== null){
      this.$store.dispatch('emails/update_email_outbound',{
        payload:blankFormData,
        id: router.currentRoute.params.emailID
      }).then(() => {
        if (this.SuccessMessage != "") {

          this.$toast.success(this.SuccessMessage, {
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
          rtl: false
        })
        }

      }).catch(() => {
        if (this.ErrorMessage != "") {

          this.$toast.error(this.ErrorMessage, {
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
          rtl: false
        })
        }
      })
    }

    },
  },

}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
  