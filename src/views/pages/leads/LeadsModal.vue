<template>
  <div class="mt--4">
    <div>
      {{ defaultEmail }}
      <b-modal
        no-close-on-backdrop
        id="modal-new-leads"
        ref="modal-new-leads"
        size="lg"
        hide-footer
        class="position-relative b-overlay"
      >
        <!-- <b-card-body> -->
        <template #modal-header>
          <h5 class="modal-title">
            add new lead
          </h5>
          <b-row style="margin-left: 20px;">
            <b-col>
              <div style="margin-left: 949px;">
                <label class="switch">
                  <input type="checkbox" v-model="isChecked" />
                  <span class="slider round w-75"></span>
                </label>
                <span id="internal">Internal</span>
              </div>
            </b-col>
          </b-row>
          <ul></ul>
        </template>

        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <b-row>
              <b-col :md="setMd(branches.length)">
                <validation-provider
                  #default="validationContext"
                  name="contact_person_id"
                  vid="contact"
                  rules="required"
                >
                  <b-form-group
                    label="Contact Person *"
                    v-if="isChecked == false"
                    class="my-custom-select"
                  >
                    <v-select
                      id="contact"
                      v-model="formData.contact_person_id"
                      :options="contactPeople"
                      label="name"
                      placeholder="Search Contact"
                    >
                      <template #list-header class="add_contacts">
                        <div class="ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                          <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
  
                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon
                              size="14"
                              style="margin-right: 0.5rem;"
                              icon="PlusIcon"
                            />
                            New Contact
                          </a>
                        </div>
                      </template>
                      <template #option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                      <template #selected-option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                      <!-- </v-select> -->
                    </v-select>
                    <!-- <create-contact/> -->
                    <b-form-invalid-feedback
                      v-if="validationContext.errors.length > 0"
                      class="d-flex"
                    >
                      <!-- {{ validationContext.errors[0] }} -->
                      The Contact field is required
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <validation-provider
                  #default="validationContext"
                  name="branch_id"
                  vid="branch"
                  rules="required"
                >
                  <b-form-group
                    label="Branch *"
                    v-if="isChecked == true"
                    class="my-custom-select"
                  >
                    <v-select
                      id="branch"
                      placeholder="Search Branch"
                      v-model="formData.branch_id"
                      label="name"
                      :options="branches"
                    >
                      <template #option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                      <template #selected-option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                    </v-select>
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <b-form-group
                  v-if="$router.currentRoute.name == 'GettingStarted'"
                  label="Contact Person"
                  class="my-custom-select"
                >
                  <v-select
                    v-model="formData.contact_person_id"
                    :options="contactPeople"
                    label="name"
                    placeholder="Search Contact"
                  >
                    <template #list-header class="add_contacts">
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
  
                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon
                            size="14"
                            style="margin-right: 0.5rem;"
                            icon="PlusIcon"
                          />
                          New Contact
                        </a>
                      </div>
                    </template>
                    <template #option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                    <template #selected-option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                    <!-- </v-select> -->
                  </v-select>
                  <!-- <create-contact/> -->
                </b-form-group>
              </b-col>

              <b-col :md="setMd(branches.length)">
                <validation-provider
                  #default="validationContext"
                  name="company_id"
                  vid="client"
                >
                  <b-form-group
                    label="Client "
                    v-if="isChecked == false"
                    class="my-custom-select"
                  >
                    <v-select
                      id="client"
                      :options="clients"
                      label="name"
                      v-model="formData.company_id"
                      placeholder="Search Client"
                    >
                      <template #list-header class="add_clients">
                        <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                          <a href="#">
                            <feather-icon
                              size="14"
                              style="margin-right: 0.5rem;"
                              icon="PlusIcon"
                            />
                            New Client</a
                          >
                        </div>
                      </template>
                      <template #option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                      <template #selected-option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                    </v-select>

                    <!-- <create-clients /> -->
                  </b-form-group>
                </validation-provider>
                <b-form-group
                  v-if="$router.currentRoute.name == 'GettingStarted'"
                  label="Client"
                  class="my-custom-select"
                >
                  <v-select
                    id="client"
                    :options="clients"
                    label="name"
                    v-model="formData.company_id"
                    placeholder="Search Client"
                  >
                    <template #list-header class="add_clients">
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
  
                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon
                            size="14"
                            style="margin-right: 0.5rem;"
                            icon="PlusIcon"
                          />
                          New Client</a
                        >
                      </div>
                    </template>
                    <template #option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                    <template #selected-option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                  </v-select>

                  <!-- <create-clients /> -->
                </b-form-group>
              </b-col>
              <b-col :md="setMd(branches.length)">
                <b-form-group
                  label="Category"
                  v-if="isChecked == false"
                  class="my-custom-select"
                >
                  <v-select
                    placeholder="Search Category"
                    v-model="formData.category_id"
                    label="name"
                    :options="categories"
                    @input="categoryUser"
                  >
                    <template #option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                    <template #selected-option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col :md="setMd(branches.length)" v-if="(branches.length > 1)">
                <validation-provider
                  #default="validationContext"
                  name="branch_id"
                  vid="branch"
                  rules="required"
                >
                  <b-form-group
                    label="Branch *"
                    v-if="isChecked == false"
                    class="my-custom-select"
                  >
                    <v-select
                      id="branch"
                      placeholder="Search Branch"
                      v-model="formData.branch_id"
                      label="name"
                      :options="branches"
                    >
                      <template #option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                      <template #selected-option="item">
                        <span v-b-tooltip.hover.top="item.name">
                          {{ item.name.substring(0, 28) }}
                          <span v-if="item.name.length >= 32">...</span>
                        </span>
                      </template>
                    </v-select>
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>

            <validation-provider
              #default="validationContext"
              name="subject"
              vid="subject"
              rules="required"
            >
              <b-row>
                <b-col md="12 ">
                  <b-form-group
                    label="Subject *"
                    label-for="contact"
                    class="my-custom-select"
                  >
                    <b-form-input
                      placeholder="Enter Subject"
                      id="subject"
                      v-model="formData.subject"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </validation-provider>
            <b-row>
              <b-col md="12 ">
                <b-form-group label="Description" label-for="contact">
                  <quill-editor
                    v-model="formData.description"
                    :options="editorOption"
                  >
                    <!-- Add a bold button -->
                    <!-- <div id="toolbar" slot="toolbar">
  
                    </div> -->
                  </quill-editor>
                  <!-- <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback> -->
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col :md="setSpecialMd()">
                <b-form-group label="Assigned To" class="my-custom-select">
                  <v-select
                    multiple
                    placeholder="Search Employee"
                    label="name"
                    v-model="formData.users"
                    :options="allUsers"
                  >
                    <template #list-header class="add_users">
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-user>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
  
                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon
                            size="14"
                            style="margin-right: 0.5rem;"
                            icon="PlusIcon"
                          />
                          New Employee</a
                        >
                      </div>
                    </template>
                    <template #option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                    <template #selected-option="item">
                      <span v-b-tooltip.hover.top="item.name">
                        {{ item.name.substring(0, 28) }}
                        <span v-if="item.name.length >= 32">...</span>
                      </span>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <!-- <InviteUser/> -->
              <b-col :md="setSpecialMd()">
                <validation-provider
                  #default="validationContext"
                  name="due_date"
                  vid="due_date"
                  rules="required"
                >
                  <b-form-group label="Due Date *" class="my-custom-select">
                    <VueDatePicker
                      format="DD-MM-YYYY"
                      style="
                        border: 1px solid #d8d6de;
                        border-radius: 0.357rem;
                      "
                      v-model="formData.due_date"
                      :minDate="currentDate"
                    />
                    <!-- <flat-pickr id="due_date" :config="{ minDate: 'today', altInput: false }"   v-model="formData.due_date"
                      class="form-control" placeholder="Due Date" />
                    <b-form-datepicker placeholder="Due Date" id="due_date"   
                    v-model="formData.due_date"  /> -->
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>

              <b-col :md="setSpecialMd()">
                <validation-provider
                  #default="validationContext"
                  name="priority"
                  vid="priority"
                  rules="required"
                >
                  <b-form-group label="Priority *" class="my-custom-select">
                    <v-select
                      autofocus
                      v-model="formData.priority"
                      label="id"
                      :options="importance.slice().reverse()"
                      input-id="priority"
                      placeholder="Search Priority"
                    >
                      <template #option="{ id, icon }">
                        <div v-if="(id === 1)">
                          <feather-icon
                            fill="#9e9e9e"
                            style="color: #9e9e9e;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Lowest
                        </div>
                        <div v-if="(id === 2)">
                          <feather-icon
                            fill="#607d8b"
                            style="color: #607d8b;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Low
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                        </div>
                        <div v-if="(id === 3)">
                          <feather-icon
                            fill="#ffe821"
                            style="color: #ffe821;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Medium
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                        </div>

                        <div v-if="(id === 4)">
                          <feather-icon
                            fill="#ff9800"
                            style="color: #ff9800;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />High
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                        </div>
                        <div v-if="(id === 5)">
                          <feather-icon
                            fill="#e91e63"
                            style="color: #e91e63;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Highest
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
                        <div v-if="(formData.priority.id === id && id === 1)">
                          <feather-icon
                            fill="#9e9e9e"
                            style="color: #9e9e9e;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Lowest
                        </div>
                        <div v-if="(formData.priority.id === id && id === 2)">
                          <feather-icon
                            fill="#607d8b"
                            style="color: #607d8b;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Low
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                        </div>
                        <div v-if="(formData.priority.id === id && id === 3)">
                          <feather-icon
                            fill="#ffe821"
                            style="color: #ffe821;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Medium
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                        </div>

                        <div v-if="(formData.priority.id === id && id === 4)">
                          <feather-icon
                            fill="#ff9800"
                            style="color: #ff9800;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />High
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                          <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                        </div>
                        <div v-if="(formData.priority.id === id && id === 5)">
                          <feather-icon
                            fill="#e91e63"
                            style="color: #e91e63;"
                            icon="StarIcon"
                            size="16"
                            class="align-middle mr-50"
                          />Highest
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
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                v-if="$router.currentRoute.name == 'tasks'"
                :md="setSpecialMd()"
              >
                <validation-provider
                  #default="validationContext"
                  name="amount"
                  vid="amount"
                  rules="required"
                >
                  <b-form-group label="Value *" class="my-custom-select">
                    <b-form-input
                      id="amount"
                      v-model.number="formData.amount"
                      type="number"
                      placeholder="value"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <div style="display: none;" id="sub-tasks-container">
              <b-row
                class="d-flex justify-content-between align-items-center mb-1 mr-1"
                style="
                  padding: 0.5rem;
                  margin-left: 0.5rem;
                  border-bottom: 1px solid #f65948;
                "
              >
                <!-- <div class="header d-flex justify-content-between" style="border-color:#f65948"> -->
                <span class="text-uppercase">
                  Sub-tasks
                </span>
                <!-- <div> -->
                <b-button
                  size="sm"
                  @click="showTemplatesTodo()"
                  variant="primary"
                  >{{ textHeader }}</b-button
                >
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
                        <b-button
                          size="sm"
                          @click="chooseTemplates(item)"
                          variant="primary"
                        >
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
                      <validation-provider
                        #default="validationContext"
                        name="default_todo"
                        vid="default_todo"
                        rules=""
                      >
                        <b-form-group class="my-custom-select">
                          <Mentionable
                            style="width: 100%;"
                            :keys="['@']"
                            :items="users_to_assign"
                            offset="6"
                            insert-space
                            @open="onOpen"
                            @apply="onApply"
                          >
                            <b-form-input
                              v-model.trim="default_todo[0]"
                              placeholder="Enter sub-task steps and assign @someone"
                            />
                            <b-form-invalid-feedback class="d-block">
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                            <div class="text-right">
                              <b-button
                                size="sm"
                                variant="primary"
                                @click="repeatAgain"
                              >
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
                                <b-avatar :src="item.avatar"> </b-avatar>
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
                    <div style="padding-left: 4rem; width: 50%;">
                      <div class="border-l" style="">
                        <div class="d-flex flex-column">
                          <div
                            class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                          >
                            <div>Attachment(s)</div>
                            <div>
                              <input
                                type="file"
                                ref="file_task2"
                                style="display: none;"
                                @change="onFileChange"
                              />
                              <b-dropdown
                                id="file_drop"
                                class=""
                                style="width: 50%;"
                                variant="primary"
                                size="sm"
                              >
                                <template #button-content>
                                  <span class="text-capitalize">
                                    Choose File(s)
                                  </span>
                                </template>
                                <b-dropdown-item
                                  @click="$refs.file_task2.click()"
                                  ><img
                                    class="mr-1"
                                    :src="browseIcon"
                                    width="25px"
                                  />Browse</b-dropdown-item
                                >
                                <b-dropdown-item
                                  ><img
                                    class="mr-1"
                                    :src="excelIcon"
                                    width="25px"
                                    data-type="1"
                                  />Google Sheets</b-dropdown-item
                                >
                                <b-dropdown-item
                                  ><img
                                    class="mr-1"
                                    :src="wordIcon"
                                    width="25px"
                                    data-type="2"
                                  />Google Docs</b-dropdown-item
                                >
                                <b-dropdown-item
                                  ><img
                                    class="mr-1"
                                    :src="slideIcon"
                                    width="25px"
                                    data-type="3"
                                  />Google Slides</b-dropdown-item
                                >

                                <!-- <b-dropdown-item>
  
  </b-dropdown-item> -->
                              </b-dropdown>
                            </div>
                          </div>
                        </div>
                        <div
                          class="d-flex justify-content-between align-items-center p-1"
                        >
                          <div
                            v-if="file_name3.length > 0"
                            class="d-flex justify-content-between"
                          >
                            <div
                              v-for="(file, index) in linkWithUrl"
                              :key="index"
                              class="d-flex justify-content-between"
                            >
                              <span v-if="file.type === 'subTaskType'">
                                {{ file.fileName }}

                                <feather-icon
                                  icon="XIcon"
                                  class="cursor-pointer"
                                  @click="removes3(file.url, index)"
                                />
                              </span>
                            </div>
                          </div>
                          <div v-else>No file(s) selected</div>
                          <b-media-aside class="mr-0">
                            <b-img
                              v-if="file !== null && previewImage != null"
                              id="ref_image_base_64"
                              ref="refPreviewEl"
                              v-model="image"
                              :src="previewImage"
                              height="40"
                              width="40"
                              rounded="circle"
                              class="border border-l"
                            />
                          </b-media-aside>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row
                  class="mb-1 mt-1"
                  v-for="(item, index) in todo_field"
                  :id="item.id"
                  :key="item.id"
                >
                  <b-col md="12" class="d-flex">
                    <!-- <div  ref="row" class="mb-1"
                 > -->
                    <div style="width: 60%;">
                      <validation-provider
                        #default="validationContext"
                        name="additional_todo"
                        vid="additional_todo"
                        rules=""
                      >
                        <Mentionable
                          style="width: 100%;"
                          :keys="['@']"
                          :items="users_to_assign"
                          offset="6"
                          insert-space
                          @open="onOpen"
                          @apply="onApply"
                          class="my-custom-select"
                        >
                          <b-form-input
                            placeholder="Enter sub-task steps and assign @someone"
                            v-model="additional_todo[index]"
                          />
                          <b-form-invalid-feedback class="d-block">
                            {{ validationContext.errors[0] }}
                          </b-form-invalid-feedback>
                          <div class="text-right">
                            <b-button
                              size="sm"
                              variant="outline-primary"
                              @click="removeItem(index)"
                            >
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
                              <b-avatar :src="item.avatar"> </b-avatar>
                              <span class="ml-1">
                                {{ item.value }}
                                <!-- ({{ item.name }}) -->
                              </span>
                            </div>
                          </template>
                        </Mentionable>
                      </validation-provider>
                    </div>
                    <div style="padding-left: 4rem; width: 50%;">
                      <div class="border-l" style="">
                        <div class="d-flex flex-column">
                          <div
                            class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                          >
                            <div>Attachment(s)</div>
                            <div>
                              <input
                                type="file"
                                ref="file_task3"
                                style="display: none;"
                              />
                              <b-dropdown
                                id="file_drop"
                                class=""
                                size="sm"
                                style="width: 50%;"
                                variant="primary"
                              >
                                <template #button-content>
                                  <span class="text-capitalize">
                                    Choose File(s)
                                  </span>
                                </template>
                                <b-dropdown-item
                                  @click="$refs.file_task3.click()"
                                  ><img
                                    class="mr-1"
                                    :src="browseIcon"
                                    width="25px"
                                  />Browse</b-dropdown-item
                                >
                                <b-dropdown-item
                                  ><img
                                    class="mr-1"
                                    :src="excelIcon"
                                    width="25px"
                                    data-type="1"
                                  />Google Sheets</b-dropdown-item
                                >
                                <b-dropdown-item
                                  ><img
                                    class="mr-1"
                                    :src="wordIcon"
                                    width="25px"
                                    data-type="2"
                                  />Google Docs</b-dropdown-item
                                >
                                <b-dropdown-item
                                  ><img
                                    class="mr-1"
                                    :src="slideIcon"
                                    width="25px"
                                    data-type="3"
                                  />Google Slides</b-dropdown-item
                                >

                                <!-- <b-dropdown-item>
  
          </b-dropdown-item> -->
                              </b-dropdown>
                            </div>
                          </div>
                        </div>
                        <div
                          class="d-flex justify-content-between align-items-center p-1"
                        >
                          <div v-if="file_name.length > 0">{{ file_name }}</div>
                          <div v-else>No file(s) selected</div>
                          <b-media-aside class="mr-0">
                            <b-img
                              v-if="file !== null && previewImage != null"
                              id="ref_image_base_64"
                              ref="refPreviewEl"
                              v-model="image"
                              :src="previewImage"
                              height="40"
                              width="40"
                              rounded="circle"
                              class="border border-l"
                            />
                          </b-media-aside>
                        </div>
                      </div>
                    </div>
                    <!-- </div> -->
                  </b-col>
                </b-row>
              </div>

              <!-- </b-row> -->
              <!-- </b-form> -->
              <!-- </validation-observer> -->
            </div>
            <div style="display: none;" id="attachments-container">
              <b-row
                class="mb-1 mr-1"
                style="
                  padding: 0.5rem;
                  margin-left: 0.5rem;
                  border-bottom: 1px solid #f65948;
                "
              >
                <span class="text-uppercase">
                  Attachments
                </span>
              </b-row>
              <div class="border-l" style="width: 40%;">
                <div class="d-flex flex-column">
                  <div
                    class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                  >
                    <div>Attachment(s)</div>
                    <div>
                      <input
                        type="file"
                        multiple
                        ref="file_task"
                        @change="onFileChange2"
                        style="display: none;"
                      />
                      <b-dropdown
                        id="file_drop"
                        class=""
                        size="sm"
                        style="width: 50%;"
                        variant="primary"
                      >
                        <template #button-content>
                          <span class="text-capitalize">
                            Choose File(s)
                          </span>
                        </template>
                        <b-dropdown-item @click="$refs.file_task.click()"
                          ><img
                            class="mr-1"
                            :src="browseIcon"
                            width="25px"
                          />Browse</b-dropdown-item
                        >
                        <b-dropdown-item
                          ><img
                            class="mr-1"
                            :src="excelIcon"
                            width="25px"
                            data-type="1"
                          />Google Sheets</b-dropdown-item
                        >
                        <b-dropdown-item
                          ><img
                            class="mr-1"
                            :src="wordIcon"
                            width="25px"
                            data-type="2"
                          />Google Docs</b-dropdown-item
                        >
                        <b-dropdown-item
                          ><img
                            class="mr-1"
                            :src="slideIcon"
                            width="25px"
                            data-type="3"
                          />Google Slides</b-dropdown-item
                        >

                        <!-- <b-dropdown-item>
  
  </b-dropdown-item> -->
                      </b-dropdown>
                    </div>
                  </div>
                </div>
                <div class="p-1">
                  <!-- <div class="d-flex justify-content-center" v-if="attachmentLoading">
                                  <b-spinner variant="primary" />
                                </div> -->
                  <div v-if="linkWithUrl.length > 0">
                    <div
                      v-for="(file, index) in linkWithUrl"
                      :key="index"
                      class="d-flex justify-content-between"
                    >
                      <span v-if="file.type === 'attachmentsType'">
                        {{ file.fileName }}

                        <feather-icon
                          icon="XIcon"
                          class="cursor-pointer"
                          @click="removes3(file.url, index)"
                        />
                      </span>
                    </div>
                  </div>
                  <div
                    v-else
                    class="d-flex justify-content-center align-items-center"
                  >
                    No file(s) selected
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-1 text-right">
              <b-button
                size="sm"
                @click="toggleAttach()"
                class="mr-1"
                variant="primary"
                >{{ textAttach }}</b-button
              >
              <b-button
                size="sm"
                @click="toggleAddTodo()"
                class="mr-1"
                variant="primary"
                >{{ textTodo }}</b-button
              >
              <b-button size="sm" variant="primary" @click="closeModal()">
                Cancel </b-button
              >&emsp;
              <b-button
                size="sm"
                :disabled="$store.state.leads.isSidebarLoading"
                variant="primary"
                type="submit"
              >
                Save
                <b-spinner
                  small
                  class="ml-1"
                  v-if="$store.state.leads.isSidebarLoading"
                />
              </b-button>
            </div>
          </b-form>
        </validation-observer>
        <!-- </b-card-body> -->
        <div
          v-if="$store.state.leads.isSidebarLoading"
          class="b-overlay position-absolute"
          style="inset: 0px; z-index: 10; /* display: none; */"
        >
          <div
            class="position-absolute bg-white rounded-sm"
            style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"
          ></div>
          <div
            class="position-absolute d-flex align-items-center flex-column"
            style="
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%);
            "
          >
            <span aria-hidden="true" class="spinner-border text-primary">
              <!----></span
            >
            <br /><span>Adding New Leads..</span>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import { VueDatePicker } from "@mathieustan/vue-datepicker"
import wordIcon from "../../../assets/images/logo/word-icon.png"
import excelIcon from "../../../assets/images/logo/excel-icon.png"
import slideIcon from "../../../assets/images/logo/slide-icon.png"
import browseIcon from "../../../assets/images/logo/browse-icon.png"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import vSelect from "vue-select"
import flatPickr from "vue-flatpickr-component"

import {
  BModal,
  BFormInvalidFeedback,
  BFormDatepicker,
  VBTooltip,
  BAvatar,
  BMediaAside,
  BImg,
  // BSpinner,
  BForm,
  VBModal,
  BFormInput,
  BFormGroup,
  BCard,
  BContainer,
  BRow,
  BCol,
  BPagination,
  BTable,
  BButton,
  BDropdown,
  BDropdownItem,
  BSpinner,
} from "bootstrap-vue"
import store from "@/store"
import formValidation from "@/@core/comp-functions/forms/form-validation"
import { ref, computed } from "@vue/composition-api"
import { required, email } from "@validations"
import { quillEditor } from "vue-quill-editor"
import "quill/dist/quill.core.css"
// import { mapGetters } from 'vuex'
import CreateContact from "./CreateContactLead.vue"
import CreateClients from "./CreateClientLead.vue"

// eslint-disable-next-line
import "quill/dist/quill.snow.css"
// eslint-disable-next-line
import "quill/dist/quill.bubble.css"
import { Mentionable } from "vue-mention"

// import InviteUser from '../users/InviteUser.vue';
export default {
  components: {
    quillEditor,
    VueDatePicker,
    CreateContact,
    CreateClients,
    VBTooltip,
    BMediaAside,
    BImg,
    flatPickr,
    Mentionable,
    BFormDatepicker,
    BAvatar,
    BForm,
    BFormGroup,
    BDropdown,
    BDropdownItem,
    BButton,
    BModal,
    BFormInvalidFeedback,
    BFormInput,
    BRow,
    BCol,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    vSelect,
    // InviteUser
  },
  data() {
    const date = new Date()
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return {
      isChecked: false,
      linkWithUrl: [],
      file_name3: [],
      data2: {
        attach: null,
      },
      currentDate: `${year}-${month}-${day}`,
      slideIcon: slideIcon,
      browseIcon: browseIcon,
      excelIcon: excelIcon,
      wordIcon: wordIcon,
      amount: null,
      switchOption: false,
      textAttach: "Add Attachment(s)",
      textTodo: "Add Sub-Task",
      importance: [
        { id: 1, star: "*" },
        { id: 2, star: "* *" },
        { id: 3, star: "* * *" },
        { id: 4, star: "* * * *" },
        { id: 5, star: "* * * * *" },
      ],

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
        placeholder: "Enter Description",
      },
      subject: "",
      due_date: `${year}-${month}-${day}`,
      priority: [],
      contact_person_id: null,
      company_id: null,
      branch_id: null,
      category_id: null,
      users: [],
      default_branch_id: "",
      textHeader: "Choose from Templates",
      type: "lead",
      description: "",
      todo_field: [],
      nextTodoId: 2,
      file_name: [],
      file_name2: [],
      default_todo: [],
      file: null,
      previewImage: null,
      additional_todo: [],
      subtask_mentions: [],
      required,
      search: "",
      email: "",
    }
  },
  directives: {
    "b-modal": VBModal,
    "b-tooltip": VBTooltip,
  },
  computed: {
    defaultEmail() {
      if (this.$store.state.contactPeople.singleData.id) {
        this.formData.contact_person_id = this.$store.state.contactPeople.singleData
      } else {
        this.formData.contact_person_id = this.paginated_contact[0]
      }
      // if(this.$router.currentRoute.name === 'tasks'){

      //   this.formData.company_id = this.paginated_clients[0]
      // }else{
      //   this.formData.company_id = null
      // }
      if (this.branches.length > 1) {
        this.formData.branch_id = this.branches[0]
      } else {
        this.formData.branch_id = null
      }
      if (this.$store.state.users.all.length > 0) {
        this.formData.users = this.$store.state.users.all.filter(
          (e) => e.email === JSON.parse(localStorage.getItem("userData")).email
        )
      } else {
        this.formData.users = [] //this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)
      }
      return
    },
    paginated_clients() {
      return this.clients.slice(0, 0 + 8)
    },
    paginated_contact() {
      return this.contactPeople.slice(0, 0 + 8)
    },
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading
      return data
    },
    fileLinks() {
      let data = this.$store.state.attachments.links
      return data
    },
    subtaskTemplates() {
      let data = this.$store.state.subtaskTemplate.all

      return data
    },
    users_to_assign() {
      // if(this.$store.state.users.all.length === 0){
      //   this.$store.dispatch('allUsers/fetch');
      // }
      var items = this.$store.state.users.all.filter(
        (e) => e.email !== JSON.parse(localStorage.getItem("userData")).email
      )
      var data = []
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead")
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
          avatar: items[index].avatar,
        }
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
      )
    },
    isLoading() {
      return this.$store.state.leads.isSidebarLoading
    },
    successMessage() {
      return this.$store.state.leads.successMessage
    },
    errorMessage() {
      return this.$store.state.leads.errorMessage
    },
    // errors() {
    //   return JSON.parse(JSON.stringify(this.$store.state.leads.errors))
    // },
    categoryLength() {
      return this.categories.length
    },
    categories() {
      return this.$store.state.categories.all
    },
    branches() {
      if (this.$store.state.branches.all.length === 1) {
        this.default_branch_id = this.$store.state.branches.all[0].id
      }
      console.log("Branches:", this.$store.state.branches.all)
      // this.value_of_branches =  this.$store.state.branches.all[0].id
      return this.$store.state.branches.all
    },
    clients() {
      return this.$store.state.clients.all
    },
    contactPeople() {
      return this.$store.state.contactPeople.allForLeads
    },
    allUsers() {
      // this.formData.users = []
      // this.$store.state.users.all.forEach(element => {
      //   if(element.id === JSON.parse(localStorage.getItem('userData')).id){
      //     // default_users.push(element)
      //     this.formData.users.push({
      //       id:String(element.id),
      //       avatar:String(element.avatar),
      //       name:String(element.name)
      //     })
      //   }
      // });
      // if(this.$store.state.users.all.length === 0){
      //   this.$store.dispatch('allUsers/fetch');
      // }
      let data = this.$store.state.users.all
      // data.forEach(e =>{
      //   if(this.$store.state.users.all==)
      // })

      return this.$store.state.users.all
    },
  },
  created() {
    if (this.$router.currentRoute.name != "auth-login") {
      this.fetchBranches()
      // console.log(this);
      this.fetchCategories()
      this.fetchClients()
      this.fetchContactPeople()
      this.fetchAllUsers()
    }
  },
  beforeUpdate() {
    // var default_users= [];
    this.formData.users = this.$store.state.users.all.filter(
      (e) => e.email === JSON.parse(localStorage.getItem("userData")).email
    )
    // this.formData.users = default_users
    if (this.formData.category_id == "") {
      this.formData.users = []
      this.formData.due_date = this.currentDate
    }
  },

  methods: {
    async onFileChange(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2")

      let image = e.target.files
      let image_name = []
      const filePathsPromises = []
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file))
        image_name.push(file.name)
        // filePathsPromises.push(file.name)
      })
      const filePaths = await Promise.all(filePathsPromises, image_name)
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
        type: "subTaskType",
      }))
      this.file_name3 = mappedFiles

      this.file_name2 = this.file_name2.concat(this.file_name3)

      // tempFile.forEach((obj2)=>{
      //   const exists = this.file_name.some(obj1=>obj1.name === obj2.name);
      //   if(!exists){
      //     console.log("not duplicate")
      //     this.file_name.push(obj2);
      //   }
      // })
      // var c = []
      // image_name.forEach(element => {
      //   mappedFiles.forEach(x => {
      //     c.push({
      //       file: x.file,
      //       name: element
      //     })
      //   });
      // });
      console.log(mappedFiles)
      this.uploadFileS3(this.file_name2)
      //       console.log("e:", image);
      // let data = [];
      //       image.forEach(x => {
      //        data.push({
      //         file:this.base64(x),
      //         name:x.name
      //        })

      //       })
      // console.log(data);
      // console.log('hell33')
      // var file44 = this.file_name2;

      // console.log(file44['length'].length);
      // console.log(this.file_name2);

      // this.uploadFileS3(data)

      // var data;
      // for(var i=0; i<image.length; i++){
      //   console.log(image[i].name)
      //   const reader = new FileReader();
      //   // console.log("reader:", reader)
      //   reader.onload = (e) => {
      //      data = {
      //       file: e.target.result,
      //       name: image[i].name
      //     }
      //   }
      //   console.log('robin1'+data)
      //  var result4= reader.readAsDataURL(image[i])
      //  console.log("aflskdfjasldkfjaskdfjalskfjaslkdfjaslkdfjalskdfj")
      //  console.log(result4)

      // // console.log("inside onload after the loop:", this.file_name2)

      // }
      //--------------------------------------------------------------------------------------
      //  // try to tackle problem of file too large

      //  const filteredFiles = this.file_name2.filter((file) => {
      //   return this.$store.state.tasks.s3_url.some((s3File) => s3File.fileName === file.name);
      // });
      // this.file_name2= filteredFiles;
      e.target.value = ""
    },
    async onFileChange2(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2")

      let image = e.target.files
      let image_name = []
      const filePathsPromises = []
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file))
        image_name.push(file.name)
        // filePathsPromises.push(file.name)
      })
      const filePaths = await Promise.all(filePathsPromises, image_name)
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
        type: "attachmentsType",
      }))
      let tempFile = mappedFiles

      tempFile.forEach((obj2) => {
        const exists = this.file_name2.some((obj1) => obj1.name === obj2.name)
        if (!exists) {
          console.log("not duplicate")
          // obj2.type ='attachmentsType';
          this.file_name2.push(obj2)
        }
      })

      console.log(mappedFiles)
      this.uploadFileS3(this.file_name2)
      //       console.log("e:", image);
      e.target.value = ""
    },
    base64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
      // let data = null
      //  const reader = new FileReader();

      //   console.log("reader:", reader)
      //   reader.onload = (e) => {
      //     //  data = {
      //     //   file: e.target.result,
      //     //   name: x.name
      //     // }
      //     data = e.target.result

      //   }
      //   reader.readAsDataURL(file)
      //   // this.file_name2.push(data)
      //   return data;
    },

    removes3(file, i) {
      console.log("bbbb")
      var data = {
        attach_url: file ?? "null",
      }
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(i, 1)
        this.file_name2.splice(i, 1)
        this.linkWithUrl.splice(i, 1)
      })
      // try to fix the testcase where if we upload file greater than 800kb and then if we add more files the file will store in this.file_name2 but not in s3_url

      // updating the this.file_name2 with s3_url
      const filteredFiles = this.file_name2.filter((file) => {
        return this.$store.state.attachments.links.some((s3File) => {
          console.log(s3File.fileName, file.name, "consoling the statement")
          return s3File.fileName === file.name
        })
      })
      this.file_name2 = filteredFiles
    },
    removes3File3(file, i) {
      console.log("bbbb")
      var data = {
        attach_url: file ?? "null",
      }

      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(i, 1)
        this.file_name3.splice(i, 1)
      })
      // try to fix the testcase where if we upload file greater than 800kb and then if we add more files the file will store in this.file_name2 but not in s3_url

      // updating the this.file_name2 with s3_url
      //       const filteredFiles = this.file_name3.filter((file) => {

      //       return this.$store.state.attachments.links.some((s3File) => {
      //         console.log(s3File.fileName, file.name, "consoling the statement")
      //         return  s3File.fileName === file.name
      //       });
      // });
    },

    async uploadFile(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2")

      let image = e.target.files
      let image_name = []
      const filePathsPromises = []
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file))
        image_name.push(file.name)
        // filePathsPromises.push(file.name)
      })
      const filePaths = await Promise.all(filePathsPromises, image_name)
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
      }))
      let tempFile = mappedFiles

      tempFile.forEach((obj2) => {
        const exists = this.file_name2.some((obj1) => obj1.name === obj2.name)
        if (!exists) {
          console.log("not duplicate")
          this.file_name2.push(obj2)
        }
      })

      console.log(mappedFiles)
      this.uploadFileS3(this.file_name2)
    },

    uploadFileS3(file) {
      // let data = {
      //   attach: file ? file : "null",
      // };
      if (file) {
        this.data2.attach = file
      }
      this.$store
        .dispatch("attachments/add", { data: this.data2 })
        .then(() => {
          this.linkWithUrl = this.$store.state.attachments.links
          // resolve();
          // console.log("file.type: ", this.data2);
          console.log("file.type:", file)

          // this.linkWithUrl = this.linkWithUrl.filter(item1 => file.filter(item2=> item1.fileName === item2.name).map(item2=>{
          //   console.log("checing", item1.fileName, item2.name)
          //   return {type:item2.type}}))
          // console.log(file[0].name);
          // console.log(this.linkWithUrl);

          // this.linkWithUrl.forEach(i)
          let result = []
          this.linkWithUrl.forEach((obj1) => {
            const obj2 = file.find((obj) => obj.name === obj1.fileName)

            if (obj2) {
              const newObj = { ...obj1, type: obj2.type }
              result.push(newObj)
            }
          })
          this.linkWithUrl = result
          console.log(this.linkWithUrl)
        })
        .catch(() => {})
    },
    chooseTemplates(data) {
      this.default_todo = []
      this.additional_todo = []
      this.todo_field = []
      if (data.subtask_body.length > 0) {
        this.default_todo.push(data.subtask_body[0].steps_body)
        data.subtask_body.forEach((element) => {
          if (element.steps_body != this.default_todo[0]) {
            this.repeatAgain()
            this.additional_todo.push(element.steps_body)
          }
        })
        document.getElementById("sub-tasks-templates").style.display = "none"
        document.getElementById("sub-tasks-form").style.display = "block"
        this.textHeader = "Choose from Templates"
      }
    },
    setSpecialMd() {
      if (this.$router.currentRoute.name == "tasks") {
        return "3"
      } else {
        return "4"
      }
    },
    toggleAttach() {
      if (this.textAttach == "Add Attachment(s)") {
        this.textAttach = "Remove Attachment(s)"
        document.getElementById("attachments-container").style.display = "block"
      } else {
        document.getElementById("attachments-container").style.display = "none"
        this.textAttach = "Add Attachment(s)"
      }
    },
    showTemplatesTodo() {
      if (this.textHeader == "Choose from Templates") {
        this.textHeader = "Hide Templates"
        document.getElementById("sub-tasks-form").style.display = "none"
        document.getElementById("sub-tasks-templates").style.display = "block"
      } else {
        this.textHeader = "Choose from Templates"

        document.getElementById("sub-tasks-form").style.display = "block"
        document.getElementById("sub-tasks-templates").style.display = "none"
      }
    },
    onOpen() {},
    onApply(item, key, replacedWith) {
      this.subtask_mentions.push({ id: item.id, name: item.name })
      console.log(item, `has been replaced with ${replacedWith}`)
    },
    repeatAgain() {
      ;(this.add_todo = true),
        this.todo_field.push({
          id: (this.nextTodoId += this.nextTodoId),
        })
    },
    removeItem(index) {
      this.todo_field.splice(index, 1)
      this.additional_todo.splice(index, 1)

      // this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    toggleAddTodo() {
      if (this.textTodo == "Add Sub-Task") {
        this.textTodo = "Remove Sub-Task"
        document.getElementById("sub-tasks-container").style.display = "block"
      } else {
        document.getElementById("sub-tasks-container").style.display = "none"
        this.textTodo = "Add Sub-Task"
      }
    },
    setMd(length) {
      if (length === 1 || length === 0) {
        return "4"
      } else {
        return "3"
      }
    },

    categoryUser(data) {
      // console.log(data);

      var d = new Date()
      var date = data.due_date
      if (date != null) {
        d.setDate(d.getDate() + date)
        this.formData.due_date = d
      }
      if (data.users.length > 0) {
        this.formData.users = data.users
      }
    },
    fetchBranches() {
      // this.$store.dispatch('branches/fetch')
    },
    fetchCategories() {
      // this.$store.dispatch('categories/fetch')
    },
    fetchClients() {
      // this.$store.dispatch('clients/fetch')
    },
    fetchContactPeople() {
      this.$store.dispatch("contactPeople/fetchForLeads")
    },
    fetchAllUsers() {
      this.$store.dispatch("allUsers/fetch")
    },

    resetFormData() {
      this.formData.subject = ""
      this.file_name2 = []
      this.default_todo = []
      this.additional_todo = []
      this.todo_field = []
      this.formData.description = ""
      this.formData.contact_person_id = this.$store.state.contactPeople
        .singleData.id
        ? this.$store.state.contactPeople.singleData
        : this.paginated_contact[0]
      this.formData.company_id = null
      this.formData.branch_id = this.branches[0]
      this.formData.category_id = ""
      this.formData.due_date = this.currentDate

      this.formData.users = this.$store.state.users.all.filter(
        (e) => e.email === JSON.parse(localStorage.getItem("userData")).email
      )

      this.textAttach = "Add Attachment(s)"
      this.textHeader = "Choose from Templates"
      this.textTodo = "Add Sub-Task"

      //   this.formData.email = '';

      // this.formData.due_date = 2;
      // this.formData.users = [];
    },
    closeModal() {
      this.$refs["modal-new-leads"].hide()
      this.resetFormData()
    },
    onSubmit() {
      const date = new Date()
      // let getData = this.items.find(e => e.)
      const due = new Date(this.formData.due_date)
      const due_day = due.getDate()
      const due_month = due.getMonth() + 1
      const due_year = due.getFullYear()
      this.formData.due_date = `${due_year}-${due_month}-${due_day}`
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let proposal_branch_id = 0
      if (this.branches.length === 1) {
        this.formData.branch_id = { b_id: this.default_branch_id }
        proposal_branch_id = this.branches[0].id
      }
      if (this.branches.length === 0) {
        this.$toast.error("Branch is Required", {
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
        })
      }
      if (this.$router.currentRoute.name == "tasks") {
        this.formData.type = "task"
      } else {
        this.formData.type = "lead"
      }

      if (this.$router.currentRoute.name == "tasks") {
        this.formData.proposals = {
          proposal_date: `${year}-${month}-${day}`,
          client_name:
            this.formData.company_id != null
              ? this.formData.company_id.name
              : "",
          concerned_person:
            this.formData.contact_person_id != null
              ? this.formData.contact_person_id.name
              : null,
          address:
            proposal_branch_id != 0
              ? this.$store.state.branches.all.find(
                  (e) => e.id === proposal_branch_id
                ).name
              : this.formData.branch_id.name,
          subject: this.formData.subject,
          prephase: "As per discussion, please find below the brief proposal",
          footer_title: "Thanking you,",
          footer_description:
            JSON.parse(localStorage.getItem("userData")).name +
            "<br/>For, " +
            JSON.parse(localStorage.getItem("userData")).tenant.organization
              .name +
            "<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)",
          internal_notes: "Thanking you",
          proposalSection: [],
          proposalFees: [
            {
              description: this.formData.subject,
              amount: this.formData.amount,
            },
          ],
          type: this.formData.type,
          client_id:
            this.formData.company_id != null
              ? this.formData.company_id.id
              : null,
        }
      }

      this.formData.subtask = {
        c_todo: this.default_todo.concat(this.additional_todo),
        user_ids: this.subtask_mentions,
      }

      this.formData.task_attachments = this.fileLinks

      // console.log(this.formData);
      if (this.$router.currentRoute.name == "tasks") {
        this.$store
          .dispatch("tasks/store", this.formData)
          .then(() => {
            this.$emit("refetch-data")
            // ref('modal-branches').hide();
            // emit("update:is-create-sidebar-active", false);
            this.$refs["modal-new-leads"].hide()
            this.$store.dispatch("tasks/fetch")
            // this.$store.dispatch('users/assign_emails');
          })
          .catch(() => {
            // refFormObserver.value.setErrors(errors.value);
          })
      } else {
        this.$store
          .dispatch("leads/store", this.formData)
          .then(() => {
            this.$emit("refetch-data")
            // ref('modal-branches').hide();
            // emit("update:is-create-sidebar-active", false);
            this.$refs["modal-new-leads"].hide()
            this.$store.dispatch("leads/fetch")
            // this.$store.dispatch('users/assign_emails');
          })
          .catch(() => {
            // refFormObserver.value.setErrors(errors.value);
          })
      }

      this.resetFormData()
    },
  },
  setup() {
    const date = new Date()

    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    // blankFormData.users = default_users
    const blankFormData = {
      subject: "",
      due_date: `${year}-${month}-${day}`,
      amount: null,
      priority: { id: 3 },
      contact_person_id: null,
      company_id: null,
      branch_id: null,
      category_id: null,
      users: [],
      type: "lead",
      description: "",

      //   email: "",
    }

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)))

    // let email = JSON.parse(localStorage.getItem('userData')).email
    // function onBeforeUpdate(() => {

    //   if(store.state.users.all.length > 0){

    //     store.state.users.all.forEach(element => {
    //       if(element.email === email){
    //         // this.formData.users.push(element)
    //         formData.value.users.push(element)
    //       }
    //     });
    //   }
    // })
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.leads.errors))
    })

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetFormData
    )

    //    const onSubmit = () => {
    //     console.log(formData);
    //   store
    //     .dispatch("clients/store", formData.value)
    //     .then(() => {
    //       emit("refetch-data");
    //       // ref('modal-branches').hide();
    //       // emit("update:is-create-sidebar-active", false);
    //     })
    //     .catch(() => {
    //       refFormObserver.value.setErrors(errors.value);
    //     });
    //     store.dispatch('clients/fetch')
    //   };
    return {
      formData,
      //   onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 21px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 13px;
  bottom: 0;
  background-color: #818181;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 19px;
  left: -1px;
  bottom: 2px;
  background-color: #f1f1f1;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f75949;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f75949;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
<style>
label {
  color: #202126;
  font-size: 14px;
}

.modal-lg {
  margin-top: 6.5rem;
}

@media (min-width: 992px) {
  #modal-new-leads .modal-lg {
    max-width: 1300px;
  }
}

.modal-title {
  text-transform: uppercase;
}
</style>
