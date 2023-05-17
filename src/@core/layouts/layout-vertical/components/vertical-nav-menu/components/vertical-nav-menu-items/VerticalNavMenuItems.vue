<template>
  <ul>
    <!-- <span>{{ menus }}</span> -->
    <component
      
    
      :is="resolveNavItemComponent(item)"
      v-for="item in coreItems"
      :key="item.header || item.title"
      :item="item"
    >
  <!-- {{showValidMenu()}} -->
  </component>
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'
import store from "@/store";
// import e from 'express'

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    coreItems: {
      type: Array,
      required: true,
    },
  },
  data(){
    return {
      menus:[],
      allmasters:[],
      active_names:[],
      check_active:[]
    }
  },
  computed:{
//     allmaster(){
//       var user_role_id = this.$store.state.users.all.find(e => e.id === JSON.parse(localStorage.getItem('userData')).id) ? this.$store.state.users.all.find(e => e.id === JSON.parse(localStorage.getItem('userData')).id).user_role_id : null
//       // alert(user_role_id)
//       // console.log(allmasters);
//       if(user_role_id != null){

// this.$store.state.designation.all.forEach(ca => {
//     ca.masters.forEach(ac => {
//       if(ac.user_role_id === user_role_id){
//         if(ac.status == "inactive"){
//           var route_name = this.$store.state.status.all_master.find(e => e.id === ac.all_master_id).name
//           // allmasters.push(this.coreItems.find(e =>e.title == route_name))
        
//           this.allmasters.push({name:route_name,status:ac.status})
          
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
//     }
//     });
//   });
// }
//     }
  },
  created(){

  },
  beforeUpdate(){
    console.log('hee');
    // this.showValidMenu()
  },
  updated(){
    console.log('hee');
    // this.showValidMenu

    // this.showValidMenu()

  },
  methods:{
    showValidMenu(){
      // var allmasters = [];
      var me = this.items
  

  this.allmasters.forEach(element => {
    if(element.name == 'Leads'){
            me.splice(me.findIndex(e => e.title== 'Leads'),1)
          }else if(element.name == 'Mails'){
            me.splice(me.findIndex(e => e.title== 'Mails'),1)

          }else if(element.name == 'Tasks'){
            me.splice(me.findIndex(e => e.title== 'Tasks'),1)

          }else if(element.name == 'Clients'){
            me.splice(me.findIndex(e => e.title== 'Clients'),1)

          }else if(element.name == 'Settings'){
            me.splice(me.findIndex(e => e.title== 'Settings'),1)

          }else if(element.name == 'Users'){
            me.splice(me.findIndex(e => e.title== 'Employees'),1)

          }
  });
      // this.menus = this.coreItems

      return me;
      // this.check_active = allmasters;
    }
 

  },
  setup() {
    provide('openGroups', ref([]))

    
    return {
      // active_names,
      resolveNavItemComponent,
    }
  },
}
</script>
