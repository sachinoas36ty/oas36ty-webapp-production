<template>
  <b-card-code title="Edit Email">
    <b-form @submit.prevent>
      <b-row>
        <b-col md="12">
          <b-form-group label="Email" label-for="mc-first-name">
            <b-form-input id="mc-first-name" placeholder="Email" v-model="email" />
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col>
           <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1"
            @click="UpdateEmail(id)" :disabled="isLoading">
            Update
            <b-spinner small class="ml-1" v-if="isLoading" />
          </b-button>
          <!-- <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
              Reset
            </b-button> -->
        </b-col>
      </b-row>
    </b-form>

    <template #code>
      {{ codeMultipleColumn }}
    </template>
  </b-card-code>


</template>
  
<script>
import router from '@/router'
import BCardCode from '@core/components/b-card-code'
import {
  BRow, BCol, BSpinner, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { codeMultipleColumn } from './code'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import "vue-toastification/dist/index.css";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BSpinner,
    BFormCheckbox,
    BForm,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      codeMultipleColumn,
      email: '',

      id: router.currentRoute.params.emailID
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.emails.isLoading;
    },
    SuccessMessage(){
      return this.$store.state.emails.successMessage;
    },
    ErrorMessage(){
      return this.$store.state.emails.errorMessage;
    },
    items() {
      return this.$store.state.emails.all;
    }
  },
  mounted() {
    this.fetchEmail();
    // this.email = this.items.email
    // console.log(router.currentRoute.params.emailID);
  },
  methods: {
    fetchEmail() {
      this.$store.dispatch('emails/get', { id: router.currentRoute.params.emailID }).then(() => {
        this.email = this.items.email
        
      });
    },
    UpdateEmail(id) {
      // id: id,
      let payload = {
        email: this.email
      };
      // console.log(update);
      this.$store.dispatch('emails/update', {
        id: id,
        payload
      }).then(() => {
        if (this.SuccessMessage != "") {

          // this.$toast({
          //   component: ToastificationContent,
          //   props: {
          //     title: this.SuccessMessage,
          //     icon: 'UserIcon',
          //     variant: 'success',
          //   },
          // })

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

// this.$toast({
//   component: ToastificationContent,
//   props: {
//     title: this.ErrorMessage,
//     icon: 'UserIcon',
//     variant: 'danger',
//   },
// })
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
      });
    }
  }
}
</script>
  