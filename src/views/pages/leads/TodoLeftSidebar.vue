<template>
    <div class="sidebar-left">
      <div class="sidebar">
        <div class="sidebar-content todo-sidebar">
          <div class="todo-app-menu">
            <div class="add-task">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                block
                @click="$emit('update:is-edit-sidebar-active', true); $emit('close-left-sidebar')"
              >
                Edit Lead
              </b-button>
            </div>
            <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-menu-list scroll-area"
            >
              <!-- Filters -->
              <b-list-group class="list-group-filters">
                <b-list-group-item
                  v-for="filter in taskFilters"
                  :key="filter.title + $route.path"
                  :to="filter.route"
                  :active="isDynamicRouteActive(filter.route)"
                  @click="$emit('close-left-sidebar')"
                >
                  <feather-icon
                    :icon="filter.icon"
                    size="18"
                    class="mr-75"
                  />
                  <span class="align-text-bottom line-height-1">{{ filter.title }}</span>
                </b-list-group-item>
              </b-list-group>
  
              <!-- Tags -->
              <!-- <div class="mt-3 px-2 d-flex justify-content-between">
                <h6 class="section-label mb-1">
                  Tags
                </h6>
                <feather-icon icon="PlusIcon" />
              </div> -->
  
              <!-- <b-list-group class="list-group-labels">
                <b-list-group-item
                  v-for="tag in taskTags"
                  :key="tag.title + $route.path"
                  :to="tag.route"
                  :active="isDynamicRouteActive(tag.route)"
                  @click="$emit('close-left-sidebar')"
                >
                  <span
                    class="bullet bullet-sm mr-1"
                    :class="`bullet-${tag.color}`"
                  />
                  <span>{{ tag.title }}</span>
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
  import { BButton, BListGroup, BListGroupItem } from 'bootstrap-vue'
  import { isDynamicRouteActive } from '@core/utils/utils'
  import Ripple from 'vue-ripple-directive'
  
  export default {
    directives: {
      Ripple,
    },
    components: {
      BButton,
      BListGroup,
      BListGroupItem,
      VuePerfectScrollbar,
    },
    props: {
      taskTags: {
        type: Array,
        required: true,
      },
    },
    
    setup() {
      const perfectScrollbarSettings = {
        maxScrollbarLength: 60,
      }
  
      const taskFilters = [
        { title: 'Overview', icon: 'ActivityIcon', route: { name: 'leads-inner'} },
        { title: 'Comments', icon: 'MessageCircleIcon', route: { name: 'leads-inner-folder', params: { folder: 'comments' } } },
        { title: 'Todo', icon: 'CheckSquareIcon', route: { name: 'leads-inner-folder', params: { folder: 'todo' } } },
        { title: 'Attachments', icon: 'PaperclipIcon', route: { name: 'leads-inner-folder', params: { folder: 'attachments' } } },
        { title: 'Activities', icon: 'CodeIcon', route: { name: 'leads-inner-folder', params: { folder: 'activities' } } },

      ]
  
      return {
        perfectScrollbarSettings,
        taskFilters,
        isDynamicRouteActive,
      }
    },
  }
  </script>
  
  <style>
  
  </style>
  