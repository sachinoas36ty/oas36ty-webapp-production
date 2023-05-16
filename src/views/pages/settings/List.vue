

<template>
    <div id="settings">
        {{ setOrgName }}
        {{ setOffice }}

        <!-- <div v-if="spinner===true" class="shimmer position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
              <b-spinner></b-spinner>
            </div>
            
        <div> -->
            <div class="block-header" style="margin-bottom: 12px;
    min-height: 60px;">

            <div class="row" style="        background: #fff;
                margin: 0;">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="h-left clearfix">
                        <div class="card">
                            <div class="header">
                                <h2 class="text-uppercase text-20-black d-inline">
                                    Settings
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center p-5" v-if="$store.state.designation.all.length === 0">
            <b-spinner >
            </b-spinner>
            
        </div>
        <div class="container-fluid" v-if="$store.state.designation.all.length > 0">
            <div class="body">
    
                <b-tabs style="" v-model="tabsAccess">
                    <b-tab v-if="setPrivileges.org" active id="org_update">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                organisation
                            </span>
                        </template>
                        <!-- <div id="org_update" class="d-block"> -->
                        <!-- <div class="card"> -->
    
                        <b-card no-body class="org_update_start mt-3 p-1">
    
                            <div class="header">
                                <h2 class="text-uppercase">
                                    organisation
                                </h2>
                            </div>
                            <div class="body mt-1" style="border-top:2px solid #F75949">
                                <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
                                    <b-form @submit.prevent="handleSubmit(updateOrg)" id="org_update_form" style="margin-top:2.5rem;">
                                        <div class="row mt-0">
                                            <div class="col-sm-4">
                                                <validation-provider #default="validationContext" rules="required" vid="name">
                                                    <div class="form-group">
                                                        <label class="form-label">Name </label>
                                                        <div class="form-line focused"><input v-model="OrgName" type="text" placeholder="" id="name" name="name" class="form-control"> </div>
                                                        <b-form-invalid-feedback class="d-block" v-if="validationContext.errors.length > 0">
                                                            The name field is required
                                                        </b-form-invalid-feedback>
                                                    </div>
                                                </validation-provider>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="form-label">Oas36ty Domain</label>
                                                <div class="input-group form-group">
    
                                                    <div class="form-line focused" style="width:75%"><input type="text" readonly="readonly" 
                                                        v-model="subdomain"
                                                        placeholder="Oas36ty Domain" data-toggle="tooltip" data-placement="top" title="" data-original-title="Oas36ty Domain Cannot be Changed" class="form-control"> </div> <span class="input-group-addon">.oas36ty.com</span>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label class="form-label">Oas36ty Email</label>
                                                    <div class="form-line focused"><input readonly="readonly" type="text" placeholder="" name="email" 
                                                        v-model="org_email"
                                                        data-toggle="tooltip" data-placement="top" title="" data-original-title="Oas36ty Email Cannot be Changed" class="form-control"> </div>
                                                </div>
                                            </div> <!---->
                                            <div class="col-sm-12 text-right m-0"><!---->  <b-button size="sm" type="submit"
                                                    variant="primary">Save
                                                    Changes</b-button></div>
                                        </div>
                                    </b-form>
                                </validation-observer>
                            </div>
                        </b-card>
                    <b-tabs>
                        <b-tab active id="branches-tab">
                            <template #title>
                                {{ 'BRANCHES' }}
                            </template>
                            <b-card no-body class="branches_start mt-3 p-1">
                            <div class="header d-flex justify-content-between">
                                <div style="margin-top:0.5rem;">
    
                                    <h2 class="text-uppercase">
                                        branches
                                    </h2>
                                </div>
                                 <b-button size="sm" v-b-modal.modal-branches   variant="primary">
                                    <span>
                                        Add
                                    </span>
                                </b-button>
                            </div>
                            <div class="body mt-1" style="border-top:2px solid #F75949;">
                                <!-- <b-table :fields="branchColumns" :items="branchesData" class="mb-0">
    
                                    </b-table> -->
                                <b-table :show-empty="branchesData.length === 0" id="org_branches_info" responsive :per-page="perPage" :current-page="currentPage" :items="branchesData" :fields="branchColumns" class="mt-2 mb-0" @row-clicked="onRowClicked" selectable>
                                    <template #row-details="item">
                                        <b-card>
    
                                            <div class="d-flex justify-content-between" style="text-transform: uppercase;">
                                                Branch Details
                                                <div>
                                                    <feather-icon @click="isEditSidebarActive = true;
                                                        editItem = item.item" icon="EditIcon" size="20" />
                                                    <feather-icon v-if="checkDelete(item.item)" @click="deleteBranch(item.item.id)" icon="TrashIcon" size="20" class="ml-1" />
                                                </div>
                                            </div>
                                            <hr style="border-color:#F75949">
    
                                            <b-row class="match-height">
    
                                                <b-container>
                                                    <b-row class="mb-1">
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Branch Name :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{ item.item.name == null ? '-' : item.item.name }}
                                                        </b-col>
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Business Name :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{
                                                                    item.item.bussiness_name == null ? '-' :
                                                                    item.item.bussiness_name
                                                                }}
    
                                                        </b-col>
    
                                                    </b-row>
                                                    <b-row class="mb-1">
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Business Type :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{
                                                                    item.item.bussiness_type == null ? '-' :
                                                                    item.item.bussiness_type
                                                                }}
    
                                                        </b-col>
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Phone :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{ item.item.mobile == null ? '-' : item.item.mobile }}
    
                                                        </b-col>
    
                                                    </b-row>
                                                    <b-row class="mb-1">
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">GST Number :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{
                                                                    item.item.gst_number == null ? '-' : item.item.gst_number
                                                                }}
    
                                                        </b-col>
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">PAN :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{
                                                                    item.item.pan_number == null ? '-' : item.item.pan_number
                                                                }}
    
                                                        </b-col>
    
                                                    </b-row>
                                                    <b-row class="mb-1">
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Address :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{ item.item.address == null ? '-' : item.item.address }}
    
                                                        </b-col>
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">State :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{
                                                                    item.item.state_code == null ? '-' : item.item.state_code
                                                                }}
    
                                                        </b-col>
    
                                                    </b-row>
                                                    <b-row class="mb-1">
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Website :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4">
                                                            {{ item.item.website == null ? '-' : item.item.website }}
    
                                                        </b-col>
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Bank :</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
                                                        <b-col md="4" @click="changePage('bank_details')">
                                                            {{
                                                                    item.item.bank_details == null ? '-' :
                                                                    item.item.bank_details.account_name
                                                                }}
    
                                                        </b-col>
    
                                                    </b-row>
                                                    <b-row class="mb-1">
    
                                                        <b-col cols="2" class="">
                                                            <!-- <b-card-text > -->
                                                            <span style="font-weight: bolder;">Logo:</span>
    
                                                            <!-- </b-card-text> -->
    
                                                        </b-col>
    
                                                        <b-col md="4">
                                                            <img :src="item.item.logo" alt="" class="img-fluid">
    
                                                        </b-col>
                                                    </b-row>
    
                                                </b-container>
    
                                                <!-- about -->
    
                                            </b-row>
                                        </b-card>
    
                                    </template>
                                    <template #cell(address)="data">
                                        <span class="branch-address" v-b-tooltip.hover="data.item.address">

                                            {{ data.item.address }}
                                        </span>
                                    </template>
                                    <template #cell(actions)="data">
                                        <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
    
                                            <template #button-content>
                                                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                                            </template>
    
                                            <!--   <span class="align-middle " @click="
                  isEditSidebarActive = true;
                editItem = data.item;" variant="outline-secondary">
                  <b-dropdown-item>
                    <feather-icon icon="EditIcon" />
                    Edit
                  </b-dropdown-item>
                </span>-->
                                            <span class="align-middle " @click="destroyItem(data.item.id)" variant="outline-danger">
                                                <b-dropdown-item v-if="data.item.type == 'delete'">
                                                    <feather-icon icon="TrashIcon" />
                                                    Delete
                                                </b-dropdown-item>
                                            </span>
    
                                        </b-dropdown>
    
                                    </template>
                                </b-table>
                                <div v-if="branchesData.length > 0" class="mx-2 mb-2">
                                    <b-row>
    
                                        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                            <!-- <span class="text-muted">Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries</span> -->
                                        </b-col>
                                        <!-- Pagination -->
                                        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
    
                                            <b-pagination v-model="currentPage" :total-rows="totalCount" :per-page="perPage" first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
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
                            </div>
                            <div class="text-center">
                                <b-spinner v-if="isLoading" />
    
                            </div>
                        </b-card>
                        </b-tab>
                        <b-tab id="office-timing-tab">
                            <template #title>
                                {{ 'OFFICE TIMINGS' }}
                            </template>
                            <b-card no-body class="mt-3 p-1">
                                <div class="header d-flex justify-content-between">
                                <div style="margin-top:0.5rem;">
    
                                    <h2 class="text-uppercase">
                                        office timings
                                    </h2>
                                </div>
                                 <b-button size="sm" v-b-modal.office-timings-modal   variant="primary">
                                    <span>
                                        Add
                                    </span>
                                </b-button>
                            </div>
                            <div class="body mt-1" style="border-top:2px solid #F75949;">
                                <b-table class="mt-2"
                                :fields="officeFields"
                                :items="officeItems"
                                selectable
                                @row-clicked="onRowClickedOffice"
                                >
                                <template #row-details="item">
                                    <div class="d-flex justify-content-between" style="text-transform: uppercase;">
               Office timing Details 
               <div>
                <feather-icon @click="OfficeisEditSidebarActive = true;
              editOffice = item.item" style="margin-right:0.5rem;" icon="EditIcon" size="20" />
              <!-- <feather-icon v-if="item.item.data.type=='delete'" @click="destroyContact(item.item.data.id)" icon="TrashIcon" size="20" /> -->
              </div>
            </div>
            <hr style="border-color:#F75949">
                <div class="body card">
                    <b-row class="p-1 mb-1" style="background-color: #f6f6fa;">
                        <b-col md="3">
                            <b>

                                Days Of Week
                            </b>
                        </b-col>
                        <b-col md="3">
                            <b>

                                Start Time
                            </b>
                        </b-col>
                        <b-col md="3">
                            <b>

                                End Time
                            </b>
                        </b-col>
                        <b-col md="3">
                            <b>

                                Min Hours
                            </b>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1" v-for="data in item.item.office_day_time" :id="String(data.id)">
                        <b-col md="3" >
                            <b class="ml-1">

                                {{ data.day_of_week }}
                            </b>
                        </b-col>
                        <b-col md="3">
                            {{ data.starting_time }}
                        </b-col>
                        <b-col md="3">
                            {{ data.ending_time }}
                        </b-col>
                        <b-col md="3">
                            {{ data.min_office_hours }}
                        </b-col>
                    </b-row>
                </div>
                                </template>
                                <template #cell(branch)="item">
                                    {{ allBranches != null ? allBranches.find(e => e.id === item.item.branch_id).name : null }}
                                </template>
                                <template #cell(user)="item">
                                    {{ item.item.user_id != null ? $store.state.users.all.find(e => e.id === item.item.user_id).name :null }}
                                </template>

                                </b-table>
                            </div>
                            </b-card>
                        </b-tab>
                    </b-tabs>
                        <!-- </div> -->
                        <!-- </div> -->
                    </b-tab>
                    <b-tab id="org_features">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                features
                            </span>
                        </template>
                        <div class="card m-0 mt-2 p-1 pb-2 pt-2">
                            <form>
                                <div class="header">
                                    <h2> Select the features you would like to enable </h2>
                                    <!---->
                                </div>
                                <div class="body mb-1">
                                    <div class="demo-checkbox row clearfix" style="line-height: 2;">
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_0" name="clients" class="filled-in chk-col-theme" value="1">
                                            <label for="md_checkbox_0" title="Click to enable/disable" class="col-black text-uppercase">Clients</label>
                                        </div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_1" name="invoicing" class="filled-in chk-col-theme" value="1"> <label for="md_checkbox_1" title="Click to enable/disable" class="col-black text-uppercase">Invoicing</label></div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_2" name="time_sheet" class="filled-in chk-col-theme" value="1"> <label for="md_checkbox_2" title="Click to enable/disable" class="col-black text-uppercase">Time Sheet</label></div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_3" name="online_payment" class="filled-in chk-col-theme" value="1"> <label for="md_checkbox_3" title="Click to enable/disable" class="col-black text-uppercase">Online Payments</label></div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_4" name="leads" class="filled-in chk-col-theme" value="1">
                                            <label for="md_checkbox_4" title="Click to enable/disable" class="col-black text-uppercase">Leads Management</label>
                                        </div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_5" name="recurring_tasks" class="filled-in chk-col-theme" value="1"> <label for="md_checkbox_5" title="Click to enable/disable" class="col-black text-uppercase">Recurring Tasks</label></div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox" id="md_checkbox_6" name="domain_based_emailing" class="filled-in chk-col-theme" value="1">
                                            <label for="md_checkbox_6" title="Click to enable/disable" class="col-black text-uppercase">Domain
                                                Based Emailing</label>
                                        </div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox"
                                                id="md_checkbox_7" name="bulk_emailing" class="filled-in chk-col-theme"
                                                value="1"> <label for="md_checkbox_7" title="Click to enable/disable"
                                                class="col-black text-uppercase">Bulk Emailing</label></div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox"
                                                id="md_checkbox_8" name="client_login" class="filled-in chk-col-theme"
                                                value="1"> <label for="md_checkbox_8" title="Click to enable/disable"
                                                class="col-black text-uppercase">Client Login</label></div>
                                        <div class="col-sm-3 col-md-3 col-xs-6 col-lg-3"><input type="checkbox"
                                                id="md_checkbox_9" name="reports" class="filled-in chk-col-theme"
                                                value="1"> <label for="md_checkbox_9" title="Click to enable/disable"
                                                class="col-black text-uppercase">Reports</label></div>
                                    </div>
                                </div>
                                <div class="footer mt-1 text-right"> 
                                    <b-button size="sm" title="Click to save the current changes" type="submit"
                                        variant="primary">
                                        Save Changes
                                    </b-button>
                                </div>
                            </form>
                        </div>
                    </b-tab>
                    <b-tab v-if="setPrivileges.org" id="bank_details">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                bank details
                            </span>
                        </template>
                        <b-card no-body class="p-1 mt-2 m-0">
    
                            <bank-details />
                        </b-card>
                    </b-tab>
                    <b-tab id="designations" v-if="setPrivileges.desig === true">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                designations
                            </span>
                        </template>
                        <b-card no-body class="designations_start mt-3 p-1">
    
                            <div class="header d-flex justify-content-between">
                                <div style="margin-top:0.5rem">
    
                                    <h2 class="text-uppercase">
                                        designations
                                    </h2>
                                </div>
                                 <b-button size="sm" v-b-modal.designation-modal variant="primary"  >
                                    Add
                                </b-button>
                            </div>
                            <!-- <hr style="border-color: #F75949!important"> -->
                            <div class="body mt-1" style="border-top:2px solid #F75949">
                                <b-table selectable @row-clicked="onRowClickedDesignations" class="mb-0 mt-2" id="designation_table" :fields="designationCol" :items="designations">
                                    <template #row-details="{ item }">
                                        <div class="designation-details mt-1">
                                            <div class="card modal-card">
                                                <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
                                                    <b-form id="designation_add_form" @submit.prevent="handleSubmit(updateDesignation)">
                                                        <div class="header" style="
                                                                color: #555;
                                                              padding: 0 0 10px 0;
                                                             position: relative;
                                                             border-bottom: 1px solid #F75949;
                                                              box-shadow: none;
                                                             margin-bottom: 0;
                                                                                                                    border-radius: 0;">
                                                            <h2 class="text-uppercase">Update Designation</h2>
                                                        </div>
                                                        <div class="body" style="
                                                                font-size: 14px;
                color: #444;
                padding: 15px;
                font-weight: 400;">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="col-md-6 ">
                                                                        <div class="form-group ">
                                                                            <label class="form-label" style="font-size:13px;">Designation
                                                                                Name</label>
                                                                            <div class="form-line "><input type="text" v-model="edit_design_name" required="required" class="form-control valid" aria-required="true" aria-describedby="name-error" aria-invalid="false" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12">
                                                                    <div class="demo-switch">
                                                                        <div class="row clearfix" v-for="desig_type in editToggleArr" :key="String(desig_type.id)">
                                                                            <div class="col-sm-3 m-t-10 d-flex align-items-center">
                                                                                <div class="switch">
                                                                                    <label class="switch">
                                                                                        <input type="checkbox" v-model="desig_type.switchOption" @click="{
                                                                                                    if(desig_type.text == 'ToggleLeftIcon') {
                                                                                                    desig_type.switchOption = true
                                                                                                    desig_type.text = 'ToggleRightIcon'
                                                                                                } else {
                                                                                                    desig_type.switchOption = false
                                                                                                    desig_type.text = 'ToggleLeftIcon'
                                                                                                }
                                                                                                                                                                                                                                                                                                }">
                                                                                        <span class="slider round"></span>
                                                                                    </label>
                                                                                    <!-- <feather-icon class="cursor-pointer"
                                                                                            style="color:grey"
                                                                                            :icon="desig_type.text" @click="() => {
                                                                                                if (desig_type.text == 'ToggleLeftIcon') {
                                                                                                    desig_type.switchOption = true
                                                                                                    desig_type.text = 'ToggleRightIcon'
                                                                                                } else {
                                                                                                    desig_type.switchOption = false
                                                                                                    desig_type.text = 'ToggleLeftIcon'
                                                                                                }
                                                                                            }" size="40" /> -->
    
                                                                                    <!-- <font-awesome-icon icon="toggle-off" /> -->
    
                                                                                    <!-- <label ><input
                                                                                        
                                                                                        type="checkbox" value="1"
                                                                                        name="lead"> <span
                                                                                        
                                                                                        class="lever switch-col-theme"></span></label> -->
                                                                                </div>
                                                                                <div class="demo-switch-title">
                                                                                    <b class="ml-1">
                                                                                        {{ desig_type.type }}
    
                                                                                    </b>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-sm-9 centrik-group" :class="{ 'fade-in': desig_type.switchOption == false }">
                                                                                <div data-v-c4619202="" class="multiselect-group" data-name="privileges">
                                                                                    <label data-v-c4619202="" class="typo__label">Privileges</label>
                                                                                    <v-select multiple :disabled="desig_type.switchOption == false" v-model="desig_type.privileges" :options="desig_type.show_all_privileges" label="name" >
                                                                                        <template #list-header>
                                            <div class=" ml-2 mb-1 mt-1" @click="selectAllPrivileges(desig_type.type,desig_type.show_all_privileges)">
                  <a href="#">
                    <feather-icon  size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> {{ desig_type.privileges.length === desig_type.show_all_privileges.length ? 'Remove All' : 'Select All' }}  </a>
                </div>
                                        </template>
                                                                                        </v-select>
                                                                                    <!---->
                                                                                </div>
                                                                            </div>
                                                                        </div>
    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="footer text-right mt-1"><!----> <b-button
                                                             :disabled="spinnerU"   type="submit" variant="primary">
                                                                <span >Update</span>
                                                                <span class="ml-1" v-if="spinnerU">
                                                                    <b-spinner small></b-spinner>
                                                                </span>
                                                            </b-button></div>
                                                    </b-form>
                                                </validation-observer>
                                            </div>
                                        </div>
                                    </template>
                                    <template #cell(name)="{ item }">
                                       

                                            {{ item.designation_name }}
                                        
                                    </template>
                                    <template #cell(employees)="{ item }" >
                                        <span v-html="getUserString(item.users)">
                                        {{
                                               getUserString(item.users)
    
                                            }}
                                            </span>
                                    </template>
                                </b-table>
                            </div>
                        </b-card>


                    </b-tab>
                    <b-tab v-if="setPrivileges.checklistTemp===true" id="templates6">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                templates
                            </span>
                        </template>
                        <b-tabs class="mt-3">
                            <b-tab class="mt-3" id="subtask-template">
                                <template #title>
                                    <span class="text-uppercase" style="color:#222;font-size:15px;">
                                        sub-task templates
                                    </span>
    
                                </template>
                                <b-card no-body class="pl-1 pr-1 pt-0 ">
    
                                    <subtask-templates />
                                </b-card>
    
                            </b-tab>
                            <b-tab class="mt-3" id="proposal-template">
                                <template #title>
                                    <span class="text-uppercase" style="color:#222;font-size:15px;">
                                        proposal templates
                                    </span>
                                </template>
                                <b-card no-body class="pl-1 pr-1 pt-0 ">
    
                                    <proposal-templates />
                                </b-card>
                            </b-tab>
                            <b-tab class="mt-3" id="email-template">
                                <template #title>
                                    <span class="text-uppercase" style="color:#222;font-size:15px;">
                                        email templates
                                    </span>
                                </template>
                                <b-card no-body class="pl-1 pr-1 pt-0 ">
    
                                    <email-templates />
                                </b-card>
                            </b-tab>
                        </b-tabs>
                    </b-tab>
                    <b-tab v-if="setPrivileges.categ === true" id="categories">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                Categories
                            </span>
                        </template>
                        <b-card no-body class="categories mt-3 " style="padding:0.8rem;">
    
    <div class="header d-flex justify-content-between" style="margin-top: 0.5rem; margin-bottom: 5px;">
        <div style="margin-top:0.5rem">

            <h2 class="text-uppercase">
                categories
            </h2>
        </div>
        
         <b-button size="sm"   class="mt-1" v-b-modal.modal-categories variant="primary"  >
            Add
        </b-button>
    </div>
    <hr style="border-color: #F75949!important;">

    <categories-comp/>
    
    </b-card>
                    </b-tab>
                    <b-tab id="email-config" v-if="setPrivileges.integrations">
                        <template #title>
                            <span class="text-uppercase" style="color:#222;font-size:15px;">
                                Integrations
                            </span>
                        </template>
                        <b-tabs class="mt-3">
                           
                            <b-tab class="mt-3" id="mail-settings">
                                <template #title>
                                    <span class="text-uppercase" style="color:#222;font-size:15px;">
                                        mail settings
                                    </span>
    
                                </template>
                                <b-card no-body class="pl-1 pr-1  mt-3">
    
                                    <!-- <email-templates /> -->
                                    <email-config />
                                </b-card>
    
                            </b-tab>
                            <b-tab class="mt-3" id="assigned-users">
                                <template #title>
                                    <span class="text-uppercase" style="color:#222;font-size:15px;">
                                        assigned users
                                    </span>
    
                                </template>
                                <b-card no-body class="pl-1 pr-1  mt-3">
    
                                   
                                    <email-users />
                                </b-card>
    
                            </b-tab>
                           
                        </b-tabs>
                    
                    </b-tab>
                </b-tabs>
            </div>
        </div>
        <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />
    
        <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItem" @refetch-data="fetchAll" />
        <edit-sidebar-office :officeId="officeId" :is-edit-sidebar-active.sync="OfficeisEditSidebarActive" :edit-item.sync="editOffice" />
    </div>
</template>
<style>
.red{
    text-transform:strike
}

.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}

</style>
<script>
import formValidation from '@/@core/comp-functions/forms/form-validation';
import EmailUsers from '../Emails/EmailUsers.vue'
import {
    BFormCheckbox,VBTooltip,
    BTab, VBModal, BModal, BFormGroup, BFormInput, BSpinner, BPagination, BDropdown, BDropdownItem,
    BTabs, BFormInvalidFeedback, BRow, BCol, BContainer,
    BTable, BCard, BForm, BButton
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { ref } from 'vue-demi';
import {ref} from  '@vue/composition-api'
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'
import CategoriesComp from './CategoriesComp.vue';
import ProposalTemplates from '../templates/List.vue'
import EmailTemplates from '../templates/emailTemplates.vue'
import SubtaskTemplates from '../templates/subtaskTemplates.vue'
import EmailConfig from '../Emails/List.vue'

library.add(faToggleOff, faToggleOn);

import CreateSidebar from "../branches/CreateSidebar.vue";
import EditSidebar from "../branches/EditSidebar.vue";
import EditSidebarOffice from "./EditOfficeTiming.vue";

import BankDetails from '../bank_details/List.vue'
// import { ArrowLeftCircleIcon } from 'vue-feather-icons';
// import { exit } from 'process';
export default {
    name: 'Settings',
    components: {
        EmailConfig,EmailUsers,EditSidebarOffice,
        FontAwesomeIcon,ProposalTemplates,EmailTemplates,SubtaskTemplates,
        BTab, BTabs, BCard, BFormGroup, BFormInput, BForm, BButton, BModal, VBModal, BRow, BCol,
        BSpinner, BPagination, BDropdown, BDropdownItem, BankDetails,
        ValidationObserver, ValidationProvider, BContainer, vSelect,BFormCheckbox
        , BFormInvalidFeedback, BTable, CreateSidebar, EditSidebar,CategoriesComp
    },
    props: {

    },
    directives: {
        'b-modal': VBModal,
        'b-tooltip':VBTooltip,
    },
    data() {
        return {
            organization_id:null,
            org_email:null,
            subdomain:null,
            fetchedOrganisation:null,
            detailsRowOffice:null,
           officeId:0,
           nammmmmm:[],
            mails:[],
            tabsAccess:0,
            OrgName:'',
            spinnerU: false,
            previleges: {
        org: false,
        desig: false,
        categ: false,
        scheduled: false,
        recurring: false,
        dataImport: false,
        checklistTemp: false,
        proposalTemp: false,
        customFields: false,
        integrations: false,
        website: false,
      },
      items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
            edit_design_name: '',
            detailsRowDesig: null,
            desig_edit_id: 0,
            design_name: '',
            // privileges_options: [
            //     "View All Leads",
            //     "Leads Editing",
            //     "Lead on Row Editing",
            //     "Lead Conversion",
            // ],
            officeFields:[{key:'branch', label:'Branch'}, {key:'user', label:'Employee'}, {key:'office_days', label:'Office Days'}],
            officeItems:[],
            branchColumns: [{ key: 'name', label: 'branch name' }, { key: 'bussiness_name', label: 'business name' }, { key: 'bussiness_type', label: 'business type' }, { key: 'mobile', label: 'phone' }, { key: 'address', label: 'address' }]
            , detailsRow: null,
            toggleText: 'ToggleLeftIcon',
            stateOptions: [],
            designationCol: [{ key: 'name', label: 'designation name' }, { key: 'employees', label: 'employees' }]

            ,
            
            designationCol1: [ 'Emails','Users' ],

            
            switchOption: false,
            toggleArr: [],
            faketoggleArr: [],

            editToggleArr: [],
            extraToggleArr: [],
            //   branchesData: []
        }
    },
    computed: {
    setOffice(){
            this.officeItems = []
            let branches = this.$store.state.branches.all
            let users = this.$store.state.users.all
        
            let arr = this.$store.state.officeTimings.all.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at));

           this.officeItems = arr
            return;
        },
        setOrgName(){
            
            this.OrgName = this.$store.state.auth.org.tenant.organization.name
            this.organization_id = this.$store.state.auth.org.tenant.id
            this.org_email = this.$store.state.auth.org.email
            this.subdomain = this.$store.state.auth.org.tenant.organization.subdomain



        },
        setPrivileges() {
           
      let priveleges = [];  
      let roles = this.$store.state.users.all;
         let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id


        console.log(currUser, 'uuuuuuuuuuu');

        let data = this.previleges;
        console.log('step-2222222222')
        if (roles.length > 0) {
        // let roles = this.$store.state.users.all;
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
          if(x.name==='Settings') {
            x.privileges.forEach(y => {
            priveleges.forEach(z => {
              if (y.id === z.privilege_id) {
                // if(y.status === 'active'){

                    arr.push({
                        name: y.name,
                        status: z.status
                    })
                // }
              }
            })
          }) 
          }
        })

        console.log(arr, 'ppppppppppp')

        arr.forEach(x => {
            // console.log(x.name, x.status, 'checkkkkkk')
          if (x.name === 'Organizations' ) {
            if(x.status==='active'){

                data.org = true
            }else{
                data.org = false
            }
          }
          else if (x.name === 'Designations' ) {
            if(x.status==='active'){
            data.desig = true
            }else{
                data.desig= false
            }
          }
          else if (x.name === 'Categories' ) {
            if(x.status==='active'){
            data.categ = true
            }else{
                data.categ = false
            }
          }
          else if (x.name === 'Scheduled Task Default' ) {
            if(x.status==='active'){

            data.scheduled = true
            }else{
                data.scheduled = false
            }
          }
          else if (x.name === 'Recurring Tasks' ) {
            if(x.status==='active'){
            data.recurring = true
            }else{
                data.recurring = false
            }
          }
          else if (x.name === 'Data Import' ) {
            if(x.status==='active'){
            data.dataImport = true
            }else{
                data.dataImport = false
            }
          }
          else if (x.name === 'Checklist Templates' ) {
            if(x.status==='active'){
            data.checklistTemp = true
            }else{
                data.checklistTemp = false
            }
          }
          else if (x.name === 'Proposal Templates' ) {
            if(x.status==='active'){
            data.proposalTemp = true
            }else{
                data.proposalTemp = false
            }
          }
          else if (x.name === 'Custom Fields' ) {
            if(x.status==='active'){
            data.customFields = true
            }else{
                data.customFields = false
            }
          }
          else if (x.name === 'Integrations' ) {
            if(x.status==='active'){
            data.integrations = true
            }else{
                data.integrations = false
            }
          }
          else if (x.name === 'Websites' ) {
            if(x.status==='active'){
            data.website = true
            }else{
                data.website = false
            }
          }
        })


        console.log(data, 'mmmmmmmmmmm');
        return data
      }
      
      else {
        console.log('yyyaaaaayyyy')
        let data = this.previleges;
      for (const key in data) {
        data[key] = true;
        }
        return data
      }
    },
        all_masters() {
            this.toggleArr = []
            var arr = this.$store.state.status.all_master.reverse()
            arr.forEach(element => {
                this.toggleArr.push({

                    id: element.id, switchOption: false, text: 'ToggleLeftIcon', type: element.name, show_all_privileges: element.privileges, privileges: []

                })

            });
        },
        designations() {
            // return [{ name: 'Owner', employees: 'Team Centrik' }, { name: 'Admin', employees: 'Team Centrik, Naman Sharma' }]
            return this.$store.state.designation.all;
        
        },

        isLoading() {
            return this.$store.state.branches.isLoading;
        },
        successMessage() {
            return this.$store.state.branches.successMessage;
        },
        errorMessage() {
            return this.$store.state.branches.errorMessage;
        },
        errors() {
            return JSON.parse(JSON.stringify(this.$store.state.branches.errors));
        },
        allBusiness() {
            return this.$store.state.branches.businessTypes
        },
        allBranches() {
          
            return this.$store.state.branches.all
        },
        branchesData() {
            let data = this.$store.state.branches.all
            data.forEach((x) => {
                this.$store.state.branches.businessTypes.forEach((y) => {
                    if (Number(x.bussiness_type) === y.id) {
                        x.bussiness_type = y.bussiness_type ? y.bussiness_type : '';
                    }
                })
                this.$store.state.branches.states.forEach((y) => {
                    if (x.state_code === Number(y.fips_code)) {
                        x.state_code = y.name ? y.name : '';
                    }
                })
            });
            console.log(this.$store.state.branches.states)
            //   this.branchesData = data
         
            return data;
        },
        totalCount() {
            return this.$store.state.branches.all.length;
        },
    },
    created() {
        this.$store.dispatch('designation/fetch').then(() => {
            if(this.$router.currentRoute.params.integration){
            this.tabsAccess = 6
        }
        this.setLocalStoragePrivilege()
        })
        
        this.fetchAll()
        if(this.$store.state.branches.businessTypes.length === 0){
            this.$store.dispatch('branches/business')
        }
        this.$store.dispatch('officeTimings/fetch')
        // this.$store.dispatch('status/fetchAllMaster')
    },
    updated() {
        this.setLocalStoragePrivilege()
    },
    beforeUpdate() {
        
       
    },
    methods: {
        checkDelete(data){
            let da = this.$store.state.leads.all
            let count = da.filter(e => e.branch_id === data.id)
            if(count === 0){
                return false
            }else{
                return true
            }
        },
        selectAllPrivileges(type,all){
            // datas = all
            this.editToggleArr.forEach(element => {
                if(element.type === type){
                    if(element.privileges.length === all.length){
                        element.privileges = []
                    }else{

                        element.privileges = all;
                    }
                }
            });
            return;
        },
        onRowClickedOffice(item){
            const { detailsRowOffice } = this
            if (detailsRowOffice && detailsRowOffice !== item) {
                detailsRowOffice._showDetails = false;
            }
            // if(item._showDetails){

                this.$set(item, '_showDetails', !item._showDetails
                )
                this.officeId = item.id
                this.detailsRowOffice = item
            // }
        },
        setLocalStoragePrivilege(){
            this.$store.state.designation.all.forEach(element => {
                        element.users.forEach(x => {
                            if(x.email === JSON.parse(localStorage.getItem('userData')).email){
                                const data = {id:element.id,designation_name :element.designation_name, masters:element.masters}
                                // localStorage.removeItem('privileges')
                                localStorage.setItem('privileges', JSON.stringify(data))


                            }else{
                                // localStorage.removeItem('privileges')

                            }
                        });
                    });
        },
        getUserString(users) {
      return users
        .map(user => {
          if (user.status === 'inactive') {
            let name=user.name
            return `<del>${user.name}</del>`;
          }
          return user.name;
        })
        .join(', ');
    }
,
        createDesignation() {
            var data = [];
            var privileges_id_arr = []
            var all_master_id = 0;
            var filter = []
            this.toggleArr.forEach(element => {
                filter = element.privileges.filter(e => e.all_master_id === element.id);
                all_master_id = element.id
                filter.forEach(e => {
                    e.privileges_id = e.id
                    // if ( e.all_master_id === element.id) {

                    // privileges_id_arr.push({
                    //     privileges_id: e.id
                    // })

                    // }
                });
                // privileges_id_arr = 
                if (element.privileges.length > 0) {

                    data.push({
                        all_master_id: all_master_id,
                        privileges: filter

                    })
                }
            });

            const desig_data = {
                designation_name: this.design_name,
                masterAccess: data
            };


            this.$store.dispatch('designation/store', desig_data).then(() => {
                this.$store.dispatch('designation/fetch').then(() => {
                    this.setLocalStoragePrivilege()
                    this.toggleArr.forEach(element => {
                        if(element.switchOption == true){
                            element.switchOption = false
                        }
                        element.privileges = []

                    });
                    this.$refs['designation-modal'].hide()

                })
            })

            console.log(data, this.design_name);
        },
        updateDesignation() {
            this.spinnerU = true;
            console.log(this.editToggleArr, 'ssssssssss')
            var data = [];
            var privileges_id_arr = []
            var all_master_id = 0;
            var filter = []
            var extrafilter = []

            var d = []
            var e = []
            // var pr = []
            // this.$store.state.status.all_master.forEach(element => {
            //     element.privileges.forEach(dp => {
            //         pr.push(dp)
            //     });
            // });
            var id = 0
            var status = ''

            console.log(id);
            this.editToggleArr.forEach(element => {
                // this.extraToggleArr.forEach(extra => {

                if (element.switchOption == true) {
                    element.status = 'active'
                    // extra.status = 'active'

                } else {
                    element.status = 'inactive'
                    // extra.status = 'inactive'

                }
                // d.push(element);

                // this.$store.state.status.all_maset.forEach(element => {

                // });
                // e.push(pr.find(e => e.all_master_id === element.id))
                filter = element.privileges.filter(e => e.all_master_id === element.id);
                //  var notfilter = element.privileges.filter(e => e.all_master_id === element.id);

                // if(){

                //     id = element.privileges.find(e => e.all_master_id === element.id);
                // }
                // extrafilter = this.extraToggleArr.find(e => e.id === element.id).privileges.filter(b => b.all_master_id === element.id)
                //  element..forEach(element => {
                //  });
                //  extrafilter = extra.privileges.filter(e => e.all_master_id === extra.id);
                // console.log(filter, extrafilter);
                //     filter.forEach(cbh => {
                // extrafilter.forEach(bhc => {
                //     if(bhc.id != cbh.id)
                //        id.push(cbh.id)
                //     });
                // });
                // console.log(id);
                //  if(element.id)
                all_master_id = element.id
                //  if(extrafilter.find(e => e.id !== id)){
                //     console.log(extrafilter.find(e => e.id !== id).id);
                //  }
                //  d= this.detailsRowDesig.privileges.filter(e => e.all_master_id === element.id)
                filter.forEach(e => {
                    id = e.id
                    // if(this.detailsRowDesig..p)
                    console.log(filter, extrafilter);


                    // extrafilter.forEach(extrae => {
                    // filter.forEach(f => {
                    //     id = f.id

                    // if (filter.length < extrafilter.length) {

                    // if (e.id === extrae.id) {
                    //     // console.log('missing', extrae);
                    //     extrae.status = 'active'
                    //     extrae.privileges_id = extrae.id
                    // }else{
                    //     extrae.status = 'inactive'
                    //     extrae.privileges_id = extrae.id
                    // }


                    // if ( e.all_master_id === element.id) {
                    // });
                    // }else{
                    e.privileges_id = e.id
                    e.status = 'active'
                    // }

                    // privileges_id_arr.push({
                    //     privileges_id: e.id
                    // }
                    //     if (filter.length >= extrafilter.length) {
                    //             e.privileges_id = e.id
                    //             e.status = 'active'
                    //             extrafilter = filter
                    // }
                    // })

                    // });
                    //     console.log('less');

                    //                     else{

                    // e.privileges_id = e.id
                    // e.status = 'active'
                    // }

                    // }
                });

                // privileges_id_arr = 
                // if (element.privileges.length > 0) {

                data.push({
                    all_master_id: all_master_id,
                    status: element.status,

                    // privileges: filter.length != extrafilter.length ? extrafilter : filter
                    privileges: filter


                })
                // if(all_master_id === 12){
                //     return false;
                // }
                // }
                // });
            });
            // console.log(id);

            // console.log(d,this.extraToggleArr);
            const desig_data = {
                designation_name: this.edit_design_name,
                masterAccess: data
            };


            this.$store.dispatch('designation/update', { payload: desig_data, id: this.desig_edit_id }).then(() => {
                this.spinnerU = false;
                this.$store.dispatch('designation/fetch').then(() => {
                    this.$store.dispatch('users/fetch').then(() => {

                        this.setLocalStoragePrivilege()
                    });
                })
                this.$toast.success('Designation Updated!', {
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

            console.log(data, this.design_name);
        },
        onRowClickedDesignations(item) {
            const { detailsRowDesig } = this
            if (detailsRowDesig && detailsRowDesig !== item) {
                detailsRowDesig._showDetails = false;
            }

            this.$set(item, '_showDetails', !item._showDetails
            )
            this.detailsRowDesig = item;
            this.edit_design_name = item.designation_name

            var find = []
            var assign = []
            // item.masters.forEach(element => {
            //     find.push({
            //      all:   this.toggleArr.find(e => e.id === element.all_master_id).show_all_privileges
            // })


            // });
            // this.editToggleArr = []
            // var d = this.faketoggleArr
            this.editToggleArr = []
            this.extraToggleArr = []
            this.$store.state.status.all_master.forEach(element => {
                this.editToggleArr.push({

                    id: element.id, switchOption: false, text: 'ToggleLeftIcon', type: element.name, show_all_privileges: element.privileges, privileges: []

                })
                this.extraToggleArr.push({

                    id: element.id, switchOption: false, text: 'ToggleLeftIcon', type: element.name, show_all_privileges: element.privileges, privileges: []

                })

            });
            // this.editToggleArr = 
            this.editToggleArr.forEach(element => {
                item.masters.forEach(o => {
                    if (o.status == "active" && element.id === o.all_master_id) {
                        // if(){

                        // console.log('active',element.type);

                        element.switchOption = true
                        element.text = 'ToggleRightIcon'
                        // }
                    }
                });
                item.privileges.forEach(m => {

                    if (element.id === m.all_master_id && m.status == 'active') {
                        element.privileges.push(this.$store.state.status.all_master.find(e => e.id === m.all_master_id).privileges.find(b => b.id === m.privilege_id))

                    }
                });

            });

            this.extraToggleArr.forEach(element => {
                item.masters.forEach(o => {
                    if (o.status == "active" && element.id === o.all_master_id) {
                        // if(){

                        // console.log('active',element.type);

                        element.text = 'ToggleRightIcon'
                        element.switchOption = true
                        // }
                    }
                });
                item.privileges.forEach(m => {

                    if (element.id === m.all_master_id && m.status == 'active') {
                        element.privileges.push(this.$store.state.status.all_master.find(e => e.id === m.all_master_id).privileges.find(b => b.id === m.privilege_id))

                    }
                });

            });

            // find.forEach(element => {
            //     element.all.forEach(c => {

            //         item.privileges.forEach(a => {
            //             if(c.id === a.privilege_id){
            //                 assign.push(c)
            //                 this.editToggleArr.push({
            //                     id: this.$store.state.status.all_master.find(e => e.id ===c.all_master_id).id, switchOption: true, text: 'ToggleRightIcon', type: this.$store.state.status.all_master.find(e => e.id ===c.all_master_id).name, show_all_privileges: element.all, privileges: assign
            //                 })
            //             }
            //         });
            //     });
            // });
            // this.editToggleArr = this.editToggleArr.filter((item,
            // index) => this.editToggleArr.indexOf(item.id) === index);
            console.log(assign);
            this.desig_edit_id = item.id;
        },
      
        openModal(modal) {
            // this.design_name = ''
            this.$refs[modal].show()
        },
        updateOrg() {
            const org_data = {
                organization_id: this.organization_id,
                organization_name: this.OrgName,
                subdomain:this.subdomain,
                email: JSON.parse(localStorage.getItem('userData')).email
            }
            console.log(org_data);
            this.$store.dispatch('auth/updateOrganization',org_data).then(() => {
                this.OrgName = this.$store.state.auth.org.tenant.organization.name
                this.$toast.success("Organisation Updated Successfully!", {
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
        changePage(route_name) {
            this.$router.push({ name: route_name })
        },
        deleteBranch(id) {
            this.$store.dispatch("branches/destroy", id).then(() => {
                this.$store.dispatch("branches/fetch");
            })
        },
        onRowClicked(item) {
            const { detailsRow } = this
            if (detailsRow && detailsRow !== item) {
                detailsRow._showDetails = false;
            }

            this.$set(item, '_showDetails', !item._showDetails
            )
            this.detailsRow = item;
        },
        fetchAll() {
            this.$store.dispatch("branches/fetch");
        },
        destroyItem(id) {
            if (confirm("Are you sure do you want to delete this item?")) {
                this.$store.dispatch("branches/destroy", id).then(() => {
                    this.fetchAll();
                });
            }
        },
       
    },
    setup() {
        const isCreateSidebarActive = ref(false);
        const isEditSidebarActive = ref(false);
        const OfficeisEditSidebarActive=ref(false);
            const editOffice=ref({});
        const editItem = ref({});
        const perPage = ref(10)
        // const totalCount = ref(store.state.emails.all.length)
        const currentPage = ref(1)
        const perPageOptions = [10, 25, 50, 100]
        const { refFormObserver, getValidationState } =
            formValidation();
        return {
            perPage, currentPage, perPageOptions, isCreateSidebarActive, isEditSidebarActive, editItem,
            refFormObserver,
            getValidationState,OfficeisEditSidebarActive,editOffice,
            formValidation
        }
    }
}
</script>
