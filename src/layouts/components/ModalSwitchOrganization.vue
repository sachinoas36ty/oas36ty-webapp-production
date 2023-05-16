<template>
  <!-- select 2 demo -->
  <b-modal
    id="modal-switch-organization"
    title="Switch Organization"
    ok-title="Switch"
    cancel-variant="outline-secondary"
    @ok="handleOk"
  >
  {{ setData }}
    <b-form>
      <b-form-group label="Choose Organization">
        <b-form-select v-model="switchSelected" :options="switchOptions" />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BButton,
  BModal,
  VBModal,
  BForm,
  BFormInput,
  BFormGroup,
  BCardText,
  BFormSelect,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import router from "@/router";
import { getUserData, getHomeRouteForLoggedInUser } from "@/auth/utils";

export default {
  components: {
    BButton,
    BModal,
    BForm,
    BFormInput,
    BCardText,
    BFormGroup,
    BFormSelect,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  data() {
    // const userData = getUserData();
    const userData = this.$store.state.auth.org

    const allTenants = userData?.all_tenants;

    // let switchSelected = userData?.tenant?.id;
    // let switchSelected = ''

    // let switchOptions = [];

    

    return {
      switchSelected: '',
      switchOptions: [],
    };
  },
  computed: {
    setData(){
      this.switchOptions = []
      this.$store.state.auth.org.all_tenants.forEach((tenant, index) =>{
        

        this.switchOptions.push({
          value: tenant.id,
          text: tenant.organization.name + " (" + tenant.organization.subdomain + ")",
        }); 
      
  });
  this.switchSelected = this.$store.state.auth.org?.tenant?.id
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
    handleOk() {
      this.$store
        .dispatch("auth/switchOrg", {
          tenant_id: this.switchSelected,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.successMessage,
              icon: "CheckIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          //   this.$refs.loginValidation.setErrors(this.errors);
          if (this.errorMessage)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.errorMessage,
                icon: "BellIcon",
                variant: "danger",
              },
            });
        })
        .finally(() => {
          const resolved = this.$router.resolve({
            name: "dashboard",
          });
          window.location.href = resolved.href;
        });
    },
  },
};
</script>
