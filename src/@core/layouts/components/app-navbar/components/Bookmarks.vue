<template>
  <b-navbar-nav class="nav">
  
    <b-nav-item-dropdown link-classes="bookmark-star" class="dev" lazy @hidden="resetsearchQuery">
      <!-- <feather-icon
        slot="button-content"
        icon="StarIcon"
        size="21"
        class="text-warning"
      /> -->
      <b-button slot="button-content" variant="primary" size="sm">
        <feather-icon icon="PlusCircleIcon" />
        Create New
        <!-- <feather-icon icon="ChevronDownIcon" /> -->
      </b-button>

      <!-- Dropdown Content -->
      <!-- {{ paginate }} -->
      <li style="min-width:206px; ">
        <div class="p-1 my-custom-select" >
          <b-form-input id="boomark-search-input my-custom-select" v-model="searchQuery" placeholder="Search the Item" autofocus />
        </div>
        <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="search-list search-list-bookmark scroll-area"
          :class="{ 'show': paginate.length }" tagname="ul">
          <!-- <ul  :class="{'show':modalData.length}" class="dropdown-menu search-list search-list-bookmark scroll-area"> -->
          <span @click="() => {
              searchQuery = null
            }" v-for="(suggestion, index) in paginate" :key="String(index)">

            <b-dropdown-item  v-if="suggestion.title.includes('Branches')" @click="() => {
              searchQuery = null
              if($store.state.branches.businessTypes.length === 0){

                $store.dispatch('branches/business')
              }
              if($store.state.branches.states.length === 0){
                
                $store.dispatch('branches/states')
              }
              openModal('modal-branches')
            }" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle"> {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Clients')" @click="openModal('modal-clients')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle"> {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Contacts')" @click="openModal('modal-contact')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Employees')" @click="openModal('modal-user')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Expense')" @click="openModal('modal-expense')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            
            <b-dropdown-item  v-if="suggestion.title.includes('Leads')" @click="openModal('modal-leads')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }" >
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            
            <b-dropdown-item  v-if="suggestion.title.includes('Template')" @click="openModal('template-new-modal')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  
                <!-- {{ suggestion.title }} -->
                Add Proposal template
              </span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Email')" @click="openModal('reply-modal-global')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Designation')" @click="openModal('designation-modal')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Bank')" @click="openModal('add-new-bank')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <!-- <b-dropdown-item v-if="suggestion.title.includes('Add Payment')" v-b-modal.payment-new-modal
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
            
              }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item> -->
            <b-dropdown-item v-if="suggestion.title.includes('Payment')" @click="openModal('PaymentSectionModal2')"
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Category')" @click="openModal('modal-categories')"
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Invoice')" @click="openModal('InvoiceSectionModal2')" 
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Proposal')" @click="openModal('Modal-proposal')"
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <b-dropdown-item  v-if="suggestion.title.includes('Tasks')" @click="openModal('modal-tasks')"
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
              
                }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item>
            <!-- <b-dropdown-item v-if="suggestion.title.includes('Add Proposal')" v-b-modal.proposal-new-modal
              class="suggestion-group-suggestion cursor-pointer" link-class="d-flex align-items-center"
              @mouseenter="()=> {
                
                currentSelected = index
            
              }">
            

              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">  {{ suggestion.title }}</span>
             

            </b-dropdown-item> -->
           
          </span>

          <b-dropdown-item v-show="paginate.length === 0 && searchQuery" disabled>
            No Results Found.
          </b-dropdown-item>
          <!-- </ul> -->

        </vue-perfect-scrollbar>
      </li>
    </b-nav-item-dropdown>

  </b-navbar-nav>
</template>

<script>

import { bvModal ,
  BNavbarNav, BButton, BNavItem, BTooltip, BNavItemDropdown, BFormInput, BDropdownItem, VBModal,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import useAutoSuggest from '@core/components/app-auto-suggest/useAutoSuggest'
import { ref, watch } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import searchAndBookmarkData from '../search-and-bookmark-data'

export default {
  components: {
    BNavbarNav, BButton, BNavItem, BTooltip, BNavItemDropdown, BFormInput, VuePerfectScrollbar, BDropdownItem,
  },
  directives: {
    'b-modal': VBModal,
  },
  data(){
    return {
      limit_users: 4,
      offset_users: 0,
    }
  },
  methods:{
   openModal(ref){
    this.$bvModal.show(ref)
   }
  },
  computed:{
    paginate(){
      let data = []
      // let count = 0
      if(this.searchQuery){
        data = this.modalData.data.filter(e => e.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else{

        data = this.modalData.data
      }
      data.forEach((element,index) => {
        element.id = index+1
      });
       return data//.slice(this.offset_users,this.limit_users + this.offset_users);
      // return
    }
  },

  setup() {
    const modalData = {
      key:'title',
      data: 
        [
        {
          title: 'Add Branches',
          
          // route: 'branches',
          icon: 'HomeIcon',
        },
        {
          title: 'Add Clients',
          // route: 'clients',
          

          icon: 'UsersIcon',
        },
        {
        title:'Add Employees',
        

        // route:'users',
        icon: 'UserIcon',
    },
    {
        title:'Add Designation',
        

        // route:'users',
        icon: 'UserIcon',
    },
        {
          title: 'Add Contacts',
          

          // route: 'contact-people',
          icon: 'PhoneCallIcon',
        },
       
        {
          title: 'Add Leads',


          // route: 'contact-people',
          icon: 'CheckSquareIcon',
        },
        {
          title: 'Add Tasks',
          

          // route: 'contact-people',
          icon: 'CheckSquareIcon',
        },
        {
          title: 'Send Email',
          

          // route: 'contact-people',
          icon: 'MailIcon',
        }, 
        {
          title: 'Add Expense',
          

          // route: 'contact-people',
          icon: 'BookIcon',
        },
       
        {
          title: 'Add Template',
          

          // route: 'contact-people',
          icon: 'FileTextIcon',
        },
        
        {
          title: 'Add Bank Details',
          

          // route: 'contact-people',
          icon: 'UserIcon',
        },
        {
          title: 'Add Payment',
          

          // route: 'contact-people',
          icon: 'MailIcon',
        },
        {
          title: 'Add Invoice',
          // route: 'contact-people',
          icon: 'FileIcon',
        },
        {
          title: 'Add Category',
          // route: 'contact-people',
          icon: 'MenuIcon',
        },
        
        {
          title: 'Add Proposal',
          // route: 'contact-people',
          icon: 'MailIcon',
        },
        
    ],
    
  }

    // const searchAndBookmarkDataPages = ref(modalData)
    // const bookmarks = []//ref(modalData.data)
    const currentSelected = ref(-1)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }
    const searchQuery = ref('')
  const resetsearchQuery = () => {
    searchQuery.value = ''
  }
    // const {
    //   // searchQuery,
    //   resetsearchQuery,
    //   // filteredData,
    // } = useAutoSuggest({ data: {pages:modalData}, searchLimit: 6 })

    // watch(searchQuery, val => {
    //   store.commit('app/TOGGLE_OVERLAY', Boolean(val))
    // })

    // watch(modalData, val => {
    //   // currentSelected.value = val.pages && !val.pages.length ? -1 : 0
    //   currentSelected.value = val && !val ? -1 : 0

    // })

    // const suggestionSelected = () => {
    //   const suggestion = modalData.data[currentSelected.value]
    //   // router.push(suggestion.route).catch(() => { })
    //   resetsearchQuery()
    // }

    // const toggleBookmarked = item => {
    //   // Find Index of item/page in bookmarks' array
    //   const pageIndexInBookmarks = bookmarks.value.findIndex(i => i.route === item.route)
    //   const pageIndexInBookmarks2 = modalData.data.findIndex(i => i.title === item.title)


    //   // If index is > -1 => Item is bookmarked => Remove item from bookmarks array using index
    //   // Else => Item is not bookmarked => Add item to bookmarks' array
    //   if (pageIndexInBookmarks2 > -1) {
    //     // bookmarks.value[pageIndexInBookmarks].isBookmarked = false
    //     // bookmarks.value.splice(pageIndexInBookmarks, 1)
    //     modalData.data.splice(pageIndexInBookmarks2, 1)
    //   } else {
    //     // bookmarks.value.push(item)
    //     // bookmarks.value[bookmarks.value.length - 1].isBookmarked = true
    //   }
    // }

    return {
      // bookmarks,
      modalData,
      perfectScrollbarSettings,
      currentSelected,
      // suggestionSelected,
      // toggleBookmarked,

      // AutoSuggest
      searchQuery,
      resetsearchQuery,
      // filteredData,
    }
  },
}
</script>
<style scoped>


</style>
<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';


ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul > li {
color: rgb(85, 81, 81)!important;

}
.my-custom-select ::placeholder {
  font-size: 1rem;
color: rgb(85, 81, 81)!important;

}
p {
  margin: 0;
}


.nav-bookmar-content-overlay {
  position: fixed;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
  z-index: -1;

  &:not(.show) {
    pointer-events: none;
  }

  &.show {
    cursor: pointer;
    z-index: 10;
    opacity: 1;
  }
}
</style>
