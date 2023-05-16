<template>
  <div>
    <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItem"
      @refetch-data="fetchAll" />
    <b-tabs vertical content-class="col-12 col-md-9 mt-1 mt-md-0" pills nav-wrapper-class="col-md-3 col-12"
      nav-class="nav-left" @change="(val) => $emit('update:is-task-general-active', val)">

      <!-- general tab -->

      <!-- <inner-page /> -->
      <b-tab active>

<!-- title -->
<template #title>
  <feather-icon icon="ActivityIcon" size="18" class="mr-50" />
  <span class="font-weight-bold">Overview</span>
</template>

<div class="d-flex justify-content-center" style="margin-top:100px;"  v-if="isLoading">

  <b-spinner key="secondary"  variant="secondary"  v-if="isLoading" />
</div>
<b-card no-body>

  <b-row class="match-height" v-for="item in items" :key="item.id" v-if="item.id === editValues.id">
    

    

    <b-container>
      <b-row>

        <b-col cols="12">
          <b-card class="card-app-design">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2"></b-col>
              <b-col cols="2"></b-col>
              <b-col cols="2"></b-col>
              <b-col cols="2"></b-col>
              <b-col cols="2" class="d-flex justify-content-end"> <small class="d-flex align-items-end">
                  <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" variant="link" no-caret
                    :right="$store.state.appConfig.isRTL">

                    <template #button-content>
                      <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <span class="align-middle ml-70"
                        variant="outline-secondary"
                        @click="isEditSidebarActive = true;editItem = item">
                    <b-dropdown-item>
                      <feather-icon icon="EditIcon" /> Edit
                    </b-dropdown-item></span>
                    <!-- <b-dropdown-item>
                      <feather-icon icon="ArrowLeftIcon" /> <span class="align-middle ml-70"
                        variant="outline-secondary"
                        @click="()=> $emit('update:is-task-general-active', false)">Back To Task</span>
                    </b-dropdown-item> -->




                  </b-dropdown>
                </small></b-col>
            </b-row>
            <!--change-->
            <div class="clear">
              <b-badge variant="light-primary">
                {{ formatDate(item.created_at) }}
              </b-badge>
            </div>
            <b-card-title class="mt-1 mb-75">
              {{item.subject}}
            </b-card-title>
            <b-card-text class="font-small-2 mb-2 text-justify">


              {{item.description.replace(/<\/?[^>]+(>|$)/g, "")}}
            </b-card-text>
          </b-card>
        </b-col>

      </b-row>
    </b-container>


    <b-col col="12" class="text-justify ">
      <b-card no-body>
        <b-row class="text-center">
          <b-col cols="3">

            <div class="clear">


              <h5 class="text-capitalize mb-75">
                company
              </h5>

              <b-card-text>
                {{item.company.name}}
              </b-card-text>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="clear">
              <h5 class="text-capitalize mb-75">
                Contact Person
              </h5>
              <b-card-text>
                {{item.contact_person.name}}
              </b-card-text>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="clear">
              <h5 class="text-capitalize mb-75">
                Branch
              </h5>
              <b-card-text>
                {{item.branch.name.charAt(0).toUpperCase()+item.branch.name.slice(1)}}
              </b-card-text>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="clear">
              <h5 class="text-capitalize mb-75">
                Category
              </h5>
              <b-card-text>
                {{item.category.name.charAt(0).toUpperCase()+editValues.category.name.slice(1)}}
              </b-card-text>
            </div>
          </b-col>
        </b-row>
        <!-- <div>

<h5 class="text-capitalize mb-75">
company Name
</h5>

<b-card-text>
{{editValues.company.name}}
</b-card-text>
</div>-->


      </b-card>


    </b-col>


    <!-- about -->


    <b-col cols="12" class="text-justify">
      <b-card no-body>
        <b-row class="text-center">
          <b-col cols="3">
            <div>
              <h5 class="text-capitalize mb-75">
                Priority
              </h5>
              <b-card-text>
                <feather-icon v-for="priority in priorities" :icon="priority.icon" size="16"
                  class="align-middle mr-50" />
              </b-card-text>
            </div>
          </b-col>
          <b-col cols="3">
            <div>
              <h5 class="text-capitalize mb-75">
                Due Date
              </h5>
              <b-card-text>
                {{item.due_date.split("-").reverse().join("-")}}
              </b-card-text>
            </div>
          </b-col>
          <b-col cols="3">
            <div>
              <h5 class="text-capitalize mb-75">
                Days Left
              </h5>
              <b-card-text>
                {{ DaysLeft(item.created_at, item.due_date) + ' days' }}
              </b-card-text>
            </div>
          </b-col>
          <b-col cols="3">
            <div>
              <h5 class="text-capitalize mb-75">
                Status
              </h5>
              <b-card-text>
                {{item.status.charAt(0).toUpperCase()+item.status.slice(1)}}
              </b-card-text>
            </div>
          </b-col>
        </b-row>









      </b-card>
    </b-col>
    
  </b-row>







</b-card>
</b-tab>
<!--/
<edit-task  :edit-item.sync="editItem"
@refetch-data="fetchAll"/> 
general tab
v-if="options"
:general-data="options"
-->

<!-- change password tab -->
<b-tab>

<!-- title -->
<template #title>
  <feather-icon icon="MessageCircleIcon" size="18" class="mr-50" />
  <span class="font-weight-bold">Comments </span>
</template>

<card-advance-chat />
</b-tab>
<b-tab>

<!-- title -->
<template #title>

  <feather-icon icon="CheckSquareIcon" size="18" class="mr-50" />
  <span class="font-weight-bold">Todos</span>

</template>
<!-- <coming-soon /> -->
<todo />
</b-tab>
<b-tab>

<!-- title -->
<template #title>

  <feather-icon icon="CodeIcon" size="18" class="mr-50" />
  <span class="font-weight-bold">Activities</span>

</template>

<Activity />
</b-tab>

<b-tab>

<!-- title -->
<template #title>

  <feather-icon icon="PaperclipIcon" size="18" class="mr-50" />
  <span class="font-weight-bold"> Attachments</span>

</template>
<coming-soon />

</b-tab>


    </b-tabs>
  </div>
</template>

<script>
import { BTabs, BTab, BRow, BCol, BSpinner, BCard, BCardTitle, BCardText, BBadge, BCardHeader, BDropdown, BDropdownItem, BOverlay, BContainer } from 'bootstrap-vue'
//import TaskComments from './TaskComments.vue'
import { ref } from '@vue/composition-api'
// import InnerPage from '../leads/InnerPage.vue'
//import EditTask from './EditTask.vue'
import EditSidebar from './EditSidebar.vue'
import CardAdvanceChat from './CardAdvanceChat.vue'
import Todo from '../todos/Todo.vue';
import ComingSoon from './ComingSoon.vue';
//import ChatLog from '/ChatLog.vue'
//import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
//import Ripple from 'vue-ripple-directive'
//import { required } from 'vee-validate/dist/rules'
//import CreateSidebar from './CreateSidebar.vue'
//import vSelect from 'vue-select'
import axios from 'axios'
import store from '@/store'
import Activity from '../leads/Activity.vue'
export default {
  components: {
    BTabs,
    BCardHeader,
    BSpinner,
    BOverlay,
    BContainer,
    BTab,
    BBadge,
    BDropdown,
    BDropdownItem,
    // InnerPage,
    BRow,
    BCol,
    BCard,
    BCardTitle,
    BCardText,
    Todo,
    //TaskComments,
    CardAdvanceChat,
    //CreateSidebar,
    EditSidebar,
    ComingSoon
    // ChatLog 
    ,
    Activity
},
  model: {
    prop: 'isTaskGeneralActive',
    event: 'update:is-task-general-active',
  },
  props: {
    editItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // fields: ["subject", "description","actions"],


    }
  },
  computed: {
    isLoading(){
      return this.$store.state.leads.isLoadingLeads;
    },
    items() {
      return this.$store.state.leads.all.filter(e => e.type === 'lead');
    }
  },
  created() {
    this.fetchAll()
  },
  methods: {
    formatDate(date) {
      const dates = new Date(date)

      const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${dates.getDate()} ${ms[dates.getMonth()]} ${dates.getFullYear()}`
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end
      const diffInMs = new Date(endDate) - new Date()
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
      // eslint-disable-next-line no-bitwise
      return diffInDays | 0
    },
    destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('leads/destroy', id).then(() => {
          this.fetchAll()
        })
      }
    }, fetchAll() {
      this.$store.dispatch('leads/fetch')
    }
  },
  setup(props) {
    console.log("props:", props)
    const editValues = props.editItem
    const priorities = []
    const editItem = ref({})
    const isEditSidebarActive = ref(false)
    for (let i = 0; i < editValues.priority; i++) {
      let priorityJSon = { icon: "StarIcon" }
      priorities.push(priorityJSon)
    }
    return {
      editValues,
      editItem,
      isEditSidebarActive,
      priorities
    }
  }


}
</script>
<style lang="scss" scoped>
.card-body {
  padding: 0px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

}

.clear {
  margin-top: -30px;
}
</style>