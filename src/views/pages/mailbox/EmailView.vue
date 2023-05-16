<template>
  <div class="email-app-details">
    <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />


    <!-- Email Header -->
    <div class="email-detail-header">

      <!-- Header: Left -->
      <div class="email-header-left d-flex align-items-center">
        <span class="go-back mr-1">
          <feather-icon :icon="$store.state.appConfig.isRTL ? 'ChevronRightIcon' : 'ChevronLeftIcon'" size="20"
            class="align-bottom" @click="hidereply(), $emit('close-email-view');" />
        </span>
        <h4 v-b-tooltip.hover="emailViewData.parent.subject" class="email-subject mb-0" v-if="emailViewData.parent">
          <b-badge class="cursor-pointer" @click="goTo_lead(emailViewData.parent.task_status)"
            v-if="emailViewData.parent.task_status != null" :variant="changeStatus(emailViewData.parent.task_status)">
            <!-- {{ '# '+ email.parent.task_lead_id.split('_')[1] }} -->
            {{ '#' + emailViewData.parent.task_status.id }}
          </b-badge>
          <span class="email-subject-inside">

            {{ emailViewData.parent.subject }}
          </span>
          <span v-if="$route.params.folder === 'Draft'" class="email-subject-inside">

{{ emailViewData.parent.subject }}
</span>
        </h4>
        <h4 v-b-tooltip.hover="emailViewData.subject" class="email-subject mb-0" v-if="!emailViewData.parent">
          <b-badge class="cursor-pointer" @click="goTo_lead(emailViewData.task_status)"
            v-if="emailViewData.task_status != null" :variant="changeStatus(emailViewData.task_status)">
            <!-- {{ '# '+ email.parent.task_lead_id.split('_')[1] }} -->
            {{ '#' + emailViewData.task_status.id }}
          </b-badge>
          <span class="email-subject-inside" >

            {{ emailViewData.subject }}
          </span>
        </h4>
      </div>

      <!-- Header: Right -->
      <div v-if="emailViewData.parent" class="email-header-right ml-2 pl-1">


        <b-dropdown v-if="emailViewData.parent.task_id == null && ($router.currentRoute.fullPath === '/apps/email/sent' || $router.currentRoute.fullPath === '/apps/email')" id="convert_dropdown" size="sm mr-1" variant="primary">
          <!-- <b-dropdown-item @click="isCreateSidebarActive = true" >
        Lead
      </b-dropdown-item> -->
          <template #button-content>
            <span>Convert to</span>
          </template>
          <b-dropdown-item @click="() => {openModal('lead')}">
            Lead
          </b-dropdown-item>
          <b-dropdown-item @click="openModal('task')">
            Task
          </b-dropdown-item>
          <b-dropdown-item @click="openModal('comments')">
            Comment
          </b-dropdown-item>
          <!-- <b-dropdown-item>
        Comment
      </b-dropdown-item> -->

        </b-dropdown>
        {{ fileLinks }}

        <b-modal no-close-on-backdrop id="modal-center" ref="modal-center" size="lg" title="Mail to Lead" hide-footer>
          <!-- <b-card-body> -->
          <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

            <b-form @submit.prevent="handleSubmit(mail_to_lead(emailViewData))">

              <b-row>
                <b-col :md="setMd(branches.length)">
                  <validation-provider #default="validationContext" name="contact_person_id" vid="contact"
                    rules="required">

                    <b-form-group label="Contact People *" label-for="contact">
                      <v-select class="select-size-md mt-1" v-model="contact_person_id" id="contact"
                        placeholder="Select an option" label="name" :options="contactPeople">
                        <template #list-header class="add_contacts">
                          <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                            <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                            <a href="#">
                              <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Contact
                            </a>


                          </div>
                        </template>

                      </v-select>
                      <b-form-invalid-feedback class="d-flex">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- <CreateContactLead /> -->

                <b-col :md="setMd(branches.length)">
                  <b-form-group label="Clients" label-for="clients">
                    <v-select class="select-size-md mt-1" v-model="mail.company_id" id="clients"
                      placeholder="Select an option" label="name" :options="clients">
                      <template #list-header class="add_clients">
                        <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                          <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Client</a>
                        </div>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <!-- <CreateClientLead /> -->
                <b-col :md="setMd(branches.length)">
                  <b-form-group label="Category" label-for="category">
                    <v-select @input="categoryUser" class="select-size-md mt-1" v-model="mail.category_id"
                      id="category" placeholder="Select an option" label="name" :options="categories" />
                  </b-form-group>
                </b-col>
                <b-col :md="setMd(branches.length)" v-if="(branches.length > 1)">
                  <b-form-input hidden v-if="branches.length == 1" id="branches" :value="branches[0].id" />

                  <validation-provider #default="{ errors }" v-if="branches.length > 1" name="branch_id" vid="branch"
                    rules="required">
                    <b-form-group label="Branches *" label-for="branch">
                      <v-select class="select-size-md mt-1" v-model="mail.branch_id" id="branch"
                        placeholder="Select an option" label="name" :options="branches" />
                      <b-form-invalid-feedback class="d-flex">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Subject *">
                    <!-- <b-form-input ref="input-lead" autofocus v-if="!emailViewData.parent" placeholder="Enter Subject" v-model="emailViewData.subject"
                      type="text" /> -->
                    <b-form-input ref="input-lead" autofocus  v-if="emailViewData.parent" placeholder="Enter Subject"
                      v-model="mail.subject" type="text" />



                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>

                <b-col md="12">
                  <b-form-group label="Description">
                    <quill-editor style="height: 13rem;"  v-model="mail.description"
                      :options="editorOption"></quill-editor>
                    <!-- <quill-editor v-if="emailViewData.parent"
                      v-model="emailViewData.parent.message"
                      :options="editorOption">


                    </quill-editor> -->
                    <!-- <div v-if="emailViewData.parent"  v-html="emailViewData.parent.message"></div>
              <div v-if="!emailViewData.parent" style="width: 80%;" v-html="emailViewData.message"></div> -->
                    <!-- <feather-icon id="content" class="cursor-pointer" size="20" icon="MoreHorizontalIcon" @click="show_message()"></feather-icon>
                <div id="show-message" style="display: none;">
                  <div class="d-flex">

                    <iframe  v-if="emailViewData.parent" style="width: 100%; " :srcdoc="emailViewData.parent.message" frameborder="0"></iframe>
                    <iframe  v-if="!emailViewData.parent" :srcdoc="emailViewData.message" style="width: 100%;" frameborder="0"></iframe>
                    <feather-icon id="hide-content" size="20" class="mt-1 cursor-pointer" icon="TrashIcon" @click="hide_message()"></feather-icon>
                  </div>

                </div> -->


                    <!-- <quill-editor  v-model="message">
                
              </quill-editor> -->
                    <!-- <quill-editor id="quil-content" v-model="composeData.message" :options="editorOption" />
        <div id="quill-toolbar" class="d-flex border-bottom-0">
          <button class="ql-bold" />
          <button class="ql-italic" />
          <button class="ql-underline" />
          <button class="ql-align" />
          <button class="ql-link" />
        </div> -->


                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <b-form-group label="Assignee" label-for="assignee">
                    <v-select class="select-size-md mt-1" multiple v-model="formData.users" id="assignee"
                      placeholder="Select an option" label="name" :options="allUsers">
                      <template #list-header class="add_users">
                        <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-user>
                          <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Employee</a>
                        </div>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <!-- <InviteUser /> -->
                <b-col md="4">
                  <validation-provider #default="{ errors }" name="priority" vid="priority" rules="required">

                    <b-form-group label="Priority *" label-for="priority">
                      <v-select id="priority" v-model="mail.priority" class="select-size-md mt-1"
                        placeholder="Select an option" label="id" :options="importance.slice().reverse()">
                        <template #option="{ id, icon }">
                          <div v-if="(id === 1)">

                            <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Lowest
                          </div>
                          <div v-if="(id === 2)">

                            <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Low
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(id === 3)">

                            <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Medium
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>

                          <div v-if="(id === 4)">

                            <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />High
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(id === 5)">

                            <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16"
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

                        <template #selected-option="{ id, icon }">
                          <div v-if="(mail.priority.id === id && id === 1)">

                            <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Lowest
                          </div>
                          <div v-if="(mail.priority.id === id && id === 2)">

                            <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Low
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(mail.priority.id === id && id === 3)">

                            <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Medium
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>

                          <div v-if="(mail.priority.id === id && id === 4)">

                            <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />High
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(mail.priority.id === id && id === 5)">

                            <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16"
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
                      <b-form-invalid-feedback class="d-flex">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="4">
                  <validation-provider #default="{ errors }" name="due_date" vid="due_date" rules="required">
                    <b-form-group label="Due Date *"  label-for="Due Date">
                      <VueDatePicker format="DD-MM-YYYY" class="mt-1" v-model="mail.due_date" :minDate="currentDate" style="border:1px solid #d8d6de;border-radius: 0.357rem;" />
                      <!-- <flat-pickr placeholder="Due Date" id="due_date" :state="errors.length > 0 ? false : null" autofocus
                        class="form-control mt-1" v-model="mail.due_date" /> -->
                      <b-form-invalid-feedback class="d-flex">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <div style="display: none;" id="sub-tasks-container">

                <b-row class="d-flex justify-content-between align-items-center mb-1 mr-1 "
                  style="padding: 0.5rem; margin-left:0.5rem;border-bottom:1px solid #f65948">
                  <!-- <div class="header d-flex justify-content-between" style="border-color:#f65948"> -->
                  <span class=" text-uppercase">
                    Sub-tasks
                  </span>
                  <!-- <div> -->
                   <b-button size="sm" @click="showTemplatesTodo()" variant="primary">{{ textHeader }}</b-button>
                  <!-- </div> -->
                  <!-- </div> -->
                  <!-- </b-row>
  
<validation-observer #default="{handleSubmit}" ref="refFormObserver">
<b-form @submit.prevent="handleSubmit()"> -->
                </b-row>
                <div style="display: none;" id="sub-tasks-templates">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width: 92.5%;">Template Name</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in subtaskTemplates" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>
                           <b-button size="sm" @click="chooseTemplates(item)" variant="primary">
                            Choose
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="sub-tasks-form">

                  <b-row class="mb-1">
                    <b-col md="12" class="d-flex">
                      <div style="width: 60%;">

                        <validation-provider #default="validationContext" name="default_todo" vid="default_todo" rules="">
                          <b-form-group>
                            <Mentionable style="width: 100%;" :keys="['@']" :items="users_to_assign" offset="6"
                              insert-space @open="onOpen" @apply="onApply">
                              <b-form-input v-model.trim="default_todo[0]"
                                placeholder="Enter sub-task steps and assign @someone" />
                              <b-form-invalid-feedback class="d-block">
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                              <div class="text-right">

                                 <b-button size="sm"   variant="primary" @click="repeatAgain">
                                  Add more
                                </b-button>
                              </div>
                              <!-- <option v-if="search != null && search != ''" value="">hh</option> -->
                              <!-- <datalist  id="my-list-id"> -->

                              <!-- <option v-for="size in sizes">{{ size }}</option> -->
                              <!-- </datalist> -->
                              <template #no-result>
                                <div class="dim">
                                  No result
                                </div>
                              </template>

                              <template #item-@="{ item }">
                                <div class="user">
                                  <b-avatar :src="item.avatar">

                                  </b-avatar>
                                  <span class="ml-1">
                                    {{ item.value }}
                                    <!-- ({{ item.name }}) -->
                                  </span>
                                </div>
                              </template>
                            </Mentionable>

                          </b-form-group>
                        </validation-provider>
                      </div>
                      <!-- <div style="padding-left: 4rem;width: 50%;">
                        <div class="border-l" style="">
                          <div class="d-flex flex-column">
                            <div
                              class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                              <div>Attachment(s)</div>
                              <div>
                                <input type="file" ref="file_task2" style="display: none" />
                                <b-dropdown id="file_drop" class="" style="width:50%;" variant="primary">
                                  <template #button-content>
                                    <span class="text-capitalize">

                                      Choose File(s)
                                    </span>
                                  </template>
                                  <b-dropdown-item @click="$refs.file_task2.click()"><img class="mr-1" :src="browseIcon"
                                      width="25px">Browse</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="excelIcon" width="25px" data-type="1">Google
                                    Sheets</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="wordIcon" width="25px" data-type="2">Google
                                    Docs</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="slideIcon" width="25px" data-type="3">Google
                                    Slides</b-dropdown-item>

               
                                </b-dropdown>

                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center p-1">
                            <div v-if="file_name.length > 0">{{ file_name }}</div>
                            <div v-else>No file(s) selected</div>
                            <b-media-aside class="mr-0">
                              <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64"
                                ref="refPreviewEl" v-model="image" :src="previewImage" height="40" width="40"
                                rounded="circle" class=" border border-l" />

                            </b-media-aside>
                          </div>
                        </div>
                      </div> -->
                    </b-col>

                  </b-row>
                  <b-row class="mb-1 mt-1" v-for="(item, index) in todo_field" :id="item.id" :key="item.id">
                    <b-col md="12" class="d-flex">
                      <!-- <div  ref="row" class="mb-1"
   > -->
                      <div style="width:60%">

                        <validation-provider #default="validationContext" name="additional_todo" vid="additional_todo"
                          rules="">
                          <Mentionable style="width: 100%;" :keys="['@']" :items="users_to_assign" offset="6" insert-space
                            @open="onOpen" @apply="onApply">
                            <b-form-input placeholder="Enter sub-task steps and assign @someone"
                              v-model="additional_todo[index]" />
                            <b-form-invalid-feedback class="d-block">
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                            <div class="text-right">

                               <b-button size="sm"   variant="outline-primary" @click="removeItem(index)">
                                Remove
                              </b-button>
                            </div>
                            <template #no-result>
                              <div class="dim">
                                No result
                              </div>
                            </template>

                            <template #item-@="{ item }">
                              <div class="user">
                                <b-avatar :src="item.avatar">

                                </b-avatar>
                                <span class="ml-1">
                                  {{ item.value }}
                                  <!-- ({{ item.name }}) -->
                                </span>
                              </div>
                            </template>
                          </Mentionable>
                        </validation-provider>
                      </div>
                      <!-- <div style="padding-left: 4rem;width: 50%;">
                        <div class="border-l" style="">
                          <div class="d-flex flex-column">
                            <div
                              class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                              <div>Attachment(s)</div>
                              <div>
                                <input type="file" ref="file_task3" style="display: none" />
                                <b-dropdown id="file_drop" class="" style="width:50%;" variant="primary">
                                  <template #button-content>
                                    <span class="text-capitalize">

                                      Choose File(s)
                                    </span>
                                  </template>
                                  <b-dropdown-item @click="$refs.file_task3.click()"><img class="mr-1" :src="browseIcon"
                                      width="25px">Browse</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="excelIcon" width="25px" data-type="1">Google
                                    Sheets</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="wordIcon" width="25px" data-type="2">Google
                                    Docs</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="slideIcon" width="25px" data-type="3">Google
                                    Slides</b-dropdown-item>

             
                                </b-dropdown>

                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center p-1">
                            <div v-if="file_name.length > 0">{{ file_name }}</div>
                            <div v-else>No file(s) selected</div>
                            <b-media-aside class="mr-0">
                              <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64"
                                ref="refPreviewEl" v-model="image" :src="previewImage" height="40" width="40"
                                rounded="circle" class=" border border-l" />

                            </b-media-aside>
                          </div>
                        </div>
                      </div> -->
                      <!-- </div> -->
                    </b-col>
                  </b-row>
                </div>

                <!-- </b-row> -->
                <!-- </b-form> -->
                <!-- </validation-observer> -->

              </div>
              <div style="display: none;" id="attachments-container">
                <b-row class=" mb-1  mr-1" style="padding: 0.5rem; margin-left:0.5rem; border-bottom:1px solid #f65948;">
                  <span class="text-uppercase">
                    Attachments
                  </span>

                </b-row>
                <div class="border-l" style="width: 40%;">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                      <div>Attachment(s)</div>
                      <div>
                        <input type="file" multiple ref="file_task" @change="uploadFile" style="display: none" />
                        <b-dropdown id="file_drop" class="" style="width:50%;" variant="primary">
                          <template #button-content>
                            <span class="text-capitalize">

                              Choose File(s)
                            </span>
                          </template>
                          <b-dropdown-item @click="$refs.file_task.click()"><img class="mr-1" :src="browseIcon"
                              width="25px">Browse</b-dropdown-item>
                          <b-dropdown-item><img class="mr-1" :src="excelIcon" width="25px" data-type="1">Google
                            Sheets</b-dropdown-item>
                          <b-dropdown-item><img class="mr-1" :src="wordIcon" width="25px" data-type="2">Google
                            Docs</b-dropdown-item>
                          

                          <!-- <b-dropdown-item>

</b-dropdown-item> -->
                        </b-dropdown>

                      </div>
                    </div>
                  </div>
                  <div class="p-1">
                    <div class="d-flex justify-content-center" v-if="attachmentLoading">
                      <b-spinner variant="primary" />
                    </div>
                    <div v-else-if="fileData.length">
                      <div v-for="(file, index) in fileData" :key="index" class="d-flex justify-content-between">{{
                        file.fileName }} <feather-icon icon="XIcon" class="cursor-pointer"
                          @click="removes3(file.url , index)" /></div>
                    </div>
                    <div v-else class="d-flex justify-content-center align-items-center">No file(s) selected
                    </div>

                  </div>
                </div>
              </div>

              <div class="text-right mt-1">
                 <b-button size="sm" @click="toggleAttach()" class="mr-1" variant="primary">{{ textAttach }}</b-button>
                 <b-button size="sm" @click="toggleAddTodo()" class="mr-1" variant="primary">{{ textTodo }}</b-button>

                 <b-button size="sm" variant="primary" type="submit">
                  Create
                  <b-spinner small class="ml-1" v-if="$store.state.leads.isSidebarLoading" />
                </b-button>
              </div>
            </b-form>
          </validation-observer>
          <!-- </b-card-body> -->
        </b-modal>
        <b-modal no-close-on-backdrop id="comment-modal" ref="comment-modal" size="md" title="Mail to comment"
          hide-footer>
          <!-- <b-card-body> -->
          <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(mailToComment)">
              <b-row>
                <b-col md="12">
                  <validation-provider #default="validationContext" name="mail_comment" vid="mail_comment"
                    rules="required">

                    <b-form-group label="Task/Lead">
                      <v-select id="mail_comment" v-model="mail_comment" placeholder="Search tasks/leads"
                        :options="allTasks" label="subject">

                        <template #option="item">
                          <!-- {{setType()}} -->
                          <div class="d-flex justify-content-between">

                            #{{ item.id }} - {{ item.subject }}
                            <div>
                              <b-badge v-if="item.status_master.type == 'open'" :variant="'primary'">
                                {{ item.status_master.type }}
                              </b-badge>
                            </div>
                          </div>
                        </template>
                        <template #selected-option="item">
                          <div class="d-flex justify-content-between">

                            #{{ item.id }} - {{ item.subject }}
                            <div class="select-option-right">
                              <b-badge v-if="item.status_master.type == 'open'" :variant="'primary'">
                                {{ item.status_master.type }}
                              </b-badge>
                            </div>
                          </div>
                        </template>
                      </v-select>
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                </b-col>
              </b-row>
              <div v-if="mail_comment != null">
                <div class="p-1 d-flex  bg-light">
                  <b-col md="3">
                    <b>Client Name</b>
                  </b-col>
                  <b-col md="3">
                    <!-- <b>Dev</b> -->
                    {{mail_comment.companys != null ? mail_comment.companys.name : '-'}}
                  </b-col>
                  <b-col md="3">
                    <b>Contact </b>
                  </b-col>
                  <b-col md="3">
                    {{mail_comment.contact_person != null ? mail_comment.contact_person.name : '-'}}
                  </b-col>
                </div>
              </div>

              <div class="text-right mt-1">

                <!--  <b-button size="sm" variant="primary" class="mr-1">Cancel</b-button> -->
                 <b-button size="sm" type="submit" variant="primary">Add</b-button>
              </div>
            </b-form>
          </validation-observer>
        </b-modal>




        <b-modal no-close-on-backdrop id="mail-to-task" ref="mail-to-task" size="lg" title="Mail to Task" hide-footer>
          <!-- <b-card-body> -->
          <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

            <b-form @submit.prevent="handleSubmit(mail_to_task(emailViewData))">



              <b-row>
                <b-col :md="setMd(branches.length)">
                  <validation-provider #default="validationContext" name="contact people" vid="contact" rules="required">

                  <b-form-group label="Contact People *" label-for="contact">
                    <v-select class="select-size-md mt-1" v-model="contact_person_id" id="contact"
                      placeholder="Select an option" label="name" :options="contactPeople">
                      <template #list-header class="add_contacts">
                        <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                          <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Contact
                          </a>


                        </div>
                      </template>
                    </v-select>
                    <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                        <!-- {{ validationContext.errors[0] }} -->
                        This field is required
                      </b-form-invalid-feedback>
                  </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- <CreateContactLead /> -->

                <b-col :md="setMd(branches.length)">
                  <validation-provider #default="validationContext" name="client_id" vid="clients" rules="required">

                    <b-form-group label="Clients *" label-for="clients">
                      <v-select class="select-size-md mt-1" v-model="mail.company_id" id="clients"
                        placeholder="Select an option" label="name" :options="clients">
                        <template #list-header class="add_clients">
                          <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                            <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                            <a href="#">
                              <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Client</a>
                          </div>
                        </template>
                      </v-select>
                      <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                        <!-- {{ validationContext.errors[0] }} -->
                        This field is required
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- <CreateClientLead /> -->

                <b-col :md="setMd(branches.length)">
                  <b-form-group label="Category" label-for="category">
                    <v-select class="select-size-md mt-1" v-model="mail.category_id" id="category"
                      placeholder="Select an option" label="name" @input="categoryUser" :options="categories" />
                  </b-form-group>
                </b-col>
                <b-form-input hidden v-if="branches.length == 1" id="branches" :value="branches[0].id" />
                <b-col :md="setMd(branches.length)" v-if="(branches.length > 1)">
                  <validation-provider #default="{ errors }" name="branch_id" vid="branch" rules="required">
                    <b-form-group label="Branches *" label-for="branch">
                      <v-select class="select-size-md mt-1" v-model="mail.branch_id" id="branch"
                        placeholder="Select an option" label="name" :options="branches" />
                      <b-form-invalid-feedback class="d-flex">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Subject *">
               
                    <b-form-input ref="input-task"  placeholder="Enter Subject"
                      v-model="mail.subject" type="text" />



                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>

                <b-col md="12">
                  <b-form-group label="Description">
                    <quill-editor style="height: 13rem;"  v-model="mail.description"
                      :options="editorOption"></quill-editor>
                   
                    <!-- <div v-if="emailViewData.parent"  v-html="emailViewData.parent.message"></div>
              <div v-if="!emailViewData.parent" style="width: 80%;" v-html="emailViewData.message"></div> -->
                    <!-- <feather-icon id="content" class="cursor-pointer" size="20" icon="MoreHorizontalIcon" @click="show_message()"></feather-icon>
                <div id="show-message" style="display: none;">
                  <div class="d-flex">

                    <iframe  v-if="emailViewData.parent" style="width: 100%; " :srcdoc="emailViewData.parent.message" frameborder="0"></iframe>
                    <iframe  v-if="!emailViewData.parent" :srcdoc="emailViewData.message" style="width: 100%;" frameborder="0"></iframe>
                    <feather-icon id="hide-content" size="20" class="mt-1 cursor-pointer" icon="TrashIcon" @click="hide_message()"></feather-icon>
                  </div>

                </div> -->


                    <!-- <quill-editor  v-model="message">
                
              </quill-editor> -->
                    <!-- <quill-editor id="quil-content" v-model="composeData.message" :options="editorOption" />
        <div id="quill-toolbar" class="d-flex border-bottom-0">
          <button class="ql-bold" />
          <button class="ql-italic" />
          <button class="ql-underline" />
          <button class="ql-align" />
          <button class="ql-link" />
        </div> -->


                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="3">
                  <b-form-group label="Assignee" label-for="assignee">
                    <v-select class="select-size-md mt-1" multiple v-model="formData.users" id="assignee"
                      placeholder="Select an option" label="name" :options="allUsers">
                      <template #list-header class="add_users">
                        <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-user>
                          <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Employee</a>
                        </div>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <!-- <InviteUser /> -->
                <b-col md="3">
                  <validation-provider #default="{ errors }" name="priority" vid="priority" rules="required">

                    <b-form-group label="Priority *" label-for="priority">
                      <v-select id="priority" v-model="mail.priority" class="select-size-md mt-1"
                        placeholder="Select an option" label="id" :options="importance.slice().reverse()">
                        <template #option="{ id, icon }">
                          <div v-if="(id === 1)">

                            <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Lowest
                          </div>
                          <div v-if="(id === 2)">

                            <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Low
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(id === 3)">

                            <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Medium
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>

                          <div v-if="(id === 4)">

                            <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />High
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(id === 5)">

                            <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16"
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

                        <template #selected-option="{ id, icon }">
                          <div v-if="(mail.priority.id === id && id === 1)">

                            <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Lowest
                          </div>
                          <div v-if="(mail.priority.id === id && id === 2)">

                            <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Low
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(mail.priority.id === id && id === 3)">

                            <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />Medium
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>

                          <div v-if="(mail.priority.id === id && id === 4)">

                            <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16"
                              class="align-middle mr-50" />High
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                            <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          </div>
                          <div v-if="(mail.priority.id === id && id === 5)">

                            <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16"
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
                      <b-form-invalid-feedback class="d-flex">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="3">
                  <validation-provider #default="{ errors }" name="due_date" vid="due_date" rules="required">
                    <b-form-group label="Due Date *" label-for="Due Date">
                      <VueDatePicker format="DD-MM-YYYY" class="mt-1" v-model="mail.due_date" :minDate="currentDate" style="border:1px solid #d8d6de;border-radius: 0.357rem;" />

                      <!-- <flat-pickr id="due_date" :state="errors.length > 0 ? false : null" autofocus :config="{ minDate: 'today', altInput: false }"
                        class="form-control mt-1" placeholder="Due Date" v-model="mail.due_date" /> -->
                      <b-form-invalid-feedback class="d-flex">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="3">
                  <validation-provider #default="{ errors }" name="amount" vid="value" rules="required">

                  <b-form-group label="Value *">
                    <b-form-input v-model.number="mail.amount" type="number" placeholder="Value"></b-form-input>
                    <b-form-invalid-feedback class="d-flex">
                      {{errors[0]}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <div style="display: none;" id="sub-tasks-container">

                <b-row class="d-flex justify-content-between align-items-center mb-1 mr-1 "
                  style="padding: 0.5rem; margin-left:0.5rem;border-bottom:1px solid #f65948">
                  <!-- <div class="header d-flex justify-content-between" style="border-color:#f65948"> -->
                  <span class=" text-uppercase">
                    Sub-tasks
                  </span>
                  <!-- <div> -->
                   <b-button size="sm" @click="showTemplatesTodo()" variant="primary">{{ textHeader }}</b-button>
                  <!-- </div> -->
                  <!-- </div> -->
                  <!-- </b-row>
  
<validation-observer #default="{handleSubmit}" ref="refFormObserver">
<b-form @submit.prevent="handleSubmit()"> -->
                </b-row>
                <div style="display: none;" id="sub-tasks-templates">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width: 92.5%;">Template Name</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in subtaskTemplates" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>
                           <b-button size="sm" @click="chooseTemplates(item)" variant="primary">
                            Choose
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="sub-tasks-form">

                  <b-row class="mb-1">
                    <b-col md="12" class="d-flex">
                      <div style="width: 60%;">

                        <validation-provider #default="validationContext" name="default_todo" vid="default_todo" rules="">
                          <b-form-group>
                            <Mentionable style="width: 100%;" :keys="['@']" :items="users_to_assign" offset="6"
                              insert-space @open="onOpen" @apply="onApply">
                              <b-form-input v-model.trim="default_todo[0]"
                                placeholder="Enter sub-task steps and assign @someone" />
                              <b-form-invalid-feedback class="d-block">
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                              <div class="text-right">

                                 <b-button size="sm"   variant="primary" @click="repeatAgain">
                                  Add more
                                </b-button>
                              </div>
                              <!-- <option v-if="search != null && search != ''" value="">hh</option> -->
                              <!-- <datalist  id="my-list-id"> -->

                              <!-- <option v-for="size in sizes">{{ size }}</option> -->
                              <!-- </datalist> -->
                              <template #no-result>
                                <div class="dim">
                                  No result
                                </div>
                              </template>

                              <template #item-@="{ item }">
                                <div class="user">
                                  <b-avatar :src="item.avatar">

                                  </b-avatar>
                                  <span class="ml-1">
                                    {{ item.value }}
                                    <!-- ({{ item.name }}) -->
                                  </span>
                                </div>
                              </template>
                            </Mentionable>

                          </b-form-group>
                        </validation-provider>
                      </div>
                      <!-- <div style="padding-left: 4rem;width: 50%;">
                        <div class="border-l" style="">
                          <div class="d-flex flex-column">
                            <div
                              class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                              <div>Attachment(s)</div>
                              <div>
                                <input type="file" ref="file_task2" style="display: none" />
                                <b-dropdown id="file_drop" class="" style="width:50%;" variant="primary">
                                  <template #button-content>
                                    <span class="text-capitalize">

                                      Choose File(s)
                                    </span>
                                  </template>
                                  <b-dropdown-item @click="$refs.file_task2.click()"><img class="mr-1" :src="browseIcon"
                                      width="25px">Browse</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="excelIcon" width="25px" data-type="1">Google
                                    Sheets</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="wordIcon" width="25px" data-type="2">Google
                                    Docs</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="slideIcon" width="25px" data-type="3">Google
                                    Slides</b-dropdown-item>

                        
                                </b-dropdown>

                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center p-1">
                            <div v-if="file_name.length > 0">{{ file_name }}</div>
                            <div v-else>No file(s) selected</div>
                            <b-media-aside class="mr-0">
                              <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64"
                                ref="refPreviewEl" v-model="image" :src="previewImage" height="40" width="40"
                                rounded="circle" class=" border border-l" />

                            </b-media-aside>
                          </div>
                        </div>
                      </div> -->
                    </b-col>

                  </b-row>
                  <b-row class="mb-1 mt-1" v-for="(item, index) in todo_field" :id="item.id" :key="item.id">
                    <b-col md="12" class="d-flex">
                      <!-- <div  ref="row" class="mb-1"
   > -->
                      <div style="width:60%">

                        <validation-provider #default="validationContext" name="additional_todo" vid="additional_todo"
                          rules="">
                          <Mentionable style="width: 100%;" :keys="['@']" :items="users_to_assign" offset="6" insert-space
                            @open="onOpen" @apply="onApply">
                            <b-form-input placeholder="Enter sub-task steps and assign @someone"
                              v-model="additional_todo[index]" />
                            <b-form-invalid-feedback class="d-block">
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                            <div class="text-right">

                               <b-button size="sm"   variant="outline-primary" @click="removeItem(index)">
                                Remove
                              </b-button>
                            </div>
                            <template #no-result>
                              <div class="dim">
                                No result
                              </div>
                            </template>

                            <template #item-@="{ item }">
                              <div class="user">
                                <b-avatar :src="item.avatar">

                                </b-avatar>
                                <span class="ml-1">
                                  {{ item.value }}
                                  <!-- ({{ item.name }}) -->
                                </span>
                              </div>
                            </template>
                          </Mentionable>
                        </validation-provider>
                      </div>
                      <!-- <div style="padding-left: 4rem;width: 50%;">
                        <div class="border-l" style="">
                          <div class="d-flex flex-column">
                            <div
                              class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                              <div>Attachment(s)</div>
                              <div>
                                <input type="file" ref="file_task3" style="display: none" />
                                <b-dropdown id="file_drop" class="" style="width:50%;" variant="primary">
                                  <template #button-content>
                                    <span class="text-capitalize">

                                      Choose File(s)
                                    </span>
                                  </template>
                                  <b-dropdown-item @click="$refs.file_task3.click()"><img class="mr-1" :src="browseIcon"
                                      width="25px">Browse</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="excelIcon" width="25px" data-type="1">Google
                                    Sheets</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="wordIcon" width="25px" data-type="2">Google
                                    Docs</b-dropdown-item>
                                  <b-dropdown-item><img class="mr-1" :src="slideIcon" width="25px" data-type="3">Google
                                    Slides</b-dropdown-item>

                
                                </b-dropdown>

                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center p-1">
                            <div v-if="file_name.length > 0">{{ file_name }}</div>
                            <div v-else>No file(s) selected</div>
                            <b-media-aside class="mr-0">
                              <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64"
                                ref="refPreviewEl" v-model="image" :src="previewImage" height="40" width="40"
                                rounded="circle" class=" border border-l" />

                            </b-media-aside>
                          </div>
                        </div>
                      </div> -->
                      <!-- </div> -->
                    </b-col>
                  </b-row>
                </div>

                <!-- </b-row> -->
                <!-- </b-form> -->
                <!-- </validation-observer> -->

              </div>
              <div style="display: none;" id="attachments-container">
                <b-row class=" mb-1  mr-1" style="padding: 0.5rem; margin-left:0.5rem; border-bottom:1px solid #f65948;">
                  <span class="text-uppercase">
                    Attachments
                  </span>

                </b-row>
                <div class="border-l" style="width: 40%;">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                      <div>Attachment(s)</div>
                      <div>
                        <input type="file" multiple ref="file_task" @change="uploadFile" style="display: none" />
                        <b-dropdown id="file_drop" class="" style="width:50%;" variant="primary">
                          <template #button-content>
                            <span class="text-capitalize">

                              Choose File(s)
                            </span>
                          </template>
                          <b-dropdown-item @click="$refs.file_task.click()"><img class="mr-1" :src="browseIcon"
                              width="25px">Browse</b-dropdown-item>
                          <b-dropdown-item><img class="mr-1" :src="excelIcon" width="25px" data-type="1">Google
                            Sheets</b-dropdown-item>
                          <b-dropdown-item><img class="mr-1" :src="wordIcon" width="25px" data-type="2">Google
                            Docs</b-dropdown-item>
                       

                          <!-- <b-dropdown-item>

</b-dropdown-item> -->
                        </b-dropdown>

                      </div>
                    </div>
                  </div>
                  <div class="p-1">
                    <div class="d-flex justify-content-center" v-if="attachmentLoading">
                      <b-spinner variant="primary" />
                    </div>
                    <div v-else-if="fileData.length">

                      <div v-for="(file, index) in fileData" :key="index" class="d-flex justify-content-between">{{
                        file.fileName }} <feather-icon icon="XIcon" class="cursor-pointer"
                          @click="removes3(file.url, index)" /></div>
                    </div>
                    <div v-else class="d-flex justify-content-center align-items-center">No file(s) selected
                    </div>

                  </div>
                </div>
              </div>
              <div class="text-right ">
                 <b-button size="sm" @click="toggleAttach()" class="mr-1" variant="primary">{{ textAttach }}</b-button>
                 <b-button size="sm" @click="toggleAddTodo()" class="mr-1" variant="primary">{{ textTodo }}</b-button>
                 <b-button size="sm" variant="primary" type="submit">
                  Create
                  <b-spinner small class="ml-1" v-if="$store.state.tasks.isSidebarLoading" />

                  <!-- <b-spinner small class="ml-1" v-if="contactIsLoading"/> -->
                </b-button>
              </div>
            </b-form>
          </validation-observer>
          <!-- </b-card-body> -->
        </b-modal>

        <!-- modal backdrop -->

        <!-- Mark Starred -->
        <feather-icon v-b-tooltip.hover.top="'Add Star'" icon="StarIcon" size="17" class="cursor-pointer"
          :class="{ 'text-warning fill-current': emailViewData.parent ? emailViewData.parent.isStarred == true : false }"
          @click="$emit('toggle-email-starred')" />

        <!-- Move email to folder -->
        <!-- <b-dropdown
          variant="link"
          no-caret
          toggle-class="p-0"
          right
          class="ml-75"
        >
          <template #button-content>
            <feather-icon
              icon="FolderIcon"
              size="17"
            />
          </template>

          <b-dropdown-item @click="$emit('move-email-to-folder', 'draft')">
            <feather-icon icon="Edit2Icon" />
            <span class="align-middle ml-50">Draft</span>
          </b-dropdown-item>

          <b-dropdown-item @click="$emit('move-email-to-folder', 'spam')">
            <feather-icon icon="InfoIcon" />
            <span class="align-middle ml-50">Spam</span>
          </b-dropdown-item>

          <b-dropdown-item
            v-show="$route.params.folder !== 'trash'"
            @click="$emit('move-email-to-folder', 'trash')"
          >
            <feather-icon icon="TrashIcon" />
            <span class="align-middle ml-50">Trash</span>
          </b-dropdown-item>
        </b-dropdown> -->

        <!-- Update Label -->
        <!-- <b-dropdown
          variant="link"
          no-caret
          toggle-class="p-0"
          class="ml-75"
          right
        >
          <template #button-content>
            <feather-icon
              icon="TagIcon"
              size="17"
              class="align-middle text-body"
            />
          </template>
          <b-dropdown-item @click="$emit('update-email-label', 'personal')">
            <span class="mr-50 bullet bullet-success bullet-sm" />
            <span>Personal</span>
          </b-dropdown-item>
          <b-dropdown-item @click="$emit('update-email-label', 'company')">
            <span class="mr-50 bullet bullet-primary bullet-sm" />
            <span>Company</span>
          </b-dropdown-item>
          <b-dropdown-item @click="$emit('update-email-label', 'important')">
            <span class="mr-50 bullet bullet-warning bullet-sm" />
            <span>Important</span>
          </b-dropdown-item>
          <b-dropdown-item @click="$emit('update-email-label', 'private')">
            <span class="mr-50 bullet bullet-danger bullet-sm" />
            <span>Private</span>
          </b-dropdown-item>
        </b-dropdown> -->

        <!-- Mark Un-Read -->
        <feather-icon v-b-tooltip.hover.top="'Mark as unread'" icon="MailIcon" class="ml-75 cursor-pointer" size="17"
          @click="$emit('mark-email-unread')" />

        <!-- Move to Trash -->
        <feather-icon v-b-tooltip.hover.top="'Trash'" v-show="$route.params.folder !== 'trash'" icon="TrashIcon"
          class="ml-75 cursor-pointer" size="17" @click="markEmails('trash')" />
        <feather-icon v-b-tooltip.hover.top="'Report Spam'" v-show="$route.params.folder !== 'spam'"
          icon="AlertCircleIcon" class="ml-75 cursor-pointer" size="17" @click="markEmails('spam')" />

        <!-- <feather-icon v-b-tooltip.hover.top="'Not Spam'" v-show="$route.params.folder == 'spam'" icon="AlertCircleIcon" class="ml-75 cursor-pointer" size="17"
          @click="markNotSpam('spam')" /> -->
        <span @click="markNotSpam('spam')" v-b-tooltip.hover.top="'Not Spam'" v-show="$route.params.folder == 'spam'"
          class=" cursor-pointer">
          Not Spam
        </span>

        <!-- Show Previous Mail -->
        <feather-icon :icon="$store.state.appConfig.isRTL ? 'ChevronRightIcon' : 'ChevronLeftIcon'" size="17"
          class="ml-75 cursor-pointer" :class="{ 'text-muted pointer-events-none': !opendedEmailMeta.hasPreviousEmail }"
          @click="$emit('change-opened-email', 'previous')" />

        <!-- Show Next Mail -->
        <feather-icon :icon="$store.state.appConfig.isRTL ? 'ChevronLeftIcon' : 'ChevronRightIcon'" size="17"
          class="ml-75 cursor-pointer" :class="{ 'text-muted pointer-events-none': !opendedEmailMeta.hasNextEmail }"
          @click="markasRead()" />
      </div>
    </div>

    <!-- Email Details -->
    <vue-perfect-scrollbar :settings="perfectScrollbar" class="email-scroll-area scroll-area">

      <!-- Label Row -->
      <b-row>
        <b-col cols="12">
          <div class="email-label">
            <!-- <b-badge
              v-for="(label) in emailViewData.labels"
              :key="label"
              pill
              class="text-capitalize mr-50"
              :variant="`light-${resolveLabelColor(emailViewData.label)}`"
            > -->
            <!-- <b-badge
              
              pill
              class="text-capitalize mr-50"
              :variant="`light-${resolveLabelColor(emailViewData.label)}`"
            >
              {{ emailViewData.label }}
            </b-badge> -->
          </div>
        </b-col>
      </b-row>

      <!-- Action: Show Earlier Message -->
      <!-- <b-row
        v-if="!showWholeThread && emailViewData.replies && emailViewData.replies.length"
        class="mb-1"
      > -->
      <!-- <b-row v-if="!showThread && emailViewData.childs && emailViewData.childs.length" class="mb-1">
        <b-col cols="12">
          <b-link class="font-weight-bold" @click="showThreads()">
            View {{ emailViewData.childs.length }} Earlier Message{{ emailViewData.childs.length > 1 ? 's' : '' }}
          </b-link>
        </b-col>
      </b-row> -->

      <!-- Earlier Email Messages -->
      <!-- <template v-if="showThread"> -->
      <span class="d-none" v-if="emailViewData.parent">

        {{ emailViewData.contact_person_id }}
      </span>
      <template v-if="emailViewData.childs">


        <b-row v-for="threadMail in emailViewData.childs.slice().reverse()" :key="threadMail.id">
          <!-- <b-row> -->

          <b-col cols="12">

            <email-message-card :initialHeight="'0px'" :message="threadMail" />
          </b-col>
          <!-- </b-row> -->
        </b-row>
      </template>

      <!-- Email Thread -->
      <b-row>
        <b-col cols="12" v-if="emailViewData.parent">
          <email-message-card :initialHeight="'0px'" :message="emailViewData.parent" />
        </b-col>
        <b-col cols="12" v-if="!emailViewData.parent">
          <email-message-card :initialHeight="'0px'" :message="emailViewData" />
        </b-col>
      </b-row>

      <!-- Email Actions: Reply or Forward -->
      <b-row>
        <b-col cols="12">

          <!-- :shallShowEmailReplyModal.sync="shallShowEmailReplyModal"-->
          <b-card id="reply-div" style="display: none;">
            <email-reply :email-view-data="emailViewData" />

          </b-card>
          <b-card id="forward-div" style="display: none;">
            <email-forward :email-view-data="emailViewData" />

          </b-card>
          <b-card id="reply-button-card">
            <div class="d-flex justify-content-between">
              <h5 class="mb-0">
                Click here to
                <b-link @click="showreply()">Reply</b-link>
                <!-- <b-link @click="">Reply2</b-link> @click="$emit('update:shallshowemailcomposemodal', true); $emit('close-left-sidebar')"-->



                <!-- <b-link >Reply</b-link> -->

                or
                <b-link @click="showforward()">Forward</b-link>

              </h5>
            </div>
          </b-card>
        </b-col>
      </b-row>

    </vue-perfect-scrollbar>


    <!-- <email-compose v-model="shallshowemailcomposemodal" /> -->
  </div>
</template>

<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

import wordIcon from '../../../assets/images/logo/word-icon.png'
import excelIcon from '../../../assets/images/logo/excel-icon.png'
import slideIcon from '../../../assets/images/logo/slide-icon.png'
import browseIcon from '../../../assets/images/logo/browse-icon.png'
import CreateSidebar from '../leads/CreateSidebar.vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import { required, email } from '@validations'
import 'quill/dist/quill.core.css'
// import { mapGetters } from 'vuex'
import "vue-toastification/dist/index.css";

// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import {
  BMediaAside, BImg,BAvatar,
  BDropdown, VBTooltip, BSpinner, BFormInvalidFeedback, BFormDatepicker, BDropdownItem, BRow, BCol, BBadge, BCard, BLink, BButton, BModal, BCardText, VBModal, BCardBody, BForm, BFormGroup, BFormInput,
} from 'bootstrap-vue'
//import { quillEditor } from 'vue-quill-editor'
import flatPickr from 'vue-flatpickr-component'
import { filterTags, formatDateToMonthShort } from '@core/utils/filter'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { computed, ref, watch } from '@vue/composition-api'
import useEmail from './useEmail'
import EmailMessageCard from './EmailMessageCard.vue'
import EmailCompose from './EmailCompose.vue'
import vSelect from 'vue-select'
import leads from '@/api/leads';
import emailReply from './emailReply.vue'
import emailForward from './emailForward.vue'

import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import CreateContact from '../contact-people/CreateContact.vue'
import CreateContactLead from '../leads/CreateContactLead.vue'
import CreateClientLead from '../leads/CreateClientLead.vue'
import InviteUser from '../users/InviteUser.vue'
import { exit } from 'process'
import store from '@/store'
import router from '@/router'
import { Mentionable } from 'vue-mention'

export default {
  components: {
    // BSV
    Mentionable,
    flatPickr,
    vSelect,BAvatar,
    VueDatePicker,
    BDropdown, BMediaAside, BImg,
    BModal,
    BCardText,
    emailForward,
    BFormDatepicker,
    BDropdownItem,
    BButton,
    BCardBody,
    EmailCompose,
    quillEditor,
    BRow,
    BForm,
    BFormGroup,
    BFormInput,
    BCol,
    BFormInvalidFeedback,
    BBadge,
    BCard,
    BLink,
    ValidationObserver,
    ValidationProvider,
    // 3rd Party
    VuePerfectScrollbar,
    CreateSidebar,
    // SFC
    BSpinner,
    EmailMessageCard,
    emailReply,
    CreateContact,
    CreateContactLead,
    CreateClientLead,
    InviteUser
  },
  data() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return {
      fileData:[],
      formData:{
        users:[],
      },
      mail:{
        subject:'',
        description:'',
        amount:null,
        priority:null,
        due_date:null,
        company_id:null,
        contact_person_id:null,
        branch_id:null,
        category_id:null,
      },
      currentDate: `${year}-${month}-${day}`,
      browseIcon: browseIcon,
      slideIcon: slideIcon,
      wordIcon: wordIcon,
      excelIcon: excelIcon,
      route_name: null,
      todo_field: [],
      nextTodoId: 2,
      file_name: [],
      file_name2: [],
      default_todo: [],
      file: null,
      previewImage: null,
      additional_todo: [],
      subtask_mentions: [],
      amount: 0,
      switchOption: false,
      textAttach: 'Add Attachment(s)',
      textTodo: 'Add Sub-Task',
      textHeader: 'Choose from Templates',

      mail_comment: null,
      h: '',
      d_status: true,
      contact_person_id: null,
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
        },
        placeholder: 'Enter Description',
      },
      search: ''
      // status:0,

    }
  },
  directives: {
    'b-modal': VBModal,
    'b-tooltip': VBTooltip,
  },

  computed: {
    users_to_assign() {
      var items = this.$store.state.users.all.filter(e =>e.email !== JSON.parse(localStorage.getItem('userData')).email);
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
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading;
      return data;
    },
    fileLinks() {
      let data = this.$store.state.attachments.links;
      let attach = []
      let drive_data = this.$store.state.tasks.otherAttachments;
      let mail_attach = []
      // mails attachments
      if(this.emailViewData.childs){
        mail_attach = this.emailViewData.childs[this.emailViewData.childs.length - 1].attachments_file
      }else{
        if(this.emailViewData.parent.attachments_file){

          mail_attach = this.emailViewData.parent.attachments_file 
        }
      }
      mail_attach.forEach(element => {
        attach.push({
          fileName:element.attachment_name,
          url:element.attachment_url,
        })
      });
      // attachments which user will choose
      data.forEach((element,index) => {
        attach.push({
          // id:index+1,
          fileName:element.fileName,
          // url:element.url,
          url:element.url,

          // attachment:null,
        })
      });
      // attachments which are going to save in drive
      drive_data.forEach((element,index) => {
        attach.push({
          fileName:element.original_name,
          url:element.drive_url?element.drive_url:element.attachment,
          // attachment:element.attachment
        })
      });
      this.fileData = attach
      return //attach//{data:data,attachments:attach}
    },
    subtaskTemplates() {

      let data = this.$store.state.subtaskTemplate.all

      return data;
    },
    allTasks() {
      var arr = []
      let leads = this.$store.state.leads.all.filter(e => e.type === 'lead')
      let tasks = this.$store.state.tasks.all.filter(e => e.type === 'task')
      leads.forEach(element => {

        arr.push(element)
      });
      tasks.forEach(element => {

        arr.push(element)
      });
      return arr;
    },
    importance() {
      const importance = [{ id: 1, star: '*' }, { id: 2, star: '* *' }, { id: 3, star: '* * *' }, { id: 4, star: '* * * *' }, { id: 5, star: '* * * * *' }];
      return importance;
    },
    items() {
      return this.$attrs
    },
    categories() {
      return this.$store.state.categories.all
    },
    branches() {
      console.log('Branches:', this.$store.state.branches.all)
      // this.value_of_branches =  this.$store.state.branches.all[0].id
      return this.$store.state.branches.all
    },
    reply_to_email() {
      var email = []
      for (let index = 0; index < this.$store.state.contactPeople.emails.length; index++) {
        // const element = array[index];
        email[index] = {
          email: this.$store.state.contactPeople.emails[index]
        }
      }
      return email;
    },
    clients() {
      var data2 = this.$store.state.contactPeople.allForLeads
      // var check_if_contact_exists = false
      // var index = 0;
      // var status = this.status;
      // let status = 0;
      // filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, ""))
      var name = ''
      if (this.emailViewData.parent) {

        name = filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, "")).trim();
      }
      data2.forEach(element => {
        element.emails.forEach(e => {
          if (this.emailViewData.parent) {

            if (e.email == this.emailViewData.parent.from_email) {

              this.contact_person_id = element
              // if(format == 'lead'){

              //   this.$refs['modal-center'].show()
              // }
              // if(format == 'task'){
              //   this.$refs['mail-to-task'].show()

              // }

              this.status = true

              exit
            }
          }
        });


      });
      return this.$store.state.clients.all
    },
    assignUser(){
      // this.emailViewData.users = []
      // this.emailViewData.users = this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)

    },
    contactPeople() {

      return this.$store.state.contactPeople.allForLeads
    },
    allUsers() {

    
      return this.$store.state.users.all
    },
    singleData() {
      if (this.$store.state.contactPeople.singleData.id) {

        this.emailViewData.contact_person_id = this.$store.state.contactPeople.singleData
        // {
        //   id : this.$store.state.contactPeople.singleData.id,
        //   name : this.$store.state.contactPeople.singleData.name,

        // }
      }
      return this.$store.state.contactPeople.singleData
    }
  },
  props: {
    c_id: {
      type: Number,
      required: true
    },
    c_name: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    isCreateSidebarActive: {
      type: Boolean,
      required: true,
    },
    emailViewData: {
      type: Object,
      required: true,
    },
    opendedEmailMeta: {
      type: Object,
      required: true,
    },
    perfectScrollbar: {
      type: Object,
      required: true,
    },
    showThread: {
      type: Boolean,
      required: true
    },
    shallShowEmailReplyModal: {
      type: Boolean,
      required: true
    }
  },
  // created() {
  //   this._props.emailViewData = { showThreadEmail: false }
  //   this.$store.dispatch('emails/fetch_all_out_mails')

  // },
  mounted() {
    // this.populateContact()

  },
  beforeUpdate() {
    
    const d = this.fileLinks
    if (this.emailViewData) {
      if(this.emailViewData.childs){
      let childs = this.emailViewData.childs[this.emailViewData.childs.length - 1]
      this.mail.subject = childs.subject
      this.mail.description = childs.message
    }else{

      this.mail.subject = this.emailViewData.parent.subject
      this.mail.description = this.emailViewData.parent.message
    }
      // this.emailViewData.users = this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)
      this.mail.due_date = this.currentDate
      this.mail.priority = { id: 3 }
      // this.emailViewData.contact_person_id = {h:null}
    }
  },
  updated() {
    const d = this.fileLinks

    // console.log(this.singleData);
    //   this.c_id = this.singleData.id
    //   this.c_name = this.singleData.name


    // alert(c_name);

  },
  methods: {
    goTo_lead(task) {
      // alert(id);
      // var data = id.split('_');
      // var type = data[0]
      // var ids = data[1]
      if (task.type == 'lead') {

        this.$router.push({

          name: 'leads',
          params: {
            status: 'true',
            lead_id: task.id
          }
        }
        )
      }
      if (task.type == 'task') {

        this.$router.push({

          name: 'tasks',
          params: {
            status: 'true',
            lead_id: task.id
          }
        }
        )
      }
      // router.push('/leads?status=true&lead_id='+id+'');
      console.log(router);
      // this.$store.dispatch('leads/get', id)
    },
    changeStatus(task) {
      if (task.status_master_id === 1) {
        return 'primary';
      } else if (task.status_master_id === 2) {
        return 'success';
      } else if (task.status_master_id === 3) {
        return 'warning';
      }
      else if (task.status_master_id === 4) {
        return 'secondary';
      } else {
        return 'warning';
      }
    },
    toggleAttach() {
      if (this.textAttach == 'Add Attachment(s)') {
        this.textAttach = 'Remove Attachment(s)'
        document.getElementById('attachments-container').style.display = 'block'

      } else {
        document.getElementById('attachments-container').style.display = 'none'
        this.textAttach = 'Add Attachment(s)'

      }
    },
    showTemplatesTodo() {
      if (this.textHeader == 'Choose from Templates') {
        this.textHeader = 'Hide Templates'
        document.getElementById('sub-tasks-form').style.display = 'none'
        document.getElementById('sub-tasks-templates').style.display = 'block'
      } else {
        this.textHeader = 'Choose from Templates'

        document.getElementById('sub-tasks-form').style.display = 'block'
        document.getElementById('sub-tasks-templates').style.display = 'none'

      }

    },
    removes3(file, i) {
      console.log(file,'bbbb')
      var data = {
        attach_url: file ?? "null",
      };
      let index = this.$store.state.attachments.links.findIndex(e => e.url === file)
      let findex = this.$store.state.tasks.otherAttachments.findIndex(e => e.drive_url === file)

      let mindex = 0;
      if(this.emailViewData.childs){
        let childs = this.emailViewData.childs[this.emailViewData.childs.length -1]
        mindex= childs.attachments_file.findIndex(e => e.attachment_url === file)

      }else{

       mindex= this.emailViewData.parent.attachments_file.findIndex(e => e.attachment_url === file)
      }

      this.$store.dispatch('attachments/remove', { data: data }).then(() => {

        this.$store.state.attachments.links.splice(index, 1)
        if(findex != -1)
        {
          this.$store.state.tasks.otherAttachments.splice(findex,1)
        }
        if(this.emailViewData.childs){
          
          let childs = this.emailViewData.childs[this.emailViewData.childs.length -1]
          if(mindex != -1){
            childs.attachments_file.splice(mindex, 1)
          }
        // mindex= childs.attachments_file.findIndex(e => e.attachment_url === file)

      }else{
        if(mindex != -1){
          this.emailViewData.parent.attachments_file.splice(mindex, 1)
          }
      //  mindex= this.emailViewData.parent.attachments_file.findIndex(e => e.attachment_url === file)
      }
        // this.fileData.splice(index,1)
        const d = this.fileLinks
        this.file_name2.splice(i, 1)

      })
    },
    uploadFile(e) {
      console.log(e.target.files)
      let image = e.target.files;
      console.log("e:", e);
      console.log("inside onload before2:", this.file_name)
      image.forEach(x => {

        const reader = new FileReader();
        reader.onload = (e) => {
          let data = {
            file: e.target.result,
            name: x.name
          }
          console.log("data:", data)
          console.log("inside onload before:", this.file_name2)
          this.file_name2.push(data)
          console.log("inside onload:", this.file_name2)
          console.log("inside onload:", this.file_name2.length)
          this.uploadFileS3(this.file_name2)
        }
        reader.readAsDataURL(x)
      })
      e.target.value = ''

    },
    uploadFileS3(file) {
      let data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch('attachments/add', { data: data }).then(() => {

        resolve();

      }).catch(() => {


      })
    },
    chooseTemplates(data) {
      this.default_todo = []
      this.additional_todo = []
      this.todo_field = []
      if (data.subtask_body.length > 0) {
        this.default_todo.push(data.subtask_body[0].steps_body)
        data.subtask_body.forEach(element => {
          if (element.steps_body != this.default_todo[0]) {
            this.repeatAgain();
            this.additional_todo.push(element.steps_body)
          }
        });
        document.getElementById('sub-tasks-templates').style.display = 'none'
        document.getElementById('sub-tasks-form').style.display = 'block'
        this.textHeader = 'Choose from Templates'
      }
    },
    onOpen() {

    },
    onApply(item, key, replacedWith) {

      this.subtask_mentions.push({ id: item.id, name: item.name })
      console.log(item, `has been replaced with ${replacedWith}`)
    },
    repeatAgain() {
      this.add_todo = true,
        this.todo_field.push({
          id: this.nextTodoId += this.nextTodoId,
        })
    },
    removeItem(index) {
      this.todo_field.splice(index, 1)
      this.additional_todo.splice(index, 1)

      // this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    toggleAddTodo() {
      if (this.textTodo == 'Add Sub-Task') {
        this.textTodo = 'Remove Sub-Task'
        document.getElementById('sub-tasks-container').style.display = 'block'

      } else {
        document.getElementById('sub-tasks-container').style.display = 'none'
        this.textTodo = 'Add Sub-Task'

      }
    },
    mailToComment() {
      this.$store.dispatch('comments/mailToComment', {
        payload: {
          task_id: this.mail_comment.id
        },
        id: this.emailViewData.parent.id
      }
      ).then(() => {
        this.$store.dispatch('emails/fetch_emails', {
          currrent: JSON.parse(localStorage.getItem('userData'))
        })
        this.$refs['comment-modal'].hide();
        this.$toast.success('Converted Mail to Comment', {
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
      })
    },
    markasRead() {
      this.$emit('change-opened-email', 'next')
      // this.$store.dispatch('emails/toggleStarred',{
      //         dataToUpdate:{
      //           isRead:true,
      //           mailbox_id: this.emailViewData.parent.id,
      //           user_id: JSON.parse(localStorage.getItem('userData')).id
      //         },
      //         folder:this.$route.params.folder || 'inbox'
      //       }).then(() => {
      //         this.$store.dispatch('emails/fetch_emails', {
      //           currrent:JSON.parse(localStorage.getItem('userData'))
      //         })
      //       })
    },
    markNotSpam(folder) {
      if (folder == 'spam') {
        this.$store.dispatch('emails/markSpamTrash', {
          folder: folder,
          currrent: JSON.parse(localStorage.getItem('userData')),
          dataToUpdate: {
            user_id: JSON.parse(localStorage.getItem('userData')).id,
            isSpam: "false",

            isTrash: "false",
            mailbox_id: this.emailViewData.parent.id,
            message_id: this.emailViewData.parent.message_id,
          }
        }).then(() => {
          this.$store.dispatch('emails/fetch_emails', {
            folder: router.currentRoute.params.folder,
            q: "",
            currrent: JSON.parse(localStorage.getItem('userData'))
          }).then(() => {

            this.$emit('move-email-to-folder', 'spam')
          })
        })
      }
    },
    markEmails(folder) {
      if (folder == 'trash') {
        this.$store.dispatch('emails/markSpamTrash', {
          folder: folder,
          currrent: JSON.parse(localStorage.getItem('userData')),
          dataToUpdate: {
            user_id: JSON.parse(localStorage.getItem('userData')).id,
            isSpam: "false",

            isTrash: true,
            mailbox_id: this.emailViewData.parent.id,
            message_id: this.emailViewData.parent.message_id,

          }
        }).then(() => {
          this.$store.dispatch('emails/fetch_emails', {
            folder: router.currentRoute.params.folder,
            q: "",
            currrent: JSON.parse(localStorage.getItem('userData'))
          }).then(() => {

            this.$emit('move-email-to-folder', 'trash')
          })
        })
      }
      if (folder == 'spam') {
        this.$store.dispatch('emails/markSpamTrash', {
          folder: folder,
          currrent: JSON.parse(localStorage.getItem('userData')),
          dataToUpdate: {
            user_id: JSON.parse(localStorage.getItem('userData')).id,
            isSpam: true,

            isTrash: "false",
            mailbox_id: this.emailViewData.parent.id,
            message_id: this.emailViewData.parent.message_id,
          }
        }).then(() => {
          this.$store.dispatch('emails/fetch_emails', {
            folder: router.currentRoute.params.folder,
            q: "",
            currrent: JSON.parse(localStorage.getItem('userData'))
          }).then(() => {

            this.$emit('move-email-to-folder', 'spam')
          })
        })
      }
      if (folder == 'is_Read') {
        this.$store.dispatch('emails/toggleStarred', {
          folder: folder || 'inbox',
          currrent: JSON.parse(localStorage.getItem('userData')),
          dataToUpdate: {
            user_id: JSON.parse(localStorage.getItem('userData')).id,
            isRead:false,
            // isSpam: true,

            // isTrash: "false",
            mailbox_id: this.emailViewData.parent.id,
            message_id: this.emailViewData.parent.message_id,
          }
        }).then(() => {
          this.$store.dispatch('emails/fetch_emails', {
            folder: router.currentRoute.params.folder,
            q: "",
            currrent: JSON.parse(localStorage.getItem('userData'))
          }).then(() => {

            this.$emit('move-email-to-folder', 'spam')
          })
        })
      }
    },
    openModal(format) {
      if (format == 'lead') {
        this.formData.users = []
      this.formData.users.push(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0])
        // this.$set(this.emailViewData.users)
        this.$forceUpdate();
        this.$refs['modal-center'].show()
        this.route_name = 'leads'

      }
      if (format == 'task') {
        this.formData.users = []
      this.formData.users.push(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0])
        this.$refs['mail-to-task'].show()
        this.route_name = 'tasks'

      } if(format == 'comments') {
        // this.$refs[format].show()
        this.$refs['comment-modal'].show()

      }
    },
    populateContact(format) {
      // alert('create new one');
      var data = this.$store.state.contactPeople.allForLeads
      // var check_if_contact_exists = false
      // var index = 0;
      // let status = 0;
      // filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, ""))
      var name = filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, "")).trim();
      data.forEach(element => {
        element.emails.forEach(e => {
          if (e.email == this.emailViewData.parent.from_email) {

            this.contact_person_id = element
            if (format == 'lead') {

              this.$refs['modal-center'].show()
            }
            if (format == 'task') {
              this.$refs['mail-to-task'].show()

            }

            this.status = true

            exit
          }
        });
        // if(this.d_status != true){
        //   this.$store.dispatch('contactPeople/allForLeads')
        // }

      });
      //   for (let index = 0; index < data.length; index++) {
      //     // const element = array[index];
      //     // if(data[index].name == name){
      //       console.log(name);
      //       // this.emailViewData.contact_person_id = data[index]
      //       for (let i = 0; i < data[index].emails.length; i++) {
      //         // const element = array[i];
      //         if(data[index].emails[i].email == this.emailViewData.parent.from_email && data[index].name == name){
      //           this.emailViewData.contact_person_id = data[index]
      //           // check_if_contact_exists
      //           console.log('matched');
      //           break;
      //         }
      //         // if(data[index].emails[i].email != this.emailViewData.parent.from_email ||  data[index].name != name){
      //         //   // this.emailViewData.contact_person_id = data[index]
      //         //   // check_if_contact_exists
      //         //   this.status = true;
      //         //   console.log('not matched');

      //         //   break;
      //         // }


      //       }
      //     // }

      //   }

      if (this.status == false) {
        // alert(this.status);
        var data = {
          name: filterTags((this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, ""))),
          email: [this.emailViewData.parent.from_email]
        }

        var result = this.$store.dispatch('contactPeople/store', data).then(() => {


        })
        this.$store.dispatch('contactPeople/fetchForLeads')
          .then(() => {

            if (this.emailViewData.contact_person_id) {

              if (format == 'lead') {

                this.$refs['modal-center'].show()
              }
              if (format == 'task') {
                this.$refs['mail-to-task'].show()

              }
            }
          })




      }

    },

    setMd(length) {
      if (length === 1 || length === 0) {
        return '4';
      } else {
        return '3'
      }
    },
    categoryUser(data) {
      // console.log(data);

      var da = new Date();
      var date = data.due_date;
      if (date != null) {

        da.setDate(da.getDate() + date)
        var d = new Date(da)
        this.mail.due_date =`${d.getFullYear()}-${(d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1)}-${d.getDate() < 10 ? '0'+d.getDate() : d.getDate()}`;
      }
      if (data.users.length > 0) {

        this.formData.users = data.users;
      }
    },
    hidereply() {

      // this.discardEmails()
      if (document.getElementById('reply-div').style.display == 'block') {

        document.getElementById('reply-div').style.display = 'none';
      }
      if (document.getElementById('reply-button-card').style.display == 'none') {

        document.getElementById('reply-button-card').style.display = 'block';
      }

    },
    //  discardEmails(){
    //   this.composeData.message = ''
    //     this.composeData.subject = ''
    //     this.composeData.to = ''
    //     this.composeData.from = ''
    //     this.composeData.cc = ''
    //     this.composeData.bcc = ''

    //     document.getElementById('reply-content').style.display = 'block';
    //     document.getElementById('parent-message').style.display = 'none';

    //     // this.$emit('update:shall-show-email-reply-modal', false)
    //     if(this.file_name.length > 0 ){

    //       while(this.file_name.length > 0){
    //         this.file_name.pop();
    //       }
    //     }
    //     if(this.name_to_display.length > 0 ){

    //       while(this.name_to_display.length > 0){
    //         this.name_to_display.pop();
    //       }
    //     }
    //     if(this.composeData.file){

    //       if(this.composeData.file.length > 0){

    //         while(this.composeData.file.length > 0){
    //           this.composeData.file.pop();
    //         }
    //       }
    //     }

    //       // this.$emit('update:shall-show-email-compose-modal', false)


    //  },
    showreply() {

      if (document.getElementById('reply-div').style.display == 'none') {

        document.getElementById('reply-div').style.display = 'block';
      }
      if (document.getElementById('reply-button-card').style.display = 'block') {

        document.getElementById('reply-button-card').style.display = 'none';
      }


    },
    showforward() {

      if (document.getElementById('forward-div').style.display == 'none') {

        document.getElementById('forward-div').style.display = 'block';
      }
      if (document.getElementById('reply-button-card').style.display = 'block') {

        document.getElementById('reply-button-card').style.display = 'none';
      }


    },

    fetchAll() {
      this.$store.dispatch('leads/fetch')
    },
    show_message() {
      // this.composeData.message = this._props.emailViewData.message;
      if (document.getElementById('show-message').style.display == 'none') {

        document.getElementById('show-message').style.display = 'block';
      }
      document.getElementById('content').style.display = 'none';


    },
    hide_message() {
      // this.composeData.message = this._props.emailViewData.message;
      if (document.getElementById('show-message').style.display == 'block') {

        document.getElementById('show-message').style.display = 'none';
      }
      document.getElementById('content').style.display = 'block';
      // document.getElementById('content').style.display = 'none';



    },
    showThreads() {
      this._props.showThread = true
      // this._props.emailViewData.parent.push()
    },
    mail_to_lead(lead) {
      if (this.$store.state.branches.all.length === 1) {
        // console.log(formData);
        this.mail.branch_id = { b_id: document.getElementById('branches').value };
      }
      if (this.contact_person_id === null || this.mail.branch_id == null || this.mail.priority == null || this.mail.due_date == null) {
        return;
      }
      var message = '';
      var subject = '';
      if (lead.parent) {
        // message = lead.parent.plainText_messages != "" ? lead.parent.plainText_messages : lead.parent.message
        message=  lead.parent.message
        subject = lead.parent.subject

      }
      if (!lead.parent) {
        // message = lead.plainText_messages != "" ? lead.plainText_messages : lead.message
        message = lead.message
        subject = lead.subject

      }
      const data = {
        subject: this.mail.subject,
        description: this.mail.description,
        branch_id: this.mail.branch_id,
        category_id: this.mail.category_id,
        company_id: this.mail.company_id,
        contact_person_id: this.contact_person_id,
        type: 'lead',
        users: this.formData.users,
        user_id: JSON.parse(localStorage.getItem('userData')).id,
        priority: this.mail.priority,
        due_date: this.mail.due_date,
        mailbox_id: lead.parent.id

      }
      if (this.route_name == 'tasks') {
        data.type = 'task'
      } else {
        data.type = 'lead'
      }
      // const data = {


      // task_id: this.taskId,
      if (this.route_name == 'tasks') {

        data.proposals = {

          proposal_date: `${year}-${month}-${day}`,
          client_name: data.company_id != null ? data.company_id.name : '',
          concerned_person: data.contact_person_id != null ? data.contact_person_id.name : null,
          address: data.branch_id.name,
          subject: data.subject,
          prephase: "As per discussion, please find below the brief proposal",
          footer_title: "Thanking you,",
          footer_description: JSON.parse(localStorage.getItem('userData')).name + "<br/>For, " + JSON.parse(localStorage.getItem('userData')).tenant.organization.name + "<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)",
          internal_notes: "Thanking you",
          proposalSection: [],
          proposalFees: [{
            description: data.subject,
            amount: data.amount
          }],
          type: data.type,
          client_id: data.company_id != null ? data.company_id.id : null
        }
      }

      data.subtask = {
        c_todo: this.default_todo.concat(this.additional_todo),
        user_ids: this.subtask_mentions
      }

      data.task_attachments = this.fileData
      this.$store.dispatch('leads/store', data).then(() => {

        this.$store.dispatch('emails/fetch_emails', {
          currrent: JSON.parse(localStorage.getItem('userData'))
        })
        this.$refs['modal-center'].hide();
        this.$toast.success('Converted Mail to Lead', {
          position: "top-right",
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
      }).catch();
      console.log(data);
    },
    mail_to_task(task) {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let proposal_branch_id = 0;
      if (this.$store.state.branches.all.length === 1) {
        // console.log(formData);
        this.mail.branch_id = { b_id: document.getElementById('branches').value };
        proposal_branch_id = Number(document.getElementById('branches').value)
      }
      if (this.mail.branch_id == null || this.mail.priority == null || this.mail.due_date == null) {
        // alert('hello')
        return;
      }
      var message = ''
      var subject = ''

      if (task.parent) {
        // message = task.parent.plainText_messages != "" ? task.parent.plainText_messages : task.parent.message
        message = task.parent.message
        subject = task.parent.subject

      }
      if (!task.parent) {
        // message = task.plainText_messages != "" ? task.plainText_messages : task.message
        message = task.message
        subject = task.subject

      }
      const data = {
        subject: this.mail.subject,
        description: this.mail.description,
        branch_id: this.mail.branch_id,
        category_id: this.mail.category_id,
        company_id: this.mail.company_id,
        contact_person_id: this.contact_person_id,
        type: 'task',
        user_id: JSON.parse(localStorage.getItem('userData')).id,
        users: this.formData.users,
        priority: this.mail.priority,
        due_date: this.mail.due_date,
        mailbox_id: task.parent.id

      }
      if (this.route_name == 'tasks') {
        data.type = 'task'
      } else {
        data.type = 'lead'
      }
      // const data = {


      // task_id: this.taskId,
      if (this.route_name == 'tasks') {

        data.proposals = {

          proposal_date: `${year}-${month}-${day}`,
          client_name: data.company_id != null ? data.company_id.name : '',
          concerned_person: this.contact_person_id != null ? this.contact_person_id.name : null,
          address: proposal_branch_id != 0 ? this.$store.state.branches.all.find(e => e.id === proposal_branch_id).name : data.branch_id.name,
          subject: data.subject,
          prephase: "As per discussion, please find below the brief proposal",
          footer_title: "Thanking you,",
          footer_description: JSON.parse(localStorage.getItem('userData')).name + "<br/>For, " + JSON.parse(localStorage.getItem('userData')).tenant.organization.name + "<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)",
          internal_notes: "Thanking you",
          proposalSection: [],
          proposalFees: [{
            description: data.subject,
            amount: this.mail.amount
          }],
          type: data.type,
          client_id: data.company_id != null ? data.company_id.id : null
        }
      }

      data.subtask = {
        c_todo: this.default_todo.concat(this.additional_todo),
        user_ids: this.subtask_mentions
      }

      data.task_attachments = this.fileData
      this.$store.dispatch('tasks/store', data).then(() => {

this.$store.dispatch('emails/fetch_emails', {
  currrent: JSON.parse(localStorage.getItem('userData'))
})
this.$refs['mail-to-task'].hide();
this.$toast.success('Converted Mail to Task', {
  position: "top-right",
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
}).catch();
      console.log(data);
    }
  },
  created() {
    // this.populateContact();

    // this.$store.dispatch('branches/fetch')
    // this.$store.dispatch('categories/fetch')
    // this.$store.dispatch('clients/fetch')
    // this.$store.dispatch('allUsers/fetch')


    // console.log(this.$attrs.shall - show - email - compose - modal);
  },
  watch: {
    emailViewData: {
      immediate: true,
      handler() {
      //   this.emailViewData.users = []
      // this.emailViewData.users.push(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0])
        
        var data = this.$store.state.contactPeople.allForLeads
        // var check_if_contact_exists = false
        // var index = 0;
        // var status = this.status;
        // let status = 0;
        // filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, ""))
        var name = ''
        if (this.emailViewData.parent) {

          name = filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, "")).trim();
        }
        data.forEach(element => {
          element.emails.forEach(e => {
            if (this.emailViewData.parent) {

              if (e.email == this.emailViewData.parent.from_email) {

                this.contact_person_id = element
                // if(format == 'lead'){

                //   this.$refs['modal-center'].show()
                // }
                // if(format == 'task'){
                //   this.$refs['mail-to-task'].show()

                // }

                this.status = true

                exit
              }
            }
          });

        });
        //   for (let index = 0; index < data.length; index++) {
        //     // const element = array[index];
        //     // if(data[index].name == name){
        //       console.log(name);
        //       // this.emailViewData.contact_person_id = data[index]
        //       for (let i = 0; i < data[index].emails.length; i++) {
        //         // const element = array[i];
        //         if(data[index].emails[i].email == this.emailViewData.parent.from_email && data[index].name == name){
        //           this.emailViewData.contact_person_id = data[index]
        //           // check_if_contact_exists
        //           console.log('matched');
        //           break;
        //         }
        //         // if(data[index].emails[i].email != this.emailViewData.parent.from_email ||  data[index].name != name){
        //         //   // this.emailViewData.contact_person_id = data[index]
        //         //   // check_if_contact_exists
        //         //   this.status = true;
        //         //   console.log('not matched');

        //         //   break;
        //         // }


        //       }
        //     // }

        //   }

        if (this.status == false) {
          // alert(this.status);
          var filter_name = ''
          var filter_email = []

          if (this.emailViewData.parent) {
            filter_name = filterTags((this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, "")))
            filter_email.push(this.emailViewData.parent.from_email)

          }

          var data = {
            name: filter_name,
            email: filter_email
          }
          if (this.$store.state.contactPeople.emails.find(e => e == filter_email[0])) {
            var data3 = this.$store.state.contactPeople.allForLeads

            data3.forEach(element => {
              element.emails.forEach(e => {
                if (this.emailViewData.parent) {

                  if (e.email == this.emailViewData.parent.from_email) {

                    this.contact_person_id = element
                    // if(format == 'lead'){

                    //   this.$refs['modal-center'].show()
                    // }
                    // if(format == 'task'){
                    //   this.$refs['mail-to-task'].show()

                    // }

                    this.status = true

                    exit
                  }
                }
              });

            });
          } else {

            if (data.email.length > 0) {

              var result = this.$store.dispatch('contactPeople/store', data).then(() => {


                this.$store.dispatch('contactPeople/fetchForLeads').then(() => {

                  var data2 = this.$store.state.contactPeople.allForLeads
                  // var check_if_contact_exists = false
                  // var index = 0;
                  // var status = this.status;
                  // let status = 0;
                  // filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, ""))
                  var name = ''
                  if (this.emailViewData.parent) {

                    name = filterTags(this.emailViewData.parent.from_name.replace(/ *\([^)]*\) */g, "")).trim();
                  }
                  data2.forEach(element => {
                    element.emails.forEach(e => {
                      if (this.emailViewData.parent) {

                        if (e.email == this.emailViewData.parent.from_email) {

                          this.contact_person_id = element
                          // if(format == 'lead'){

                          //   this.$refs['modal-center'].show()
                          // }
                          // if(format == 'task'){
                          //   this.$refs['mail-to-task'].show()

                          // }

                          this.status = true

                          exit
                        }
                      }
                    });

                  });
                  console.log(this.emailViewData);

                })
              })
            }
          }







        }
        // console.log(this.emailViewData);
      }
    }
  },
  setup(props) {
    // const isCreateSidebarActive = ref(false)
    const shallshowemailcomposemodal = ref(false)
    const { resolveLabelColor } = useEmail()


    // var perfectScrollbarSettings = {
    //   maxScrollbarLength: 150,
    // }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetForm)

    // const showWholeThread = ref(false)
    const replyFlag = ref(false)
    // watch(() => props.emailViewData.parent.id, () => {
    //   showWholeThread.value = false
    // })
    const errors = store.state.leads.errors.branch_id ? store.state.leads.errors.branch_id[0] : ''


    return {
      // editorOption,
      // UI
      // perfectScrollbarSettings,
      // showWholeThread,
      errors,
      shallshowemailcomposemodal,
      replyFlag,
      filterTags,
      refFormObserver,
      // isCreateSidebarActive,
      getValidationState,
      resetForm,
      // useEmail
      resolveLabelColor,
    }
  },
}
</script>

<style lang="scss">
// @import "~@core/scss/base/pages/app-email.scss";
@import '@core/scss/vue/libs/vue-flatpicker.scss';

@import '@core/scss/vue/libs/quill.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
<style>
@media (min-width:992px) {
  #modal-center .modal-lg {
    max-width: 1300px;
  }
}
</style>
