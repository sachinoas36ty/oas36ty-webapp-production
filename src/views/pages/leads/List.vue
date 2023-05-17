<template>
  <div>
    <!-- {{ updateTab }} -->
    <snackbar ref="snackbar" class="hello" position="bottom-left" :multiple="false" />

    <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />
    <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItem" @refetch-data="() => {
        // item._showDetails = true  
        // preventExpand()
      }
      " />

    <div class="block-header" style="margin-bottom: 12px;
          min-height: 60px;">

      <div class="row d-flex " style="        background: #fff;
                      margin: 0;">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="h-left clearfix">
            <div class="card">
              <div class="header d-flex justify-content-between ">
                <div>


                  <h2 class="text-uppercase text-20-black  ">
                    Leads
                  </h2>
                </div>
                <div class=" d-flex justify-content-end">
                  <div class="d-inline-flex ">
                    <b-button size="sm" variant="primary" class="mr-1" v-b-modal.modal-leads>
                      <span class="text-nowrap">
                        <feather-icon icon="PlusCircleIcon" />
                        Add Lead
                      </span>

                    </b-button>
                  </div>

                  <div class="d-inline-flex ">
                    <b-button size="sm" variant="primary" @click="openFilter()">
                      <span class="text-nowrap">
                        <feather-icon icon="FilterIcon" />

                      </span>

                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-card no-body />
    <div class="mt-2 mb-2">

      <b-row>
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0" />
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <div class="btn-filter d-flex">

              &emsp;

            </div>
          </div>

        </b-col>
      </b-row>

    </div>


    <!-- BTABS -->

    <div style="
          margin-top: -71px;
      ">
      <b-tabs class="mb-2" v-model="activeTab">
        <b-tab active id="all" >
          <template #title>
            {{ 'ALL' }}


            <b-badge style="margin-left: 4px;" pill variant="dark">{{ totalLength
            }}</b-badge>
          </template>

        </b-tab>
        <b-tab id="important" >
          <template #title>
            {{ 'IMPORTANT' }}
            <b-badge style="margin-left: 4px;" pill variant="dark">{{ importantLength }}</b-badge>
          </template>

        </b-tab>
        <b-tab id="overdue">
          <template #title>
            {{ 'OVERDUE' }}
            <b-badge style="margin-left: 4px;" pill variant="dark">{{ overDueLength
            }}</b-badge>
          </template>

        </b-tab>
        <b-tab id="dueToday" >
          <template #title>
            {{ 'DUE TODAY' }}
            <b-badge style="margin-left: 4px;" pill variant="dark">{{ dueTodayLength
            }}</b-badge>
          </template>

        </b-tab>
        <b-tab id="dueTomorrow">
          <template #title>
            {{ 'DUE TOMORROW' }}
            <b-badge style="margin-left: 4px;" pill variant="dark">{{ dueTomorrowLength }}</b-badge>
          </template>

        </b-tab>
        <b-tab id="dueThisWeek">
          <template #title>
            {{ 'DUE THIS WEEK' }}
            <b-badge style="margin-left: 4px;" pill variant="dark">{{ dueThisWeekLength }}</b-badge>
          </template>
        </b-tab>
      </b-tabs>
      <div>
        <b-dropdown id="dropdown" text="ACTIONS" v-if="selectedCheckbox.length > 0" variant="primary" size="sm">
          <b-dropdown-item>Assign Members</b-dropdown-item>
          <b-dropdown-item>Mark as Read</b-dropdown-item>
          <b-dropdown-item>Mark as Unread</b-dropdown-item>

          <b-dropdown-item>Set Due Date</b-dropdown-item>
          <b-dropdown-item>Mark as Close</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <!-- {{ activeTab }} -->
    <b-card no-body>
      <div class="m-0">
        <b-row>

          <b-col class="d-flex align-items-center justify-content-start" />





          <b-col>

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
            </div>
          </b-col>
        </b-row>
      </div>

      <b-row v-if="isFilterActive == true" class="m-2">

        <b-col md="4">
          <b-form-group>
            <v-select v-model="filterStatus" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="Status"
              :options="statusOptions"  class="my-custom-select" placeholder="Select the Status" @input="filter()" >
            </v-select>
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group>
            <v-select v-model="FilterPriority" @input="filter()" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="star" :options="importance2.slice().reverse()" placeholder="Select the Priority" class="my-custom-select"
              :readonly="!searchable">
              <template #option="{ star, icon }">
                <div v-if="star === '*'">
                  <feather-icon fill="#9e9e9e" style="color: #9e9e9e;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Lowest
                </div>
                <div v-if="star === '* *'">
                  <feather-icon fill="#607d8b" style="color: #607d8b;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Low
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>
                <div v-if="star === '* * *'">
                  <feather-icon fill="#ffe821" style="color: #ffe821;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Medium
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>

                <div v-if="star === '* * * *'">
                  <feather-icon fill="#ff9800" style="color: #ff9800;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />High
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>
                <div v-if="star === '* * * * *'">
                  <feather-icon fill="#e91e63" style="color: #e91e63;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Highest
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>
                <!-- <feather-icon v-if="star === '* * *'"

                    icon="StarIcon"
                    size="16"
                    class="align-middle mr-50"
                  /> -->
                <!-- <span> {{ title }}</span> -->
              </template>

              <template #selected-option="{ star, icon }">
                <div v-if="star === '*'">
                  <feather-icon fill="#9e9e9e" style="color: #9e9e9e;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Lowest
                </div>
                <div v-if="star === '* *'">
                  <feather-icon fill="#607d8b" style="color: #607d8b;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Low
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>
                <div v-if="star === '* * *'">
                  <feather-icon fill="#ffe821" style="color: #ffe821;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Medium
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>

                <div v-if="star === '* * * *'">
                  <feather-icon fill="#ff9800" style="color: #ff9800;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />High
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>
                <div v-if="star === '* * * * *'">
                  <feather-icon fill="#e91e63" style="color: #e91e63;" icon="StarIcon" size="16"
                    class="align-middle mr-50" />Highest
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                </div>
                <!-- <feather-icon v-if="star === '* * *'"

                    icon="StarIcon"
                    size="16"
                    class="align-middle mr-50"
                  /> -->
                <!-- <span> {{ title }}</span> -->
              </template>
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <v-select v-model="filterUsers" label="name" :track_by="id" :options="paginated_users_to_assign" placeholder="Select the Assignee" class="my-custom-select"
              @input="filter()" @search="onSearch" :dropdown-should-open="dropdownShouldOpen">
              <!-- <li slot="list-footer" class="pagination">
         <b-button size="sm" :disabled="!users_hasPrevPage" @click="offset -= limit">Prev</b-button>
         <b-button size="sm" :disabled="!users_hasNextPage" @click="offset += limit">Next</b-button>
      </li> -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="4" v-if="paginated_branch.length > 1">
          <!-- <b-form-group> -->
          <v-select :options="paginated_branch" placeholder="Select the Branch Name" class="my-custom-select" v-model="filterBranch"
            @input="filter()" @search="onSearch">
            <!-- <li slot="list-footer" class="pagination">
         <b-button size="sm" :disabled="!hasPrevPage" @click="offset -= limit">Prev</b-button>
         <b-button size="sm" :disabled="!hasNextPage" @click="offset += limit">Next</b-button>
      </li> -->
            <!-- <li slot="list-footer" class="pagination">
         <b-button size="sm" :disabled="!hasPrevPage" @click="offset -= limit">Prev</b-button>
         <b-button size="sm" :disabled="!hasNextPage" @click="offset += limit">Next</b-button>
      </li> -->
          </v-select>
          <!-- </b-form-group> -->
        </b-col>
        <b-col md="4">
          <b-form-group>
            <v-select :filterable="false" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="paginated_companys" placeholder="Select the Client" class="my-custom-select" v-model="filtercompany" @input="filter()"
              @search="onSearch">
              <!-- <li slot="list-footer" class="pagination">
         <b-button size="sm" :disabled="!companys_hasPrevPage" @click="offset -= limit">Prev</b-button>
         <b-button size="sm" :disabled="!companys_hasNextPage" @click="offset += limit">Next</b-button>
      </li> -->
              <!-- <template #option="name, icon" v-for="item in items" >
                  

                    {{ item.company.name }}
         
                </template>
                <template #selected-option="name, icon" v-for="item in items">


                    {{ item.company.name }}
                  
                </template> -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <v-select v-model="filterCategory" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :filterable="false"
              :options="paginated_category" placeholder="Select the Category" class="my-custom-select" @input="filter()" @search="onSearch">
              <template #action>
                hello
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down open-indicator vs__open-indicator" role="presentation"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
              </template>
              <!-- 
                <li slot="list-footer" class="pagination">
         <b-button size="sm" :disabled="!category_hasPrevPage" @click="offset -= limit">Prev</b-button>
         <b-button size="sm" :disabled="!category_hasNextPage" @click="offset += limit">Next</b-button>
      </li> -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <v-select v-model="filterContact" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :filterable="false"
              :options="paginated_contactPerson" placeholder="Select the Contact Person" class="my-custom-select" @input="filter()"
              @search="onSearch">
              <!-- <li slot="list-footer" class="pagination">
         <b-button size="sm" :disabled="!contactPerson_hasPrevPage" @click="offset -= limit">Prev</b-button>
         <b-button size="sm" :disabled="!contactPerson_hasNextPage" @click="offset += limit">Next</b-button>
      </li> -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group  class="my-custom-select">
            <b-form-input id="leads-search" v-model="filterSearch" @input="filter()"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"   placeholder="Search"  />
          </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-end mb-1">
          <b-button @click="downloadExcel" size="sm" variant="primary">
            <span class="text-nowrap"> Download</span> </b-button>&emsp;
          <b-button size="sm" variant="primary" @click="clearField()">
            <span class="text-nowrap"> Reset</span>
          </b-button>
        </b-col>
      </b-row>

      <!-- {{ this.checkIsEmpty }} -->
      {{ items }}
      <b-table id="leads_table" :show-empty="!isLoading && leadsData.length == 0" :per-page="perPage"
        :current-page="currentPage" :tbody-tr-class="rowClass" selectable  :items="leadsData"
        :fields="fields" class="table mb-0" responsive="sm" @row-clicked="onRowClicked">

        <template #head()="{ label, field: { key } }">
          <!-- <template ></template> -->
          <font-awesome-icon v-if="key === 'commentCount'" icon="comments" class="icon cursor-pointer" size="lg" />
          <!-- <input type="checkbox" v-if="key == 'checkbox'"> -->

          <!-- <feather-icon v-if="key === 'commentCount'" icon="EditIcon" /> -->
          <input type="checkbox" v-else-if="key === 'checkbox'" id="mainCheckbox" v-model="selectAll" @click="select">

        </template>
        <template #cell(checkbox)="item">
          <!-- {{ item.item.id }} -->


          <input type="checkbox" :value="item.item.id" v-model="selectedCheckbox">

          <!-- <input type="checkbox" :checked="item.item.isSelected" :value="item.item.id"  id="checkbox1" @input="selectSingle(item.item.id)"   /> -->

          <!-- {{item.item.isSelected}} -->
        </template>
        <template #cell(commentCount)="item">
          <b-badge :id="'tooltip-1' + item.item.id" :variant="item.item.comments.length > 0 ? 'primary' : 'secondary'">
            {{ getLatestCommentLength(item.item.comments, item.item.id) }}
          </b-badge>
          <b-tooltip v-if="item.item.comments.length > 0" id="tooltip-focus" class="pl-4"
            :target="'tooltip-1' + item.item.id" placement="top">
            <div v-html="getLatestComment(item.item.comments, item.item.id)"></div>
            <span class="text-muted" style="font-style: italic;">
              {{
                getCommentUser(item.item.comments, $store.state.users.all)
              }}
            </span>
            <!-- ~ dev, Tue Jan 5:07 am -->
          </b-tooltip>
        </template>
        <!-- <div slot="table-busy" class="text-center  my-2">
                          <b-spinner class="align-middle"></b-spinner>&emsp;
                          <strong>Loading...</strong>
                      </div> -->
        <template #row-details="item">
          <!-- <search-messages :is-search-messages-active.sync="isSearchMessagesActive" :edit-item.sync="item.item" @refetch-data="fetchAll" /> -->
          <!-- <b-card-actions ref="cardAction"  > -->
          <div class="b-overlay-wrap position-relative">
            <b-card no-body class="ml-2 mt-2 mr-2 mb-0">
              <div class="d-flex justify-content-between" style="text-transform: uppercase; font-weight: 500;">
                <span v-if="$router.currentRoute.name == 'tasks'">
                  Task Details
                </span>
                <span v-else> Lead Details </span>

                <div>
                  <feather-icon v-show="setPrivileges.edit === true" style="margin-right: 0.5rem;" @click="isEditSidebarActive = true;
                  editItem = item.item;
                                                                                                                            "
                    icon="EditIcon" size="20" />
                  <feather-icon v-show=" setPrivileges.delete === true " @click=" destroyItem(item.item.id) "
                    icon="TrashIcon" size="20" />
                </div>
              </div>
              <hr style="border-color: #f75949;" />
              <div style="border: 1px solid #f6f6f9; background: #f6f6f9;">
                <b-row class="match-height" style="line-height: 2;">
                  <b-container class="m-1">
                    <b-row>
                      <b-col cols="2" class="">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Contact-Person :</span>

                        <!-- </b-card-text> -->
                      </b-col>

                      <b-col md="2" class="client-name234">
                        <span v-b-tooltip.hover.top="
                          item.item.contact_person
                            ? item.item.contact_person.name
                            : ''
                        ">
                          {{
                          item.item.contact_person == null
                          ? "-"
                          : item.item.contact_person.name
                          }}
                        </span>
                      </b-col>
                      <b-col cols="2" class="">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Client :</span>

                        <!-- </b-card-text> -->
                      </b-col>
                      <b-col md="2" class="client-name234">
                        <span v-if=" item.item.company != null " v-b-tooltip.hover.top=" item.item.company.name ">
                          {{ item.item.company.name== null ?"-":item.item.company.name }}
                        </span>
                        <!-- <span v-if=" item.item.company == null " v-b-tooltip.hover.top=" 'Contact person' ">
                        {{
                        item.item.contact_person
                        ? item.item.contact_person.name
                        : ""
                        }}
                      </span> -->
                      </b-col>
                      <b-col cols="2" class="" v-show=" previleges.clientDetails ">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;"> Category :</span>

                        <!-- </b-card-text> -->
                      </b-col>
                      <b-col md="2" class="client-name234" v-show=" previleges.clientDetails ">
                        <span v-b-tooltip.hover.top="
                          item.item.category ? item.item.category.name : ''
                        ">
                          {{
                          item.item.category == null
                          ? "-"
                          : item.item.category.name
                          }}
                        </span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="2" class="">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;"> Assigned To :</span>
                        <!-- <div
                          :class="{ 'ml-3': item.item.users.length < 3, 'ml-1': item.item.users.length > 3 || item.item.users.length === 3 }"
                          class="text-capitalize"> -->

                        <!-- <span v-if="item.item.users.length > 0" v-for="user in item.item.users" :key="user.name">


                            
                            
                            <span v-b-tooltip.hover.top="user.name">

                              {{ user.name }}
                              <span v-if="item.item.users.findIndex(e => e.id === user.id) > -1">
                                ,
                              </span>
                            </span>
                          </span> -->
                        <!-- </span>
                        </div> -->
                        <!-- </b-card-text> -->
                      </b-col>

                      <b-col md="2">
                        <span class="users-name" v-b-tooltip.hover.top="
                          getAssigneeString(item.item.users)
                        ">
                          <!-- <span >{{ user.name }}</span>
            <span v-if="item.item.users.length > 1">,</span> -->
                          {{
                          getAssigneeString(item.item.users)
                          }}
                          <!-- <span v-if="item.item.users.length > 3">
                          ....
                        </span> -->
                        </span>
                      </b-col>

                      <b-col cols="2" class="">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Due Date :</span>

                        <!-- </b-card-text> -->
                      </b-col>
                      <b-col md="2">
                        {{ item.item.due_date.split("-").reverse().join("-") }}
                      </b-col>
                      <b-col cols="2" class="">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Branch :</span>

                        <!-- </b-card-text> -->
                      </b-col>
                      <b-col md="2">
                        {{
                        item.item.branch == null ? "-" : item.item.branch.name
                        }}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="2" class="">
                        <span style="font-weight: bolder;">Description:</span>
                        <!-- <div class="ml-1">
                        </div>
                         -->
                      </b-col>
                      <b-col md="10" style="width:63rem;">
                        <!-- {{ parseHtml(item) }} -->
                        <!-- {{ shortText(false) }} -->
                        <div>

                          <!-- <iframe wrap="hard" scrolling="no" onload="javascript:(function(o){o.style.wordWrap= 'break-word'; o.style.height=o.contentWindow.document.body.scrollHeight+40+'px'; o.style.width = o.contentWindow.document.body.scrollWidth+5+'px'; scroll(0,0)}(this));"
   style="width: 100%!important;pointer-events:auto;height: 8rem; border: 1px solid white" :srcdoc="shortText(false)" frameborder="0"></iframe> -->
                          <span v-html=" shortText(false) "></span>
                          <br />
                          <span style="color: red;" v-if=" !textLength && textCheck.length > 150 "
                            @click=" textLength = true " class="pointer">
                            ... Read more</span>
                          <span style="color: red;" v-if=" textLength " @click=" textLength = false ">
                            ... Read less</span>
                        </div>

                      </b-col>
                    </b-row>
                    <!-- <b-row>
                    <b-col class="d-flex">
                      <span style="font-weight: bolder;">
                        Description :
                      </span>
                      <span class="ml-1">
                        <span v-html="item.item.description.trim()"></span>
                      </span>
                    </b-col>
                  </b-row> -->
                  </b-container>

                  <!-- about -->
                </b-row>
                <div class="text-right text-muted" style="font-style: italic;">
                  <span v-if=" item.item.self_user != null " class="mr-1">Created by : {{ item.item.self_user.name }}
                    <span v-if=" item.item.mailbox_id != null "> via mailbox </span>
                  </span>
                </div>
              </div>
            </b-card>
            <b-tabs card>
              <b-tab active id="lead">
                <template #title>
                  {{ "COMMENTS" }}
                  <b-badge v-if=" item.item.comments.length > 0 " style="margin-left: 0.5rem;">
                    {{ item.item.comments.length }}
                    <!-- {{ getTodolength(todos, item.item.id) }} -->
                  </b-badge>
                </template>
                <!-- <b-card-text>Comments</b-card-text> -->
                <div class="d-flex comments-card">
                  <div style="line-height: 3; width: 32.333333333%;">
                    <!-- 40 -->
                    <div class="b-overlay-wrap position-relative">

<div style="font-weight: bolder" class="d-flex justify-content-between">
  Follow Up
  <div class="">
    <feather-icon icon="PlusIcon" @click="openFollowUp()" />
  </div>
</div>

<div @click=" showHideHistoryFollowups() " style="
  border: 1px solid #e0e0e0;
  background: #f6f6f9;
  line-height: 2.5;
">
  <span class="ml-1">
    <b>
      <feather-icon :icon=" historyIconName " size="18" />
    </b>
    History
    <b-badge v-if="getFollowUpData('history').length > 0">{{ getFollowUpData('history').length }}</b-badge>
  </span>
</div>
<div  class="text-center mt-1" id="desc_history_followups"
  style="display: none; border: 1px solid #e0e0e0; line-height: 2.5">
  <!-- <div v-if="getFollowUpData('history').length > 0" class="text-center mt-1" id="desc_history_followups" -->
  <!-- style="display: none; border: 1px solid #e0e0e0; line-height: 2.5"> -->
  <div v-if="getFollowUpData('history').length > 0" v-for="data in getFollowUpData('history')" :key="String(Number(data.id+1))">
    <span v-if="data.activity_type.name === 'Visit'">
      <feather-icon icon="FileIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
    <span v-if="data.activity_type.name === 'Phone'">
      <feather-icon icon="PhoneIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
    <span v-if="data.activity_type.name === 'Email'">
      <feather-icon icon="MailIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
      <!-- <small>{{ getFollowUpDate(data) }}</small> -->
    </span>
  </div>
<!-- </div> -->
<div v-if="getFollowUpData('history').length === 0" class="text-center">
  No History follow ups
  </div>
</div>

<div @click=" showHidePendingFollowups() " class="mt-1" style="
  border: 1px solid #e0e0e0;
  background: #f6f6f9;
  line-height: 2.5;
">
  <span class="ml-1">
    <b>
      <feather-icon :icon=" pendingIconName " size="18" />
    </b>
    Pending
    <b-badge v-if="getFollowUpData('pending').length > 0">{{ getFollowUpData('pending').length }}</b-badge>

  </span>
</div>
<div class="text-center mt-1" id="desc_pending_followups"
  style="display: none; border: 1px solid #e0e0e0; line-height: 2.5">
  <div v-if="getFollowUpData('pending').length > 0" v-for="data in getFollowUpData('pending')" :key="String(Number(data.id+1))">
    <span v-if="data.activity_type.name === 'Visit'">
      <input type="checkbox" v-model="data.checked" @change="markAsChecked(data,$event)" />

      <feather-icon icon="FileIcon" />
      {{data.description}}
        <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
    <span v-if="data.activity_type.name === 'Phone'">
      <input type="checkbox" v-model="data.checked" @change="markAsChecked(data,$event)" />

      <feather-icon icon="PhoneIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
    <span v-if="data.activity_type.name === 'Email'">
      <input type="checkbox" v-model="data.checked" @change="markAsChecked(data,$event)" />

      <feather-icon icon="MailIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
  </div>
  <div v-if="getFollowUpData('pending').length === 0" class="text-center">

  No Pending follow ups
  </div>
</div>
<div @click=" showHideUpcomingFollowups() " class="mt-1" style="
  border: 1px solid #e0e0e0;
  background: #f6f6f9;
  line-height: 2.5;
">
  <span class="ml-1">
    <b> <feather-icon :icon=" upcomingIconName " size="18" /> </b>Upcoming
    <b-badge v-if="getFollowUpData('upcoming').length > 0">{{ getFollowUpData('upcoming').length }}</b-badge>

  </span>
</div>
<div class="text-center mt-1" id="desc_upcoming_followups"
  style="display: none; border: 1px solid #e0e0e0; line-height: 2.5">
  <div v-if="getFollowUpData('upcoming').length > 0" v-for="data in getFollowUpData('upcoming')" :key="String(Number(data.id+1))">
    <span v-if="data.activity_type.name === 'Visit'">
      <input type="checkbox" v-model="data.checked" @change="markAsChecked(data,$event)" />

      <feather-icon icon="FileIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
    <span v-if="data.activity_type.name === 'Phone'">
      <input type="checkbox" v-model="data.checked" @change="markAsChecked(data,$event)" />

      <feather-icon icon="PhoneIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
    <span v-if="data.activity_type.name === 'Email'">
      <input type="checkbox" v-model="data.checked" @change="markAsChecked(data,$event)" />

      <feather-icon icon="MailIcon" />
      {{data.description}}
      <br>
      <small style="    float: right;
margin-top: -2rem;
margin-right: 1rem;">{{ getFollowUpDate(data) }}</small>
    </span>
  </div>
  <div v-if="getFollowUpData('upcoming').length === 0" class="text-center">

    No Upcoming follow ups
  </div>

</div>
<div v-if="$store.state.followUp.isLoading" class="b-overlay position-absolute"
style="inset: 0px;z-index: 10;/* display: none; */">
<div class="position-absolute bg-white rounded-sm"
style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
<div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
<span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
<br><span style="margin-left:-2rem;">Processing..</span>
</div>
</div>
</div>
                    <div>
    <div class="b-overlay-wrap position-relative">

                    <div style="font-weight: bolder;">Attachments</div>
                    <div style="
                              border: 1px solid #e0e0e0;
                              background: #f6f6f9;
                              line-height: 2.5;
                            ">
                      <span class="ml-1 d-flex justify-content-between">
                        <div @click=" showOrHideTaskAttach() " class="w-100 h-100">
                          <b>
                            <feather-icon :icon=" taskIconName " size="18" />
                          </b>
                          Task Attachments
                          <b-badge
                            v-if=" showFilesTask.filter(e => e.attachment !== '' || e.drive_url !== '').length != 0 "
                            :variant=" 'secondary' ">
                            {{ showFilesTask.filter(e => e.attachment !== '' || e.drive_url !== '').length }}
                          </b-badge>
                        </div>
                        <div class="position-relative" ref="taskAttachment">
                          <div @click=" taskAttachmentDropdown() " @click.stop style="margin-right: 5px;">
                            <feather-icon icon="PlusIcon" size="18" />
                          </div>
                          <div v-show=" dropTask === true " ref="taskDrop" class="position-absolute z-3 drop" >
                            <div class="border-l" @click.stop>
                              <!-- <b-form @submit.prevent="handleSubmit(UpdateProfile)"> -->

                              <div class="d-flex flex-column">
                                <div
                                  class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                                  <div>Attachment (s)</div>
                                  <div>
                                    <b-form-file plain v-model=" filetask " id="file_task" multiple style="display: none;"
                                      @change=" uploadFile " />
                                    <b-dropdown id="file_drop" class="" variant="primary">
                                      <template #button-content>
                                        <span class="text-capitalize">
                                          Choose File(s)
                                        </span>
                                      </template>
                                      <b-dropdown-item @click=" chooseFileTask "><img class="mr-1" :src=" browseIcon "
                                          width="25px" />Browse</b-dropdown-item>
                                      <b-dropdown-item v-b-modal.attachment-excel-modal><img class="mr-1"
                                          :src=" excelIcon " width="25px" data-type="1" />Google Sheets</b-dropdown-item>
                                      <b-dropdown-item v-b-modal.attachment-modal><img class="mr-1" :src=" wordIcon "
                                          width="25px" data-type="2" />Google
                                        Docs</b-dropdown-item>


                                    
                                    </b-dropdown>
                                  </div>
                                </div>
                                <!-- </b-form> -->
                              </div>
                              <div class="p-1">
                                <div class="d-flex justify-content-center" v-if=" attachmentLoading ">
                                  <b-spinner variant="primary" />
                                </div>
                                <div v-else-if=" fileLinks.filter(e => e.type === 'task').length ">
                                  <div v-for="(  file, index  ) in   fileLinks.filter(e => e.type === 'task')  " :key=" index "
                                    class="d-flex justify-content-between">
                                    <!-- <span v-if="file.type=== 'task'"> -->

                                    {{ file.fileName.length > 35 ? file.fileName.substr(0, 35) : file.fileName }}
                                    <!-- {{  }} -->
                                    <!-- </span> -->
                                    <feather-icon icon="XIcon" class="cursor-pointer"
                                      @click=" removes3(file.url, index) " />
                                  </div>
                                </div>
                                <div v-else class="d-flex justify-content-center align-items-center">
                                  No file(s) selected
                                </div>
                                <div class="d-flex justify-content-end">
                                  <b-button size="sm" v-if=" fileLinks.filter(e => e.type === 'task').length > 0 "   variant="primary" @click="
                                    uploadAttach(
                                      item.item.id,
                                      item.item.company_id,
                                      fileLinks.filter(e => e.type === 'task'),
                                      'task'
                                    )
                                  ">Upload

                                  </b-button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div class="mt-1" id="desc_task_attach" style="
                              text-transform: none;
                              display: none;
                              border: 1px solid #e0e0e0;
                              line-height: 2.5;
                            ">
                      <div
                        v-if=" showFilesTask.length && showFilesTask.filter(e => e.attachment !== '' || e.drive_url !== '').length ">
                        <div class="ml-1 d-flex justify-content-between" v-for="(  file, index  ) in   showFilesTask  "
                          :key=" index ">

                          <a v-if=" file.type === 'task' && file.original_name "
                            :href=" file.drive_url ? file.drive_url : file.attachment " target="_blank">{{
                            file.original_name.length > 25 ? file.original_name.substr(0, 25) : file.original_name

                            }}</a>
                          <b-dropdown id="file_options" variant="link">
                            <template #button-content>
                              <span class="text-capitalize text-bolder">
                                ...
                              </span>
                            </template>
                            <b-dropdown-item @click=" openInDrive(file.drive_url ? file.drive_url : file.attachment,file.original_name) ">Download</b-dropdown-item>
                            <b-dropdown-item>Rename</b-dropdown-item>
                            <b-dropdown-item @click=" convertToClient(file.id)">Add to client</b-dropdown-item>
                            <b-dropdown-item @click="deleteAttachment(file.id)">Delete from task</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                      <div v-else class="text-center">No Attachments</div>
                    </div>
                    <div class="mt-1" style="
                              border: 1px solid #e0e0e0;
                              background: #f6f6f9;
                              line-height: 2.5;
                            ">
                      <span class="ml-1 d-flex justify-content-between">
                        <div class="w-100 h-100" @click=" showOrHideClientAttach() ">
                          <b>
                            <feather-icon :icon=" clientIconName " size="18" />
                          </b>
                          Client Attachments
                          <b-badge
                            v-if=" showFilesClient.filter(e => e.attachment !== '' || e.drive_url !== '').length != 0 "
                            :variant=" 'secondary' ">
                            {{ showFilesClient.filter(e => e.attachment !== '' || e.drive_url !== '').length }}
                          </b-badge>
                        </div>
                        <div class="position-relative">
                          <div @click=" clientAttachmentDropdown($event) " @click.stop style="margin-right: 5px;">
                            <feather-icon icon="PlusIcon" size="18" />
                          </div>
                          <div v-show=" dropClient === true " ref="clientDrop" class="position-absolute z-3 drop">
                            <div class="border-l">
                              <!-- <b-form @submit.prevent="handleSubmit(UpdateProfile)"> -->

                              <div class="d-flex flex-column">
                                <div
                                  class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                                  <div>Attachment(s)</div>
                                  <div>
                                    <input type="file" ref="file_client" multiple style="display: none;"
                                      @change=" uploadFileClient " />
                                    <b-dropdown id="file_drop" class="" variant="primary">
                                      <template #button-content>
                                        <span class="text-capitalize " >
                                          Choose File(s)
                                        </span>
                                      </template>
                                      <b-dropdown-item @click=" $refs.file_client.click() "><img class="mr-1"
                                          :src=" browseIcon " width="25px" />Browse</b-dropdown-item>
                                      <b-dropdown-item v-b-modal.attachment-excel-modal><img class="mr-1"
                                          :src=" excelIcon " width="25px" data-type="1" />Google Sheets</b-dropdown-item>
                                      <b-dropdown-item v-b-modal.attachment-modal><img class="mr-1" :src=" wordIcon "
                                          width="25px" data-type="2" />Google
                                        Docs</b-dropdown-item>


                                      <!-- <b-dropdown-item>

          </b-dropdown-item> -->
                                    </b-dropdown>
                                  </div>
                                </div>
                                <!-- </b-form> -->
                              </div>
                              <div class="p-1">
                                <div class="d-flex justify-content-center" v-if=" attachmentLoading ">
                                  <b-spinner variant="primary" />
                                </div>
                                <div v-else-if=" fileLinks.filter(e => e.type === 'company').length ">
                                  <div v-for="(  file, index  ) in   fileLinks.filter(e => e.type === 'company')  " :key=" index "
                                    class="d-flex justify-content-between">
                                    <!-- <span v-if="file.type === 'company'"> -->

                                    <!-- {{ file.fileName }} -->
                                    {{ file.fileName.length > 25 ? file.fileName.substr(0, 25) : file.fileName }}

                                    <!-- </span> -->
                                    <feather-icon icon="XIcon" class="cursor-pointer"
                                      @click=" removes3(file.url, index) " />
                                  </div>
                                </div>
                                <div v-else class="d-flex justify-content-center align-items-center">
                                  No file(s) selected
                                </div>
                                <div class="d-flex justify-content-end">
                                  <b-button size="sm" v-if=" fileLinks.filter(e => e.type === 'company').length > 0 " variant="primary" @click="
                                    uploadAttach(
                                      item.item.id,
                                      item.item.company_id,

                                      fileLinks.filter(e => e.type === 'company'),
                                      'company'
                                    )
                                  ">Upload</b-button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div class="mt-1" id="desc_client_attach" style="
                              text-transform: none;
                              display: none;
                              border: 1px solid #e0e0e0;
                              line-height: 2.5;
                            ">
                      <div
                        v-if=" showFilesClient.length && showFilesClient.filter(e => e.attachment !== '' || e.drive_url !== '').length ">
                        <div class="ml-1 d-flex justify-content-between" v-for="(  file, index  ) in   showFilesClient  "
                          :key=" index ">
                          <a v-if=" file.type === 'company' " :href=" file.attachment " target="_blank">{{
                            file.original_name.length > 38 ? file.original_name.substr(0, 38) : file.original_name
                            }}</a>
                          <b-dropdown id="file_options" class="" variant="link">
                            <template #button-content>
                              <span class="text-capitalize text-bolder">
                                ...
                              </span>
                            </template>
                            <b-dropdown-item @click=" openInDrive(file.drive_url ? file.drive_url : file.attachment,file.original_name) ">Download</b-dropdown-item>
                            <b-dropdown-item>Rename</b-dropdown-item>
                            <b-dropdown-item @click=" convertToTask(file.id)">Add to Task</b-dropdown-item>
                            <b-dropdown-item @click="deleteAttachment(file.id)">Delete from Client</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                      <div v-else class="text-center">No Attachments</div>
                    </div>
                    <div v-if="$store.state.tasks.isAttachment || spinnerY" class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;/* display: none; */">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
                <br><span style="margin-left:-2rem;">Processing..</span>
              </div>
            </div>
                    </div>
                    </div>
                  </div>
                  <div style="width: 1%;"></div>
                  <div style="width: 65.666666667%;">
                    <!-- <div style="width:100%"> -->
                    <card-advance-chat :extraComments=" threadedMail() " :setPrivileges=" setPrivileges "
                      :replySubject=" replySubject " :client=" item.item "
                      :is-search-messages-active.sync=" isSearchMessagesActive " :task_id=" item.item.id " />
                  </div>
                </div>
              </b-tab>
              <Todo v-if=" setPrivileges.checklist === true " :task=" item.item " :task_id=" item.item.id " />
              <!-- <b-card-text></b-card-text> -->
              <b-tab>
                <template #title>
                  {{ "ACCOUNTS" }}
                  <b-badge v-if=" allProposals.length != 0 " style="margin-left: 0.5rem;">{{ allProposals.length
                    }}</b-badge>
                </template>
                <!-- <span v-if="allProposals.length == 0">{{ allProposals.length }}</span> -->
                <!-- <span>{{ proposals.findIndex(e => e.task_id === 23) }}</span> -->
                <b-table id="proposal_table" :show-empty=" !isLoading && allProposals.length == 0 "
                  :filter=" FilterPriority != null ? FilterPriority.id : '' " :per-page=" perPageAccounts "
                  :current-page=" currentPageProposalTable " selectable responsive="sm" :items=" allProposals "
                  :fields=" proposalTable " class="" @row-clicked=" onRowClickedProposal ">
                  <template #row-details=" i ">
                    <b-card no-body class="ml-2 mt-2 mr-2 mb-0">
                      <div v-if=" i.item.title == 'proposal' " class="d-flex justify-content-between align-items-end"
                        style="text-transform: uppercase; font-weight: 500;">
                        Proposal Details

                        <div>
                          <b-button size="sm" v-if="
                            getPercentProposal(i.item) < 100 && item.item.status_master.type !== 'closed' 
                          " @click="
  () => {
    (lastInvoiceId = lastInvoiceId + 2),
    (invoice.client = show_companys[0]),

    (invoiceTitle = 'add'),
      // invoice.client = null,
      (invoice.gstNumber = ''),
      (invoice.state = null),
      getLargestId(),
      (invoice.invoice_date = null),
      // invoice.due_date = null,
      (invoice.billing_address =
        i.item.address != null ? i.item.address : ''),
      (invoice.notes = 'Thank you for the business'),
      (invoice.item_details = null),
      $refs['invoice-modal'].show();
    invoice.item_details = item.item.subject;
    invoice.amount = getTotalAmt(
      i.item.proposal_fees
    );
    invoice.client = item.item.company;
    invoice.amount = null;
    // invoice.taxble_amt = null
    invoice.discount = null;
    invoice.igst = null;
    invoice.igst_amt = null;
    invoice.sgst = null;
    invoice.sgst_amt = null;
    invoice.cgst = null;
    invoice.cgst_amt = null;
    invoice.utgst = null;
    invoice.utgst_amt = null;
    invoice.total_amt = invoice.amount;
    invoice.sub_total = invoice.amount;
    (invoice.pocket_expense = null),
      (invoice.expense_details = null),
      (invoice.adjustments = 0);
    invoice.total = invoice.amount;
    // invoice.taxble_amt = getTaxbleAmt()
    // addAllProposalAmt();
    $store.state.proposals.allProposals.forEach(
      (element) => {
        if (element.id === i.item.id) {
          element.proposal_fees.forEach((e) => {
            invoice.amount =
              invoice.amount + e.amount;
          });
        }
      }
    );
    getAmt();
  }
" variant="primary ml-1">
                            <span class="text-nowrap" size="sm">
                              Create Invoice</span>
                          </b-button>
                          <b-button @click="
                            () => {
                              editIndex = i.index;
                              pname = i.item.client_name;
                              pperson = i.item.concerned_person;
                              pphrase = i.item.prephase;
                              pfooterdesc = i.item.footer_description;
                              pfootertitle = i.item.footer_title;
                              paddress = i.item.address;
                              psubject = i.item.subject;
                              amountField = [];
                              if(i.item.proposal_fees.length > 0){

                                i.item.proposal_fees.forEach((element) => {
                                  amountField.push({
                                    id: element.id,
                                    description: element.description,
                                    amount: element.amount,
                                  });
                                });
                              }else{
                                amountField.push({
                                    id: 0,
                                    description: '',
                                    amount: null,
                                  });
                              }
                              pnotes = i.item.internal_notes;
                              proposalFields = [];
                              i.item.proposal_section.forEach((element) => {
                                proposalFields.push({
                                  id: element.id,
                                  title: element.title,
                                  desc: element.description,
                                });
                              });
                              openModal(
                                'proposal-edit-modal_' +
                                item.item.id +
                                '_' +
                                i.item.id
                              );
                            }
                          " size="sm" variant="primary ml-1">
                            <span class="text-nowrap"> Edit</span>
                          </b-button>
                          <b-button size="sm" @click=" replyModal() " variant="primary ml-1">
                            <span class="text-nowrap" size="sm"> Email</span>
                          </b-button>
                          <b-button size="sm" :disabled=" loader_proposal " variant="primary ml-1"
                            @click=" exportToPDF(i) ">
                            <span class="text-nowrap" size="sm"> PDF</span>
                            <b-spinner class="ml-1" small v-if=" loader_proposal == true "></b-spinner>
                          </b-button>
                          <b-button size="sm" @click=" destroyProposal(i.item.id) " variant="primary ml-1">
                            <span class="text-nowrap" size="sm"> Delete</span>
                          </b-button>
                        </div>
                      </div>
                      <div v-if=" i.item.title == 'payment' " style="text-transform: uppercase; font-weight: 500;"
                        class="d-flex justify-content-between align-items-end">
                        Payment Receipt
                        <div>
                          <b-button size="sm" @click="
                            () => {
                              payment.title = 'edit';
                              show_companys.forEach((element) => {
                                if (element.id === i.item.client_id) {
                                  payment.client = element;
                                }
                              });
                              $store.state.branches.all.forEach((element) => {
                                if (element.id === i.item.branch_id) {
                                  payment.branch = element.name;
                                }
                              });
                              payment.payment.forEach((element) => {
                                i.item.record_pay_invoice.forEach((e) => {
                                  if (element.invoice_id === e.invoice_id) {
                                    (element.amount = e.paid_amount),
                                      (element.tds = e.tds_deducted);
                                  }
                                });
                              });
                              payment_modes.forEach((element) => {
                                if (element.name === i.item.payment_mode) {
                                  payment.mode = element;
                                }
                              });
                              payment.amount = i.item.amount;
                              payment.date = i.item.pay_date;
                              payment.reference_id = i.item.reference_id;
                              payment.notes = i.item.notes;
                              $refs['payment-modal'].show();
                              // editIndex = i.index
                              // pname = i.item.client_name
                              // pperson = i.item.concerned_person
                              // pphrase = i.item.prephase
                              // pfooterdesc = i.item.footer_description
                              // pfootertitle = i.item.footer_title
                              // paddress = i.item.address
                              // psubject = i.item.subject
                              // amountField = []
                              // i.item.proposal_fees.forEach(element => {

                              //   amountField.push({
                              //     id: element.id, description: element.description,
                              //     amount: element.amount
                              //   })

                              // });
                              // pnotes = i.item.internal_notes
                              // proposalFields = []
                              // i.item.proposal_section.forEach(element => {

                              //   proposalFields.push({
                              //     id: element.id,
                              //     title: element.title,
                              //     desc: element.description
                              //   })
                              // });
                              // openModal('proposal-edit-modal_' + item.item.id + '_' + i.item.id);

                              // ;
                            }
                          " variant="primary ml-1">
                            <span class="text-nowrap" size="sm"> Edit</span>
                          </b-button>

                          <b-button :disabled=" loader_payment " size="sm" variant="primary ml-1"
                            @click=" exportToPDFPayment(i) ">
                            <span class="text-nowrap"> PDF</span>
                            <b-spinner class="ml-1" small v-if=" loader_payment == true "></b-spinner>
                          </b-button>
                          <b-button @click=" destroyPayment(item.item.id) " size="sm" variant="primary ml-1">
                            <span class="text-nowrap"> Delete</span>
                          </b-button>
                        </div>
                      </div>
                      <div v-if=" i.item.title == 'Expense' " style="text-transform: uppercase; font-weight: 500;"
                        class="d-flex justify-content-between align-items-end">
                        Expense Details
                        <div>
                          <EditExpense :task_details=" $store.state.expenses.single.find(e => e.task_id === taskId) " />
                          <b-button size="sm" variant="primary" v-b-modal.edit-expense class="mr-1">Edit</b-button>
                          <b-button size="sm" variant="primary" @click=" destroyExpense(i.item.id) ">Delete</b-button>
                        </div>

                      </div>
                      <div v-if=" i.item.title == 'invoice' " class="d-flex justify-content-between align-items-end"
                        style="text-transform: uppercase; font-weight: 500;">
                        Invoice Details

                        <div>
                          <b-button size="sm" class="mr-1" variant="primary">
                            History
                          </b-button>
                          <b-button size="sm" v-if=" getStatusForInvoiceNumber < 100 " @click="
                            () => {
                              payment.amount = i.item.sub_total;
                              $refs['payment-modal'].show();
                            }
                          " class="mr-1" variant="primary">
                            Record Payment
                          </b-button>
                          <b-button size="sm" variant="primary"> Write off </b-button>
                          <b-button @click="
                            () => {
                              // $refs['invoice-modal'].show()
                              // invoice.item_details = item.item.subject
                              // invoice.amount = getTotalAmt(i.item.proposal_fees)
                              // invoice.client = item.item.company
                              // addAllProposalAmt();
                              // getAmt();
                            }
                          " variant="primary ml-1" size="sm">
                            <span class="text-nowrap">
                              Cancel Invoice</span>
                          </b-button>
                          <b-button  @click="
                            () => {
                              invoiceTitle = 'edit';
                              (invoice.client = i.item.client),
                                (invoice.client_name = i.item.client.name);
                              (invoice.gstNumber = i.item.client_gst_number
                                ? i.item.client_gst_number
                                : ''),
                                invoice.gstNumber.length === 15 ? pan() : '';

                              // allStates.forEach(element => {
                              //   if(element.fips_code === i.item.state_code){

                              //     invoice.state = element
                              //   }
                              // });
                              (invoice.id = i.item.invoice_number),
                                (invoice.invoice_date = i.item.invoice_date),
                                (invoice.due_date = i.item.due_date),
                                (invoice.billing_address =
                                  i.item.billing_address),
                                (invoice.notes = i.item.notes),
                                (invoice.item_details = i.item.item_details),
                                (invoice.amount = i.item.amount),
                                (invoice.discount = i.item.discount),
                                (invoice.taxble_amt = i.item.taxable_amt),
                                (invoice.igst = i.item.igst),
                                (invoice.igst_amt = i.item.igst_amt),
                                (invoice.cgst = i.item.cgst),
                                (invoice.cgst_amt = i.item.cgst_amt),
                                (invoice.sgst = i.item.sgst),
                                (invoice.sgst_amt = i.item.sgst_amt),
                                (invoice.utgst = i.item.utgst),
                                (invoice.utgst_amt = i.item.utgst_amt),
                                (invoice.total_amt = getSubTotal(i.item));
                              invoice.sub_total = getSubTotal(i.item);
                              (invoice.pocket_expense = i.item.pocket_expenses),
                                (invoice.expense_details =
                                  i.item.expenses_details),
                                (invoice.adjustments = i.item.adjustment_amt),
                                (invoice.total = i.item.sub_total);

                              $refs['invoice-modal'].show();
                              // editIndex = i.index
                              // pname = i.item.client_name
                              // pperson = i.item.concerned_person
                              // pphrase = i.item.prephase
                              // pfooterdesc = i.item.footer_description
                              // pfootertitle = i.item.footer_title
                              // paddress = i.item.address
                              // psubject = i.item.subject
                              // amountField = []
                              // i.item.proposal_fees.forEach(element => {

                              //   amountField.push({
                              //     id: element.id, description: element.description,
                              //     amount: element.amount
                              //   })

                              // });
                              // pnotes = i.item.internal_notes
                              // proposalFields = []
                              // i.item.proposal_section.forEach(element => {

                              //   proposalFields.push({
                              //     id: element.id,
                              //     title: element.title,
                              //     desc: element.description
                              //   })
                              // });
                              // openModal('proposal-edit-modal_' + item.item.id + '_' + i.item.id);

                              // ;
                            }
                          " variant="primary ml-1" size="sm">
                            <span class="text-nowrap"> Edit</span>
                          </b-button>
                          <b-button size="sm" @click=" replyModal() " variant="primary ml-1">
                            <span class="text-nowrap"> Email</span>
                          </b-button>
                          <b-button :disabled=" loader_invoice " size="sm" variant="primary ml-1"
                            @click=" exportToPDFInvoice(i) ">
                            <span class="text-nowrap"> PDF</span>
                            <b-spinner class="ml-1" small v-if=" loader_invoice == true "></b-spinner>
                          </b-button>
                          <!--  <b-button size="sm" variant="primary ml-1" @click="generateReport">
                            <span class="text-nowrap"  >
                              PDF</span>
                          </b-button> -->

                          <b-button size="sm" @click=" destroyInvoice(i.item.id) " variant="primary ml-1">
                            <span class="text-nowrap"> Delete</span>
                          </b-button>
                        </div>
                      </div>
                      <hr style="border-color: #f75949;" />
                      <div v-if=" i.item.title === 'Expense' ">

                        <b-row>
                          <b-col md="2">
                            <b>

                              Description:
                            </b>
                          </b-col>
                          <b-col md="2">
                            {{ i.item.description }}
                          </b-col>
                          <b-col md="2">
                            <b>

                              Users:
                            </b>
                          </b-col>
                          <b-col md="2">
                            <!-- {{ i.item }} -->
                            {{ i.item.users.length > 0 ? getAssigneeString(i.item.users) : '-' }}
                          </b-col>
                          <b-col md="2">
                            <b>

                              Date:
                            </b>
                          </b-col>

                          <b-col md="2">
                            {{ i.item.date }}
                          </b-col>
                        </b-row>
                        <b-row class="mt-1">
                          <b-col md="2">
                            <b>

                              Expense:
                            </b>
                          </b-col>
                          <b-col md="2">
                            {{ i.item.expense }}
                          </b-col>
                        </b-row>
                      </div>
                      <div style="font-family: 'Times New Roman', Times, serif;" id="PaymentpdfContent"
                        v-if=" i.item.title == 'payment' ">
                        <div style="margin-bottom: -3rem;" class="row">
                          <div class="col-md-12">
                            <div style="float: left;">
                              <address>
                                <img width="120" :src=" imgLogo " alt="" itemprop="logo" class="custom-logo" /><br />
                                <strong>Centrik Legalistic LLP</strong><br />
                                <span>E-11<br />
                                  LGF<br />
                                  Jangpura Extension<br />
                                  New Delhi - 110014</span><br />
                                <!---->
                                <br />
                                <!---->
                                <br />
                              </address>
                              <!-- <img :src="'https://storage.oas36ty.com/uploads/organization/SP51hmKqu3PZSevzqHpr9ITjaF8U5WQqoxWbWTs6.png'"/> -->
                            </div>
                            <div class="text-right" style="float: right;">
                              <!-- <h1>
                                Invoice
                              </h1> -->
                              <span> bill To </span>
                              <h4>
                                <!-- <strong>{{ i.item.invoice_number }}</strong> -->
                              </h4>
                              <b>
                                {{ getPaymentClient(i.item.client_id) }}
                              </b>
                              <br />
                              <span>
                                Delhi
                                <!-- {{ i.item.sub_total }} -->
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div data-v-21ceb292="" class="row">
                          <div data-v-21ceb292="" class="col-md-12">
                            <h4 data-v-21ceb292="" class="text-uppercase text-center m-b-25">
                              Payment Receipt
                            </h4>
                            <div class="row">
                              <div data-v-21ceb292="" class="col-md-8 padding-0">
                                <div data-v-21ceb292="" class="receipt-inline clearfix">
                                  <div data-v-21ceb292="" class="form-label">
                                    Payment Date
                                  </div>
                                  <div data-v-21ceb292="" class="receipt-value">
                                    {{ i.item.pay_date }}
                                  </div>
                                </div>
                                <div data-v-21ceb292="" class="receipt-inline clearfix">
                                  <div data-v-21ceb292="" class="form-label">
                                    Reference Number
                                  </div>
                                  <div data-v-21ceb292="" class="receipt-value">
                                    {{ i.item.reference_id }}
                                  </div>
                                </div>
                                <div data-v-21ceb292="" class="receipt-inline clearfix">
                                  <div data-v-21ceb292="" class="form-label">
                                    Payment Mode
                                  </div>
                                  <div data-v-21ceb292="" class="receipt-value">
                                    {{ i.item.payment_mode }}
                                  </div>
                                </div>
                                <div data-v-21ceb292="" class="receipt-inline clearfix">
                                  <div data-v-21ceb292="" class="form-label">
                                    Amount Received In Words
                                  </div>
                                  <div data-v-21ceb292="" class="receipt-value">
                                    {{ convertNumberToWords(i.item.amount) }}
                                  </div>
                                </div>
                              </div>
                              <div data-v-21ceb292="" class="col-md-4">
                                <div data-v-21ceb292="" class="panel panel-default text-center font-15">
                                  <div data-v-21ceb292="" class="panel-heading">
                                    Amount Received
                                  </div>
                                  <div data-v-21ceb292="" class="panel-body font-bold">
                                    <span data-v-21ceb292="">
                                      <font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" /></span>
                                    <!-- {{getPaymentAmt(i.item.record_pay_invoice)}} -->
                                    {{ i.item.amount }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="mt-3 table-responsive">
                              <table
                                class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                                style="cursor: pointer;">
                                <caption>
                                  Payment For
                                </caption>
                                <thead class="invoice-thead-tr">
                                  <tr class="invoice-thead-tr">
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Invoice Number
                                    </th>
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Invoice Amount
                                    </th>
                                    <th class="" style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      TDS deducted
                                    </th>

                                    <th class="" style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Payment Amount(<font-awesome-icon icon="indian-rupee-sign"
                                        class="icon cursor-pointer" />)
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(  invoice, index  ) in   i.item.invoice  " :key=" invoice.id ">
                                    <td>{{ invoice.invoice_number }}</td>
                                    <!-- <td>{{ Number(getTdsForPayment(invoice.id, i.item.record_pay_invoice)) + getFinalPayment(invoice.id, i.item.record_pay_invoice)}}</td> -->
                                    <td>{{ i.item.amount }}</td>
                                    <td>
                                      {{
                                      getTdsForPayment(
                                      invoice.id,
                                      i.item.record_pay_invoice
                                      )
                                      }}
                                    </td>
                                    <td>
                                      {{
                                      getFinalPayment(
                                      invoice.id,
                                      i.item.record_pay_invoice
                                      )
                                      }}
                                    </td>
                                  </tr>
                                  <!-- <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-right">{{ i.item.sub_total }}</td>
                                  </tr> -->
                                </tbody>
                              </table>
                              <div class="mt-3 text-right">
                                Authorized Signature
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="font-family: 'Times New Roman', Times, serif;" id="pdfContent"
                        v-if=" i.item.title == 'proposal' ">
                        <!-- <div class="header">
                          <header>
                            <img :src="imgLogo" alt="">
                          </header>
                        </div> -->
                        <p class="font-weight-bolder">
                          {{ userData.tenant.organization.name }}
                        </p>
                        <p class="my-3 font-weight-bolder">
                          Date: {{ i.item.proposal_date }}
                        </p>
                        <p class="mb-2">{{ i.item.client_name }} ,</p>
                        <p class="mb-2">{{ i.item.address }}</p>
                        <p class="mb-2 font-weight-bolder">
                          Subject: {{ i.item.subject }}
                        </p>
                        <p class="mb-2">{{ i.item.prephase }}</p>
                        <p class="mb-2">Dear {{ i.item.concerned_person }}</p>
                        <div v-for="(  proposal, index  ) in   i.item.proposal_section  " :key=" proposal.id ">
                          <p class="mb-2 font-weight-bolder">
                            {{ proposal.title }}
                          </p>
                          <p class="mb-3" v-html=" proposal.description "></p>
                        </div>
                        <p class="font-weight-bolder" style="font-size: 20px;">
                          Fee Details
                        </p>
                        <br /><br /><br />
                        <table class="mb-3" style="width: 100%;">
                          <thead>
                            <th style="
                                      background-color: #000000a1 !important;
                                      color: #fff !important;
                                    ">
                              SI No
                            </th>
                            <th style="
                                      background-color: #000000a1 !important;
                                      color: #fff !important;
                                    ">
                              Description
                            </th>
                            <th style="
                                      background-color: #000000a1 !important;
                                      color: #fff !important;
                                    ">
                              Amount
                            </th>
                          </thead>
                          <tbody>
                            <tr v-for="(  amount, index  ) in   i.item.proposal_fees  " :key=" amount.id ">
                              <td>{{ index + 1 }}</td>
                              <td>{{ amount.description }}</td>
                              <td>{{ amount.amount }}</td>
                            </tr>
                            <tr v-if=" i.item.proposal_fees.length > 1 ">
                              <td style="font-weight: bolder;">
                                total (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />)
                              </td>
                              <td></td>
                              <td>
                                {{ getTotalAmt(i.item.proposal_fees) }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p class="font-weight-bolder">
                          {{ i.item.footer_title }}
                        </p>
                        <p v-html=" i.item.footer_description "></p>
                      </div>

                      <!-- <header>
          hello
        </header>
        <div>
          hello
        </div> -->

                      <div id="InvoicepdfContent" v-if=" i.item.title == 'invoice' ">
                        <div style="margin-bottom: -3rem;" class="row">
                          <div class="col-md-12">
                            <div style="float: left;">
                              <address>
                                <img width="120" :src=" imgLogo " alt="" itemprop="logo" class="custom-logo" /><br />
                                <strong>Centrik Legalistic LLP</strong><br />
                                <span>E-11<br />
                                  LGF<br />
                                  Jangpura Extension<br />
                                  New Delhi - 110014</span><br />
                                <!---->
                                <br />
                                <!---->
                                <br />
                              </address>
                              <!-- <img :src="'https://storage.oas36ty.com/uploads/organization/SP51hmKqu3PZSevzqHpr9ITjaF8U5WQqoxWbWTs6.png'"/> -->
                            </div>
                            <div class="text-right" style="float: right;">
                              <h1>Invoice</h1>
                              <h4>
                                <strong>{{ i.item.invoice_number }}</strong>
                              </h4>
                              <b> balance due </b>
                              <br />
                              <span>
                                {{ i.item.sub_total }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />

                        <!-- </div> -->
                        <b-row>
                          <!-- text -->
                          <hr />
                          <!-- <div  class="row"> -->
                          <div class="col-md-12">
                            <div class="mt-20" style="float: left;">
                              <address>
                                Bill To<br />
                                <strong>{{ i.item.client.name }}</strong><br />
                                <span>{{ i.item.client.name }}</span><br />
                                <span>GSTIN:NA</span>
                              </address>
                              <!---->
                            </div>
                            <div class="mt-20" style="float: right;">
                              <p>
                                <strong>Invoice Date: </strong>
                                {{ i.item.invoice_date }}
                              </p>
                              <p class="m-t-10 text-right">
                                <strong>Due Date: </strong> {{ i.item.due_date }}
                              </p>
                            </div>
                          </div>
                          <!-- </div> -->
                        </b-row>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="table-responsive">
                              <table class="table table-striped invoice-table" style="cursor: pointer;">
                                <thead class="invoice-thead-tr">
                                  <tr class="invoice-thead-tr">
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Sl.No
                                    </th>
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Description
                                    </th>
                                    <th class="" style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Proposal Number
                                    </th>
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Amount
                                    </th>
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <th class="text-right" style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Total Amount(<font-awesome-icon icon="indian-rupee-sign"
                                        class="icon cursor-pointer" />)
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(  p, index  ) in   i.item.proposal  " :key=" p.id ">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ p.description }}</td>
                                    <td>{{ getPL(p.created_at, p.id) }}</td>
                                    <td>{{ getTotalAmt(i.item.proposal) }}</td>
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-right">
                                      {{ i.item.sub_total }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div class="row" style="border-radius: 0px;">
                          <div class="col-md-4"></div>
                          <div class="col-md-4"></div>
                          <div class="col-md-4 col-md-offset-8">
                            <p class="text-right">
                              <b>Sub-total (<font-awesome-icon icon="indian-rupee-sign"
                                  class="icon cursor-pointer" />):</b>
                              {{ i.item.sub_total }}
                            </p>
                            <!---->
                            <!---->
                            <p v-if=" i.item.pocket_expenses " class="text-right">
                              Out of pocket expense (<font-awesome-icon icon="indian-rupee-sign"
                                class="icon cursor-pointer" />):
                              {{ i.item.pocket_expenses }}
                            </p>
                            <p v-if=" i.item.adjustment_amt " class="text-right">
                              Adjustments (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />):
                              {{ i.item.adjustment_amt }}
                            </p>
                            <p class="text-right">
                              Total (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />): {{
                              i.item.total_amt }}
                            </p>
                            <!---->
                            <p class="text-right">
                              Balance Due (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />): {{
                              i.item.total_amt }}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <p>Notes :</p>
                            <p>{{ i.item.notes }}</p>
                            <!-- <hr> -->
                            <div v-if=" item.item.branch.bank_details != null ">
                              <p><b>Bank Details</b></p>
                              <!-- {{ item.item.branch.bank_details }} -->
                              <p class="m-0">
                                Account Name :
                                {{ item.item.branch.bank_details.account_name }}
                              </p>
                              <p class="m-0">
                                Account Number :
                                {{ item.item.branch.bank_details.account_number }}
                              </p>
                              <p class="m-0">
                                IFSC Code :
                                {{ item.item.branch.bank_details.ifsc_code }}
                              </p>
                              <!---->
                              <!---->
                              <p class="m-0">
                                Bank :
                                {{ item.item.branch.bank_details.bank_name }}
                              </p>
                              <p class="m-0">
                                Branch :
                                {{ item.item.branch.bank_details.branch_name }}
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4"></div>
                          <div class="col-md-4"></div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-md-12">
                            <p class="text-center">
                              This is a computer generated invoice and does not
                              require signature/stamp.
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <vue-html2pdf
          :show-layout="true"
          :float-layout="false"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="sample"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
   
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
        > -->
                      <!-- <section slot="pdf-content"> -->
                      <div style="
                                font-family: 'Times New Roman', Times, serif;
                                display: none;
                              " id="InvoicepdfContent2" v-if=" i.item.title == 'invoice' ">
                        <!-- <p>{{ i.item }}</p> -->
                        <!-- <div class=""> -->
                        <div style="margin-bottom: -3rem;" class="row">
                          <div class="col-md-12">
                            <div style="float: left;">
                              <address>
                                <img width="120" :src=" imgLogo " alt="" itemprop="logo" class="custom-logo" /><br />
                                <strong>Centrik Legalistic LLP</strong><br />
                                <span>E-11<br />
                                  LGF<br />
                                  Jangpura Extension<br />
                                  New Delhi - 110014</span><br />
                                <!---->
                                <br />
                                <!---->
                                <br />
                              </address>
                              <!-- <img :src="'https://storage.oas36ty.com/uploads/organization/SP51hmKqu3PZSevzqHpr9ITjaF8U5WQqoxWbWTs6.png'"/> -->
                            </div>
                            <div class="text-right" style="float: right;">
                              <h1>Invoice</h1>
                              <h4>
                                <strong>{{ i.item.invoice_number }}</strong>
                              </h4>
                              <b> balance due </b>
                              <br />
                              <span>
                                {{ i.item.sub_total }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />

                        <!-- </div> -->
                        <b-row>
                          <!-- text -->
                          <hr />
                          <!-- <div  class="row"> -->
                          <div class="col-md-12">
                            <div class="mt-20" style="float: left;">
                              <address>
                                Bill To<br />
                                <strong>{{ i.item.client.name }}</strong><br />
                                <span>{{ i.item.client.name }}</span><br />
                                <span>GSTIN:NA</span>
                              </address>
                              <!---->
                            </div>
                            <div class="mt-20" style="float: right;">
                              <p>
                                <strong>Invoice Date: </strong>
                                {{ i.item.invoice_date }}
                              </p>
                              <p class="m-t-10 text-right">
                                <strong>Due Date: </strong> {{ i.item.due_date }}
                              </p>
                            </div>
                          </div>
                          <!-- </div> -->
                        </b-row>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="table-responsive">
                              <table class="table table-striped invoice-table" style="cursor: pointer;">
                                <thead class="invoice-thead-tr">
                                  <tr class="invoice-thead-tr">
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Sl.No
                                    </th>
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Description
                                    </th>
                                    <th style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Amount
                                    </th>
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <th class="text-right" style="
                                              background-color: #000000a1 !important;
                                              color: #fff !important;
                                            ">
                                      Total Amount(<font-awesome-icon icon="indian-rupee-sign"
                                        class="icon cursor-pointer" />)
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{{ "1" }}</td>
                                    <td>{{ i.item.item_details }}</td>
                                    <td>{{ i.item.amount }}</td>
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                    <td class="text-right">
                                      {{ i.item.sub_total }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div class="row" style="border-radius: 0px;">
                          <div class="col-md-4"></div>
                          <div class="col-md-4"></div>
                          <div class="col-md-4 col-md-offset-8">
                            <p class="text-right">
                              <b>Sub-total (<font-awesome-icon icon="indian-rupee-sign"
                                  class="icon cursor-pointer" />):</b>
                              {{ getSubTotal(i.item) }}
                            </p>
                            <!---->
                            <!---->
                            <p v-if=" i.item.pocket_expenses " class="text-right">
                              Out of pocket expense (<font-awesome-icon icon="indian-rupee-sign"
                                class="icon cursor-pointer" />):
                              {{ i.item.pocket_expenses }}
                            </p>
                            <p v-if=" i.item.adjustment_amt " class="text-right">
                              Adjustments (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />):
                              {{ i.item.adjustment_amt }}
                            </p>
                            <p class="text-right">
                              Total (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />): {{
                              i.item.sub_total }}
                            </p>
                            <!---->
                            <p class="text-right">
                              Balance Due (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />): {{
                              i.item.sub_total }}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <p>Notes :</p>
                            <p>{{ i.item.notes }}</p>
                            <!-- <hr> -->
                            <div v-if=" item.item.branch.bank_details != null ">
                              <p><b>Bank Details</b></p>
                              <!-- {{ item.item.branch.bank_details }} -->
                              <p class="m-0">
                                Account Name :
                                {{ item.item.branch.bank_details.account_name }}
                              </p>
                              <p class="m-0">
                                Account Number :
                                {{ item.item.branch.bank_details.account_number }}
                              </p>
                              <p class="m-0">
                                IFSC Code :
                                {{ item.item.branch.bank_details.ifsc_code }}
                              </p>
                              <!---->
                              <!---->
                              <p class="m-0">
                                Bank :
                                {{ item.item.branch.bank_details.bank_name }}
                              </p>
                              <p class="m-0">
                                Branch :
                                {{ item.item.branch.bank_details.branch_name }}
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4"></div>
                          <div class="col-md-4"></div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-md-12">
                            <p class="text-center">
                              This is a computer generated invoice and does not
                              require signature/stamp.
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- </section>
                      </vue-html2pdf> -->
                      <!-- <p>{{ i.item.pnotes }}</p> -->
                    </b-card>
                  </template>
                  <template #cell(activity)=" { item } ">
                    <span v-if=" item.title == 'invoice' ">
                      {{ "Invoice" }}
                    </span>
                    <span v-else-if=" item.title == 'payment' ">
                      {{ "Payment" }}
                    </span>
                    <span v-else-if=" item.title == 'Expense' ">
                      {{ "Expense" }}
                    </span>
                    <span v-else>
                      {{ "Proposal" }}
                    </span>
                  </template>
                  <template #cell(status)=" { item } ">
                    <span v-if=" item.title == 'invoice' ">
                      <b-badge v-if=" getStatusForInvoice(item) != null "
                        :variant=" getStatusColor(getStatusForInvoice(item)) ">
                        {{ getStatusForInvoice(item) }}</b-badge>
                    </span>
                    <span v-if=" item.title == 'Expense' ">
                      <b-badge variant="danger">
                        Not Invoiced
                      </b-badge>
                      <!-- <b-badge v-if="getStatusForInvoice(item) != null"
                      :variant="getStatusColor(getStatusForInvoice(item))">
                      {{ getStatusForInvoice(item) }}</b-badge> -->
                    </span>
                    <!-- <span v-else-if="item.title == 'payment'">
                        {{ 'Payment' }}
                        </span>-->
                    <span v-if=" item.title == 'proposal' ">
                      <b-badge v-if=" getStatusForProposal(item) != null "
                        :variant=" getStatusColor(getStatusForProposal(item)) ">{{ getStatusForProposal(item) }}</b-badge>
                    </span>
                    <!-- {{ getStatus(item) }} -->
                  </template>
                  <template #cell(id)=" { item } ">
                    <span v-if=" item.title == 'proposal' ">
                      {{ getPL(item.created_at, item.id) }}
                    </span>
                    <span v-else-if=" item.title == 'payment' ">
                      {{ item.id }}
                    </span>
                    <span v-else-if=" item.title == 'Expense' ">
                      {{ item.id }}
                    </span>
                    <span v-else>
                      <!-- <span v-else> -->
                      <span style="text-transform:none;">

                        {{ item.invoice_number }}
                      </span>
                      <!-- </span> -->
                    </span>
                  </template>
                  <template #cell(date)=" { item } ">
                    <span v-if=" item.title == 'proposal' ">
                      {{ item.proposal_date }}
                    </span>
                    <span v-else-if=" item.title == 'payment' ">
                      {{ item.pay_date }}
                    </span>
                    <span v-else-if=" item.title == 'Expense' ">
                      {{ item.date }}
                    </span>
                    <span v-else>
                      {{ item.due_date }}
                    </span>
                  </template>
                  <template #cell(amount)=" { item } ">
                    <!-- {{ item.total }} -->
                    <span v-if=" item.title == 'proposal' ">
                      {{ getTotalAmt(item.proposal_fees) }}
                    </span>
                    <span v-else-if=" item.title == 'payment' ">
                      <!-- {{ getPaymentAmt(item.record_pay_invoice) }} -->
                      {{ item.amount }}
                    </span>
                    <span v-else-if=" item.title == 'Expense' ">
                      <!-- {{ getPaymentAmt(item.record_pay_invoice) }} -->
                      {{ item.expense }}
                    </span>
                    <span v-else>
                      {{ item.total_amt }}
                    </span>
                  </template>
                  <template #cell(notes)=" { item } ">
                    <span v-if=" item.title == 'proposal' ">
                      {{ item.internal_notes }}
                    </span>
                    <span v-else-if=" item.title == 'payment' ">
                      {{ item.notes }}
                    </span>
                    <span v-else-if=" item.title == 'Expense' ">
                      {{ '' }}
                    </span>
                    <span v-else>
                      {{ item.notes }}
                    </span>
                  </template>
                </b-table>
                <b-pagination :total-rows=" allProposals.length " :per-page=" perPageAccounts "
                  v-model=" currentPageProposalTable " class="mb-0 mt-1 mt-sm-0 " first-number last-number align="right"
                  prev-class="prev-item" next-class="next-item">

                </b-pagination>
                <div class="bg-light">
                  <div id="total_invoice_amount" class="text-bolder my-1 p-2 d-flex bg-light" style="
                            justify-content: space-evenly;
                            margin-left: 37rem;
                            text-transform: initial;
                            font-size: 16px;
                          ">
                    Outstanding as on date
                    <div class="text-right">
                      {{ getTotalInvoice() }}
                    </div>
                  </div>
                </div>

                <div v-if=" item.item.status_master.type != 'closed' " class="text-right">
                  <!--  <b-button size="sm" v-if="allProposals.length > 0" class='mr-1' @click="() => {
                    invoiceTitle = 'add',
                    invoice.client = item.item.company,
                    invoice.gstNumber = '',
                    invoice.state = null,
                    invoice.id = getLargestId(),
                    invoice.invoice_date = null,
                    // invoice.due_date = null,
                    invoice.billing_address = null,
                    invoice.notes = null,
                    invoice.item_details = null,
                    $refs['invoice-modal'].show()
                    invoice.item_details = item.item.subject
                    invoice.amount = null
                    invoice.taxble_amt = null
                    invoice.discount = null
                    invoice.igst = null
                    invoice.igst_amt = null
                    invoice.sgst = null
                    invoice.sgst_amt = null
                    invoice.cgst = null
                    invoice.cgst_amt = null
                    invoice.utgst = null
                    invoice.utgst_amt = null
                    invoice.total_amt = 0
                    invoice.sub_total = 0
                    invoice.pocket_expense = null,
                      invoice.expense_details = null,
                      invoice.adjustments = 0;
                    invoice.total = 0
                  
                  
                    // getAmt()
                    // invoice.amount = getTotalAmt(i.item.proposal_fees)
                  }" variant="primary">
                    Create Invoice
                  </b-button> -->
                  <AddExpenseLeads :task_id=" Number(taskId) " />
                  <b-button size="sm" class="mr-1" variant="primary" v-b-modal.modal-expense-leads>
                    Add Expense
                  </b-button>
                  <!-- <b-button size="sm" class="mr-1" variant="primary" @click="
                  () => {
                    payment.title = 'add';

                    payment.payment.forEach((element) => {
                      element.tds = 0;
                      element.amount = 0;
                    });
                    payment.client = item.item.company;
                    payment.mode = payment_modes[0];
                    $refs['payment-modal'].show();
                  }
                ">
                  Record payment
                </b-button> -->
                  <b-button size="sm" variant="primary" @click="
                    () => {
                      openModal('proposal-modal');
                      psubject = item.item.subject;
                      $store.state.clients.latestCreated = item.item.company
                      pclient = $store.state.clients.latestCreated
                      $store.state.contactPeople.latestCreated = item.item.contact_person
                      pcontact = $store.state.contactPeople.latestCreated
                      autofillClient();
                      autofillContact();
                      amountField.splice(0, 1, {
                        amount: null,
                        description: item.item.subject,
                      });
                    }
                  ">Create Proposal</b-button>
                </div>
              </b-tab>
              <b-tab id="member-timesheet">
                <template #title>
                  {{ 'COST-SHEET' }} <b-badge style="margin-left: 0.5rem" v-if=" item.item.time_sheet.length > 0 "
                    variant="secondary">
                    {{item.item.time_sheet.length}}
                  </b-badge>

                </template>
                <div id="time_sheet_summary_table_5439_wrapper"
                  class="dataTables_wrapper mt-2 form-inline dt-bootstrap no-footer">
                  <div class="row">
                    <div class="col-sm-6"></div>
                    <div class="col-sm-6"></div>
                  </div>
                  <b-row style="width:100%;">

                    <b-col md="12">
                      <div class="table-responsive">

                        <table id="time_sheet_summary_table_5439"
                          class="table normal-table timesheet-summary-table no-footer" role="grid">
                          <thead>
                            <tr role="row">
                              <th class="text-center sorting_disabled" rowspan="1" colspan="1" aria-label=""
                                style="width: 20%;"></th>
                              <th class="text-center sorting_disabled" rowspan="1" colspan="1"
                                aria-label="Time Summary ()" style="width: 20%;">Time Summary (<feather-icon
                                  icon="ClockIcon" />)</th>
                              <th class="text-center sorting_disabled" rowspan="1" colspan="1" aria-label="Time cost ()"
                                style="width: 20%;">Time cost (₹)
                              </th>
                              <th class="text-center sorting_disabled" rowspan="1" colspan="1"
                                aria-label="Contribution ()" style="width: 20%;">Contribution (₹)
                              </th>
                              <th class="text-center sorting_disabled" rowspan="1" colspan="1"
                                aria-label="Profit \ Loss ()" style="width: 20%;">Profit \ Loss (₹)</th>
                            </tr>
                          </thead>
                          <tr>
                            <th class="text-center">TOTAL</th>
                            <th class="text-center pl-0"> {{getTotalTime(item.item.time_sheet)}}</th>
                            <th class="text-center pl-0">{{getTotalCost(getUniqueTime(item.item.time_sheet))}}</th>
                            <th class="text-center pl-0">{{getTotalContri(item.item.time_sheet)}}</th>
                            <th class="text-center pl-0">
                              0.00
                            </th>
                          </tr>
                          <tbody>
                            <tr class="task-time-spent-row odd" v-for="  data   in   getUniqueTime(item.item.time_sheet)   "
                              :id=" Number(data.id + 1) " role="row">
                              <!-- <div > -->

                              <td class=" text-center">{{ getTotalData(data.user_id) }}</td>
                              <td class=" text-center">{{ getUserTotal(data.user_id,item.item.time_sheet) }}</td>
                              <td class=" text-center">{{ getCostPerHr($store.state.users.all.find(e => e. id ===
                                data.user_id).monthly_cost) }}</td>
                              <td class=" text-center">{{ getUserTimeContri(data.user_id,item.item.time_sheet) }}</td>
                              <td class=" text-center"><span class="">0.00</span></td>
                              <!-- </div> -->
                            </tr>
                            <div style="    width: 470%;
    text-transform: none;" class="text-center mt-1" v-if=" item.item.time_sheet.length === 0 ">There are no records to
                              show</div>
                          </tbody>
                        </table>
                      </div>

                      <div id="time_sheet_summary_table_5439_processing" class="dataTables_processing"
                        style="display: none;"><i class="zmdi zmdi-flickr zmdi-hc-spin"></i> Hang on. Fetching time sheet
                        Summary...</div>
                    </b-col>
                  </b-row>

                  <div class="row">
                    <div class="col-sm-5"></div>
                    <div class="col-sm-7"></div>
                  </div>
                </div>
                <div class="card aos-animate" tr="[object Object]" row="[object Object]" table="[object Object]">
                  <div class="header ml-2 mt-1 mb-2">
                    <h4>Time Sheet Details</h4>
                    <hr style="border-color:#F75949!important;">
                  </div>
                  <div class="body">
                    <div class="row clearfix">
                      <div class="col-md-12 padding-0">
                        <div class="col-md-9 top-joined">
                          <div id="member_time_sheet_table_5439_wrapper"
                            class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            <div class="row">
                              <div class="col-sm-6"></div>
                              <div class="col-sm-6"></div>
                            </div>
                            <div class="row" style="min-width:137%;">
                              <div class="col-md-9">
                                <table id="member_time_sheet_table_5439" class="table normal-table dataTable no-footer"
                                  role="grid">
                                  <thead>
                                    <tr role="row">
                                      <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Date"
                                        style="width: 15%;">Date</th>
                                      <th class="sorting" tabindex="0" aria-controls="member_time_sheet_table_5439"
                                        rowspan="1" colspan="1"
                                        aria-label="Description: activate to sort column ascending" style="width: 40%;">
                                        Description</th>
                                      <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Employee"
                                        style="width: 15%;">Employee</th>
                                      <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Hours"
                                        style="width: 15%;">Hours</th>
                                      <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Cost ()"
                                        style="width: 15%;">Cost (₹)
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr class="task-time-spent-row odd" v-for="  data   in   item.item.time_sheet  "
                                      :id=" String(Number(data.id + 1)) " role="row">
                                      <td style="width:19%;">{{ getFormatedDate(data.date) }}</td>
                                      <td><span class="timesheet-desc" v-b-tooltip.hover=" data.description ">
                                          {{data.description}}</span></td>
                                      <td>{{$store.state.users.all.find(e => e.id === data.user_id).name}}</td>
                                      <td>{{data.time_devoted.substr(0,data.time_devoted.length - 3)}}</td>
                                      <td>{{getContri(getCostPerHr($store.state.users.all.find(e => e.id ===
                                        data.user_id).monthly_cost), data.time_devoted)}}</td>
                                    </tr>
                                    <div style="    width: 610%;
    text-transform: none;" class="text-center mt-1" v-if=" item.item.time_sheet.length === 0 ">There are no records to
                                      show</div>
                                  </tbody>
                                </table>
                                <div id="member_time_sheet_table_5439_processing" class="dataTables_processing"
                                  style="display: none;"><i class="zmdi zmdi-flickr zmdi-hc-spin"></i> Hang on. Fetching
                                  time sheet entries...</div>
                              </div>
                              <div class="col-md-3">
                                <div class="panel panel-default">
                                  <div class="panel-heading">Total Hours Spent (<feather-icon icon="ClockIcon" />)</div>
                                  <div class="panel-body">
                                    {{getTotalTime(item.item.time_sheet)}}
                                  </div>
                                </div>
                                <div class="panel panel-default">
                                  <div class="panel-heading">Total Cost Incurred (₹)
                                  </div>
                                  <div class="panel-body">
                                    {{getTotalContri(item.item.time_sheet)}}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-5"></div>
                              <div class="col-sm-7"></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
         

          </div>

          <!-- </b-card-actions> -->
        </template>


        <!-- </template> -->

        <template #cell(id)=" data ">
          <b v-if=" (data.item.task_read == null) ">
            {{ data.item.id }}
          </b>

          <span v-else>
            {{ data.item.id }}
          </span>
        </template>
        <template #cell(priority)=" data ">

          <!--   <b-icon-star-fill style="margin-top:3px;" :variant="priorityVariant(data.item.priority)" />-->
         <div style="margin-left:1.7rem;" v-if=" setPrivileges.onRowEdit === false || (data.item.status_master.type === 'closed' || data.item.status_master.type === 'completed')">
            <span>{{ !data.item.priority ? "-" : data.item.priority }}</span>
            <FeatherIcon :class=" { 'd-none': !data.item.priority } " :fill=" SetColor(data.item.priority) "
              :style=" { color: SetColor(data.item.priority) } " icon="StarIcon" />
          </div>

          <!--   <b-icon-star-fill style="margin-top:3px;" :variant="priorityVariant(data.item.priority)" />-->
          <b-dropdown v-else v-ripple.400=" 'rgba(113, 102, 240, 0.15)' "
            variant="flat-dark">
            <template #button-content>
              <span>{{ !data.item.priority ? "-" : data.item.priority }}</span>
              <FeatherIcon :class=" { 'd-none': !data.item.priority } " :fill=" SetColor(data.item.priority) "
                :style=" { color: SetColor(data.item.priority) } " icon="StarIcon" />
            </template>
            <b-dropdown-item v-for=" impId  in  importance.slice().reverse() " :key=" impId.id " @click="
              inlineUpdate($event, 'open', impId.id, data.item.priority, data.item.id)
            ">
              <span>
                {{ impId.id }}
                <feather-icon :fill=" SetColor(impId.id) " :style=" { color: SetColor(impId.id) } " :icon=" impId.star " />{{
                SetText(impId.id) }}
              </span>
            </b-dropdown-item>
          </b-dropdown>
          <!---->

          <!---->
        </template>
        <template #cell(iconAttach)=" item ">
          <feather-icon v-b-tooltip.hover=" 'Attachment exists' " icon="PaperclipIcon"
            v-show=" item.item.attachments.length > 0 "></feather-icon>
        </template>
        <!-- <template #cell(checkbox)="item">
            <input type="checkbox" name="" id="">
          </template> -->
        <template #cell(client)=" item ">
          <span class="client-name234" v-if=" item.item.company != null "
            v-b-tooltip.hover.top=" item.item.company.name ">

            <b v-if=" item.item.task_read == null ">

              {{ item.item.company.name }}
            </b>


            <span v-else>
              {{ item.item.company.name }}
            </span>
          </span>
          <span class="contact-name234" v-if=" item.item.company == null " v-b-tooltip.hover.top=" 'Contact person' ">
            <b v-if=" item.item.task_read == null ">
              {{
              item.item.contact_person ? item.item.contact_person.name : ""
              }}
            </b>

            <span v-else>
              {{
              item.item.contact_person ? item.item.contact_person.name : ""
              }}
            </span>
          </span>
        </template>
        <template #cell(subject)=" data ">
          <span class="subject-lead" v-b-tooltip.hover.top=" data.item.subject ">
            <!-- <b-link @click="row.toggleDetails"> {{ data.item.subject.substring(0, 23) }}</b-link> -->
            <b v-if=" data.item.task_read == null ">
              {{ data.item.subject }}
            </b>
            <!-- <b v-else-if="data.item.checkRead == false">
              {{ data.item.subject.substring(0, 23) }}
            </b> -->
            <span v-else>
              {{ data.item.subject }}
            </span>
          </span>
          <!-- <b-link @click="editLead(data.item.id)"> {{ data.item.subject.substring(0, 23) }}</b-link> -->

          <!--  <div>
              <small>
                <span  v-b-tooltip.hover.v-secondary="data.item.description"
                  v-html="data.item.description.substring(0, 20) + '....'"></span>
              </small>

            </div>-->
        </template>
        <template #cell(postDate)=" data ">
          <b v-if=" data.item.task_read == null ">
            {{ formatDate(data.item.created_at) }}
          </b>

          <span v-else>
            {{ formatDate(data.item.created_at) }}
          </span>

          <!-- {{ data.item.created_at.substring(0,10) }} -->
        </template>

        <template #cell(daysLeft)=" data ">
        <b-button v-b-modal.modal-due-date class="d-none" id="button-due-date"></b-button>

          <!-- <span style="margin-left:2rem;" v-if=" setPrivileges.onRowEdit === false || (data.item.status_master.type === 'closed' || data.item.status_master.type === 'completed')" :class="
            {
              'text-red': DaysLeft(data.item.created_at, data.item.due_date) <= 0,
                      }
          ">
            {{ DaysLeft(data.item.created_at, data.item.due_date) + " days" }}
          </span> -->
          <span style="margin-left:2rem;" v-if="  (data.item.status_master.type === 'closed' || data.item.status_master.type === 'completed')"
          class=""
          >
            <!-- {{ DaysLeft(data.item.created_at, data.item.due_date) + " days" }} -->
            -
          </span>
          <span style="margin-left:2rem;" v-if=" setPrivileges.onRowEdit === false && data.item.status_master.type === 'open'" :class="
            {
              'text-red': DaysLeft(data.item.created_at, data.item.due_date) <= 0,
                      }
          ">
            {{ DaysLeft(data.item.created_at, data.item.due_date) + " days" }}
          </span>
          
          <span v-if=" setPrivileges.onRowEdit === true && data.item.status_master.type === 'open'">
          <b-dropdown  id="days_left_drop" menu-class="w-100" class="w-100"
            ref="dropdown" variant="flat-dark">
            <!-- <featherIcon icon="StarIcon" /> -->
            <!-- <template #button-content>

  {{  }}
</template> -->
            <template #button-content>
              <span :class="
                {
                  'text-red': DaysLeft(data.item.created_at, data.item.due_date) < 0,
                              }
              ">
                {{ DaysLeft(data.item.created_at, data.item.due_date) + " days" }}
              </span>
            </template>
            <template v-slot:default>
              <b-dropdown-item @click=" inline_due_date('today', data.item.id) ">
                <span> Today </span>
              </b-dropdown-item>
              <b-dropdown-item @click=" inline_due_date('tomorrow', data.item.id) ">
                <span> Tomorrow </span>
              </b-dropdown-item>
              <!-- <b-dropdown-item @click="open_datepicker()">
                <span>

                  Custom
                </span>
                
              </b-dropdown-item> -->

              <!-- <input type="date" id="open_datepicker"> -->

              <!-- <b-calendar style="  
                  position: absolute;
                  will-change: transform;
                  /* top: 129px;
                  left: 99px;
                  transform: translate3d(0px, -339px, 0px); */
                  " v-model="startDate2" :min="data.item.created_at"  @input="closeMe(startDate2, data.item.id)
                  " locale="en-US"></b-calendar> -->
              <div @hide=" handleHide($event) " @hidden=" isCloseable = false ">
                <b-dropdown-form>
                  <!--
 <b-form-group id="open_datepicker2" >
                    <VueDatePicker format="DD-MM-YYYY" :minDate="currentDate" style="border:1px solid #d8d6de;border-radius: 0.357rem;" ref="dp1" id="open_datepicker2" placeholder="" class="form-control" v-model="startDate2" :min="data.item.created_at" @input="closeMe(startDate2, data.item.id)
                  " :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" />
                  </b-form-group>
                    -->
                  <!-- <input type="date"> -->
                  <!-- <input type="text" class="form-control" placeholder="Choose Date" @click="document.getElementById('datepickr').click()"> -->
                  <!-- <div>

                      <VueDatePicker format="DD-MM-YYYY" :minDate="currentDate" style="border:1px solid #d8d6de;border-radius: 0.357rem;" id="datepickr" placeholder="Date" v-model="startDate2" :min="new Date()" @input="inline_due_date(startDate2, data.item.id)"/>
                    </div> -->
                  <input type="text" class="form-control" style="cursor: pointer; border: 1px solid black"
                    @click=" openCalendar(data.item.id) " placeholder="Choose Date" />
                  <VueDatePicker format="DD-MM-YYYY" style="visibility: hidden"
                    @input=" inline_due_date(startDate2, data.item.id) " v-model=" startDate2 "
                    :id=" 'vue-date-pickr' + data.item.id " :minDate=" currentDate " />
                  <!-- <flat-pickr style="border:1px solid"
                    v-model="startDate2"
                    :config="{ minDate: 'today', altInput: false }"
                    id="flatpickr-date"
                    class="form-control cursor-pointer border-bottom"
                    @input="inline_due_date(startDate2, data.item.id)"
                    placeholder="Custom Date"
                  /> -->
                  <!-- <input type="text" id="date-picker" class="form-control" data-toggle="date" placeholder="Choose Date">     -->
                </b-dropdown-form>
              </div>
              <!-- <DropdownDatepicker /> -->
              <!-- <b-row>
          <b-col cols="12" class="my-2" > -->
              <!-- <b-button @click="document.getElementById('enable_datepicker').click">Choose Date</b-button>{{startDate2}} -->
              <!-- <b-dropdown-item @click='closeMe(startDate2, data.item.id)' >
          <flat-pickr class="form-control"  v-model="startDate2"  placeholder="Choose" id="enable_datepicker"   
              />
              </b-dropdown-item> -->
              <!-- </b-col>
                </b-row> -->
            </template>
          </b-dropdown>
          </span>

          <!-- {{ DaysLeft(data.item.created_at, data.item.due_date) + ' days' }} -->
        </template>

        <template #cell(employees)=" data ">
          <span class="d-flex w-100 justify-content-center">
            
            <div class="mr-1" v-if="   (data.item.status_master.type === 'closed' || data.item.status_master.type === 'completed')">
              -
              <!-- <span v-if=" data.item.users.length == 0 ">{{ "-" }}</span>
              <b-avatar v-if=" data.item.users.length > 0 " v-for=" avatar  in  data.item.users " size="22px" :key=" avatar.name "
                class="pull-up" :src=" avatar.avatar " :title=" avatar.name ">
              </b-avatar> -->
            </div>
            <div class="mr-1" v-if=" setPrivileges.onRowEdit === false && data.item.status_master.type === 'open'">
              
              <span v-if=" data.item.users.length == 0 ">{{ "-" }}</span>
              <b-avatar v-if=" data.item.users.length > 0 " v-for=" avatar  in  data.item.users " size="22px" :key=" avatar.name "
                class="pull-up" :src=" avatar.avatar " :title=" avatar.name ">
              </b-avatar>
            </div>

            <b-dropdown v-if=" setPrivileges.onRowEdit === true && data.item.status_master.type === 'open'" v-ripple.400=" 'rgba(113, 102, 240, 0.15)' "
              variant="flat-dark" class="on-row-users">
              <template #button-content>
                <!-- {{user}} -->
                <!-- <b-avatar-group  v-for="user in assignedUsers" class="w-100" > -->

                <span v-if=" data.item.users.length == 0 ">{{ "-" }}</span>
                <!-- {{avatar.avatar}} -->
                <b-avatar v-if=" data.item.users.length > 0 " v-for=" avatar  in  data.item.users.slice(0,2) " size="22px"
                  :key=" avatar.name " class="pull-up" :src=" avatar.avatar " :title=" avatar.name ">
                  <!-- {{user}} -->
                </b-avatar>
                <b-badge v-b-tooltip.hover="getAssigneeString(data.item.users)" v-if="data.item.users.length > 2 && getMoreUsers(data.item.users) > 0">+{{ getMoreUsers(data.item.users) }}</b-badge>
                <!-- </b-avatar-group> -->

                <!-- <b-avatar size="28px" class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-5.jpg')" />
                <b-avatar size="28px" class="pull-up" variant="primary"
                  :src="require('@/assets/images/portrait/small/avatar-s-7.jpg')" />
                <b-avatar size="28px" class="pull-up"
                  :src="require('@/assets/images/portrait/small/avatar-s-10.jpg')" /> -->
              </template>

              <b-form-input v-model.trim=" search " placeholder="Search the User" @keyup=" paginated_users_to_assign " />
              <b-dropdown-item v-for=" employee  in  paginated_users_to_assign "  :key="String(Number(employee.id+1))"
                @click=" inline_user_update(employee.id, data.item.id) ">
                <a href="#" style="color: black">
                  <b-avatar size="28px" class="pull-up" :src=" employee.avatar " />&emsp;
                  {{ employee.name.substr(0,12) }}
                </a>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </template>
        <template #cell(status)=" data ">
          
          <b-badge v-if=" DaysLeft(data.item.created_at, data.item.due_date) >= 0 && data.item.status_master.type === 'open'" :variant="
            buttonVariant(
              data.item.status_master != null
                ? data.item.status_master.type
                : ''
            )
          ">
            <!-- <span v-if="DaysLeft(data.item.created_at, data.item.due_date) <= 0">

              </span> -->
            {{
            data.item.status_master != null ? data.item.status_master.type : 'open'
            }}
          </b-badge>
          <b-badge v-else-if=" DaysLeft(data.item.created_at, data.item.due_date) < 0 && data.item.status_master.type === 'open'" :variant="
           'warning'
          ">
            <!-- <span v-if="DaysLeft(data.item.created_at, data.item.due_date) <= 0">

              </span> -->
          Overdue
          </b-badge>
          <b-badge v-else :variant="buttonVariant(
              data.item.status_master != null
                ? data.item.status_master.type
                : ''
            )">
            {{ data.item.status_master.type }}
          </b-badge>
        </template>
        <!--<template #cell(status)="data">
             <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" :variant="buttonVariant(data.item.status)"  >
              {{ data.item.status }}
            </b-button>
          </template>

          <template #cell(actions)="data">
            <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
              </template>

              <b-dropdown-item>
                <feather-icon icon="EditIcon" /> <span class="align-middle ml-70" variant="outline-secondary" @click="
                  isEditSidebarActive = true;
                editItem = data.item;">Edit</span>
              </b-dropdown-item>

              <b-dropdown-item>
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50" variant="outline-danger" @click="destroyItem(data.item.id)">Delete</span>
              </b-dropdown-item>

            </b-dropdown>

          </template>-->
        <!--  <div class="mb-2 text-center">
          <b-spinner label="Loading..." variant="primary" v-if="isLoading" />
        </div>-->
      </b-table>
      <div v-if=" leadsData.length > 0 " class="mx-2 mb-2">
        <b-row>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <!-- <span class="text-muted">Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
            <b-pagination v-model=" currentPage " :total-rows=" totalCount " :per-page=" perPage " first-number
              last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
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
      <!-- <inner-page :edit-lead.sync="editLead"/> -->
    </b-card>
    <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
    <div class="text-center">
      <b-spinner v-if=" isLoading " />
    </div>
    <b-modal no-close-on-backdrop id="proposal-modal" ref="proposal-modal" size="lg" title="Add proposal" hide-footer>
      <!-- <b-card-body> -->
      <ValidationObserver #default=" { handleSubmit } " ref="refFormObserver">
        <b-form @submit.prevent=" handleSubmit(addProposal) ">
          <b-row>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="client" vid="clients" rules="required">

                <b-form-group>
                  <template #label>
                    Client *
                    <feather-icon icon="EditIcon" class="cursor-pointer" @click="
                      () => {
                        (ClientisEditSidebarActive = true),
                          (editItemClient = pclient);
                      }
                    " />
                  </template>
                  <v-select id="clients" v-on:input=" autofillClient " label="name" v-model=" pclient " 
                    placeholder="Search Client" class="select-size-md my-custom-select" :options=" show_companys ">
                    <template #list-header>
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" />
                          New Client</a>
                      </div>
                    </template>
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="contact" vid="clients" rules="required">

              <b-form-group label="Contact *">
                <v-select v-on:input=" autofillContact " v-model=" pcontact "  placeholder="Search Contact"
                  class="select-size-md my-custom-select" label="name" :options=" show_contactPerson ">
                  <template #list-header>
                    <div class="ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                      <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                      <a href="#">
                        <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" />
                        New Contact</a>
                    </div>
                  </template>
                </v-select>
                <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
              </b-form-group>
              </ValidationProvider>
            </b-col>
            <!-- </b-card-body> -->
          </b-row>
          <b-row>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="client" vid="clients" rules="required">

              <b-form-group label="Client Name *" class="my-custom-select">
                <b-form-input v-model=" pname "  placeholder="Enter Client Name" />
                <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                <!-- </b-form-input> -->
              </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="concerned person" vid="clients" rules="required">

              <b-form-group label="Concerned Person *" class="my-custom-select">
                <b-form-input v-model=" pperson "  placeholder="Enter Concerned Person" />
                <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                <!-- </b-form-input> -->
              </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Proposal Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker format="YYYY-MM-DD" :minDate=" currentDate "
                  style="border:1px solid #d8d6de;border-radius: 0.357rem;" id="proposalDate" v-model=" pdate " />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="address" vid="address" rules="required">
                <b-form-group label="Address *" class="my-custom-select">
                  <b-form-textarea   id="address" v-model=" paddress " 
                    placeholder="Enter Address" />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                  <!-- </b-form-textarea> -->
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Subject">
                <b-form-input v-model="  psubject " placeholder="Enter Subject" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Prephase">
                <b-form-input v-model=" pphrase " placeholder="Enter Prephase" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-for="(  items, index  ) in   proposalFields  " :key=" items.proposal ">
            <b-col md="12">
              <b-form-group label="Title">
                <b-form-input v-model=" items.title " placeholder="Enter Title" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Description">
                <quill-editor v-model=" items.desc " :options=" editorOption "></quill-editor>
              </b-form-group>
              <div class="text-right">
                <b-button size="sm" @click=" removeProposal(index) " variant="outline-primary">
                  Remove
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="px-1" md="12">
              <div class="actions-proposal my-1 p-2 d-flex justify-content-center bg-light">
                <b-button size="sm" variant="primary" @click=" addProposalField() ">
                  <span class="text-nowrap">
                    Add Proposal Section</span>
                </b-button>
                <b-button @click="
                  () => {
                    openModal('list-templates-modal');
                  }
                " v-show=" proposalFields.length === 0 " size="sm" class="ml-1" variant="primary">
                  <span class="text-nowrap">
                    Choose From Templates</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row style="
                      border-bottom: inset;
                      border-color: #f75949;
                      margin-left: 0rem;
                      margin-bottom: 1rem;
                      margin-right: 0.5rem;
                    ">
            <span style="margin-bottom: 0.5rem;" class="text-uppercase">
              fees details
            </span>
          </b-row>
          <!-- <hr style="color:#f75949"> -->
          <b-row v-for="(  amount, index  ) in   amountField  " :key=" index ">
            <b-col md="8">
              <b-form-group label="Description">
                <b-form-input v-model=" amount.description " placeholder="Enter Description"  class="my-custom-select"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex flex-column" md="4">
              <ValidationProvider #default=" validationContext " name="amount" vid="amount" rules="required">
                <b-form-group label="Amount *" class="my-custom-select *">
                  <b-form-input type="number" id="amount"  
                    v-model=" amount.amount " placeholder="Enter Amount" step="any" />

                  <!-- </b-form-input> -->
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <div class="text-right">
                <b-button size="sm" v-show=" amountField.length > 1 " @click=" removeAmount(index) "
                  variant="outline-primary">
                  Remove
                </b-button>
                <b-button size="sm" v-show=" index === amountField.length - 1 " class="ml-1" @click=" addAmount() "
                  variant="primary">
                  Add more
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row v-show=" amountField.length > 1 " class="my-1">
            <b-col md="8">
              <div class="bg-light text-right p-1">Total</div>
            </b-col>
            <b-col md="4">
              <div class="bg-light p-1">
                {{ totalAmount }}
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Title">
                <b-form-input v-model=" pfootertitle " placeholder="Enter Footer Title" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Description">
                <quill-editor v-model=" pfooterdesc " :options=" editorOption "></quill-editor>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <!-- <ValidationProvider #default=" validationContext " name="pnotes" vid="pnotes" rules="required"> -->

              <b-form-group label="Internal Notes (Not visible for clients)" class="my-custom-select">
                <b-form-input id="pnotes" v-model=" pnotes " placeholder="Enter Notes" >
                </b-form-input>
                <!-- <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback> -->
              </b-form-group>
              <!-- </ValidationProvider> -->
            </b-col>
          </b-row>
          <b-row>
            <b-col class="py-1 d-flex justify-content-end" md="12">
              <div>
                <b-button size="sm" class="mr-1" variant="primary" @click=" $refs['proposal-modal'].hide() ">
                  <span class="text-nowrap"> Cancel</span>
                </b-button>
                <b-button v-if="proposalFields.length > 0" :disabled="$store.state.proposals.isLoading" size="sm" class="mr-1" variant="primary" @click="saveAsTemplate()">
                  <span class="text-nowrap"> Save as Template</span>
                  <b-spinner v-if="$store.state.proposals.isLoading" small style="margin-left:0.5rem;"></b-spinner>
                </b-button>
                <b-button size="sm" variant="primary" type="submit" :disabled="$store.state.proposals.isLoading">
                  <span class="text-nowrap"> Create</span>
                  <b-spinner small class="ml-1" v-if="$store.state.proposals.isLoading" />

                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-modal>

    <b-modal no-close-on-backdrop id="invoice-modal" ref="invoice-modal" size="lg" hide-footer>
      <template #modal-title>
        {{ invoiceTitle == "add" ? "Add invoice" : "edit invoice" }}
      </template>
      <!-- <b-card-body> -->
      <ValidationObserver #default=" { handleSubmit } " ref="refFormObserver">
        <b-form @submit.prevent="
          handleSubmit(invoiceTitle == 'add' ? addInvoice : updateInvoice)
        ">
          <b-row>
            <b-col md="4">
              <ValidationProvider v-if=" invoiceTitle == 'add' " #default=" validationContext " name="client"
                vid="invoice_client" rules="required">

                <b-form-group>
                  <template #label>
                    Client *
                    <!-- <feather-icon icon="EditIcon" class="cursor-pointer" @click="() => {
                      ClientisEditSidebarActive = true,
                        editItemClient = pclient
                    }" /> -->
                  </template>
                  <v-select v-on:input=" autofillClient " label="name" v-model=" invoice.client " 
                    placeholder="Search Client" class="select-size-md my-custom-select" id="invoice_client" :options=" show_companys ">
                    <template #list-header>
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" />
                          New Client</a>
                      </div>
                    </template>
                  </v-select>
                  <b-form-invalid-feedback class="d-block">

                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <b-form-group label="Client Name" v-else>
                <b-form-input readonly v-model=" invoice.client_name "></b-form-input>
              </b-form-group>

            </b-col>
            <b-col md="4">
              <b-form-group label="Client GST Number">
                <b-form-input @input=" pan " v-bind:class="
                  (invoice.gstNumber.length > 0 &&
                    invoice.gstNumber.length !== 15) ||
                    (invoice.gstNumber.length === 15 && gsterr === true)
                    ? 'is-invalid'
                    : ''
                " v-model=" invoice.gstNumber " placeholder="Client GST Number" class="my-custom-select">
                </b-form-input>
                <span v-if="
                  (invoice.gstNumber.length > 0 &&
                    invoice.gstNumber.length !== 15) ||
                    (invoice.gstNumber.length === 15 && gsterr === true)
                " class="d-block invalid-feedback" id="errmsg">Invalid gst number</span>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <template #label> State </template>
                <v-select @input=" getStateCode " label="name"  v-model=" invoice.state " placeholder="Search State"
                  class="select-size-md my-custom-select" :options=" allStates ">
                </v-select>
              </b-form-group>
            </b-col>
            <!-- </b-card-body> -->
          </b-row>
          <b-row>
            <b-col md="4">
              <b-form-group v-if=" invoiceTitle == 'add' ">
                <template #label>
                  Invoice Number
                  <feather-icon icon="EditIcon" @click="
                    () => {
                      $refs['invoice-charges-modal'].show();
                    }
                  " />
                </template>
                <b-form-input v-model=" prefixPlusid " placeholder="Invoice Number" class="my-custom-select" />

                <!-- </b-form-input> -->
              </b-form-group>
              <b-form-group label="Invoice Number" v-else>
                <b-form-input readonly v-model=" invoice.id "></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Invoice Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker format="YYYY-MM-DD" :minDate=" currentDate "
                  style="border:1px solid #d8d6de;border-radius: 0.357rem;" id="proposalDate" v-model=" invoice.pdate " />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Due Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker format="YYYY-MM-DD" :minDate=" currentDate "
                  style="border:1px solid #d8d6de;border-radius: 0.357rem;" id="proposalDate"
                  v-model=" invoice.due_date " />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Billing Address">
                <b-form-input v-model=" invoice.billing_address " placeholder="Billing Address" class="my-custom-select" />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Notes">
                <b-form-input v-model=" invoice.notes " placeholder="Notes" class="my-custom-select" />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="" md="12">
              <div class="table-responsive bg-light">
                <table border="0" id="invoice-table" class="table">
                  <thead style="
                              background-color: ##edededd9 !important;
                              color: black;
                              line-height: 2;
                            ">
                    <tr>
                      <th style="width: 5%;">SI.No</th>
                      <th style="width: 20%;">Item Details</th>
                      <th class="text-right" style="width: 15%;">Amount</th>
                      <th class="text-right" style="width: 10%;">Discount</th>
                      <th class="text-right" style="width: 15%;">
                        Taxable Amt.
                      </th>
                      <th class="text-right" style="width: 10%;">GST(%)</th>
                      <th class="text-right" style="width: 10%;">GST Amt.</th>
                      <th class="text-right" style="width: 15%;">Total Amt.</th>
                    </tr>
                  </thead>
                  <tbody style="line-height: 4;">
                    <tr>
                      <td style="width: 5%;">1</td>
                      <td style="width: 20%;">
                        <b-form-input style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " v-model=" invoice.item_details " />
                      </td>
                      <td style="width: 15%;">
                        <b-form-input @input=" getAmt " class="text-right my-custom-select" placeholder="Amount" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " step="0.01" v-model.number=" invoice.amount " type="number" ></b-form-input>
                      </td>
                      <td style="width: 10%;">
                        <b-form-input @input=" getAmt " class="text-right my-custom-select" placeholder="Discount" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                    
                                  " type="number"  step="0.01" v-model.number=" invoice.discount "></b-form-input>
                      </td>
                      <td style="width: 15%;">
                        <b-form-input class="text-right my-custom-select" placeholder="Taxable Amount" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " step="0.01" v-model.number=" invoice.taxble_amt " type="number"></b-form-input>
                      </td>
                      <td style="width: 10%;">
                        <b-form-input @input=" getAmt " class="text-right my-custom-select" placeholder="IGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number"  step="0.01" v-model=" invoice.igst "></b-form-input>
                      </td>
                      <td style="width: 10%;">
                        <b-form-input readonly class="text-right my-custom-select" placeholder="IGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number" step="any" v-model=" invoice.igst_amt "></b-form-input>
                      </td>
                      <td style="width: 15%;">
                        <b-form-input class="text-right" disabled style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " v-model=" invoice.total_amt " step="0.01" type="number" ></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 5%;">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%;"></td>
                      <td style="width: 15%;"></td>
                      <td style="width: 10%;"></td>
                      <td style="width: 15%;"></td>
                      <td style="width: 10%;">
                        <b-form-input @input=" getAmt " class="text-right my-custom-select" placeholder="SGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number"  step="0.01" v-model=" invoice.sgst "></b-form-input>
                      </td>
                      <td style="width: 10%;">
                        <b-form-input readonly class="text-right my-custom-select" placeholder="SGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number" step="any" v-model=" invoice.sgst_amt "></b-form-input>
                      </td>
                      <td style="width: 15%;"></td>
                    </tr>
                    <tr>
                      <td style="width: 5%;">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%;"></td>
                      <td style="width: 15%;"></td>
                      <td style="width: 10%;"></td>
                      <td style="width: 15%;"></td>
                      <td style="width: 10%;">
                        <b-form-input @input=" getAmt " class="text-right" placeholder="CGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number" step="any"  v-model=" invoice.cgst "></b-form-input>
                      </td>
                      <td style="width: 10%;">
                        <b-form-input readonly class="text-right my-custom-select" placeholder="CGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number" step="any" v-model=" invoice.cgst_amt "></b-form-input>
                      </td>
                      <td style="width: 15%;"></td>
                    </tr>
                    <tr>
                      <td style="width: 5%;">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%;"></td>
                      <td style="width: 15%;"></td>
                      <td style="width: 10%;"></td>
                      <td style="width: 15%;"></td>
                      <td style="width: 10%;">
                        <b-form-input @input=" getAmt " class="text-right" placeholder="UTGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number"  step="0.01" v-model=" invoice.utgst "></b-form-input>
                      </td>
                      <td style="width: 10%;">
                        <b-form-input readonly class="text-right my-custom-select" placeholder="UTGST" style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    background-color: #f6f6f6 !important;
                                    border-left: none;
                                    border-right: none;
                                  " type="number" step="any" v-model=" invoice.utgst_amt "></b-form-input>
                      </td>
                      <td style="width: 15%;"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6"> </b-col>
            <b-col md="6">
              <div class="">
                <table class="table">
                  <thead></thead>
                  <tbody>
                    <tr class="bg-light">
                      <td>Sub total</td>
                      <td class="text-right">
                        {{ invoice.sub_total }}
                      </td>
                    </tr>
                    <tr>
                      <td>Out of Pocket Expense</td>
                      <td class="text-right">
                        <b-form-input @input=" getAmt " style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    border-left: none;
                                    border-right: none;
                                  " class="text-right my-custom-select" type="number" step="0.01" v-model=" invoice.pocket_expense " 
                          placeholder="out of pocket expense amount" />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="text-right">
                        <b-form-input v-model=" invoice.expense_details " style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    border-left: none;
                                    border-right: none;
                                  " class="text-right my-custom-select" placeholder="out of pocket expense details" />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr>
                      <td>Adjustments</td>
                      <td class="text-right">
                        <b-form-input @input=" getAmt " style="
                                    border-bottom-color: #1f91f3 !important;
                                    border-top: none;
                                    border-left: none;
                                    border-right: none;
                                  " class="text-right" type="number" step="0.01" v-model=" invoice.adjustments " />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr style="background: #f8f8f8;">
                      <td>
                        Total
                        <!-- <font-awesome-icon icon="" /> -->
                      </td>
                      <td class="text-right">
                        <!-- <b-form-input style="border-bottom-color: #1f91f3!important;border-top: none;border-left: none;border-right: none;" class="text-right" type="number" :value="202855"  /> -->
                        {{ invoice.total }}
                        <!-- </b-input> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="py-1 d-flex justify-content-end" md="12">
              <div>
                <b-button size="sm" class="mr-1" variant="primary" @click="
                  () => {
                    $refs['invoice-modal'].hide();
                  }
                ">
                  <span class="text-nowrap"> Cancel</span>
                </b-button>
                <b-button size="sm" variant="primary" type="submit">
                  <span class="text-nowrap">
                    {{ invoiceTitle == "add" ? "Create" : "Update" }}
                  </span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-modal>

    <b-modal no-close-on-backdrop id="proposal-edit-modal" ref="proposal-edit-modal" size="lg" title="Edit proposal"
      hide-footer>
      <!-- <b-card-body> -->
      <validation-observer #default=" { handleSubmit } " ref="refFormObserver">
        <b-form @submit.prevent=" handleSubmit(editProposal) ">
          <b-row>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="client" vid="client" rules="required">
           
              <b-form-group label="Client Name *">
                <b-form-input v-model=" pname " placeholder="Enter Client Name" />
                <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                <!-- </b-form-input> -->
              </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="concerned person" vid="client" rules="required">

              <b-form-group label="Concerned Person">
                <b-form-input v-model=" pperson " placeholder="Enter Concerned Person" />

                <!-- </b-form-input> -->
                <!-- <b-form-input v-model=" pname " placeholder="Enter Client Name" /> -->
                <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                <!-- </b-form-input> -->
              </b-form-group>

              <!-- </b-form-group> -->
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Proposal Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker format="YYYY-MM-DD" :minDate=" currentDate "
                  style="border:1px solid #d8d6de;border-radius: 0.357rem;" id="proposalDate" v-model=" pdate " />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <ValidationProvider #default=" validationContext " name="paddress" vid="address" rules="required">
                <b-form-group label="Address *">
                  <b-form-textarea   id="address" v-model=" paddress " class="my-custom-select"
                    placeholder="Enter Address" />

                  <!-- </b-form-textarea> -->
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Subject">
                <b-form-input v-model=" psubject " placeholder="Enter Subject" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Prephase">
                <b-form-input v-model=" pphrase " placeholder="Enter Prephase" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-for="(  items, index  ) in   proposalFields  " :key=" index ">
            <b-col md="12">
              <b-form-group label="Title">
                <b-form-input v-model=" items.title " placeholder="Enter Title" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Description">
                <quill-editor v-model=" items.desc " :options=" editorOption "></quill-editor>
              </b-form-group>
              <div class="text-right">
                <b-button size="sm" @click=" removeProposal(index) " variant="outline-primary">
                  Remove
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="px-1" md="12">
              <div class="actions-proposal my-1 p-2 d-flex justify-content-center bg-light">
                <b-button size="sm" variant="primary">
                  <span class="text-nowrap" @click=" addProposalField() ">
                    Add Proposal Section</span>
                </b-button>
                <b-button size="sm" @click="
                  () => {
                    // $refs['list-templates-modal'].show()
                    openModal('list-templates-modal');
                  }
                " v-show=" proposalFields.length === 0 " class="ml-1" variant="primary">
                  <span class="text-nowrap">
                    Choose From Templates</span>
                </b-button>
              </div>
            </b-col>
          </b-row>

          <b-row style="
                      border-bottom: inset;
                      border-color: #f75949;
                      margin-left: 0rem;
                      margin-bottom: 1rem;
                      margin-right: 0.5rem;
                    ">
            <span style="margin-bottom: 0.5rem;" class="text-uppercase">
              fees details
            </span>
          </b-row>
          <b-row v-for="(  amount, index  ) in   amountField  " :key=" index ">
            <b-col md="8">
              <b-form-group label="Description">
                <b-form-input v-model=" amount.description " class="my-custom-select" placeholder="Enter Description" />
              </b-form-group>
            </b-col>
            <b-col class="d-flex flex-column" md="4">
              <ValidationProvider #default=" validationContext " name="amount" vid="amount" rules="required">
                <b-form-group label="Amount *">
                  <b-form-input type="number" step="any" v-model=" amount.amount " placeholder="Enter Amount" class="my-custom-select" />

                  <!-- </b-form-input> -->
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <div class="text-right">
                <b-button size="sm" v-show=" amountField.length > 1 " @click=" removeAmount(index) "
                  variant="outline-primary">
                  Remove
                </b-button>
                <b-button size="sm" v-show=" index === amountField.length - 1 " class="ml-1" @click=" addAmount() "
                  variant="primary">
                  Add more
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row v-show=" amountField.length > 1 " class="my-1">
            <b-col md="8">
              <div class="bg-light text-right p-1">Total</div>
            </b-col>
            <b-col md="4">
              <div class="bg-light p-1">
                {{ totalAmount }}
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Title">
                <b-form-input v-model=" pfootertitle " placeholder="Enter Footer Title" class="my-custom-select"/>

                <!-- </b-form-input v-model="pfootertitle"> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Description">
                <quill-editor v-model=" pfooterdesc " :options=" editorOption "></quill-editor>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Internal Notes (Not visible for clients)">
                <b-form-input v-model=" pnotes " placeholder="Enter Notes" class="my-custom-select">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="py-1 d-flex justify-content-end" md="12">
              <div>
                <b-button size="sm" class="mr-1" variant="primary" @click=" $refs['proposal-edit-modal'].hide() ">
                  <span class="text-nowrap"> Cancel</span>
                </b-button>
                <b-button size="sm" variant="primary" type="submit">
                  <span class="text-nowrap"> Update</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>

    <b-modal no-close-on-backdrop id="invoice-charges-modal" ref="invoice-charges-modal" size="lg"
      title="invoice charges update" hide-footer>
      <b-row>
        <b-col md="6">
          <b-form-group label="Prefix">
            <b-form-input v-model=" invoice.prefix " placeholder="Prefix" class="my-custom-select"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Next Number">
            <b-form-input type="number" step="any" v-model=" lastInvoiceId " placeholder="Next Number" class="my-custom-select"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- <b-row> -->
      <div data-v-16fd8022="" role="alert" aria-live="polite" aria-atomic="true" class="alert small alert-info">
        <p style="color: black;" data-v-16fd8022="">
          Current : {{ invoice.prefix + lastInvoiceId }}
        </p>
        <p style="color: black;" data-v-16fd8022="">
          Previous :
          {{
          $store.state.invoice.allData.length > 0
          ? $store.state.invoice.allData[
          $store.state.invoice.allData.length - 1
          ].invoice_number
          : ""
          }}
        </p>
      </div>
      <!-- </b-row> -->
      <div class="text-right">
        <b-button size="sm" variant="primary" @click=" $refs['invoice-charges-modal'].hide() ">
          Update
        </b-button>
      </div>
    </b-modal>
    <b-modal no-close-on-backdrop id="payment-modal" ref="payment-modal" size="lg" hide-footer>
      <template #modal-title>
        {{ payment.title == "add" ? "add new payment" : "edit payment" }}
      </template>
      <validation-observer #default=" { handleSubmit } " ref="refFormObserver">
        <b-form @submit.prevent="
          handleSubmit(payment.title == 'add' ? recordPayment : updatePayment)
        ">
          <b-row>
            <b-col md="4">
              <ValidationProvider #default=" validationContext " name="client" vid="client" rules="required">

                <b-form-group label="Client Name *">
                  <v-select id="client" v-model=" payment.client " placeholder="Search Client" class="my-custom-select" :options=" show_companys "
                    label="name">
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col md="4">
              <b-form-group label="Payment Mode">
                <v-select v-model=" payment.mode " placeholder="Payment Mode" class="my-custom-select" :options=" payment_modes " label="name">
                </v-select>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <validation-provider #default=" validationContext " name="branch" vid="payment-branch" rules="required">
                <b-form-group label="Payment Branch">
                  <v-select id="payment-branch" v-model=" payment.branch " placeholder="Payment Branch" class="my-custom-select"
                    :options=" paginated_branch ">
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4">
              <b-form-group label="Payment Amount">
                <b-form-input v-model.number=" payment.amount " type="number" step="any"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Payment Date">
                <VueDatePicker format="YYYY-MM-DD" :minDate=" currentDate "
                  style="border:1px solid #d8d6de;border-radius: 0.357rem;" v-model=" payment.date "></VueDatePicker>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Reference Id">
                <b-form-input v-model=" payment.reference_id "></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4">
              <b-form-group label="Notes">
                <b-form-input v-model=" payment.notes "> </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div data-v-6d78c756="" class="">
            <div data-v-6d78c756="">
              <div class="table-responsive-sm">
                <table role="table" aria-busy="false" aria-colcount="6"
                  class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                  id="pending-invoices">
                  <caption>
                    <input class="mb-2" type="checkbox" v-model=" payment.tax " />
                    <span class="cursor-pointer" @click="
                      () => {
                        if (!payment.tax) {
                          payment.tax = true;
                        } else {
                          payment.tax = false;
                        }
                      }
                    ">Customer has deducted Tax</span><br />
                    <span class=""> (Pending Invoices) </span>
                  </caption>
                  <!---->
                  <thead role="rowgroup" class="">
                    <!---->
                    <tr role="row" class="">
                      <th role="columnheader" scope="col" aria-colindex="1" class="">
                        <div>Invoice #</div>
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="2" class="">
                        <div>Invoice Branch</div>
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="3" class="">
                        <div>Invoice Date</div>
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="4" class="">
                        <span>Amount(<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />)</span>
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="5" class="">
                        <span>Amount Due(<font-awesome-icon icon="indian-rupee-sign"
                            class="icon cursor-pointer" />)</span>
                      </th>
                      <th v-if=" payment.tax " role="columnheader" scope="col" aria-colindex="5" class="">
                        <span>Tds deducted(<font-awesome-icon icon="indian-rupee-sign"
                            class="icon cursor-pointer" />)</span>
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="6" class="">
                        <span>Payment(<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    <!---->

                    <tr role="row" v-for="(  invoice, index  ) in 
  
  paid_payment.length > 0
    ? paid_payment
    : $store.state.invoice.all

" class="">
                      <!-- {{ addPayment() }} -->
                      <td aria-colindex="1" role="cell" class="">
                        {{ invoice.invoice_number }}
                      </td>
                      <td aria-colindex="2" role="cell" class="">
                        {{ getinvoiceBranch(invoice.task_id) }}
                      </td>
                      <td aria-colindex="3" role="cell" class="">
                        {{ getinvoiceDate(invoice.invoice_date) }}
                      </td>
                      <td aria-colindex="4" role="cell" class="">
                        {{ invoice.sub_total }}
                      </td>
                      <td aria-colindex="5" role="cell" class="">
                        {{ invoice.total_amt }}
                      </td>
                      <td v-if=" payment.tax ">
                        <b-form-input @input=" setTds(invoice.id, $event) " :value=" setedittds(invoice.id) "
                          type="number" step="any" class="hide form-control" :id=" String(invoice.id) "></b-form-input>
                      </td>
                      <td aria-colindex="6" role="cell" class="">
                        <div class="form-group m-0">
                          <!-- {{ index }} -->
                          <!-- <div class="form-line"><b-form-input @input="setPayment(index, $event)" type="number" 
                                class="hide form-control" :id="String(invoice.id)" /></div> -->
                          <div class="form-line">
                            <b-form-input @input=" setPayment(invoice.id, $event) " step="any" type="number"
                              :value=" seteditPayment(invoice.id) " class="hide form-control"
                              :id=" String(invoice.id) " />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot role="rowgroup" class="">
                    <tr role="row" class="">
                      <th role="columnheader" scope="col" aria-colindex="1" class="">
                        &nbsp;
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="2" class="">
                        &nbsp;
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="3" class="">
                        &nbsp;
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="4" class="">
                        &nbsp;
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="5" class="">
                        Total (<font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />)
                      </th>
                      <th v-if=" payment.tax " role="columnheader" scope="col" aria-colindex="6" class="">
                        {{ getTotalTds(payment.payment) }}
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="6" class="">
                        {{ getTotalAmt(payment.payment) }}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="row">
                <div class="col-sm-5"></div>
                <div class="col-sm-2"></div>
                <div class="col-sm-5" style="float: right;">
                  <div class="list-group text-right">
                    <div class="list-group-item d-flex justify-content-between align-items-center text-muted">
                      <span>Amount Received (<font-awesome-icon icon="indian-rupee-sign"
                          class="icon cursor-pointer" />)</span>
                      <span class="">
                        {{ payment.amount }}
                      </span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center text-muted">
                      <span>Amount used only (<font-awesome-icon icon="indian-rupee-sign"
                          class="icon cursor-pointer" />)</span>
                      <span class="">
                        {{ getTotalAmt(payment.payment) }}
                      </span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center text-muted">
                      <span>Amount in excess (<font-awesome-icon icon="indian-rupee-sign"
                          class="icon cursor-pointer" />)</span>
                      <span class="">
                        {{ getExcess() }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-1 text-right">
            <b-button size="sm" variant="primary" class="mr-1" @click=" $refs['payment-modal'].hide() ">Cancel</b-button>
            <b-button size="sm" type="submiy" variant="primary">
              {{ payment.title == "add" ? "Add" : "Update" }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-modal>
    <b-modal no-close-on-backdrop id="subtask-modal" ref="subtask-modal" size="lg" title="update checklist" hide-footer>
      <!-- <b-card-body> -->
      <b-row>
        <b-col md="12">
          <b-form-group class="text-truncate my-custom-select" placeholder="Enter sub-task Steps and assign @someone"  >
            <!-- </b-form-input> -->


            <Mentionable style="width: 100%;" :keys=" ['@', '#'] " :items=" users_to_assign " offset="6" insert-space
              @open=" onOpen " @apply=" onApply ">
              <b-form-input id="subtask_todo" v-model=" todo_subtask " placeholder="" class="my-custom-select" />
              <!-- <div></div> -->
              <!-- <option v-for="size in sizes">{{ size }}</option> -->
              <!-- </datalist> -->
              <template #no-result>
                <div class="dim">No result</div>
              </template>

              <template #item-@=" { item } ">
                <div class="user">
                  <b-avatar :src=" item.avatar "> </b-avatar>
                  <span class="ml-1">
                    {{ item.value }}
                    <!-- ({{ item.name }}) -->
                  </span>
                </div>
              </template>
            </Mentionable>
            <div class="d-block invalid-feedback text-capitalize"
              v-if=" this.todo_subtask == '' || this.todo_subtask == null ">
              the todo field is required
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <div class="text-right">
        <b-button size="sm" @click=" $refs['subtask-modal'].hide() " variant="primary">
          Cancel
        </b-button>
        <b-button size="sm" :disabled=" todo_status " @click=" updateTodo(todo_id_subtask) " class="ml-1"
          variant="primary">
          Update
          <b-spinner small v-if=" todo_status " />

          <!-- </b-spinner> -->
        </b-button>
      </div>
    </b-modal>
    <edit-client :is-edit-sidebar-active.sync="ClientisEditSidebarActive" :edit-item.sync="editItemClient" @refetch-data="
      () => {
        $store.dispatch('clients/fetch').then(() => {
          // if(pclient.id === client_id){

          pclient =
            $store.state.clients.all[
            $store.state.clients.all.findIndex((e) => e.id === pclient.id)
            ];
          // }
        });
      }
    " />
    <b-modal no-close-on-backdrop id="list-templates-modal" ref="list-templates-modal" size="lg"
      title="proposal templates" hide-footer>
      <!-- <b-card-body> -->
      <!-- <b-card no-body> -->

      <b-table :show-empty="$store.state.proposals.all.length === 0" id="list-proposal" :fields="
        [
          { key: 'id', label: '#', thClass: 'width-7' },
          { key: 'temp_name', label: 'Template name' },
          { key: 'actions', label: 'Actions', thClass: 'width-22' },
        ]
      " :items=" $store.state.proposals.all ">
        <template #cell(temp_name)=" { item } ">
          {{ item.template_name }}
        </template>
        <template #cell(actions)=" { item } ">
          <b-button size="sm" @click="
            () => {
              item.proposal_template_section.forEach((element) => {
                proposalFields.push({
                  desc: element.description,
                  title: element.title,
                });
              });
              $refs['list-templates-modal'].hide();
            }
          " variant="primary">
            Choose
          </b-button>
        </template>
      </b-table>
      <!-- </b-card> -->
    </b-modal>
    <!-- <EmailSendModal :taskDetails="sendTask()" :signature="replyModal()" :replySubject="replySubject" /> -->
    <b-modal no-close-on-backdrop id="reply-modal" ref="reply-modal" size="lg" :title=" replySubject " hide-footer>
      <b-form @submit.prevent=" sendEmail2(composeData, file_name2) ">

        <b-row>
          <b-col md="3">
            <b-form-group label="From">
              <v-select v-model=" composeData.from " :options=" outBoundEmails " label="email" class="my-custom-select"
                placeholder="Select From"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="To">
              <v-select multiple v-model=" composeData.to " :options=" emails_contact " class="my-custom-select"
                placeholder="Select To"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Cc">
              <v-select multiple v-model=" composeData.cc " :options=" emails_contact " class="my-custom-select"
                placeholder="Select Cc"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Bcc">
              <v-select multiple v-model=" composeData.bcc " :options=" emails_contact " class="my-custom-select"
                placeholder="Select Bcc"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Body">
              <quill-editor v-model=" composeData.message " :options=" editorOption "></quill-editor>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <div class="border-l">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                  <div>Attachment(s)</div>
                  <div>
                    <input type="file" id="file_attachment" multiple @change=" onFileChange2 " style="display: none;" />
                    <b-button size="sm" variant="primary" @click=" file_upload() ">Choose File(s)</b-button>
                  </div>
                </div>
                <!-- </b-form> -->
              </div>
              <div class="d-flex justify-content-between align-items-center p-1">
                <div v-if=" $store.state.tasks.s3_url.length > 0 " style="width:100%;">
                  <span v-for="(  image, index  ) in   $store.state.tasks.s3_url  " :key=" index ">

                    {{ image.fileName }}
                    <span style="float:right;">
                      <feather-icon class="cursor-pointer" @click=" removeFileS3Task(image.url, index) " icon="XIcon" />
                    </span>
                    <br>
                  </span>

                </div>
                <div v-else>No file(s) selected</div>
                <b-media-aside class="mr-0">
                  <b-img v-if=" file !== null && previewImage != null " id="ref_image_base_64" ref="refPreviewEl"
                    v-model=" image " :src=" previewImage " height="40" width="40" rounded="circle"
                    class="border border-l" />
                </b-media-aside>
              </div>
            </div>
          </b-col>
          <!-- <b-col md="6">
          <b-form-group label="Proposal">
            <div title="click to view" class="cursor-pointer border-l p-1">
              {{ proposalPdf }}
            </div>
          </b-form-group>
        </b-col>
      </b-row> -->
        </b-row>
        <div class="text-right">
          <b-button size="sm" @click=" $refs['reply-modal'].hide() " variant="primary" class="mr-1">
            Cancel
          </b-button>
          <b-button type="submit" size="sm" variant="primary"> Send </b-button>
        </div>
      </b-form>
    </b-modal>
    <!-- <create-client /> -->
  </div>
</template>
<style>
/* #list-templates-modal .modal-dialog{
    max-width: 840px;
  } */
  .my-custom-select ::placeholder {
  font-size: 1rem;
 
color: rgba(128, 128, 128, 0.8) !important;
/* color: rgb(85, 81, 81)!important; */

}
</style>
<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { VueDatePicker } from '@mathieustan/vue-datepicker';
import AddExpenseLeads from '../Accounts/add_expense_leads.vue';
import imgLogo from "../../../assets/images/logo/centrik-logo.png";
import wordIcon from "../../../assets/images/logo/word-icon.png";
import excelIcon from "../../../assets/images/logo/excel-icon.png";
import slideIcon from "../../../assets/images/logo/slide-icon.png";
import browseIcon from "../../../assets/images/logo/browse-icon.png";
import VueHtml2pdf from "vue-html2pdf";
import EmailSendModal from "../EmailSendModal.vue";
import { quillEditor } from "vue-quill-editor";
import CardAdvanceChat from "./CardAdvanceChat.vue";
// import SearchMessages from "./SearchMessages.vue";
import Todo from "./todo.vue";
import EditClient from "../clients/EditSidebar.vue";
// import CreateClient from "../clients/CreateClient.vue";
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

import {
  BFormInvalidFeedback,
  BTooltip,
  BCollapse,
  BForm,
  BFormCheckbox,
  BFormTextarea,
  BModal,
  BTabs,
  BTab,
  BCardHeader,
  BCardBody,
  BCardText,
  VBToggle,
  BCard,
  BRow,
  BCol,
  BLink,
  BFormFile,
  BCalendar,
  BBadge,
  BTable,
  BPagination,
  BDropdownForm,
  BButton,
  BFormDatepicker,
  BFormInput,
  BSpinner,
  BDropdown,
  BContainer,
  BDropdownItem,
  VBTooltip,
  BAvatarGroup,
  BAvatar,
  BFormGroup,
  BIconStarFill,
  VBPopover,
} from "bootstrap-vue";
import { Mentionable } from "vue-mention";
import { required, email } from "@validations";

import { ref } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
// import parse from 'html-dom-parser'
// import { required } from 'vee-validate/dist/rules'
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
import CreateSidebar from "./CreateSidebar.vue";
import EditSidebar from "./EditSidebar.vue";
import flatPickr from "vue-flatpickr-component";
import draggable from "vuedraggable";

import DropdownDatepicker from "vue-dropdown-datepicker";
import vSelect from "vue-select";
// import axios from "axios";
import store from "@/store";
// import { useRouter } from '@core/utils/utils'
import Fuse from "fuse.js";
import Snackbar from "vuejs-snackbar";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";
// import InnerPage from "./InnerPage.vue";
// import { useRouter } from "@/@core/utils/utils";
import router from "@/router";
// import { includes } from "postcss-rtl/lib/affected-props";
import CreateLead from "./CreateLead.vue";
import EditLeads from "./EditLeads.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faEnvelopeOpen,
  faEnvelope,
  faComments,
  faComment,
  faCommentDots,
  faCommentDollar,
  faIndianRupee,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// library.add()
library.add(
  faBars,
  faComments,
  faComment,
  faCommentDollar,
  faCommentDots,
  faTwitter,
  faEnvelopeOpen,
  faEnvelope,
  faFacebook,
  faStackOverflow,
  faGithub,
  faIndianRupee
);
import html2pdf from "html2pdf.js";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EditExpense from '../Accounts/editExpense.vue';
import { isUserLoggedIn } from '@/auth/utils';
// import logo from '../../../../public/centrik-logo.png'

// import
export default {
  components: {
    BFormInvalidFeedback,
    FontAwesomeIcon,
    AddExpenseLeads,
    BTooltip,
    EditClient,
    EmailSendModal,
    BContainer,
    BDropdownForm, BCardActions,
    BFormGroup,
    BTabs,
    BFormFile,
    BTab,
    BForm,
    VueHtml2pdf,
    BCard,
    BCardHeader,
    BCardBody,
    BCardText,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    BPagination,
    BCalendar,
    CreateLead,
    VueDatePicker,
    Mentionable,
    Todo,
    VuePerfectScrollbar,
    // CreateClient,
    BFormInput,
    BCollapse,
    BModal,
    BFormTextarea,
    // InnerPage,
    DropdownDatepicker,
    BRow,
    BBadge,
    CardAdvanceChat,
    // SearchMessages,
    Snackbar,
    BFormDatepicker,
    BFormCheckbox,
    BCol,
    draggable,
    BFormGroup,
    BLink,
    BIconStarFill,
    flatPickr,
    BTable,
    BButton,
    BDropdown,
    // eslint-disable-next-line vue/no-unused-components
    VBTooltip,
    BAvatarGroup,
    BAvatar,
    BDropdownItem,
    vSelect,
    CreateSidebar,
    EditSidebar,
    FeatherIcon,
    EditLeads,
    quillEditor,
    EditExpense
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
    Ripple,
    required,
  },
  name: "Tasks",

  data() {


    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return {
      spinnerY:false,
      showShimmer: false,
      textCheck: '',
      timesheetArray: [],
      leadsData: [],
      selectedCheckbox: [],
      selectAll: false,
      isShow: false,
      checkRead2: true,
      perPageAccounts: 10,
      currentPageProposalTable: 1,
      expensesFields: [

        {
          key: "activity",
          label: "activity",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "description",
          label: "Description",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "employees",
          label: "Employees",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "activity_date",
          label: "Activity Date",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },

        {
          key: "expense",
          label: "Expense",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },

      ],
      expense: {
        description: "",
        date: `${year}-${month}-${day}`,
        users: [],
        expense: null,
      },
      file_name2: [],
      currentDate: `${year}-${month < 10 ? '0'+month:month}-${day<10?'0'+day:day}`,
      filetask: null,
      receivedItem: [],
      totalLength: '',
      importantLength: '',
      overDueLength: '',
      dueTodayLength: '',
      dueTomorrowLength: '',
      dueThisWeekLength: '',
      activeTab: 0,
      priority: '',
      id: '',

      client: '',
      subject: '',
      comments: '',
      postDate: '',
      daysLeft: '',
      employees: '',
      priority: '',
      leadStatus: '',
      previleges: {
        edit: null,
        onRowEdit: null,
        viewAll: null,
        conversion: null,
        clientDetails: null,
        timeSheet: null,
        checklist: null,
        delete: null,
        download: null,
      },

      taskNum: 0,
      wordIcon: wordIcon,
      slideIcon: slideIcon,
      browseIcon: browseIcon,
      excelIcon: excelIcon,
      clientNum: 0,
      loader_proposal: false,
      loader_invoice: false,
      loader_payment: false,
      dropTask: false,
      dropClient: false,
      file_name: [],
      arr_comment: [],
      replySubject: "",
      paid_payment: [],
      payment: {
        edit_id: 0,
        title: "add",
        client: null,
        mode: null,
        tax: false,
        branch: null,
        amount: 0,
        date: `${year}-${month}-${day}`,
        reference_id: "",
        notes: "",
        payment: [],
        tds: [],
      },
      invoiceTitle: "add",
      gsterr: true,
      previousPrice: null,
      taskIconName: "ChevronRightIcon",
      clientIconName: "ChevronRightIcon",
      upcomingIconName: "ChevronRightIcon",
      pendingIconName: "ChevronRightIcon",
      historyIconName: "ChevronRightIcon",
      textLength: false,
      prefixPlusid: "",
      invoice: {
        lastInvoiceId: 0,
        prefix: "yr 22-23/",
        client_name: "",
        editId: 0,
        state_code: 0,
        client: null,
        gstNumber: "",
        item_details: "",
        state: null,
        id: "",
        pdate: `${year}-${month}-${day}`,
        due_date: `${year}-${month}-${day}`,
        billing_address: "delhi jangpura",
        notes: "Thank you for your business.",
        amount: null,
        discount: null,
        taxble_amt: null,
        igst: null,
        igst_amt: null,
        cgst: null,
        cgst_amt: null,
        sgst: null,
        sgst_amt: null,
        utgst: null,
        utgst_amt: null,
        total_amt: 0,
        sub_total: 0,
        pocket_expense: null,
        expense_details: "",
        adjustments: 0,
        total: 0,
      },

      totalAmt: 0,
      detailsRowProposal: null,
      proposal_edit_id: 0,
      task_id_subtask: 0,
      todo_subtask: "",
      todo_id_subtask: 0,
      add_todo: false,
      todo_field: [],
      nextTodoId: 2,
      default_todo: [],
      additional_todo: [],
      // inputs: [

      //   { subtask_assignee: null },
      // ],
      // fields: ["subject", "description","actions"],
      filter_active: false,
      option: [{ title: "open" }, { title: "closed" }, { title: "overdue" }],
      selected: { title: "open" },
      importance: [
        { id: 1, star: "StarIcon" },
        { id: 2, star: "StarIcon" },
        { id: 3, star: "StarIcon" },
        { id: 4, star: "StarIcon" },
        { id: 5, star: "StarIcon" },
      ],
      importance2: [
        { id: 1, star: "*" },
        { id: 2, star: "* *" },
        { id: 3, star: "* * *" },
        { id: 4, star: "* * * *" },
        { id: 5, star: "* * * * *" },
      ],

      fields: [
        // {
        //     key:"checkbox",
        //     label:'',


        //   },
        {
          key: "priority",
          label: "priority",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "iconAttach",
          label: "",
          thClass: "width-0 pl-0",
          tdClass: "width-0 pl-0",
          thStyle: { width: "0%" },
        },
        {
          key: "id",
          label: "#",
          tdClass: "text-left width-0 pl-0 pr-0",
          thClass: "text-left pl-0 pr-0",
          thStyle: { width: "0%" },
        },
        {
          key: "client",
          label: "client",
          thClass: 'client-class',
          tdClass: "width-0 client-class",
          thStyle: { width: "17%" },
        },
        {
          key: "subject",
          label: "subject",
          thStyle: { paddingLeft: '0rem', width: "28%" },
          tdClass: 'pl-0',
          html: true,
        },
        {
          key: "commentCount",
          label: "commentCount",
          tdClass: "width-0",
          thStyle: { paddingLeft: '0rem', width: "5%" },
          tdClass: 'pl-0',
        },
        {
          key: "postDate",
          label: "postDate",
          tdClass: "width-3",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0 min-width-8',
        },
        {
          key: "daysLeft",
          tdClass: "width-0",
          thClass: "text-center",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0',
        },
        {
          key: "employees",
          label: "employees",
          tdClass: "text-left width-0",
          thClass: "text-left ",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0',
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0',
        },
      ],
      proposalTable: [
        {
          key: "activity",
          label: "activity",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "date",
          label: "date",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "id",
          label: "no.",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "notes",
          label: "internal notes",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "amount",
          label: "amount (₹)",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "status",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
      ],
      employees: [
        {
          avatar: require("@/assets/images/avatars/1-small.png"),
          title: "Jane Foster",
        },
        {
          avatar: require("@/assets/images/avatars/3-small.png"),
          title: "Donna Frank",
        },
        {
          avatar: require("@/assets/images/avatars/5-small.png"),
          title: "Gabrielle Robertson",
        },
        {
          avatar: require("@/assets/images/avatars/7-small.png"),
          title: "Lori Spears",
        },
      ],
      selected_item: [],
      selected: 1,
      filterStatus: null,
      filtercompany: null,
      filterCategory: null,
      filterContact: null,
      filterSearch: null,
      FilterPriority: null,
      filterUsers: null,
      filterBranch: null,
      observer: null,
      limit: 8,
      offset: 0,
      limit_users: 4,
      offset_users: 0,
      searchable: "hh",
      search: "",
      changePrioirty: {},
      isCloseable: false,
      selectVal: {
        priority: undefined,
        status_master_id: undefined,
        company_id: undefined,
        contact_person_id: undefined,
        branch_id: undefined,
        category_id: undefined,
      },
      startDate2: `${year}-${month}-${day}`,
      subtask_mentions: [],
      todos: [],
      proposals: [],
      userData: JSON.parse(localStorage.getItem("userData")),
      taskId: null,
      // currentDate: `${year}-${month}-${day}`,
      pdate: `${year}-${month}-${day}`,
      pamount: null,
      pclient: "",
      pcontact: "",
      pname: "",
      paddress: "",
      pperson: "",
      pfeesdesc: "",
      pfootertitle: "Thanking you,",
      pfooterdesc: `${JSON.parse(localStorage.getItem("userData")).name
        }<br/>For, ${JSON.parse(localStorage.getItem("userData")).tenant.organization.name
        }<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)`,
      pNotes: "Thanking you",
      psubject: "",
      pphrase: "As per discussion, please find below the brief proposal",
      editIndex: null,
      pnotes: "",
      proposalFields: [],
      editorOption: {
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              { script: "sub" },
              { script: "super" },
            ],
            ["clean"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            ["image"],
            [{ header: [] }, { font: [] }, { size: [] }],
            ["link"],
          ],
        },
        placeholder: "Message",
      },
      amountField: [{ amount: null, description: "" }],
      base64data: "",
      text: "",
      // editorOption: {
      //   modules: {
      //     toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
      //   },
      //   placeholder: 'Message',
      // },
      composeData: {
        message: "",
        to: [],
        cc: [],
        bcc: [],
        from: null,
        file2: null,

      },
      proposalPdf: "PL-0009.pdf",
      file_name: [],
      previewImage: null,
      file: null,
      image: null,
    };
  },


  computed: {
    updateTab() {

    },
    companys() {
      // return this.$store.state.clients.all
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.clients.all.length;
        index++
      ) {
        data[index] = this.$store.state.clients.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    paginated_companys() {
      return this.companys//.slice(this.offset, this.limit + this.offset);
    },
    companys_hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.companys.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    companys_hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.companys.slice(prevOffset, this.limit + prevOffset).length
      );
    },
    category() {
      // return this.$store.state.categories.all
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.categories.all.length;
        index++
      ) {
        data[index] = this.$store.state.categories.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    paginated_category() {
      return this.category//.slice(this.offset, this.limit + this.offset);
    },
    category_hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.category.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    category_hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.category.slice(prevOffset, this.limit + prevOffset).length
      );
    },
    branches() {
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.branches.all.length;
        index++
      ) {
        data[index] = this.$store.state.branches.all[index].name;
      }

      // return data;
      return data
      // .filter((country) =>
      //   country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      // );
      var name = [];
      var id = [];
      for (let index = 0; index < data.length; index++) {
        name[index] = data[index].name;
        id[index] = data[index].id;
      }
      // return name;
      // return
      // var obj = {
      //   name: name.filter((b) => b.includes(this.filterBranch)),
      //   // id : id.filter((b) => b.includes(this.filterBranch)),
      // }
      return obj;
    },
    paginated_branch() {
      return this.branches//.slice(this.offset, this.limit + this.offset);
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.branches.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.branches.slice(prevOffset, this.limit + prevOffset).length
      );
    },
    users_to_assign() {
      var items = this.$store.state.users.all.filter(e => e.email !== JSON.parse(localStorage.getItem('userData')).email);;
      var data = [];
      var leads = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      var user_assigned = [];

      // return user_assigned;
      for (let index = 0; index < items.length; index++) {
        // for (let i = 0; i < leads.length; i++) {
        // for (let j = 0; j < leads[i].users.length; j++) {
        //  user_assigned[j] = {
        //     id: leads[i].users[j].id,
        //     name: leads[i].users[j].name,
        //     avatar: leads[i].users[j].avatar,

        //  }
        // user_assigned = leads[i]
        // }

        data[index] = {
          id: items[index].id,
          value: items[index].name,

          name: items[index].name,
          avatar: items[index].avatar,
        };
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }

        // }
        // }
      }
      return data.filter((country) =>
        country.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      );
    },
    paginated_users_to_assign() {
      return this.users_to_assign
      // .slice(
      //   this.offset_users,
      //   this.limit_users + this.offset_users
      // );
    },
    users() {
      // return this.$store.state.users.all
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.users.all.length;
        index++
      ) {
        data[index] = this.$store.state.users.all[index].name;
      }

      // return data;
      if (this.search.includes("@")) {
        // this.subtask_assignee = this.search.('@')
        // this.search.replace('@', ' ')

        return data.filter((country) =>
          country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
        );
      } else {
        return data.filter((country) =>
          country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
        );
      }
    },
    paginated_users() {
      return this.users  //.slice(this.offset, this.limit + this.offset);
    },
    users_hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.users.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    users_hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.users.slice(prevOffset, this.limit + prevOffset).length
      );
    },
    contactPerson() {
      // return this.$store.state.contactPeople.allForLeads
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.contactPeople.allForLeads.length;
        index++
      ) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    outBoundEmails() {
      return this.$store.state.emails.all_outbound_emails;
    },
    emails_contact() {
      // return this.$store.state.contactPeople.allForLeads
      var data = [];
      // var index2 = [];
      // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
      // index2[index] = [index];
      for (let i = 0; i < this.$store.state.contactPeople.emails.length; i++) {
        data[i] = this.$store.state.contactPeople.emails[i];
      }
      // }
      // return index2;

      return data;
      return data.filter((country) => country.includes(this.search));
    },
    paginated_contactPerson() {
      return this.contactPerson//.slice(this.offset, this.limit + this.offset);
    },
    contactPerson_hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.contactPerson.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    contactPerson_hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.contactPerson.slice(prevOffset, this.limit + prevOffset).length
      );
    },
    assignedUsers() {
      var items = this.$store.state.comments.assignedUsers;
      const element = [];
      for (let index = 0; index < items.length; index++) {
        element[index] = {
          id: items[index].id,
          users: items[index].users,
        };
      }
      return element;
    },
    todo() {
      this.todos = this.$store.state.appTodo.all;

      return this.$store.state.appTodo.all;
    },
    // proposal(){
    //   this.proposal = this.$store.state.appTodo.all
    //   return this.$store.state.appTodo.all;
    // }


    all_expense_users() {
      let arr = this.$store.state.users.all;
      return arr;
    },
    expense_users() {
      return this.all_expense_users.slice(this.offset_users,
        this.limit_users + this.offset_users);
    },
    allActivites() {
      let arr = []
      this.$store.state.expenses.single.forEach(element => {
        let s = this.getAssigneeString(element.users);
        arr.push({
          activity: 'Expense',
          description: element.description,
          employees: s,
          activity_date: element.date,
          expense: element.expense
        });
      });
      return arr;
    },
    // leads() {
    //   return this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    // },
    // leadItems(){
    // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');

    // } ,

    Allusers() {
      return this.$store.state.users.all;
    },
    // allLeads() {


    //   let arr2 = [];
    //   let arr = this.$store.state.leads.all.filter(e => e.type === 'lead')///.filter(e => e.type === 'lead');
    //   arr.forEach(element => {
    //     this.receivedData.push({
    //       id: element.branch_id,
    //       client: element.company_id,
    //       subject: element.subject,
    //       //daysLeft:due_date,
    //       employees: element.users,
    //       priority: element.priority,


    //     })
    //   })
    // },
    setPrivileges() {
      let priveleges = [];
      let data = this.previleges;
      if (this.$store.state.users.all.length > 0) {
        let roles = this.$store.state.users.all;
           let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id

        let designations = this.$store.state.designation.all;

        let d2 = designations.filter((x) => {
          for (let i = 0; i < x.users.length; i++) {
            if (x.users[i].user_role_id === currUser[0].user_role_id) {
              return true;
            }
          }
          return false;
        });

        d2.forEach((x) => {
          x.privileges.forEach((y) => {
            priveleges.push(y);
          });
        });

        let arr = [];

        this.$store.state.status.all_master.forEach((x) => {
          if (x.name === "Leads") {
            x.privileges.forEach((y) => {
              priveleges.forEach((z) => {
                if (y.id === z.privilege_id) {
                  arr.push({
                    name: y.name,
                    status: z.status,
                  });
                }
              });
            });
          }
        });

        // console.log(arr, "ppppppppppp");

        arr.forEach((x) => {
          // console.log(x.name === "Leads Editing", "nnnnnnnnnn");
          if (x.name === "Leads Editing") {
            if (x.status === 'active') {
              data.edit = true;
            }else{
              data.edit = false;

            }
          } else if (x.name === "View All Leads") {
            if (x.status === 'active') {
              data.viewAll = true;
            }else{
              data.viewAll = false;

            }
          } else if (x.name === "Leads On Row Editing") {
            if (x.status === 'active') {
              data.onRowEdit = true;
            }else{
              data.onRowEdit = false;
            }
          } else if (x.name === "Leads Conversion") {
            if (x.status === 'active') {
              data.conversion = true;
            }else{
              data.conversion = false;

            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === 'active') {
              data.clientDetails = true;
            }else{
              data.clientDetails = false;

            }
          } else if (x.name === "Timesheet") {
            if (x.status === 'active') {
              data.timeSheet = true;
            }else{
              data.timeSheet = false;

            }
          } else if (x.name === "Checklist") {
            if (x.status === 'active') {
              data.checklist = true;
            }else{
              data.checklist = false;

            }
          } else if (x.name === "Leads Delete") {
            if (x.status === 'active') {
              data.delete = true;
            }else{
              data.delete = false;

            }
          } else if (x.name === "Leads Download") {
            if (x.status === 'active') {
              data.download = true;
            }else{
              data.download = false;

            }
          }
        });
      }
      // console.log(data, "dddddddddd");
      return data;
    },
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading;
      return data;
    },
    showFilesTask() {
      let data = this.$store.state.tasks.allAttachments;
      let filter = []
      let num = 0
      data.forEach(element => {
        if (element.type === 'task') {
          // let split = element.attachment.split('/')
          // element.name = split[split.length - 1]

          filter.push(element)
          num++
        }
      });
      this.taskNum = num
      return filter;
      // if (this.$store.state.attachments.all.length > 0) {
      //   let data = this.$store.state.attachments.all;
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if(x.type === 'task'){

      //       let split = x.attachment.split("/");
      //       x.name = split[split.length - 1];
      //       filter.push(x);
      //       num++;
      //     }
      //     });
      //     this.taskNum = num;
      //   // console.log(filter, "ffffffffffff");
      //   return filter;
      // } else {
      //   let data = [];
      //   if (this.$router.currentRoute.name == "tasks") {
      //     data = this.$store.state.tasks.all.filter(e => e.type === 'task');
      //   } else {
      //     data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   }
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if (x.id === this.taskId) {
      //       x.attachments.forEach((y) => {
      //         if (y.type === "task") {
      //           let split = y.attachment.split("/");
      //           y.name = split[split.length - 1];
      //           filter.push(y);
      //           num++;
      //         }
      //       });
      //     }
      //   });
      //   this.taskNum = num;
      //   // console.log(filter, "ffffffffffff");
      //   return filter;
      // }
    },
    showFilesClient() {
      let data = this.$store.state.tasks.allAttachments;
      let filter = []
      let num = 0
      data.forEach(element => {
        if (element.type === 'company') {
          let split = element.attachment.split('/')
          element.name = split[split.length - 1]
          filter.push(element)
          num++
        }
      });
      this.clientNum = num
      return filter;
      // if (this.$store.state.attachments.all.length > 0) {
      //   let data = this.$store.state.attachments.all;
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if (y.type === "company") {
      //     let split = x.attachment.split("/");
      //     x.name = split[split.length - 1];
      //     filter.push(x);
      //     num++;
      //     }
      //   });
      //   this.clientNum = num;
      //   return filter;
      // } else {
      //   let data = [];
      //   if (this.$router.currentRoute.name == "tasks") {
      //     data = this.$store.state.tasks.all.filter(e => e.type === 'task');
      //   } else {
      //     data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   }
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if (x.id === this.taskId) {
      //       x.attachments.forEach((y) => {
      //         if (y.type === "company") {
      //           let split = y.attachment.split("/");
      //           y.name = split[split.length - 1];
      //           filter.push(y);
      //           num++;
      //         }
      //       });
      //     }
      //   });
      //   this.clientNum = num;
      //   console.log(filter.length, "lllllllllllllllll");
      //   return filter;
      // }
    },
    fileLinks() {
      let data = this.$store.state.attachments.links;
      return data;
    },
    mail_comment() {
      // return this.threadedMail();
    },
    payment_modes() {
      return [
        { id: 1, name: "Cash" },
        { id: 2, name: "Cheque" },
        { id: 3, name: "Bank Transfer" },
      ];
    },
    allStates() {
      return this.$store.state.branches.states;
    },
    allProposals() {

      let payment = this.$store.state.recordPayment.all;
      let d1 = this.$store.state.invoice.all;
      this.payment.payment = [];
      for (let index = 0; index < d1.length; index++) {
        // const element = array[index];
        this.payment.payment.push({
          id: index + 1,
          tds: 0,
          amount: 0,
          invoice_id: d1[index].id,
        });
        // this.payment.tds.push({id:index+1,amount:0});
      }
      let d2 = this.$store.state.proposals.allProposals;
      let d3 = [];
      d1.forEach((element) => {
        element.title = "invoice";
        d3.push(element);
      });
      d2.forEach((element) => {
        element.title = "proposal";
        d3.push(element);
      });
      this.paid_payment = []
      d1.forEach((e) => {
        payment.forEach((element) => {
          element.invoice.forEach((i) => {
            if (e.id === i.id && element.id === this.payment.edit_id) {
              this.paid_payment.push(e);
            }
          });
        });
      });
      payment.forEach((element) => {
        element.title = "payment";
        d3.push(element);
      });
      let expense = this.$store.state.expenses.single
      expense.forEach((element) => {
        element.title = "Expense";
        d3.push(element);
      });
      // let data = this.$store.state.proposals.allProposals;
      let data = d3;
      // let total = 0
      // var amount = [];
      // this.proposals = []

      // for (let index = 0; index < data.length; index++) {
      //   // const element = array[index];
      //   for (let i = 0; i < data[index].proposal_fees.length; i++) {
      //     total = total+data[index].proposal_fees[i].amount

      //       // amount = []
      //       if(data[index].id === data[index].proposal_fees[i].proposal_id){

      //       amount.push({
      //         id:data[index].proposal_fees[i].proposal_id,
      //         amount:data[index].proposal_fees[i].amount,
      //         description: data[index].proposal_fees[i].description
      //       })
      //     }

      //   }
      //   for (let j = 0; j < amount.length; j++) {

      //     if(amount[j].id === 1){

      //   this.proposals.push({activity: 'Proposal',task_id:data[index].task_id,proposal_template_section:data[index].proposal_section,id:data[index].id,pnotes:data[index].internal_notes,total:total, date: data[index].proposal_date, amount: amount

      // , name: data[index].client_name, address: data[index].address, subject: data[index].subject, pphrase: data[index].prephase, pperson: data[index].concerned_person, pfootertitle: data[index].footer_title, pfooterdesc: data[index].footer_description});
      //     }
      //   }

      // }

      // console.log(amount);

      return data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    },
    show_companys() {
      return this.$store.state.clients.all.sort(
        (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
      );
    },
    show_contactPerson() {
      return this.$store.state.contactPeople.allForLeads;
    },
    todo_status() {
      return this.$store.state.appTodo.isLoadingUpdate;
    },
    totalAmount() {
      this.pamount = +this.amountField[0].amount;
      if (this.amountField.length > 0) {
        for (let i = 1; i < this.amountField.length; i++) {
          this.pamount = this.pamount + +this.amountField[i].amount;
        }
      }
      return this.pamount;
    },
    // filterLeads(val) {
    //   return this.leadsData.filter((item) => {
    //     let keep = true;

    //     // This is a basic equality filter. What I did in the actual code was to have an object with filter functions for each key. If a key was missing, it defaulted to straight equality.
    //     this.fieldKeys.forEach((key) => {
    //       keep =
    //         keep &&
    //         (this.selectVal[key] === undefined ||
    //           item[key] === this.selectVal[key]);
    //     });

    //     return keep;
    //   });

    //   // return this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').filter(item => {
    //   //   if(this.FilterPriority != null){

    //   //     item.priority === this.FilterPriority.id
    //   //   }
    //   // });
    // },
    fieldKeys() {
      return Object.keys(this.items[0]);
    },

    isLoading() {
      this.todos = this.$store.state.appTodo.all;
      // if (this.$router.currentRoute.name == "tasks") {
      //   return this.$store.state.tasks.isLoadingLeads;
      // } else {
        return this.$store.state.leads.isLoadingLeads;
      // }
    },
    successMessage() {
      return this.$store.state.leads.successMessage;
    },
    errorMessage() {
      return this.$store.state.leads.errorMessage;
    },
    errors() {
      return this.$store.state.leads.errors.branch_id
        ? this.$store.state.leads.errors.branch_id[0]
        : "";
    },
    totalCount() {
      if (this.$router.currentRoute.name == 'tasks') {
        var items = this.$store.state.tasks.all.filter(e => e.type === 'task');
        var count = 0
        if (this.activeTab === 1) {
          count = items.filter(e => e.priority === 5 || e.priority === 4).length
          //this.importantLength=items.length
        }
        else if (this.activeTab === 0) {
          count = items.length//filter(e => e.priority === 1 || e.priority === 2 || e.priority === 3 || e.priority === 4 || e.priority === 5).length
          //this.totalLength=items.length
        }

        else if (this.activeTab === 2) {
          count = items.filter(e => this.DaysLeft(e.created_at, e.due_date) < 0).length
          // this.overDueLength=items.length
        } else if (this.activeTab === 5) {
          // count=items.filter(e => this.dueThisWeek(e.due_date,e.created_at)<=6 && this.dueThisWeek(e.due_date,e.created_at)>0).length
          count = items.filter(e => this.DaysLeft(e.due_date, e.created_at) <= 6 && this.DaysLeft(e.due_date, e.created_at) > 0).length
        }
        return count;
      } else {

        var items = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead')
        // let user_wise = []
        // items.forEach(s => {
        //   s.users.forEach(j => {
        //     if (j.email === JSON.parse(localStorage.getItem('userData')).email) {
        //       user_wise.push(s);
        //     }
        //   });
        // });
        // items = user_wise;
        var count = 0
        if (this.activeTab === 1) {
          count = this.leadsData.filter(e => e.priority === 5 || e.priority === 4).length
          //this.importantLength=items.length
        }
        else if (this.activeTab === 0) {
          count = this.leadsData.length//filter(e => e.priority === 1 || e.priority === 2 || e.priority === 3 || e.priority === 4 || e.priority === 5).length
          //this.totalLength=items.length
        }

        else if (this.activeTab === 2) {
          count = this.leadsData.filter(e => this.DaysLeft(e.created_at, e.due_date) < 0).length
          // this.overDueLength=items.length
        } else if (this.activeTab === 5) {
          // let today= new Date()
          // let firstDay=new Date(today.setDate(today.getDate() - today.getDay()));
          // let lastDay=new Date(today.setDate(today.getDate() - today.getDay() + 6));
          // console.log(firstDay)
          // console.log(lastDay)
          // let differenceInMilliseconds=lastDay.getTime()-firstDay.getTime()
          // let differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
          // console.log(differenceInDays)

          //  let day = date.getDate();
          //  console.log('this is dayyyyyyyyyy',day)
          count = this.leadsData.filter(e => this.DaysLeft(e.created_at, e.due_date) <= 6 && this.DaysLeft(e.created_at, e.due_date) >= 0).length



        }
        return count
      }
    },
    items() {

      var items = [];
      if (this.setPrivileges.viewAll === true) {
        if (this.$router.currentRoute.name == "tasks") {
          // check if the user is owner or not
          if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
            items = this.$store.state.tasks.all.filter(e => e.type === 'task');
            // items = this
          } else {

            this.$store.state.tasks.all.filter(e => e.type === 'task').forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                items.push(a)
              }

            });
          }

        } else {

          // items = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
          // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
          items = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead').filter(e => e.type === 'lead');

          //   // items = this
          // } else {
          // this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          //   if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
          //     items.push(a)
          //   }

          // });
          // }
          if (this.activeTab === 0) {
            items = items.filter(e => e.type === 'lead')



          }
          else if (this.activeTab === 1) {

            items = items.filter(e => e.priority === 5 || e.priority === 4)

          }

          else if (this.activeTab === 2) {
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) < 0)

          } else if (this.activeTab === 3) {
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) >= 0 && this.DaysLeft(e.created_at, e.due_date) < 1)


          } else if (this.activeTab === 4) {
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) > 0 && this.DaysLeft(e.created_at, e.due_date) <= 1)
            // if(items.length==0){
            //   this.checkIsEmpty=true
            // }else{
            //   this.checkIsEmpty=false
            // }


          }

          else if (this.activeTab === 5) {
            // let today= new Date()
            // let firstDay=new Date(today.setDate(today.getDate() - today.getDay()));
            // let lastDay=new Date(today.setDate(today.getDate() - today.getDay() + 6));
            // console.log(firstDay)
            // console.log(lastDay)
            // let differenceInMilliseconds=lastDay.getTime()-firstDay.getTime()
            // let differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
            // console.log(differenceInDays)

            //  let day = date.getDate();
            //  console.log('this is dayyyyyyyyyy',day)
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) <= 6 && this.DaysLeft(e.created_at, e.due_date) > 0)


          }

        }

        //{


        //    const date1 = new Date(e.created_at);
        //    const date2 = new Date(e.due_date);
        //    const diffInMilliseconds = date2.getTime() - date1.getTime();
        //    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
        //    e.diffInDays<0
        //   }

        //)


        // var users= items.map(item => item.users.length > 0 ? item : null)
        // var users= items.map(item => item.users.length > 0 ?? item.id)
        // items.splice(users)
        var element = [];
        var element2 = "";
        for (let index = 0; index < items.length; index++) {
          element[index] = items[index];

          if (
            (items[index].users.length === 0 && this.filterUsers != null) ||
            (items[index].status_master == null && this.filterStatus != null)
          ) {
            // if(this.filterUsers != null){
            element.splice(element.indexOf(element[index]), 1);

            // }
            // if(this.filterUsers == null){
            //   element[index] = items[index]
            // }
          }
        }

        this.leadsData = element.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        return
        // } else {
        //   var items = [];

        //   var element = [];
        //   var element2 = "";
        //   for (let index = 0; index < items.length; index++) {
        //     element[index] = items[index];

        //     if (
        //       (items[index].users.length === 0 && this.filterUsers != null) ||
        //       (items[index].status_master == null && this.filterStatus != null)
        //     ) {
        //       // if(this.filterUsers != null){
        //       element.splice(element.indexOf(element[index]), 1);

        //       // }
        //       // if(this.filterUsers == null){
        //       //   element[index] = items[index]
        //       // }
        //     }
        //   }
        //   let arr = element.sort(
        //     (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        //   );

        // let result = [arr[0]];

        this.leadsData = items.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        return;
      } else {
        if (this.$router.currentRoute.name == "tasks") {
          // check if the user is owner or not
          // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
          //   items = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
          //   // items = this
          // } else {

            this.$store.state.tasks.all.filter(e => e.type === 'task').filter(e => e.type === 'task').forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                items.push(a)
              }

            });
          // }

        } else {

          // items = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
          // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
          //   items = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead').filter(e => e.type === 'lead');

          //   // items = this
          // } else {
          this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
            if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
              items.push(a)
            }

          });
          // }
          if (this.activeTab === 0) {
            items = items.filter(e => e.type === 'lead')



          }
          else if (this.activeTab === 1) {

            items = items.filter(e => e.priority === 5 || e.priority === 4)

          }

          else if (this.activeTab === 2) {
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) < 0)

          } else if (this.activeTab === 3) {
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) >= 0 && this.DaysLeft(e.created_at, e.due_date) < 1)


          } else if (this.activeTab === 4) {
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) > 0 && this.DaysLeft(e.created_at, e.due_date) <= 1)
            // if(items.length==0){
            //   this.checkIsEmpty=true
            // }else{
            //   this.checkIsEmpty=false
            // }


          }

          else if (this.activeTab === 5) {
            // let today= new Date()
            // let firstDay=new Date(today.setDate(today.getDate() - today.getDay()));
            // let lastDay=new Date(today.setDate(today.getDate() - today.getDay() + 6));
            // console.log(firstDay)
            // console.log(lastDay)
            // let differenceInMilliseconds=lastDay.getTime()-firstDay.getTime()
            // let differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
            // console.log(differenceInDays)

            //  let day = date.getDate();
            //  console.log('this is dayyyyyyyyyy',day)
            items = items.filter(e => this.DaysLeft(e.created_at, e.due_date) <= 6 && this.DaysLeft(e.created_at, e.due_date) > 0)


          }

        }

        //{


        //    const date1 = new Date(e.created_at);
        //    const date2 = new Date(e.due_date);
        //    const diffInMilliseconds = date2.getTime() - date1.getTime();
        //    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
        //    e.diffInDays<0
        //   }

        //)


        // var users= items.map(item => item.users.length > 0 ? item : null)
        // var users= items.map(item => item.users.length > 0 ?? item.id)
        // items.splice(users)
        var element = [];
        var element2 = "";
        for (let index = 0; index < items.length; index++) {
          element[index] = items[index];

          if (
            (items[index].users.length === 0 && this.filterUsers != null) ||
            (items[index].status_master == null && this.filterStatus != null)
          ) {
            // if(this.filterUsers != null){
            element.splice(element.indexOf(element[index]), 1);

            // }
            // if(this.filterUsers == null){
            //   element[index] = items[index]
            // }
          }
        }

        this.leadsData = element.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        return
      }



      //{


      //    const date1 = new Date(e.created_at);
      //    const date2 = new Date(e.due_date);
      //    const diffInMilliseconds = date2.getTime() - date1.getTime();
      //    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
      //    e.diffInDays<0
      //   }

      //)


      // var users= items.map(item => item.users.length > 0 ? item : null)
      // var users= items.map(item => item.users.length > 0 ?? item.id)
      // items.splice(users)
      //   var element = [];
      //   var element2 = "";
      //   for (let index = 0; index < items.length; index++) {
      //     element[index] = items[index];

      //     if (
      //       (items[index].users.length === 0 && this.filterUsers != null) ||
      //       (items[index].status_master == null && this.filterStatus != null)
      //     ) {
      //       // if(this.filterUsers != null){
      //       element.splice(element.indexOf(element[index]), 1);

      //       // }
      //       // if(this.filterUsers == null){
      //       //   element[index] = items[index]
      //       // }
      //     }
      //   }

      //   this.leadsData = element.sort(
      //     (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      //   );
      // return;
    },

  },

  // mounted(){
  //   if(this.dropTask===true){
  //   this.dropTask=false
  //  }
  // },
   
  created() {

  

    //console.log('helllllloooooooooo',this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead'))


    let loggedIn = isUserLoggedIn();
    if (loggedIn) {
      if(this.$store.state.designation.all.length > 0){
      this.showPrivileges()

      }
      this.fetchAll();
      if (this.outBoundEmails.length === 0) {
        this.$store.dispatch("emails/fetch_all_out_mails");
      }
      this.$store.dispatch("proposals/fetch");
      this.$store.dispatch("invoice/fetch");

      if (this.$store.state.branches.states.length === 0) {
        // this.$store.dispatch('branches/states')
      }
      // this.$store.dispatch("leads/fetch");
      this.$store.dispatch("branches/fetch");
      this.$store.dispatch("clients/fetch");
      this.$store.dispatch("contactPeople/fetchForLeads");
      this.$store.dispatch("contactPeople/fetch");

      this.$store.dispatch("categories/fetch");
      this.$store.dispatch("status/fetch");
    }
    // this.$store.dispatch('comments/fetch');
    this.observer = new IntersectionObserver(this.infiniteScroll);
    // const toast = useToast();
    // toast.success('you did it');
  },
  //   activated() {
  //     if (this.$router.currentRoute.params.overdue_status === true) {
  //       this.activeTab = 2


  //     }
  //     else if (this.$router.currentRoute.params.dueToday_status === true) {
  //       this.activeTab = 3


  //     }
  //     else if (this.$router.currentRoute.params.dueTomorrow_status === true) {
  //       this.activeTab = 4


  //     }
  //     else if (this.$router.currentRoute.params.dueThisWeek_status === true) {
  //       this.activeTab = 5


  //     }
  // },
  beforeUpdate() {
    this.pclient = this.$store.state.clients.latestCreated
    this.autofillClient();
    // }, 1000);
    // setInterval(() => {
    this.pcontact = this.$store.state.contactPeople.latestCreated
    this.autofillContact()
    // if(this.totalLength==0 || this.dueTomorrowLength==0 || this.importantLength==0 || this.overDueLength==0 || this.dueTodayLength==0 || this.dueThisWeekLength==0){
    //   this.checkIsEmpty=true
    // }else{
    //   this.checkIsEmpty=false
    // }
    if (this.$router.currentRoute.params.important_status === true) {
      this.activeTab = 1


    }
    if (this.$router.currentRoute.params.overdue_status === true) {
      this.activeTab = 2


    }
    else if (this.$router.currentRoute.params.dueToday_status === true) {
      this.activeTab = 3


    }
    else if (this.$router.currentRoute.params.dueTomorrow_status === true) {
      this.activeTab = 4


    }
    else if (this.$router.currentRoute.params.dueThisWeek_status === true) {
      this.activeTab = 5


    }
    this.expense.users = this.all_expense_users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)


    var signAll = []
    if (this.$store.state.users.signAll != null) {
      signAll.push(this.$store.state.users.signAll)
    }
    if (signAll.length > 0) {
      // this.composeData.message = signAll[0].signature
    }
    // var signAll = [this.$store.state.users.signAll];
    // this.threadedMail()
    this.totalBadgeCounts();
    this.importantBadgeCounts();
    this.overdueBadgeCounts();
    this.dueTodayBadgeCounts();
    this.dueTomorrowBadgeCounts();
    this.dueThisWeekBadgeCounts();
    var invoice = this.$store.state.invoice.all;
    // invoice.forEach(element => {
    //   this.payment.payment.push({amount:null})
    // });
    //  if (invoice.length > 0) {
    // }
    // this.prefixPlusid = this.invoice.prefix + this.invoice.id;
    const invoicesAllData = this.$store.state.invoice.allData;
    if (invoicesAllData.length > 0) {

      this.lastInvoiceId = Number(invoicesAllData[invoicesAllData.length - 1].id);
    }
    else {
      this.lastInvoiceId = 0;
    }
    this.lastInvoiceId = this.lastInvoiceId + 1;
    this.prefixPlusid = this.invoice.prefix + this.lastInvoiceId;
    // document.getElementById('flatpickr-date').removeAttribute('readonly')
    // var invoice = this.$store.state.invoice.all;
    // if (invoice.length > 0) {
    //   this.invoice.id = invoice[invoice.length - 1].id + 1
    // } else {
    //   this.invoice.id = 1
    // }
    if (this.successMessage) {
      if (this.$store.state.leads.isLoadingLeads == true) {
        // this.$toast.info({component: ToastificationContent,props:{text:'Info '}}, {position: POSITION.BOTTOM_LEFT})
        // const toast = useToast;
        // toast.success('hee')
        // this.$toast.success(this.successMessage, {
        //   position: "bottom-left",
        //   timeout: 5000,
        //   closeOnClick: true,
        //   pauseOnFocusLoss: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   draggablePercent: 0.6,
        //   showCloseButtonOnHover: false,
        //   hideProgressBar: true,
        //   closeButton: "button",
        //   icon: true,
        //   rtl: false
        // })
        // this.$refs.snackbar[t](this.successMessage)
        // this.$toast(
        // {
        //   component: ToastificationContent,
        //   props: {
        //     title: this.successMessage,
        //     icon: "CheckIcon",
        //     variant: "dark",
        //   },
        // },{
        //   position: "bottom-left",
        //   timeout: 8000
        // }
        // )
      }
    }

  },

  updated() {
    // setInterval(() => {

    this.pclient = this.$store.state.clients.latestCreated
    this.autofillClient();
    // }, 1000);
    // setInterval(() => {
    this.pcontact = this.$store.state.contactPeople.latestCreated
    this.autofillContact()
    // }, 1000);
    // this.getTaxbleAmt()
    var t = "info";
    // if(this.errors != ''){
    //   console.log('hhh');
    //   this.$toast.error('this.errors.branch_id[0]', {
    //     position: "bottom-left",
    //     timeout: 5000,
    //       closeOnClick: true,
    //       pauseOnFocusLoss: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       draggablePercent: 0.6,
    //       showCloseButtonOnHover: false,
    //       hideProgressBar: true,
    //       closeButton: "button",
    //       icon: true,
    //       rtl: false
    //     })
    //   }
  },

  
  methods: {
    generateExcelData() {
  const data = [
    ['Name', 'Email'],
    ['John Doe', 'john@example.com'],
    ['Jane Smith', 'jane@example.com'],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  return excelBuffer;
},
downloadExcel() {
    let arr = []
    for (let index = 0; index < this.leadsData.length; index++) {
      // const element = array[index];
      arr[index] = [this.leadsData[index].priority,this.leadsData[index].id,this.leadsData[index].subject,this.leadsData[index].client ? this.leadsData[index].client.name:this.leadsData[index].contact_person.name,this.leadsData[index].subject,this.formatDate(this.leadsData[index].created_at),this.DaysLeft(this.leadsData[index].created_at,this.leadsData[index].due_date),this.leadsData[index].status_master.type  ]
    }
    // this.leadsData.forEach(element => {
    //       arr.push({
    //         priority:element.priority,
    //         id:element.id,
    //         subject:element.subject,
    //         client:element.client ? element.client.name : element.contact_person.name,
    //         postDate:this.formatDate(element.created_at),
    //         daysLeft:this.DaysLeft(element.created_at,element.due_date),
    //         status:element.status_master.type
    //       })
    //     });
        // let fk = []
        // arr.forEach(element => {
        //   fk.push()
        // });
   const data = [
        ['Priority', '#', 'Client','Subject','Post Date','Days left', 'Status'],
        arr[0]
      ];

      // Prepare the CSV content
      const csvContent = "" +
        data.map(row => row.join(',')).join('\n');

      // Create a Blob object
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
},

    getPercentProposal(data){
      // return this.getStatusForInvoice(data); 
      if(this.getStatusForProposal(data) === 'not invoiced'){

        return 0
      }else{
        return Number(this.getStatusForProposal(data).split('%')[0])
      }
    },
    openFollowUp(){
      this.$bvModal.show('follow-up-modal')
      this.$store.dispatch('followUp/fetchActivity').then(() => {
      })
      
    },
    markAsChecked(data,event){
      console.log(data)
      // const d = 
      if(data.checked === true){
        this.$store.dispatch('followUp/update',{
          payload:{
        status:'done'
      },
      id:data.id
        }).then(() => {
          this.$store.dispatch('followUp/get', this.$store.state.leads.expandedTaskId)
        })
      }
    },
    twelveHrFormat(data){
      const timeArray = data.time.split(':');
      let hours = parseInt(timeArray[0]);
      const minutes = timeArray[1];
      let ampm = 'AM';
      if (hours >= 12) {
        ampm = 'PM';
      }
      if (hours > 12) {
        hours -= 12;
      }
      if (hours === 0) {
        hours = 12;
      }
      return `${hours}:${minutes} ${ampm}`;
    },
    getFollowUpDate(data){
      const date = new Date(data.date)
      const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const months = ['', 'Jan', 'Feb', 'Mar', 'May', 'Jun', 'July','Aug', 'Sep','Oct','Nov','Dec'];

      const hours = this.twelveHrFormat(data)//`${date.getHours() < 10 ? '0'+date.getHours():date.getHours()}:${date.getMinutes()} `
      const d = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${hours}`
      return d
    },
    getFollowUpData(type){
      let task_id = this.$store.state.leads.expandedTaskId
      let data = this.$store.state.followUp.all;
      let items = []
      // const date = new Date();
      // const current_date = `${date.getFullYear()}-${date.getMonth()}-${date.}`
      data.forEach(element => {
        const d = new Date(element.date)
        const b = new Date(this.currentDate)
        if(type === 'history'){
          if(element.status !== 'pending'){
            items.push({
              activity_type:element.activity_type,
              audits:element.audits,
              created_at:element.created_at,
              date:element.date,
              description:element.description,
              id:element.id,
              status:element.status,
              task_id:element.task_id,
              time:element.time,
              updated_at:element.updated_at,
              _activity_type_id:element._activity_type_id,
              checked:false,
            });
          }

        }
        if(element.status === 'pending'){

        
         if(type === 'pending'){
          // const d = new Date(element.date)
          // const b = new Date(this.current_date)
          if(element.date === this.currentDate || d< b){
            items.push({
              activity_type:element.activity_type,
              audits:element.audits,
              created_at:element.created_at,
              date:element.date,
              description:element.description,
              id:element.id,
              status:element.status,
              task_id:element.task_id,
              time:element.time,
              updated_at:element.updated_at,
              _activity_type_id:element._activity_type_id,
              checked:false,
            })
          }
          
        }
         if(type === 'upcoming'){
          // const d = new Date(element.date)
          // const b = new Date(this.current_date)
          if(d > b){
            items.push({
              activity_type:element.activity_type,
              audits:element.audits,
              created_at:element.created_at,
              date:element.date,
              description:element.description,
              id:element.id,
              status:element.status,
              task_id:element.task_id,
              time:element.time,
              updated_at:element.updated_at,
              _activity_type_id:element._activity_type_id,
              checked:false,
            })
          }
          
        }
      }
      });
      return items;
    },
    openInDrive(url,name) {

// window.open(url, '_blank')
if(url.includes('docs.google.com/spreadsheets')){
  
  url = url+'/export?format=xlsx'
}
if(url.includes('docs.google.com/document')){
  
  url = url+'/export?format=docx'
}
// if(url.includes('document')){
  //   url+'export?format=docx'
  // }
  if(url.includes('drive.google.com')){
    // let id = url.split('open?id=')[1]
   url= url+ '&export=download'
  }
  // alert(url)
  // return;
const fileUrl = url
// Create a new anchor element with the file URL as the href attribute
const downloadLink = document.createElement('a')
downloadLink.href = fileUrl
// Set the download attribute to force the browser to download the file instead of navigating to it
downloadLink.setAttribute('target','__blank')

downloadLink.setAttribute('download', name)
// Append the anchor element to the document body
document.body.appendChild(downloadLink)
// Click the anchor element to initiate the download
downloadLink.click()
// Remove the anchor element from the document body
document.body.removeChild(downloadLink)
// window.
},
    saveAsTemplate(){
      let arr = []
      this.proposalFields.forEach((data) => {
        arr.push({
          title: data.title,
          description: data.desc,
        });
      });
   
      const data = {
                template_name: this.psubject,
                templateSection: arr
            };
            this.$store.dispatch('proposals/store', data).then(() => {
              this.$toast.success("Proposal Template Created Successfully!", {
        position: "bottom-left",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
                // this.$refs['template-new-modal'].hide()
                // this.$store.dispatch('proposals/fetch')
                // this.remove_all_fields()
            })

    },
    getMoreUsers(users){
      let arr = users;
      return arr.slice(2).length//.splice(0,4).length;
    },
    deleteAttachment(attachment_id) {
      let TaskId = this.$store.state.leads.expandedTaskId;

      this.$store.dispatch('tasks/deleteFromTask', attachment_id).then(() => {
        this.$store.dispatch('tasks/getAttachments', TaskId)

      })
    },
    convertToClient(attachment_id) {
      let TaskId = this.$store.state.leads.expandedTaskId;
      this.$store.dispatch('tasks/convertToClient', {
        id: attachment_id,
        task_id: TaskId
      }).then(() => {
        this.$store.dispatch('tasks/getAttachments', TaskId)
      })
    },
    convertToTask(attachment_id) {
      let TaskId = this.$store.state.leads.expandedTaskId;
      this.$store.dispatch('tasks/convertToTask', {
        id: attachment_id,
        task_id: TaskId
      }).then(() => {
        this.$store.dispatch('tasks/getAttachments', TaskId)
      })
    },
    showPrivileges() {
      let priveleges = [];
      let data = this.previleges;
      let roles = this.$store.state.users.all;
      let currUser = roles.filter((x) => {
        return x.id === JSON.parse(localStorage.getItem("userData")).id;
      });

      if (this.$store.state.users.all.length > 0) {
           let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id

        let designations = this.$store.state.designation.all;

        let d2 = designations.filter((x) => {
          for (let i = 0; i < x.users.length; i++) {
            if (x.users[i].user_role_id === currUser[0].user_role_id) {
              return true;
            }
          }
          return false;
        });

        d2.forEach((x) => {
          x.privileges.forEach((y) => {
            priveleges.push(y);
          });
        });

        let arr = [];

        this.$store.state.status.all_master.forEach((x) => {
          if (x.name === "Tasks") {
            x.privileges.forEach((y) => {
              priveleges.forEach((z) => {
                if (y.id === z.privilege_id) {
                  arr.push({
                    name: y.name,
                    status: z.status,
                  });
                }
              });
            });
          }
        });

        console.log(arr, "ppppppppppp");

        arr.forEach((x) => {
          console.log(x.name === "Leads Editing", "nnnnnnnnnn");
          if (x.name === "Tasks Editing") {
            if (x.status === "active") {
              data.edit = true;
            }else{
              data.edit = false;

            }
          } else if (x.name === "View All Tasks") {
            if (x.status === "active") {
              data.viewAll = true;
            }else{
              data.viewAll = false;

            }
          } else if (x.name === "Tasks On Row Editing") {
            if (x.status === "active") {
              data.onRowEdit = true;
            }else{
              data.onRowEdit = false;

            }
          } else if (x.name === "Accounts") {
            if (x.status === "active") {
              data.accounts = true;
            }else{
              data.accounts = false;

            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === "active") {
              data.clientDetails = true;
            }else{
              data.clientDetails = false;

            }
          } else if (x.name === "Timesheet") {
            if (x.status === "active") {
              data.timeSheet = true;
            }else{
              data.timeSheet = false;

            }
          } else if (x.name === "Checklist") {
            if (x.status === "active") {
              data.checklist = true;
            }else{
              data.checklist = false;

            }
          } else if (x.name === "Tasks Delete") {
            if (x.status === "active") {
              data.delete = true;
            }else{
              data.delete = false;

            }
          } else if (x.name === "Tasks Download") {
            if (x.status === "active") {
              data.download = true;
            }else{
              data.download = false;

            }
          } else if (x.name === "Task Value") {
            if (x.status === "active") {
              data.value = true;
            }else{
              data.value = false;

            }
          } else if (x.name === "Estimates $ Invoices") {
            if (x.status === "active") {
              data.inovices = true;
            }else{
              data.inovices = false;

            }
          }
        });

        console.log(data, "mmmmmmmmmmm");
      }
      return data;
    },
    refreshStop(cardName) {
      setTimeout(() => {
        this.$refs[cardName].showLoading = false
      }, 3000)
    },
    getTaskId(id) {
      this.$store.state.leads.expandedTaskId = id;
      console.log("inside gettask", id)
    }
    ,
    showTaskFiles() {
      let id = this.$store.state.leads.expandedTaskId
      let data = this.$store.state.tasks.allAttachments;
      let filter = [];
      let num = 0;
      data.forEach((element) => {
        if (element.type === "task") {

          //   let split = element.attachment.split("/");
          //   element.name = split[split.length - 1];
          filter.push(element);
          num++;
        }
      });
      this.taskNum = num;
      return filter;
    },
    showClientFiles() {
      let id = this.$store.state.leads.expandedTaskId

      let data = this.$store.state.tasks.allAttachments;
      let filter = [];
      let num = 0;
      data.forEach((element) => {
        if (element.type === "company") {

          //   let split = element.attachment.split("/");
          //   element.name = split[split.length - 1];
          filter.push(element);
          num++;
        }
      });
      this.taskNum = num;
      return filter;
    },
    getUniqueTime(data) {
      const originalArray = data;

      const uniqueArray = Array.from(new Set(originalArray.map(a => a.user_id))).map(id => {
        return originalArray.find(a => a.user_id === id)
      })

      //       for (let i = 0; i < originalArray.length; i++) {
      //   if (!uniqueArray.includes(originalArray[i].user_id)) {
      //     uniqueArray.push(originalArray[i]);
      //   }
      // }
      console.log('unique: ', uniqueArray)
      return uniqueArray;
    },
    getUserTotal(user_id, time_sheet) {
      let data = this.$store.state.users.all.filter(e => e.id === user_id);
      let arr = [];
      time_sheet.forEach(cb => {
        data.forEach(e => {
          if (cb.user_id === e.id) {
            arr.push(cb)
          }
        });
      });
      let time = this.getTotalTime(arr)
      // data.time_devoted.substr(0,data.time_devoted.length - 3)
      return time;
    },
    getUserTimeCost(user_id, time_sheet) {
      let data = this.$store.state.users.all.filter(e => e.id === user_id);
      let arr = [];
      time_sheet.forEach(cb => {
        data.forEach(e => {
          if (cb.user_id === e.id) {
            arr.push(cb)
          }
        });
      });
      let time = this.getTotalCost(arr)
      // data.time_devoted.substr(0,data.time_devoted.length - 3)
      return time;
    },
    getUserTimeContri(user_id, time_sheet) {
      let data = this.$store.state.users.all.filter(e => e.id === user_id);
      let arr = [];
      time_sheet.forEach(cb => {
        data.forEach(e => {
          if (cb.user_id === e.id) {
            arr.push(cb)
          }
        });
      });
      let time = this.getTotalContri(arr)
      // data.time_devoted.substr(0,data.time_devoted.length - 3)
      return time;
    },
    getTotalData(user_id) {
      let data = this.$store.state.users.all.filter(e => e.id === user_id)
      if (data.length > 0) {

        return data[0].name
      }
    },
    getTotalContri(data) {
      const arr = []
      let sum = 0;
      data.forEach(element => {
        arr.push(Number(this.getContri(this.getCostPerHr(this.$store.state.users.all.find(e => e.id ===
          element.user_id).monthly_cost), element.time_devoted)))
      });

      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum.toFixed(2);
    },
    getTotalCost(timeSheetData) {
      const arr = []
      let sum = 0;
      timeSheetData.forEach(element => {
        arr.push(Number(this.getCostPerHr(this.$store.state.users.all.find(e => e.id ===
          element.user_id).monthly_cost)))
      });

      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum.toFixed(2);
    },
    getFormatedDate(date) {
      const d = new Date(date)
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${d.getDate()} ${month[d.getMonth() + 1]}, ${d.getFullYear()}`
    },
    getTotalTime(timeArray) {
      const inputFields = []
      timeArray.forEach(element => {
        inputFields.push(element.time_devoted)
      });
      // let local = JSON.parse(localStorage.getItem('userTimesheet'))
      // if(local !== null){

      //     inputFields.push(local.total_worked_hour)
      // }
      // console.log(inputFields);
      const timeArrays = [];
      // const timeArray = []
      for (let i = 0; i < inputFields.length; i++) {
        const timeArray = inputFields[i].split(',').map(time => time.split(':'));
        // const timeArray = inputFields[i].split(':')
        timeArrays.push(timeArray);
      }
      console.log(timeArrays);


      const totalMinutes = timeArrays.reduce((total, timeArray) => {
        const timeMinutes = timeArray.reduce((acc, [hours, minutes]) => acc + parseInt(hours) * 60 + parseInt(minutes), 0);
        return total + timeMinutes;
      }, 0);

      // Convert total minutes to hours and minutes

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      // const date_hours = new Date('2022-04-13 '+this.totalHours)
      // if(date_hours.getHours() < 23 && date_hours.getMinutes() < 59){

      return (String(hours).length === 1 ? '0' + String(hours) : String(hours)) + ':' + (String(minutes).length === 1 ? '0' + String(minutes) : String(minutes))

    },

    getContri(cost, time) {
      // const cm = (Number(cost) * 150) / (22*7*60*100)
      const t = new Date('2023-04-13 ' + time)
      const minutes = t.getHours() * 60 + t.getMinutes()
      const contri = (cost / 60) * minutes;

      return contri.toFixed(2);
    },
    getCostPerHr(salary) {
      const cost = (Number(salary) * 150) / (22 * 7 * 100)
      return cost.toFixed(2);
    },
    select() {
      this.selectedCheckbox = []
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selectedCheckbox.push(this.items[i].id)
          // console.log(this.items[i].id)
        }
      }
      // console.log(this.items[])
    },
     rowClass(item) {
      var text = ''
      if (item) {

        if (item.task_read == null) {
          text = '';
        } else {

           text = 'task-read'
        }
        if(item.status_master ){

if(item.status_master.type === 'closed' || item.status_master.type === 'completed'  || this.setPrivileges.onRowEdit === false){
  text = text + ' dont-row-edit'
}else{
  text = text
}
}
      }
      
      return text
    },
    selectSingle(id) {
      // item.isSelected =  !item.isSelected
      console.log(id);
      //   const id = item.srcElement.value
      // console.log()
      // var items = []
      this.items.forEach(element => {
        if (element.id === id) {

          element.isSelected = !element.isSelected
          // items.push(element)
        }
      });

      //  this.items = items
      return;
    },
    toggle234() {
      // this.isSelected=!this.isSelected
      // alert(this.items.length)
      var items = []
      this.$store.state.leads.all.forEach(element => {
        element.isSelected = !element.isSelected
        items.push(element)
      });
      this.items = items;
      if (items.length > 0) {
        this.isShow = !this.isShow
      }
      return;
    },
    checkRead(id) {
      if (this.$store.state.leads.checkRead.length > 0) {
        if (this.$store.state.leads.checkRead.filter(e => e.task_id === id)) {

          return true
        } else {
          return false
        }
      } else {
        return false;
      }
    },

    destroyPayment(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("recordPayment/destroy", id).then(() => {
          this.$store.dispatch("recordPayment/get", this.taskId);
        });
      }
    },
    destroyExpense(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("expenses/destroy", id).then(() => {
          this.$store.dispatch("expenses/get", this.taskId);
        });
      }
    },
    addExpense() {
      let ar = []
      this.expense.users.forEach(element => {
        ar.push({ user_id: element.id })
      });
      const data = {
        task_id: this.taskId,
        description: this.expense.description,
        date: this.expense.date,
        expense: this.expense.expense,
        users: ar
      };
      this.$store.dispatch('expenses/store', data).then(() => {
        this.expense.description = ""
        this.expense.expense = null
        this.expense.date = this.currentDate
        this.expense.users = this.all_expense_users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)

        // this.$store.dispatch('expenses/get', this.taskId)
      })
      // console.log(data);
    },
    file_upload() {
      console.log("hloo2:file_upload");
      document.getElementById("file_attachment").click();
      //  this.uploadFileS3(this.file_name2)
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // var base = reader.readAsDataURL(image)
      // console.log(base);
      // console.log(e);
    },
    onFileChange2(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2");

      let image = e.target.files;
      console.log("e:", e);
      this.file_name2 = [];
      console.log("inside onload before2:", this.file_name2);
      // console.log(image.length);
      image.forEach((x) => {
        const reader = new FileReader();

        console.log("reader:", reader);
        reader.onload = (e) => {
          let data = {
            file: e.target.result,
            name: x.name,
          };
          console.log("data:", data);
          console.log("inside onload before:", this.file_name2);
          this.file_name2.push(data);
          console.log("inside onload:", this.file_name2);
          console.log("inside onload:", this.file_name2.length);
          //  var data1 =  {
          this.uploadFileS3Task(this.file_name2);
          //attach:this.file_name2.length>0 ? this.file_name2 : "null"};

          //console.log("data-in-upload:",data1)

          //  console.log()
          //this.$store.dispatch('tasks/upload_file_s3', { data: data1}).then(() => {

          //  }).catch(() => {

          //   })

          // url[index] = data;
        };

        // const element = array[index];

        reader.readAsDataURL(x);
        // reader.readAsDataURL(this.file_name2[index])
        // console.log(cd);

        // real_url[index] = url;
        //  console.log(this.file_name2);
      });

      // alert(this.file_name2);

      // if(this.file_name2.length > 0){
      console.log("inside onload after the loop:", this.file_name2);
      //   if(this.file_name2.length > 0){
      // this.uploadFileS3(this.file_name2)

      //   }
      // }
      // console.log(cd);
      // var base = reader.readAsDataURL(image)
      //   console.log(reader);
      // this.file_name2 =
      //   image.name
      // type: image.type

      // console.log(e.target.files[0]);

      /* var data =  {
        attach:this.file_name2.length>0 ? this.file_name2 : "null"};

      console.log("data-in-upload:",data)

      console.log()
      this.$store.dispatch('tasks/upload_file_s3', { data: data}).then(() => {



      }).catch(() => {


      })*/
    },
    uploadFileS3Task(file) {
      // document.getElementById('fileUpload2').click()
      console.log("filelength:", file.length);
      console.log("file:", file);
      var data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch("tasks/upload_file_s3", { data: data });
      // .then(() => {
      //   // resolve();
      // })
      // .catch(() => {});
      //   var emails_data = {
      //   folder: router.currentRoute.params.folder,
      //   currrent : JSON.parse(localStorage.getItem('userData'))
      // };
      // this.$store.dispatch('emails/fetch_emails', emails_data)
    },


    sendEmail2(data2, file_name2) {
      // alert('he')
      data2.subject = this.replySubject
      console.log("sending emails...");
      console.log(data2, "data2");
      var bcc_email = [];
      var cc_email = [];

      var s3_url = null;
      var s3_urls = [];
      if (this.$store.state.tasks.s3_url.length > 0) {
        s3_url = this.$store.state.tasks.s3_url;
      }
      if (s3_url != null) {
        for (let index = 0; index < s3_url.length; index++) {
          s3_urls[index] = s3_url[index].url;
        }
      }
      if (!data2.from || !data2.message || !data2.to || !data2.subject) {
        return;
      } else {
        this.$refs["reply-modal"].hide();
      }
      if (data2.bcc) {
        data2.bcc.forEach(function (email, index) {
          // console.log(email.email);
          bcc_email[index] = email.email;
        });
      }
      if (data2.cc) {
        data2.cc.forEach(function (email, index) {
          // console.log(email.email);
          cc_email[index] = email.email;
        });
      }
      var data = {};
      if (data2.bcc || data2.cc) {
        data = {
          to: data2.to,
          bcc: data2.bcc,
          cc: data2.cc,
          attach_url: s3_urls,
          message: data2.message,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          subject: data2.subject,
          from: data2.from,
        };
      } else {
        data = {
          to: data2.to,
          // "bcc" : bcc_email,
          // "cc" : cc_email,
          attach_url: s3_urls,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          message: data2.message,
          subject: data2.subject,
          from: data2.from,
        };
      }
      this.$toast.success("Sending", {
        position: "bottom-left",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      console.log(data);
      // this.success = this.$toast();
      this.$store.dispatch("emails/sendEmail", { data }).then(() => {
        // console.log(res);
        if (this.successMessage) {
          this.$toast.success('Email Sent Succesfully!', {
            position: "bottom-left",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
        // this.$refs['compose-modal'].hide()
        this.composeData.to = "";
        this.composeData.from = "";
        this.composeData.cc = "";
        this.composeData.bcc = "";
        this.composeData.subject = "";
        this.composeData.message = "";
        while (this.file_name2.length > 0) {
          this.file_name2.pop();
        }
        this.$store.state.tasks.s3_url = []

        // while (this.name_to_display.length > 0) {
        //   this.name_to_display.pop();
        // }
        // for (let index = 0; index < this.file_name2.length; index++) {

        //   this.file_name2.splice(this.file_name2.indexOf(this.file_name2[index]), this.file_name2.length)
        // }
        // for (let index = 0; index < this.name_to_display.length; index++) {
        //   // const element = array[index];

        //   this.name_to_display.splice(this.name_to_display.indexOf(this.name_to_display[index]), this.name_to_display.length)
        // }

        // this.$emit('update:shall-show-email-compose-modal', false)
      });
    },
    openCalendar(id) {
      document.getElementById('vue-date-pickr' + id).click()
    },
    chooseFileTask() {
      document.getElementById('file_task').click()
    },
    // onTabChange(tab){
    //   console.log(this.activeTab, "this is active tab")
    //   if(this.activeTab==0){
    //    console.log('hello this is avtive tab')
    //   }
    // },
    async totalBadgeCounts() {
      let data = [];
      // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
      //   data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      //   // items = this
      // } else {
      //   this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
      //     if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
      //       data.push(a)
      //     }

      //   });
      // let leads = this.$store.state.leads.all.filter
      // }
      // data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      if (this.setPrivileges.viewAll === true) {

        data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      } else {
        this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
            data.push(a)
          }
        });
      }

      //data = data//.filter(e => e.priority === 1 || e.priority === 2 || e.priority === 3 || e.priority === 4 || e.priority === 5)
      this.totalLength = data.length
    },
    async importantBadgeCounts() {
      // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      let data = [];
      // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
      //   data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   // items = this
      // } else {
      //   this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
      //     if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
      //       data.push(a)
      //     }

      //   });
      // data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      if (this.setPrivileges.viewAll === true) {

        data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      } else {
        this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
            data.push(a)
          }
        });
      }
      // }
      data = data.filter(e => e.priority === 5 || e.priority === 4)
      this.importantLength = data.length
    },
    async overdueBadgeCounts() {
      // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      let data = [];
      // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
      //   data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   // items = this
      // } else {
      //   this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
      //     if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
      //       data.push(a)
      //     }
      // data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      if (this.setPrivileges.viewAll === true) {

        data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      } else {
        this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
            data.push(a)
          }
        });
      }

      //   });
      // }
      data = data.filter(e => this.DaysLeft(e.created_at, e.due_date) < 0)
      this.overDueLength = data.length
    },
    async dueTomorrowBadgeCounts() {
      // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      let data = [];
      // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
      //   data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   // items = this
      // } else {
      //   this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
      //     if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
      //       data.push(a)
      //     }

      //   });
      // }
      // data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      if (this.setPrivileges.viewAll === true) {

        data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      } else {
        this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
            data.push(a)
          }
        });
      }

      data = data.filter(e => this.DaysLeft(e.created_at, e.due_date) > 0 && this.DaysLeft(e.created_at, e.due_date) <= 1)
      this.dueTomorrowLength = data.length

    },
    async dueTodayBadgeCounts() {
      // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      let data = [];
      // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
      //   data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   // items = this
      // } else {
      //   this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
      //     if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
      //       data.push(a)
      //     }

      //   });
      // }
      // data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      if (this.setPrivileges.viewAll === true) {

        data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      } else {
        this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
            data.push(a)
          }
        });
      }

      data = data.filter(e => this.DaysLeft(e.created_at, e.due_date) >= 0 && this.DaysLeft(e.created_at, e.due_date) < 1)
      this.dueTodayLength = data.length
    },
    async dueThisWeekBadgeCounts() {
      // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      let data = [];
      // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
      //   data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   // items = this
      // } else {
      //   this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
      //     if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
      //       data.push(a)
      //     }

      //   });
      // }
      // data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      if (this.setPrivileges.viewAll === true) {

        data = this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'lead');
      } else {
        this.$store.state.leads.all.filter(e => e.type === 'lead').forEach(a => {
          if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
            data.push(a)
          }
        });
      }

      data = data.filter(e => this.DaysLeft(e.created_at, e.due_date) <= 6 && this.DaysLeft(e.created_at, e.due_date) > 0)
      this.dueThisWeekLength = data.length
    },
    // async dueTodayBadgeCounts(){
    //   let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   data=data.filter(e =>)
    // },
    //     dueThisWeek(due,created){

    // const dueDate = new Date(due);
    // const createdDate = new Date(created);

    // // calculate the difference in days
    // const differenceInMilliseconds = dueDate.getTime() - createdDate.getTime();
    //   const differenceInDays = Math.round( differenceInMilliseconds / (24 * 60 * 60 * 1000));
    // //console.log(differenceInDays)
    // // console.log(differenceInMilliseconds)
    // return differenceInDays


    //     }
    //   ,

    async exportToPDF(i) {
      // console.log(urlBase64);
      this.loader_proposal = true;
      setTimeout(() => {
        this.loader_proposal = false;
      }, 2000);
      // console.log(urlb);
      // var iframe = document.createElement('iframe');
      // iframe.srcdoc= document.getElementById('pdfContent').innerHTML
      let pdfContent = "";
      // lo
      // pdfContent += '<img crossorigin="*" src="' + im  gLogo + '" width="100" ><hr/><br>';
      // pdfContent += "<div><div><header><img src='https://via.placeholder.com/150' />header</header></div><div>Body</div><div><footer>footer</footer></div></div>"
      // pdfContent = document.querySelector('#pdfContent')
      pdfContent += document.getElementById("pdfContent").innerHTML;
      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      // console.log(document.getElementById('pdfContent').innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)

      // margin: [20, 10, 20, 10],
      //   filename: 'document.pdf',
      //   image: { type: 'jpeg', quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

      // margin: 0.5,
      //   filename: 'time_sheet_report.pdf',
      //   // image: { type: 'png', quality: 0.20 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: 'in', format: 'letter', orientation: 'p' },
      //   pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      var v = this;
      // this.loader_proposal = true
      html2pdf()
        .from(pdfContent)
        .set({
          margin: [2.2, 0.5, 0.8, 1],

          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },

          // pagebreak: { before: '.page-break' }

          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // v.loader_proposal = false
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            // pdf.
            // pdf.writeHTML("<hr>", true, false, false, false, '');

            pdf.setFontSize(10);
            pdf.setTextColor(50);
            pdf.setLineCap(0);
            // pdf.line(0,pdf.internal.pageSize.getHeight() - 1.4, 315 , 8);
            // pdf.fromHTML('<div>hello</div>',1,0)
            // pdf.from('<div>hello</div>')
            // pdf.line(0,pdf.internal.pageSize.getHeight() - 9, 315,8);
            pdf.addImage(imgLogo, 0.5, 0);
            // pdf.text(
            //    'Page ' + i + ' of ' + totalPages,
            //     (pdf.internal.pageSize.getWidth() * 0.88),
            //     (pdf.internal.pageSize.getHeight() - 0.3)
            // )

            // pdf.text('This is the header text', (pdf.internal.pageSize.getWidth() / 2.40), (pdf.internal.pageSize.getHeight() - 10));
            pdf.text(
              "For all expertise solutions and knowledge,",
              pdf.internal.pageSize.getWidth() / 16,
              pdf.internal.pageSize.getHeight() - 0.8
            );
            pdf.text(
              "Reach at us - Email -",
              pdf.internal.pageSize.getWidth() / 16,
              pdf.internal.pageSize.getHeight() - 0.5
            );

            // pdf.text('Footer content goes here',75, 285)
          }
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
          // this.loader_proposal = false
        });
      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },
    async exportToPDFInvoice(i) {
      this.loader_invoice = true;
      setTimeout(() => {
        this.loader_invoice = false;
      }, 2000);
      // const toDataUrl = await function (url, callback) {
      //   //Convert to base64
      //   return new Promise((resolve, reject) => {
      //     var xhr = new XMLHttpRequest();
      //     xhr.onload = function () {
      //       var reader = new FileReader();
      //       reader.onloadend = function () {
      //         resolve(reader.result);
      //       };
      //       reader.readAsDataURL(xhr.response);
      //     };
      //     xhr.onerror = () => {
      //       reject({
      //         status: this.status,
      //         statusText: xhr.statusText,
      //       });
      //     };
      //     xhr.open("GET", url);
      //     xhr.responseType = "blob";
      //     xhr.send();
      //   });
      // };

      // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      // const getBase64FromUrl = async (url) => {
      //   const data = await fetch(url);
      //   const blob = await data.blob()
      //   return new Promise((resolve) => {
      //     const reader = new FileReader();

      //     reader.readAsDataURL(blob);
      //     reader.onloadend = () => {
      //       const base64data = reader.result;
      //       this.base64data = base64data
      //       resolve(base64data);
      //     }
      //   });

      // }

      // let imagesUrls = [

      //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
      //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      // ];
      let pdfContent = "";
      // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
      //   //                         vvvv
      //   .then(response => response.blob())
      //   .then(imageBlob => {
      //     // Then create a local URL for that image and print it
      //     const imageObjectURL = URL.createObjectURL(imageBlob);
      //     console.log(imageObjectURL);
      //   });

      // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // // lo
      // var iframe = document.createElement('iframe');
      // 	iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:600px');
      // 	document.body.appendChild(iframe);
      //   iframe.src= '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>'
      // iframe.src = pdf.output('datauristring');
      document.getElementById("InvoicepdfContent2").style.fontSize = "12px";
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById("InvoicepdfContent2").innerHTML;

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById("InvoicepdfContent2").innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)
      html2pdf()
        .from(pdfContent)
        .set({
          margin: 0.5,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        // .header(() => {
        //   return `<h1>Header</h1>`
        // }).footer(() => {
        //   return `<p>Footer</p>`
        // })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
        });

      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },
    async exportToPDFPayment(i) {
      this.loader_payment = true;
      setTimeout(() => {
        this.loader_payment = false;
      }, 2000);
      // const toDataUrl = await function (url, callback) {
      //   //Convert to base64
      //   return new Promise((resolve, reject) => {
      //     var xhr = new XMLHttpRequest();
      //     xhr.onload = function () {
      //       var reader = new FileReader();
      //       reader.onloadend = function () {
      //         resolve(reader.result);
      //       };
      //       reader.readAsDataURL(xhr.response);
      //     };
      //     xhr.onerror = () => {
      //       reject({
      //         status: this.status,
      //         statusText: xhr.statusText,
      //       });
      //     };
      //     xhr.open("GET", url);
      //     xhr.responseType = "blob";
      //     xhr.send();
      //   });
      // };

      // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      // const getBase64FromUrl = async (url) => {
      //   const data = await fetch(url);
      //   const blob = await data.blob()
      //   return new Promise((resolve) => {
      //     const reader = new FileReader();

      //     reader.readAsDataURL(blob);
      //     reader.onloadend = () => {
      //       const base64data = reader.result;
      //       this.base64data = base64data
      //       resolve(base64data);
      //     }
      //   });

      // }

      // <p class="mb-2">{{ i.item.address }}</p>
      // <p class="mb-2 font-weight-bolder">Subject: {{ i.item.subject }}</p>
      // <p class="mb-2">{{ i.item.prephase }}</p>
      // <p class="mb-2">Dear {{ i.item.concerned_person }}</p>
      // <div v-for="(proposal, index) in i.item.proposal_section" :key="proposal.id">
      //   <p class="mb-2 font-weight-bolder">{{proposal.title}}</p>
      //   <p class="mb-3" v-html="proposal.description"></p>
      // </div>
      // <p class="font-weight-bolder">Fee Details</p>
      // <table class="mb-3">
      //   <thead>
      //     <th>SI No</th>
      //     <th>Description</th>
      //     <th>Amount</th>
      //   </thead>
      //   <tbody>
      //     <tr v-for="(amount, index) in i.item.proposal_fees" :key="amount.id">
      //       <td>{{ index+1 }}</td>
      //       <td>{{ amount.description }}</td>
      //       <td>{{ amount.amount }}</td>

      //     </tr>
      //     <tr v-if="i.item.proposal_fees.length > 1">
      //       <td style="font-weight: bolder;">total (<font-awesome-icon  icon="indian-rupee-sign" class="icon cursor-pointer"   />)

      //       </td>
      //       <td> </td>
      //       <td>

      //        {{getTotalAmt(i.item.proposal_fees)}}
      //       </td>
      //     </tr>
      //   </tbody>
      // </table>
      // <p class="font-weight-bolder">{{ i.item.footer_title }}</p>
      // <p v-html="i.item.footer_description"></p>"
      // pdfContent += '</div>'
      // html2pdf('<div>hello</div>', {
      //   margin:1,
      //   filename:"html.pdf"
      // })
      // let imagesUrls = [

      //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
      //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      // ];
      let pdfContent = "";
      // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
      //   //                         vvvv
      //   .then(response => response.blob())
      //   .then(imageBlob => {
      //     // Then create a local URL for that image and print it
      //     const imageObjectURL = URL.createObjectURL(imageBlob);
      //     console.log(imageObjectURL);
      //   });

      // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // lo
      document.getElementById("PaymentpdfContent").style.fontSize = "12px";
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById("PaymentpdfContent").innerHTML;

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById("PaymentpdfContent").innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)
      html2pdf()
        .from(pdfContent)
        .set({
          margin: 0.5,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        // .header(() => {
        //   return `<h1>Header</h1>`
        // }).footer(() => {
        //   return `<p>Footer</p>`
        // })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
        });

      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },

    uploadAttach(id, c_id, links, type) {
      this.spinnerY = true
      let data = {
        attachment: [],
        type: type,
        company_id: c_id,
        task_id: id,
      };
      links.forEach((x) => {
        data.attachment.push({
          attachment_url: x.url,
          file_name: x.fileName
        });
      });
      console.log(data);
      this.dropTask = false;
      this.dropClient = false;
      this.$store.dispatch("attachments/store", data).then(() => {
        this.$store.dispatch('tasks/getAttachments', id)
        this.spinnerY = false
        this.file_name = [];
        this.$store.state.attachments.links = [];
        console.log(data);
        this.$toast.success("Uploaded Successfully!", {
        position: "bottom-left",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      });
    },
    removeFileS3Task(url, index) {
      console.log("url of attachment", url);
      var data = {
        attach_url: url ?? "null",
      };
      this.$store.state.tasks.s3_url.splice(
        this.$store.state.tasks.s3_url[index],
        1
      );
      this.$store
        .dispatch("tasks/remove_file_s3", { data: data })
        .then(() => {
          console.log(this.$store.state.tasks.s3_url);
          console.log("removed");
          // if(this.$store.state.tasks.s3_url.includes(filename)){
          //   this.$store.state.tasks.s3_url.splice(this.$store.state.tasks.s3_url[this.$store.state.tasks.s3_url.findIndex(e => e.fileName.includes(filename))],1)
          // }
        })
        .catch(() => {
          console.log("error");
        });
    },
    removes3(file, i) {
      console.log("bbbb");
      let index = this.$store.state.attachments.links.findIndex(e => e.url === file);

      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(index, 1);
        this.file_name.splice(i, 1);
      });
    },

    async uploadFile(e) {
      let image = e.target.files;
      let image_name = []
      const filePathsPromises = [];
      image.forEach(file => {
        filePathsPromises.push(this.base64(file));
        image_name.push(file.name)
        // filePathsPromises.push(file.name)
      });
      const filePaths = await Promise.all(filePathsPromises, image_name);
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
        type: 'task'
      }));

      let tempFile = mappedFiles

      let readyUpload = [];
      tempFile.forEach((obj2) => {
        const exists = this.file_name.some((obj1) => obj1.name === obj2.name);
        if (!exists) {
          console.log("not duplicate");
          this.file_name.push(obj2);
          readyUpload.push(obj2);
        }
      });

      // tempFile.forEach((obj2) => {
      //   const exists = this.file_name.some(obj1 => obj1.name === obj2.name);
      //   if (!exists) {
      //     console.log("not duplicate")
      //     // obj2.type ='attachmentsType';
      //     this.file_name.push(obj2);
      //   }
      // })

      console.log(mappedFiles);
      this.uploadFileS3(readyUpload)
      e.target.value = ''


    },
    async uploadFileClient(e) {
      let image = e.target.files;
      let image_name = []
      const filePathsPromises = [];
      image.forEach(file => {
        filePathsPromises.push(this.base64(file));
        image_name.push(file.name)
        // filePathsPromises.push(file.name)
      });
      const filePaths = await Promise.all(filePathsPromises, image_name);
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
        type: 'company'
      }));

      let tempFile = mappedFiles

      let readyUpload = [];
      tempFile.forEach((obj2) => {
        const exists = this.file_name.some((obj1) => obj1.name === obj2.name);
        if (!exists) {
          console.log("not duplicate");
          this.file_name.push(obj2);
          readyUpload.push(obj2);
        }
      });

      // tempFile.forEach((obj2) => {
      //   const exists = this.file_name.some(obj1 => obj1.name === obj2.name);
      //   if (!exists) {
      //     console.log("not duplicate")
      //     // obj2.type ='attachmentsType';
      //     this.file_name.push(obj2);
      //   }
      // })

      console.log(mappedFiles);
      this.uploadFileS3(readyUpload)
      e.target.value = ''

    },
    base64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    uploadFileS3(file) {
      let data = {
        attach: file ? file : "null",
      };
      this.$store
        .dispatch("attachments/add", { data: data })
        .then(() => {
          resolve();
        })
        .catch(() => { });
    },
    clientAttachmentDropdown(e) {
      // if (this.dropClient === false) {
      //   this.dropClient = true;
      // }else{
      //   this.dropClient=false
      // }
      if (this.dropClient === false) {
        this.dropClient = true;
        setTimeout(() => {
          document.body.addEventListener("click", this.clickEventClient);
        }, 1);
      }
    },
    clickEventClient(ev) {
      console.log(ev.target, "evevevevevevev");
      console.log(this.$refs.clientDrop.contains(ev.target), "eeeeeeeeeee");
      if (
        ev.target != this.$refs.clientDrop &&
        !this.$refs.clientDrop.contains(ev.target)
      ) {
        this.dropClient = false;
      }
    },
    taskAttachmentDropdown(e) {
  // if (this.dropTask === false) {
  //   this.dropTask = true;
  // } else {
  //   this.dropTask = false;
  // }
  // this.dropTask = !this.dropTask;
  if (this.dropTask === false) {
        this.dropTask = true;
        setTimeout(() => {
          document.body.addEventListener("click", this.clickEventTask);
        }, 1);
      }
},

    clickEventTask(ev) {
      console.log(ev.target, "evevevevevevev");
      console.log(this.$refs.taskDrop.contains(ev.target), "eeeeeeeeeee");
      if (
        ev.target != this.$refs.taskDrop &&
        !this.$refs.taskDrop.contains(ev.target)
      ) {
        this.dropTask = false;
      }
    },
    onProgress(e) {
      console.log(e);
    },
    hasStartedGeneration() {
      console.log("started");
    },
    hasGenerated(e) {
      console.log(e);
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    threadedMail() {
      var arr = [];
      // if(this.$store.state.emails.all_emails.length === 0){

      // }
      this.$store.state.comments.extraComment.forEach((element) => {
        // if(this.taskId)
        // if(element.parent.task_id === id){
        // this.threadedMail = element.childs
        // message_id = element.parent.message_id
        if (element.childs) {
          if (element.childs.length > 0) {
            element.childs.forEach((c) => {
              arr.push(c);
            });
          }
          // }
        }
      });
      // this.arr_comment = []
      // this.arr_comment = arr;
      return arr;
    },
    sendTask() {
      var tasks = this.$store.state.tasks.all.filter(e => e.type === 'task');
      var leads = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      var combine = [];
      var details = null;
      leads.forEach((element) => {
        combine.push(element);
      });
      tasks.forEach((element) => {
        combine.push(element);
      });
      combine.forEach((element) => {
        // combine.push(element)
        if (this.taskId != 0 || this.taskId != null) {
          if (element.id === this.taskId) {
            details = element;
          }
        }
      });
      return details || {};
    },
    replyModal() {
      this.$refs["reply-modal"].show();
      this.$store.state.tasks.s3_url = []

      this.composeData.from = this.outBoundEmails[0];
      var tasks = this.$store.state.tasks.all.filter(e => e.type === 'task');
      var leads = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      var details = null;
      if (this.$router.currentRoute.name == "leads") {
        leads.forEach((element) => {
          // combine.push(element)
          if (this.taskId != 0 || this.taskId != null) {
            if (element.id === this.taskId) {
              details = element;
            }
          }
        });
      } else {
        tasks.forEach((element) => {
          // combine.push(element)
          if (this.taskId != 0 || this.taskId != null) {
            if (element.id === this.taskId) {
              details = element;
            }
          }
        });
      }
      this.composeData.to = [];
      this.emails_contact.forEach((element) => {
        if (details.mailbox != null) {
          if (
            element == details.mailbox.from_email &&
            details.mailbox.folder == "INBOX"
          ) {
            this.composeData.to.push(element);
          }
        }
      });
      var signAll = [];
      if (this.$store.state.users.signAll != null) {
        signAll.push(this.$store.state.users.signAll);
      }
      var header = "";
      if (this.$router.currentRoute.name == "leads") {
        header =
          header +
          '<p style="margin-left:2rem;">Hi ' +
          this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').filter((e) => e.id === this.taskId)[0]
            .contact_person.name +
          ", Greeting from " +
          JSON.parse(localStorage.getItem("userData")).tenant.id +
          "</p><br><br>";
      } else {
        header =
          header +
          '<p style="margin-left:2rem;">Hi ' +
          this.$store.state.tasks.all.filter(e => e.type === 'task').filter((e) => e.id === this.taskId)[0]
            .contact_person.name +
          ", Greeting from " +
          JSON.parse(localStorage.getItem("userData")).tenant.id +
          "</p><br><br>";
      }
      if (signAll.length > 0) {
        this.composeData.message = header + signAll[0].signature;

        // return signAll[0].signature || "";
      }
    },
    getStatusColor(percent) {
      // console.log("state" + percent.split("%")[0]);
      if (Number(percent.split("%")[0]) >= 100) {
        return "success";
      } else {
        return "danger";
      }
    },
    getStatusForInvoiceNumber(data) {
      console.log("status");
      var percent = 0;
      var total = 0;
      var state = false;
      var status = 0;
      this.allProposals.forEach((element) => {
        if (element.title == "payment") {
          element.record_pay_invoice.forEach((e) => {
            if (e.invoice_id === data.id) {
              // total = element
              state = true;
              status = status + e.paid_amount;
            }
          });
          element.invoice.forEach((i) => {
            if (i.id === data.id) {
              total = i.total_amt;
            }
          });
        }
      });
      percent = (status / total) * 100;
      console.log(percent);
      if (state) {
        return percent.toFixed(2);
      }
      else {
        return 0;
      }
    },

    getStatusForInvoice(data) {
      console.log("status");
      var percent = 0;
      var total = 0;
      var state = false;
      var status = 0;
      this.allProposals.forEach((element) => {
        if (element.title == "payment") {
          element.record_pay_invoice.forEach((e) => {
            if (e.invoice_id === data.id) {
              // total = element
              state = true;
              status = status + e.paid_amount;
            }
          });
          element.invoice.forEach((i) => {
            if (i.id === data.id) {
              total = i.total_amt;
              
            }
          });
        }
      });
      console.log('there is status: ',status)
      console.log('there is total: ',total)
      percent = (status / total) * 100;
      console.log(percent);
      if (state) {
        return percent.toFixed(2) + "% paid";
      }else{
        return 'not paid'
      }
    },
    getStatusForProposal(data) {
      var percent = 0;
      var total = 0;
      var status = 0;
      var status2 = 0;

      var state = false;
      let amt = 0;
      
      let invoiceamt = this.$store.state.invoice.all.filter(e => e.proposal_id === data.id)
      invoiceamt.forEach((e) => {
        total = total+e.amount

      })
      this.$store.state.invoice.all.forEach((element) => {
        // if(element.title == 'invoice'){
          // status = element.amount
       
          // total = element.proposal[0].amount
          if(element.proposal.length > 1){

            element.proposal.forEach((e) => {
              if (e.proposal_id === Number(data.id)) {
                status2 = status2+element.amount
                // total = element
                // status = status + e.paid_amount
                
                // invoice amount
                state = true;
            // total = total + e.amount;
            // total = element.amount


            // proposal amount
            amt = amt+e.amount
            status = status + e.amount;
          }
        });
      }else{
        element.proposal.forEach((e) => {
              if (e.proposal_id === Number(data.id)) {
                status2 = status2+element.amount
                // total = element
                // status = status + e.paid_amount
                
                // invoice amount
                state = true;
            // total = total + e.amount;
            // total = element.amount


            // proposal amount
            amt = e.amount
            status = status + e.amount;
          }
        });
      }
     
        // element.invoice.forEach(i => {
        //   if(i.id === data.id){
        //     total = i.total_amt
        //   }
        // });
        // }
      });
      
   
      console.log('proposal-status: ', total, status, amt)
      percent = (total/amt) * 100;
      console.log(data);
      if (state) {
        return percent.toFixed(1) + "% invoiced";
      }else{
        return 'not invoiced'
      }
    },
    getStatusForProposalNumber(data) {
      console.log("status");
      var percent = 0;
      var total = 0;
      var status = 0;
      var state = false;
      this.$store.state.invoice.all.forEach((element) => {
        // if(element.title == 'invoice'){

        element.proposal.forEach((e) => {
          if (e.proposal_id === Number(data.id)) {
            // total = element
            // status = status + e.paid_amount
            // total = e.amount
            state = true;
            // total = element.amount;
            total = e.amount;
            status = status + element.amount;
          }
        });

        // element.invoice.forEach(i => {
        //   if(i.id === data.id){
        //     total = i.total_amt
        //   }
        // });
        // }
      });
      percent = (status / total) * 100;
      console.log("status: ", status);
      console.log("total: ", total);
      console.log(data);
      if (state) {
        return percent.toFixed(1);
      }
      else {
        return 0;
      }
    },
    convertNumberToWords(number) {
      const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
      const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
      const scales = ['', 'thousand', 'lakh', 'crore'];

      const convertTwoDigitToWords = (num) => {
        if (num < 10) {
          return units[num];
        } else if (num < 20) {
          return units[num];
        } else {
          const tensDigit = Math.floor(num / 10);
          const unitsDigit = num % 10;
          return tens[tensDigit] + ' ' + units[unitsDigit];
        }
      };

      const convertThreeDigitToWords = (num) => {
        const hundredsDigit = Math.floor(num / 100);
        const lastTwoDigits = num % 100;

        const parts = [];
        if (hundredsDigit !== 0) {
          parts.push(units[hundredsDigit] + ' hundred');
        }

        if (lastTwoDigits !== 0) {
          parts.push(convertTwoDigitToWords(lastTwoDigits));
        }

        return parts.join(' ');
      };

      if (number === 0) {
        return 'zero';
      }

      const chunks = [];
      while (number > 0) {
        chunks.push(number % 1000);
        number = Math.floor(number / 1000);
      }

      const words = chunks.map((chunk, index) => {
        if (chunk !== 0) {
          const chunkWords = convertThreeDigitToWords(chunk);
          const scale = scales[index];
          if (scale) {
            return chunkWords + ' ' + scale;
          } else {
            return chunkWords;
          }
        }
        return '';
      });

      const result = words.reverse().join(' ').trim();
      if (result === '') {
        return 'zero';
      }
      return result;

},
    convert(str) {
      var ones = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];

      var tens = [""];

      tens[1] = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
      ];

      tens = tens.concat([
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ]);

      var getHundreds = function (value) {
        return value > 0 ? ones[value] + " hundred" : "";
      };

      var getTens = function (value, next, words, index, pos) {
        if (value == 1) {
          words.push(tens[1][next]);

          if (pos == 5) {
            words.push(" thousand");
          }
          if (pos == 8) {
            words.push(" million");
          }
          return index + 1;
        }

        words.push(tens[value]);
        return index;
      };

      var num, pos;
      var words = [];

      for (var i = 0; i < str.length; i++) {
        // if(window.CP.shouldStopExecution(1)){break;}
        //to stop infinite loop

        num = str[i];
        pos = str.length - i;

        switch (pos) {
          //millions
          case 7:
            words.push(ones[num] + " million");
            break;
          // For Thousands
          case 4:
            words.push(ones[num] + " thousand");
            break;
          // For Hundreds
          case 9:
          case 6:
          case 3:
            words.push(getHundreds(num));
            break;
          // For Tens and Teens
          case 8:
          case 5:
          case 2:
            i = getTens(num, str[i + 1], words, i, pos);
            break;
          case 1:
            words.push(ones[num]);
            break;
        }
      }
      return words.join(" ");
    },
    updatePayment() {
      var invoice_tds = [];
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        invoice_tds.push({
          invoice_id: this.payment.payment[index].invoice_id,
          tds_deducted: this.payment.payment[index].tds,
          paid_amount: this.payment.payment[index].amount,
        });
      }
      var branch_id = 0;
      this.$store.state.branches.all.forEach((element) => {
        if (element.name == this.payment.branch) {
          branch_id = element.id;
        }
      });
      const data = {
        task_id: this.taskId,
        client_id: this.payment.client.id,
        branch_id: branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: invoice_tds,
      };
      console.log(data, this.payment.edit_id);
    },
    seteditPayment(index) {
      var amount = 0;
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          amount = element.amount;
        }
      });
      return amount;
      // return this.payment.payment[index].amount
    },
    setedittds(index) {
      var tds = 0;
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          tds = element.tds;
        }
      });
      // return this.payment.payment[index].tds
      return tds;
    },
    getFinalPayment(invoice_id, record_pay_invoice) {
      var amount = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          amount = element.paid_amount;
        }
      });
      return amount;
    },
    getTdsForPayment(invoice_id, record_pay_invoice) {
      var tds = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          tds = element.tds_deducted;
        }
      });
      return tds;
    },
    getPaymentClient(client_id) {
      var name = "";
      if (client_id) {
        this.show_companys.forEach((element) => {
          if (element.id === client_id) {
            name = element.name;
          }
        });
        return name;
      }
    },
    getPaymentAmt(amount) {
      if (amount) {
        return amount.reduce((a, b) => a + b.paid_amount, 0);
      }
    },
    recordPayment() {
      if (this.payment.payment.length === 0) {

        this.$swal('There are no Invoices!!', '', 'error');
        return;
      }

      var invoice_tds = [];
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        if (this.payment.payment[index].amount != 0) {
          if(this.payment.payment[index].amount !== this.payment.amount){
        this.$swal('The paid amount should be equal to payment amount', '', 'error');
            return;
          }
          invoice_tds.push({
            invoice_id: this.payment.payment[index].invoice_id,
            tds_deducted: this.payment.payment[index].tds,
            paid_amount: this.payment.payment[index].amount,
          });
        }
      }
      var branch_id = 0;
      this.$store.state.branches.all.forEach((element) => {
        if (element.name == this.payment.branch) {
          branch_id = element.id;
        }
      });
      const data = {
        task_id: this.taskId,
        client_id: this.payment.client.id,
        branch_id: branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: invoice_tds,
      };
      console.log(data);
      this.$store.dispatch("recordPayment/store", data).then(() => {
        this.$store.dispatch("recordPayment/get", this.taskId);
        this.$refs["payment-modal"].hide();
      });
    },
    getExcess() {
      // if(this.payment.amount > Number(this.getTotalAmt(this.payment.payment) ))// ?  payment.amount - Number(getTotalAmt(this.payment.payment) )  : 0}}
      //             {
      //               return this.payment.amount - Number(this.getTotalAmt(this.payment.payment) )
      //             }else
      // if(this.payment.amount < Number(this.getTotalAmt(this.payment.payment) ))
      // if(this.payment.amount != 0)

      // {
      return (
        this.payment.amount - Number(this.getTotalAmt(this.payment.payment))
      );

      // }else{
      //   return 0
      // }
    },
    // addPayment(){
    setPayment(index, e) {
      console.log([index, e]);
      this.payment.payment.forEach((element) => {
        if (element.invoice_id == index) {
          element.amount = Number(e);
        }
      });
      // this.payment.payment[index].amount = Number(e)
    },
    setTds(index, e) {
      console.log([index, e]);
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          element.tds = Number(e);
          if (element.tds != 0) {
            element.amount = element.amount - element.tds;
          }
        }
      });
      // this.payment.payment[index].tds = Number(e)
      // this.payment.payment[index].amount = this.payment.payment[index].amount - this.payment.payment[index].tds
    },
    // },
    getinvoiceBranch(task_id) {
      var task = [];
      var name = "";
      if (this.$router.currentRoute.name == "tasks") {
        task = this.$store.state.tasks.all.filter(e => e.type === 'task');
      } else {
        task = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      }
      task.forEach((element) => {
        if (element.id === task_id) {
          name = element.branch.name;
        }
      });
      return name;
    },
    getinvoiceDate(date) {
      var d = new Date(date);
      const ms = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var date_no = d.getDate();
      var month = ms[d.getMonth()];
      var year = d.getFullYear();
      return date_no + " " + month + " " + year;
    },
    getLargestId() {
      var invoice = this.$store.state.invoice.allData;
      var array = [];
      if (invoice.length > 0) {
        invoice.forEach((element) => {
          array.push(element.id);
        });
        this.invoice.id = Math.max(...array);
        // let prefix = invoice.filter(e => e.id = this.invoice.id).invoice_number
        // this.invoice.id = prefix+'/'+this.invoice.id
        // return Math.max(...array) + 1
        let prefix = invoice.filter((e) => (e.id = this.invoice.id))[0]
          .invoice_number;
        this.invoice.id = this.invoice.id + 1
        this.invoice.id = prefix //+ "/" + this.invoice.id;
        // this.invoice.id = this.invoice.id;

      } else {
        // return 1;
        this.invoice.id = 1;
      }
      console.log(this.invoice.id);
    },
    getSubTotal(invoice) {
      let total = invoice.sub_total - invoice.pocket_expenses;
      let t = 0;
      if (invoice.adjustment_amt > 0) {
        t = total - invoice.adjustment_amt;
        console.log("positive");
      } else {
        t = total + invoice.adjustment_amt;
        console.log("negative");
      }
      return t;
    },
    getTotalInvoice() {
      var data = this.$store.state.invoice.all;
      var total = 0;
      data.forEach((element) => {
        total = total + element.total_amt;
      });
      return total;
    },
    validNumber(e) {
      let stringValue = e.target.value.toString();
      let regex = /^\d*(\.\d{1,2})?$/;
      if (!stringValue.match(regex) && this.price !== "") {
        this.invoice.total_amt = this.previousPrice;
      }
      this.previousPrice = this.invoice.total_amt;
    },
    getStateCode(data) {
      console.log(data);
      this.invoice.state_code = Number(data.fips_code);
    },

    shortText() {
      if (this.textLength) {
        let newText = this.text.substring(0);
        return newText;
      } else {
        /*let newText = this.lorem.substring(0,50) + `...`;*/
        let newText = this.text.substring(0, 150);
        return newText;
      }
    },
    addAllProposalAmt() {
      var all = this.$store.state.proposals.allProposals;
      var total = 0;
      all.forEach((element) => {
        element.proposal_fees.forEach((e) => {
          total = total + e.amount;
        });
      });
      this.invoice.amount = total;
    },
    showHidePendingFollowups() {
      var y = document.getElementById("desc_pending_followups");
      if (y.style.display === "none") {
        this.pendingIconName = "ChevronDownIcon";
        y.style.display = "block";
      } else {
        this.pendingIconName = "ChevronRightIcon";

        y.style.display = "none";
      }
    },
    showHideHistoryFollowups() {
      var z = document.getElementById("desc_history_followups");
      if (z.style.display === "none") {
        this.historyIconName = "ChevronDownIcon";
        z.style.display = "block";
      } else {
        this.historyIconName = "ChevronRightIcon";

        z.style.display = "none";
      }
    },
    showHideUpcomingFollowups() {
      var x = document.getElementById("desc_upcoming_followups");

      if (x.style.display === "none") {
        this.upcomingIconName = "ChevronDownIcon";
        x.style.display = "block";
      } else {
        this.upcomingIconName = "ChevronRightIcon";

        x.style.display = "none";
      }
    },
    showOrHideTaskAttach() {
      var x = document.getElementById("desc_task_attach");
      if (x.style.display === "none") {
        this.taskIconName = "ChevronDownIcon";
        x.style.display = "block";
      } else {
        this.taskIconName = "ChevronRightIcon";

        x.style.display = "none";
      }
    },
    showOrHideClientAttach() {
      var x = document.getElementById("desc_client_attach");
      if (x.style.display === "none") {
        this.clientIconName = "ChevronDownIcon";
        x.style.display = "block";
      } else {
        this.clientIconName = "ChevronRightIcon";

        x.style.display = "none";
      }
    },
    pan() {
      if (this.invoice.gstNumber.length === 15) {
        if (
          isNaN(
            this.invoice.gstNumber.slice(0, 2) +
            this.invoice.gstNumber.slice(7, 10) +
            this.invoice.gstNumber.slice(14, 15)
          ) === false &&
          isNaN(
            this.invoice.gstNumber.slice(2, 7) +
            this.invoice.gstNumber.slice(11, 12) +
            this.invoice.gstNumber.slice(13, 14)
          ) &&
          (9 > +this.invoice.gstNumber.slice(12, 13) > 0 ||
            isNaN(this.invoice.gstNumber.slice(12, 13)))
        ) {
          // this.invoice.pan_number=this.invoice.gstNumber.slice(2,12);
          let states = this.$store.state.branches.states;
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.invoice.gstNumber.slice(0, 2);
          });
          console.log(stateFilter, "sssss");
          console.log(stateFilter);
          this.invoice.state = stateFilter;
          // this.selectedState=stateFilter[0].name;
          this.gsterr = false;
          console.log("noerr");
        }
      } else {
        // this.formData.pan_number=''
        this.invoice.state = null;
      }
    },
    addInvoice() {
      // console.log(this.invoice);
      this.$swal('', 'Note: Now this lead is going to be converted into task!', 'info').then(() => {
        this.$router.push({ name: 'tasks' })
      });

      const data = {
        id: this.$store.state.invoice.allData.length > 0 ? Number(this.$store.state.invoice.allData[this.$store.state.invoice.allData.length - 1].id) + 1 : 1,
        proposal_id: this.proposal_edit_id,
        client_id: this.invoice.client.id,
        client_gst_number: this.invoice.gstNumber,
        task_id: this.taskId,
        state_code: this.invoice.state_code,
        invoice_number: this.prefixPlusid,
        invoice_date: this.invoice.pdate,
        due_date: this.invoice.due_date,
        billing_address: this.invoice.billing_address,
        notes: this.invoice.notes,
        item_details: this.invoice.item_details,
        amount: this.invoice.amount,
        discount: this.invoice.discount,
        taxable_amt: this.invoice.taxble_amt,
        igst: this.invoice.igst,
        sgst: this.invoice.sgst,
        cgst: this.invoice.cgst,
        utgst: this.invoice.utgst,
        igst_amt: this.invoice.igst_amt,
        sgst_amt: this.invoice.sgst_amt,
        cgst_amt: this.invoice.cgst_amt,
        utgst_amt: this.invoice.utgst_amt,

        sub_total: this.invoice.total_amt,
        pocket_expenses: this.invoice.pocket_expense,
        expenses_details: this.invoice.expense_details,
        adjustment_amt: this.invoice.adjustments,
        total_amt: this.invoice.total,
        // total:this.invoice.total
      };
      console.log(data);
      this.$store.dispatch("invoice/store", data).then(() => {
        this.$store.dispatch("invoice/get", this.taskId);
        this.$store.dispatch("invoice/fetch");
        this.$refs["invoice-modal"].hide();
      });
    },
    updateInvoice() {
      const data = {
        client_id: this.invoice.client.id,
        client_gst_number: this.invoice.gstNumber,
        task_id: this.taskId,
        state_code: this.invoice.state_code,
        invoice_number: this.invoice.id,
        invoice_date: this.invoice.pdate,
        due_date: this.invoice.due_date,
        billing_address: this.invoice.billing_address,
        notes: this.invoice.notes,
        item_details: this.invoice.item_details,
        amount: this.invoice.amount,
        discount: this.invoice.discount,
        taxable_amt: this.invoice.taxble_amt,
        igst: this.invoice.igst,
        sgst: this.invoice.sgst,
        cgst: this.invoice.cgst,
        utgst: this.invoice.utgst,
        igst_amt: this.invoice.igst_amt,
        sgst_amt: this.invoice.sgst_amt,
        cgst_amt: this.invoice.cgst_amt,
        utgst_amt: this.invoice.utgst_amt,

        sub_total: this.invoice.total_amt,
        pocket_expenses: this.invoice.pocket_expense,
        expenses_details: this.invoice.expense_details,
        adjustment_amt: this.invoice.adjustments,
        total_amt: this.invoice.total,
        // total:this.invoice.total
      };
      console.log(data);
      this.$store
        .dispatch("invoice/update", { payload: data, id: this.invoice.editId })
        .then(() => {
          this.$store.dispatch("invoice/get", this.taskId);
          this.$store.dispatch("invoice/fetch");
          this.$refs["invoice-modal"].hide();
        });
    },
    // getGST(){
    //   if(this.invoice.igst != 0 ){
    //     this.invoice.igst_amt = this.invoice.taxble_amt * this.invoice.igst / 100
    //   }
    // },
    getAmt() {
      // this.invoice.amount = Number(this.invoice.amount)
      // if(this.invoice.discount != '0'){
      // if(this.invoice.taxable_amt != null && this.invoice.amount != null && this.invoice.discount != null )
      // {
      // this.invoice.taxable_amt = 0
      this.invoice.taxble_amt = this.invoice.amount - this.invoice.discount;
      // if(this.invoice.amount != null){

      //   this.invoice.taxble_amt = this.invoice.amount;
      // }else if(this.invoice.discount != null){
      //   this.invoice.taxble_amt = this.invoice.amount - this.invoice.discount;

      // }
      // }else{

      // }
      // this.invoice.taxble_amt = this.invoice.amount
      this.invoice.igst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.igst ?? 0);
      this.invoice.sgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.sgst ?? 0);
      this.invoice.cgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.cgst ?? 0);
      this.invoice.utgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.utgst ?? 0);

      this.invoice.total_amt =
        Number(this.invoice.taxble_amt ?? 0) +
        Number(
          Number(this.invoice.igst_amt ?? 0) +
          Number(this.invoice.sgst_amt ?? 0) +
          Number(this.invoice.cgst_amt ?? 0) +
          Number(this.invoice.utgst_amt ?? 0)
        );
      this.invoice.sub_total = Number(this.invoice.total_amt ?? 0);
      var adjust = 0;
      if (this.invoice.adjustments != 0) {
        if (this.invoice.adjustments.includes("-")) {
          adjust = Number(this.invoice.adjustments.split("-")[1]);
        }
      }
      if (adjust != 0) {
        this.invoice.total =
          Number(this.invoice.sub_total ?? 0) +
          Number(Number(this.invoice.pocket_expense ?? 0)) -
          Number(adjust);
      } else {
        this.invoice.total =
          Number(this.invoice.sub_total ?? 0) +
          Number(this.invoice.pocket_expense ?? 0) +
          Number(this.invoice.adjustments);
      }
      // }
      // this.invoice.taxble_amt = this.invoice.amount - Number(this.invoice.discount)
      // return this.invoice.taxble_amt
    },
    destroyProposal(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("proposals/destroy", id).then(() => {
          this.$store.dispatch("proposals/get", this.taskId);
        });
      }
    },
    destroyInvoice(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("invoice/destroy", id).then(() => {
          this.$store.dispatch("invoice/get", this.taskId);
        });
      }
    },

    getPL(date, id) {
      var dates = new Date(date);
      if (id < 10) {
        var p_date = "PL-0" + id + "-" + dates.getFullYear();
      } else {
        var p_date = "PL-" + id + "-" + dates.getFullYear();
      }
      return p_date;
    },
    getTotalAmt(amount) {
      if (amount) {
        return amount.reduce((a, b) => a + b.amount, 0);
      }
    },
    getTotalTds(tds) {
      return tds.reduce((a, b) => a + b.tds, 0);
    },
    timeFormat(date) {
      var hours = new Date(date).getHours();
      var minutes = new Date(date).getMinutes();
      var noon = hours >= 12 ? " PM" : " AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;

      var maketime = hours + ":" + minutes + noon;
      var date = new Date(date).toDateString();
      var fullyear = new Date(date).getFullYear();
      var today = new Date().toDateString();
      console.log(today);
      if (date == today) {
        return "today ," + maketime;
      } else {
        return date; //.split(fullyear)[0] //+ ','+ maketime;
        // return date + ','+ maketime;
      }
    },
    getCommentUser(comments, users) {
      let latest_index = comments.length - 1;
      var string = "";
      if (latest_index !== -1) {
        // console.log(comments[latest_index]);
        var user_id = comments[latest_index].user_id;
        var username = "~ ";
        users.forEach((element) => {
          if (element.id === user_id) {
            username = username + element.name;
          }
        });
        username =
          username + ", " + this.timeFormat(comments[latest_index].created_at);
        // string = comment

        // console.log(latest_index);
        return username; //.substring(0,22)
      }
    },
    getLatestCommentLength(comments, length) {
      var arr = comments;

      return arr.length;
    },
    getLatestComment(comments, length) {
      // var arr = comments

      // var extra = this.$store.state.comments.extraComments
      // var all =arr
      //     if(arr.length > 0){

      //       var latest_id= arr[arr.length - 1].id + 1;
      //     }
      //     var user= null
      //     extra.forEach(element => {
      //       this.$store.state.users.all.forEach(e => {

      //         if(element.from_email == e.email){

      //           user = e
      //         }else{
      //           user={
      //             email: element.from_email,
      //             name:element.from_name,
      //             avatar:element.avatar,
      //             id:latest_id
      //           }
      //         }
      //       });
      //     });

      //       extra.forEach(element => {
      //       all.push({

      //         comment:element.message,
      //         created_at:element.created_at,
      //         id:latest_id,
      //         user:user,
      //         user_id:user.id

      //     });
      //     });

      let latest_index = comments.length - 1;
      var string = "";

      if (latest_index !== -1) {
        var comment = comments[latest_index].comment;
        string = comment;

        // console.log(latest_index);
        return string;
      }
    },
    getAssigneeString(users) {
      var user = [];
      users.forEach((element) => {
        user.push(element.name);
      });
      return user.join(); //.substring(0,28);
    },
    // autofillClient() {
    //   var data = [];
    //   for (let index = 0; index < this.$store.state.clients.all.length; index++) {
    //     data[index] = this.$store.state.clients.all[index].name;
    //   };
    //   var filtered = data.filter((data) => data===this.pclient.name)
    //   this.pname=filtered[0].replace(/['"]+/g, '');
    // },

    addProposal() {
      // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // const now = new Date(this.pdate);
      // this.pdate=now.getDate() + ' ' + months[now.getMonth()] + ' ' +  + now.getFullYear();
      // this.proposals.push({activity: 'Proposal', date: this.pdate, amount: this.pamount, name: this.pname, address: this.paddress, subject: this.psubject, pphrase: this.pphrase, pperson: this.pperson, pfootertitle: this.pfootertitle, pfooterdesc: this.pfooterdesc});
      this.$refs["proposal-modal"].hide();
      let arr = [];
      this.proposalFields.forEach((data) => {
        arr.push({
          title: data.title,
          description: data.desc,
        });
      });
      // this.pdate=this.currentDate;
      let data = {
        task_id: this.taskId,
        proposal_date: this.pdate,
        company_id: this.pclient.id,
        client_name: this.pname,
        concerned_person: this.pperson,
        address: this.paddress,
        subject: this.psubject,
        prephase: this.pphrase,
        footer_title: this.pfootertitle,
        footer_description: this.pfooterdesc,
        internal_notes: this.pnotes,
        proposalSection: arr,
        proposalFees: this.amountField,
      };
      this.$store.dispatch("proposals/create", data).then(() => {
        this.$store.dispatch("proposals/get", this.taskId).then(() => {
          console.log(this.allProposals);
          this.$toast.success("Added Successfully!", {
        position: "bottom-left",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
        });
      });
      //     axios.post("https://api-office36ty.protracked.in/v1/proposal", {
      //       task_id: this.taskId,
      //       proposal_date: this.pdate,
      // client_name: this.pname,
      // concerned_person: this.pperson,
      // address: this.paddress,
      // subject: this.psubject,
      // prephase: this.pphrase,
      // footer_title: this.pfootertitle,
      // footer_description: this.pfooterdesc,
      // internal_notes: this.pnotes,
      // proposalSection: this.proposalFields,
      // proposalFees: this.amountField
      //     },
      //     {
      //       headers: {
      //       'X-Tenant': 'sarthak',
      //       currrent: localStorage.getItem('userData'),
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': '*',
      //   'Access-Control-Allow-Headers': '*',}
      //     }).then((res) => {
      //       console.log(res);
      //     })
    },
    editProposal() {
      var arr = [];
      this.proposalFields.forEach((element) => {
        arr.push({
          title: element.title,
          description: element.desc,
        });
      });
      // this.proposals.splice(this.editIndex, 1, {notes:this.pnotes,activity: 'Proposal', date: this.pdate, amount: this.pamount, pclientName: this.pclientName, address: this.paddress, subject: this.psubject, pphrase: this.pphrase,clientName:this.pclient, contactPerson:this.pcontact,pperson: this.pperson, pfootertitle: this.pfootertitle, pfooterdesc: this.pfooterdesc});
      const data = {
        task_id: this.taskId,
        proposal_date: this.pdate,
        client_name: this.pname,
        concerned_person: this.pperson,
        address: this.paddress,
        subject: this.psubject,
        prephase: this.pphrase,
        footer_title: this.pfootertitle,
        footer_description: this.pfooterdesc ?? null,
        internal_notes: this.pnotes,
        proposalSection: arr,
        proposalFees: this.amountField,
      };
      console.log(data);
      this.$store
        .dispatch("proposals/proposal_update", {
          payload: data,
          id: this.proposal_edit_id,
        })
        .then(() => {
          this.$refs["proposal-edit-modal"].hide();
          this.$store.dispatch("proposals/get", this.taskId).then(() => { });
          console.log(this.proposals.map((e) => e.total));
        });
    },
    onRowClickedProposal(i) {
      const { detailsRowProposal } = this;
      if (detailsRowProposal && detailsRowProposal !== i) {
        detailsRowProposal._showDetails = false;
      }

      this.$set(i, "_showDetails", !i._showDetails);
      console.log(i);
      if (i.title == "invoice") {
        this.invoice.editId = i.id;
      } else if (i.title == "payment") {
        this.payment.edit_id = i.id;
      } else {
        this.proposal_edit_id = i.id;
      }
      this.detailsRowProposal = i;
    },
    onRowClicked(item) {
      const { detailsRow } = this;
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
        this.textLength = false

      }

      this.$set(item, "_showDetails", !item._showDetails);
      if (item._showDetails) {
        // document.getElementByClassName('heading-elements').click()
        this.showShimmer = true
        setTimeout(() => {
          this.showShimmer = false
        }, 3000);
        // this.$refs['cardAction'].showLoading = true

        // this.refreshStop()
        //   setTimeout(() => {
        // }, 3000)
        this.detailsRow = item;
        this.$store.state.leads.expandedTaskId = item.id
        this.taskId = item.id;
        if (item.subject.includes("Re:")) {
          this.replySubject = item.subject;
        }
        if (!item.subject.includes("Re:")) {
          this.replySubject = "re: " + item.subject;
        }
        this.$store.dispatch("proposals/get", item.id).then(() => {
          console.log(this.allProposals);
        });
        this.$store.dispatch("comments/getMailComment", item.id).then(() => { });
        // this.$store.dispatch("timesheet/get", item.id).then(() => { });

        this.$store.dispatch("followUp/get", item.id).then(() => {
        });
        this.$store.dispatch('followUp/fetchActivity').then(() => {
      })
        this.$store.dispatch("invoice/get", item.id).then(() => {

          // console.log(this.allProposals)
        });
        // this.checkRead2 = this.checkRead(item.id)

        const data = {
          task_id: item.id,
          is_read: true,
        }
        this.$store.dispatch('leads/markAsRead', data).then(() => {
          item.checkRead = false
          if (item.task_read == null) {
            item.task_read = this.$store.state.leads.checkRead
          }

        })

        this.$store.dispatch("recordPayment/get", item.id);
        this.$store.dispatch("expenses/get", item.id);
        
        if (item.description) {
          this.text = item.description//.replace(/(<([^>]+)>)/gi, "");
          this.textCheck = item.description//.replace(/(<([^>]+)>)/gi, "");

        }else{
          this.text = ''
        }
        this.$store.dispatch('tasks/getAttachments', item.id)
      } else {
        this.textLength = false
        this.$store.state.tasks.allAttachments = []
      }
      // this.parseHtml(item.description)
    },
    addTodo(id) {
      if (this.default_todo.length === 0) {
        return;
      }
      // });
      var c_todo = [];
      if (this.default_todo.length > 0) {
        this.default_todo.forEach((element) => {
          c_todo.push(element);
        });
      }
      if (this.additional_todo.length > 0) {
        this.additional_todo.forEach((element) => {
          c_todo.push(element);
        });
      }
      const data = {
        to_do: c_todo,
        task_id: id,
        user_ids: this.subtask_mentions,
      };
      this.$store.dispatch("appTodo/store", data).then(() => {
        this.$store.dispatch("appTodo/fetch");
      });
      if (this.additional_todo.length > 1) {
        while (this.additional_todo.length > 0) {
          this.additional_todo.pop();
        }
      }
    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },

   onApply(item, key, replacedWith) {
      let count = 0
      this.subtask_mentions.forEach(element => {
        if(element.id === item.id){
          count++
        }
      });
      if(count === 0){
        this.subtask_mentions.push({ name: item.name, id: item.id })
      }else{

        let index = this.subtask_mentions.findIndex(e => e.id === item.id)
        if(index !=-1){
          
          this.subtask_mentions.splice(index,count)
        }
        
      }

      console.log(item, `has been replaced with ${replacedWith}`)
    },

    parseHtml(item) {
      // return item;
      var text = item.replace(/(<([^>]+)>)/gi, "");
      this.text = text;
      this.text = this.text.substr(0, 400);
      // function extractContent(s) {

      // };
      // this.text = text;
      // if(String(this.text).length > 50){
      // }
      // this.text.substr(0 ,20)
      // extractContent(item.item.description)
      // this.$store.dispatch('leads/strip', {description:item.item.description});
      // return this.text//.replace(/{}/g, '')
      // return this.$store.state.leads.description;
    },
    add() {
      this.inputs.push({
        subtask_assignee: null,
      });
      // console.log(this.inputs)
    },
    addAmount() {
      this.amountField.push({
        description: "",
        amount: null,
      });
      // console.log(this.inputs)
    },
    addProposalField() {
      this.proposalFields.push({
        title: "",
        description: "",
      });
      // console.log(this.inputs)
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    removeAmount(index) {
      this.amountField.splice(index, 1);
    },
    removeProposal(index) {
      this.proposalFields.splice(index, 1);
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes("@")) {
        this.search = assignee.split("@")[1];
      } else if (!assignee.includes("@")) {
      } else {
        this.search = "";
      }
    },
    openModal(modal, task) {
      // if(mod)

      if (modal.includes("_")) {
        this.$refs[modal.split("_")[0]].show();
        // this.task
        this.proposal_edit_id = modal.split("_")[2];
      } else {
        this.$refs[modal].show();
      }
      if (task) {
        this.todo_subtask = task.to_do;
        this.todo_id_subtask = task.id;
        this.task_id_subtask = task.task_id;
        // if(document.getElementById('subtask_todo'))
        // document.getElementById('subtask_todo').value = task.to_do
      }
    },
    autofillClient() {
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.clients.all.length;
        index++
      ) {
        data[index] = this.$store.state.clients.all[index].name;
      }

      var filtered = "";
      if (this.pclient != null) {
        filtered = data.filter((data) => data === this.pclient.name);
      }
      if (filtered.length > 0) {
        console.log(filtered);
        //this.pclientName='Centrik'//filtered2[0].replace(/['"]+/g, '');
        this.pname = filtered[0].replace(/['"]+/g, "");
      }
    },
    autofillContact() {
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.contactPeople.allForLeads.length;
        index++
      ) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name;
      }
      var filtered = [];
      if (this.pcontact != null) {
        filtered = data.filter((data) => data === this.pcontact.name);
      }
      if (filtered.length > 0) {
        this.pperson = filtered[0].replace(/['"]+/g, "");
      }
    },
    SetColor(id) {
      if (id === 1) {
        return "#9e9e9e";
      } else if (id === 2) {
        return "#607d8b";
      } else if (id === 3) {
        return "#ffe821";
      } else if (id === 4) {
        return "#ff9800";
      } else if (id === 5) {
        return "#e91e63";
      } else {
        return "#fff";
      }
    },
    SetText(id) {
      if (id === 1) {
        return "  Lowest";
      } else if (id === 2) {
        return "  Low";
      } else if (id === 3) {
        return "  Medium";
      } else if (id === 4) {
        return "  High";
      } else if (id === 5) {
        return "  Highest";
      } else {
        return "-";
      }
    },
    SelectItem(item) {
      // item.toggleDetails
      this.selected_item = item;
      this.$set(this.selected_item);
    },
    open_datepicker() {
      if (document.getElementById("open_datepicker2").click) {
        document.getElementById("open_datepicker2").style.display = "block";
      }
      // console.log(document.getElementById('open_datepicker2'))
    },
    openDueModal(due_date, task_id) {
      this.$store.state.leads.due_date = due_date
      this.$store.state.leads.expandedTaskId = task_id
      document.getElementById('button-due-date').click()
    },
    inline_due_date(due_date, task_id) {
      return this.openDueModal(due_date, task_id);

      var t = "info";
      if (due_date == "") {
        this.closed();
      }
      if (due_date != "") {
        var date = {
          due_date: due_date,
          task_id: task_id,
        };
        if (this.$router.currentRoute.name == "leads") {
          this.$store.dispatch("leads/inline_update", { date }).then(() => {
            this.startDate2 = this.currentDate
            this.$store.dispatch('leads/fetch');

            // if (this.successMessage) {
            this.$toast.success('Due Date Updated Successfully!', {
              position: "bottom-left",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            });
            // }
          });
        } else {
          this.$store.dispatch("tasks/inline_update", { date }).then(() => {
            this.$store.dispatch('tasks/fetch');
            this.startDate2 = this.currentDate

            // if (this.successMessage) {
            this.$toast.success('Due Date Updated Sucessfully!', {
              position: "bottom-left",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            });
            // }
          });
        }
      }

      this.startDate2 = null;
    },
    inline_user_update(user_id, task_id) {
      var t = "info";

      var user_data = {
        user_id: user_id,
        task_id: task_id,
      };
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { user_data }).then(() => {
          this.$store.dispatch('leads/fetch');
          this.search = ''
          // if (this.successMessage) {
          // this.$refs.snackbar[t](this.successMessage)
          this.$toast.success('User Changed Successfully!', {
            position: "bottom-left",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          // }
        });
      } else {
        this.$store.dispatch("tasks/inline_update", { user_data }).then(() => {
          this.$store.dispatch('tasks/fetch');

          // if (this.successMessage) {
          // this.$refs.snackbar[t](this.successMessage)
          this.$toast.success('User Assigned Successfully!', {
            position: "bottom-left",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          // }
        });
      }
    },
    handleHide(bvEvent) {
      if (!this.isCloseable) {
        bvEvent.preventDefault();
      } else {
        this.$refs.dropdown.hide();
      }
    },
    closeMe(due_date, task_id) {
      this.isCloseable = true;

      this.$refs.dropdown.hide();
      if (due_date != null) {
        this.inline_due_date(due_date, task_id);
      }
      this.startDate2 = "";
    },
    closed() {
      this.isCloseable = true;

      this.$refs.dropdown.hide();
    },
    inlineUpdate(ev, type, index, priority, task_id) {
      // console.log(444);
      var t = "info";
      priority = index;
      var data = {
        id: index,
        task_id: task_id,
      };
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { data }).then(() => {
          this.$store.dispatch('leads/fetch').then(() => {


            // if (this.$store.state.leads.isLoadingLeads == true) {
            // this.$refs.snackbar[t](this.successMessage)
            this.$toast.success('Priority Changed!', {
              position: "bottom-left",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            });
          });

          // }
        });
      } else {
        this.$store.dispatch("tasks/inline_update", { data }).then(() => {
          this.$store.dispatch('tasks/fetch');

          // if (this.$store.state.leads.isLoadingLeads == true) {
          // this.$refs.snackbar[t](this.successMessage)
          this.$toast.success('Prioirty Changed!', {
            position: "bottom-left",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          // }
        });
      }

      // console.log(type);
    },
    dropdownShouldOpen(search, VueSelect) {
      // console.log(VueSelect);
      return VueSelect.closed;
      // if (search.length) {
      //   return VueSelect.open
      // }

      // return VueSelect.search.length !== 0 && VueSelect.open
    },

    onSearch(query) {
      this.search = query;
      this.offset = 0;
    },
    editLead(index) {
      // this.a = index;
      // editLead = index
      router.push("leads/" + index);
      // router.router.push('leads/'+ index[0].id)
      // window.location.href = 'leads/'+ index[0].id
      // console.log(this.a[0]);/
    },
    // dropdownShouldOpen(VueSelect) {
    //   if (this.filterBranch !== null) {
    //     return VueSelect.open
    //   }

    //   return VueSelect.search.length !== 0 && VueSelect.open
    // },

    clearField() {
      this.filterCategory = "";
      this.filterContact = "";
      this.filterSearch = "";
      this.filterStatus = "";
      this.filterUsers = null;
      this.filtercompany = "";
      this.FilterPriority = "";
      this.filterBranch = "";
      // this.fetchAll();
      this.$store.dispatch('leads/fetch')
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },


    filter(event) {
      let abc = null;

      if (this.filterStatus) {

        abc = this.$store.state.status.all.filter(e => e.type === this.filterStatus.toLocaleLowerCase())[0].id
      }

      this.currentPage = 1;
      let filter_status = this.filterStatus
      console.log(this.filterStatus);
      if (this.$router.currentRoute.name == "leads") {
        this.$store
          .dispatch("leads/filter", {
            status: abc,
            branch: this.filterBranch,
            company: this.filtercompany,
            category: this.filterCategory,
            search: this.filterSearch,
            priority: this.FilterPriority,
            // user: this.filterUsers.name,
            user: this.filterUsers,

            contact: this.filterContact,
          })
          .then(() => {
            console.log(this.successMessage);
          })
          .catch(() => {
            console.log(this.errorMessage);
          });
      } else {
        this.$store
          .dispatch("tasks/filter", {
            status: this.filterStatus,
            branch: this.filterBranch,
            company: this.filtercompany,
            category: this.filterCategory,
            search: this.filterSearch,
            priority: this.FilterPriority,
            // user: this.filterUsers.name,
            user: this.filterUsers,
            contact: this.filterContact,
          })
          .then(() => {
            console.log(this.successMessage);
          })
          .catch(() => {
            console.log(this.errorMessage);
          });
      }
    },
    // filterWithUsers(event) {
    //   // console.log(this.filterStatus);
    //   this.$store.dispatch('leads/filter', { user: this.filterUsers, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithBranch(event) {
    //   // console.log(this.filterStatus);
    //   this.$store.dispatch('leads/filter', { branch: this.filterBranch,
    //     status: this.filterStatus,
    //     // branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    openFilter() {
      this.isFilterActive = !this.isFilterActive;
    },
    openFilter2(){
      if(this.isFilterActive==true){
        this.isFilterActive=false
      }
    },
    // filterWithcompany(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { company: this.filtercompany, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     // company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithCategory(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { category: this.filterCategory, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     // category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithContact(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { contact: this.filterContact, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithSearch(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { search: this.filterSearch, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithPriority(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { priority: this.FilterPriority, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    fetchAll() {
      let userLoggedId = JSON.parse(localStorage.getItem('userData')).id

      //console.log(this.$router.currentRoute.params.status);
      if (this.$router.currentRoute.params.status) {
        // if (this.$router.currentRoute.name == "tasks") {
        //   this.$store.dispatch(
        //     "tasks/get",
        //     this.$router.currentRoute.params.lead_id
        //   );
        // } else {
        this.$store.dispatch(
          "leads/get",
          this.$router.currentRoute.params.lead_id
        );
        // }
      }
      if (!this.$router.currentRoute.params.status) {
        // if (this.$router.currentRoute.name == "tasks") {
        //   this.$store.dispatch("tasks/fetch");
        // } else {
      //     if(this.showPrivileges().viewAll === false){
      //   this.$store.dispatch('leads/userViseTasks', userLoggedId)
      // }else{
          // if(this.showPrivileges().viewAll === true){

            this.$store.dispatch("leads/fetch");
          // }
        // this.$store.dispatch("leads/fetch");
        // }
      }
    },
    formatDate(date) {
      const dates = new Date(date);

      const ms = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${dates.getDate()} ${ms[dates.getMonth()]
        } ${dates.getFullYear()}`;
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end;
      if (new Date(endDate).getDate() === new Date().getDate()) {

        var diffInMs = new Date(endDate) - new Date();
        diffInMs = Math.round(diffInDays);
        // eslint-disable-next-line no-bitwise
        return diffInMs | 0;
      } else {
        var diffInMs = new Date(endDate) - new Date();

        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        diffInDays = Math.round(diffInDays);
        // eslint-disable-next-line no-bitwise
        return diffInDays | 0;
      }
      // const diffInMs = new Date(endDate) - new Date();
      // var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      // diffInDays = Math.round(diffInDays);
      // // eslint-disable-next-line no-bitwise
      // return diffInDays | 0;
    },

    // convertToTask() {
    //   const task = {
    //     type: 'task',
    //   }
    //   console.log(task)
    // },
    destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure do you want to delete this item?")) {
        if (this.$router.currentRoute.name == "leads") {
          this.$store.dispatch("leads/destroy", id).then(() => {
            this.fetchAll();
          });
        } else {
          this.$store.dispatch("tasks/destroy", id).then(() => {
            this.fetchAll();
          });
        }
      }
    },
    buttonVariant(status) {

      if (status == "open") {
        return "primary";
      } else if (status == "completed") {
        return "success";
      } else if (status == "invoiced") {
        return "warning";
      } else if (status == "closed") {
        return "secondary";
      } else {

        return "warning";

      }
    },
    priorityVariant(priority) {
      if (priority === 1) {
        return "secondary";
      }
      if (priority === 2) {
        return "warning";
      }
      if (priority === 3) {
        return "info";
      }
      if (priority === 4) {
        return "danger";
      }
      if (priority === 5) {
        return "success";
      }
      return "";

      // return priority === 1 ? 'secondary'
      //   // eslint-disable-next-line no-nested-ternary
      //   : priority === 2 ? 'warning'
      //     // eslint-disable-next-line no-nested-ternary
      //     : priority === 3 ? 'info'
      //       : priority === 4 ? 'danger' : ''
    },
    // eslint-disable-next-line consistent-return
    // AddEmployee(employee) {
    //   const findEmp = this.employee(employ => employ.title === employee.title)
    //   if (findEmp === undefined) { return findEmp }
    // },
  },
  // watch: {
  //   dropClient(oldClient, newClient) {
  //     if (newClient === false) {
  //       document.body.removeEventListener("click", this.clickEventClient);
  //     }
  //   },
  //   dropTask(oldTask, newTask) {
  //     if (newTask === false) {
  //       document.body.removeEventListener("click", this.clickEventTask);
  //     }
  //   },
  // },

  beforeDestroy() {
    window.removeEventListener("click", this.closed());
  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const ClientisEditSidebarActive = ref(false);
    const editItem = ref({});
    const editItemClient = ref({});
    const isFilterActive = ref(false);
    const isSearchMessagesActive = ref(false);

    let statusOptions = ["Open", "Completed", "Invoiced", "Closed"];

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetForm
    );
    // const editLead = ref({})
    const perPage = ref(20);
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    // const toast = useToast();
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    };
    const updateTaskIsCompleted = (taskData) => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted;
      updateTask(taskData);
    };
    const updateTask = (taskData) => {
      store
        .dispatch("appTodo/update", { payload: taskData, id: taskData.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          store.dispatch("appTodo/fetch");
        });
    };

    return {
      // Sidebar
      isCreateSidebarActive,
      isEditSidebarActive,
      perPage,
      currentPage,
      perPageOptions,
      editItem,
      editItemClient,
      ClientisEditSidebarActive,
      perfectScrollbarSettings,
      updateTaskIsCompleted,
      updateTask,
      refFormObserver,
      formValidation,
      getValidationState,
      // toast,
      // editLead,
      isSearchMessagesActive,
      isFilterActive,
      statusOptions,
    };
  },
};
</script>

<style lang="scss">
// @import '@core/scss/vue/libs/vue-select.scss';
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
<style>
.drop {
  width: 500px;
  z-index: 10;
  background: white;
  top: 28px;
  left: -25px;
}

#dropdown {

  display: block;

  margin-left: 1130px;

}



.tab-content {
  margin-top: -1rem;
}

.tab-pane {
  padding-top: 0rem;
}

.chat-widget .chat-app-window .user-chats {
  height: 24rem;
}

#leads_table tbody {
  text-transform: capitalize;

  color: #202126 !important;
  font-size: 14px !important;
}

.dropdown-item {
  color: #202126 !important;
  font-size: 14px !important;
}
</style>
<style lang="scss" scoped>
.hello {
  z-index: 2000 !important;
}

.loader {
  text-align: center;
  color: #bbbbbb;
}

.per-page-selector {
  width: 90px;
}
.dropdown-menu.show{
  max-height:15rem;
  overflow-y:auto;
}
.pagination {
  display: flex;
  margin: 0.25rem 0.25rem 0;
}

.pagination button {
  flex-grow: 1;
}

.pagination button:hover {
  cursor: pointer;
}</style>
<style>.vs__open-indicator {
  fill: darkgray;
}</style>

