<template>
   
        <b-modal no-close-on-backdrop id="designation-modal" ref="designation-modal" size="lg" title="add designation"
            hide-footer>
            {{ all_masters }}
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">


                <b-form @submit.prevent="handleSubmit(createDesignation)" class="">
                    <b-row>
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="Designation Name" vid="desig_name"
                                rules="required">

                                <b-form-group label="Designation Name *" class="my-custom-select">
                                    <b-form-input v-model="design_name" id="desig_name" @input="checkDesignation" @change="checkBlank" placeholder="Designation Name">

                                    </b-form-input>
                                    <b-form-invalid-feedback  class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                    <b-form-invalid-feedback v-if="duplicacyContact==true" class="d-block">
                                        {{ "This designation is already taken" }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>
                        </b-col>
                    </b-row>
                    <b-row v-for="desig_type in toggleArr" :key="desig_type.type">
                        <b-col md="4">
                            <div class="mt-1">
                                <label class="switch">
                                    <input type="checkbox" v-model="desig_type.switchOption" @click="{
    if(desig_type.text == 'ToggleLeftIcon') {
    desig_type.switchOption = true
    desig_type.text = 'ToggleRightIcon'
} else {
    desig_type.switchOption = false
    desig_type.text = 'ToggleLeftIcon'
}
                                    }">
                                    <!-- <b-form-checkbox :checked="desig_type.switchOption" switch @click="{
    if(desig_type.text == 'ToggleLeftIcon') {
    desig_type.switchOption = true
    desig_type.text = 'ToggleRightIcon'
} else {
    desig_type.switchOption = false
    desig_type.text = 'ToggleLeftIcon'
}
                                    }"> -->

                                    <!-- </b-form-checkbox> -->
                                    <span class="slider round"></span>
                                </label>
                                <!-- <feather-icon class="cursor-pointer" style="color:grey" :icon="desig_type.text" @click="() => {
                                    if (desig_type.text == 'ToggleLeftIcon') {
                                        desig_type.switchOption = true
                                        desig_type.text = 'ToggleRightIcon'
                                    } else {
                                        desig_type.switchOption = false
                                        desig_type.text = 'ToggleLeftIcon'
                                    }
                                }" size="40" /> -->
                                <span class="ml-1 text-bolder">
                                    {{ desig_type.type }}
                                </span>
                                <!-- <font-awesome-icon icon="toggle-off" /> -->
                            </div>
                        </b-col>
                        <b-col md="8" :class="{ 'fade-in': desig_type.switchOption == false }">
                            <div>

                                <b-form-group label="Privileges">
                                    <v-select :disabled="desig_type.switchOption == false"
                                        v-model="desig_type.privileges" multiple :close-on-select="false"
                                        :options="desig_type.show_all_privileges" label="name">
                                        <template #list-header>
                                            <div class=" ml-2 mb-1 mt-1" @click="selectAllPrivileges(desig_type.type,desig_type.show_all_privileges)">
                  <a href="#">
                    <feather-icon  size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> {{ desig_type.privileges.length === desig_type.show_all_privileges.length ? 'Remove All' : 'Select All' }}  </a>
                </div>
                                        </template>
                                    </v-select>
                                </b-form-group>
                            </div>
                        </b-col>
                    </b-row>
                    <div class="text-right mt-1">
                         <b-button size="sm" variant="primary" @click="$refs['designation-modal'].hide()" class="mr-1">
                            Cancel
                        </b-button>
                         <b-button size="sm" :disabled="$store.state.designation.isSidebarLoading" type="submit" variant="primary">
                            Create
                            <b-spinner small class="ml-1" v-if="$store.state.designation.isSidebarLoading" />
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
        </b-modal>
   
</template>
<style>
.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}
</style>
<script>
import formValidation from '@/@core/comp-functions/forms/form-validation';
import { BFormCheckbox,
    BTab, VBModal, BModal, BFormGroup, BFormInput, BSpinner, BPagination, BDropdown, BDropdownItem,
    BTabs, BFormInvalidFeedback, BRow, BCol, BContainer,
    BTable, BCard, BForm, BButton
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from 'vue-demi';
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'

library.add(faToggleOff, faToggleOn);

import CreateSidebar from "../branches/CreateSidebar.vue";
import EditSidebar from "../branches/EditSidebar.vue";
import BankDetails from '../bank_details/List.vue'
import { ArrowLeftCircleIcon } from 'vue-feather-icons';
export default {
    components: {
        FontAwesomeIcon,BFormCheckbox,
        BTab, BTabs, BCard, BFormGroup, BFormInput, BForm, BButton, BModal, VBModal, BRow, BCol,
        BSpinner, BPagination, BDropdown, BDropdownItem, BankDetails,
        ValidationObserver, ValidationProvider, BContainer, vSelect
        , BFormInvalidFeedback, BTable, CreateSidebar, EditSidebar,
    },
    directives: {
        'b-modal': VBModal,
    },
    data() {
        return {
            edit_design_name: '',
            detailsRowDesig: null,
            desig_edit_id: 0,
            design_name: '',
            // privileges_options: [
            //     "View All Leads",
            //     "Leads Editing",
            //     "Lead on Row Editing",
            //     "Lead Conversion",
            // ],
            branchColumns: [{ key: 'name', label: 'branch name' }, { key: 'bussiness_name', label: 'business name' }, { key: 'bussiness_type', label: 'business type' }, { key: 'mobile', label: 'phone' }, { key: 'address', label: 'address' }]
            , detailsRow: null,
            toggleText: 'ToggleLeftIcon',
            stateOptions: [],
            designationCol: [{ key: 'name', label: 'designation name' }, { key: 'employees', label: 'employees' }]
            , switchOption: false,
            toggleArr: [],
            faketoggleArr: [],
            duplicacyContact:'',
            editToggleArr: [],
            extraToggleArr: [],
            //   branchesData: []
        }
    },
    computed: {
      
        all_masters() {
            this.toggleArr = []
            var arr = this.$store.state.status.all_master.reverse()
            arr.forEach(element => {
                this.toggleArr.push({

                    id: element.id, switchOption: false, text: 'ToggleLeftIcon', type: element.name, show_all_privileges: element.privileges, privileges: []

                })

            });
        },
        designations() {
            // return [{ name: 'Owner', employees: 'Team Centrik' }, { name: 'Admin', employees: 'Team Centrik, Naman Sharma' }]
            return this.$store.state.designation.all;
        },
        isLoading() {
            return this.$store.state.branches.isLoading;
        },
        successMessage() {
            return this.$store.state.branches.successMessage;
        },
        errorMessage() {
            return this.$store.state.branches.errorMessage;
        },
        errors() {
            return JSON.parse(JSON.stringify(this.$store.state.branches.errors));
        },
        allBusiness() {
            return this.$store.state.branches.businessTypes
        },
        allBranches() {
            return this.$store.state.branches.all
        },
        branchesData() {
            let data = this.$store.state.branches.all
            data.forEach((x) => {
                this.$store.state.branches.businessTypes.forEach((y) => {
                    if (Number(x.bussiness_type) === y.id) {
                        x.bussiness_type = y.bussiness_type ? y.bussiness_type : '';
                    }
                })
                this.$store.state.branches.states.forEach((y) => {
                    if (x.state_code === Number(y.fips_code)) {
                        x.state_code = y.name ? y.name : '';
                    }
                })
            });
            console.log(this.$store.state.branches.states)
            //   this.branchesData = data
            return data;
        },
        totalCount() {
            return this.$store.state.branches.all.length;
        },
    },
    methods:{
        checkBlank(e){
      if(e===''){
        this.duplicacyContact=false
      }
    },
        checkDesignation(e){
            var designations=this.$store.state.designation.all
            let isDuplicate=false
            designations.forEach((element)=>{
                if(element.designation_name.toLowerCase()===e){
                    isDuplicate = true;
                }
                
            })
            this.duplicacyContact = isDuplicate;
            console.log(e,isDuplicate)
        },
        selectAllPrivileges(type,all){
            // datas = all
            this.toggleArr.forEach(element => {
                if(element.type === type){
                    if(element.privileges.length === all.length){
                        element.privileges = []
                    }else{

                        element.privileges = all;
                    }
                }
            });
            return;
        },
    createDesignation() {
            var data = [];
            var privileges_id_arr = []
            var all_master_id = 0;
            var filter = []
            this.toggleArr.forEach(element => {
                filter = element.privileges.filter(e => e.all_master_id === element.id);
                all_master_id = element.id  
                filter.forEach(e => {
                    e.privileges_id = e.id
                    // if ( e.all_master_id === element.id) {

                    // privileges_id_arr.push({
                    //     privileges_id: e.id
                    // })

                    // }
                });
                // privileges_id_arr = 
                if(element.switchOption == true){

                    data.push({
                        all_master_id: all_master_id,
                        privileges: filter

                    })
                }
            });

            const desig_data = {
                designation_name: this.design_name,
                masterAccess: data
            };


            this.$store.dispatch('designation/store', desig_data).then(() => {
                this.$store.dispatch('designation/fetch').then(() => {
                    this.toggleArr.forEach(element => {
                        if(element.switchOption == true){
                            element.switchOption = false
                        }
                        element.privileges = []
                    });
                    this.$refs['designation-modal'].hide()
                    this.$toast.success("Designation Created Successfuly!", {
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
                this.design_name='';
            })

            console.log(data, this.design_name);
        },
        updateDesignation() {
            console.log(this.editToggleArr, 'ssssssssss')
            var data = [];
            var privileges_id_arr = []
            var all_master_id = 0;
            var filter = []
            var extrafilter = []

            var d = []
            var e = []
            // var pr = []
            // this.$store.state.status.all_master.forEach(element => {
            //     element.privileges.forEach(dp => {
            //         pr.push(dp)
            //     });
            // });
            var id = 0
            var status = ''

            console.log(id);
            this.editToggleArr.forEach(element => {
                // this.extraToggleArr.forEach(extra => {

                if (element.switchOption == true) {
                    element.status = 'active'
                    // extra.status = 'active'

                } else {
                    element.status = 'inactive'
                    // extra.status = 'inactive'

                }
                // d.push(element);

                // this.$store.state.status.all_maset.forEach(element => {

                // });
                // e.push(pr.find(e => e.all_master_id === element.id))
                filter = element.privileges.filter(e => e.all_master_id === element.id);
                //  var notfilter = element.privileges.filter(e => e.all_master_id === element.id);

                // if(){

                //     id = element.privileges.find(e => e.all_master_id === element.id);
                // }
                // extrafilter = this.extraToggleArr.find(e => e.id === element.id).privileges.filter(b => b.all_master_id === element.id)
                //  element..forEach(element => {
                //  });
                //  extrafilter = extra.privileges.filter(e => e.all_master_id === extra.id);
                // console.log(filter, extrafilter);
                //     filter.forEach(cbh => {
                // extrafilter.forEach(bhc => {
                //     if(bhc.id != cbh.id)
                //        id.push(cbh.id)
                //     });
                // });
                // console.log(id);
                //  if(element.id)
                all_master_id = element.id
                //  if(extrafilter.find(e => e.id !== id)){
                //     console.log(extrafilter.find(e => e.id !== id).id);
                //  }
                //  d= this.detailsRowDesig.privileges.filter(e => e.all_master_id === element.id)
                filter.forEach(e => {
                    id = e.id
                    // if(this.detailsRowDesig..p)
                    console.log(filter, extrafilter);


                    // extrafilter.forEach(extrae => {
                    // filter.forEach(f => {
                    //     id = f.id

                    // if (filter.length < extrafilter.length) {

                    // if (e.id === extrae.id) {
                    //     // console.log('missing', extrae);
                    //     extrae.status = 'active'
                    //     extrae.privileges_id = extrae.id
                    // }else{
                    //     extrae.status = 'inactive'
                    //     extrae.privileges_id = extrae.id
                    // }


                    // if ( e.all_master_id === element.id) {
                    // });
                    // }else{
                    e.privileges_id = e.id
                    e.status = 'active'
                    // }

                    // privileges_id_arr.push({
                    //     privileges_id: e.id
                    // }
                    //     if (filter.length >= extrafilter.length) {
                    //             e.privileges_id = e.id
                    //             e.status = 'active'
                    //             extrafilter = filter
                    // }
                    // })

                    // });
                    //     console.log('less');

                    //                     else{

                    // e.privileges_id = e.id
                    // e.status = 'active'
                    // }

                    // }
                });

                // privileges_id_arr = 
                // if (element.privileges.length > 0) {

                data.push({
                    all_master_id: all_master_id,
                    status: element.status,

                    // privileges: filter.length != extrafilter.length ? extrafilter : filter
                    privileges: filter


                })
                // if(all_master_id === 12){
                //     return false;
                // }
                // }
                // });
            });
            // console.log(id);

            // console.log(d,this.extraToggleArr);
            const desig_data = {
                designation_name: this.edit_design_name,
                masterAccess: data
            };


            this.$store.dispatch('designation/update', { payload: desig_data, id: this.desig_edit_id }).then(() => {
                this.$store.dispatch('designation/fetch').then(() => {
                    // this.$refs['designation-modal'].hide()
                })
            })

            console.log(data, this.design_name);
        },
    },

        setup(){
            const { refFormObserver, getValidationState } =
            formValidation();
            return {
                refFormObserver,
                getValidationState,
                formValidation
            }
        }
}
</script>