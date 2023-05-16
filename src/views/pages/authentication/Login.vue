<template>
  <div class="auth-wrapper auth-v2">
    <snackbar ref="snackbar"  class="hello" position="bottom-left"   :multiple="false" style="z-index: 2000;"/>

    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo" :to="{ path: '/' }">
        <oas36ty-logo />
        <!-- <h2 class="brand-text text-primary ml-1">{{ appName }}</h2> -->
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to {{ appName }}! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group> -->

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
                :disabled="isLoading"
              >
                <b-spinner small v-if="isLoading" />
                Sign in
              </b-button>
            </b-form>
          </validation-observer>
          
          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{ name: 'auth-register' }">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>
          
          <b-card-text class="text-center mt-2">
            <span>Forgot Organization? </span>
            <b-link :to="{ name: 'auth-forgot-organization' }">
              <span>&nbsp;Click here</span>
            </b-link>
            <br><br>
            <!-- <a href="">FORM CA</a> -->
            <b-button @click="gotoForm()" size="sm" variant="success">Form CA</b-button>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Oas36tyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import router from "@/router";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-toastification/dist/index.css";

import { $themeConfig } from "@themeConfig";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import Snackbar from 'vuejs-snackbar'
export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,Snackbar,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BSpinner,
    Oas36tyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      userEmail: "",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
    isLoading() {
      return this.$store.state.auth.isLoading;
    },
    successMessage() {
      return this.$store.state.auth.successMessage;
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.auth.errors));
    },
  },
  updated(){
    // if(this.successMessage == 'Logged Out Successfully!'){
    //   var t = 'info';
    //     this.$refs.snackbar[t]('You have successfully logged out!')
    // }
  },
  methods: {
    gotoForm(){
      this.$router.push({name:'form-ca'})
    },
    validationForm() {
      
      
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.$store
            .dispatch("auth/login", {
              email: this.userEmail,
              password: this.password,
            })
            .then(() => {
              let latest_date = this.$store.state.auth.all.userTimesheet.latest_date;
              let current_date = this.$store.state.auth.current_date//all.userTimesheet.latest_date;
              this.$store.dispatch('branches/fetch')
              this.$store.dispatch('categories/fetch')
              this.$store.dispatch('clients/fetch')
              this.$store.dispatch('contactPeople/fetchForLeads')
              this.$store.dispatch('designation/fetch').then(() => {
              this.$store.dispatch('status/fetchAllMaster').then(() => {
                this.$store.dispatch('tasks/audits').then(() => {
                
        // this.$store.dispatch('status/fetchAllMaster')

                    
                })
              })
            });

              var t = 'info';
              // this.$refs.snackbar[t](this.successMessage)
              this.$toast.success(this.successMessage, {
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
        });

              // this.$toast({
              //   component: ToastificationContent,
              //   props: {
              //     title: this.successMessage,
              //     icon: "CheckIcon",
              //     variant: "success",
              //   },
              // });
              // setTimeout(() => {
                router.push(getHomeRouteForLoggedInUser()).catch((error) => {
                  console.log(error);
                });
              // }, 1000);
            })
            .catch(() => {
              this.$refs.loginValidation.setErrors(this.errors);
              if (this.errorMessage)
              var t = 'error';
              // this.$refs.snackbar[t](this.errorMessage)
              this.$toast.error(this.errorMessage, {
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
        });
                // this.$toast({
                //   component: ToastificationContent,
                //   props: {
                //     title: this.errorMessage,
                //     icon: "BellIcon",
                //     variant: "danger",
                //   },
                // });
            });
        }
      });
    },
  },
  created() {
    console.log(router);

  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app;
    return {
      appName,
      appLogoImage,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
