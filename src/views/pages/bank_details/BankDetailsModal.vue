<template>
    <b-modal
      no-close-on-backdrop
      id="add-new-bank"
      ref="add-new-bank"
      size="lg"
      :title="titleBank"
      hide-footer
      class="b-overlay position-relative"
    >
      <template #modal-header>
        <h5 class="modal-title">{{ "Add Bank Details" }}</h5>
        <!-- <button type="button" aria-label="Close" class="close">x</button> -->
        <feather-icon
          icon="XIcon"
          size="24"
          class="cursor-pointer"
          @click="
            () => {
              remove_all_fields()
              $refs['add-new-bank'].hide()
            }
          "
        />
      </template>

      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          class="mt-1"
          @submit.prevent="
            handleSubmit(titleBank == 'add bank details' ? update : onSubmit)
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
                <b-form-group label="Account Name *" class="my-custom-select">
                  <b-form-input
                    id="acc_name"
                    v-model="acc_name"
                    placeholder="Account Name"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
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
                <b-form-group label="Account Number *" class="my-custom-select">
                  <b-form-input
                    id="acc_number"
                    type="number"
                    v-model="acc_number"
                    placeholder="Account Number"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
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
                <b-form-group label="IFSC Code *" class="my-custom-select">
                  <b-form-input
                    id="ifsc_code"
                    v-model="ifsc_code"
                    placeholder="IFSC Code"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <b-form-group label="Swift Code" class="my-custom-select">
                <b-form-input v-model="swift_code" placeholder="Swift Code">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
              <b-form-group label="MICR" class="my-custom-select">
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
                <b-form-group label="Bank Name *" class="my-custom-select">
                  <b-form-input
                    id="bank_name"
                    v-model="bank_name"
                    placeholder="Bank Name"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
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
                <b-form-group label="Bank Branch *" class="my-custom-select">
                  <b-form-input
                    id="bank_branch"
                    v-model="bank_branch"
                    placeholder="Bank Branch"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
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
                <b-form-group label="Account Type *" class="my-custom-select">
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
                  remove_all_fields()
                  $refs['add-new-bank'].hide()
                }
              "
              class="mr-1"
              type="reset"
              variant="primary"
            >
              Cancel
            </b-button>
            <b-button size="sm" type="submit" variant="primary">
              {{ titleBank == "add bank details" ? "Update" : "Create" }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
      <div
        v-if="$store.state.proposals.isLoadingBank"
        class="b-overlay position-absolute"
        style="inset: 0px; z-index: 10; /* display: none; */"
      >
        <div
          class="position-absolute bg-white rounded-sm"
          style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"
        ></div>
        <div
          class="position-absolute d-flex align-items-center flex-column"
          style="
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
          "
        >
          <span aria-hidden="true" class="spinner-border text-primary">
            <!----></span
          >
          <br /><span>Adding Bank Details..</span>
        </div>
      </div>
    </b-modal>
</template>
<style scoped>
.my-custom-select ::placeholder {
  font-size: 1rem;
  /* color: rgba(128, 128, 128, 0.442) !important; */
  color: rgb(85, 81, 81) !important;
}
</style>
<script>
import {
  BFormInvalidFeedback,
  BContainer,
  BSpinner,
  BRow,
  BTable,
  BCard,
  BCol,
  BButton,
  BModal,
  BFormInput,
  BFormGroup,
  BForm,
} from "bootstrap-vue"
import { quillEditor } from "vue-quill-editor"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import formValidation from "@/@core/comp-functions/forms/form-validation"
import vSelect from "vue-select"
import { isUserLoggedIn } from "@/auth/utils"

export default {
  name: "Bank_Details",
  components: {
    BRow,
    BCol,
    BButton,
    BSpinner,
    BTable,
    BCard,
    ValidationObserver,
    BFormInvalidFeedback,
    BModal,
    BFormInput,
    BFormGroup,
    quillEditor,
    BForm,
    ValidationProvider,
    BContainer,
    vSelect,
  },
  data() {
    return {
      BankTable: [
        { key: "account_name", label: "account name" },
        { key: "account_number", label: "account number" },
        { key: "ifsc_code", label: "ifsc code" },
        { key: "account_branch", label: "account branch" },
      ],
      acc_name: "",
      acc_number: "",
      ifsc_code: "",
      titleBank: "",
      swift_code: "",
      bankID: 0,
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
    }
  },
  computed: {
    items() {
      return this.$store.state.proposals.allBank
    },
  },
  methods: {
    destroy(id) {
      if (confirm("are you sure to delete?")) {
        this.$store.dispatch("proposals/bank_delete", id).then(() => {
          this.$store.dispatch("proposals/bank_fetch")
        })
      }
    },
    remove_all_fields() {
      this.acc_name = null
      this.acc_type = null
      this.acc_number = null
      this.acc_branch = null
      this.bank_name = null
      this.bank_branch = null

      this.ifsc_code = null
      this.swift_code = null
      this.micr = null
    },
    openModal(name, data) {
      if (name == "add-new-bank") {
        this.titleBank = "add bank details"
        this.$refs[name].show()
      } else {
        this.bankID = name.split("_")[1]
        this.titleBank = "edit bank details"
        if (data != 0) {
          this.acc_name = data.account_name
          this.accountTypes.forEach((element) => {
            if (element.name == data.account_type) {
              this.acc_type = element
            }
          })
          this.acc_number = data.account_number
          this.bank_branch = data.branch_name
          this.bank_name = data.bank_name

          this.ifsc_code = data.ifsc_code
          this.swift_code = data.swift_code
          this.micr = data.micr_code
        }
        this.$refs[name.split("_")[0]].show()
      }
    },

    onRowClicked(item) {
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false
      }

      this.$set(item, "_showDetails", !item._showDetails)
      this.detailsRow = item
    },
    onSubmit() {
      const data = {
        account_name: this.acc_name,
        bank_name: this.bank_name,
        account_number: this.acc_number,
        ifsc_code: this.ifsc_code,
        swift_code: this.swift_code,
        micr_code: this.micr,
        branch_name: this.bank_branch,
        account_type: this.acc_type.name,
      }
      this.$store.dispatch("proposals/bank_create", data).then(() => {
        this.$store.dispatch("proposals/bank_fetch")
        this.$refs["add-new-bank"].hide()
      })
    },
    update() {
      this.$store
        .dispatch("proposals/bank_update", {
          payload: {
            account_name: this.acc_name,
            bank_name: this.bank_name,
            account_number: this.acc_number,
            ifsc_code: this.ifsc_code,
            swift_code: this.swift_code,
            micr_code: this.micr,
            branch_name: this.bank_branch,
            account_type: this.acc_type.name,
          },
          id: this.bankID,
        })
        .then(() => {
          this.$store.dispatch("proposals/bank_fetch")
          this.$refs["add-new-bank"].hide()
        })
    },
  },
  created() {
    let loggedIn = isUserLoggedIn()
    if (loggedIn) {
      this.$store.dispatch("proposals/bank_fetch")
    }
  },
  setup() {
    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetForm
    )
    return {
      refFormObserver,
      getValidationState,
      formValidation,
    }
  },
}
</script>
