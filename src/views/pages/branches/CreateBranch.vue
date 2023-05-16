<template>
  <div>
    <b-modal
      no-close-on-backdrop
      id="modal-branches"
      ref="modal-branches"
      size="lg"
      title="Add new branch"
      hide-footer
      class="b-overlay position-relative"
    >
      <!-- <b-card-body> -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form @submit.prevent="handleSubmit(createBranch)">
          <b-row>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="name"
                vid="branchname"
                rules="required"
              >
                <b-form-group label="Branch Name *" label-for="contact" class="my-custom-select">
                  <b-form-input
                    placeholder="Enter Name"
                    id="branchname"
                    v-model="formData.name"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                  <div class="d-block invalid-feedback">
                    {{
                      $store.state.branches.errors.name
                        ? $store.state.branches.errors.name[0]
                        : null
                    }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="business name"
                vid="business name"
                rules="required"
              >
                <b-form-group label="Business Name *" label-for="contact" class="my-custom-select">
                  <b-form-input
                    placeholder="Enter Business"
                    id="name"
                    v-model="formData.bussiness_name"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <b-form-group label="Business Type" label-for="contact" class="my-custom-select">
                <v-select
                  @input="businessTypeID"
                  v-model="selectedBusinessType"
                  placeholder="Search Business Types"
                  class="select-size-md"
                  label="name"
                  :options="allBusinessTypes"
                >
                </v-select>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="mobile"
                vid="mobile"
                rules="required|digits:10"
              >
                <b-form-group label="Primary Phone *" label-for="contact" class="my-custom-select">
                  <b-form-input
                    placeholder="Enter Phone"
                    id="mobile"
                    @keypress="isNumber($event)"
                    v-model.number="formData.mobile"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
              <b-form-group label="GST No." label-for="contact" class="my-custom-select">
                <b-form-input
                
                  v-bind:class="
                    (formData.gst_number.length > 0 &&
                      formData.gst_number.length !== 15) ||
                    (formData.gst_number.length === 15 && gsterr === true)
                      ? 'is-invalid'
                      : ''
                  "
                  @input="pan"
                  placeholder="Enter GST No."
                  id="name"
                  v-model="formData.gst_number"
                  
                >
                </b-form-input>
                <span
                  v-if="
                    (formData.gst_number.length > 0 &&
                      formData.gst_number.length !== 15) ||
                    (formData.gst_number.length === 15 && gsterr === true)
                  "
                  class="d-block invalid-feedback"
                  id="errmsg"
                  >Invalid gst number</span
                >
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="PAN Card" label-for="contact" class="my-custom-select">
                <b-form-input
                  placeholder="Enter PAN No"
                  id="name"
                  v-model="formData.pan_number"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="selectedState"
                vid="state"
                rules="required"
              >
          

              <b-form-group label="State *" label-for="contact" class="my-custom-select">
                  <v-select
                    @input="stateCode"
                    id="state" v-model="selectedState"
                    placeholder="Search States"
                    class="select-size-md"
                    label="name"
                    :options="allStates"
                  >
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
        
              </b-form-group>
              </validation-provider>
              <!-- </validation-provider> -->
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="selectedBank"
                vid="bank"
                rules="required"
              >
                <b-form-group label="Bank *" label-for="contact" class="my-custom-select">
                  <v-select
                    id="bank"
                    @input="bankID"
                    v-model="allBankDetails[0]"
                    placeholder="Search Banks"
                    class="select-size-md"
                    label="name"
                    :options="allBankDetails"
                  >
                    <template #list-header class="add_contacts">
                      <div class="ml-2 mb-1 mt-1" v-b-modal.add-new-bank>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon
                            size="14"
                            style="margin-right: 0.5rem"
                            icon="PlusIcon"
                          />
                          New Bank A/C
                        </a>
                      </div>
                    </template>
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Address" label-for="contact" class="my-custom-select">
                <b-form-textarea
                  v-model="formData.address"
                  id="address"
                  placeholder="Enter Address"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Website" label-for="contact" class="my-custom-select">
                <b-form-input
                  placeholder="Enter Website Url"
                  id="name"
                  v-model="formData.website"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <validation-provider
                #default="validationContext"
                name="logo"
                vid="file_name"
                rules="required"
              >
                <!-- <b-form-group  label="Logo" label-for="contact">
              <b-form-file v-model="file" @input="handleUpload()" accept="image/*"></b-form-file>
            </b-form-group> -->
                <b-form-group label="Logo *">
                  <b-form-input hidden v-model="formData.logo"></b-form-input>
                  <div class="border-l" id="file_name">
                    <div class="d-flex flex-column">
                      <div
                        class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                      >
                        <div>Logo</div>
                        <div>
                          <input
                            type="file"
                            ref="file"
                            @change="handleUpload"
                            style="display: none"
                          />
                          <b-button
                            size="sm"
                            variant="primary"
                            @click="$refs.file.click()"
                            >Choose File(s)</b-button
                          >
                        </div>
                      </div>
                      <!-- </b-form> -->
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-1">
                      <div v-if="fileData.length > 0">{{ fileData[0].name }}</div>
                      <div v-else>No file(s) selected</div>
                      <b-media-aside class="mr-0">
                        <b-img
                          v-if="formData.logo !== null && formData.logo != ''"
                          id="ref_image_base_64"
                          ref="refPreviewEl"
                          v-model="formData.logo"
                          :src="formData.logo"
                          height="40"
                          width="40"
                          rounded="circle"
                          class="border border-l"
                        />
                      </b-media-aside>
                    </div>
                  </div>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <div class="text-right mt-1">
            <b-button
              size="sm"
              variant="primary"
              @click="
                () => {
                  $refs['modal-branches'].hide();
                  resetFormData();
                }
              "
            >
              Cancel </b-button
            >&emsp;
            <b-button
              size="sm"
              :disabled="$store.state.branches.isSidebarLoading"
              variant="primary"
              type="submit"
            >
              Save
              <b-spinner
                small
                class="ml-1"
                v-if="$store.state.branches.isSidebarLoading"
              />
            </b-button>
          </div>
        </b-form>
      </validation-observer>
      <!-- </b-card-body> -->
      <div v-if="$store.state.branches.isSidebarLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Adding Branch..</span>
      </div>
    </div>
    </b-modal>
    <b-modal
      no-close-on-backdrop
      id="add-bank"
      ref="add-bank"
      size="lg"
      :title="titleBank"
      hide-footer
    >
      <template #modal-header>
        <h5 class="modal-title">{{ titleBank }}</h5>
        <!-- <button type="button" aria-label="Close" class="close">x</button> -->
        <feather-icon
          icon="XIcon"
          size="24"
          class="cursor-pointer"
          @click="
            () => {
              remove_all_fields();
              $refs['add-bank'].hide();
            }
          "
        />
      </template>
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          class="mt-1"
          @submit.prevent="
            handleSubmit(titleBank == 'add bank details' ? addBank : update)
          "
        >
          <b-row>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="acc_name"
                vid="acc_name"
                rules="required"
              >
                <b-form-group label="Account Name">
                  <b-form-input
                     
                    id="acc_name"
                    v-model="acc_name"
                    placeholder="Account Name"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="acc_number"
                vid="acc_number"
                rules="required"
              >
                <b-form-group label="Account Number">
                  <b-form-input
                     
                    id="acc_number"
                    type="number"
                    v-model="acc_number"
                    placeholder="Account Number"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="ifsc_code"
                vid="ifsc_code"
                rules="required"
              >
                <b-form-group label="IFSC Code">
                  <b-form-input
                     
                    id="ifsc_code"
                    v-model="ifsc_code"
                    placeholder="IFSC Code"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <b-form-group label="Swift Code">
                <b-form-input v-model="swift_code" placeholder="Swift Code">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
              <b-form-group label="MICR">
                <b-form-input type="number" v-model="micr" placeholder="MICR">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="bank_name"
                vid="bank_name"
                rules="required"
              >
                <b-form-group label="Bank Name">
                  <b-form-input
                     
                    id="bank_name"
                    v-model="bank_name"
                    placeholder="Bank Name"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="bank_branch"
                vid="bank_branch"
                rules="required"
              >
                <b-form-group label="Bank Branch">
                  <b-form-input
                     
                    id="bank_branch"
                    v-model="bank_branch"
                    placeholder="Bank Branch"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <validation-provider
                #default="validationContext"
                name="acc_type"
                vid="acc_type"
                rules="required"
              >
                <b-form-group label="Account Type">
                  <v-select
                     
                    id="acc_type"
                    v-model="acc_type"
                    placeholder="Select an Option"
                    :options="accountTypes"
                    label="name"
                  />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="text-right mt-1">
            <b-button
              size="sm"
              @click="
                () => {
                  remove_all_fields();
                  $refs['add-bank'].hide();
                }
              "
              class="mr-1"
              type="reset"
              variant="primary"
            >
              Cancel
            </b-button>
            <b-button size="sm" type="submit" variant="primary">
              {{ titleBank == "add bank details" ? "Create" : "Update" }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import {
  BModal,
  BFormInvalidFeedback,
  // BSpinner,
  BForm,
  BImg,
  VBModal,
  BMediaAside,
  BFormInput,
  BFormGroup,
  BFormTextarea,
  BFormFile,
  BCard,
  BContainer,
  BRow,
  BCol,
  BPagination,
  BTable,
  BButton,
  BDropdown,
  BDropdownItem,
  BSpinner,
} from "bootstrap-vue";
import store from "@/store";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { ref, computed } from "@vue/composition-api";
import { required, email } from "@validations";
import vSelect from 'vue-select'
import axiosIns from '@/libs/axios';
import axios from 'axios'
import { isUserLoggedIn } from "@/auth/utils";
export default {
  components: {
    BForm,
    BFormGroup,
    BButton,
    BModal,
    BFormInvalidFeedback,
    BFormInput,
    BRow,
    BCol,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    vSelect,
    BFormFile,
    BFormTextarea,
    BMediaAside,
    BImg,
  },
  data() {
    return {
      alertField: "",
      name: "",
      required,
      titleBank: "add bank details",
      acc_name: "",
      acc_number: "",
      ifsc_code: "",
      // titleBank: '',
      swift_code: "",
      // bankID:0,
      micr: "",
      accountTypes: [
        { id: 1, name: "Current Account" },
        { id: 2, name: "Savings Account" },
        { id: 3, name: "Recurring Deposit Account" },
        { id: 4, name: "Fixed Deposit Account" },
      ],
      bank_name: "",
      bank_branch: "",
      acc_type: null,
      file: null,
      fileData: [],
      gsterr: true,
      selectedState: "",
      selectedBusinessType: "",
      selectedBank: "",
      file_name: "",
      previewImage: null,
      image: null,
    };
  },
  directives: {
    "b-modal": VBModal,
  },
  methods: {
    isNumber(ev) {
      const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
      const keyPressed = ev.key;

      if (!keysAllowed.includes(keyPressed)) {
        ev.preventDefault();
      }
    },
    remove_all_fields() {
      this.acc_name = null;
      this.acc_type = null;
      this.acc_number = null;
      this.acc_branch = null;
      this.bank_name = null;
      this.bank_branch = null;

      this.ifsc_code = null;
      this.swift_code = null;
      this.micr = null;
    },
    openModal() {
      this.$refs["add-bank"].show();
    },
    addBank() {
      // alert('hello')
      const data = {
        account_name: this.acc_name,
        bank_name: this.bank_name,
        account_number: this.acc_number,
        ifsc_code: this.ifsc_code,
        swift_code: this.swift_code,
        micr_code: this.micr,
        branch_name: this.bank_branch,
        account_type: this.acc_type.name,
      };
      this.$store.dispatch("proposals/bank_create", data).then(() => {
        this.$store.dispatch("proposals/bank_fetch");
        this.$refs["add-bank"].hide();
      });
    },
    createBranch() {
      console.log('hee');
      const data = {
        name: this.formData.name,
        bussiness_name: this.formData.bussiness_name,
        bussiness_type: this.formData.bussiness_type,
        mobile: this.formData.mobile,
        gst_number: this.formData.gst_number,
        pan_number: this.formData.pan_number,
        state_code: this.$store.state.branches.states.filter(
          (e) => e.name === this.selectedState
        )[0].fips_code,
        logo_name: this.$store.state.branches.logo[0].fileName,
        bank_id: this.$store.state.proposals.allBank.filter(
          (e) => e.account_name === this.allBankDetails[0]
        )[0].id,
        address: this.formData.address,
        website: this.formData.website,
        logo: this.formData.logo,
      };
      console.log(data);
      // console.log(this.formData)
      this.$store.dispatch("branches/store", data).then(() => {
        this.resetFormData();
        this.$refs["modal-branches"].hide();
        this.$store.dispatch("branches/fetch");
        this.$toast.success("Branch Created Successfully!", {
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
      });
    },
    stateCode() {
      let stateCode = this.$store.state.branches.states.filter((x) => {
        return x.name === this.selectedState;
      });
      this.formData.state_code = stateCode[0].fips_code;
    },
    businessTypeID() {
      let businessTypeID = this.$store.state.branches.businessTypes.filter((x) => {
        return x.bussiness_type === this.selectedBusinessType;
      });
      this.formData.bussiness_type = businessTypeID[0].id;
    },
    bankID() {
      let bankID = this.$store.state.proposals.allBank.filter((x) => {
        return x.account_name === this.allBankDetails[0];
      });
      this.formData.bank_id = bankID[0].id;
      console.log(this.formData);
    },
    pan() {
      if (this.formData.gst_number.length === 15) {
        if (
          isNaN(
            this.formData.gst_number.slice(0, 2) +
              this.formData.gst_number.slice(7, 10) +
              this.formData.gst_number.slice(14, 15)
          ) === false &&
          isNaN(
            this.formData.gst_number.slice(2, 7) +
              this.formData.gst_number.slice(11, 12) +
              this.formData.gst_number.slice(13, 14)
          ) &&
          (9 > +this.formData.gst_number.slice(12, 13) > 0 ||
            isNaN(this.formData.gst_number.slice(12, 13)))
        ) {
          this.formData.pan_number = this.formData.gst_number.slice(2, 12);
          let states = this.$store.state.branches.states;
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.formData.gst_number.slice(0, 2);
          });
          console.log(stateFilter, "sssss");
          this.selectedState = stateFilter[0].name;
          this.gsterr = false;
          console.log("noerr");
        }
      } else {
        this.formData.pan_number = "";
        this.formData.state = "";
      }
    },
    handleUpload(e) {
      console.log();
      this.file = e.target.files[0];
      this.fileData = [];
      // const reader = new FileReader();
      // this.file.forEach((x) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        let data = {
          file: e.target.result,
          name: this.file.name,
        };
        this.fileData.push(data);
        this.logoURL(this.fileData);
      };
      reader.readAsDataURL(this.file);
      // });
      e.target.value = ''

    },
    logoURL(files) {
      var data = {
        attach: files ? files : "null",
      };
      this.$store.dispatch("branches/logo", { data: data }).then(() => {
        let data = this.$store.state.branches.logo;
        this.formData.logo = data.length > 0 ? data[0].url : files[0].name;
        this.formData.logo_name = files[0].name;
      });
    },

    resetFormData() {
      this.file_name = "";
      
      this.allBankDetails = null;
      this.fileData = [];
      this.file = null;
      this.selectedBusinessType = null;
      this.previewImage = "";
      this.selectedState = null;
      this.image = "";
      (this.formData.name = ""),
        (this.formData.bussiness_name = ""),
        (this.formData.bussiness_type = ""),
        (this.formData.mobile = ""),
        (this.formData.gst_number = ""),
        (this.formData.pan_number = ""),
        (this.formData.state_code = ""),
        (this.formData.bank_id = ""),
        (this.formData.address = ""),
        (this.formData.website = ""),
        (this.formData.logo = "");
    },
  },
  created() {
    // console.log(this.$router.currentRoute.name);
    if(isUserLoggedIn()){
      this.$store.dispatch('branches/states')
    }
    if (this.$router.currentRoute.name != "auth-login") {
      // console.log(this.$router.currentRoute);
      if (this.$store.state.proposals.allBank.length === 0) {
        // this.$store.dispatch('proposals/bank_fetch')
      }
      if (this.$store.state.branches.businessTypes.length === 0) {
        // this.$store.dispatch("branches/business")
      }
      if (this.$store.state.branches.states.length === 0) {

        // this.$store.dispatch("branches/states")
         this.$store.dispatch("branches/business")
        
      }
    }
  },
  computed: {
    allStates() {
      let data = this.$store.state.branches.states;
      let allStates = [];
      data.forEach((y) => {
        allStates.push(y.name);
      });
      return allStates;
    },
    allBusinessTypes() {
      let data = this.$store.state.branches.businessTypes;
      let allBusinessTypes = [];
      data.forEach((y) => {
        allBusinessTypes.push(y.bussiness_type);
      });
      return allBusinessTypes;
    },
    allBankDetails() {
      let data = this.$store.state.proposals.allBank;
      let allBankDetails = [];
      data.forEach((y) => {
        allBankDetails.push(y.account_name);
      });
      return allBankDetails;
    },
    allBranches() {
      let data = this.$store.state.branches.all;
      let allBranches = [];
      data.forEach((y) => {
        allBranches.push(y);
      });
      return allBranches;
    },
  },
  setup() {
    const blankFormData = {
      name: "",
      bussiness_name: "",
      bussiness_type: "",
      mobile: "",
      gst_number: "",
      pan_number: "",
      state_code: "",
      logo_name: "",
      bank_id: "",
      address: "",
      website: "",
      logo: "",
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.branches.errors));
    });

    const { refFormObserver, getValidationState } =
      formValidation();

    return {
      formData,
      // onSubmit,

      refFormObserver,
      getValidationState,
      // resetForm,
    };
  },
};
</script>
<style>
.modal-lg {
  margin-top: 6.5rem;
}
.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}

.modal-title {
  text-transform: uppercase;
}

.border-l {
  border: 1px solid rgb(212, 212, 212);
}
</style>
