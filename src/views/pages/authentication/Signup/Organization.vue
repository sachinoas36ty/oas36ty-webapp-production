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
          <b-img fluid :src="imgUrl" alt="Register" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Organization Information
          </b-card-title>
          <b-card-text class="mb-2">
            Please enter your Organization details!
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm">
            <b-form class="auth-register-form mt-2">
              <!-- name -->
              <b-form-group
                label="Organization Name"
                label-for="organization_name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Organization Name"
                  vid="organization_name"
                  rules="required"
                >
                  <b-form-input
                    id="organization_name"
                    v-model="organization_name"
                    name="organization_name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Oas36ty"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- url -->
              <b-form-group
                label-for="organization_url"
                label="Organization URL"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Organization URL"
                  vid="organization_url"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="organization_url"
                      v-model="organization_url"
                      class="form-control-merge pr-0"
                      :state="errors.length > 0 ? false : null"
                      name="organization_url"
                      placeholder="example"
                    />
                    <b-input-group-append is-text
                      >.oas36ty.com
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                @click.prevent="validationForm"
                :disabled="isLoading"
              >
                <b-spinner small v-if="isLoading" />
                Next
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{ name: 'auth-login' }">
              <span>&nbsp;Sign in instead</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Register-->
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
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BSpinner,
} from "bootstrap-vue";
import { required } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import router from "@/router";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-toastification/dist/index.css";

export default {
  components: {
    Oas36tyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BSpinner,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      organization_name: localStorage.getItem("signupOrgName"),
      organization_url: localStorage.getItem("signupOrgURL"),
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
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
    signupToken() {
      return localStorage.getItem("signupToken");
    },
    signupEmail() {
      return localStorage.getItem("signupEmail");
    },
    signupEmailVerified() {
      return JSON.parse(localStorage.getItem("signupEmailVerified"));
    },
    signupOrgName() {
      return localStorage.getItem("signupOrgName");
    },
    signupOrgURL() {
      return localStorage.getItem("signupOrgURL");
    },
  },
  methods: {
    validationForm() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.$store
            .dispatch("auth/signupOrganization", {
              signup_token: this.signupToken,
              email: this.signupEmail,
              organization_name: this.organization_name,
              organization_url: this.organization_url,
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
              router.push({ name: "auth-register-step4" });
            })
            .catch(() => {
              this.$refs.registerForm.setErrors(this.errors);
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
  created() {
    if (!this.signupToken) {
      router.push({ name: "auth-register" });
    }
    if (!this.signupEmailVerified) {
      router.push({ name: "auth-register-step2" });
    }
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
