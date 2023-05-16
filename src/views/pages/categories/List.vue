<template>
  <div>
    <!-- <create-sidebar
      :is-create-sidebar-active.sync="isCreateSidebarActive"
      @refetch-data="fetchAll"
    /> -->
   <edit-sidebar
      :is-edit-sidebar-active.sync="isEditSidebarActive"
      :edit-item.sync="editItem"
      @refetch-data="fetchAll"
    />

    <div class="mt-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
        </b-col>
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <!-- <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            /> -->
            <!--  <b-button size="sm" variant="primary" @click="isCreateSidebarActive = true">
              <span class="text-nowrap">Create</span>
            </b-button> -->
             <b-button size="sm" variant="primary"  v-b-modal.modal-categories>
              <span class="text-nowrap">Create</span>
            </b-button>
            <!-- <create-category /> -->
          </div>
        </b-col>
      </b-row>
    </div>
    <b-card no-body>
  
<b-table responsive  :per-page="perPage"
      :current-page="currentPage" :items="items" :fields="fields" class="mb-0"
      @row-clicked="onRowClicked" selectable>
      <template #row-details="item">
          <b-card>

            <div class="d-flex justify-content-between" style="text-transform: uppercase;">
               Category Details
               <div>
                <feather-icon @click="isEditSidebarActive = true;
              editItem = item.item" icon="EditIcon" size="20" />
              </div>
            </div>
            <hr style="border-color:#F75949">

            <b-row class="match-height">




           
                    


               

              <b-container class="ml-0">
              <b-row style="line-height: 3;">

                <b-col md="3">

                    <!-- <b-card-text > -->
                    <span style="font-weight: bolder;">Category  :</span>
                   
                    <!-- </b-card-text> -->


                 </b-col>
                 <b-col md="2">
                  {{ item.item.name == null ? '-' : item.item.name }}

                 </b-col>
                 <b-col md="3">

                   
                   <!-- <b-card-text > -->
                     <span style="font-weight: bolder;">Employees  :</span>
                  
                    <!-- </b-card-text> -->
                    
                  </b-col>
                  <b-col md="2">
                    <span style="margin-left: 0.5rem;" class=" text-capitalize" v-for="user in item.item.users" :key="user.id">
                      
                      {{user.name }}
                      <span v-if="(item.item.users.length > 1)">,</span>
                    </span>
                  </b-col>
                  <b-col md="3">

                    <!-- <b-card-text > -->
                      <span style="font-weight: bolder;">Due Date  :</span>
                      
                      <!-- </b-card-text> -->
                      
                    </b-col>
                    <b-col md="2">
                      {{ DaysLeft(item.item.created_at, item.item.due_date) }}

                    </b-col>
                    </b-row>
                    </b-container>
              






              <!-- about -->



            </b-row>
          </b-card>


        </template>
        <template #cell(actions)="data">
            <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
           
            <span class="align-middle "
              @click="
              isEditSidebarActive = true;
              editItem = data.item;"
            variant="outline-secondary"
              >
            <b-dropdown-item>
              <feather-icon icon="EditIcon" />
              Edit
            </b-dropdown-item></span>
            <span class="align-middle"
               @click="destroyItem(data.item.id)"
            variant="outline-danger"
            >
            <b-dropdown-item v-if="data.item.type=='delete'">
              <feather-icon icon="TrashIcon" />
              Delete
            </b-dropdown-item></span>
           
    
          </b-dropdown>
        

        </template>
      </b-table>
      <div v-if="items.length > 0" class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted">Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalCount"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
    <div class="text-center">
      <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
      <b-spinner   v-if="isLoading" />

    </div>
  </div>
</template>

<script>
import {  BCard, BRow,BContainer, BCol,BPagination, BTable, BButton,BDropdown,BDropdownItem,BSpinner } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import CreateSidebar from "./CreateSidebar.vue";
import EditSidebar from "./EditSidebar.vue";
import vSelect from 'vue-select'
import CreateCategory from "./CreateCategory.vue";
// import EditCategory from "./EditCategory.vue";
export default {
  components: {
    BCard,vSelect,
    BSpinner,BPagination,
    BRow,
    BCol,
    CreateCategory,
    BTable,
    BButton,
    BDropdown,
    BDropdownItem,BContainer,
    CreateSidebar,
   EditSidebar,
    // EditCategory
  },
  data() {
    return {
      fields: ["name"],
      fields: [ { key: 'name', label: 'name'}, { key: 'default_assignee', label: 'default assignee'}, { key: 'due_date', label: 'due date'}],
      detailsRow:null
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    successMessage() {
      return this.$store.state.categories.successMessage;
    },
    totalCount(){
      return this.$store.state.categories.all.length;

    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.categories.errors));
    },
    items() {
      let data = this.$store.state.categories.all;
      data.forEach((x) => {
        let assignee = x.users.filter((y, index) => {
          return index===x.users.length-1;
        })
        x.default_assignee=assignee[0].name
      })
      return data;
    },
  },
  methods: {
    onRowClicked(item){
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails
        )
        this.detailsRow = item;
    },
    DaysLeft(start, end) {
      // const startDate = start
     var d = new Date() 
     var getDate = d.getDate() + 2
     var getyr = d.getFullYear()
     var getmnth = d.getMonth()
      const endDate = d.setDate(getDate)
      return getDate + '-' + getmnth + '-' + getyr 
      const diffInMs = new Date(endDate) - new Date()
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24)
      diffInDays = Math.round(diffInDays) ;
      
      // eslint-disable-next-line no-bitwise
      return diffInDays  | '0 day'
    },
    fetchAll() {
      this.$store.dispatch("categories/fetch");
    },
    destroyItem(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("categories/destroy", id).then(() => {
          this.fetchAll();
        });
      }
    },
  },
  created() {
    this.fetchAll();
  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const editItem = ref({});
    const perPage = ref(10)
  // const totalCount = ref(store.state.emails.all.length)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
    return {
      // Sidebar
      isCreateSidebarActive,perPage,currentPage,perPageOptions,
      isEditSidebarActive,
      editItem,
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
.vs__open-indicator {
  fill: darkgray;
}
</style>
<!--

     <b-table responsive :items="items" :fields="fields" class="mb-0">
        <template #cell(actions)="data">
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
        </template>
      </b-table>-->
