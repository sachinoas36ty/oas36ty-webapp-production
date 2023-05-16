<template>
  <div>
    <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />
    <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItemClient"
      @refetch-data="fetchAll" />
    <edit-contact :is-edit-sidebar-active.sync="isEditContactActive" :edit-item.sync="editContact"
      @refetch-data="fetchAll" />
    <!-- <edit-leads :is-edit-sidebar-active.sync="isTaskEditSidebarActive" :edit-item.sync="editTask"
      @refetch-data="fetchAll" /> -->


    <div class="block-header" style="margin-bottom: 12px,
    min-height: 60px;">

      <div class="row d-flex " style="        background: #fff;
                margin: 0;">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="h-left clearfix">
            <div class="card">
              <div class="header d-flex justify-content-between ">
                <div>


                  <h2 v-if="tabsAccess !== 3" class="text-uppercase text-20-black  ">
                    Clients
                  </h2>
                  <h2 v-if="tabsAccess === 3" class="text-uppercase text-20-black  ">
                    Contact Persons

                  </h2>
                </div>
                <div class=" d-flex justify-content-end">
                  <div class="d-inline-flex ">
                    <b-button v-if="tabsAccess === 0 || tabsAccess === 1 || tabsAccess === 2" size="sm" variant="primary"
                      class="mr-1" v-b-modal.modal-clients>
                      <span class="text-nowrap">
                        <feather-icon icon="PlusCircleIcon" />
                        Add Client
                      </span>

                    </b-button>
                    <div v-if="tabsAccess === 3" v-b-modal.modal-contact>

                      <b-button size="sm" variant="primary" class="mr-1">
                        <span class="text-nowrap">
                          <feather-icon icon="PlusCircleIcon" />
                          Add Contact
                        </span>

                      </b-button>
                    </div>
                  </div>
                  <!-- <div class="d-inline-flex ml-1 mr-1">
                                  <b-button size="sm" variant="primary" @click="openFilter()">
                                    <span class="text-nowrap">
                                      <feather-icon icon="FilterIcon" />
                                      RESET
                                    </span>
                                    
                                  </b-button>
                                </div> -->
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

    <b-tabs class="mb-2" v-model="tabsAccess">


      <b-tab active id="All" @click="openFilter2()">
        <template #title>
          {{ 'ALL' }}
        </template>
      </b-tab>
      <b-tab id="Active" @click="openFilter2()">
        <template #title>
          {{ 'ACTIVE' }}
        </template>
      </b-tab>
      <b-tab id="Inactive" @click="openFilter2()">
        <template #title>
          {{ 'INACTIVE' }}
        </template>
      </b-tab>
      <b-tab id="Contact-Person" @click="openFilter2()">
        <template #title>
          {{ 'CONTACT PERSONS' }}
        </template>
      </b-tab>
      <!-- <b-tab id="Task-Wise">
        <template #title>
          {{ 'TASK WISE STATEMENT' }}
        </template>
      </b-tab> -->
      <!-- {{ tabsAccess }} -->
      <!-- {{ isFilterActive }} -->
    </b-tabs>
    <b-card no-body>
      <b-row v-if="isFilterActive == true" class="m-2">
        <b-col md="4">
          <b-form-group >
            <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="paginated_companys" class="my-custom-select"
              v-if="tabsAccess != 3" placeholder="Select the Client" v-model="filtercompany" @input="filterWithClient()"
              @search="onSearch">

            </v-select>
            <v-select v-else v-model="filterContact" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" class="my-custom-select"
              :options="paginated_contactPerson" placeholder="Select the Contact Person" @input="filterWithContact()"
              @search="onSearch">

            </v-select>

          </b-form-group>

        </b-col>
        <b-col md="4">
          <b-form-group class="my-custom-select">

            <b-form-input v-if="tabsAccess != 3" placeholder="Search" v-model="SearchClient" @input="filterWithClient" class="my-custom-select">

            </b-form-input>

            <b-form-input v-else placeholder="Search" v-model="searchContact" @input="filterWithContact" class="my-custom-select">

            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4" >
          <b-button size="sm" style="
    margin-top: 5px;
" variant="primary" @click="resetStateData()">
            <span class="text-nowrap flex "> Reset</span>
          </b-button>
        </b-col>
      </b-row>
      <!-- {{ items1 }} -->

      <b-table v-if="tabsAccess == 3" responsive :per-page="perPage" :current-page="currentPage"
        :show-empty="!isLoading && items1.length == 0" :items="items1" :fields="fields1" class="mb-0 pb-6"
        @row-clicked="onRowClicked" selectable>
        <template #row-details="item">
          <b-card>

            <div class="d-flex justify-content-between" style="text-transform: uppercase;">
              Contact Details
              <div>
                <feather-icon @click="isEditContactActive = true;
                editContact = item.item" style="margin-right:0.5rem;" icon="EditIcon" size="20" />
                <feather-icon v-if=" item.item.data.type == 'delete' " @click=" destroyContact(item.item.data.id) "
                  icon="TrashIcon" size="20" />
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
                      <span v-b-tooltip.hover=" getAllEmail(item) ">{{item.item.email[0].email.substring(0,26)}}</span>
                      &emsp13;
                      <!-- <div style="margin-left: 0.5rem;" class="" v-for="email in item.item.email" :key="user">
                      
                      {{email.email }}
                    </div> -->
                      <span v-if=" (item.item.email.length > 1) ">,..</span>
                    </td>
                    <th scope="row">Phone</th>
                    <td> <span class=" text-capitalize" v-for=" phone  in  item.item.phone " :key=" phone.phone ">

                        {{phone.phone }}
                        <span v-if=" (item.item.phone.length > 1) ">,</span>
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
        <template #cell(name)=" data ">
          <!-- <div  id="id" > -->
          {{ data.item.data.name }}
          <!-- </div> -->
        </template>
        <template #cell(emails)=" data ">

          <!-- <span v-for="mail in data.item.email" :key="mail" v-b-tooltip.hover.top="mail.email">
        </span> -->
          <span> {{ data.item.email[0].email }}</span>



          <b-badge v-if=" data.item.email.length > 1 " variant="secondary" class="badge-glow"
            :title=" data.item.email[1].email ">+{{ data.item.email.length - 1 }}</b-badge>
          <!-- <b-badge v-if="data.item.email.length > 1" variant="secondary" class="badge-glow" v-for="mail in data.item.email" :key="mail" :title="mail.email"></b-badge> -->

        </template>
        <template #cell(phones)=" data ">

          <span> {{ data.item.phone.length > 0 ? data.item.phone[0].phone : '' }}</span> <b-badge
            v-if=" data.item.phone.length > 1 " variant="secondary" class="badge-glow" :title=" data.item.phone[1].phone ">+{{
            data.item.phone.length - 1 }}</b-badge>
        </template>

        <!-- <template #cell(actions)="data">
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
                  isEditContactActive = true;
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
         
              <feather-icon icon="TrashIcon" />
             Delete
            </b-dropdown-item></span>

          </b-dropdown>

        </template> -->
      </b-table>
      <!-- {{ items }} -->
      <b-table v-if=" tabsAccess !== 3 " id="clients_table" responsive :per-page=" perPage "
        :show-empty=" !isLoading && items.length == 0 " :current-page=" currentPage " :items=" items "
        :fields=" fields " class="mb-0" @row-clicked=" onRowClickedLeads " selectable>
        <template #cell(name)=" { item } ">
          <span v-b-tooltip.hover=" item.name " class="client-name234">
            {{ item.name }}
          </span>
        </template>
        <template #cell(open)=" item ">

          <b-badge variant='primary'>
            {{statusCal(item.item.id, 'open').open}}
          </b-badge>
        </template>

        <template #cell(completed)=" item ">
          <b-badge style="background-color: rgb(92, 184, 92);">
            {{statusCal(item.item.id, 'completed').completed}}
          </b-badge>
        </template>

        <template #cell(invoiced)=" item ">
         {{newInvoiceData(item.item.id) }}
        </template>

        <template #cell(paid)=" item ">
         {{newPaidData(item.item.id) }}
        </template>
        <template #cell(tax_withheld)=" item ">
         {{'0' }}
        </template>

        <template #cell(due)=" item ">
         {{newInvoiceData(item.item.id)-newPaidData(item.item.id) }}
        </template>

        <template #cell(closed)=" item ">
          <b-badge variant='secondary'>
            {{ statusCal(item.item.id, 'closed').closed }}
          </b-badge>
        </template>

        <template #row-details=" item ">
          <div class="b-overlay-wrap position-relative">

            <b-tabs card :id=" 'client-tabs' + item.item.id ">
              <b-tab active :id=" 'client-details' + String(Number(item.item.id + 1)) ">
                <template #title>
                  {{ "CLIENT DETAILS"}}

                </template>
                <div>

                  <div class="d-flex justify-content-between" style="text-transform: uppercase;">
                    <span>

                      {{ item.item.name == null ? '-' : item.item.name }} - Client Details
                    </span>
                    <div style="z-index:1;">
                      <!-- edit -->
                      <span>
                        <!-- <font-awesome-icon  icon="edit"></font-awesome-icon> -->
                        <!-- <a href="#" > -->
                        <!-- hey -->
                        <feather-icon v-show=" setPrivileges.edit === true " @click=" setEditItem(item.item) " icon="EditIcon"
                          size="20" />
                        <!-- </a> -->
                      </span>

                      <feather-icon v-if=" setPrivileges.delete === true && item.item.type == 'delete' "
                        @click=" destroyItem(item.item.id) " icon="TrashIcon" size="20" class="ml-1" />
                    </div>
                  </div>
                </div>

                <hr style="border-color:#F75949">

                <b-row class="match-height">




                  <b-container class="ml-0">
                    <b-row class="mb-2">

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Client :</span>
                        <div class="ml-2">

                          {{ item.item.name == null ? '-' : item.item.name }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Location :</span>
                        <div class="ml-2">
                          {{ item.item.location == null ? '-' : item.item.location }}

                        </div>
                        <!-- </b-card-text> -->


                      </b-col>




                    </b-row>
                    <b-row class="mb-2">

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Address :</span>
                        <div class="ml-2">

                          {{ item.item.address == null ? '-' : item.item.address }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">GST Number :</span>
                        <div class="ml-2">
                          {{ item.item.gst_number == null ? '-' : item.item.gst_number }}

                        </div>
                        <!-- </b-card-text> -->


                      </b-col>




                    </b-row>
                    <b-row class="mb-2">

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">State :</span>
                        <div class="ml-2">

                          {{
                          item.item.state_code == null ? '-' : $store.state.branches.states.filter(x =>
                          (+x.fips_code === item.item.state_code))[0].name
                          }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">PAN :</span>
                        <div class="ml-2">
                          {{ item.item.pan == null ? '-' : item.item.pan }}

                        </div>
                        <!-- </b-card-text> -->


                      </b-col>




                    </b-row>
                    <b-row class="mb-2">

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">TAN :</span>
                        <div class="ml-2">

                          {{ item.item.tan == null ? '-' : item.item.tan }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Client Type :</span>
                        <div class="ml-2">
                          {{
                          item.item.client_types == null ? '-' : $store.state.branches.businessTypes.filter(x =>
                          (x.id === item.item.client_types))[0].bussiness_type
                          }}

                        </div>
                        <!-- </b-card-text> -->


                      </b-col>




                    </b-row>
                    <b-row class="mb-2">

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Opening Balance (₹) :</span>
                        <div class="ml-2">

                          {{ item.item.opening_balance == null ? '-' : item.item.opening_balance }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Opening Balance Date :</span>
                        <div class="ml-2">
                          {{ item.item.opening_bal_date == null ? '-' : item.item.opening_bal_date }}

                        </div>
                        <!-- </b-card-text> -->


                      </b-col>




                    </b-row>
                    <b-row>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Approx Turnover (₹) :</span>
                        <div class="ml-2">

                          {{ item.item.annual_turn_over == null ? '-' : item.item.annual_turn_over }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                    </b-row>

                  </b-container>





                  <!-- about -->



                </b-row>

                <div class="d-flex mt-4" style="text-transform: uppercase;">
                  Contact Persons
                </div>
                <hr style="border-color:#F75949">

                <b-row class="match-height">




                  <b-container class="ml-0">
                    <b-row class="mb-2" v-for="( contact, index ) in  showClientViseContact(item.item.id) " :key=" index ">
                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Name :</span>
                        <div class="ml-2 contact-name" v-b-tooltip.hover=" contact.name ">

                          {{ contact.name == null ? '-' : contact.name }}
                        </div>
                        <!-- </b-card-text> -->


                      </b-col>

                      <b-col cols="4" class="d-flex">
                        <!-- <b-card-text > -->
                        <span style="font-weight: bolder;">Email :</span>
                        <div class="ml-2 contact-name" v-b-tooltip.hover=" contact.email ">

                          {{ contact.email == null ? '-' : contact.email }}
                          <b-badge v-b-tooltip.hover.top=" getEmailsString(contact.allEmails) "
                            v-if=" contact.allEmails.length > 1 " class="ml-1" variant="danger">+{{
                            contact.allEmails.length - 1
                            }}</b-badge>
                        </div>
                        <!-- </b-card-text> -->

                      </b-col>

                      <div>
                        <feather-icon @click=" editContactPeople(contact) " icon="EditIcon" size="20" />
                      </div>

                    </b-row>

                  </b-container>





                  <!-- about -->



                </b-row>
              </b-tab>
              <b-tab v-if=" setPrivileges.pass === true " id="client-passwords">
                <template #title>
                  {{ "PASSWORDS"}}
                </template>
                <div class="d-flex justify-content-between" style="text-transform: uppercase;">
                  {{ item.item.name == null ? '-' : item.item.name }} - Passwords
                  <div style="z-index:1;">
                    <feather-icon @click=" setEditItem(item.item) " icon="EditIcon" size="20" />
                  </div>
                </div>
                <hr style="border-color:#F75949">
              </b-tab>
              <b-tab v-if=" setPrivileges.task === true " id="client-task">
                <template #title>
                  {{ "TASK DETAILS"}}
                </template>
                <div class="d-flex" style="text-transform: uppercase;">
                  {{ item.item.name == null ? '-' : item.item.name }} - Task Details
                </div>
                <hr style="border-color:#F75949">

                <LeadsTableGlobal :childFunction=" handleChildFunction(item.item.name) "></LeadsTableGlobal>

              </b-tab>

              <b-tab v-if=" setPrivileges.attach === true " id="client-attachments">
                <template #title>
                  {{ "ATTACHMENTS"}}
                </template>
                <div class="d-flex" style="text-transform: uppercase;">
                  {{ item.item.name == null ? '-' : item.item.name }} - Attachments
                </div>
                <hr style="border-color:#F75949">
                <b-row>
                  <b-col md="6">
                    <div v-if=" $store.state.tasks.s3_url.length > 0 " class="border-l p-1">
                      <span v-for="( file, index ) in  $store.state.tasks.s3_url " :key=" index ">
                        {{ file.fileName }}

                        <feather-icon icon="XIcon" class="cursor-pointer" @click=" removes3(file.url, index) " />
                      </span>
                    </div>
                    <div v-else class="border-l p-1">No attachments to show... </div>
                  </b-col>
                  <b-col md="6">
                    <div class="mx-1 border-l">

                      <!-- <b-form @submit.prevent="handleSubmit(UpdateProfile)"> -->

                      <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                          <div>Attachment(s)</div>
                          <div>
                            <input type="file" ref="file" @change=" UpdateProfile " style="display: none" />
                            <b-button size="sm" variant="primary" @click=" $refs.file.click() ">
                              Choose File(s)
                            </b-button>
                          </div>
                        </div>
                        <!-- </b-form> -->
                      </div>
                      <div class="d-flex justify-content-center align-items-center p-1">
                        <div v-if=" $store.state.tasks.s3_url.length > 0 ">
                          {{ $store.state.tasks.s3_url[0].fileName }}
                          <feather-icon icon="XIcon" class="cursor-pointer"
                            @click=" removes3($store.state.tasks.s3_url[0].url, index) " />
                        </div>
                        <div v-else>No file(s) selected</div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab v-if=" setPrivileges.timeSheet === true " id="client-timesheet">
                <template #title>
                  {{ "COST-SHEET"}}
                </template>
                <div class="d-flex" style="text-transform: uppercase;">
                  {{ item.item.name == null ? '-' : item.item.name }} - Timesheet
                </div>
                <hr style="border-color:#F75949">
                <b-table id="client-timesheet-details" responsive :per-page=" perPage " :current-page=" currentPage "
                  :items=" timeItems " :fields=" timeFields " class="mb-0" @row-clicked=" onTimeClicked " selectable>
                  <template #row-details=" item ">
                    <b-container class="ml-0">
                      <table class="w-100">
                        <thead>
                          <th>
                            Date
                          </th>
                          <th>
                            Description
                          </th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Tue, Jun 04 2019
                            </td>
                            <td>
                              created proposal
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </b-container>
                  </template>
                </b-table>
              </b-tab>
              <b-tab v-if=" setPrivileges.statement === true " id="client-statement">
                <template #title>
                  {{ "STATEMENT"}}
                </template>

                <div class="d-flex" style="text-transform: uppercase;">
                  {{ item.item.name == null ? '-' : item.item.name }} - Client Statement
                </div>
                <hr style="border-color:#F75949">
                <b-row class="d-flex justify-content-between">
                  <b-col md="4">
                    <b-img src="../../../../public/centrik-logo.png" alt="logo" />
                    <div class="mt-4">TO,<br />
                      <br />
                      Timber Touch India Pvt Ltd<br />
                      1st floor,B-268, Greator kailash Part -I New Delh
                    </div>
                  </b-col>
                  <b-col md="4">
                    <div class="d-flex justify-content-end text-bolder mt-1">
                      Statement Of Accounts
                    </div>
                    <hr style="border-color:black">
                    <div class="d-flex justify-content-end mt-1">
                      {{statementPeriod.first}} To {{statementPeriod.last}}
                    </div>
                    <hr style="border-color:black">
                    <table class="mt-2">
                      <thead>
                        <th id="client-account-summary">
                          Account Summary
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Opening Balance</td>
                          <td>{{ item.item.opening_balance!=null ? item.item.opening_balance : 0 }}</td>
                        </tr>
                        <tr>
                          <td>Invoiced Amount</td>
                          <td>{{ statementInvoice }}</td>
                        </tr>
                        <tr>
                          <td>Amount Paid</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Tax Withheld</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Balance Due</td>
                          <td>5000</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col md="12">
                    <table id="client-statement-details" class="w-100">
                      <thead>
                        <th>
                          Date
                        </th>
                        <th>
                          Transaction
                        </th>
                        <th>
                          Details
                        </th>
                        <th>
                          Due
                        </th>
                        <th>
                          Payment
                        </th>
                        <th>
                          Balance
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01 Jan 2023</td>
                          <td>Opening Balance</td>
                          <td></td>
                          <td>5000</td>
                          <td></td>
                          <td>5000</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>

            <!-- <div v-if=" showShimmer " class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> </span>
                <br><span style="margin-left:-2rem;">Processing..</span>
              </div>
            </div> -->

          </div>
        </template>

        <template #cell(actions)=" data ">
          <b-dropdown variant="link" no-caret :right=" $store.state.appConfig.isRTL ">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

            <!-- <span class="align-middle "
              @click="
              isEditSidebarActive = true;
              editItem = data.item;"
            variant="outline-secondary"
              >
            <b-dropdown-item>
              <feather-icon icon="EditIcon" />
              Edit
            </b-dropdown-item></span>-->
            <span class="align-middle " @click=" destroyItem(data.item.id) " variant="outline-secondary">
              <b-dropdown-item v-if=" data.item.type == 'delete' ">
                <feather-icon icon="TrashIcon" />
                Delete
              </b-dropdown-item></span>


          </b-dropdown>


        </template>
      </b-table>

      <div v-if=" items.length > 0 || items1.length > 0 " class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <!-- <span class="text-muted">Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-if=" tabsAccess == 3 " v-model=" currentPage " :total-rows=" items1.length " :per-page=" perPage "
              first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
            <b-pagination v-else-if=" tabsAccess != 3 " v-model=" currentPage " :total-rows=" items.length "
              :per-page=" perPage " first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item"
              next-class="next-item">
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

    </b-card>
    <div class="text-center">
      <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
      <b-spinner v-if=" isLoading " />

    </div>
  </div>
</template>

<script>
import LeadsTableGlobal from '../leads/LeadsTableGlobal.vue'
import CreateContact from '../contact-people/CreateContact.vue';
import { VBModal, BCard, BForm, BFormInput, BContainer, BFormGroup, BRow, BCol, BTable, BPagination, BButton, BDropdown, BDropdownItem, BSpinner, BTabs, BTab, BImg, BBadge, BTooltip, VBTooltip, VBToggle, BDropdownForm } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import Ripple from 'vue-ripple-directive'
import { required, email } from "@validations";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import CreateSidebar from "./CreateSidebar.vue";
import EditSidebar from "./EditSidebar.vue";
import EditLeads from "../leads/EditSidebar.vue";
import EditContact from "../contact-people/EditSidebar.vue";
import vSelect from 'vue-select'
import CreateClient from './CreateClient.vue'
import EditClient from "./EditClient.vue"
import store from '@/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faBars, faEnvelopeOpen, faEnvelope, faComments, faComment, faCommentDots, faCommentDollar, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,

  faFacebook,
  faStackOverflow,

  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@/@core/comp-functions/forms/form-validation'
import CardAdvanceChat from '../leads/CardAdvanceChat.vue'
import Todo from '../leads/todo.vue'
import flatPickr from 'vue-flatpickr-component'
import { isUserLoggedIn } from '@/auth/utils';
library.add(faBars, faEdit, faComments, faComment, faCommentDollar, faCommentDots, faTwitter, faEnvelopeOpen, faEnvelope, faFacebook, faStackOverflow, faGithub, faIndianRupee);


export default {
  components: {
    LeadsTableGlobal,
    BCard, vSelect,
    EditContact,

    CreateClient,
    BRow, BContainer, BFormGroup,
    EditLeads,
    BSpinner, BPagination,
    BForm, BFormInput,
    BCol,
    BTable,
    BButton,
    BDropdown,
    BDropdownItem,
    CreateSidebar,
    EditSidebar,
    EditClient,
    BTabs,
    BTab,
    BImg,
    BBadge,
    BTooltip,
    FontAwesomeIcon,
    ValidationProvider,
    ValidationObserver,
    formValidation,
    CardAdvanceChat,
    VBTooltip,
    Todo,
    BDropdownForm,
    flatPickr
  },
  directives: {
    'b-tooltip': VBTooltip,
    'b-toggle': VBToggle,
    'b-modal': VBModal,
    Ripple,
    required,
  },
  data() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return {
      Tasksprevileges: {
        edit: false,
        onRowEdit: false,
        viewAll: false,
        conversion: false,
        clientDetails: false,
        timeSheet: false,
        checklist: false,
        delete: false,
        download: false,

        Leadsedit: false,
        LeadsonRowEdit: false,
        LeadsviewAll: false,
        Leadsconversion: false,
        LeadsclientDetails: false,
        LeadstimeSheet: false,
        Leadschecklist: false,
        Leadsdelete: false,
        Leadsdownload: false,
      },
      paidAmountAll:'',
      filterPaymentAll:[],
      filteredInvoicesAll:[],
      filteredLeadsall:[],
      invoicedClient:[],
      amountInvoiced:'',
      taskInvoiceData:[],
      showShimmer: false,
      contactData: [],
      contactNames: [],
      clientNames: [],
      detailsRowLeads: null,
      extraTabs: 0,
      clientData: [],
      SearchClient: '',
      searchContact: '',
      limit: 8,
      offset: 0,
      search: '',
      tabsAccess: 0,
      clientId: 0,
      filterStatus: null,
      filtercompany: null,
      filterCategory: null,
      filterContact: null,
      filterSearch: null,
      FilterPriority: null,
      filterUsers: null,
      filterBranch: null,
      previleges: {
        edit: false,
        pass: false,
        attach: false,
        task: false,
        timeSheet: false,
        delete: false,
        statement: false,
      },
      // text:'',
      // textLength:false,
      replySubject: '',
      contactIndex: null,
      startDate2: null,
      importance: [{ id: 1, star: "StarIcon" }, { id: 2, star: "StarIcon" }, { id: 3, star: "StarIcon" }, { id: 4, star: "StarIcon" }, { id: 5, star: "StarIcon" }],
      importance2: [{ id: 1, star: "*" }, { id: 2, star: "* *" }, { id: 3, star: "* * *" }, { id: 4, star: "* * * *" }, { id: 5, star: "* * * * *" }],
      invoice: {
        prefix: '',

        client_name: '',
        editId: 0,
        state_code: 0,
        client: null,
        gstNumber: '',
        item_details: '',
        state: null,
        id: '',
        pdate: `${year}-${month}-${day}`,
        due_date: `${year}-${month}-${day}`,
        billing_address: 'delhi jangpura',
        notes: 'Thank you for your business.',
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
        expense_details: '',
        adjustments: 0,
        total: 0

      },
      observer: null,
      fields: [{ key: 'name', label: 'Client Name', thClass: 'th-color width-23' }, { key: 'invoiced', label: 'Invoiced (₹)', thClass: 'th-color' }, { key: 'paid', label: 'Paid (₹)', thClass: 'th-color' }, { key: 'tax_withheld', label: 'Tax Withheld (₹)', thClass: 'th-color' }, { key: 'due', label: 'Due (₹)', thClass: 'th-color' }, { key: 'open', label: 'Open', thClass: 'th-color', tdClass: 'text-center' }, { key: 'completed', label: 'Completed', thClass: 'th-color', tdClass: 'text-center' }, 
      // { key: 'invoiced_number', label: 'Invoiced', thClass: 'th-color', tdClass: 'text-center' }, 
      { key: 'closed', label: 'Closed', thClass: 'th-color', tdClass: 'text-center' }, { key: 'total', label: 'Total', thClass: 'th-color', tdClass: 'text-center' }],
      fields1: ['name', 'emails', 'phones'],
      fields2:[{key:'id',label:'Task# ',},{key:'taskSubject',label:'Task Subject', thStyle: { paddingLeft: "0rem", width: "28%" },
          tdClass: "pl-0",
          html: true,},{key:'clientName',label:'Client Name'},{key:'status',label:'Status'},{key:'value',label:'Value of tasks(estimate+invoice)'},{key:'employees',label:'Employees'},{key:'timeCost',label:'Time Cost'},{key:'profit',label:'Profit/Loss'}],
      taskFields: [{ key: 'priority', label: 'priority', tdClass: 'width-0' }, { key: 'id', label: '#', tdClass: 'text-left width-0', thClass: 'text-left' }, { key: 'subject', label: 'subject', tdClass: 'text-left width-0', thClass: 'text-left', html: true }, { key: 'status', label: 'Status', tdClass: 'text-left width-0', thClass: 'text-left' }, { key: 'proposal', label: 'Proposal (₹)', tdClass: 'text-left width-0', thClass: 'text-left' }, { key: 'ammount', label: 'Ammount (₹)', tdClass: 'text-left width-0', thClass: 'text-left' }, { key: 'recieved', label: 'Recieved (₹)', tdClass: 'text-left width-0', thClass: 'text-left' }, { key: 'pending', label: 'Pending (₹)', tdClass: 'text-left width-0', thClass: 'text-left' }],
      proposalTable: [{ key: 'activity', label: 'activity', tdClass: 'text-center', thClass: 'text-center th-color' }, { key: 'date', label: 'date', tdClass: 'text-center', thClass: 'text-center th-color' }, { key: 'id', label: 'no.', tdClass: 'text-center', thClass: 'text-center th-color' }, { key: 'notes', label: 'internal notes', tdClass: 'text-center', thClass: 'text-center th-color' }, { key: 'amount', label: 'amount (₹)', tdClass: 'text-center', thClass: 'text-center th-color' }, { key: 'status', tdClass: 'text-center', thClass: 'text-center th-color' }],
      timeFields: [{ key: 'subject', label: 'Task Subject', thClass: 'th-color' }, { key: 'member', label: 'Member', thClass: 'th-color' }, { key: 'date', label: 'Date', thClass: 'th-color' }, { key: 'time', label: 'Time Devoted', thClass: 'th-color' }, { key: 'cost', label: 'Cost (₹)', thClass: 'th-color' }],
      detailsRow: null,
      file_name: '',
      text: '',
      textLength: false,
      FilterPriority: null,
      historyIconName: 'ChevronRightIcon',
      taskIconName: 'ChevronRightIcon',
      clientIconName: 'ChevronRightIcon',
      upcomingIconName: 'ChevronRightIcon',
      pendingIconName: 'ChevronRightIcon',
      payment: {
        edit_id: 0,
        title: 'add',
        client: null,
        mode: null,
        tax: false,
        branch: null,
        amount: 0,
        date: `${year}-${month}-${day}`,
        reference_id: '',
        notes: '',
        payment: [],
        tds: [],
      },
      parse: null,
    };
  },
  computed: {

    task_item(){
      let items=this.$store.state.tasks.all
      items=items.filter((e)=>e.type==="task")
      return items
    },


    setPrivileges() {
      let priveleges = [];
      let data = this.previleges;
      let roles = this.$store.state.users.all;
          // let currUser = JSON.parse(localStorage.getItem('userData'))//.user_role_id



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
          if (x.name === 'Clients') {
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
          console.log(x.name === 'Leads Editing', 'nnnnnnnnnn')
          if (x.name === 'Client Edit') {
            if (x.status === 'active') {
              data.edit = true
            }
          }
          else if (x.name === 'Client Password') {
            if (x.status === 'active') {
              data.pass = true
            }
          }
          else if (x.name === 'Client Tasks') {
            if (x.status === 'active') {
              data.task = true
            }
          }
          else if (x.name === 'Client Attachments') {
            if (x.status === 'active') {
              data.attach = true
            }
          }
          else if (x.name === 'Client Time Sheet') {
            if (x.status === 'active') {
              data.timeSheet = true
            }
          }
          else if (x.name === 'Client Statement') {
            if (x.status === 'active') {
              data.statement = true
            }
          }
          else if (x.name === 'Client Delete') {
            if (x.status === 'active') {
              data.delete = true
            }
          }
        })


        console.log(data, 'mmmmmmmmmmm');

      }
      // }
      return data
    },
    statementPeriod() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let fDay = firstDay.getDate();
      let fMonth = monthNames[firstDay.getMonth()];
      let fYear = firstDay.getFullYear()
      let lDay = lastDay.getDate();
      let lMonth = monthNames[lastDay.getMonth()];
      let lYear = lastDay.getFullYear()
      return {
        first: `${fDay} ${fMonth} ${fYear}`,
        last: `${lDay} ${lMonth} ${lYear}`
      }
    },
    statementInvoice() {
      let items = this.$store.state.invoice.all;
      let invoiced = 0;
      let d = null;
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.parse = date
      let filtered = items.filter(x => {
        this.parse = this.parse.parse(x.created_at)
        console.log(firstDay <= d <= lastDay, 'mmmmmmmmmm');
        return firstDay <= lastDay;
      })
      filtered.forEach(y => {
        invoiced = invoiced + y.amount
      })
      return invoiced;
    },
    payment_modes() {
      return [{ id: 1, name: 'Cash' }, { id: 2, name: 'Cheque' }, { id: 3, name: 'Bank Transfer' }];
    },
    allStates() {
      return this.$store.state.branches.states;
    },
    show_companys() {
      return this.$store.state.clients.all;
    },
    show_contactPerson() {
      return this.$store.state.contactPeople.allForLeads;
    },
    todo_status() {
      return this.$store.state.appTodo.isLoadingUpdate;
    },
    totalAmount() {
      this.pamount = (+this.amountField[0].amount);
      if (this.amountField.length > 0) {
        for (let i = 1; i < this.amountField.length; i++) {
          this.pamount = this.pamount + (+this.amountField[i].amount)
        }
      }
      return this.pamount;
    },
    filterLeads(val) {

      return this.items.filter(item => {
        let keep = true;

        // This is a basic equality filter. What I did in the actual code was to have an object with filter functions for each key. If a key was missing, it defaulted to straight equality.
        this.fieldKeys.forEach(key => {
          keep =
            keep &&
            (this.selectVal[key] === undefined ||
              item[key] === this.selectVal[key]);
        });

        return keep;
      });

      // return this.$store.state.leads.all.filter(e => e.type === 'lead').filter(item => {
      //   if(this.FilterPriority != null){

      //     item.priority === this.FilterPriority.id
      //   }
      // });
    },
    fieldKeys() {
      return Object.keys(this.items[0]);
    },

    isLoading() {
      this.todos = this.$store.state.appTodo.all
      if (this.$router.currentRoute.name == 'tasks') {

        return this.$store.state.tasks.isLoadingLeads
      } else {
        return this.$store.state.leads.isLoadingLeads

      }

    },
    successMessage() {
      return this.$store.state.leads.successMessage
    },
    errorMessage() {
      return this.$store.state.leads.errorMessage
    },
    errors() {
      return this.$store.state.leads.errors.branch_id ? this.$store.state.leads.errors.branch_id[0] : ''
    },
    totalCount() {
      return this.$store.state.leads.all.filter(e => e.type === 'lead').length;

    },
    companys() {
      // return this.$store.state.clients.all
      var data = [];
      for (let index = 0; index < this.$store.state.clients.all.length; index++) {
        data[index] = this.$store.state.clients.all[index].name;

      }



      return data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    },
    paginated_companys() {
      // return this.companys.slice(this.offset, this.limit + this.offset)
      return this.companys
    },
    companys_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.companys.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    companys_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.companys.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    category() {
      // return this.$store.state.categories.all
      var data = [];
      for (let index = 0; index < this.$store.state.categories.all.length; index++) {
        data[index] = this.$store.state.categories.all[index].name;

      }


      // return data;
      return data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    },
    paginated_category() {
      return this.category.slice(this.offset, this.limit + this.offset)
    },
    category_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.category.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    category_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.category.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    branches() {
      var data = [];
      for (let index = 0; index < this.$store.state.branches.all.length; index++) {
        data[index] = this.$store.state.branches.all[index].name;

      }


      // return data;
      return data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
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
      return this.branches.slice(this.offset, this.limit + this.offset)
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.branches.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.branches.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    users_to_assign() {
      var items = this.$store.state.users.all;
      var data = [];
      var leads = this.$store.state.leads.all.filter(e => e.type === 'lead');
      var user_assigned = []


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
          avatar: items[index].avatar
        }
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }


        // }
        // }
      }
      return data.filter((country) => country.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    },
    paginated_users_to_assign() {
      return this.users_to_assign.slice(this.offset_users, this.limit_users + this.offset_users)
    },
    users() {
      // return this.$store.state.users.all
      var data = [];
      for (let index = 0; index < this.$store.state.users.all.length; index++) {
        data[index] = this.$store.state.users.all[index].name;

      }


      // return data;
      if (this.search.includes('@')) {
        // this.subtask_assignee = this.search.('@')
        // this.search.replace('@', ' ')

        return data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
      } else {
        return data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))

      }
    },
    paginated_users() {
      return this.users.slice(this.offset, this.limit + this.offset)
    },
    users_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.users.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    users_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.users.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    contactPerson() {
      // return this.$store.state.contactPeople.allForLeads
      var data = [];
      for (let index = 0; index < this.$store.state.contactPeople.allForLeads.length; index++) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name;

      }


      // return data;
      return data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    },
    paginated_contactPerson() {
      return this.contactPerson//.slice(this.offset, this.limit + this.offset)
    },
    contactPerson_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.contactPerson.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    contactPerson_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.contactPerson.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    assignedUsers() {
      var items = this.$store.state.comments.assignedUsers;
      const element = [];
      for (let index = 0; index < items.length; index++) {
        element[index] = {
          id: items[index].id,
          users: items[index].users
        };

      }
      return element;
    },
    todo() {
      this.todos = this.$store.state.appTodo.all

      return this.$store.state.appTodo.all;
    },
    allProposals() {
      let payment = this.$store.state.recordPayment.all
      let d1 = this.$store.state.invoice.all;
      this.payment.payment = []
      for (let index = 0; index < d1.length; index++) {
        // const element = array[index];
        this.payment.payment.push({ id: index + 1, tds: 0, amount: 0, invoice_id: d1[index].id })
        // this.payment.tds.push({id:index+1,amount:0});
      }
      let d2 = this.$store.state.proposals.allProposals;
      let d3 = []
      d1.forEach(element => {
        element.title = 'invoice'
        d3.push(element)
      });
      d2.forEach(element => {
        element.title = 'proposal'
        d3.push(element)
      });
      d1.forEach(e => {
        payment.forEach(element => {
          element.invoice.forEach(i => {
            if (e.id === i.id && element.id === this.payment.edit_id) {
              this.paid_payment.push(e)
            }
          });
        });
      });
      payment.forEach(element => {
        element.title = 'payment'
        d3.push(element)
      });
      // let data = this.$store.state.proposals.allProposals;
      let data = d3



      return data;
    },
    isLoading() {
      return this.$store.state.clients.isLoading;
    },
    totalCount() {
      return this.$store.state.clients.all.length;

    },
    successMessage() {
      return this.$store.state.clients.successMessage;
    },
    errorMessage() {
      return this.$store.state.clients.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.clients.errors));
    },

    
    items() {
      let items = [];
      // let invoiceData=this.taskInvoiceData

      // items=items.filter(e =>console.log(e.name,'lllllllllllllllllllllllllllllllllllllllllllllllllll'))
      items.forEach(x => {
        this.clientNames.push(x.name)
      })


      if (this.tabsAccess === 0) {
        items = this.$store.state.clients.all
        //  return this.$store.state.clients.all;
        // console.log(this.$store.state.clients.all,'checking...........')
      } else if (this.tabsAccess === 1) {
        items = this.$store.state.clients.all.filter(e => e.status === 'active')
      } else if (this.tabsAccess === 2) {
        items = this.$store.state.clients.all.filter(e => e.status !== 'active')

      }
      let arr = []
      let search_arr = []
      if (this.filtercompany) {
        items.forEach(element => {
          if (element.name === this.filtercompany) {
            arr.push(element)
          }
        });
        items = arr
      } else if (this.SearchClient) {
        const searchTerm1 = this.SearchClient.toLowerCase();
        items.forEach(element => {
          const name1 = element.name.toLowerCase();
          if (name1.includes(searchTerm1)) {
            search_arr.push(element)
          }
        });
        items = search_arr
      }else{

      
      if (this.$store.state.invoice.allData.length > 0) {
        let invoice = this.$store.state.invoice.allData;
        // let tasksData=this.$store.state.tasks.all
        // let selectedInvoices=[];
        // tasksData.forEach(e =>{
          
        // })
        let invoices = [];
        items.forEach(x => {
          // x.invoiced = 0;
          let result = []
          result = invoice.filter(y => {
            if (y.client !== null) {

              return y.client.name === x.name
            }
          })
          console.log(result, 'jjjjjjjj')
          invoices = result;
          console.log(invoices, 'ttttttt')
          if (invoices.length > 0) {
            invoices.forEach(z => {
              x.invoiced = x.invoiced + z.amount;
              x.invoiced = Math.round(x.invoiced)
            })
            invoices = []
          }
        })
      }
      if (this.$store.state.recordPayment.allData.length > 0) {
        let payment = this.$store.state.recordPayment.allData;
        let payments = [];
        items.forEach(x => {
          // x.paid = 0;
          let result = payment.filter(y => {
            return y.client_id === x.id
          })
          console.log(result, 'bbbbbbbbbbb');
          payments = result;
          if (payments.length > 0) {
            payments.forEach(z => {
              z.counting = 0;
              // x.invoiced = x.invoiced + z.amount;
              if (z.record_pay_invoice.length > 0) {
                z.record_pay_invoice.forEach(v => {
                  z.counting = z.counting + v.paid_amount;
                })
                x.paid = x.paid + z.counting;
                x.paid=Math.round(x.paid)
              }
            })
            payments = []
          }
        })
      }
      items.forEach(x => {
        // x.due = 0
        if (x.invoiced !== 0 && x.paid) {

          x.due = x.invoiced - x.paid;
          x.due=Math.round(x.due)
        }
      })
      if (items.length > 0) {
        items.sort((a, b) => {
          const latestA = a.updated_at || a.created_at;
          const latestB = b.updated_at || b.created_at;
          return latestB.localeCompare(latestA);
        });
      }
      
    }
      // this.clientData = items
      return items;
    },
    items1() {
      let data = []
      if (this.$router.currentRoute.params.status && this.$router.currentRoute.params.tab === 'contacts') {
        // this.$store.dispatch('contactPeople/get',this.$router.currentRoute.params.contact_id).then(() => {
        this.$store.state.contactPeople.all.forEach(x => {
          if (x.data.id === this.$router.currentRoute.params.contact_id) {
            data.push(x)
          }
        });
        this.tabsAccess = 3
        // this.tabsAccess = 3
        // })
      } else {
        data = this.$store.state.contactPeople.all
      }
      let arr1 = []
      let search_arr1 = []
      if (this.filterContact) {
        data.forEach(element => {
          if (element.data.name === this.filterContact) {

            arr1.push(element)

          }
        })
        data = arr1

      } else if (this.searchContact) {
        const searchTerm = this.searchContact.toLowerCase();
        data.forEach(element => {
          const name = element.data.name.toLowerCase();
          if (name.includes(searchTerm)) {
            search_arr1.push(element)
          }
        })
        data = search_arr1
      }else{
        data =data
      }
      
      // console.log("hello :",this.$store.state.contactPeople.all)
      // this.contactNames = data
      return data//this.$store.state.contactPeople.all
    },
    timeItems() {
      let data = [
        {
          subject: 'Task Form INCA',
          member: 'Team Centrik',
          date: '2019-06-04',
          time: '00:10',
          cost: '410'
        }
      ]
      return data;
    },
    taskItems() {
      var items = []
      items = this.$store.state.tasks.all.filter(e => e.type === 'task').concat(this.$store.state.leads.all.filter(e => e.type === 'lead'))
      items = items.filter(e => e.company_id === this.clientId)
      // var users= items.map(item => item.users.length > 0 ? item : null)
      // var users= items.map(item => item.users.length > 0 ?? item.id)
      // items.splice(users)
      var element = [];
      var element2 = '';
      for (let index = 0; index < items.length; index++) {
        element[index] = items[index];

        if ((items[index].users.length === 0 && this.filterUsers != null) || (items[index].status_master == null && this.filterStatus != null)) {
          // if(this.filterUsers != null){
          element.splice(element.indexOf(element[index]), 1)

          // }
          // if(this.filterUsers == null){
          //   element[index] = items[index]
          // }
        }



      }

      return element.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    },
    contactPersons() {
      let items = this.$store.state.leads.all//.filter(e => e.type === 'task').concat(this.$store.state.leads.all.filter(e => e.type === 'lead'))
      let data = []
      items.forEach((x, i) => {
        if (x.company_id != null) {


          if (x.contact_person != null) {

            data.push({
              id: x.contact_person.id,
              name: x.contact_person.name,
              email: x.contact_person.emails[x.contact_person.emails.length - 1].email,
              allEmails: []
            })

            x.contact_person.emails.forEach(y => {
              if (data[i]) {

                data[i].allEmails.push(y.email)
              }
            })
          }
        }
      })

      return data.filter((value, index, self) =>
        index === self.findIndex((t) => (t.name === value.name && t.email === value.email
        )))
    }
  },
  methods: {
    updateItems() {
      this.clientData = []
      this.clientNames = []

      let items = [];

      // items=items.filter(e =>console.log(e.name,'lllllllllllllllllllllllllllllllllllllllllllllllllll'))
      items.forEach(x => {
        this.clientNames.push(x.name)
      })


      if (this.tabsAccess === 0) {
        items = this.$store.state.clients.all
        //  return this.$store.state.clients.all;
        // console.log(this.$store.state.clients.all,'checking...........')
      } else if (this.tabsAccess === 1) {
        items = this.$store.state.clients.all.filter(e => e.status === 'active')
      } else if (this.tabsAccess === 2) {
        items = this.$store.state.clients.all.filter(e => e.status !== 'active')

      }
      if (this.$store.state.invoice.allData.length > 0) {
        let invoice = this.$store.state.invoice.allData;
        let invoices = [];
        items.forEach(x => {
          x.invoiced = 0;
          let result = []
          result = invoice.filter(y => {
            if (y.client !== null) {

              return y.client.name === x.name
            }
          })
          console.log(result, 'jjjjjjjj')
          invoices = result;
          console.log(invoices, 'ttttttt')
          if (invoices.length > 0) {
            invoices.forEach(z => {
              x.invoiced = x.invoiced + z.amount;
            })
            invoices = []
          }
        })
      }
      if (this.$store.state.recordPayment.allData.length > 0) {
        let payment = this.$store.state.recordPayment.allData;
        let payments = [];
        items.forEach(x => {
          x.paid = 0;
          let result = payment.filter(y => {
            return y.client_id === x.id
          })
          console.log(result, 'bbbbbbbbbbb');
          payments = result;
          if (payments.length > 0) {
            payments.forEach(z => {
              z.counting = 0;
              // x.invoiced = x.invoiced + z.amount;
              if (z.record_pay_invoice.length > 0) {
                z.record_pay_invoice.forEach(v => {
                  z.counting = z.counting + v.paid_amount;
                })
                x.paid = x.paid + z.counting;
              }
            })
            payments = []
          }
        })
      }
      items.forEach(x => {
        x.due = 0
        if (x.invoiced !== 0 && x.paid) {

          x.due = x.invoiced - x.paid;
        }
      })
      if (items.length > 0) {
        items.sort((a, b) => {
          const latestA = a.updated_at || a.created_at;
          const latestB = b.updated_at || b.created_at;
          return latestB.localeCompare(latestA);
        });
      }

      this.clientData = items
      return
    },
    showPrivileges() {
      let priveleges = [];
      let data = this.Tasksprevileges;
      let roles = this.$store.state.users.all;
      // let currUser = roles.filter((x) => {
      //   return x.id === JSON.parse(localStorage.getItem("userData")).id;
      // });

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
          if (x.name === "Tasks" ) {
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
          if (x.name === "Leads" ) {
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
          if (x.name === "Leads Editing") {
            if (x.status === 'active') {
              data.Leadsedit = true;
            }
          } else if (x.name === "View All Leads") {
            if (x.status === 'active') {
              data.LeadsviewAll = true;
            }
          } else if (x.name === "Leads On Row Editing") {
            if (x.status === 'active') {
              data.LeadsonRowEdit = true;
            }
          } else if (x.name === "Leads Conversion") {
            if (x.status === 'active') {
              data.Leadsconversion = true;
            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === 'active') {
              data.LeadsclientDetails = true;
            }
          } else if (x.name === "Timesheet") {
            if (x.status === 'active') {
              data.LeadstimeSheet = true;
            }
          } else if (x.name === "Checklist") {
            if (x.status === 'active') {
              data.Leadschecklist = true;
            }
          } else if (x.name === "Leads Delete") {
            if (x.status === 'active') {
              data.Leadsdelete = true;
            }
          } else if (x.name === "Leads Download") {
            if (x.status === 'active') {
              data.Leadsdownload = true;
            }
          }
          if (x.name === "Tasks Editing") {
            if (x.status === "active") {
              data.edit = true;
            }
          } else if (x.name === "View All Tasks") {
            if (x.status === "active") {
              data.viewAll = true;
            }
          } else if (x.name === "Tasks On Row Editing") {
            if (x.status === "active") {
              data.onRowEdit = true;
            }
          } else if (x.name === "Accounts") {
            if (x.status === "active") {
              data.accounts = true;
            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === "active") {
              data.clientDetails = true;
            }
          } else if (x.name === "Timesheet") {
            if (x.status === "active") {
              data.timeSheet = true;
            }
          } else if (x.name === "Checklist") {
            if (x.status === "active") {
              data.checklist = true;
            }
          } else if (x.name === "Tasks Delete") {
            if (x.status === "active") {
              data.delete = true;
            }
          } else if (x.name === "Tasks Download") {
            if (x.status === "active") {
              data.download = true;
            }
          } else if (x.name === "Task Value") {
            if (x.status === "active") {
              data.value = true;
            }
          } else if (x.name === "Estimates $ Invoices") {
            if (x.status === "active") {
              data.inovices = true;
            }
          }
        });

        console.log(data, "mmmmmmmmmmm");
      }
      return data;
    },
    fetchLeadsUserVise(){
      let userId = JSON.parse(localStorage.getItem('userData')).id
      // if(this.showPrivileges().viewAll === false){
      //   this.$store.dispatch('leads/userViseTasks', userId)
      // }else{
        this.$store.dispatch('leads/fetch')
      // }
    },
    showClientViseContact(client_id) {
      let arr = this.$store.state.leads.all;
      let data = []
      arr.forEach((x, i) => {
        if (x.company_id === client_id) {
          if (x.contact_person != null) {

            data.push({
              id: x.contact_person.id,
              name: x.contact_person.name,
              email: x.contact_person.emails[x.contact_person.emails.length - 1].email,
              allEmails: []
            })

            x.contact_person.emails.forEach(y => {
              if (data[i]) {

                data[i].allEmails.push(y.email)
              }
            })
          }
        }
      });
      return data.filter((value, index, self) =>
        index === self.findIndex((t) => (t.name === value.name && t.email === value.email
        )))
    },
    setEditItem(data) {
      console.log(data);
      this.isEditSidebarActive = true;
      this.editItemClient = data
    },

   
    handleChildFunction(x) {
      let sentArray = this.$store.state.leads.all.filter(e => e.company != null ? e.company.name === x : '',)

      // calls the function sent from the child component
      // return sentArray      
      // this.taskInvoiceData =sentArray.filter(e => e.company != null ? e.company.name === x : '',) 
      return sentArray.filter(e => e.company != null ? e.company.name === x : '',)
        
    },
    removes3(url, index) {
      var data = {
        attach_url: url ?? "null",
      };
      this.$store.state.tasks.s3_url.splice(index, 1)
      this.$store.dispatch('tasks/remove_file_s3', { data: data }).then(() => {
        console.log(this.$store.state.tasks.s3_url)
        console.log('removed')
        // if(this.$store.state.tasks.s3_url.includes(filename)){
        //   this.$store.state.tasks.s3_url.splice(this.$store.state.tasks.s3_url[this.$store.state.tasks.s3_url.findIndex(e => e.fileName.includes(filename))],1)
        // }

      }).catch(() => {

        console.log('error')
      })

    },
    resetStateData() {
      const b = this.items
      const c = this.items1

      this.filtercompany = ''
      this.SearchClient = ''
      this.searchContact = ''
      this.filterContact = ''
      return;
      let items = this.$store.state.clients.all;

      if (this.tabsAccess === 0) {
        // return this.$store.state.clients.all;
        // console.log(this.$store.state.clients.all,'checking...........')
      } else if (this.tabsAccess === 1) {

      } else if (this.tabsAccess === 2) {

      }
      if (this.$store.state.invoice.allData.length > 0) {
        let invoice = this.$store.state.invoice.allData;
        let invoices = [];
        items.forEach(x => {
          x.invoiced = 0;
          let result = invoice.filter(y => {
            return y.client.name === x.name
          })
          console.log(result, 'jjjjjjjj')
          invoices = result;
          console.log(invoices, 'ttttttt')
          if (invoices.length > 0) {
            invoices.forEach(z => {
              x.invoiced = x.invoiced + z.amount;
            })
            invoices = []
          }
        })
      }
      if (this.$store.state.recordPayment.allData.length > 0) {
        let payment = this.$store.state.recordPayment.allData;
        let payments = [];
        items.forEach(x => {
          x.paid = 0;
          let result = payment.filter(y => {
            return y.client_id === x.id
          })
          console.log(result, 'bbbbbbbbbbb');
          payments = result;
          if (payments.length > 0) {
            payments.forEach(z => {
              z.counting = 0;
              // x.invoiced = x.invoiced + z.amount;
              if (z.record_pay_invoice.length > 0) {
                z.record_pay_invoice.forEach(v => {
                  z.counting = z.counting + v.paid_amount;
                })
                x.paid = x.paid + z.counting;
              }
            })
            payments = []
          }
        })
      }
      items.forEach(x => {
        x.due = 0
        if (x.invoiced !== 0 && x.paid) {

          x.due = x.invoiced - x.paid;
        }
      })
      console.log(items)
      this.clientData = items
      return
    },
    getAllEmail(item) {
      // alert(item.item.email[0].email)
      var arr = []
      item.item.email.forEach(element => {
        arr.push(element.email)
      });
      return arr.join(',')
    },
    filterWithContact(event) {
      this.currentPage = 1
      let array = this.$store.state.contactPeople.all
      let arr1 = []
      let search_arr1 = []
      if (this.filterContact != null) {
        array.forEach(element => {
          if (element.data.name === this.filterContact) {

            arr1.push(element)

          }
        })
        this.contactNames = arr1

      } else if (this.searchContact != "") {
        const searchTerm = this.searchContact.toLowerCase();
        array.forEach(element => {
          const name = element.data.name.toLowerCase();
          if (name.includes(searchTerm)) {
            search_arr1.push(element)
          }
        })
        this.contactNames = search_arr1
      }
      else {
        this.fetchAllContacts()
      }
    },
    filterWithClient() {
      // this.clientData = this.clientData.filter(e => e.name === this.filtercompany)
      // return;
      let array = this.$store.state.clients.all;
      let arr = []
      let search_arr = []
      if (this.filtercompany != null) {
        array.forEach(element => {
          if (element.name === this.filtercompany) {
            arr.push(element)
          }
        });
        this.clientData = arr
      } else if (this.SearchClient != "") {
        const searchTerm1 = this.SearchClient.toLowerCase();
        array.forEach(element => {
          const name1 = element.name.toLowerCase();
          if (name1.includes(searchTerm1)) {
            search_arr.push(element)
          }
        });
        this.clientData = search_arr
      }
      else {
        this.resetStateData()
      }

    },

    threadedMail() {
      var arr = []
      // if(this.$store.state.emails.all_emails.length === 0){

      // }
      this.$store.state.comments.extraComment.forEach(element => {
        // if(this.taskId)
        // if(element.parent.task_id === id){
        // this.threadedMail = element.childs
        // message_id = element.parent.message_id
        if (element.childs) {

          if (element.childs.length > 0) {
            element.childs.forEach(c => {

              arr.push(c)
            });
          }
          // }

        }
      });
      // this.arr_comment = []
      // this.arr_comment = arr;
      return arr;
    },
    newPaidData(id){
      let payment=this.$store.state.recordPayment.allData
      let filterPayment=[]
      let paidAmount=0
        
        payment.filter(e=>{
          if(e.client_id===id){
            filterPayment.push(e)
            this.filterPaymentAll=filterPayment
          }
        })
      filterPayment.forEach(sum=>{
        paidAmount=paidAmount+sum.counting
        this.paidAmountAll=paidAmount
      })
      return paidAmount
      },
    newInvoiceData(id){
      // console.log(name);
      // console.log(id,"-----------------------------------------------------------")
      let invoices=this.$store.state.invoice.allData
      let allLeads=this.$store.state.leads.all
      let filteredLeads=[]
      let filteredInvoices=[]
      let invoicedAmount=0
      allLeads.filter(e=>{
        if(e.company_id===id){
          filteredLeads.push(e)
          this.filteredLeadsall=filteredLeads
        }
      })

    filteredLeads.filter(a=>{
      invoices.filter(b=>{
        if(a.id===b.task_id){
          filteredInvoices.push(b)
          this.filteredInvoicesAll=filteredInvoices
        }
      })
    })
    filteredInvoices.forEach(total=>{
      invoicedAmount=invoicedAmount+total.total_amt
    })
      
     
          
    return invoicedAmount
      
     
    },
    statusCal(id, type) {
      let items = []//this.$store.state.leads.all//.filter(e => e.type === 'task').concat(this.$store.state.leads.all.filter(e => e.type === 'lead'));
      if(this.Tasksprevileges.viewAll){
        items = this.$store.state.leads.all.filter(e => e.type === 'task');
      
          
      }else if(!this.Tasksprevileges.viewAll){
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {
          items = []

            this.$store.state.leads.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                items.push(a)
              }
            })
          // }
      }
      if(this.Tasksprevileges.LeadsviewAll){
        items = this.$store.state.leads.all.filter(e => e.type === 'lead');
      
          
      }else if(!this.Tasksprevileges.LeadsviewAll){
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {
          items = []
            this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                items.push(a)
              }
            })
          // }
      }
      if(this.Tasksprevileges.LeadsviewAll && this.Tasksprevileges.viewAll){
        items = this.$store.state.leads.all//.filter(e => e.type === 'lead');
      
          
      }else if(!this.Tasksprevileges.LeadsviewAll && !this.Tasksprevileges.LeadsviewAll){
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {
          items = []

            this.$store.state.leads.all//.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                items.push(a)
              }
            })
          // }
      }
      
      let filtered = items.filter(x => {
        return x.company_id === id
      })
      console.log(filtered, 'filtered itemsssssssss');
      let open = 0;
      let completed = 0;
      let closed = 0;
      let invoiced = 0;
      if (type === 'open') {

        open = filtered.filter(e => e.status_master.type === type && e.type).length
      } else if (type === 'completed') {

        completed = filtered.filter(e => e.status_master.type === type && e.type === 'task').length
      } else if (type === 'closed') {
        closed = filtered.filter(e => e.status_master.type === type && e.type === 'task').length
      } else if (type === 'invoiced') {
        invoiced = filtered.filter(e => e.status_master.type === type && e.type === 'task').length
      }

      if (type === 'open') {
        return {
          open: open
        }
      } else if (type === 'completed') {
        return {
          completed: completed
        }
      } else if (type === 'closed') {
        return {
          closed: closed
        }
      } else if (type === 'invoiced') {
        return {
          invoiced: invoiced
        }
      }
      // return {
      //   open: open,
      //   closed: closed,
      //   completed: completed,
      //   invoiced: invoiced
      // }
    },
    deleteItem(id) {
      store
        .dispatch("clients/destroy", id)
        .then(() => {
          this.fetchAll()
          
        })
        .catch(() => {
          refFormObserver.value.setErrors(errors.value);
        });
    },
    getEmailsString(emails) {
      return emails.join(", ")
    },
    editContactPeople(contact) {
      let data = {}
      // editContact = 
      this.$store.dispatch('contactPeople/showAll').then(() => {
        console.log(this.$store.state.contactPeople.all.result, 'aaaaaaa');
        data = this.$store.state.contactPeople.all.filter(x => {
          return x.data.name === contact.name
        })
        console.log(data[0], 'sssssssss')
        this.editContact = data[0];
        this.isEditContactActive = true;
        console.log(this.editContact)
      })
    },
    addAllProposalAmt() {
      var all = this.$store.state.proposals.allProposals
      var total = 0
      all.forEach(element => {
        element.proposal_fees.forEach(e => {
          total = total + e.amount
        })
      });
      this.invoice.amount = total
    },
    showHidePendingFollowups() {
      var y = document.getElementById('desc_pending_followups');
      if (y.style.display === "none") {
        this.pendingIconName = 'ChevronDownIcon'
        y.style.display = "block";
      } else {
        this.pendingIconName = 'ChevronRightIcon'

        y.style.display = "none";
      }
    },
    showHideHistoryFollowups() {
      var z = document.getElementById('desc_history_followups');
      if (z.style.display === "none") {
        this.historyIconName = 'ChevronDownIcon'
        z.style.display = "block";
      } else {
        this.historyIconName = 'ChevronRightIcon'

        z.style.display = "none";
      }
    },
    showHideUpcomingFollowups() {
      var x = document.getElementById('desc_upcoming_followups');




      if (x.style.display === "none") {
        this.upcomingIconName = 'ChevronDownIcon'
        x.style.display = "block";
      } else {
        this.upcomingIconName = 'ChevronRightIcon'

        x.style.display = "none";
      }



    },
    showOrHideTaskAttach() {
      var x = document.getElementById('desc_task_attach');
      if (x.style.display === "none") {
        this.taskIconName = 'ChevronDownIcon'
        x.style.display = "block";
      } else {
        this.taskIconName = 'ChevronRightIcon'

        x.style.display = "none";
      }
    },
    showOrHideClientAttach() {
      var x = document.getElementById('desc_client_attach');
      if (x.style.display === "none") {
        this.clientIconName = 'ChevronDownIcon'
        x.style.display = "block";
      } else {
        this.clientIconName = 'ChevronRightIcon'

        x.style.display = "none";
      }
    },
    pan() {
      if (this.invoice.gstNumber.length === 15) {
        if (isNaN(this.invoice.gstNumber.slice(0, 2) + this.invoice.gstNumber.slice(7, 10) + this.invoice.gstNumber.slice(14, 15)) === false && isNaN(this.invoice.gstNumber.slice(2, 7) + this.invoice.gstNumber.slice(11, 12) + this.invoice.gstNumber.slice(13, 14)) && (9 > +this.invoice.gstNumber.slice(12, 13) > 0 || isNaN(this.invoice.gstNumber.slice(12, 13)))) {
          // this.invoice.pan_number=this.invoice.gstNumber.slice(2,12);
          let states = this.$store.state.branches.states;
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.invoice.gstNumber.slice(0, 2)
          });
          console.log(stateFilter, 'sssss')
          console.log(stateFilter);
          this.invoice.state = stateFilter
          // this.selectedState=stateFilter[0].name;
          this.gsterr = false;
          console.log('noerr')
        }
      }
      else {
        // this.formData.pan_number=''
        this.invoice.state = null
      }
    },
    addInvoice() {
      // console.log(this.invoice);
      const data = {
        id: this.invoice.id,
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
      this.$store.dispatch('invoice/store', data).then(() => {
        this.$store.dispatch('invoice/get', this.taskId)
        this.$store.dispatch('invoice/fetch')
        this.$refs['invoice-modal'].hide()
        this.$toast.success('Invoice Added Successfully!', {
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
      })
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
      this.$store.dispatch('invoice/update', { payload: data, id: this.invoice.editId }).then(() => {
        this.$store.dispatch('invoice/get', this.taskId)
        this.$store.dispatch('invoice/fetch')
        this.$refs['invoice-modal'].hide()
        this.$toast.success('Invoice updated Successfully!', {
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
      })
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
      this.invoice.igst_amt = Number(this.invoice.taxble_amt ?? 0) / 100 * Number(this.invoice.igst ?? 0)
      this.invoice.sgst_amt = Number(this.invoice.taxble_amt ?? 0) / 100 * Number(this.invoice.sgst ?? 0)
      this.invoice.cgst_amt = Number(this.invoice.taxble_amt ?? 0) / 100 * Number(this.invoice.cgst ?? 0)
      this.invoice.utgst_amt = Number(this.invoice.taxble_amt ?? 0) / 100 * Number(this.invoice.utgst ?? 0)

      this.invoice.total_amt = Number(this.invoice.taxble_amt ?? 0) + Number(Number(this.invoice.igst_amt ?? 0) + Number(this.invoice.sgst_amt ?? 0) + Number(this.invoice.cgst_amt ?? 0) + Number(this.invoice.utgst_amt ?? 0))
      this.invoice.sub_total = Number(this.invoice.total_amt ?? 0)
      var adjust = 0;
      if (this.invoice.adjustments != 0) {

        if (this.invoice.adjustments.includes('-')) {
          adjust = Number(this.invoice.adjustments.split('-')[1])
        }
      }
      if (adjust != 0) {

        this.invoice.total = Number(this.invoice.sub_total ?? 0) + Number(Number(this.invoice.pocket_expense ?? 0)) - Number(adjust)

      } else {
        this.invoice.total = Number(this.invoice.sub_total ?? 0) + Number(this.invoice.pocket_expense ?? 0) + Number(this.invoice.adjustments)
      }
      // }
      // this.invoice.taxble_amt = this.invoice.amount - Number(this.invoice.discount)
      // return this.invoice.taxble_amt
    },
    destroyProposal(id) {
      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('proposals/destroy', id).then(() => {
          this.$store.dispatch('proposals/get', this.taskId)
          this.$toast.success('Deleted Successfully!', {
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
        })
      }

    },
    destroyInvoice(id) {
      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('invoice/destroy', id).then(() => {
          this.$store.dispatch('invoice/get', this.taskId)
          this.$toast.success('Deleted Successfully!', {
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
        })
      }

    },
    async exportToPDF(i) {

      const toDataUrl = await function (url, callback) {
        //Convert to base64
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = () => {
            reject({
              status: this.status,
              statusText: xhr.statusText,
            });
          };
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.send();
        });
      };


      // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob()
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            this.base64data = base64data
            resolve(base64data);
          }
        });

      }


      let imagesUrls = [

        "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
        // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      ];
      let pdfContent = "";
      fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
        //                         vvvv
        .then(response => response.blob())
        .then(imageBlob => {
          // Then create a local URL for that image and print it 
          const imageObjectURL = URL.createObjectURL(imageBlob);
          console.log(imageObjectURL);
        });

      let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);


      // lo
      pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById('pdfContent').innerHTML
      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById('pdfContent').innerHTML);
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
      html2pdf().set({
        margin: 0.5,
        filename: 'time_sheet_report.pdf',
        image: { type: 'jpeg', quality: 0.20 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'p' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
        .from(pdfContent)
        .outputPdf()
        .get('pdf')
        .then(function (pdf) {
          // pdf.text('hello',5,5)
          // pdfObj.autoPrint()
          // var total  = pdf.internal.getNumberOfPages();
          // for (let index = 0; index < total.length; index++) {
          //   pdf.setPage(i)          
          //   pdf.text('hello',10,10)
          // }
          // const pdfDoc = new jsPDF('p', 'pt', 'a4');

          //   pdfDoc.setFontSize(12);
          //         const pageCount = pdfDoc.internal.getNumberOfPages();
          //         for(let i = 1; i <= pageCount; i++) {
          //           pdfDoc.setPage(i);
          //           const pageSize = pdfDoc.internal.pageSize;
          //           const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          //           const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          //           const header = 'Report 2014';
          //           const footer = `Page ${i} of ${pageCount}`;

          //           // Header
          //           pdfDoc.text(header, 40, 15, { baseline: 'top' });

          //           // Footer
          //           pdfDoc.text(footer, pageWidth / 2 - (pdfDoc.getTextWidth(footer) / 2), pageHeight - 15, { baseline: 'bottom' });
          //       }
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            pdf.setFontSize(10)
            pdf.setTextColor(150)
            // pdf.addImage( getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg'),'jpeg',0,0)
            // pdf.text(
            //    'Page ' + i + ' of ' + totalPages,
            //     (pdf.internal.pageSize.getWidth() * 0.88),
            //     (pdf.internal.pageSize.getHeight() - 0.3)
            // )

            // pdf.text('This is the header text', (pdf.internal.pageSize.getWidth() / 2.40), (pdf.internal.pageSize.getHeight() - 10));
            // pdf.text('<div>hello</div>', (pdf.internal.pageSize.getWidth() / 16), (pdf.internal.pageSize.getHeight() - 1));


          }
          window.open(pdf.output("bloburl"), "F")
        })

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

      const toDataUrl = await function (url, callback) {
        //Convert to base64
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = () => {
            reject({
              status: this.status,
              statusText: xhr.statusText,
            });
          };
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.send();
        });
      };


      // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob()
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            this.base64data = base64data
            resolve(base64data);
          }
        });

      }

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
      let imagesUrls = [

        "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
        // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      ];
      let pdfContent = "";
      fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
        //                         vvvv
        .then(response => response.blob())
        .then(imageBlob => {
          // Then create a local URL for that image and print it 
          const imageObjectURL = URL.createObjectURL(imageBlob);
          console.log(imageObjectURL);
        });

      let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // lo
      document.getElementById('InvoicepdfContent2').style.fontSize = '12px'
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById('InvoicepdfContent2').innerHTML

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById('InvoicepdfContent2').innerHTML);
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
      html2pdf().set({
        margin: 0.5,
        // fontSize:10,
        filename: 'time_sheet_report.pdf',
        image: { type: 'png', quality: 0.20 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'p' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
        .from(pdfContent)
        .outputPdf()
        .get('pdf')
        .then(function (pdf) {
          // document.getElementsByName()
          // pdf.text('hello',5,5)
          // pdfObj.autoPrint()
          // var total  = pdf.internal.getNumberOfPages();
          // for (let index = 0; index < total.length; index++) {
          //   pdf.setPage(i)          
          //   pdf.text('hello',10,10)
          // }
          // const pdfDoc = new jsPDF('p', 'pt', 'a4');

          //   pdfDoc.setFontSize(12);
          //         const pageCount = pdfDoc.internal.getNumberOfPages();
          //         for(let i = 1; i <= pageCount; i++) {
          //           pdfDoc.setPage(i);
          //           const pageSize = pdfDoc.internal.pageSize;
          //           const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          //           const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          //           const header = 'Report 2014';
          //           const footer = `Page ${i} of ${pageCount}`;

          //           // Header
          //           pdfDoc.text(header, 40, 15, { baseline: 'top' });

          //           // Footer
          //           pdfDoc.text(footer, pageWidth / 2 - (pdfDoc.getTextWidth(footer) / 2), pageHeight - 15, { baseline: 'bottom' });
          //       }
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            pdf.setFontSize(10)
            pdf.setTextColor(150)
            // pdf.addImage( getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg'),'jpeg',0,0)
            // pdf.text(
            //    'Page ' + i + ' of ' + totalPages,
            //     (pdf.internal.pageSize.getWidth() * 0.88),
            //     (pdf.internal.pageSize.getHeight() - 0.3)
            // )

            // pdf.text('This is the header text', (pdf.internal.pageSize.getWidth() / 2.40), (pdf.internal.pageSize.getHeight() - 10));
            // pdf.text('<div>hello</div>', (pdf.internal.pageSize.getWidth() / 16), (pdf.internal.pageSize.getHeight() - 1));


          }
          window.open(pdf.output("bloburl"), "F")
        })

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

      const toDataUrl = await function (url, callback) {
        //Convert to base64
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = () => {
            reject({
              status: this.status,
              statusText: xhr.statusText,
            });
          };
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.send();
        });
      };


      // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob()
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            this.base64data = base64data
            resolve(base64data);
          }
        });

      }

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
      let imagesUrls = [

        "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
        // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      ];
      let pdfContent = "";
      fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
        //                         vvvv
        .then(response => response.blob())
        .then(imageBlob => {
          // Then create a local URL for that image and print it 
          const imageObjectURL = URL.createObjectURL(imageBlob);
          console.log(imageObjectURL);
        });

      let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // lo
      document.getElementById('PaymentpdfContent').style.fontSize = '12px'
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById('PaymentpdfContent').innerHTML

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById('PaymentpdfContent').innerHTML);
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
      html2pdf().set({
        margin: 0.5,
        // fontSize:10,
        filename: 'time_sheet_report.pdf',
        image: { type: 'png', quality: 0.20 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'p' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
        .from(pdfContent)
        .outputPdf()
        .get('pdf')
        .then(function (pdf) {
          // document.getElementsByName()
          // pdf.text('hello',5,5)
          // pdfObj.autoPrint()
          // var total  = pdf.internal.getNumberOfPages();
          // for (let index = 0; index < total.length; index++) {
          //   pdf.setPage(i)          
          //   pdf.text('hello',10,10)
          // }
          // const pdfDoc = new jsPDF('p', 'pt', 'a4');

          //   pdfDoc.setFontSize(12);
          //         const pageCount = pdfDoc.internal.getNumberOfPages();
          //         for(let i = 1; i <= pageCount; i++) {
          //           pdfDoc.setPage(i);
          //           const pageSize = pdfDoc.internal.pageSize;
          //           const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          //           const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          //           const header = 'Report 2014';
          //           const footer = `Page ${i} of ${pageCount}`;

          //           // Header
          //           pdfDoc.text(header, 40, 15, { baseline: 'top' });

          //           // Footer
          //           pdfDoc.text(footer, pageWidth / 2 - (pdfDoc.getTextWidth(footer) / 2), pageHeight - 15, { baseline: 'bottom' });
          //       }
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            pdf.setFontSize(10)
            pdf.setTextColor(150)
            // pdf.addImage( getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg'),'jpeg',0,0)
            // pdf.text(
            //    'Page ' + i + ' of ' + totalPages,
            //     (pdf.internal.pageSize.getWidth() * 0.88),
            //     (pdf.internal.pageSize.getHeight() - 0.3)
            // )

            // pdf.text('This is the header text', (pdf.internal.pageSize.getWidth() / 2.40), (pdf.internal.pageSize.getHeight() - 10));
            // pdf.text('<div>hello</div>', (pdf.internal.pageSize.getWidth() / 16), (pdf.internal.pageSize.getHeight() - 1));


          }
          window.open(pdf.output("bloburl"), "F")
        })

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
    getPL(date, id) {
      var dates = new Date(date);
      if (id < 10) {

        var p_date = 'PL-0' + id + '-' + dates.getFullYear()
      } else {
        var p_date = 'PL-' + id + '-' + dates.getFullYear()

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
      var noon = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;

      var maketime = hours + ':' + minutes + noon;
      var date = new Date(date).toDateString();
      var fullyear = new Date(date).getFullYear();
      var today = new Date().toDateString();
      console.log(today);
      if (date == today) {
        return 'today ,' + maketime
      } else {

        return date//.split(fullyear)[0] //+ ','+ maketime;
        // return date + ','+ maketime;

      }
    },
    getCommentUser(comments, users) {
      let latest_index = comments.length - 1;
      var string = ''
      if (latest_index !== -1) {
        // console.log(comments[latest_index]);
        var user_id = comments[latest_index].user_id
        var username = '~ ';
        users.forEach(element => {
          if (element.id === user_id) {
            username = username + element.name
          }

        });
        username = username + ', ' + this.timeFormat(comments[latest_index].created_at)
        // string = comment


        // console.log(latest_index);
        return username//.substring(0,22)
      }
    },
    getLatestComment(comments) {
      let latest_index = comments.length - 1;
      var string = ''

      if (latest_index !== -1) {
        var comment = comments[latest_index].comment
        string = comment


        console.log(latest_index);
        return string;
      }
    }, validNumber(e) {
      let stringValue = e.target.value.toString()
      let regex = /^\d*(\.\d{1,2})?$/
      if (!stringValue.match(regex) && this.price !== '') {
        this.invoice.total_amt = this.previousPrice
      }
      this.previousPrice = this.invoice.total_amt
    },
    getStateCode(data) {
      console.log(data);
      this.invoice.state_code = Number(data.fips_code)
    }, convert(str) {
      var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

      var tens = [''];

      tens[1] = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

      tens = tens.concat(['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']);

      var getHundreds = function (value) {
        return value > 0 ? ones[value] + " hundred" : '';
      };

      var getTens = function (value, next, words, index, pos) {
        if (value == 1) {
          words.push(tens[1][next]);

          if (pos == 5) {
            words.push(' thousand');
          }
          if (pos == 8) {
            words.push(' million');
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
            words.push(ones[num] + ' million'); break;
          // For Thousands
          case 4:
            words.push(ones[num] + ' thousand'); break;
          // For Hundreds
          case 9:
          case 6:
          case 3:
            words.push(getHundreds(num)); break;
          // For Tens and Teens
          case 8:
          case 5:
          case 2:
            i = getTens(num, str[i + 1], words, i, pos); break;
          case 1:
            words.push(ones[num]); break;
        }
      }
      return words.join(' ');
    },
    updatePayment() {
      var invoice_tds = []
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        invoice_tds.push({
          invoice_id: this.payment.payment[index].invoice_id,
          tds_deducted: this.payment.payment[index].tds,
          paid_amount: this.payment.payment[index].amount
        });

      }
      var branch_id = 0;
      this.$store.state.branches.all.forEach(element => {
        if (element.name == this.payment.branch) {
          branch_id = element.id
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
        invoice: invoice_tds
      }
      console.log(data, this.payment.edit_id);
    },
    seteditPayment(index) {
      var amount = 0;
      this.payment.payment.forEach(element => {
        if (element.invoice_id === index) {
          amount = element.amount
        }
      });
      return amount;
      // return this.payment.payment[index].amount
    },
    setedittds(index) {
      var tds = 0;
      this.payment.payment.forEach(element => {
        if (element.invoice_id === index) {
          tds = element.tds
        }
      });
      // return this.payment.payment[index].tds
      return tds;
    },
    getFinalPayment(invoice_id, record_pay_invoice) {
      var amount = 0;
      record_pay_invoice.forEach(element => {
        if (element.invoice_id === invoice_id) {
          amount = element.paid_amount
        }
      });
      return amount;
    },
    getTdsForPayment(invoice_id, record_pay_invoice) {
      var tds = 0;
      record_pay_invoice.forEach(element => {
        if (element.invoice_id === invoice_id) {
          tds = element.tds_deducted
        }
      });
      return tds;
    },
    getPaymentClient(client_id) {
      var name = ''
      if (client_id) {

        this.show_companys.forEach(element => {
          if (element.id === client_id) {
            name = element.name
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
      var invoice_tds = []
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        if (this.payment.payment[index].amount != 0) {

          invoice_tds.push({
            invoice_id: this.payment.payment[index].invoice_id,
            tds_deducted: this.payment.payment[index].tds,
            paid_amount: this.payment.payment[index].amount
          });
        }

      }
      var branch_id = 0;
      this.$store.state.branches.all.forEach(element => {
        if (element.name == this.payment.branch) {
          branch_id = element.id
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
        invoice: invoice_tds
      }
      console.log(data);
      this.$store.dispatch('recordPayment/store', data).then(() => {
        this.$store.dispatch('recordPayment/get', this.taskId)
        this.$refs['payment-modal'].hide()
        this.$toast.success(' Successfully!', {
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
      })
    },
    getExcess() {
      // if(this.payment.amount > Number(this.getTotalAmt(this.payment.payment) ))// ?  payment.amount - Number(getTotalAmt(this.payment.payment) )  : 0}}
      //             {
      //               return this.payment.amount - Number(this.getTotalAmt(this.payment.payment) )
      //             }else 
      // if(this.payment.amount < Number(this.getTotalAmt(this.payment.payment) ))
      // if(this.payment.amount != 0)

      // {
      return this.payment.amount - Number(this.getTotalAmt(this.payment.payment))

      // }else{
      //   return 0
      // }
    },
    // addPayment(){
    setPayment(index, e) {
      console.log([index, e]);
      this.payment.payment.forEach(element => {
        if (element.invoice_id == index) {
          element.amount = Number(e)
        }
      });
      // this.payment.payment[index].amount = Number(e)

    },
    setTds(index, e) {
      console.log([index, e]);
      this.payment.payment.forEach(element => {
        if (element.invoice_id === index) {
          element.tds = Number(e)
          if (element.tds != 0) {

            element.amount = element.amount - element.tds
          }
        }
      });
      // this.payment.payment[index].tds = Number(e)
      // this.payment.payment[index].amount = this.payment.payment[index].amount - this.payment.payment[index].tds

    },
    // },
    getinvoiceBranch(task_id) {
      var task = []
      var name = ''
      if (this.$router.currentRoute.name == 'tasks') {

        task = this.$store.state.tasks.all.filter(e => e.type === 'task');
      } else {
        task = this.$store.state.leads.all.filter(e => e.type === 'lead');
      }
      task.forEach(element => {
        if (element.id === task_id) {
          name = element.branch.name
        }
      });
      return name;
    },
    getinvoiceDate(date) {
      var d = new Date(date)
      const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      var date_no = d.getDate()
      var month = ms[d.getMonth()]
      var year = d.getFullYear()
      return date_no + ' ' + month + ' ' + year;
    },
    getLargestId() {
      var invoice = this.$store.state.invoice.allData
      var array = []
      if (invoice.length > 0) {

        invoice.forEach(element => {
          array.push(element.id)
        });
        this.invoice.id = Math.max(...array) + 1
        // return Math.max(...array) + 1
      } else {
        // return 1;
        this.invoice.id = 1
      }
      console.log(this.invoice.id);
    },
    getSubTotal(invoice) {
      let total = invoice.sub_total - invoice.pocket_expenses
      let t = 0
      if (invoice.adjustment_amt > 0) {
        t = total - invoice.adjustment_amt
        console.log('positive');
      } else {
        t = total + invoice.adjustment_amt
        console.log("negative");
      }
      return t;
    },
    addProposal() {
      // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // const now = new Date(this.pdate);
      // this.pdate=now.getDate() + ' ' + months[now.getMonth()] + ' ' +  + now.getFullYear();
      // this.proposals.push({activity: 'Proposal', date: this.pdate, amount: this.pamount, name: this.pname, address: this.paddress, subject: this.psubject, pphrase: this.pphrase, pperson: this.pperson, pfootertitle: this.pfootertitle, pfooterdesc: this.pfooterdesc});
      this.$refs['proposal-modal'].hide();
      let arr = [];
      this.proposalFields.forEach((data) => {
        arr.push({
          title: data.title,
          description: data.desc
        })
      })
      // this.pdate=this.currentDate;
      let data = {
        task_id: this.taskId,
        proposal_date: this.pdate,
        client_name: this.pname,
        concerned_person: this.pperson,
        address: this.paddress,
        subject: this.psubject,
        prephase: this.pphrase,
        footer_title: this.pfootertitle,
        footer_description: this.pfooterdesc,
        internal_notes: this.pnotes,
        proposalSection: arr,
        proposalFees: this.amountField
      }
      this.$store.dispatch('proposals/create', data).then(() => {
        this.$store.dispatch('proposals/get', this.taskId).then(() => {
          console.log(this.allProposals)
          this.$toast.success(' Successfully!', {
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

        })
      })
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

      var arr = []
      this.proposalFields.forEach(element => {
        arr.push({
          title: element.title,
          description: element.desc
        })
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
        proposalFees: this.amountField





      }
      console.log(data);
      this.$store.dispatch('proposals/proposal_update', {
        payload: data, id: this.proposal_edit_id
      }).then(() => {
        this.$refs['proposal-edit-modal'].hide();
        this.$store.dispatch('proposals/get', this.taskId).then(() => {

        })
        console.log(this.proposals.map(e => e.total));
      })
    },
    addTodo(id) {
      if (this.default_todo.length === 0) {
        return;
      }
      // });
      var c_todo = [];
      if (this.default_todo.length > 0) {

        this.default_todo.forEach(element => {
          c_todo.push(element)
        });
      }
      if (this.additional_todo.length > 0) {

        this.additional_todo.forEach(element => {
          c_todo.push(element)
        });
      }
      const data = {
        to_do: c_todo,
        task_id: id,
        user_ids: this.subtask_mentions
      }
      this.$store.dispatch('appTodo/store', data).then(() => {
        this.$store.dispatch('appTodo/fetch')
        this.$toast.success(' Successfully!', {
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
      })
      if (this.additional_todo.length > 1) {

        while (this.additional_todo.length > 0) {
          this.additional_todo.pop()

        }
      }

    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },

    onApply(item, key, replacedWith) {

      this.subtask_mentions.push({ id: item.id, name: item.name })
      console.log(item, `has been replaced with ${replacedWith}`)
    },

    parseHtml(item) {
      // return item;
      var text = item.replace(/(<([^>]+)>)/gi, '');
      this.text = text;
      this.text = this.text.substr(0, 400)
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
        subtask_assignee: null
      })
      // console.log(this.inputs)
    },
    addAmount() {
      this.amountField.push({
        description: "",
        amount: null
      })
      // console.log(this.inputs)
    },
    addProposalField() {
      this.proposalFields.push({
        title: "",
        description: ""
      })
      // console.log(this.inputs)
    },
    remove(index) {
      this.inputs.splice(index, 1)
    },
    removeAmount(index) {
      this.amountField.splice(index, 1)
    },
    removeProposal(index) {
      this.proposalFields.splice(index, 1)
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes('@')) {

        this.search = assignee.split('@')[1]
      }
      else if (!assignee.includes('@')) {

      }
      else {
        this.search = ""
      }
    },
    openModal(modal, task) {
      // if(mod)

      if (modal.includes("_")) {

        this.$refs[modal.split("_")[0]].show()
        // this.task
        this.proposal_edit_id = modal.split("_")[2]
      } else {
        this.$refs[modal].show()
      }
      if (task) {
        this.todo_subtask = task.to_do
        this.todo_id_subtask = task.id
        this.task_id_subtask = task.task_id
        // if(document.getElementById('subtask_todo'))
        // document.getElementById('subtask_todo').value = task.to_do
      }
    },
    SetColor(id) {
      if (id === 1) {
        return '#9e9e9e'
      }
      else if (id === 2) {
        return '#607d8b'
      }
      else if (id === 3) {
        return '#ffe821'
      }
      else if (id === 4) {
        return '#ff9800'
      }
      else if (id === 5) {
        return '#e91e63'
      } else {
        return '#fff'
      }

    },
    SetText(id) {


      if (id === 1) {
        return '  Lowest'
      }
      else if (id === 2) {
        return '  Low'
      }
      else if (id === 3) {
        return '  Medium'
      }
      else if (id === 4) {
        return '  High'
      }
      else if (id === 5) {
        return '  Highest'
      } else {
        return '-'
      }

    },
    SelectItem(item) {
      // item.toggleDetails
      this.selected_item = item
      this.$set(this.selected_item)
    },
    open_datepicker() {
      if (document.getElementById('open_datepicker2').click) {
        document.getElementById('open_datepicker2').style.display = 'block'
      }
      // console.log(document.getElementById('open_datepicker2'))
    },

    inline_due_date(due_date, task_id) {
      var t = 'info';
      if (due_date == '') {
        this.closed()
      }
      if (due_date != '') {

        var date = {
          due_date: due_date,
          task_id: task_id
        };
        this.$store.dispatch('leads/inline_update', { date }).then(() => {
          if (this.successMessage) {

            this.$toast.success(this.successMessage, {
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
              rtl: false
            })
          }

        })
      }

      this.startDate2 = ''
    },
    inline_user_update(user_id, task_id) {
      var t = 'info';

      var user_data = {
        user_id: user_id,
        task_id: task_id
      };
      this.$store.dispatch('leads/inline_update', { user_data }).then(() => {
        if (this.successMessage) {
          // this.$refs.snackbar[t](this.successMessage)
          this.$toast.success(this.successMessage, {
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
            rtl: false
          })
        }
      })
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

        this.inline_due_date(due_date, task_id)
      }
      this.startDate2 = ''
    },
    closed() {
      this.isCloseable = true;

      this.$refs.dropdown.hide();
    },
    inlineUpdate(ev, type, index, priority, task_id) {
      // console.log(444);
      var t = 'info';
      priority = index
      var data = {
        id: index,
        task_id: task_id
      }
      this.$store.dispatch('leads/inline_update', { data }).then(() => {
        // if (this.$store.state.leads.isLoadingLeads == true) {
        // this.$refs.snackbar[t](this.successMessage)
        this.$toast.success(this.successMessage, {
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
          rtl: false
        })
        // }
      })
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
      this.search = query
      this.offset = 0
    },
    editLead(index) {
      // this.a = index;
      // editLead = index
      router.push('leads/' + index)
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
      this.filterCategory = ''
      this.filterContact = ''
      this.filterSearch = ''
      this.filterStatus = ''
      this.filterUsers = ''
      this.filtercompany = ''
      this.FilterPriority = ''
      this.filterBranch = ''
      this.SearchClient = ''
      this.searchContact = ''
      this.resetStateData()
      // const b = this.
      // this.fetchAll()
      // this.fetchAllContacts()
    },

    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick()
        this.observer.observe(this.$refs.load)
      }
    },
    onClose() {
      this.observer.disconnect()
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.limit += 10
        await this.$nextTick()
        ul.scrollTop = scrollTop
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
      this.isFilterActive = !this.isFilterActive

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
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end
      const diffInMs = new Date(endDate) - new Date()
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24)
      diffInDays = Math.round(diffInDays);
      // eslint-disable-next-line no-bitwise
      return diffInDays | 0
    },
    // convertToTask() {
    //   const task = {
    //     type: 'task',
    //   }
    //   console.log(task)
    // },
    destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('leads/destroy', id).then(() => {
          
          this.fetchAll()
        })
      }
    },
    priorityVariant(priority) {
      if (priority === 1) {
        return 'secondary'
      } if (priority === 2) {
        return 'warning'
      } if (priority === 3) {
        return 'info'
      } if (priority === 4) {
        return 'danger'
      }
      if (priority === 5) {
        return 'success'
      }
      return ''

      // return priority === 1 ? 'secondary'
      //   // eslint-disable-next-line no-nested-ternary
      //   : priority === 2 ? 'warning'
      //     // eslint-disable-next-line no-nested-ternary
      //     : priority === 3 ? 'info'
      //       : priority === 4 ? 'danger' : ''
    },
    formatDate(date) {
      const dates = new Date(date)

      const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${dates.getDate()} ${ms[dates.getMonth()]} ${dates.getFullYear()}`
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end
      const diffInMs = new Date(endDate) - new Date()
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24)
      diffInDays = Math.round(diffInDays);
      // eslint-disable-next-line no-bitwise
      return diffInDays | 0
    },
    SetColor(id) {
      if (id === 1) {
        return '#9e9e9e'
      }
      else if (id === 2) {
        return '#607d8b'
      }
      else if (id === 3) {
        return '#ffe821'
      }
      else if (id === 4) {
        return '#ff9800'
      }
      else if (id === 5) {
        return '#e91e63'
      } else {
        return '#fff'
      }

    },
    SetText(id) {


      if (id === 1) {
        return '  Lowest'
      }
      else if (id === 2) {
        return '  Low'
      }
      else if (id === 3) {
        return '  Medium'
      }
      else if (id === 4) {
        return '  High'
      }
      else if (id === 5) {
        return '  Highest'
      } else {
        return '-'
      }

    },
    getTotalInvoice() {
      var data = this.$store.state.invoice.all;
      var total = 0;
      data.forEach(element => {
        total = total + element.total_amt
      });
      return total
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.limit += 10
        await this.$nextTick()
        ul.scrollTop = scrollTop
      }
    },
    autofillClient() {
      var data = [];
      for (let index = 0; index < this.$store.state.clients.all.length; index++) {
        data[index] = this.$store.state.clients.all[index].name;
      };

      var filtered = '';
      if (this.pclient != null) {

        filtered = data.filter((data) => data === this.pclient.name)
      }
      if (filtered.length > 0) {
        console.log(filtered);
        //this.pclientName='Centrik'//filtered2[0].replace(/['"]+/g, '');
        this.pname = filtered[0].replace(/['"]+/g, '');

      }
    },
    autofillContact() {
      var data = [];
      for (let index = 0; index < this.$store.state.contactPeople.allForLeads.length; index++) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name;
      }
      var filtered = [];
      if (this.pcontact != null) {

        filtered = data.filter((data) => data === this.pcontact.name)
      }
      if (filtered.length > 0) {

        this.pperson = filtered[0].replace(/['"]+/g, '');
      }
    },
    shortText() {

      if (this.textLength) {
        let newText = this.text.substring(0);
        return newText;
      } else {
        /*let newText = this.lorem.substring(0,50) + `...`;*/
        let newText = this.text.substring(0, 400);
        return newText;
      }
    },
    getAssigneeString(users) {

      var user = []
      users.forEach(element => {
        user.push(element.name)
      });
      return user.join()//.substring(0,28);
    },
    timeFormat(date) {
      var hours = new Date(date).getHours();
      var minutes = new Date(date).getMinutes();
      var noon = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;

      var maketime = hours + ':' + minutes + noon;
      var date = new Date(date).toDateString();
      var fullyear = new Date(date).getFullYear();
      var today = new Date().toDateString();
      console.log(today);
      if (date == today) {
        return 'today ,' + maketime
      } else {

        return date//.split(fullyear)[0] //+ ','+ maketime;
        // return date + ','+ maketime;

      }
    },
    getCommentUser(comments, users) {
      let latest_index = comments.length - 1;
      var string = ''
      if (latest_index !== -1) {
        // console.log(comments[latest_index]);
        var user_id = comments[latest_index].user_id
        var username = '~ ';
        users.forEach(element => {
          if (element.id === user_id) {
            username = username + element.name
          }

        });
        username = username + ', ' + this.timeFormat(comments[latest_index].created_at)
        // string = comment


        // console.log(latest_index);
        return username//.substring(0,22)
      }
    },
    getLatestComment(comments) {
      let latest_index = comments.length - 1;
      var string = ''

      if (latest_index !== -1) {
        var comment = comments[latest_index].comment
        string = comment


        console.log(latest_index);
        return string;
      }
    },
    buttonVariant(status) {
      if (status == 'open') {
        return 'primary';
      } else if (status == 'completed') {
        return 'success';
      } else if (status == 'invoiced') {
        return 'warning';
      }
      else if (status == 'closed') {
        return 'secondary';
      } else {
        return 'warning';
      }
    },
    UpdateProfile(e) {
      this.loading = true
      this.file = e.target.files[0];
      var file = e.target.files[0]
      var file_name = file.name
      this.file_name = file_name
      var file_type = file.type;
      // var base64 = ''
      const reader = new FileReader();
      reader.onload = (e) => {
        // this.image = e.target.result
        this.previewImage = e.target.result;
        this.base64 = e.target.result
        // this.previewImage = e.target.result
        // this.$refs['refPreviewEl'].src = e.target.result
        // this.$refs['refPreviewEl'].value = e.target.result
        this.$store.dispatch('tasks/upload_file_s3', {
          data: {
            attach: [{

              file: this.base64,
              name: this.file_name
            }

            ]
          }
        }).then(() => {
          this.$store.state.tasks.s3_url.forEach(element => {
            if (element.fileName == this.file_name) {
              // url = element.url
              this.submit(element.url)
            }
          });
          // this.$store.dispatch()
        })

      }
      // const element = array[index];


      var base = reader.readAsDataURL(file)
      // console.log(file);

      var url = ''

      if (url != '') {



      }
      e.target.value = ''

    },
    onRowClickedLeads(it) {
      console.log(it, 'ssssssssssssssssssssssssssssssssssssssssss');
      const { detailsRowLeads } = this
      if (detailsRowLeads && detailsRowLeads !== it) {
        detailsRowLeads._showDetails = false;
      }

      this.$set(it, '_showDetails', !it._showDetails
      )
      this.detailsRowLeads = it;
      console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
    },
    onRowClicked(item) {
      console.log(item,"zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails )
      this.detailsRow=item;
      // this.showShimmer = true
      // setTimeout(() => {
      //   this.showShimmer = false
      // }, 2000);
      // this.detailsRow = item;
      // this.clientId = item.id
      // this.filterTasks(item.name)
    },
    onTaskClicked(item) {
      const { detailsRowTask } = this
      if (detailsRowTask && detailsRowTask !== item) {
        detailsRowTask._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails
      )
      this.detailsRowTask = item;
      if (item.subject.includes('Re:')) {

        this.replySubject = item.subject
      } if (!item.subject.includes('Re:')) {
        this.replySubject = 're: ' + item.subject

      }
      this.$store.dispatch('proposals/get', item.id).then(() => {
        console.log(this.allProposals)
      })
      this.$store.dispatch('comments/getMailComment', item.id).then(() => {

      })
      this.$store.dispatch('invoice/get', item.id).then(() => {
        // console.log(this.allProposals)
      })
      this.$store.dispatch('recordPayment/get', item.id)

      this.text = item.description.replace(/(<([^>]+)>)/gi, '')

    },
    onRowClickedProposal(i) {
      const { detailsRowProposal } = this
      if (detailsRowProposal && detailsRowProposal !== i) {
        detailsRowProposal._showDetails = false;
      }

      this.$set(i, '_showDetails', !i._showDetails
      )
      console.log(i);
      if (i.title == 'invoice') {

        this.invoice.editId = i.id
      } else if (i.title == 'payment') {
        this.payment.edit_id = i.id
      }
      else {
        this.proposal_edit_id = i.id
      }
      this.detailsRowProposal = i;

    },
    onTimeClicked(item) {
      const { detailsRowTime } = this
      if (detailsRowTime && detailsRowTime !== item) {
        detailsRowTime._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails
      )
      this.detailsRowTime = item;
    },
    fetchAllContacts() {
      if (this.$router.currentRoute.params.status) {
        this.$store.dispatch('contactPeople/get', this.$router.currentRoute.params.contact_id)

      } else {

        this.$store.dispatch('contactPeople/showAll')
      }
      // this.$store.dispatch('contactPersonEmails/fetch', 1)
    },
    fetchEmails() {
      console.log(this.$store.state.contactPeople.all)

    },
    destroyContact(id) {

      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('contactPeople/destroy', id).then(() => {
          this.$toast.success('Deleted Successfully!', {
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
          this.fetchAllContacts()
          this.$store.dispatch('contactPeople/fetchForLeads')
          // const b = this.paginated_contactPerson
        })
      }
    },
    fetchAll() {
      if (this.$router.currentRoute.params.status) {

        this.$store.dispatch("clients/get", this.$router.currentRoute.params.client_id);
       

      } else {

        this.$store.dispatch("clients/fetch");
        
      }
    },
    destroyItem(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("clients/destroy", id).then(() => {
          this.fetchAll();
        });
      }
    },
    filterTasks(value) {
      this.$store.dispatch('tasks/filter', {
        company: value
      })
      this.$store.dispatch('leads/filter', {
        company: value
      })
    }
  },
  created() {

    let loggedIn = isUserLoggedIn();
    if (loggedIn) {
      
      this.$store.dispatch('invoice/fetch')

      this.$store.dispatch('branches/states')
      this.$store.dispatch('branches/business')
      this.showPrivileges()
      // this.$store.dispatch('allUsers/fetch')
      // this.$store.dispatch('appTodo/fetch');
      // if (this.$store.state.leads.all.length === 0) {

        // this.$store.dispatch('leads/fetch')
        this.fetchLeadsUserVise()
      // }
      // if (this.$store.state.tasks.all.length === 0) {

      //   this.$store.dispatch('tasks/fetch')
      // }
      this.$store.dispatch('recordPayment/fetch').then(() => {
        console.log(this.$store.state.recordPayment.allData, 'payment');
      })
      this.fetchAll()
      // this.newInvoiceData()
      this.$store.dispatch('proposals/fetch')
      if (this.$store.state.branches.states.length === 0) {

        // this.$store.dispatch('branches/states')
      }
      if (this.$store.state.branches.businessTypes.length === 0) {

        // this.$store.dispatch("branches/states")
        // this.$store.dispatch("branches/business")
      }
      this.$store.dispatch('branches/fetch')
      // this.$store.dispatch('clients/fetch')
      this.$store.dispatch('contactPeople/showAll')
      // this.$store.dispatch('contactPeople/fetch')

      this.$store.dispatch('categories/fetch')
      this.$store.dispatch('status/fetch')
    }
    // this.$store.dispatch('comments/fetch');
    this.observer = new IntersectionObserver(this.infiniteScroll)
    // const toast = useToast();
    // toast.success('you did it');

  },
  beforeUpdate() {
    // const b = this.items
    // this.updateItems()
    this.showPrivileges()

    if (this.$router.currentRoute.params.tab === 'contacts') {
      this.tabsAccess = 3
    }
    var invoice = this.$store.state.invoice.all;
    // invoice.forEach(element => {
    //   this.payment.payment.push({amount:null})
    // });
    if (invoice.length > 0) {

    }
    this.prefixPlusid = this.invoice.prefix + this.invoice.id
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
    // this.updateItems()
    // const b = this.items
    // this.  ()
    this.autofillClient()
    // this.getTaxbleAmt()
    var t = 'info';
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
  beforeDestroy() {
    // window.removeEventListener('click', this.closed())
  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const isTaskEditSidebarActive = ref(false);

    const isEditContactActive = ref(false);
    const editItem = ref({});
    const editTask = ref({});

    const editContact = ref({});
    const editItemClient = ref({});
    const isFilterActive = ref(false)
    const isSearchMessagesActive = ref(false);
    const ClientisEditSidebarActive = ref(false);
    // const totalCount = ref(store.state.emails.all.length)
    let statusOptions = ['Open', 'Completed', 'Invoiced', 'Closed']

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetForm);
    // const editLead = ref({})
    const perPage = ref(50)
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    // const toast = useToast();
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }
    const updateTaskIsCompleted = taskData => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted
      updateTask(taskData)
    }
    const updateTask = taskData => {
      store.dispatch('appTodo/update', { payload: taskData, id: taskData.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          store.dispatch('appTodo/fetch')
        })
    }
    return {
      // Sidebar
      isCreateSidebarActive,
      isEditSidebarActive, perPage, currentPage, perPageOptions, isEditContactActive,
      editItem,
      editContact, editTask,
      editItemClient,
      ClientisEditSidebarActive,
      perfectScrollbarSettings, isTaskEditSidebarActive,
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
<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

// @import 'bootstrap-vue/src/icons.scss';
//  @import '@/assets/scss/vendors/bootstrap-vue/_custom';
// @import '@/assets/scss/vendors/bootstrap-vue/index' ;
</style>
<style>
.border-l {
  border: 1px solid rgb(212, 212, 212);
}
</style>
 <!--  <b-table responsive :items="items" :fields="fields" class="mb-0">
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
