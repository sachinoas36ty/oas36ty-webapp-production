<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content email-app-sidebar">
        <div class="email-app-menu">
          <div class="form-group-compose text-center compose-btn">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              block
              @click="$emit('update:shall-show-email-compose-modal', true); $emit('close-left-sidebar')"
            >
              Compose
            </b-button>
          </div>
          {{ setPrivileges }}
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area"
          >
            <!-- Filters -->
            <b-list-group class="list-group-messages">
              <b-list-group-item
                v-for="filter in emailFilters"
                :key="filter.title + $route.path"
                :to="filter.route"
                :active="isDynamicRouteActive(filter.route)"
                @click="$emit('close-left-sidebar'), $emit('close-email-view');"
              >
                <feather-icon
                  :icon="filter.icon"
                  size="18"
                  class="mr-75"
                />
                <span class="align-text-bottom line-height-1">{{ filter.title }}</span>
                <b-badge 
                  v-if="emailsMeta[filter.title.toLowerCase()]"
                  pill
                  :variant="resolveFilterBadgeColor(filter.title)"
                  class="float-right"
                >
                  {{ emailsMeta[filter.title.toLowerCase()] }}
                </b-badge>
              </b-list-group-item>
            </b-list-group>

            <!-- Labels -->
            <!-- <h6 class="section-label mt-3 mb-1 px-2">
              Labels
            </h6>

            <b-list-group class="list-group-labels">
              <b-list-group-item
                v-for="label in emailLabel"
                :key="label.title + $route.path"
                :to="label.route"
                :active="isDynamicRouteActive(label.route)"
                @click="$emit('close-left-sidebar')"
              >
                <span
                  class="bullet bullet-sm mr-1"
                  :class="`bullet-${label.color}`"
                />
                <span>{{ label.title }}</span>
              </b-list-group-item>
            </b-list-group> -->

          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  BButton, BListGroup, BListGroupItem, BBadge,
} from 'bootstrap-vue'
import { isDynamicRouteActive } from '@core/utils/utils'
import Ripple from 'vue-ripple-directive'
import { dataTool } from 'echarts/lib/echarts'

export default {
  directives: {
    Ripple,
  },
  components: {

    // BSV
    BButton,
    BListGroup,
    BListGroupItem,
    BBadge,

    // 3rd Party
    VuePerfectScrollbar,
  },
  props: {
    shallShowEmailComposeModal: {
      type: Boolean,
      required: true,
    },
    emailsMeta: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      previleges: {
        recieved: false,
        sent: false,
        deficient: false,
        catchAll: false,
      },
    }
  },
  computed: {
    setPrivileges() {
      let priveleges = [];
      let data = this.previleges;
      let roles = this.$store.state.users.all;
         let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id

      if (this.$store.state.users.all.length > 0) {
           let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id

        let designations = this.$store.state.designation.all;

        let d2 = designations.filter(x => {
          for (let i = 0; i < x.users.length; i++) {
            if (x.users[i].user_role_id === currUser[0].user_role_id) {
              return true;
            }
          }
          return false;
        })

        d2.forEach(x => {
          x.privileges.forEach(y => {
            priveleges.push(y)
          })
        })

        let arr = [];

        this.$store.state.status.all_master.forEach(x => {
          if(x.name==='Mails') {
          x.privileges.forEach(y => {
            priveleges.forEach(z => {
              if (y.id === z.privilege_id) {
                arr.push({
                  name: y.name,
                  status: z.status
                })
              }

            })
          })
        }
        })

        console.log(arr, 'ppppppppppp')

        arr.forEach(x => {
          if (x.name === 'Recieved') {
            if (x.status === 'active') {
              data.recieved = true
            }
          }
          else if (x.name === 'Sent') {
            if (x.status === 'active') {
              data.sent = true
            }
          }
          else if (x.name === 'Deficient') {
            if (x.status === 'active') {
              data.deficient = true
            }
          }
          else if (x.name === 'Catch All') {
            if (x.status === 'active') {
              data.catchAll = true
            }
          }
        })

      }

      // return data
    },
     emailFilters() {
     let data = this.$store.state.emails.email_folders;
      if(this.previleges){

    // if(this.previleges.recieved===false && this.previleges.sent===true) {
    //   data.splice(0,1)
    //   // window.location.href = 'apps/email/sent'
    //   this.$router.push({name:'apps-email-folder', params:{folder:'sent'}})
    // }
    // else if (this.previleges.recieved===true && this.previleges.sent===false) {
    //   data.splice(1,1)
    // }
    // else if (this.previleges.recieved===false && this.previleges.sent===false) {
    //   data.splice(0,2)
    //   // window.location.href = 'apps/email/draft'
    //   this.$router.push({name:'apps-email-folder', params:{folder:'draft'}})
    // }


    return data
  }

    } 
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const emailLabel = [
      { title: 'Personal', color: 'success', route: { name: 'apps-email-label', params: { label: 'personal' } } },
      { title: 'Company', color: 'primary', route: { name: 'apps-email-label', params: { label: 'company' } } },
      { title: 'Important', color: 'warning', route: { name: 'apps-email-label', params: { label: 'important' } } },
      { title: 'Private', color: 'danger', route: { name: 'apps-email-label', params: { label: 'private' } } },
    ]

    const resolveFilterBadgeColor = filter => {
      if (filter === 'Draft') return 'light-warning'
      if (filter === 'Spam') return 'light-danger'
      return 'light-primary'
    }

    return {
      // UI
      perfectScrollbarSettings,
      isDynamicRouteActive,
      resolveFilterBadgeColor,

      // Filter & Labels
      emailLabel,
    }
  },
}
</script>

<style>

</style>
