<template>
  <b-card-code title="Email In Bound">


    <b-form @submit.prevent="" autocomplete="off" >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Method"  label-cols-md="4">
            
            <v-select required   placeholder="Select the Method" v-model="mail_transport" label="option"
              :options="method" >
             
            </v-select>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Host" label-for="h-host" label-cols-md="4">
            <!-- <b-form-input v-if="email_master.email_inbound !== null" id="h-host" @input="'hh'" v-model="mail_host" type="text" placeholder="Host" /> -->
            <b-form-input required  id="h-host"   v-model="mail_host" type="text" placeholder="Host" />

          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Port" label-for="h-port" label-cols-md="4">
            <b-form-input required id="h-port" v-model="mail_port" type="number" placeholder="Port" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Username" label-for="h-email" label-cols-md="4">
            <b-form-input autocomplete="off" required id="h-email" onfocus="this.removeAttribute('readonly')" v-model="mail_username" type="email" placeholder="Username" />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Password" label-for="h-password" label-cols-md="4">
            <b-form-input required autocomplete="off" onfocus="this.removeAttribute('readonly')" id="h-password" v-model="mail_password" type="password" placeholder="Password" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Encryption" label-for="h-encryption" label-cols-md="4">
            <v-select required id="h-ecryption" v-model="mail_encryption" placeholder="Select the Encryption" label="option"
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
            :disabled="isLoading" @click="responseInbound()">
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
import Vue from 'vue';
import DisableAutocomplete from 'vue-disable-autocomplete';
Vue.use(DisableAutocomplete);

import {
  BRow, BCol, BSpinner, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ref, computed } from '@vue/composition-api'
import formValidation from '@core/comp-functions/forms/form-validation'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
import "vue-toastification/dist/index.css";

import { codeHorizontal } from './code'
import vSelect from 'vue-select'
import router from '@/router'


export default {
  components: {
    BCardCode,
    BSpinner,
    BRow,
    BCol,
    vSelect,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    codeHorizontal,
    BForm,
    BButton,
    ToastificationContent,
    ValidationObserver,
    ValidationProvider
  },
  directives: {
    Ripple,
  },
  computed: {
    isLoading() {
      return this.$store.state.emails.in_bound_loading;
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
      method: [{ option: 'POP' }, { option: 'IMAP' }],
      mail_transport: "",
      encrypt: [{ option: 'SSL' }, { option: 'TLS' }, { option: 'STARTLS' }],
      codeHorizontal,
      mail_encryption: "",
      mail_host: "",
      mail_port: "",
      mail_username: "",
      mail_password: "",
      email_master:{}
    }
  },
  mounted() {
    this.get_inbound_emails();
    // console.log(router.currentRoute.params.emailID);
    // this.$refs.autocompleteInput.value = ''

  },

  methods: {
    get_inbound_emails(){
      this.$store.dispatch('emails/get', { id: router.currentRoute.params.emailID }).then(() => {
        this.email_master = this.items
        this.mail_host = this.items.email_inbound ? this.items.email_inbound.mail_host : ''
        this.mail_port = this.items.email_inbound ? this.items.email_inbound.mail_port : ''
        this.mail_username = this.items.email_inbound ? this.items.email_inbound.mail_username : ''
        this.mail_password = this.items.email_inbound ? this.items.email_inbound.mail_password : ''
        // this.mail_port = this.items.email_inbound.mail_port ?? ''
        this.mail_transport = this.items.email_inbound ? {option: this.items.email_inbound.mail_transport.toUpperCase() } :null

        this.mail_encryption = this.items.email_inbound ? {option:  this.items.email_inbound.mail_encryption.toUpperCase()} : null



        
      });
    },
    responseInbound() {
      const blankFormData = {
        id: router.currentRoute.params.emailID,
        mail_transport: this.mail_transport,
        mail_host: this.mail_host,
        mail_port: this.mail_port,
        mail_username: this.mail_username,
        mail_password: this.mail_password,
        mail_encryption: this.mail_encryption

      };
      console.log(blankFormData);
      if(this.items.email_inbound === null){
        

        this.$store.dispatch('emails/storeEmailInbound',
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
    if(this.items.email_inbound !== null) {
      
      this.$store.dispatch('emails/update_email_inbound',{
        payload: blankFormData,
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
  