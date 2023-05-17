<template>
  <div class="auth-wrapper auth-v2">
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
          <b-img fluid :src="imgUrl" alt="Forgot password" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Forgot password-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Forgot Organization? 🔒
          </b-card-title>
          <b-card-text class="mb-2">
            Enter your email and we'll send you details about your Organization
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <b-form-group label="Email" label-for="forgot-password-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="isLoading"
              >
                <b-spinner small v-if="isLoading" />
                Send me
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{ name: 'auth-login' }">
              <feather-icon icon="ChevronLeftIcon" /> Back to login
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Forgot password-->
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
  BCardTitle,
  BCardText,
  BImg,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { required, email } from "@validations";
import store from "@/store/index";
import router from "@/router";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-toastification/dist/index.css";

export default {
  components: {
    Oas36tyLogo,
    BRow,
    BCol,
    BLink,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: "",
      sideImg: require("@/assets/images/pages/forgot-password-v2.svg"),
      // validation
      required,
      email,
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/forgot-password-v2-dark.svg");
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
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          this.$store
            .dispatch("auth/forgotOrganization", {
              email: this.userEmail,
            })
            .then(() => {
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
              router.push({ name: "auth-login" });
            })
            .catch(() => {
              this.$refs.simpleRules.setErrors(this.errors);
              if (this.errorMessage)
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
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
