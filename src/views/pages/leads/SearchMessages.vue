<template>
    <b-sidebar
      id="search-messages-sidebar"
      :visible="isSearchMessagesActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      shadow
      backdrop
      no-header
      right
      
      @change="(val) => $emit('update:is-search-messages-active', val)"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">
            Search Messages
          </h5>
          
        </div>
        <div class="p-2  align-items-center justify-content-end">

            <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-prepend>
            <b-form-input v-model="search"
              
              placeholder="Search Comments"
              
            />
          </b-input-group>
            <div class="p-2 ml-4" v-if="filteredList.length == 0 && search == null" >

                <b>No Messages Found</b>
            </div>
            <div class="p-2 ml-4" v-if="filteredList.length > 0 && search != ''" v-for="item in filteredList">
              <b>{{item.user.name}}</b> commented
             <b>{{item.comment}}</b>
            </div>
        </div>
  
        <!-- BODY -->
    
      </template>
    </b-sidebar>
  </template>
  
  <script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { ref, computed, watch } from '@vue/composition-api'
  import { required } from '@validations'
  
  import formValidation from '@core/comp-functions/forms/form-validation'
  import {
    BSidebar,
    BButton,
    BModal,
    BFormDatepicker,
    BFormRating,
    BSpinner,BInputGroup,BInputGroupPrepend,
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    BFormGroup,
    // BCardText,
    // BFormSelect,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'
  // import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import store from '@/store'
  import vSelect from 'vue-select'
  // eslint-disable-next-line import/no-extraneous-dependencies
  import 'quill/dist/quill.core.css'
  import flatPickr from 'vue-flatpickr-component'
  
  // eslint-disable-next-line import/no-extraneous-dependencies
  import 'quill/dist/quill.snow.css'
  // eslint-disable-next-line
  import 'quill/dist/quill.bubble.css'
  
  import { quillEditor } from 'vue-quill-editor'
  
  export default {
    components: {
      BSidebar,BInputGroup,BInputGroupPrepend,
      BSpinner,
      BButton,
      vSelect,
      // eslint-disable-next-line vue/no-unused-components
      BModal,
      BFormDatepicker,
      quillEditor,
      BFormRating,
      BForm,
      BFormInput,
      BFormInvalidFeedback,
      // BCardText,
      BFormGroup,
      // BFormSelect,
      ValidationProvider,
      flatPickr,
      ValidationObserver,
    },
    directives: {
      Ripple,
    },
    model: {
      prop: 'isSearchMessagesActive',
      event: 'update:is-search-messages-active',
    },
    props: {
      isSearchMessagesActive: {
        type: Boolean,
        required: true,
      },
      editItem: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        search: '',
      }
    },
    computed: {
      filteredList() {
      return this.$store.state.comments.all.filter(post => {
        return post.comment.toLowerCase().includes(this.search.toLowerCase())
      })
    }
     
    },
    created(){
     
  
      },
    setup(props, { emit }) {
  
  
      return {
      
      }
    },
  }
  </script>
  
  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  
  // @import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
  vue-select{
    font-family: 'FontAwesome';
  }
  </style>
  