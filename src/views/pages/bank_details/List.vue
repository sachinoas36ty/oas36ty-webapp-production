<template>
    <div>
        <div class="">



<div class="header d-flex justify-content-between">
                                <div style="margin-top:0.5rem;">

                                    <h2 class="text-uppercase">
                                        Bank details
                                    </h2>
                                </div>
                                 <b-button size="sm" @click="openModal('add-bank', 0)"   class="" variant="primary">
                                    <span>
                                        Add
                                    </span>
                                </b-button>
                            </div>
</div>
    <!-- <b-card no-body style="border-top:2px solid #eee;" > -->
        <div class="body mt-1   mb-2" style="border-top:2px solid #F75949;">

        <b-table :show-empty="items.length === 0" id="bank_table" selectable responsive class="mt-2  mb-0" @row-clicked="onRowClicked" :items="items"
                :fields="BankTable">

                <template #row-details="item">
                    <b-card no-body class="ml-2 mt-2 mr-2 mb-0">

                        <div class="d-flex justify-content-between"
                            style="text-transform: uppercase; font-weight: 500;">
                            Bank Details

                            <div>
                <feather-icon class="mr-1" @click="() => {
                    openModal('add-bank_'+item.item.id, item.item)
                }" icon="EditIcon" size="20" />
                     <feather-icon v-if="canBeDelete(item.item.account_number) === 1 "  @click="() => {
                    destroy(item.item.id)
                }" icon="TrashIcon" size="20" />
               
              </div>
                          
                        </div>
                        <hr style="border-color:#F75949">

                        <b-row class="match-height">
                            <b-container style="line-height: 2.5;">
                                <b-row>
                                    <b-col md="3" class="">
                                        <span style="font-weight: bolder;">
                                            Account Name :
                                        </span>
                                        
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.account_name }}
                                            </span>
                                    </b-col>
                                    <b-col md="3" class="">
                                        <span style="font-weight: bolder;">
                                            Account Number :
                                        </span>
                                        
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.account_number }}
                                            </span>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="3" >
                                        <span style="font-weight: bolder;">
                                            IFSC Code :
                                        </span>
                                        
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.ifsc_code }}
                                            </span>
                                    </b-col>
                                    <b-col md="3" >
                                        <span style="font-weight: bolder;">
                                            SWIFT Code :
                                        </span>
                                       
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.swift_code }}
                                            </span>
                                    </b-col>

                                </b-row>
                                <b-row>
                                    <b-col md="3" >
                                        <span style="font-weight: bolder;">
                                            MICR Code :
                                        </span>
                                       
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.micr_code }}
                                            </span>
                                    </b-col>
                                    <b-col md="3" >
                                        <span style="font-weight: bolder;">
                                            Bank Name :
                                        </span>
                                        
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.bank_name }}
                                            </span>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="3" >
                                        <span style="font-weight: bolder;">
                                            Bank Branch :
                                        </span>
                                       
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.branch_name }}
                                            </span>
                                    </b-col>
                                    <b-col md="3" >
                                        <span style="font-weight: bolder;">
                                            Account Type :
                                        </span>
                                       
                                    </b-col>
                                    <b-col md="3">
                                        <span>
                                                {{ item.item.account_type }}
                                            </span>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-row>

                    </b-card>

                </template>
                <template #cell(account_branch)="{item}">
                    {{ item.branch_name }}
                </template>
            </b-table>

    <!-- </b-card> -->
</div>

    <b-modal no-close-on-backdrop id="add-bank" ref="add-bank" size="lg" :title="titleBank" hide-footer>
        <template #modal-header>
                <h5 class="modal-title">{{ titleBank }}</h5>
                <!-- <button type="button" aria-label="Close" class="close">x</button> -->
                <feather-icon icon="XIcon" size="24" class="cursor-pointer" @click="() => {
                    remove_all_fields()
                    $refs['add-bank'].hide()
                }" />

            </template>
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

        <b-form class="mt-1" @submit.prevent="
            handleSubmit(
                titleBank == 'add bank details'? onSubmit: update
                )">

        <b-row>
            <b-col md="3">
                <validation-provider #default="validationContext" name="acc_name" vid="acc_name" rules="required">

                <b-form-group label="Account Name *" class="my-custom-select">

                    <b-form-input  id="acc_name" v-model="acc_name" placeholder="Account Name">
                        
                    </b-form-input>
                    <b-form-invalid-feedback  class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
          
            <b-col md="3">
                <validation-provider #default="validationContext" name="acc_number" vid="acc_number" rules="required">

                <b-form-group label="Account Number *" class="my-custom-select">

                    <b-form-input id="acc_number" type="number" v-model="acc_number" placeholder="Account Number">
                        
                    </b-form-input>
                    <b-form-invalid-feedback  class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <validation-provider #default="validationContext" name="ifsc_code" vid="ifsc_code" rules="required">

                <b-form-group label="IFSC Code *" class="my-custom-select">

                    <b-form-input id="ifsc_code" v-model="ifsc_code" placeholder="IFSC Code">
                        
                    </b-form-input>
                    <b-form-invalid-feedback  class="d-block">
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
                <validation-provider #default="validationContext" name="bank_name" vid="bank_name" rules="required">

                <b-form-group label="Bank Name *" class="my-custom-select">

                    <b-form-input id="bank_name" v-model="bank_name" placeholder="Bank Name">
                    </b-form-input>
                        <b-form-invalid-feedback  class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <validation-provider #default="validationContext" name="bank_branch" vid="bank_branch" rules="required">

                <b-form-group label="Bank Branch *" class="my-custom-select">

                    <b-form-input id="bank_branch" v-model="bank_branch" placeholder="Bank Branch">
                        
                    </b-form-input>
                    <b-form-invalid-feedback  class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <validation-provider #default="validationContext" name="acc_type" vid="acc_type" rules="required">

                <b-form-group label="Account Type *" class="my-custom-select">

                   <v-select  id="acc_type" v-model="acc_type" placeholder="Select an Option" :options="accountTypes" label="name" />
                   <b-form-invalid-feedback  class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback >    
                </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>
        <div class="text-right mt-1">
             <b-button size="sm" @click="() => {
                remove_all_fields()
                $refs['add-bank'].hide()

            }" class="mr-1" type="reset" variant="primary">
                Cancel
            </b-button>
             <b-button size="sm" type="submit" variant="primary" :disabled="$store.state.proposals.isLoadingBank" >
                {{titleBank == 'add bank details' ? 'Create' : 'Update'}}
             <b-spinner small class="ml-1" v-if="$store.state.proposals.isLoadingBank" />

            </b-button>

        </div>
    </b-form>
</validation-observer>

    </b-modal> 
   
    </div>
</template>
<script>
import { BFormInvalidFeedback, BContainer, BSpinner, BRow, BTable, BCard, BCol, BButton, BModal, BFormInput, BFormGroup, BForm, } from 'bootstrap-vue'
import { quillEditor } from 'vue-quill-editor'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@/@core/comp-functions/forms/form-validation'
import vSelect from 'vue-select'
import { isUserLoggedIn } from '@/auth/utils'

export default {
    name:'Bank_Details',
    components: {
        BRow, BCol, BButton, BSpinner, BTable, BCard, ValidationObserver, BFormInvalidFeedback,
        BModal, BFormInput, BFormGroup, quillEditor, BForm, ValidationProvider, BContainer,
        vSelect,
    },
    data(){
        return {
            BankTable: [{ key: 'account_name', label: 'account name' },{ key: 'account_number', label: 'account number' },{ key: 'ifsc_code', label: 'ifsc code' },{ key: 'account_branch', label: 'account branch' }],
            acc_name: '',
            acc_number: '',
            ifsc_code: '',
            titleBank: '',
            swift_code: '',
            bankID:0,
            micr: '',
            accountTypes:[{id:1,name:'Current Account'},{id:2,name:'Savings Account'},{id:3,name:'Recurring Deposit Account'},{id:4,name:'Fixed Deposit Account'}],
            bank_name: '',
            bank_branch: '',
            acc_type:null

        }
    },
    computed:{
        items(){
            return this.$store.state.proposals.allBank;
        }
    },
    methods:{
         canBeDelete(number) {
            let branches = this.$store.state.branches.all;
            let foundMatch = false;

            branches.forEach((item) => {
                let bankDetails = item.bank_details
                if(!bankDetails){
                }
                else if(number === bankDetails.account_number) {
                console.log("this is true for", bankDetails.account_number);
                foundMatch = true;
                }
            });

            return foundMatch ? 0 : 1;
},
        destroy(id){
            if(confirm('are you sure to delete?')){
                this.$store.dispatch('proposals/bank_delete',id).then(() => {
                    this.$store.dispatch('proposals/bank_fetch')
                    this.$toast.success("Deleted Successfully!", {
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
                })
            }
        },
        remove_all_fields(){
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
        openModal(name, data){
            if(name == 'add-bank'){
                this.titleBank = 'add bank details'
                this.$refs[name].show()
            }else{
                this.bankID = name.split('_')[1];
                this.titleBank = 'edit bank details'
                if(data != 0){
                    this.acc_name = data.account_name
                    this.accountTypes.forEach(element => {
                        if(element.name == data.account_type)
                        {

                            this.acc_type = element
                        }
                    });
            this.acc_number = data.account_number
            this.bank_branch = data.branch_name
            this.bank_name = data.bank_name

            this.ifsc_code = data.ifsc_code
            this.swift_code = data.swift_code
            this.micr = data.micr_code
                }
                this.$refs[name.split('_')[0]].show()
            }
        },

        onRowClicked(item) {
            const { detailsRow } = this
            if (detailsRow && detailsRow !== item) {
                detailsRow._showDetails = false;
            }

            this.$set(item, '_showDetails', !item._showDetails
            )
            this.detailsRow = item;
        },
        onSubmit(){
            const data = {
                account_name:this.acc_name,
                bank_name:this.bank_name,
                account_number: this.acc_number,
                ifsc_code:this.ifsc_code,
                swift_code:this.swift_code,
                micr_code:this.micr,
                branch_name:this.bank_branch,
                account_type: this.acc_type.name
            }
            this.$store.dispatch('proposals/bank_create', data).then(() => {
                this.$store.dispatch('proposals/bank_fetch')
                this.$refs['add-bank'].hide()
                this.$toast.success("Bank Added Successfully!", {
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
            })
        },
        update(){
            
            this.$store.dispatch('proposals/bank_update', {
                payload:{
                    account_name:this.acc_name,
                bank_name:this.bank_name,
                account_number: this.acc_number,
                ifsc_code:this.ifsc_code,
                swift_code:this.swift_code,
                micr_code:this.micr,
                branch_name:this.bank_branch,
                account_type: this.acc_type.name
                },
                id:this.bankID
            }).then(() => {
                this.$store.dispatch('proposals/bank_fetch')
                this.$refs['add-bank'].hide()
                this.$toast.success("Updated Successfully!", {
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
            })
        }
    },
    created(){
        let loggedIn = isUserLoggedIn();
        if(loggedIn){

            // this.$store.dispatch('proposals/bank_fetch')
            if(this.$store.state.branches.all.length === 0){
                this.$store.dispatch("branches/fetch")
            }
        }
        
    },
    setup(){
        const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetForm);
        return{
            refFormObserver,getValidationState,formValidation,
        }
    }
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

</style>
<style>
#add-bank .modal-dialog{
    max-width: 1100px;
}
.my-custom-select ::placeholder {
  font-size: 1rem;
  color: rgba(128, 128, 128, 0.8) !important;
/* color: rgb(85, 81, 81)!important; */

}

</style>