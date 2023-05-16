<template>
    <!-- Error page-->
    <div class="misc-wrapper">
      <b-link class="brand-logo" :to="{ path: '/' }">
        <oas36ty-logo />
      </b-link>
  
      <div class="misc-inner p-2 p-sm-3">
        <div class="w-100 text-center">
          <h2 class="mb-1">Invitation 🕵🏻‍♀️</h2>
          <p class="mb-2">
           Accept Invite / Decline Invite
          </p>
  
          <b-button
            variant="primary"
            class="mb-2 btn-sm-block"
          
            @click="Accept()"
            :disabled="isLoading"
          >
            Accept
            <b-spinner small style="margin-left:8px;" v-if="isLoading" />
          </b-button>
          &emsp;
          <b-button
            variant="primary"
            class="mb-2 btn-sm-block"
            @click="decline()"
            :disabled="declineLoading"
            
          >
            Decline
            <b-spinner small style="margin-left:8px" v-if="declineLoading" />

          </b-button>
          <!-- image -->
          <b-img fluid :src="imgUrl" alt="Error page" />
        </div>
      </div>
    </div>
    <!-- / Error page-->
  </template>
  
  <script>
  /* eslint-disable global-require */
  import { BLink, BButton, BImg, BSpinner } from "bootstrap-vue";
  import Oas36tyLogo from "@core/layouts/components/Logo.vue";
  import store from "@/store/index";
  import router from "@/router";
  import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-toastification/dist/index.css";
  
  export default {
    components: {
      Oas36tyLogo,
      BLink,
      BButton,
      BSpinner,
      BImg,
    },
    data() {
      return {
        downImg: require("@/assets/images/pages/error.svg"),
      };
    },
    created(){
      // const token = localStorage.getItem('accessToken');
      
      // if(token === null){
      //   router.push({name: 'auth-login'})
      // }
    },
    computed: {
      isLoading() {
        return this.$store.state.auth.isLoading;
      },
      declineLoading() {
        return this.$store.state.auth.declineLoading;
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
      imgUrl() {
        if (store.state.appConfig.layout.skin === "dark") {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.downImg = require("@/assets/images/pages/error-dark.svg");
          return this.downImg;
        }
        return this.downImg;
      },
    },
    methods:{
        Accept(){
            // alert('Accept');
            let token = this.$route.query.token;
            this.$store.dispatch('auth/acceptInvite',{
                token: token,
            }).then(() => {
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
                // this.$refs.simpleRules.setErrors(this.errors);
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
        },
        decline(){
            // alert('decline');
            let token = this.$route.query.token;
            this.$store.dispatch('auth/declineInvite',{
                token: token,
            }).then(() => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.successMessage,
                    icon: "CheckIcon",
                    variant: "success",
                  },
                });
                router.push({ name: "auth-login" });
              })
              .catch(() => {
                // this.$refs.simpleRules.setErrors(this.errors);
                if (this.errorMessage)
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: this.errorMessage,
                      icon: "BellIcon",
                      variant: "danger",
                    },
                  });
              });
        }
    }
  };
  </script>
  
  <style lang="scss">
  @import "@core/scss/vue/pages/page-misc.scss";
  </style>
  