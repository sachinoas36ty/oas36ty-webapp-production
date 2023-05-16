<template>
  <div class="main-menu menu-fixed menu-accordion menu-shadow" :class="[
    {
      expanded:
        !isVerticalMenuCollapsed ||
        (isVerticalMenuCollapsed && isMouseHovered),
    },
    {'opacity-half': $store.state.leads.isSidebarOpen},
    skin === 'semi-dark' ? 'menu-dark' : 'menu-light',
  ]" @mouseenter="updateMouseHovered(true)" @mouseleave="updateMouseHovered(false)">
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot name="header" :toggleVerticalMenuActive="toggleVerticalMenuActive" :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon">
        <ul class="nav navbar-nav flex-row">
          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link class="navbar-brand" to="/">
              <span class="brand-logo">
                <b-img :src="appLogoIcon" alt="logo" />
              </span>
              <h2 class="brand-text">
                {{ appName }}
              </h2>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon icon="XIcon" size="20" class="d-block d-xl-none" @click="toggleVerticalMenuActive" />
              <feather-icon :icon="collapseTogglerIconFeather" size="20" class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed" />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <!-- {{jke}} -->
    <!-- {{ navItems }} -->

    <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />
    <!-- main menu content-->
    <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="main-menu-content scroll-area" tagname="ul"
      @ps-scroll-y="
        (evt) => {
          shallShadowBottom = evt.srcElement.scrollTop > 0;
        }
      ">
      <!-- {{ setPrivileges.length }} -->
      <vertical-nav-menu-items :items="navItems" :coreItems="navItems" class="navigation navigation-main mt-1" />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import navMenuItems from "@/navigation/vertical";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { BLink, BImg } from "bootstrap-vue";
import { provide, computed, ref } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import { $themeConfig } from "@themeConfig";
import VerticalNavMenuItems from "./components/vertical-nav-menu-items/VerticalNavMenuItems.vue";
import useVerticalNavMenu from "./useVerticalNavMenu";
import store from "@/store";
import { watch } from "fs";
import pages from "@/router/routes/pages";

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      ssd:[],
      // allmasters:[],
      // newItems:[]
    }
  },
  computed: {
    navItems() {
      let arr = [];
      let items = []
      // this.ssd = []

      this.navMenuItems.forEach(x => {
        items.push(x)
      })
      // if(this.$store.state.users.all.length>0) {

      let users = this.$store.state.users.all;
        
     let currUser = JSON.parse(localStorage.getItem('userData'))//.user_role_id

      let designations = this.$store.state.designation.all;

      let data = designations.filter(x => {
        for (let i = 0; i < x.users.length; i++) {
    if (x.users[i].user_role_id === currUser.user_role_id) {
      return true;
    }
  }
  return false;
      })


      let masters = localStorage.getItem('privileges') ? JSON.parse(localStorage.getItem('privileges')).masters: [] ;

      data.forEach(x => {
        x.masters.forEach(y => {
          if(masters.length === 0){

            masters.push(y)
          }
        })
      })
      let all_masters = [
        {id:1 , name:'Leads'},
        {id:2 , name:'Tasks'},
        {id:3 , name:'Mails'},
        {id:4 , name:'Scheduled Tasks'},
        {id:5 , name:'Calendar'},
        {id:6 , name:'Clients'},
        {id:7 , name:'Employees'},
        {id:8 , name:'Accounts'},
        {id:9 , name:'Timesheet'},
        {id:10 , name:'Reports'},
        {id:11 , name:'Blogs'},
        {id:12, name:'Bulk Emailing'},
        {id:13, name:'Settings'},

      ]

        masters.forEach(x => {
        // this.$store.state.status.all_master
        all_masters.forEach(y => {
          if (x.all_master_id === y.id) {
            if (x.status === 'inactive') {
              arr.push(y)
            }
          }
        })
      })

      arr.forEach(x => {
        items.forEach((y, index) => {
          if (y.title === x.name) {
            items.splice(index, 1)
          }
        })
       
        // pages
      })

      // this.ssd = items;
      // }
      return items
    },
    setPrivileges() {
      // var allmasters = []
      // alert('hey')
      // if (this.$store.state.users.all.find(e => e.id === JSON.parse(localStorage.getItem('userData')).id).user_role_id != null) {
      //   this.$store.state.designation.all.forEach(ca => {
      //     ca.masters.forEach(ac => {
      //       if (ac.user_role_id === this.user_role_id) {
      //         if (ac.status == "inactive") {
      //           var route_name = this.$store.state.status.all_master.find(e => e.id === ac.all_master_id).name
      //           // allmasters.push(this.coreItems.find(e =>e.title == route_name))
      //           this.navMenuItems.splice(this.navMenuItems.findIndex(e => e.title == route_name))

      //           this.allmasters.push({ name: route_name, status: ac.status })

      //           // allmasters.push({role_id:ac.user_role_id,master_id:ac.all_master_id,status:ac.status})
      //         }

      //         // if(ac.status == "inactive"){
      //         //   var route_name = this.$store.state.status.all_master.find(e => e.id === ac.all_master_id).name
      //         //   var index = this.coreItems.findIndex(e => e.title == route_name)
      //         //   // if(index != -1){
      //         //     if(!this.coreItems.find(e => e.title == 'Dashboard') && !this.coreItems.find(e => e.header == 'OFFICE') && !this.coreItems.find(e => e.title == 'Mails')){

      //         //       this.coreItems.splice(this.coreItems[index],1)
      //         //     // }
      //         //   }
      //         // }
      //       }
      //     });
      //   });
      // }
      return this.navMenuItems || []
    },

  },
  beforeUpdate() {
    this.setNav()
  },
  updated() {
    this.setNav()

  },
  methods: {
    setNav() {

      // return this.navMenuItems
    }
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props);

    const { skin } = useAppConfig();

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false);

    provide("isMouseHovered", isMouseHovered);

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    };

    const collapseTogglerIconFeather = computed(() =>
      collapseTogglerIcon.value === "unpinned" ? "CircleIcon" : "DiscIcon"
    );
    var allmasters = [];
    var user_role_id = ref()
    user_role_id = store.state.users.all.find(e => e.id === JSON.parse(localStorage.getItem('userData')).id) ? store.state.users.all.find(e => e.id === JSON.parse(localStorage.getItem('userData')).id).user_role_id : null
    // alert(user_role_id)
    // console.log(allmasters);



    // App Name
    const { appName, appLogoIcon } = $themeConfig.app;

    return {
      navMenuItems,
      user_role_id,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      allmasters,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoIcon,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";
</style>
