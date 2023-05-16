<template>

  <div>
    <snackbar ref="snackbar" :multiple="true" position="bottom-right" />
    <!--  <b-button size="sm" @click="click($event,'info')">Trigger open  </b-button> -->


    <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />

    <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItem"
      @refetch-data="fetchAll" />

    <div class="mt-2 mb-2">
      <b-row>
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1" />
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">

            <!-- <b-form-input
             v-model="searchQuery"
             class="d-inline-block mr-1"
             placeholder="Search..."
           /> -->
            <!--<b-dropdown id="dropdown-1" text="Create a Task" variant="success" class=" m-md-2">
             <b-dropdown-item @click="convertToTask()">Task</b-dropdown-item>
             <b-dropdown-item>Assign User a Task</b-dropdown-item>
             <b-dropdown-item>Comment</b-dropdown-item>
           </b-dropdown> -->
            <!--  <b-button size="sm" variant="primary" @click="isCreateSidebarActive = true">
              <span class="text-nowrap">Create</span>
            </b-button> -->
             <b-button size="sm" variant="primary" v-b-modal.modal-branches>
              <span class="text-nowrap">Create</span>
            </b-button>
            <!-- <create-branch /> -->
          </div>
        </b-col>
      </b-row>
    </div>
    
    <b-card no-body>

      <b-table responsive :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" class="mb-0"
        @row-clicked="onRowClicked" selectable>
        <template #row-details="item">
          <b-card>

            <div class="d-flex justify-content-between" style="text-transform: uppercase;">
               Branch Details
               <div>
                <feather-icon @click="isEditSidebarActive = true;
              editItem = item.item" icon="EditIcon" size="20" />
              <feather-icon v-if="item.item.type == 'delete'" @click="destroyItem(item.item.id)" icon="TrashIcon" size="20" class="ml-1" />
              </div>
            </div>
            <hr style="border-color:#F75949">

            <b-row class="match-height" style="line-height: 3;">




              <b-container>
                <b-row class="">

                  <b-col md="3" class="">
                    <!-- <b-card-text > -->
                    <span style="font-weight: bolder;">Branch Name :</span>
                    
                    <!-- </b-card-text> -->


                  </b-col>
                  <b-col md="2">
                    {{ item.item.name == null ? '-' : item.item.name }}
                  </b-col>
                  <b-col md="3" class="">
                    <!-- <b-card-text > -->
                    <span style="font-weight: bolder;">Business Name :</span>
                  
                    <!-- </b-card-text> -->


                  </b-col>
                  <b-col md="2">
                    {{ item.item.bussiness_name == null ? '-' : item.item.bussiness_name }}

                  </b-col>

                </b-row>
                <b-row class="">

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">Business :</span>
 
  <!-- </b-card-text> -->


</b-col>
<b-col md="2">
  {{ item.item.bussiness_type == null ? '-' : item.item.bussiness_type }}

</b-col>

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">Phone :</span>
  
  <!-- </b-card-text> -->


</b-col>
<b-col md="2">
  {{ item.item.mobile == null ? '-' : item.item.mobile }}

</b-col>


</b-row>
<b-row class="">

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">GST Number :</span>

  <!-- </b-card-text> -->


</b-col>
<b-col md="2">
  {{ item.item.gst_number == null ? '-' : item.item.gst_number }}

</b-col>

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">PAN :</span>
  
  <!-- </b-card-text> -->


</b-col>
  <b-col md="2">
    {{ item.item.pan_number == null ? '-' : item.item.pan_number }}

  </b-col>

</b-row>
<b-row class="">

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">Address :</span>

  <!-- </b-card-text> -->


</b-col>
<b-col md="2">
  {{ item.item.address == null ? '-' : item.item.address }}

</b-col>

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">State :</span>
  
  <!-- </b-card-text> -->


</b-col>
<b-col md="2">
  {{ item.item.state_code == null ? '-' : item.item.state_code }}

</b-col>

</b-row>
<b-row class="">

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">Website :</span>
  
  <!-- </b-card-text> -->


</b-col>
<b-col md="2">
  {{ item.item.website == null ? '-' : item.item.website }}

</b-col>
<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">Bank :</span>

  <!-- </b-card-text> -->


</b-col>
<b-col md="2" @click="changePage('bank_details')">
  {{ item.item.bank_details == null ? '-' : item.item.bank_details.account_name }}

</b-col>

</b-row>
<b-row class="">

<b-col cols="3" class="">
  <!-- <b-card-text > -->
  <span style="font-weight: bolder;">Logo:</span>
  
  <!-- </b-card-text> -->


</b-col>

<b-col md="2">
  <a target="_blank" :href="item.item.logo">

    <img :src="item.item.logo" alt="" class="img-fluid">
  </a>

</b-col>
</b-row>
              
              </b-container>





              <!-- about -->



            </b-row>
          </b-card>


        </template>
       
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

         <!--   <span class="align-middle " @click="
              isEditSidebarActive = true;
            editItem = data.item;" variant="outline-secondary">
              <b-dropdown-item>
                <feather-icon icon="EditIcon" />
                Edit
              </b-dropdown-item>
            </span>-->
            <span class="align-middle " @click="destroyItem(data.item.id)" variant="outline-danger">
              <b-dropdown-item v-if="data.item.type == 'delete'">
                <feather-icon icon="TrashIcon" />
                Delete
              </b-dropdown-item>
            </span>


          </b-dropdown>


        </template> 
      </b-table>
      <div v-if="items.length > 0" class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <!-- <span class="text-muted">Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="totalCount" :per-page="perPage" first-number last-number
              class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>


    <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
    <div class="text-center">
      <b-spinner v-if="isLoading" />

    </div>
  </div>
</template>

<script>
import {BModal,
  BFormInvalidFeedback,
  
  BForm,VBModal, BFormInput,BFormGroup, BCard, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import CreateSidebar from "./CreateSidebar.vue";
import EditSidebar from "./EditSidebar.vue";
import Snackbar from 'vuejs-snackbar';
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from "@/@core/comp-functions/forms/form-validation";
import store from "@/store";
import CreateBranch from './CreateBranch.vue'
import EditBranch from "./EditBranch.vue";
export default {
  components: {
    BCard, BPagination, BContainer,
    BRow,BForm,BFormInput,BFormGroup,
    BSpinner, vSelect,BModal,
    CreateBranch,
    Snackbar,
    ValidationObserver,ValidationProvider,
    BCol,
  BFormInvalidFeedback,
    BTable,
    BButton,
    BDropdown,
    BDropdownItem,
    CreateSidebar,
    EditSidebar,
    EditBranch
  },
  data() {
    return {
      fields: [ { key: 'name', label: 'branch name'}, { key: 'bussiness_name', label: 'business name'}, { key: 'bussiness_type', label: 'business type'}, { key: 'mobile', label: 'phone'}, { key: 'address', label: 'address'}],
      detailsRow:null,
      stateOptions: []
      // name:'',
      // required,s
    };
  },
  directives:{
    'b-modal': VBModal,
  },
  computed: {
    snack() {
      // this.$refs.snackbar.info('dev')
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
    items() {
      let data = this.$store.state.branches.all
      data.forEach((x) => {
        this.$store.state.branches.businessTypes.forEach((y) => {
          if(x.bussiness_type===y.id) {
            x.bussiness_type=y.bussiness_type ? y.bussiness_type : '';
        }})
      this.$store.state.branches.states.forEach((y) => {
        // console.log(x.state_cod, y.fips_code, 'compare')
        if(x.state_code===y.fips_code) {
          x.state_code=y.name ? y.name : '';
        }
      })
      });
      console.log(data, 'pppppppppppppp')
      return data;
    },
    totalCount() {
      return this.$store.state.branches.all.length;
    },
  },
  methods: {
    changePage(route_name){
      this.$router.push({name:route_name})
    },
    deleteBranch(id) {
      this.$store.dispatch("branches/destroy", id).then(() => {
        this.$store.dispatch("branches/fetch");
      })
    },
    onRowClicked(item){
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails
        )
        this.detailsRow = item;
    },
    fetchAll() {
      this.$store.dispatch("branches/fetch");
    },
    destroyItem(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("branches/destroy", id).then(() => {
          this.fetchAll();
        });
      }
    },
    click(ev, type) {
    }
  },
  created() {
    if (this.$router.currentRoute.name != "auth-login") {
      this.fetchAll();
      if (this.$store.state.branches.states.length === 0) {
        
        this.$store.dispatch("branches/states")
      }
      if (this.$store.state.branches.businessTypes.length === 0) {
        
        this.$store.dispatch("branches/business")
      }
      console.log('done');
      this.$store.dispatch("proposals/bank_fetch")
    }
    // this.$refs.snackbar.info('msg');
  },
  setup() {
    // const blankFormData = {
    //   name: "",
    // };

    // const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    // const resetFormData = () => {
    //   formData.value = JSON.parse(JSON.stringify(blankFormData));
    // };

    // const errors = computed(() => {
    //   return JSON.parse(JSON.stringify(store.state.branches.errors));
    // });

    // const { refFormObserver, getValidationState, resetForm } =
    //   formValidation(resetFormData);
      // const onSubmit = () => {
        // console.log(formData);
      // store
      //   .dispatch("branches/store", formData.value)
      //   .then(() => {
      //     emit("refetch-data");
      //     // emit("update:is-create-sidebar-active", false);
      //   })
      //   .catch(() => {
      //     refFormObserver.value.setErrors(errors.value);
      //   });
    // };
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const editItem = ref({});

    const perPage = ref(10)
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    return {
      // Sidebar
      isCreateSidebarActive, perPage, currentPage, perPageOptions,
      isEditSidebarActive,
      editItem,
      // formData,
      // // onSubmit,

      // refFormObserver,
      // getValidationState,
      // resetForm,
    };
  },
};
</script>
<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

// @import 'bootstrap-vue/src/icons.scss';
//  @import '@/assets/scss/vendors/bootstrap-vue/_custom';
// @import '@/assets/scss/vendors/bootstrap-vue/index' ;
</style>
<style>

</style>
<!--  variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
             class="btn-icon rounded-circle"
 <b-dropdown-item >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
            //
            <b-button
            @click="
              isEditSidebarActive = true;
              editItem = data.item;
            "
            variant="outline-secondary"
            class="btn-icon rounded-circle"
          >
            <feather-icon icon="EditIcon" class="mx-auto" />
          </b-button>
          <b-button
            @click="destroyItem(data.item.id)"
            variant="outline-danger"
            class="btn-icon rounded-circle ml-2"
          >
            <feather-icon icon="TrashIcon" class="mx-auto" />
          </b-button>
            
            -->
