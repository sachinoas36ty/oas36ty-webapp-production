<template>
  <div>
    <create-sidebar
      :is-create-sidebar-active.sync="isCreateSidebarActive"
      @refetch-data="fetchAll"
    />
   <edit-sidebar
      :is-edit-sidebar-active.sync="isEditSidebarActive"
      :edit-item.sync="editItem"
      @refetch-data="fetchAll"
    />

    <div class="mt-2 mb-2" >
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        />
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <!-- <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            /> -->
            <!-- <b-button
              variant="primary"
              @click="isCreateSidebarActive = true"
            >
              <span class="text-nowrap">Create</span>
            </b-button> -->
             <b-button size="sm" variant="primary"  v-b-modal.modal-contact>
              <span class="text-nowrap">Create</span>
            </b-button>
            <!-- <create-contact /> -->
          </div>
        </b-col>
      </b-row>
    </div>
    <b-card no-body>
   
      <b-table
        responsive
        :per-page="perPage"  :current-page="currentPage"
        :items="items"
        :fields="fields"
        
        class="mb-0 pb-6"
        
        @row-clicked="onRowClicked" selectable>
        <template #row-details="item">
          <b-card>

            <div class="d-flex justify-content-between" style="text-transform: uppercase;">
               Contact Details  
               <div>
                <feather-icon @click="isEditSidebarActive = true;
              editItem = item.item" style="margin-right:0.5rem;" icon="EditIcon" size="20" />
              <feather-icon v-if="item.item.data.type=='delete'" @click="destroyItem(item.item.data.id)" icon="TrashIcon" size="20" />
              </div>
            </div>
            <hr style="border-color:#F75949">

            <div class="body table-responsive">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Name</th>
                    <td> {{ item.item.data.name == null ? '-' : item.item.data.name }}</td>
                    <th scope="row">Email</th>
                  <td>
                    <span v-b-tooltip.hover="getAllEmail(item)" >{{item.item.email[0].email.substring(0,26)}}</span>
                    &emsp13;
                    <!-- <div style="margin-left: 0.5rem;" class="" v-for="email in item.item.email" :key="user">
                      
                      {{email.email }}
                    </div> -->
                    <span  v-if="(item.item.email.length > 1)">,..</span>
                  </td>
                    <th scope="row">Phone</th>
                    <td>   <span  class=" text-capitalize" v-for="phone in item.item.phone" :key="phone.phone">
                      
                      {{phone.phone }}
                      <span v-if="(item.item.phone.length > 1)">,</span>
                    </span> </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td></td>
                    <th></th>
                    <td></td>

                    <th></th>
                    <td></td>

                  </tr>
                </tbody>
              </table>
            </div>
         
          </b-card>


        </template>
        <template #cell(name)="data">
          <!-- <div  id="id" > -->
          {{ data.item.data.name }}
        <!-- </div> -->
        </template>
        <template
          #cell(emails)="data"
        >

        <!-- <span v-for="mail in data.item.email" :key="mail" v-b-tooltip.hover.top="mail.email">
        </span> -->
        <span> {{ data.item.email[0].email }}</span> 
       
        
          
          <b-badge v-if="data.item.email.length > 1" variant="secondary" class="badge-glow" :title="data.item.email[1].email">+{{ data.item.email.length - 1 }}</b-badge>
          <!-- <b-badge v-if="data.item.email.length > 1" variant="secondary" class="badge-glow" v-for="mail in data.item.email" :key="mail" :title="mail.email"></b-badge> -->

        </template>
        <template
          #cell(phones)="data"
        >
       
          <span> {{ data.item.phone.length > 0 ? data.item.phone[0].phone : '' }}</span>  <b-badge v-if="data.item.phone.length > 1" variant="secondary" class="badge-glow" :title="data.item.phone[1].phone">+{{ data.item.phone.length - 1 }}</b-badge>
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
            <span
                class="align-middle "
                variant="outline-secondary"
                @click="
                  isEditSidebarActive = true;
                  editItem = data.item;"
              >
            <b-dropdown-item>
              <feather-icon icon="EditIcon" />
             Edit
            </b-dropdown-item></span>
            <span
                class="align-middle "
                variant="outline-secondary"
                @click="
                 destroyItem(
                   data.item.data.id)"
              >
            <b-dropdown-item v-if="data.item.data.type=='delete'">
              <!-- {{data.item.data.type}} -->
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
      <!-- <div class="mb-0 table-responsive">

      <table role="table" class="table b-table" responsive>
        <thead >
        <tr >
          <th >
            <div>id</div>
          </th>
          <th >
            <div>name</div>
          </th>
          <th >
            <div>email</div>
          </th>
          <th >
            <div>phone</div>
          </th>
          <th >
            <div>action</div>
          </th>
        </tr>
        </thead>
          <tbody>
        <tr >
            <td v-for="item in items.data">{{item.id}}</td>
            <td v-for="item in items.data">{{item.name}}</td>
            <td >{{items.email[0].email}}<span  :title="items.email[1].email">({{items.email.length}})</span></td>
            <td>{{items.phone[0].phone}}<span  :title="items.phone[1].phone">({{items.phone.length}})</span></td>

            <td>                    <button id="__BVID__367__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button" class="btn dropdown-toggle btn-link dropdown-toggle-no-caret">

              <feather-icon
                                icon="MoreVerticalIcon"
                                size="16"
                                class="align-middle text-body"
                              /></button>
                  <div class="dropdown b-dropdown btn-group" id="__BVID__367">
                    <button id="__BVID__367__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button" class="btn dropdown-toggle btn-link dropdown-toggle-no-caret">
                            <feather-icon
                                icon="MoreVerticalIcon"
                                size="16"
                                class="align-middle text-body"
                              /></button>

                    <ul role="menu" tabindex="-1" class="dropdown-menu" aria-labelledby="__BVID__367__BV_toggle_">

                      <li role="presentation">
                        <a href="#" role="menuitem" target="_self" class="dropdown-item">
                          <span variant="outline-secondary" class="align-middle ml-70">Edit</span>
                        </a>
                      </li>
                    </ul>

                  </div>

            </td>
        </tr>
          </tbody>
      </table>
      </div> -->
    </b-card>
    <div class="text-center">
      <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
      <b-spinner   v-if="isLoading" />

    </div>
  </div>
</template>

<script type="text/javascript">
import {
  BCard, BRow, BCol, BTable, BButton, BDropdown,
  BDropdownItem, VBTooltip,BSpinner,BPagination,BContainer,
  //  BThead, BTr, BTh,
  BBadge,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import contactPeople from '@/store/modules/contactPeople'
import CreateSidebar from './CreateSidebar.vue'
import EditSidebar from './EditSidebar.vue'
import vSelect from 'vue-select'
import CreateContact from './CreateContact.vue';
import EditContact from './EditContact.vue'
export default {
  components: {
    BCard,vSelect,
    BRow,BPagination,CreateContact,
    BCol,
    VBTooltip,BContainer,
    // BThead,
    // BTr,
    // BTh,
    BBadge,
    // ToastificationContent,
    BSpinner,
    BTable,
    BButton,
    BDropdown,
    BDropdownItem,
    CreateSidebar,
   EditSidebar,
    EditContact
  },
  directives:{
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      fields: ['name', 'emails', 'phones'],
      d: [],
      detailsRow:null,
      id: '',
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.contactPeople.isLoading
    },
    successMessage() {
      return this.$store.state.contactPeople.successMessage
    },
    errorMessage() {
      return this.$store.state.contactPeople.errorMessage
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.contactPeople.errors))
    },
    items() {
      // console.log("hello :",this.$store.state.contactPeople.all)
      return contactPeople.state.all
    },

    
    totalCount(){
      return this.$store.state.contactPeople.all.length;

    },
  },
  created() {
    this.fetchAll()
    this.fetchEmails()
    console.log(document.getElementById('id'))
    // this.id = document.getElementById('id').value
    // console.log(this.fetchEmails())
  },
  methods: {
    getAllEmail(item){
      // alert(item.item.email[0].email)
      var arr= []
      item.item.email.forEach(element => {
        arr.push(element.email)
      });
      return arr.join(',')
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
      if(this.$router.currentRoute.params.status){
        this.$store.dispatch('contactPeople/get', this.$router.currentRoute.params.contact_id)

      }else{

        this.$store.dispatch('contactPeople/showAll')
      }
      // this.$store.dispatch('contactPersonEmails/fetch', 1)
    },
    fetchEmails() {
      console.log(this.$store.state.contactPeople.all)
      // for(let i=0;i<this.items.length;i++){

    //  let obj= this.$store.dispatch("contactPersonEmails/fetch",7);
      // d= obj;
      // }
    },
    // onRowClick() {
    //   console.log('gg')
    //   this.$toast({
    //     component: ToastificationContent,
    //     props: {
    //       title: 'Hello user! You have clicked on row',
    //       icon: 'UserIcon',
    //       variant: 'success',
    //     },
    //   })
    // },
    destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('contactPeople/destroy', id).then(() => {
          this.fetchAll()
        })
      }
    },
  },
 
  setup() {
    const isCreateSidebarActive = ref(false)
    const isEditSidebarActive = ref(false)
    const editItem = ref({})
    const perPage = ref(10)
  // const totalCount = ref(store.state.emails.all.length)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
    return {
      // Sidebar
      isCreateSidebarActive,perPage,currentPage,perPageOptions,
      isEditSidebarActive,
      editItem,
    }
  },
}
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

<style></style>
 <!--
      <b-table responsive :items="items" :fields="fields" class="mb-0">
        <template #cell(emails)="data">
          <b-button
            variant="outline-secondary"
            :to="{
              name: 'contact-people-emails',
              params: { cpID: data.item.id },
            }"
          >
            <feather-icon icon="MailIcon" class="mx-auto" /> Emails
          </b-button>
        </template>

        <template #cell(phones)="data">
          <b-button
            variant="outline-secondary"
            :to="{
              name: 'contact-people-phones',
              params: { cpID: data.item.id },
            }"
          >
            <feather-icon icon="PhoneIcon" class="mx-auto" /> Phones
          </b-button>
        </template>

</b-table>

-->
