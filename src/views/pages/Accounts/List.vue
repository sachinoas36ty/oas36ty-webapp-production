//list-accounts

<template>
  <div>
    <b-row>
      <b-col> </b-col>
      <b-col md="5"></b-col>
      <b-col md="3" class="text-right">
        <!-- <b-button size="sm" v-if="showProfposalModal == true && setPrivileges.invoice_create_edit === true" variant="primary" v-on:click="showCreateProposalModal">Create Proposals</b-button> -->
        <b-button
          size="sm"
          v-if="showExpensesModal == true"
          variant="primary"
          v-b-modal.modal-expense
        >
          <feather-icon icon="PlusCircleIcon" /> Add Expenses</b-button
        >
        <b-button
          size="sm"
          v-if="showProposalModal == true"
          variant="primary"
          v-on:click="showCreateProposalModal"
        >
          <feather-icon icon="PlusCircleIcon" /> Add Proposals</b-button
        >
        <!-- <b-button size="sm" v-if="showInvoicesModal == true && setPrivileges.invoice_create_edit === true" variant="primary" v-on:click="showCreateInvoicesModal">Create Invoice</b-button> -->
        <b-button
          size="sm"
          v-if="showInvoicesModal == true"
          variant="primary"
          @click="()=>{
                      showCreateInvoicesModal()
                      resetFormInvoice();
                      invoice.amount='',
                      invoice.billing_address='',
                      invoice.taxble_amt='',
                      invoice.total='',
                      invoice.total_amt='',
                      invoice.sub_total=''
                    }"
          
          ><feather-icon icon="PlusCircleIcon" /> Add Invoice</b-button
        >
        <!-- <b-button size="sm" v-if="showPaymentModal== true && setPrivileges.payment_add_edit === true" variant="primary" v-on:click="showCreatePaymentModal">Create Payment</b-button> -->
        <b-button
          size="sm"
          v-if="showPaymentModal == true"
          variant="primary"
          v-on:click="showCreatePaymentModal"
          ><feather-icon icon="PlusCircleIcon" /> Add Payment</b-button
        >
        <b-button
          size="sm"
          class="ml-1"
          v-if="showProposalModal == true"
          variant="primary"
          v-on:click="showFilterProposalModal"
        >
          <feather-icon icon="FilterIcon" />
        </b-button>
        <b-button
          size="sm"
          class="ml-1"
          v-if="showInvoicesModal == true"
          variant="primary"
          v-on:click="showFilterInvoicesModal"
        >
          <feather-icon icon="FilterIcon" />
        </b-button>
        <b-button
          size="sm"
          class="ml-1"
          v-if="showPaymentModal == true"
          variant="primary"
          v-on:click="showFilterPaymentModal"
        >
          <feather-icon icon="FilterIcon" />
        </b-button>
        

        <!-- all models here -->
        <!-- proposal modal -->
        <b-modal
          no-close-on-backdrop
          id="AccountSectionModal"
          ref="AccountSectionModal"
          size="lg"
          hide-footer
          v-model="CreateProposalModal"
          title="Create Proposals"
          @close="
          $refs['AccountSectionModal'].hide();
          resetFormProposals();
        "
        >
          <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(normalSubmit)">
           

              <b-row>
                <b-col md="12">
                  <span>Task/Lead*</span>
                  <ValidationProvider
                    #default="validationContext"
                    name="Task/Lead"
                    vid="Task/Lead"
                    rules="required"
                  >
                    <v-select
                    class=" my-custom-select"
                      v-model="proposalFormData.task"
                      placeholder="Tasks/Leads"
                      :options="tasksArrayComputed"
                      label="subject"
                      @input="prefillProposal"
                    >
                     

                      <template #option="option">
                        <div class="d-flex justify-content-between">
                          <div>#{{ option.id }} - {{ option.subject }}</div>
                          <div>
                            <b-badge :variant="buttonVariant(option.status_master.type)">
                              {{ option.status_master.type }}
                            </b-badge>
                          </div>
                        </div>
                       
                      </template>

                      <template #selected-option="option">
                        <div class="d-flex justify-content-between">
                          <div>#{{ option.id }} - {{ option.subject }}</div>
                          <div>
                            <b-badge :variant="buttonVariant(option.status_master.type)">
                              {{ option.status_master.type }}
                            </b-badge>
                          </div>
                        </div>
                      </template>
                    </v-select>
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-col>
              </b-row>
              
            
              <br />
              <br />
              
              <b-row style="margin-top: -40px;">
                <b-col md="12">
                   <div v-if="proposalFormData.task != null">
                <div class="p-1 d-flex  bg-light">
                  <b-col md="3">
                    <b>Client Name</b>
                  </b-col>
                  <b-col md="3">
                    <!-- <b>Dev</b> -->
                    {{proposalFormData.client != null ? proposalFormData.client.name : '-'}}
                  </b-col>
                  <b-col md="3">
                    <b>Branch </b>
                  </b-col>
                  <b-col md="3">
                    {{proposalFormData.branch != null ? proposalFormData.branch : '-'}}
                  </b-col>
                </div>
              </div>
                </b-col>
                <b-col class="text-right mt-2">
                  <b-button
                    size="sm"
                    class="mr-1"
                    variant="primary"
                    @click="
                    () => {

                      $refs['AccountSectionModal'].hide();
                      resetFormProposals();
                    }
                      "
                  >
                    <span class="text-nowrap"> Cancel</span>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="primary" 
                    :disabled="$store.state.proposals.isLoading"
                    
                    type="submit"
                  >
                    <span  class="text-nowrap"> Next</span>
                    
                  </b-button>
                  
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-modal>

        <b-modal
          no-close-on-backdrop
          id="AccountSectionModal2"
          ref="AccountSectionModal2"
          size="lg"
          hide-footer
          class="b-overlay position-relative"
          v-model="expandProposal"  
          title="Create Proposals"
          @close="
          $refs['AccountSectionModal'].hide();
          resetFormProposals();
        "
        >
          <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(handleSubmitCreateProposal)">
              <b-row>
                <b-col md="6">
                  <ValidationProvider
                    #default="validationContext"
                    name="pclient"
                    vid="proposal-client"
                    rules="required"
                  >
                    <b-form-group>
                      <template #label>
                        Client *
                        <feather-icon
                          icon="EditIcon"
                          class="cursor-pointer"
                          @click="
                            () => {
                              (ClientisEditSidebarActive = true), (editItemClient = pclient);
                            }
                          "
                        />
                      </template>
    
                      <v-select
                        v-on:input="autofillClient"
                        
                        label="name"
                        id="proposal-client"
                        v-model="proposalFormData.client"
                        placeholder="Search Client"
                        class="select-size-md my-custom-select"
                        :options="show_companys"
                      >
                        <template #list-header>
                          <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                            <!-- <b-button variant="primary" size="sm" v-b-modal.modal-1>
    
                    <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                            <a href="#">
                              <feather-icon
                                size="14"
                                style="margin-right: 0.5rem"
                                icon="PlusIcon"
                              />
                              New Client</a
                            >
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
                  <b-form-group label="Contact">
                    <v-select
                   
                      v-on:input="autofillContact"
                      v-model="proposalFormData.task.contact_person"
                      placeholder="Search Contact"
                      class="select-size-md my-custom-select"
                      label="name"
                      :options="show_contactPerson"
                    >
                      <template #list-header>
                        <div class="ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                          <!-- <b-button variant="primary" size="sm" v-b-modal.modal-1>
    
                    <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon
                              size="14"
                              style="margin-right: 0.5rem"
                              icon="PlusIcon"
                            />
                            New Contact</a
                          >
                        </div>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <!-- </b-card-body> -->
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Client Name" class="my-custom-select">
                    <b-form-input v-model="proposalFormData.clientName" placeholder="Enter Client Name" />
    
                    <!-- </b-form-input> -->
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Concerned Person" class="my-custom-select">
                    <b-form-input v-model="proposalFormData.concernedPersonName" placeholder="Enter Concerned Person" />
    
                    <!-- </b-form-input> -->
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Proposal Date" class="my-custom-select">
                    <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                    <VueDatePicker
                      format="YYYY-MM-DD"
                      style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                      :minDate="currentDate"
                      id="proposalDate"
                      v-model="pdate"
                    />
                    <!-- </b-form-input> -->
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <ValidationProvider
                    #default="validationContext"
                    name="paddress"
                    vid="address"
                    rules="required"
                  >
                    <b-form-group label="Address *" class="my-custom-select">
                      <b-form-textarea
                         
                        id="address"
                        v-model="proposalFormData.task.branch.name"
                        placeholder="Enter Address"
                      />
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                      <!-- </b-form-textarea> -->
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              
              <!-- expand proposal here -->
              <div >
              <b-row>
                <b-col md="12">
                  <b-form-group label="Subject" class="my-custom-select">
                    <b-form-input v-model="proposalFormData.task.subject" placeholder="Enter Subject">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Prephase" class="my-custom-select">
                    <b-form-input v-model="pphrase" placeholder="Enter Prephase">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-for="(items, index) in proposalFields" :key="items.proposal">
                <b-col md="12">
                  <b-form-group label="Title" class="my-custom-select">
                    <b-form-input v-model="items.title" placeholder="Enter Title">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Description">
                    <quill-editor v-model="items.desc" :options="editorOption"></quill-editor>
                  </b-form-group>
                  <div class="text-right">
                    <b-button
                      size="sm"
                      @click="removeProposal(index)"
                      variant="outline-primary"
                    >
                      Remove
                    </b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="px-1" md="12">
                  <div
                    class="actions-proposal my-1 p-2 d-flex justify-content-center bg-light"
                  >
                    <b-button size="sm" variant="primary" @click="addProposalField()">
                      <span class="text-nowrap"> Add Proposal Section</span>
                    </b-button>
                    <b-button
                      size="sm"
                      @click="
                        () => {
                          openModal('list-templates-modal');
                        }
                      "
                      v-show="proposalFields.length === 0"
                      class="ml-1"
                      variant="primary"
                    >
                      <span class="text-nowrap"> Choose From Templates</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row
                style="
                  border-bottom: inset;
                  border-color: #f75949;
                  margin-left: 0rem;
                  margin-bottom: 1rem;
                  margin-right: 0.5rem;
                "
              >
                <span style="margin-bottom: 0.5rem" class="text-uppercase">
                  fees details 
                </span>
              </b-row>
              <!-- <hr style="color:#f75949"> -->
              <b-row v-for="(amount, index) in amountField" :key="index">
                <b-col md="8">
                  <b-form-group label="Description" class="my-custom-select">
                    <b-form-input
                      v-model="amount.description"
                      placeholder="Enter Description"
                    />
                  </b-form-group>
                </b-col>
                <b-col class="d-flex flex-column" md="4">
                  <ValidationProvider
                    #default="validationContext"
                    name="amount"
                    vid="amount"
                    rules="required"
                  >
                    <b-form-group label="Amount *" class="my-custom-select">
                      <b-form-input
                      step="any"
                        type="number"
                        id="amount"
                         
                        v-model="amount.amount"
                        placeholder="Enter Amount"
                      />
    
                      <!-- </b-form-input> -->
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <div class="text-right">
                    <b-button
                      v-show="amountField.length > 1"
                      size="sm"
                      @click="removeAmount(index)"
                      variant="outline-primary"
                    >
                      Remove
                    </b-button>
                    <b-button
                      v-show="index === amountField.length - 1"
                      class="ml-1"
                      size="sm"
                      @click="addAmount()"
                      variant="primary"
                    >
                      Add more
                    </b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row v-show="amountField.length > 1" class="my-1">
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
                  <b-form-group label="Footer Title" class="my-custom-select">
                    <b-form-input v-model="pfootertitle" placeholder="Enter Footer Title">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Footer Description">
                    <quill-editor
                      v-model="pfooterdesc"
                      :options="editorOption"
                    ></quill-editor>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  
                    <b-form-group label="Internal Notes (Not visible for clients)" class="my-custom-select">
                      <b-form-input id="notes" v-model="pnotes" placeholder="Enter Notes">
                      </b-form-input>
                      
                    </b-form-group>
                </b-col>
              </b-row>
            </div>
              <br />
              <br />
              <b-row>
                <b-col md="8"></b-col>
                <b-col class="text-right">
                  <b-button
                    size="sm"
                    class="mr-1"
                    variant="primary"
                    @click="
                      $refs['AccountSectionModal2'].hide();
                      resetFormProposals();
                    "
                  >
                    <span class="text-nowrap"> Cancel</span>
                  </b-button>
                 
                  <b-button
                    size="sm"
                    variant="primary"
                    type="submit"
                    :disabled="$store.state.proposals.isLoading"
                    
                  >
                    <span  class="text-nowrap"> create</span>
                <b-spinner small class="ml-1" v-if="$store.state.proposals.isLoading" />
                </b-button>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
          <div v-if="$store.state.proposals.isLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Creating Proposals..</span>
      </div>
    </div>
        </b-modal>

        <!-- invoice modal -->
        <b-modal
          no-close-on-backdrop
          id="InvoiceSectionModal"
          ref="InvoiceSectionModal"
          size="lg"
          hide-footer
          v-model="CreateInvoicesModal"
          title="Create Invoice"
          class="b-overlay position-relative"
          @close="
          $refs['InvoiceSectionModal'].hide();
          resetFormInvoice();
        "
        >
          <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(normalSubmitInvoice)">
              <!-- handleSubmitCreateInvoice -->
              <b-row class="d-none">
                <b-col md="6"
                  ><span>Client*</span>
                  <ValidationProvider
                    #default="validationContext"
                    name="Client"
                    vid="Client"
                    rules="required"
                  >
                    <b-form-group>
                      <v-select
                        v-model="invoiceFormData.client"
                        :options="clientArrayComputed"
                      />
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
                <b-col md="6">
                  <span>Branch*</span>
                  <v-select
                    v-model="invoiceFormData.branch"
                    :options="branchArrayComputed"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <span>Task/Lead*</span>
                  <ValidationProvider
                    #default="validationContext"
                    name="Task/Lead"
                    vid="Task/Lead"
                    rules="required"
                  >
                    <b-form-group class="my-custom-select">
                      <v-select class="my-custom-select"
                        v-model="invoiceFormData.task"
                        placeholder="Tasks/Leads"
                        @input="prefillInvoice"
                        :options="tasksArrayOnlyProposal"
                        label="subject"
                      >
                        <template #option="{ id, subject, self_user }">
                          <div class="d-flex justify-content-between">
                            <div>#{{ id }} - {{ subject }}</div>
                            <div>
                              <b-badge :variant="buttonVariant(self_user.status)">
                                {{ self_user.status }}
                              </b-badge>
                            </div>
                          </div>
                        </template>

                        <template #selected-option="{ id, subject, self_user }">
                          <div class="d-flex justify-content-between">
                            <div>#{{ id }} - {{ subject }}</div>
                            <div>
                              <b-badge :variant="buttonVariant(self_user.status)">
                                {{ self_user.status }}
                              </b-badge>
                            </div>
                          </div>
                        </template>
                      </v-select>
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
             
              <br />
              <br />

              <b-row style="margin-top: -40px;">
                <b-col md="12">
                   <div v-if="invoiceFormData.branch != null">
                <div class="p-1 d-flex  bg-light"  >
                  <b-col md="3">
                    <b>Client Name</b>
                  </b-col>
                  <b-col md="3">
                    <!-- <b>Dev</b> -->
                    {{invoiceFormData.client != null ? invoiceFormData.client : '-'}}
                  </b-col>
                  <b-col md="3">
                    <b>Branch </b>
                  </b-col>
                  <b-col md="3">
                    {{invoiceFormData.branch != null ? invoiceFormData.branch : '-'}}
                  </b-col>
                </div>
              </div>
                </b-col>
            </b-row>
              <b-row class="mt-1">
                <b-col md="12" v-if="invoiceFormData.branch != null">
                  <span>Proposals*</span>
                  <ValidationProvider
                    #default="validationContext"
                    name="proposal"
                    vid="proposal"
                    rules="required"
                  >
                    <b-form-group class="my-custom-select">
                      <v-select class="my-custom-select"
                        v-model="selectedProposal"
                        placeholder="Proposals"
                        :options="proposalToDisplay"
                        label="subject"
                      >
                        <template #option="option">
                          <div class="d-flex justify-content-between">
                            <div>#PL-{{ option.id }}-2023 - {{ option.subject }} </div>
                            <div>
                               <b-badge :variant="buttonVariant(option.status)">
                                {{ option.status>0? option.status+"% Invoiced": "Not Invoiced" }}
                              </b-badge> 
                            </div>
                          </div>
                        </template>

                        <template #selected-option="option">
                          <div class="d-flex justify-content-between">
                            <div>#PL-{{ option.id }}-2023 - {{ option.subject }}</div>
                            <div>
                              <b-badge :variant="buttonVariant(option.status)">
                                {{ option.status>0? option.status+"% Invoiced": "Not Invoiced" }}
                              </b-badge>
                            </div>
                          </div>
                        </template>
                      </v-select>
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="8"></b-col>
                <b-col class="text-right  mt-1">
                  <b-button
                    size="sm"
                    class="mr-1"
                    variant="primary"
                    @click="
                      $refs['InvoiceSectionModal'].hide();
                      resetFormInvoice();
                    "
                  >
                    <span class="text-nowrap"> Cancel</span>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="primary"
                    :disabled="$store.state.invoice.isLoading"
                    @click="()=>{
                      CreateInvoicesModalExpand = true;
                      CreateInvoicesModal=false;
                      
                      
                     invoice.amount2 = getStatusForProposal(selectedProposal)
                     
                    }"
                  >
                    <span class="text-nowrap"> Next</span>
                    
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
          <div v-if="!$store.state.invoice.isLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Creating Invoice..</span>
      </div>
    </div>
        </b-modal>
        <!-- Expand here -->
        <b-modal
      no-close-on-backdrop
      id="InvoiceSectionModal2"
      ref="InvoiceSectionModal2"
      v-model="CreateInvoicesModalExpand"
      size="lg"
      class='b-overlay position-relative'
      hide-footer
      @close="
          $refs['InvoiceSectionModal2'].hide();
          resetFormInvoice();
        "
    >
      <template #modal-title>
        {{ invoiceTitle == "add" ? "Add invoice" : "edit invoice" }}
      </template>
      <!-- <b-card-body> -->
      <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          @submit.prevent="
            handleSubmit(handleSubmitCreateInvoice)
          "
        >
          <b-row>
            <b-col md="4">
              <b-form-group v-if="invoiceTitle == 'add'">
                <template #label>
                  Client *
                  <!-- <feather-icon icon="EditIcon" class="cursor-pointer" @click="() => {
                    ClientisEditSidebarActive = true,
                      editItemClient = pclient
                  }" /> -->
                </template>
                <ValidationProvider
                  #default="validationContext"
                  name="Client"
                  vid="Client"
                  rules="required"
                >
                  <v-select 
                    v-on:input="autofillClient"
                    label="name"
                    v-model="invoiceFormData.client"
                    placeholder="Search Client"
                    class="select-size-md my-custom-select"
                    :options="show_companys"
                  >
                    <template #list-header>
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                        <!-- <b-button variant="primary" size="sm" v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon
                            size="14"
                            style="margin-right: 0.5rem"
                            icon="PlusIcon"
                          />
                          New Client</a
                        >
                      </div>
                    </template>
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
              <b-form-group label="Client Name" v-else>
                <b-form-input readonly v-model="invoice.client_name"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Client GST Number" class="my-custom-select">
                <b-form-input
                  @input="pan"
                  v-bind:class="
                    (invoice.gstNumber.length > 0 && invoice.gstNumber.length !== 15) ||
                    (invoice.gstNumber.length === 15 && gsterr === true)
                      ? 'is-invalid'
                      : ''
                  "
                  v-model="invoice.gstNumber"
                  placeholder="Client GST Number"
                >
                </b-form-input>
                <span
                  v-if="
                    (invoice.gstNumber.length > 0 && invoice.gstNumber.length !== 15) ||
                    (invoice.gstNumber.length === 15 && gsterr === true)
                  "
                  class="d-block invalid-feedback"
                  id="errmsg"
                  >Invalid gst number</span
                >
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group class="my-custom-select">
                <template #label> State </template>
                <v-select 
                  @input="getStateCode"
                  label="name"
                  v-model="invoice.state"
                  placeholder="Search State"
                  class="select-size-md my-custom-select"
                  :options="allStates"
                >
                </v-select>
              </b-form-group>
            </b-col>
            <!-- </b-card-body> -->
          </b-row>
          <b-row>
            <b-col md="4">
              <b-form-group v-if="invoiceTitle == 'add'">
                <template #label>
                  Invoice Number
                  <feather-icon
                    icon="EditIcon"
                    @click="
                      () => {
                        // invoice.id = invoice.prefix.substr(invoice.prefix.length -1)
                        $refs['invoice-charges-modal'].show();
                      }
                    "
                  />
                </template>
                <b-form-input class="my-custom-select" v-model="prefixPlusid" placeholder="Invoice Number" />

                <!-- </b-form-input> -->
              </b-form-group>
              <b-form-group label="Invoice Number" v-else>
                <b-form-input readonly v-model="invoice.id"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Invoice Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker
                  format="YYYY-MM-DD"
                  :minDate="currentDate"
                  style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                  id="proposalDate"
                  v-model="invoice.pdate"
                />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Due Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker
                  format="YYYY-MM-DD"
                  :minDate="currentDate"
                  style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                  id="proposalDate"
                  v-model="invoice.due_date"
                />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Billing Address" class="my-custom-select">
                <b-form-input
                  v-model="itemNewDetails[0].address"
                  placeholder="Billing Address"
                />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Notes" class="my-custom-select">
                <b-form-input v-model="invoice.notes" placeholder="Notes" />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="" md="12">
              <div class="table-responsive bg-light">
                <table border="0" id="invoice-table" class="table">
                  <thead
                    style="
                      background-color: ##edededd9 !important;
                      color: black;
                      line-height: 2;
                    "
                  >
                    <tr>
                      <th style="width: 5%">SI.No</th>
                      <th style="width: 20%">Item Details</th>
                      <th class="text-right" style="width: 15%">Amount</th>
                      <th class="text-right" style="width: 10%">Discount</th>
                      <th class="text-right" style="width: 15%">Taxable Amt.</th>
                      <th class="text-right" style="width: 10%">GST(%)</th>
                      <th class="text-right" style="width: 10%">GST Amt.</th>
                      <th class="text-right" style="width: 15%">Total Amt.</th>
                    </tr>
                  </thead>
                  <tbody style="line-height: 4">
                    <tr>
                      <td style="width: 5%">1</td>
                      <td style="width: 20%">
                        <b-form-input
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          v-model="itemNewDetails[0].subject"
                        />
                      </td>
                      <td style="width: 15%">
                        <b-form-input 
                          
                          @input="getAmt"
                          class="text-right my-custom-select"
                          required
                          placeholder="Amount"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          step="0.01"
                          v-model.number="invoice.amount"
                          type="number"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                        
                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="Discount"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model.number="invoice.discount"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%" class="my-custom-select">
                        <b-form-input
                        
                          class="text-right my-custom-select"
                          placeholder="Taxable Amount"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          step="0.01"
                          v-model.number="invoice.taxble_amt"
                          type="number"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                        
                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="IGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.igst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                          readonly
                          
                          class="text-right my-custom-select"
                          placeholder="IGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.igst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%">
                        <b-form-input
                          class="text-right"
                          readonly
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                            cursor:not-allowed;
                          "
                          v-model="invoice.total_amt"
                          step="0.01"
                          type="number"
                        ></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 5%">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%">
                        <b-form-input
                        
                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="SGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.sgst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                        class="my-custom-select text-right"
                          readonly
                          
                          placeholder="SGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.sgst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%"></td>
                    </tr>
                    <tr>
                      <td style="width: 5%">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%">
                        <b-form-input
                        class="my-custom-select text-right"
                          @input="getAmt"
                          
                          placeholder="CGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.cgst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%">
                        <b-form-input
                        class="my-custom-select text-right"
                          readonly
                         
                          placeholder="CGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.cgst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%"></td>
                    </tr>
                    <tr>
                      <td style="width: 5%">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%">
                        <b-form-input
                        class="my-custom-select text-right"
                          @input="getAmt"
                         
                          placeholder="UTGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.utgst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%">
                        <b-form-input
                        
                          readonly
                          class="text-right my-custom-select"
                          placeholder="UTGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.utgst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%"></td>
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
                      <td class="text-right my-custom-select">
                        <b-form-input
                          @input="getAmt"
                          
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                          "
                          class="text-right "
                          type="number"
                          step="0.01"
                          v-model="invoice.pocket_expense"
                          placeholder="out of pocket expense amount"
                        />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="text-right my-custom-select">
                        <b-form-input
                          v-model="invoice.expense_details"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                          "
                          class="text-right my-custom-select"
                          placeholder="out of pocket expense details"
                        />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr>
                      <td>Adjustments</td>
                      <td class="text-right">
                        <b-form-input
                          @input="getAmt"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                          "
                          class="text-right"
                          type="number"
                          step="0.01"
                          v-model="invoice.adjustments"
                        />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr style="background: #f8f8f8">
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
                <b-button
                  size="sm"
                  class="mr-1"
                  variant="primary"
                  @click="
                    () => {
                      $refs['InvoiceSectionModal2'].hide();
                      selectedProposal=null
                      // invoice.amount='',
                      // billing_address='',
                      // taxble_amt='',
                      // total='',
                      // total_amt='',
                      // sub_total=''
                     
                    }
                  "
                >
                  <span class="text-nowrap"> Cancel</span>
                </b-button>
                <b-button size="sm" :disabled="$store.state.invoice.isLoading" variant="primary" type="submit">
                  <span class="text-nowrap">
                    {{ invoiceTitle == "add" ? "Create" : "Update" }}
                  </span>
                  <b-spinner small class="ml-1" v-if="$store.state.invoice.isLoading" />

                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
      <div v-if="$store.state.invoice.isLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Creating Invoice..</span>
      </div>
    </div>
    </b-modal>
        <!-- payment modal -->

        <b-modal
          @hidden="resetPaymentSectionModalDetails"
          no-close-on-backdrop
          id="PaymentSectionModal"
          ref="PaymentSectionModal"
          size="lg"
          hide-footer
          v-model="CreatePaymentModal"
          title="Create Payment"
          class="b-overlay position-relative"
        >
          <validationObserver #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(handleSubmitCreatePayment)">
              <b-row>
                <b-col md="4">
                  <ValidationProvider
                    #default="validationContext"
                    name="Client"
                    vid="Client"
                    rules="required"
                  >
                    <b-form-group label="Client Name*" class="my-custom-select">
                      <v-select
                        v-model="payment.client"
                        placeholder="Search Client"
                        @input="putValuePaymentTotalArray"
                        :options="show_companys"
                        label="name"
                      >
                      </v-select>
                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
                <b-col md="4">
                  <b-form-group label="Payment Mode" class="my-custom-select">
                    <v-select
                      v-model="payment.mode"
                      placeholder="Payment Mode"
                      :options="payment_modes"
                      label="name"
                    >
                    </v-select>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <ValidationProvider
                    #default="validationContext"
                    name="Payment Amount"
                    vid="Payment Amount"
                    rules="required"
                  >
                    <b-form-group label="Payment Amount*">
                      <b-form-input
                        v-model.number="payment.amount"
                        @input="checkGreaterAmount"
                        type="number"
                        step="any"
                      />

                      <b-form-invalid-feedback class="d-block">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <div v-if="greaterAmountSingle" class="alert alert-danger" role="alert">
                    Payment Amount is Greater than Total Amount
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <b-form-group label="Payment Date">
                    <VueDatePicker
                      format="YYYY-MM-DD"
                      style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                      :minDate="currentDate"
                      id="proposalDate"
                      v-model="payment.date"
                    />
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group label="Reference Id">
                    <b-form-input v-model="payment.reference_id"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group label="Notes">
                    <b-form-input v-model="payment.notes"> </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- extend start here -->
              <div
                v-if="payment.client && filteredInvoiceClientLessThan100.length > 0"
                data-v-6d78c756=""
                class=""
              >
                <div data-v-6d78c756="">
                  <div class="table-responsive-sm">
                    <table
                      role="table"
                      aria-busy="false"
                      aria-colcount="6"
                      class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                      id="pending-invoices"
                    >
                      <caption>
                        <input class="mb-2" type="checkbox" v-model="payment.tax" />
                        <span
                          class="cursor-pointer"
                          @click="
                            () => {
                              if (!payment.tax) {
                                payment.tax = true;
                              } else {
                                payment.tax = false;
                              }
                            }
                          "
                          >Customer has deducted Tax </span
                        ><br />
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
                            <span
                              >Amount(<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
                          </th>
                          <th role="columnheader" scope="col" aria-colindex="5" class="">
                            <span
                              >Amount Due (<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
                          </th>
                          <th
                            v-if="payment.tax"
                            role="columnheader"
                            scope="col"
                            aria-colindex="5"
                            class=""
                          >
                            <span
                              >TDS deducted(<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
                          </th>
                          <th role="columnheader" scope="col" aria-colindex="6" class="">
                            <span
                              >Payment(<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
                          </th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        <!---->

                        <tr
                          role="row"
                          v-for="(invoice, index) in paid_payment.length > 0
                            ? paid_payment
                            : slicedRows"
                        >
                          <!-- filteredInvoiceClient -->
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
                          <td v-if="payment.tax">
                            <b-form-input
                              @input="setTds(invoice.id, $event)"
                              :value="setedittds(invoice.id)"
                              type="number"
                              step="any"
                              class="hide form-control"
                              :id="String(invoice.id)"
                            ></b-form-input>
                          </td>
                          <td aria-colindex="6" role="cell" class="">
                            <div class="form-group m-0">
                              <!-- {{ index }} -->
                              <!-- <div class="form-line"><b-form-input @input="setPayment(index, $event)" type="number" 
                              class="hide form-control" :id="String(invoice.id)" /></div> -->
                              <div class="form-line">
                                <b-form-input
                                  @input="setPayment(invoice.id, $event)"
                                  type="number"
                                  step="any"
                                  :value="seteditPayment(invoice.id)"
                                  class="hide form-control"
                                  :id="String(invoice.id)"
                                />
                              </div>
                            </div>
                            <div
                              v-if="greaterAmount[index]"
                              class="alert alert-danger"
                              role="alert"
                            >
                              Payment is Greater than Amount Due
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
                            Total  (<font-awesome-icon
                              icon="indian-rupee-sign"
                              class="icon cursor-pointer"
                            />)
                          </th>
                          <th
                            v-if="payment.tax"
                            role="columnheader"
                            scope="col"
                            aria-colindex="6"
                            class=""
                          >
                            {{ getTotalTds(payment.payment) }}
                          </th>
                          <th role="columnheader" scope="col" aria-colindex="6" class="">
                            {{ getTotalAmt(payment.payment) }}
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                    <b-pagination v-model="currentPagePaymentTableModel" :total-rows="filteredInvoiceClientLessThan100.length" :per-page="perPagePaymentTable">
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>

                  </div>
                  <div class="row">
                    <div class="col-sm-5"></div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5" style="float: right">
                      <div class="list-group text-right">
                        <div
                          class="list-group-item d-flex justify-content-between align-items-center text-muted"
                        >
                          <span
                            >Amount Received (<font-awesome-icon
                              icon="indian-rupee-sign"
                              class="icon cursor-pointer"
                            />)</span
                          >
                          <span class="">
                            {{ payment.amount }}
                          </span>
                        </div>
                        <div
                          class="list-group-item d-flex justify-content-between align-items-center text-muted"
                        >
                          <span
                            >Amount used only (<font-awesome-icon
                              icon="indian-rupee-sign"
                              class="icon cursor-pointer"
                            />)</span
                          >
                          <span class="">
                            {{ getTotalAmt(payment.payment) }}
                          </span>
                        </div>
                        <div
                          class="list-group-item d-flex justify-content-between align-items-center text-muted"
                        >
                          <span
                            >Amount in excess (<font-awesome-icon
                              icon="indian-rupee-sign"
                              class="icon cursor-pointer"
                            />)</span
                          >
                          <span class="">
                            {{ getExcess() }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center" v-else-if="payment.client">
                <div
                class="actions-proposal my-1 p-2 d-flex justify-content-center bg-light"
              >
              <h5 style="color: red">No Invoice With Selected Client</h5>
                
              </div>
              </div>

              <!-- extend ends here -->
              <br />
              <br />
              <b-row>
                <b-col md="8"></b-col>
                <b-col class="text-right">
                  <b-button
                    size="sm"
                    class="mr-1"
                    variant="primary"
                    @click="$refs['PaymentSectionModal'].hide()"
                    @hidden="resetPaymentSectionModalDetails"
                  >
                    <span class="text-nowrap"> Cancel </span>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="primary"
                    type="submit"
                    :disabled="$store.state.recordPayment.isLoading"
                  >
                    <span class="text-nowrap"> Create</span>
                    <b-spinner
                      small
                      class="ml-1"
                      v-if="$store.state.recordPayment.isLoading"
                    />
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validationObserver>
          <div v-if="$store.state.recordPayment.isLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Creating Payment Details..</span>
      </div>
    </div>
        </b-modal>

        <!-- filter Modal proposal -->

        <!-- all models here ends-->
      </b-col>
    </b-row>
    <!-- B-card for filter  -->
    

    

 
    <!-- b-card for filter ends here -->

    <!-- b-modal for proposal button  -->

    <b-modal
      no-close-on-backdrop
      id="proposal-edit-modal"
      ref="proposal-edit-modal"
      size="lg"
      title="Edit proposal"
      hide-footer
    >
      <!-- <b-card-body> -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form @submit.prevent="handleSubmit(editProposal)">
          <b-row>
            <b-col md="6">
              <ValidationProvider
                #default="validationContext"
                name="Client"
                vid="Client"
                rules="required"
              >
                <b-form-group label="Client Name *" class="my-custom-select *">
                  <b-form-input
                     
                    v-model="pname"
                    placeholder="Enter Client Name"
                  />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                  <!-- </b-form-input> -->
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <b-form-group label="Concerned Person">
                <b-form-input v-model="pperson" placeholder="Enter Concerned Person" />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Proposal Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker
                  format="YYYY-MM-DD"
                  style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                  :minDate="currentDate"
                  id="proposalDate"
                  v-model="pdate"
                />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <ValidationProvider
                #default="validationContext"
                name="address"
                vid="address"
                rules="required"
              >
                <b-form-group label="Address *" class="my-custom-select">
                  <b-form-textarea
                     
                    id="address"
                    v-model="paddress"
                    placeholder="Enter Address"
                  />

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
              <b-form-group label="Subject" class="my-custom-select">
                <b-form-input v-model="psubject" placeholder="Enter Subject">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Prephase" class="my-custom-select">
                <b-form-input v-model="pphrase" placeholder="Enter Prephase">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-for="(items, index) in proposalFields" :key="index">
            <b-col md="12">
              <b-form-group label="Title" class="my-custom-select">
                <b-form-input v-model="items.title" placeholder="Enter Title">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Description">
                <quill-editor v-model="items.desc" :options="editorOption"></quill-editor>
              </b-form-group>
              <div class="text-right">
                <b-button
                  size="sm"
                  @click="removeProposal(index)"
                  variant="outline-primary"
                >
                  Remove
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="px-1" md="12">
              <div
                class="actions-proposal my-1 p-2 d-flex justify-content-center bg-light"
              >
                <b-button size="sm" variant="primary">
                  <span class="text-nowrap" @click="addProposalField()">
                    Add Proposal Section</span
                  >
                </b-button>
                <b-button
                  @click="
                    () => {
                      // $refs['list-templates-modal'].show()
                      openModal('list-templates-modal');
                    }
                  "
                  v-show="proposalFields.length === 0"
                  class="ml-1"
                  variant="primary"
                  size="sm"
                >
                  <span class="text-nowrap"> Choose From Templates</span>
                </b-button>
              </div>
            </b-col>
          </b-row>

          <b-row
            style="
              border-bottom: inset;
              border-color: #f75949;
              margin-left: 0rem;
              margin-bottom: 1rem;
              margin-right: 0.5rem;
            "
          >
            <span style="margin-bottom: 0.5rem" class="text-uppercase">
              fees details 
            </span>
          </b-row>
          <b-row v-for="(amount, index) in amountField" :key="index">
            <b-col md="8">
              <b-form-group label="Description" class="my-custom-select">
                <b-form-input
                  v-model="amount.description"
                  placeholder="Enter Description"
                />
              </b-form-group>
            </b-col>
            <b-col class="d-flex flex-column" md="4">
              <ValidationProvider
                #default="validationContext"
                name="amount"
                vid="amount"
                rules="required"
              >
                <b-form-group label="Amount *" class="my-custom-select">
                  <b-form-input
                    type="number"
                    step="any"
                    v-model="amount.amount"
                    placeholder="Enter Amount"
                  />

                  <!-- </b-form-input> -->
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <div class="text-right">
                <b-button
                  v-show="amountField.length > 1"
                  size="sm"
                  @click="removeAmount(index)"
                  variant="outline-primary"
                >
                  Remove
                </b-button>
                <b-button
                  v-show="index === amountField.length - 1"
                  class="ml-1"
                  size="sm"
                  @click="addAmount()"
                  variant="primary"
                >
                  Add more
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row v-show="amountField.length > 1" class="my-1">
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
              <b-form-group label="Footer Title" class="my-custom-select">
                <b-form-input v-model="pfootertitle" placeholder="Enter Footer Title" />

                <!-- </b-form-input v-model="pfootertitle"> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Description">
                <quill-editor
                  v-model="pfooterdesc"
                  :options="editorOption"
                ></quill-editor>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <!-- <ValidationProvider
                #default="validationContext"
                name="Notes"
                vid="Notes"
                rules="required"
              > -->
                <b-form-group label="Internal Notes (Not visible for clients)" class="my-custom-select">
                  <b-form-input
                     
                    v-model="pnotes"
                    placeholder="Enter Notes"
                  >
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
                <b-button
                  size="sm"
                  class="mr-1"
                  variant="primary"
                  @click="$refs['proposal-edit-modal'].hide()"
                >
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

    <!-- b-modal for proposal button ends here -->

    <!-- b-modal for create invoice button -->
    <b-modal
      no-close-on-backdrop
      id="invoice-modal"
      ref="invoice-modal"
      size="lg"
      hide-footer
    >
      <template #modal-title>
        {{ invoiceTitle == "add" ? "Add invoice" : "edit invoice" }}
      </template>
      <!-- <b-card-body> -->
      <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          @submit.prevent="
            handleSubmit(invoiceTitle == 'add' ? addInvoice : updateInvoice)
          "
        >
          <b-row>
            <b-col md="4">
              <b-form-group v-if="invoiceTitle == 'add'">
                <template #label>
                  Client
                  <!-- <feather-icon icon="EditIcon" class="cursor-pointer" @click="() => {
                    ClientisEditSidebarActive = true,
                      editItemClient = pclient
                  }" /> -->
                </template>
                <v-select
                  v-on:input="autofillClient"
                  label="name"
                  v-model="invoice.client"
                  placeholder="Search Client"
                  class="select-size-md my-custom-select"
                  :options="show_companys"
                >
                  <template #list-header>
                    <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                      <!-- <b-button variant="primary" size="sm" v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                      <a href="#">
                        <feather-icon
                          size="14"
                          style="margin-right: 0.5rem"
                          icon="PlusIcon"
                        />
                        New Client</a
                      >
                    </div>
                  </template>
                </v-select>
              </b-form-group>
              <b-form-group label="Client Name*" v-else>
                <b-form-input readonly v-model="invoice.client_name"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Client GST Number">
                <b-form-input
                class="my-custom-select"
                  @input="pan"
                  v-bind:class="
                    (invoice.gstNumber.length > 0 && invoice.gstNumber.length !== 15) ||
                    (invoice.gstNumber.length === 15 && gsterr === true)
                      ? 'is-invalid'
                      : ''
                  "
                  v-model="invoice.gstNumber"
                  placeholder="Client GST Number"
                >
                </b-form-input>
                <span
                  v-if="
                    (invoice.gstNumber.length > 0 && invoice.gstNumber.length !== 15) ||
                    (invoice.gstNumber.length === 15 && gsterr === true)
                  "
                  class="d-block invalid-feedback"
                  id="errmsg"
                  >Invalid gst number</span
                >
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group class="my-custom-select">
                <template #label> State </template>
                <v-select
                  @input="getStateCode"
                  label="name"
                  v-model="invoice.state"
                  placeholder="Search State"
                  class="select-size-md my-custom-select"
                  :options="allStates"
                >
                </v-select>
              </b-form-group>
            </b-col>
            <!-- </b-card-body> -->
          </b-row>
          <b-row>
            <b-col md="4">
              <b-form-group v-if="invoiceTitle == 'add'">
                <template #label>
                  Invoice Number
                  <feather-icon
                    icon="EditIcon"
                    @click="
                      () => {
                        $refs['invoice-charges-modal'].show();
                      }
                    "
                  />
                </template>
                <b-form-input v-model="prefixPlusid" placeholder="Invoice Number" />

                <!-- </b-form-input> -->
              </b-form-group>
              <b-form-group label="Invoice Number" v-else>
                <b-form-input readonly v-model="invoice.id"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Invoice Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <b-form-datepicker id="proposalDate" v-model="invoice.pdate" />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Due Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <b-form-datepicker id="proposalDate" v-model="invoice.due_date" />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Billing Address" class="my-custom-select">
                <b-form-input
                  v-model="invoice.billing_address"
                  placeholder="Billing Address"
                />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Notes" class="my-custom-select">
                <b-form-input v-model="invoice.notes" placeholder="Notes" />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="" md="12">
              <div class="table-responsive bg-light">
                <table border="0" id="invoice-table" class="table">
                  <thead
                    style="
                      background-color: ##edededd9 !important;
                      color: black;
                      line-height: 2;
                    "
                  >
                    <tr>
                      <th style="width: 5%">SI.No</th>
                      <th style="width: 20%">Item Details</th>
                      <th class="text-right" style="width: 15%">Amount</th>
                      <th class="text-right" style="width: 10%">Discount</th>
                      <th class="text-right" style="width: 15%">Taxable Amt.</th>
                      <th class="text-right" style="width: 10%">GST(%)</th>
                      <th class="text-right" style="width: 10%">GST Amt.</th>
                      <th class="text-right" style="width: 15%">Total Amt.</th>
                    </tr>
                  </thead>
                  <tbody style="line-height: 4">
                    <tr>
                      <td style="width: 5%">1</td>
                      <td style="width: 20%">
                        <b-form-input
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          v-model="invoice.item_details"
                        />
                      </td>
                      <td style="width: 15%" class="my-custom-select">
                        <b-form-input
                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="Amount"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          step="0.01"
                          v-model.number="invoice.amount"
                          type="number"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input

                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="Discount"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model.number="invoice.discount"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%">
                        <b-form-input
                          class="text-right my-custom-select"
                          placeholder="Taxable Amount"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          step="0.01"
                          v-model.number="invoice.taxble_amt"
                          type="number"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                          @input="getAmt"
                          class="text-right "
                          placeholder="IGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.igst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                          readonly
                          class="text-right"
                          placeholder="IGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.igst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%" class="my-custom-select">
                        <b-form-input
                          class="text-right"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          v-model="invoice.total_amt"
                          step="0.01"
                          type="number"
                        ></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 5%">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%">
                        <b-form-input

                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="SGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.sgst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%" class="my-custom-select">
                        <b-form-input
                          readonly
                          class="text-right my-custom-select"
                          placeholder="SGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.sgst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%"></td>
                    </tr>
                    <tr>
                      <td style="width: 5%">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%">
                        <b-form-input
                          @input="getAmt"
                          class="text-right my-custom-select"
                          placeholder="CGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.cgst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%">
                        <b-form-input
                          readonly
                          class="text-right my-custom-select"
                          placeholder="CGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.cgst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%"></td>
                    </tr>
                    <tr>
                      <td style="width: 5%">
                        <!-- 1 -->
                      </td>
                      <td style="width: 20%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%"></td>
                      <td style="width: 15%"></td>
                      <td style="width: 10%">
                        <b-form-input
                          @input="getAmt"
                          class="text-right"
                          placeholder="UTGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="0.01"
                          v-model="invoice.utgst"
                        ></b-form-input>
                      </td>
                      <td style="width: 10%">
                        <b-form-input
                          readonly
                          class="text-right"
                          placeholder="UTGST"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            background-color: #f6f6f6 !important;
                            border-left: none;
                            border-right: none;
                          "
                          type="number"
                          step="any"
                          v-model="invoice.utgst_amt"
                        ></b-form-input>
                      </td>
                      <td style="width: 15%"></td>
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
                        <b-form-input
                          @input="getAmt"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                          "
                          class="text-right my-custom-select"
                          type="number"
                          step="0.01"
                          v-model="invoice.pocket_expense"
                          placeholder="out of pocket expense amount"
                        />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="text-right">
                        <b-form-input
                          v-model="invoice.expense_details"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                          "
                          class="text-right my-custom-select"
                          placeholder="out of pocket expense details"
                        />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr>
                      <td>Adjustments</td>
                      <td class="text-right">
                        <b-form-input
                          @input="getAmt"
                          style="
                            border-bottom-color: #1f91f3 !important;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                          "
                          class="text-right"
                          type="number"
                          step="0.01"
                          v-model="invoice.adjustments"
                        />

                        <!-- </b-input> -->
                      </td>
                    </tr>
                    <tr style="background: #f8f8f8">
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
    <b-modal
      no-close-on-backdrop
      id="invoice-charges-modal"
      ref="invoice-charges-modal"
      size="lg"
      title="invoice charges update"
      hide-footer
    >
      <b-row>
        <b-col md="6">
          <b-form-group label="Prefix">
            <b-form-input v-model="invoice.prefix" placeholder="Prefix"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Next Number">
            <b-form-input
              v-model="lastInvoiceId"
              placeholder="Next Number"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- <b-row> -->
      <div
        data-v-16fd8022=""
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        class="alert small alert-info"
      >
        <p style="color: black" data-v-16fd8022="">
          Current : {{ invoice.prefix + lastInvoiceId }}
        </p>
        <p style="color: black" data-v-16fd8022="">
          Previous :
          {{
            $store.state.invoice.allData.length > 0
              ? $store.state.invoice.allData[$store.state.invoice.allData.length - 1]
                  .invoice_number
              : ""
          }}
        </p>
      </div>
      <!-- </b-row> -->
      <div class="text-right">
        <b-button
          size="sm"
          variant="primary"
          @click="$refs['invoice-charges-modal'].hide()"
        >
          Update
        </b-button>
      </div>
    </b-modal>

    <!-- b-modal for create button ends here -->

    <b-tabs v-model="activeTab" @input="onTabChange">
      <!-- <b-tab v-if="setPrivileges.invoice===true" active id="accounts"> -->
      <!-- <b-tab v-if="setPrivileges.invoice===true" active id="accounts"> -->
      <b-tab active id="accounts">
        <template #title>
          {{ "PROPOSALS" }}
        </template>
        <b-card v-if="filterProposalModal" class="mt-1">
      <b-row>
        <b-col md="3"
          ><span>Client Name*</span>
          <v-select
          class="my-custom-select"
            v-model="selectedCompanyProposal"
            :options="clientArrayComputed"
            placeholder="Select the Client"
        /></b-col>
        <b-col md="3">
          <b-form-group>
            <span>Status</span>
            <v-select
            class="my-custom-select"
              v-model="filterStatus"
              :options="statusOptions"
              placeholder="Select the Status"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <span>From Date</span>

          <b-form-group>
            <VueDatePicker
              format="YYYY-MM-DD"
              style="border: 1px solid #d8d6de; border-radius: 0.357rem"
              id="proposalDate"
              v-model="fromDate"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <span>To Date</span>
          <b-form-group>
            <VueDatePicker
              format="YYYY-MM-DD"
              style="border: 1px solid #d8d6de; border-radius: 0.357rem"
              id="proposalDate"
              v-model="toDate"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <!-- <b-col md="8"></b-col> -->

        <b-col class="text-right"
          ><b-button
            size="sm"
            variant="primary"
            @click="
              () => {
                fromDate = null;
                toDate = null;
                selectedCompanyProposal = null;
                filterStatus = null;
              }
            "
            >Reset</b-button
          ></b-col
        >
      </b-row>
    </b-card>
        <b-card class="mt-2" no-body>
          <b-table
            id="proposals"
            :per-page="perPageProposal"
            :current-page="currentPageProposalTable"
            @row-clicked="onRowClickedProposal"
            selectable
            responsive
            :items="filteredProposalItems"
            :fields="proposalField"
            class="mb-0"
            :show-empty="
              !isLoadingProposal && filteredProposalItems.length == 0
            "
          >
            <template #cell(client_name)="{ item }">
              <span v-b-tooltip.hover="item.client_name">
                {{ item.client_name }}
                
              </span>
            </template>
            <template #cell(subject)="{ item }">
              <span v-b-tooltip.hover="item.subject">
                {{ item.subject }}
              </span>
            </template>

            <template #row-details="item">
              <b-card no-body class="ml-2 mt-2 mr-2 mb-0">
                <div
                  class="d-flex justify-content-between align-items-end"
                  style="text-transform: uppercase; font-weight: 500"
                >
                  <h4>Proposal Details</h4>

                  <div>
                    <b-button
                      size="sm"
                      v-if="
                        // getStatusForProposalNumber(item.item) < 100 ||
                        // getStatusForProposalNumber(item.item) == null
                        item.item.status < 100 || item.item.status == null
                      "
                      @click="
                        () => {
                          autofillClientName(),
                            (invoiceTitle = 'add'),
                            // invoice.client = null,
                            (invoice.gstNumber = ''),
                            (invoice.state = null),
                            getLargestId(),
                            (invoice.invoice_date = null),
                            // invoice.due_date = null,
                            // (invoice.billing_address = item.item.company.name),
                            (invoice.notes = 'Thank you for the business'),
                            (invoice.item_details = null),
                            $refs['invoice-modal'].show();
                          invoice.item_details = item.item.subject;
                         // invoice.amount = getTotalAmt(item.item.proposal_fees);
                         invoice.amount = null;
                         if(item.item.status){
                           
                           invoice.amount = getAmountForProposals(item.item);
                          }else{
                             invoice.amount = item.item.amount
                            
                        }
                          //invoice.client = item.item.company;
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
                          
                          getAmt();
                        }
                      "
                      variant="primary ml-1"
                    >
                      <span class="text-nowrap"> Create Invoice </span>
                    </b-button>
                    <b-button
                      size="sm"
                      @click="
                        () => {
                          editIndex = item.index;
                          pname = item.item.client_name;
                          pperson = item.item.concerned_person;
                          amountField = []; //problem
                          pphrase = item.item.prephase;
                          pfooterdesc = item.item.footer_description;
                          pfootertitle = item.item.footer_title;
                          paddress = item.item.address;
                          psubject = item.item.subject;
                          item.item.proposal_fees.forEach((element) => {
                            amountField.push({
                              id: element.id,
                              description: element.description,
                              amount: element.amount,
                            });
                          });
                          pnotes = item.item.internal_notes;
                          proposalFields = [];
                          item.item.proposal_section.forEach((element) => {
                            proposalFields.push({
                              id: element.id,
                              title: element.title,
                              desc: element.description,
                            });
                          });

                          openModal(
                            'proposal-edit-modal_' + item.item.id + '_' + item.item.id
                          );
                        }
                      "
                      variant="primary ml-1"
                    >
                      <span class="text-nowrap"> Edit</span>
                    </b-button>
                    <b-button size="sm" @click="replyModal()" variant="primary ml-1">
                      <span class="text-nowrap"> Email</span>
                    </b-button>
                    <b-button
                      size="sm"
                      :disabled="loader_proposal"
                      variant="primary ml-1"
                      @click="exportToPDF(item)"
                    >
                      <span class="text-nowrap"> PDF</span>
                      <b-spinner
                        class="ml-1"
                        small
                        v-if="loader_proposal == true"
                      ></b-spinner>
                    </b-button>
                    <b-button
                      v-if="getStatusForProposalNumber(item.item) == null"
                      size="sm"
                      @click="destroyProposal(item.item.id)"
                      variant="primary ml-1"
                    >
                      <span class="text-nowrap"> Delete </span>
                    </b-button>
                  </div>
                </div>

                <hr style="border-color: #f75949" />
                <div
                  style="font-family: 'Times New Roman', Times, serif"
                  id="PaymentpdfContent"
                  v-if="item.item.title == 'payment'"
                >
                  <div style="margin-bottom: -3rem" class="row">
                    <div class="col-md-12">
                      <div style="float: left"> 
                        <address>
                          <br />
                          <strong>Centrik Legalistic LLP</strong><br />
                          <span
                            >E-11<br />
                            LGF<br />
                            Jangpura Extension<br />
                            New Delhi - 110014</span
                          ><br />
                          <!---->
                          <br />
                          <!---->
                          <br />
                        </address>
                        <!-- <img :src="'https://storage.oas36ty.com/uploads/organization/SP51hmKqu3PZSevzqHpr9ITjaF8U5WQqoxWbWTs6.png'"/> -->
                      </div>
                      <div class="text-right" style="float: right">
                        <!-- <h1>
            Invoice
          </h1> -->
                        <span> bill To </span>
                        <h4>
                          <!-- <strong>{{ item.item.invoice_number }}</strong> -->
                        </h4>
                        <b>
                          {{ getPaymentClient(item.item.client_id) }}
                        </b>
                        <br />
                        <span>
                          Delhi
                          <!-- {{ item.item.sub_total }} -->
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="text-uppercase text-center m-b-25">Payment Receipt</h4>
                      <div class="row">
                        <div class="col-md-8 padding-0">
                          <div class="receipt-inline clearfix">
                            <div class="form-label">Payment Date</div>
                            <div class="receipt-value">
                              {{ item.item.pay_date }}
                            </div>
                          </div>
                          <div class="receipt-inline clearfix">
                            <div class="form-label">Reference Number</div>
                            <div class="receipt-value">
                              {{ item.item.reference_id }}
                            </div>
                          </div>
                          <div class="receipt-inline clearfix">
                            <div class="form-label">Payment Mode</div>
                            <div class="receipt-value">
                              {{ item.item.payment_mode }}
                            </div>
                          </div>
                          <div class="receipt-inline clearfix">
                            <div class="form-label">Amount Received In Words</div>
                            <div class="receipt-value">
                              {{ convert(String(item.item.amount)) }}
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="panel panel-default text-center font-15">
                            <div class="panel-heading">Amount Received</div>
                            <div class="panel-body font-bold">
                              <span>
                                <font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                              /></span>
                              <!-- {{getPaymentAmt(item.item.record_pay_invoice)}} -->
                              {{ item.item.amount }}
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
                          style="cursor: pointer"
                        >
                          <caption>
                            Payment For
                          </caption>
                          <thead class="invoice-thead-tr">
                            <tr class="invoice-thead-tr">
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Invoice Number
                              </th>
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Invoice Amount
                              </th>
                              <th
                                class=""
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                TDS deducted
                              </th>

                              <th
                                class=""
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Payment Amount(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(invoice, index) in item.item.invoice"
                              :key="invoice.id"
                            >
                              <td>{{ invoice.invoice_number }}</td>
                              <!-- <td>{{ Number(getTdsForPayment(invoice.id, item.item.record_pay_invoice)) + getFinalPayment(invoice.id, item.item.record_pay_invoice)}}</td> -->
                              <td>{{ item.item.amount }}</td>
                              <td>
                                {{
                                  getTdsForPayment(
                                    invoice.id,
                                    item.item.record_pay_invoice
                                  )
                                }}
                              </td>
                              <td>
                                {{
                                  getFinalPayment(
                                    invoice.id,
                                    item.item.record_pay_invoice
                                  )
                                }}
                              </td>
                            </tr>
                            <!-- <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right">{{ item.item.sub_total }}</td>
              </tr> -->
                          </tbody>
                        </table>
                        <div class="mt-3 text-right">Authorized Signature</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="font-family: 'Times New Roman', Times, serif" id="pdfContent">
                  <!-- <div class="header">
      <header>
        <img :src="imgLogo" alt="">
      </header>
    </div> -->
                  <p class="font-weight-bolder">
                    {{ userData.tenant.organization.name }}
                  </p>
                  <p class="my-3 font-weight-bolder">
                    Date: {{ item.item.proposal_date }}
                  </p>
                  <p class="mb-2">{{ item.item.client_name }} ,</p>
                  <p class="mb-2">{{ item.item.address }}</p>
                  <p class="mb-2 font-weight-bolder">Subject: {{ item.item.subject }}</p>
                  <p class="mb-2">{{ item.item.prephase }}</p>
                  <p class="mb-2">Dear {{ item.item.concerned_person }}</p>
                  <div
                    v-for="(proposal, index) in item.item.proposal_section"
                    :key="proposal.id"
                  >
                    <p class="mb-2 font-weight-bolder">{{ proposal.title }}</p>
                    <p class="mb-3" v-html="proposal.description"></p>
                  </div>
                  <p class="font-weight-bolder">Fee Details</p>
                  <table class="mb-3" style="width: 100%">
                    <thead>
                      <th
                        style="
                          background-color: #000000a1 !important;
                          color: #fff !important;
                        "
                      >
                        SI No
                      </th>
                      <th
                        style="
                          background-color: #000000a1 !important;
                          color: #fff !important;
                        "
                      >
                        Description
                      </th>
                      <th
                        style="
                          background-color: #000000a1 !important;
                          color: #fff !important;
                        "
                      >
                        Amount
                      </th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(amount, index) in item.item.proposal_fees"
                        :key="amount.id"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ amount.description }}</td>
                        <td>{{ amount.amount }}</td>
                      </tr>
                      <tr v-if="item.item.proposal_fees.length > 1">
                        <td style="font-weight: bolder">
                          total (<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />)
                        </td>
                        <td></td>
                        <td>
                          {{ getTotalAmt(item.item.proposal_fees) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="font-weight-bolder">{{ item.item.footer_title }}</p>
                  <p v-html="item.item.footer_description"></p>
                </div>

                <!-- <header>
hello
</header>
<div>
hello
</div> -->

                <div id="InvoicepdfContent" v-if="item.item.title == 'invoice'">
                  <div style="margin-bottom: -3rem" class="row">
                    <div class="col-md-12">
                      <div style="float: left">
                        <address>
                          <!-- <img width="120"
              :src="imgLogo"
              alt="" itemprop="logo" class="custom-logo"> -->
                          <br />
                          <strong>Centrik Legalistic LLP</strong><br />
                          <span
                            >E-11<br />
                            LGF<br />
                            Jangpura Extension<br />
                            New Delhi - 110014</span
                          ><br />
                          <!---->
                          <br />
                          <!---->
                          <br />
                        </address>
                        <!-- <img :src="'https://storage.oas36ty.com/uploads/organization/SP51hmKqu3PZSevzqHpr9ITjaF8U5WQqoxWbWTs6.png'"/> -->
                      </div>
                      <div class="text-right" style="float: right">
                        <h1>Invoice</h1>
                        <h4>
                          <strong>{{ item.item.invoice_number }}</strong>
                        </h4>
                        <b> balance due </b>
                        <br />
                        <span>
                          {{ item.item.sub_total }}
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
                      <div class="mt-20" style="float: left">
                        <address>
                          Bill To<br />
                          <strong>{{ item.item.client.name }}</strong
                          ><br />
                          <span>{{ item.item.client.name }}</span
                          ><br />
                          <span>GSTIN:NA</span>
                        </address>
                        <!---->
                      </div>
                      <div class="mt-20" style="float: right">
                        <p>
                          <strong>Invoice Date: </strong>
                          {{ item.item.invoice_date }}
                        </p>
                        <p class="m-t-10 text-right">
                          <strong>Due Date: </strong> {{ item.item.due_date }}
                        </p>
                      </div>
                    </div>
                    <!-- </div> -->
                  </b-row>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table
                          class="table table-striped invoice-table"
                          style="cursor: pointer"
                        >
                          <thead class="invoice-thead-tr">
                            <tr class="invoice-thead-tr">
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Sl.No
                              </th>
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Description
                              </th>
                              <th
                                class=""
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Proposal Number
                              </th>
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Amount
                              </th>
                              <!---->
                              <!---->
                              <!---->
                              <!---->
                              <!---->
                              <th
                                class="text-right"
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Total Amount(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(p, index) in item.item.proposal" :key="p.id">
                              <td>{{ index + 1 }}</td>
                              <td>{{ p.description }}</td>
                              <td>{{ getPL(p.created_at, p.id) }}</td>
                              <td>{{ getTotalAmt(item.item.proposal) }}</td>
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
                                {{ item.item.sub_total }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row" style="border-radius: 0px">
                    <div class="col-md-4"></div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4 col-md-offset-8">
                      <p class="text-right">
                        <b
                          >Sub-total (<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />):</b
                        >
                        {{ getSubTotal(item.item) }}
                      </p>
                      <!---->
                      <!---->
                      <p v-if="item.item.pocket_expenses" class="text-right">
                        Out of pocket expense (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />):
                        {{ item.item.pocket_expenses }}
                      </p>
                      <p v-if="item.item.adjustment_amt" class="text-right">
                        Adjustments (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />):
                        {{ item.item.adjustment_amt }}
                      </p>
                      <p class="text-right">
                        Total (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />): {{ item.item.sub_total }}
                      </p>
                      <!---->
                      <p class="text-right">
                        Balance Due (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />): {{ item.item.sub_total }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <p>Notes :</p>
                      <p>{{ item.item.notes }}</p>
                      <!-- <hr> -->
                      <div v-if="item.item.branch.bank_details != null">
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
                          Bank : {{ item.item.branch.bank_details.bank_name }}
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
                        This is a computer generated invoice and does not require
                        signature/stamp.
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
                <div
                  style="font-family: 'Times New Roman', Times, serif; display: none"
                  id=""
                  v-if="item.item.title == 'invoice'"
                >
                  <!-- <p>{{ item.item }}</p> -->
                  <!-- <div class=""> -->
                  <div style="margin-bottom: -3rem" class="row">
                    <div class="col-md-12">
                      <div style="float: left">
                        <address>
                          <!-- <img width="120"
              :src="imgLogo"
              alt="" itemprop="logo" class="custom-logo"> -->
                          <br />
                          <strong>Centrik Legalistic LLP</strong><br />
                          <span
                            >E-11<br />
                            LGF<br />
                            Jangpura Extension<br />
                            New Delhi - 110014</span
                          ><br />
                          <!---->
                          <br />
                          <!---->
                          <br />
                        </address>
                        <!-- <img :src="'https://storage.oas36ty.com/uploads/organization/SP51hmKqu3PZSevzqHpr9ITjaF8U5WQqoxWbWTs6.png'"/> -->
                      </div>
                      <div class="text-right" style="float: right">
                        <h1>Invoice</h1>
                        <h4>
                          <strong>{{ item.item.invoice_number }}</strong>
                        </h4>
                        <b> balance due </b>
                        <br />
                        <span>
                          {{ item.item.sub_total }}
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
                      <div class="mt-20" style="float: left">
                        <address>
                          Bill To<br />
                          <strong>{{ item.item.client.name }}</strong
                          ><br />
                          <span>{{ item.item.client.name }}</span
                          ><br />
                          <span>GSTIN:NA</span>
                        </address>
                        <!---->
                      </div>
                      <div class="mt-20" style="float: right">
                        <p>
                          <strong>Invoice Date: </strong>
                          {{ item.item.invoice_date }}
                        </p>
                        <p class="m-t-10 text-right">
                          <strong>Due Date: </strong> {{ item.item.due_date }}
                        </p>
                      </div>
                    </div>
                    <!-- </div> -->
                  </b-row>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table
                          class="table table-striped invoice-table"
                          style="cursor: pointer"
                        >
                          <thead class="invoice-thead-tr">
                            <tr class="invoice-thead-tr">
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Sl.No
                              </th>
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Description
                              </th>
                              <th
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Amount
                              </th>
                              <!---->
                              <!---->
                              <!---->
                              <!---->
                              <!---->
                              <th
                                class="text-right"
                                style="
                                  background-color: #000000a1 !important;
                                  color: #fff !important;
                                "
                              >
                                Total Amount(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ "1" }}</td>
                              <td>{{ item.item.item_details }}</td>
                              <td>{{ item.item.amount }}</td>
                              <!---->
                              <!---->
                              <!---->
                              <!---->
                              <!---->
                              <td class="text-right">
                                {{ item.item.sub_total }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row" style="border-radius: 0px">
                    <div class="col-md-4"></div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4 col-md-offset-8">
                      <p class="text-right">
                        <b
                          >Sub-total (<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />):</b
                        >
                        {{ getSubTotal(item.item) }}
                      </p>
                      <!---->
                      <!---->
                      <p v-if="item.item.pocket_expenses" class="text-right">
                        Out of pocket expense (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />):
                        {{ item.item.pocket_expenses }}
                      </p>
                      <p v-if="item.item.adjustment_amt" class="text-right">
                        Adjustments (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />):
                        {{ item.item.adjustment_amt }}
                      </p>
                      <p class="text-right">
                        Total (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />): {{ item.item.sub_total }}
                      </p>
                      <!---->
                      <p class="text-right">
                        Balance Due (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />): {{ item.item.sub_total }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <p>Notes :</p>
                      <p>{{ item.item.notes }}</p>
                      <!-- <hr> -->
                      <div v-if="item.item.branch.bank_details != null">
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
                          Bank : {{ item.item.branch.bank_details.bank_name }}
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
                        This is a computer generated invoice and does not require
                        signature/stamp.
                      </p>
                    </div>
                  </div>
                </div>
                <!-- </section>
  </vue-html2pdf> -->
                <!-- <p>{{ item.item.pnotes }}</p> -->
              </b-card>
            </template>

            <template #cell(status)="item">
              <b-badge :variant="item.item.status > 0 ? 'success' : 'primary'">
                {{
                  item.item.status > 0 ? item.item.status + "% Invoiced" : "Not Invoiced"
                }}
              </b-badge>
            </template>
          </b-table>
          <div class="d-flex justify-content-end p-1" v-if="filteredProposalItems.length">
            <b-pagination
              :total-rows="filteredProposalItems.length"
              :per-page="perPageProposal"
              v-model="currentPageProposalTable"
              class="mb-0 mt-2 mt-sm-0"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
            >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
            </b-pagination>
          </div>
        </b-card>
        <div class="text-center">
          <b-spinner v-if="isLoadingProposal" />
        </div>
        <!-- <div v-if=" isLoadingProposal === false" class="text-center" style="
        background: white;
        padding: 40px;
        margin-top: -32px;
    ">
          <span v-if="filteredProposalItems.length <= 0 && isLoadingProposal === false">There Are No Records To Show...
          </span>
        </div> -->
      </b-tab>
      <!-- <b-tab v-if="setPrivileges.invoice===true"> -->
      <!-- <b-tab v-if="setPrivileges.invoice===true" id="invoice"> -->
      <b-tab id="invoice">
        <template #title>
          {{ "INVOICES" }}
        </template>
        <b-card class="mt-1" v-if="filterInvoicesModal">
      <b-row>
        <b-col md="3"
          ><span>Client Name*</span>
          <v-select
          class="my-custom-select"
            v-model="selectedCompanyInvoices"
            :options="clientArrayComputed"
            placeholder="Select the Client"
        /></b-col>
        <b-col md="3">
          <b-form-group>
            <span>Status</span>
            <v-select
            class="my-custom-select"
              v-model="filterStatus"
              :options="statusOptions"
              placeholder="Select the Status"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <span>From Date</span>
            <VueDatePicker
              format="YYYY-MM-DD"
              style="border: 1px solid #d8d6de; border-radius: 0.357rem"
              id="proposalDate"
              v-model="invoiceFromDate"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <span>To Date</span>

            <VueDatePicker
              format="YYYY-MM-DD"
              style="border: 1px solid #d8d6de; border-radius: 0.357rem"
              id="proposalDate"
              v-model="invoiceToDate"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8"></b-col>

        <b-col class="text-right"
          ><b-button
            size="sm"
            variant="primary"
            @click="
              () => {
                invoiceFromDate = null;
                invoiceToDate = null;
                filterStatus = null;
                selectedCompanyInvoices = null;
              }
            "
            >Reset</b-button
          ></b-col
        >
      </b-row>
    </b-card>
        <b-card class="mt-2" no-body>
          <b-table
            :per-page="perPageInvoice"
            :current-page="currentPageInvoiceTable"
            @row-clicked="onRowClickedInvoices"
            b-tab
            id="invoices"
            selectable
            responsive="sm"
            :items="filteredInvoiceItems"
            :fields="invoiceFields"
            class="mb-0"
            append-top
            :show-empty="!isLoadingInvoices && filteredInvoiceItems.length == 0"
          >
            <template #row-details="i">
              <!-- detail toggle card -->

              <b-card no-body class="invoiceDetails ml-2 mt-2 mr-2 mb-0">
                <b-row class="invoiceHeader align-items-center justify-content-center">
                  <b-col md="3" class="invoiceHeaderLeft">
                    <h4 class="m-0">INVOICES DETAIL</h4>
                  </b-col>
                  <b-col md="9" class="invoiceHeaderRight text-right">
                    <b-button size="sm" variant="primary" class="ml-1 text-capitalize"
                      >history</b-button
                    >
                    <b-button size="sm" variant="primary" class="ml-1 text-capitalize"
                    v-if="getStatusForInvoiceNumber(i.item.id) < 100"
                    
                    @click="()=>{
                      //currentInvoice = 
                      payment.mode = payment_modes[0];
                      $refs['payment-modal2'].show();
                    }">
                      payment</b-button
                    >
                    <b-button size="sm" variant="primary" class="ml-1 text-capitalize"
                      >write off</b-button
                    >
                    <b-button size="sm" variant="primary" class="ml-1 text-capitalize"
                      >cancel invoice</b-button
                    >
                    <b-button
                    v-if="i.item.due>100"
                      size="sm"
                      @click="
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
                            (invoice.billing_address = i.item.billing_address),
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
                            (invoice.expense_details = i.item.expenses_details),
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
                      "
                      variant="primary ml-1"
                    >
                      <span class="text-nowrap" > Edit</span>
                    </b-button>
                    <b-button
                      size="sm"
                      variant="primary"
                      :disabled="loader_payment"
                      class="ml-1 text-capitalize"
                      @click="exportToPDFInvoice(i)"
                    >
                      <span class="text-nowrap"> PDF</span>
                      <b-spinner
                        class="ml-1"
                        small
                        v-if="loader_payment == true"
                      ></b-spinner>
                    </b-button>
                    <b-button size="sm" @click="replyModal()" variant="primary ml-1">
                      <span class="text-nowrap"> Email</span>
                    </b-button>
                    <b-button
                      v-if="getStatusForInvoiceNumber(i.item.id) == 0"
                      size="sm"
                      @click="destroyInvoice(i.item.id)"
                      variant="primary ml-1"
                    >
                      <span class="text-nowrap"> Delete</span>
                    </b-button>
                  </b-col>
                </b-row>

                <hr
                  style="
                    height: 1px;
                    width: 100%;
                    border-width: 0;
                    color: red;
                    background-color: red;
                  "
                />
                <!-- pdf div start here -->

                <div id="InvoicepdfContent2" style="display: none">
                  <div>
                    <b-row class="invoiceBody justify-content-between">
                      <b-col class="invoiceBodyLeft" md="4">
                        <address>
                          <br />
                          <strong>Centrik Legalistic LLP</strong><br />
                          <span
                            >E-11<br />
                            LGF<br />
                            Jangpura Extension<br />
                            New Delhi - 110014</span
                          ><br />
                          <br />
                          <br />
                        </address>
                      </b-col>
                      <b-col md="4" class="invoiceBodyRight text-right">
                        <p class="invoiceBodyRightTitle"><b>Invoice</b></p>
                        <p class="invoiceBodyRightText">
                          <b>{{ i.item.invoice_number }}</b>
                        </p>
                        <div>
                          <p class="m-0"><b>Balance Due</b></p>
                          <p class="m-0">
                            <b>{{ i.item.due }}</b>
                          </p>
                        </div>
                      </b-col>
                    </b-row>
                    <br />

                    <br />
                    <hr />

                    <b-row class="invoiceBody justify-content-between">
                      <b-col class="invoiceBodyLeft" md="4">
                        <p class="m-0">Bill To</p>
                        <p class="m-0">
                          <b>{{ i.item.client_name }}</b>
                        </p>
                        <p class="m-0">Banglore</p>

                        <p class="m-0">GSTIN:NA</p>
                      </b-col>
                      <b-col md="4" class="invoiceBodyRight text-right">
                        <p class="m-0"><b>Invoice Date:</b> {{ i.item.invoice_date }}</p>
                        <p class="m-0"><b>Due Date: </b>{{ i.item.due_date }}</p>
                        <div></div>
                      </b-col>
                    </b-row>
                    <br />
                    <br />

                    <table
                      role="table"
                      aria-busy="false"
                      aria-colcount="4"
                      class="table b-table text-white bg-primary table-striped table-hover"
                      id="__BVID__269"
                    >
                      <!----><!---->
                      <thead role="rowgroup" class="">
                        <!---->
                        <tr role="row" class="">
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="1"
                            class="bg-dark text-white text-left"
                          >
                            <div>SI.No</div>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="2"
                            class="bg-dark text-white text-left"
                          >
                            <!-- descriptionSetting -->
                            <div>Description</div>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            class="bg-dark text-white text-center"
                          >
                            <div>Amount</div>
                          </th>
                          <th
                            v-if="invoice.discount"
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            class="bg-dark text-white text-center"
                          >
                            <div>Discount</div>
                          </th>
                          <th
                            v-if="i.item.igst"
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            class="bg-dark text-white text-center"
                          >
                            <div>IGST</div>
                          </th>
                          <th
                            v-if="i.item.cgst"
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            class="bg-dark text-white text-center"
                          >
                            <div>CGST</div>
                          </th>
                          <th
                            v-if="i.item.sgst"
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            class="bg-dark text-white text-center"
                          >
                            <div>SGST</div>
                          </th>
                          <th
                            v-if="i.item.utgst"
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            class="bg-dark text-white text-center"
                          >
                            <div>UTGST</div>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="4"
                            class="bg-dark text-white text-right"
                          >
                            <div>Total Amount</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        <tr role="row" class="">
                          <td aria-colindex="1" role="cell" class="text-left">
                            {{ i.item.id }}
                          </td>
                          <div
                            v-if="i.item.proposal_id == i.item.proposal[0].proposal_id"
                          >
                            <td aria-colindex="2" role="cell" class="text-left">
                              {{ i.item.proposal[0].description }}
                            </td>
                          </div>
                          <div v-else>
                            <td aria-colindex="2" role="cell" class="text-left">
                              No Description
                            </td>
                          </div>

                          <td aria-colindex="3" role="cell" class="text-center">
                            {{ i.item.amount }}
                          </td>
                          <td aria-colindex="4" role="cell" class="text-right">
                            {{ i.item.total_amt }}
                          </td>
                          <td
                            v-if="invoice.discount"
                            aria-colindex="4"
                            role="cell"
                            class="text-right"
                          >
                            {{ invoice.discount }}
                          </td>
                          <td
                            v-if="i.item.igst"
                            aria-colindex="4"
                            role="cell"
                            class="text-right"
                          >
                            {{ i.item.igst }}
                          </td>
                          <td
                            v-if="i.item.cgst"
                            aria-colindex="4"
                            role="cell"
                            class="text-right"
                          >
                            {{ i.item.cgst }}
                          </td>
                          <td
                            v-if="i.item.sgst"
                            aria-colindex="4"
                            role="cell"
                            class="text-right"
                          >
                            {{ i.item.sgst }}
                          </td>
                          <td
                            v-if="i.item.utgst"
                            aria-colindex="4"
                            role="cell"
                            class="text-right"
                          >
                            {{ i.item.utgst }}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <hr />
                    <br />
                    <b-row class="invoicesDetailSubtotal">
                      <b-col class="text-right">
                        <p>
                          <b
                            >Sub-Total(₹): <span>{{ i.item.sub_total }}</span></b
                          >
                        </p>
                        <p v-if="i.item.pocket_expenses" class="text-right">
                          Out of pocket expense (₹):
                          {{ i.item.pocket_expenses }}
                        </p>
                        <p v-if="i.item.adjustment_amt" class="text-right">
                          Adjustments (₹):
                          {{ i.item.adjustment_amt }}
                        </p>
                        <p>
                          Total(₹):<span>{{ i.item.total_amt }}</span>
                        </p>
                        <p>
                          Balance-Total(₹):<span>{{ i.item.total_amt }}</span>
                        </p>
                      </b-col>
                    </b-row>

                    <b-row class="invoicesDetailSubtotal">
                      <!-- <b-col md="10"></b-col> -->
                      <b-col class="text-left">
                        <p><span>Notes: </span></p>
                        <p>
                          <span>{{ i.item.notes }}</span>
                        </p>
                      </b-col>
                    </b-row>

                    <hr />

                    <b-row class="invoicesDetailSubtotal">
                      <!-- <b-col md="10"></b-col> -->
                      <b-col class="text-left">
                        <h5><b>Bank Details</b></h5>
                        <p class="m-0">
                          Account Name: <span>Centrik Legalistic LLP</span>
                        </p>
                        <p class="m-0">Account Number: <span>201003201993</span></p>
                        <p class="m-0">IFSC Code : <span>INDB0000044</span></p>
                        <p class="m-0">Bank : <span>Indusind Bank</span></p>
                        <p class="m-0">Branch : <span>Janakpuri, new delhi</span></p>
                      </b-col>
                    </b-row>
                    <hr />
                    <b-row>
                      <b-col class="text-center">
                        This is a computer generated invoice and does not require
                        signature/stamp.
                      </b-col>
                    </b-row>
                  </div>
                </div>

                <b-row class="invoiceBody justify-content-between">
                  <b-col class="invoiceBodyLeft" md="4">
                    <address>
                      <br />
                      <strong>Centrik Legalistic LLP</strong><br />
                      <span
                        >E-11<br />
                        LGF<br />
                        Jangpura Extension<br />
                        New Delhi - 110014</span
                      ><br />
                      <br />
                      <br />
                    </address>
                  </b-col>
                  <b-col md="4" class="invoiceBodyRight text-right">
                    <p class="invoiceBodyRightTitle"><b>Invoice</b></p>
                    <p class="invoiceBodyRightText">
                      <b>{{ i.item.invoice_number }}</b>
                    </p>
                    <div>
                      <p class="m-0"><b>Balance Due</b></p>
                      <p class="m-0">
                        <b>{{ i.item.due }}</b>
                      </p>
                    </div>
                  </b-col>
                </b-row>
                <br />

                <br />
                <hr />

                <b-row class="invoiceBody justify-content-between">
                  <b-col class="invoiceBodyLeft" md="4">
                    <p class="m-0">Bill To</p>
                    <p class="m-0">
                      <b>{{ i.item.client_name }}</b>
                    </p>
                    <p class="m-0">Banglore</p>

                    <p class="m-0">GSTIN:NA</p>
                  </b-col>
                  <b-col md="4" class="invoiceBodyRight text-right">
                    <p class="m-0"><b>Invoice Date:</b> {{ i.item.invoice_date }}</p>
                    <p class="m-0"><b>Due Date: </b>{{ i.item.due_date }}</p>
                    <div></div>
                  </b-col>
                </b-row>
                <br />
                <br />

                <table
                  role="table"
                  aria-busy="false"
                  aria-colcount="4"
                  class="table b-table text-white bg-primary table-striped table-hover"
                  id="__BVID__269"
                >
                  <!----><!---->
                  <thead role="rowgroup" class="">
                    <!---->
                    <tr role="row" class="">
                      <th
                        role="columnheader"
                        scope="col"
                        aria-colindex="1"
                        class="bg-dark text-white text-left"
                      >
                        <div>SI.No</div>
                      </th>
                      <th
                        role="columnheader"
                        scope="col"
                        aria-colindex="2"
                        class="bg-dark text-white text-left"
                      >
                        <!-- descriptionSetting -->
                        <div>Description</div>
                      </th>
                      <th
                        role="columnheader"
                        scope="col"
                        aria-colindex="3"
                        class="bg-dark text-white text-center"
                      >
                        <div>Amount</div>
                      </th>
                      <th
                        v-if="invoice.discount"
                        role="columnheader"
                        scope="col"
                        aria-colindex="3"
                        class="bg-dark text-white text-center"
                      >
                        <div>Discount</div>
                      </th>
                      <th
                        v-if="i.item.igst"
                        role="columnheader"
                        scope="col"
                        aria-colindex="3"
                        class="bg-dark text-white text-center"
                      >
                        <div>IGST</div>
                      </th>
                      <th
                        v-if="i.item.cgst"
                        role="columnheader"
                        scope="col"
                        aria-colindex="3"
                        class="bg-dark text-white text-center"
                      >
                        <div>CGST</div>
                      </th>
                      <th
                        v-if="i.item.sgst"
                        role="columnheader"
                        scope="col"
                        aria-colindex="3"
                        class="bg-dark text-white text-center"
                      >
                        <div>SGST</div>
                      </th>
                      <th
                        v-if="i.item.utgst"
                        role="columnheader"
                        scope="col"
                        aria-colindex="3"
                        class="bg-dark text-white text-center"
                      >
                        <div>UTGST</div>
                      </th>
                      <th
                        role="columnheader"
                        scope="col"
                        aria-colindex="4"
                        class="bg-dark text-white text-right"
                      >
                        <div>Total Amount</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    <tr role="row" class="">
                      <td aria-colindex="1" role="cell" class="text-left">
                        {{ i.item.id }}
                      </td>
                      <div v-if="i.item.proposal_id == i.item.proposal[0].proposal_id">
                        <td aria-colindex="2" role="cell" class="text-left">
                          {{ i.item.proposal[0].description }}
                        </td>
                      </div>
                      <div v-else>
                        <td aria-colindex="2" role="cell" class="text-left">
                          No Description
                        </td>
                      </div>

                      <td aria-colindex="3" role="cell" class="text-center">
                        {{ i.item.amount }}
                      </td>
                      <td aria-colindex="4" role="cell" class="text-right">
                        {{ i.item.total_amt }}
                      </td>
                      <td
                        v-if="invoice.discount"
                        aria-colindex="4"
                        role="cell"
                        class="text-right"
                      >
                        {{ invoice.discount }}
                      </td>
                      <td
                        v-if="i.item.igst"
                        aria-colindex="4"
                        role="cell"
                        class="text-right"
                      >
                        {{ i.item.igst }}
                      </td>
                      <td
                        v-if="i.item.cgst"
                        aria-colindex="4"
                        role="cell"
                        class="text-right"
                      >
                        {{ i.item.cgst }}
                      </td>
                      <td
                        v-if="i.item.sgst"
                        aria-colindex="4"
                        role="cell"
                        class="text-right"
                      >
                        {{ i.item.sgst }}
                      </td>
                      <td
                        v-if="i.item.utgst"
                        aria-colindex="4"
                        role="cell"
                        class="text-right"
                      >
                        {{ i.item.utgst }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <hr />
                <br />
                <b-row class="invoicesDetailSubtotal">
                  <b-col class="text-right">
                    <p>
                      <b
                        >Sub-Total(₹): <span>{{ i.item.sub_total }}</span></b
                      >
                    </p>
                    <p v-if="i.item.pocket_expenses" class="text-right">
                      Out of pocket expense (₹):
                      {{ i.item.pocket_expenses }}
                    </p>
                    <p v-if="i.item.adjustment_amt" class="text-right">
                      Adjustments (₹):
                      {{ i.item.adjustment_amt }}
                    </p>
                    <p>
                      Total(₹):<span>{{ i.item.total_amt }}</span>
                    </p>
                    <p>
                      Balance-Total(₹):<span>{{ i.item.total_amt }}</span>
                    </p>
                  </b-col>
                </b-row>

                <b-row class="invoicesDetailSubtotal">
                  <!-- <b-col md="10"></b-col> -->
                  <b-col class="text-left">
                    <p><span>Notes: </span></p>
                    <p>
                      <span>{{ i.item.notes }}</span>
                    </p>
                  </b-col>
                </b-row>

                <hr />

                <b-row class="invoicesDetailSubtotal">
                  <!-- <b-col md="10"></b-col> -->
                  <b-col class="text-left">
                    <h5><b>Bank Details</b></h5>
                    <p class="m-0">Account Name: <span>Centrik Legalistic LLP</span></p>
                    <p class="m-0">Account Number: <span>201003201993</span></p>
                    <p class="m-0">IFSC Code : <span>INDB0000044</span></p>
                    <p class="m-0">Bank : <span>Indusind Bank</span></p>
                    <p class="m-0">Branch : <span>Janakpuri, new delhi</span></p>
                  </b-col>
                </b-row>
                <hr />
                <b-row>
                  <b-col class="text-center">
                    This is a computer generated invoice and does not require
                    signature/stamp.
                  </b-col>
                </b-row>
              </b-card>
            </template>
            <!-- end detail toggle card -->
<template #cell(client_name)="item">
  {{ item.item.client.name }}
  
</template>
            <template #cell(status)="item">
              <!-- <b-badge
                :variant="
                  item.item.due === 0
                    ? 'secondary'
                    : new Date() <=
                      new Date(
                        new Date(item.item.due_date).getFullYear(),
                        new Date(item.item.due_date).getMonth(),
                        new Date(item.item.due_date).getDate() + 1
                      ).setHours(0, 0, 0)
                    ? 'primary'
                    : null
                "
                :style="
                  new Date() >
                  new Date(
                    new Date(item.item.due_date).getFullYear(),
                    new Date(item.item.due_date).getMonth(),
                    new Date(item.item.due_date).getDate() + 1
                  ).setHours(0, 0, 0)
                    ? 'background: #673ab7!important'
                    : null
                "
              >
                {{
                  item.item.due === 0
                    ? "Paid"
                    : new Date() <=
                      new Date(
                        new Date(item.item.due_date).getFullYear(),
                        new Date(item.item.due_date).getMonth(),
                        new Date(item.item.due_date).getDate() + 1
                      ).setHours(0, 0, 0)
                    ? "Due"
                    : "Over Due"
                }}
              </b-badge> -->
              <b-badge
                v-if="getStatusForInvoiceNumber2(item.item.id) != null"
                :variant="getStatusColorNumber(getStatusForInvoiceNumber2(item.item.id))"
              >
                <span v-if="getStatusForInvoiceNumber2(item.item.id) > 0">
                  {{ getStatusForInvoiceNumber(item.item.id) }} % Paid
                </span>
                <span v-else> Not Paid </span>
              </b-badge>
              <b-badge variant="danger" v-else> Not paid </b-badge>
            </template>

            <!-- HERE -->

            <!-- paste here -->
          </b-table>
          <div class="d-flex justify-content-end p-1" v-if="filteredInvoiceItems.length">
            <b-pagination
              :total-rows="filteredInvoiceItems.length"
              :per-page="perPageInvoice"
              v-model="currentPageInvoiceTable"
              class="mb-0 mt-2 mt-sm-0"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
            >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
            </b-pagination>
          </div>
          <!-- b-modal -->
          <b-modal
            no-close-on-backdrop
            id="invoice-modal"
            ref="invoice-modal"
            size="lg"
            class='b-overlay'
            hide-footer
          >
            <template #modal-title>
              {{ invoiceTitle == "add" ? "Add invoice" : "edit invoice " }}
            </template>
            <!-- <b-card-body> -->
            <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
              <b-form
                @submit.prevent="
                  handleSubmit(invoiceTitle == 'add' ? addInvoice : updateInvoice)
                "
              >
                <b-row>
                  <b-col md="4">
                    <validationProvider
                      #default="validationContext"
                      name="Client"
                      vid="Client"
                      rules="required"
                    >
                      <b-form-group v-if="invoiceTitle == 'add'">
                        <template #label>
                          Client *
                          <!-- <feather-icon icon="EditIcon" class="cursor-pointer" @click="() => {
                        ClientisEditSidebarActive = true,
                          editItemClient = pclient
                      }" /> -->
                        </template>
                        <v-select
                          v-on:input="autofillClient"
                          label="name"
                          v-model="invoice.client"
                          placeholder="Search Client"
                          class="select-size-md"
                          :options="show_companys"
                        >
                          <template #list-header>
                            <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
    
                    <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                              <a href="#">
                                <feather-icon
                                  size="14"
                                  style="margin-right: 0.5rem"
                                  icon="PlusIcon"
                                />
                                New Client</a
                              >
                            </div>
                          </template>
                        </v-select>

                        <b-form-invalid-feedback class="d-block">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label="Client Name" v-else>
                        <b-form-input
                          readonly
                          v-model="invoice.client_name"
                        ></b-form-input>
                        <b-form-invalid-feedback class="d-block">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validationProvider>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Client GST Number">
                      <b-form-input
                        @input="pan"
                        v-bind:class="
                          (invoice.gstNumber.length > 0 &&
                            invoice.gstNumber.length !== 15) ||
                          (invoice.gstNumber.length === 15 && gsterr === true)
                            ? 'is-invalid'
                            : ''
                        "
                        v-model="invoice.gstNumber"
                        placeholder="Client GST Number"
                      >
                      </b-form-input>
                      <span
                        v-if="
                          (invoice.gstNumber.length > 0 &&
                            invoice.gstNumber.length !== 15) ||
                          (invoice.gstNumber.length === 15 && gsterr === true)
                        "
                        class="d-block invalid-feedback"
                        id="errmsg"
                        >Invalid gst number</span
                      >
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group>
                      <template #label> State </template>
                      <v-select
                        @input="getStateCode"
                        label="name"
                        v-model="invoice.state"
                        placeholder="Search State"
                        class="select-size-md"
                        :options="allStates"
                      >
                      </v-select>
                    </b-form-group>
                  </b-col>
                  <!-- </b-card-body> -->
                </b-row>
                <b-row>
                  <b-col md="4">
                    <b-form-group v-if="invoiceTitle == 'add'">
                      <template #label>
                        Invoice Number
                        <feather-icon
                          icon="EditIcon"
                          @click="
                            () => {
                              $refs['invoice-charges-modal'].show();
                            }
                          "
                        />
                      </template>
                      <b-form-input v-model="prefixPlusid" placeholder="Invoice Number" />

                      <!-- </b-form-input> -->
                    </b-form-group>
                    <b-form-group label="Invoice Number" v-else>
                      <b-form-input readonly v-model="invoice.id"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Invoice Date">
                      <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                      <VueDatePicker
                        format="YYYY-MM-DD"
                        style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                        :minDate="currentDate"
                        id="proposalDate"
                        v-model="invoice.pdate"
                      />

                      <!-- </b-form-input> -->
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Due Date">
                      <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                      <VueDatePicker
                        format="YYYY-MM-DD"
                        style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                        :minDate="currentDate"
                        id="proposalDate"
                        v-model="invoice.due_date"
                      />

                      <!-- </b-form-input> -->
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Billing Address">
                      <b-form-input
                        v-model="invoice.billing_address"
                        placeholder="Billing Address"
                      />

                      <!-- </b-form-input> -->
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Notes">
                      <b-form-input v-model="invoice.notes" placeholder="Notes" />

                      <!-- </b-form-input> -->
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col class="" md="12">
                    <div class="table-responsive bg-light">
                      <table border="0" id="invoice-table" class="table">
                        <thead
                          style="
                            background-color: ##edededd9 !important;
                            color: black;
                            line-height: 2;
                          "
                        >
                          <tr>
                            <th style="width: 5%">SI.No</th>
                            <th style="width: 20%">Item Details</th>
                            <th class="text-right" style="width: 15%">Amount</th>
                            <th class="text-right" style="width: 10%">Discount</th>
                            <th class="text-right" style="width: 15%">Taxable Amt.</th>
                            <th class="text-right" style="width: 10%">GST(%)</th>
                            <th class="text-right" style="width: 10%">GST Amt.</th>
                            <th class="text-right" style="width: 15%">Total Amt.</th>
                          </tr>
                        </thead>
                        <tbody style="line-height: 4">
                          <tr>
                            <td style="width: 5%">1</td>
                            <td style="width: 20%">
                              <b-form-input
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                v-model="invoice.item_details"
                              />
                            </td>
                            <td style="width: 15%" class="my-custom-select">
                              <b-form-input
                                @input="getAmt"
                                class="text-right my-custom-select"
                                placeholder="Amount"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                step="0.01"
                                v-model.number="invoice.amount"
                                type="number"
                               
                              ></b-form-input>
                            </td>
                            <td style="width: 10%" class="my-custom-select">
                              <b-form-input
                                @input="getAmt"
                                class="text-right my-custom-select"
                                placeholder="Discount"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="0.01"
                                v-model.number="invoice.discount"
                              ></b-form-input>
                            </td>
                            <td style="width: 15%">
                              <b-form-input
                                class="text-right"
                                placeholder="Taxable Amount"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                step="0.01"
                                v-model.number="invoice.taxble_amt"
                                type="number"
                              ></b-form-input>
                            </td>
                            <td style="width: 10%" class="my-custom-select">
                              <b-form-input
                                @input="getAmt"
                                class="text-right"
                                placeholder="IGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="0.01"
                                v-model="invoice.igst"
                              ></b-form-input>
                            </td>
                            <td style="width: 10%" class="my-custom-select">
                              <b-form-input
                                readonly
                                class="text-right"
                                placeholder="IGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="any"
                                v-model="invoice.igst_amt"
                              ></b-form-input>
                            </td>
                            <td style="width: 15%">
                              <b-form-input
                                readonly
                                class="text-right"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                v-model="invoice.total_amt"
                                step="0.01"
                                type="number"
                              ></b-form-input>
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 5%">
                              <!-- 1 -->
                            </td>
                            <td style="width: 20%"></td>
                            <td style="width: 15%"></td>
                            <td style="width: 10%"></td>
                            <td style="width: 15%"></td>
                            <td style="width: 10%">
                              <b-form-input
                                @input="getAmt"
                                class="text-right my-custom-select"
                                placeholder="SGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="0.01"
                                v-model="invoice.sgst"
                              ></b-form-input>
                            </td>
                            <td style="width: 10%" class="my-custom-select">
                              <b-form-input
                                readonly
                                class="text-right my-custom-select"
                                placeholder="SGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="any"
                                v-model="invoice.sgst_amt"
                              ></b-form-input>
                            </td>
                            <td style="width: 15%"></td>
                          </tr>
                          <tr>
                            <td style="width: 5%">
                              <!-- 1 -->
                            </td>
                            <td style="width: 20%"></td>
                            <td style="width: 15%"></td>
                            <td style="width: 10%"></td>
                            <td style="width: 15%"></td>
                            <td style="width: 10%">
                              <b-form-input
                                @input="getAmt"
                                class="text-right my-custom-select"
                                placeholder="CGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="0.01"
                                v-model="invoice.cgst"
                              ></b-form-input>
                            </td>
                            <td style="width: 10%">
                              <b-form-input
                                readonly
                                class="text-right my-custom-select"
                                placeholder="CGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="any"
                                v-model="invoice.cgst_amt"
                              ></b-form-input>
                            </td>
                            <td style="width: 15%"></td>
                          </tr>
                          <tr>
                            <td style="width: 5%">
                              <!-- 1 -->
                            </td>
                            <td style="width: 20%"></td>
                            <td style="width: 15%"></td>
                            <td style="width: 10%"></td>
                            <td style="width: 15%"></td>
                            <td style="width: 10%">
                              <b-form-input
                                @input="getAmt"
                                class="text-right"
                                placeholder="UTGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="0.01"
                                v-model="invoice.utgst"
                              ></b-form-input>
                            </td>
                            <td style="width: 10%">
                              <b-form-input
                                readonly
                                class="text-right"
                                placeholder="UTGST"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  background-color: #f6f6f6 !important;
                                  border-left: none;
                                  border-right: none;
                                "
                                type="number"
                                step="any"
                                v-model="invoice.utgst_amt"
                              ></b-form-input>
                            </td>
                            <td style="width: 15%"></td>
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
                              <b-form-input
                                @input="getAmt"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  border-left: none;
                                  border-right: none;
                                "
                                class="text-right my-custom-select"
                                type="number"
                                step="0.01"
                                v-model="invoice.pocket_expense"
                                placeholder="out of pocket expense amount"
                              />

                              <!-- </b-input> -->
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td class="text-right">
                              <b-form-input
                                v-model="invoice.expense_details"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  border-left: none;
                                  border-right: none;
                                "
                                class="text-right my-custom-select"
                                placeholder="out of pocket expense details"
                              />

                              <!-- </b-input> -->
                            </td>
                          </tr>
                          <tr>
                            <td>Adjustments</td>
                            <td class="text-right">
                              <b-form-input
                                @input="getAmt"
                                style="
                                  border-bottom-color: #1f91f3 !important;
                                  border-top: none;
                                  border-left: none;
                                  border-right: none;
                                "
                                class="text-right"
                                type="number"
                                step="0.01"
                                v-model="invoice.adjustments"
                              />

                              <!-- </b-input> -->
                            </td>
                          </tr>
                          <tr style="background: #f8f8f8">
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
                      <b-button
                        size="sm"
                        class="mr-1"
                        variant="primary"
                        @click="
                          () => {
                            $refs['invoice-modal'].hide();
                          }
                        "
                      >
                        <span class="text-nowrap"> Cancel</span>
                      </b-button>
                      <b-button size="sm" variant="primary" type="submit" :disabled="$store.state.invoice.isLoading">
                        <span class="text-nowrap">
a                          {{ invoiceTitle == "add" ? "Create" : "Update" }}
                        </span>
                        <b-spinner v-if="$store.state.invoice.isLoading" small style="margin-left:0.5rem;"></b-spinner>

                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-form>
            </ValidationObserver>
            <div v-if="$store.state.invoice.isLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Creating Invoice..</span>
      </div>
    </div>
          </b-modal>

          <b-modal
            id="reply-modal"
            ref="reply-modal"
            size="lg"
            :title="replySubject"
            hide-footer
            @hidden="resetReplyModal"
          >
            <template #modal-header>
              <h5 class="modal-title">
                {{
                  $store.state.leads.all
                    .filter((e) => e.id === taskId)[0]
                    .subject.includes("Re:")
                    ? ""
                    : "Re: "
                }}
                {{ $store.state.leads.all.filter((e) => e.id === taskId)[0].subject }}
              </h5>
            </template>
            <b-form @submit.prevent="sendEmail(composeData, file_name2)">
              <b-row>
                <b-col md="3">
                  <b-form-group label="From">
                    <v-select
                      v-model="composeData.from"
                      :options="outBoundEmails"
                      label="email"
                      placeholder="Select From"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="To">
                    <v-select
                      multiple
                      v-model="composeData.to"
                      :options="contactPerson"
                      placeholder="Select To"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="Cc">
                    <v-select
                      multiple
                      v-model="composeData.cc"
                      :options="emails_contact"
                      placeholder="Select Cc"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="Bcc">
                    <v-select
                      multiple
                      v-model="composeData.bcc"
                      :options="emails_contact"
                      placeholder="Select Bcc"
                    ></v-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Body">
                    <quill-editor
                      v-model="composeData.message"
                      :options="editorOption"
                    ></quill-editor>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <div class="border-l">
                    <div class="d-flex flex-column">
                      <div
                        class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                      >
                        <b-form-file
                          id="fileUpload2"
                          plain
                          v-model="composeData.file2"
                          class="d-none"
                          multiple
                          @change="onFileChange2"
                        />
                        <div>Attachment(s)</div>  
                        <div>
                          <input type="file" ref="file" style="display: none" />
                          <b-button size="sm" variant="primary" @click="file_upload"
                            >Choose File(s)</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-1">
                      <div>

                        <div
                          v-if="
                            file_name2.length > 0 && !$store.state.emails.isLoadingUrl
                          "
                        > 
                        
                          <div
                            v-for="(i, index) in $store.state.tasks.s3_url"
                            :key="index" class="text-center"
                          >
                          
                            {{ i.fileName }}
                            <span v-b-tooltip.hover.top="'Remove Attachment'">
                              <feather-icon
                                class="mr-1 cursor-pointer"
                                @click="removeFileS3(i.url, index)"
                                icon="XIcon"
                              />
                            </span>
                          </div>
                          <b-spinner  v-if="$store.state.tasks.isLoadingUrl" style="
                          position: relative;
                          top: 0;
                          left: 255px;
                      " >
                           
                          </b-spinner>
                        </div>
                        <div v-else>No file(s) selected</div>
                      </div>
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
                </b-col>
                <b-col md="6" style="display: none">
                  <b-form-group label="Proposal">
                    <div title="click to view" class="cursor-pointer border-l p-1">
                      {{ proposalPdf }}
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="text-right">
                <b-button
                  size="sm"
                  @click="$refs['reply-modal'].hide(), resetReplyModal()"
                  variant="primary"
                  class="mr-1"
                >
                  Cancel
                </b-button>
                <b-button size="sm" variant="primary" type="submit"> Send </b-button>
              </div>
            </b-form>
          </b-modal>

          <b-modal
            no-close-on-backdrop
            id="payment-modal"
            ref="payment-modal"
            size="lg"
            hide-footer
          >
            <template #modal-title>
              {{ payment.title == "add" ? "add new payment" : "edit payment" }}
            </template>
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
              <b-form
                @submit.prevent="
                  handleSubmit(payment.title == 'add' ? recordPayment : updatePayment)
                "
              >
                <b-row>
                  <b-col md="4">
                    <ValidationProvider
                      #default="validationContext"
                      name="Client"
                      vid="Client"
                      rules="required"
                    >
                      <b-form-group label="Client Name*">
                        <v-select
                           
                          v-model="payment.client"
                          placeholder="Search Client"
                          :options="show_companys"
                          label="name"
                        >
                        </v-select>
                        <b-form-invalid-feedback class="d-block">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Payment Mode">
                      <v-select
                        v-model="payment.mode"
                        placeholder="Payment Mode"
                        :options="payment_modes"
                        label="name"
                      >
                      </v-select>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <validation-provider
                      #default="validationContext"
                      name="branch"
                      vid="payment-branch"
                      rules="required"
                    >
                      <b-form-group label="Payment Branch">
                        <v-select
                          id="payment-branch"
                          v-model="payment.branch"
                          placeholder="Payment Branch"
                          :options="branchArrayComputed"
                        >
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
                    <ValidationProvider
                      #default="validationContext"
                      name="Payment"
                      vid="Payment"
                      rules="required"
                    >
                      <b-form-group label="Payment Amount *">
                        <b-form-input
                           
                          v-model.number="payment.amount"
                          type="number"
                          step="any"
                        ></b-form-input>
                        <b-form-invalid-feedback class="d-block">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Payment Date">
                      <VueDatePicker
                        format="YYYY-MM-DD"
                        style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                        :minDate="currentDate"
                        id="proposalDate"
                        v-model="payment.date"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Reference Id">
                      <b-form-input v-model="payment.reference_id"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <b-form-group label="Notes">
                      <b-form-input v-model="payment.notes"> </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div data-v-6d78c756="" class="">
                  <div data-v-6d78c756="">
                    <div class="table-responsive-sm">
                      <table
                        role="table"
                        aria-busy="false"
                        aria-colcount="6"
                        class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                        id="pending-invoices"
                      >
                        <caption>
                          <input class="mb-2" type="checkbox" v-model="payment.tax" />
                          <span
                            class="cursor-pointer"
                            @click="
                              () => {
                                if (!payment.tax) {
                                  payment.tax = true;
                                } else {
                                  payment.tax = false;
                                }
                              }
                            "
                            >Customer has deducted Tax</span
                          ><br />
                          <span class=""> (Pending Invoices) </span>
                        </caption>
                        <!---->
                        <thead role="rowgroup" class="">
                          <!---->
                          <tr role="row" class="">
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              class=""
                            >
                              <div>Invoice #</div>
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="2"
                              class=""
                            >
                              <div>Invoice Branch</div>
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="3"
                              class=""
                            >
                              <div>Invoice Date</div>
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="4"
                              class=""
                            >
                              <span
                                >Amount(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)</span
                              >
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              class=""
                            >
                              <span
                                >Amount Due(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)</span
                              >
                            </th>
                            <th
                              v-if="payment.tax"
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              class=""
                            >
                              <span
                                >TDS deducted(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)</span
                              >
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              class=""
                            >
                              <span
                                >Payment(<font-awesome-icon
                                  icon="indian-rupee-sign"
                                  class="icon cursor-pointer"
                                />)</span
                              >
                            </th>
                          </tr>
                        </thead>
                        <tbody role="rowgroup">
                          <!---->

                          <tr
                            role="row"
                            v-for="(invoice, index) in paid_payment.length > 0
                              ? paid_payment
                              : $store.state.invoice.all"
                          >
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
                            <td v-if="payment.tax">
                              <b-form-input
                                @input="setTds(invoice.id, $event)"
                                :value="setedittds(invoice.id)"
                                type="number"
                                step="any"
                                class="hide form-control"
                                :id="String(invoice.id)"
                              ></b-form-input>
                            </td>
                            <td aria-colindex="6" role="cell" class="">
                              <div class="form-group m-0">
                                <!-- {{ index }} -->
                                <!-- <div class="form-line"><b-form-input @input="setPayment(index, $event)" type="number" 
                                  class="hide form-control" :id="String(invoice.id)" /></div> -->
                                <div class="form-line">
                                  <b-form-input
                                    @input="setPayment(invoice.id, $event)"
                                    type="number"
                                    step="any"
                                    :value="seteditPayment(invoice.id)"
                                    class="hide form-control"
                                    :id="String(invoice.id)"
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot role="rowgroup" class="">
                          <tr role="row" class="">
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              class=""
                            >
                              &nbsp;
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="2"
                              class=""
                            >
                              &nbsp;
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="3"
                              class=""
                            >
                              &nbsp;
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="4"
                              class=""
                            >
                              &nbsp;
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              class=""
                            >
                              Total (<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)
                            </th>
                            <th
                              v-if="payment.tax"
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              class=""
                            >
                              {{ getTotalTds(payment.payment) }}
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              class=""
                            >
                              {{ getTotalAmt(payment.payment) }}
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div class="row">
                      <div class="col-sm-5"></div>
                      <div class="col-sm-2"></div>
                      <div class="col-sm-5" style="float: right">
                        <div class="list-group text-right">
                          <div
                            class="list-group-item d-flex justify-content-between align-items-center text-muted"
                          >
                            <span
                              >Amount Received (<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
                            <span class="">
                              {{ payment.amount }}
                            </span>
                          </div>
                          <div
                            class="list-group-item d-flex justify-content-between align-items-center text-muted"
                          >
                            <span
                              >Amount used only (<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
                            <span class="">
                              {{ getTotalAmt(payment.payment) }}
                            </span>
                          </div>
                          <div
                            class="list-group-item d-flex justify-content-between align-items-center text-muted"
                          >
                            <span
                              >Amount in excess (<font-awesome-icon
                                icon="indian-rupee-sign"
                                class="icon cursor-pointer"
                              />)</span
                            >
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
                  <b-button
                    size="sm"
                    variant="primary"
                    class="mr-1"
                    @click="$refs['payment-modal'].hide()"
                    >Cancel</b-button
                  >
                  <b-button size="sm" type="submiy" variant="primary">
                    {{ payment.title == "add" ? "Add" : "Update" }}
                  </b-button>
                </div>
              </b-form>
            </validation-observer>
          </b-modal>

          <b-modal
      no-close-on-backdrop
      id="payment-modal2"
      ref="payment-modal2"
      size="lg"
      hide-footer
      title="Create Payment"

    >
     
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          @submit.prevent="
            handleSubmit(recordPayment)
          "
        >
          <b-row>
            <b-col md="4">
              <b-form-group label="Client Name">
                <v-select
                  v-model="payment.client"
                  placeholder="Search Client"
                  :options="show_companys"
                  label="name"
                >
                </v-select>
              </b-form-group>
            </b-col>
            <b-col md="4">
              
              <b-form-group label="Payment Mode">
                <v-select
                  v-model="payment.mode"
                  placeholder="Payment Mode"
                  :options="payment_modes"
                  label="name"
                >
                </v-select>
              </b-form-group>
            </b-col>

            
            <b-col md="4">
              <b-form-group label="Payment Amount">
                <b-form-input
                  v-model.number="payment.amount"
                  type="number"
                  step="any"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            
            <b-col md="4">
              <b-form-group label="Payment Date">
                <VueDatePicker
                  format="YYYY-MM-DD"
                  :minDate="currentDate"
                  style="border: 1px solid #d8d6de; border-radius: 0.357rem"
                  v-model="payment.date"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Reference Id">
                <b-form-input v-model="payment.reference_id"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Notes">
                <b-form-input v-model="payment.notes"> </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            
          </b-row>
          <div data-v-6d78c756="" class="">
            <div data-v-6d78c756="">
              <div class="table-responsive-sm">
                <table
                  role="table"
                  aria-busy="false"
                  aria-colcount="6"
                  class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                  id="pending-invoices"
                >
                  <caption>
                    <input class="mb-2" type="checkbox" v-model="payment.tax" />
                    <span
                      class="cursor-pointer"
                      @click="
                        () => {
                          if (!payment.tax) {
                            payment.tax = true;
                          } else {
                            payment.tax = false;
                          }
                        }
                      "
                      >Customer has deducted Tax</span
                    ><br />
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
                        <span
                          >Amount(<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />)</span
                        >
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="5" class="">
                        <span
                          >Amount Due(<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />)</span
                        >
                      </th>
                      <th
                        v-if="payment.tax"
                        role="columnheader"
                        scope="col"
                        aria-colindex="5"
                        class=""
                      >
                        <span
                          >Tds deducted(<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />)</span
                        >
                      </th>
                      <th role="columnheader" scope="col" aria-colindex="6" class="">
                        <span
                          >Payment(<font-awesome-icon
                            icon="indian-rupee-sign"
                            class="icon cursor-pointer"
                          />)</span
                        >
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    <!---->

                    <tr
                      role="row"
                     
                      class=""
                    >
                      <!-- {{ addPayment() }} -->
                      <td aria-colindex="1" role="cell" class="">
                        {{ currentInvoice.invoice_number  }}
                      </td>

                      <td aria-colindex="2" role="cell" class="">
                        {{ getinvoiceBranch(currentInvoice.task_id) }}
                      </td>
                      <td aria-colindex="3" role="cell" class="">
                        {{ getinvoiceDate(currentInvoice.invoice_date) }}
                      </td>
                      <td aria-colindex="4" role="cell" class="">
                        {{ currentInvoice.sub_total }}
                      </td>
                      <td aria-colindex="5" role="cell" class="">
                        {{ currentInvoice.due }}
                      </td>
                      <td v-if="payment.tax">
                        <b-form-input
                          @input="setTds(currentInvoice.id, $event)"
                          :value="setedittds(currentInvoice.id)"
                          type="number"
                          step="any"
                          class="hide form-control"
                          :id="String(currentInvoice.id)"
                        ></b-form-input>
                      </td>
                      <td aria-colindex="6" role="cell" class="">
                        <div class="form-group m-0">
                          <!-- {{ index }} -->
                          <!-- <div class="form-line"><b-form-input @input="setPayment(index, $event)" type="number" 
                              class="hide form-control" :id="String(invoice.id)" /></div> -->
                          <div class="form-line">
                            <b-form-input
                              @input="setPayment(currentInvoice.id, $event)"
                              type="number"
                              step="any"
                              :value="seteditPayment(currentInvoice.id)"
                              class="hide form-control"
                              :id="String(currentInvoice.id)"
                            />
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
                        Total (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />)
                      </th>
                      <th
                        v-if="payment.tax"
                        role="columnheader"
                        scope="col"
                        aria-colindex="6"
                        class=""
                      >
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
                <div class="col-sm-5" style="float: right">
                  <div class="list-group text-right">
                    <div
                      class="list-group-item d-flex justify-content-between align-items-center text-muted"
                    >
                      <span
                        >Amount Received (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />)</span
                      >
                      <span class="">
                        {{ payment.amount }}
                      </span>
                    </div>
                    <div
                      class="list-group-item d-flex justify-content-between align-items-center text-muted"
                    >
                      <span
                        >Amount used only (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />)</span
                      >
                      <span class="">
                        {{ getTotalAmt(payment.payment) }}
                      </span>
                    </div>
                    <div
                      class="list-group-item d-flex justify-content-between align-items-center text-muted"
                    >
                      <span
                        >Amount in excess (<font-awesome-icon
                          icon="indian-rupee-sign"
                          class="icon cursor-pointer"
                        />)</span
                      >
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
            <b-button
              size="sm"
              variant="primary"
              class="mr-1"
              @click="$refs['payment-modal2'].hide()"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary" size="sm">
              {{ payment.title == "add" ? "Add" : "Update" }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-modal>
          <!-- b-modal end -->

          <!-- template start  -->
          <template #cell(client)="item">
            <span
              class="client-name234"
              v-if="item.item.company != null"
              v-b-tooltip.hover.top="item.item.company.name"
            >
              <b>
                {{ item.item.company.name }}
              </b>
            </span>
            <span
              class="contact-name234"
              v-if="item.item.company == null"
              v-b-tooltip.hover.top="'Contact person'"
            >
              <b>
                {{ item.item.contact_person ? item.item.contact_person.name : "" }}
              </b>
            </span>
          </template>
          <!-- template end -->
        </b-card>
        <div class="text-center">
          <b-spinner v-if="isLoadingInvoices" />
        </div>

        <!-- dropdown invoice details -->
      </b-tab>
      <!-- <b-tab v-if="setPrivileges.payment===true"> -->
      <!-- <b-tab v-if="setPrivileges.payment===true" id="payments"> -->
      <b-tab id="payments">
        <template #title>
          {{ "PAYMENTS" }}
        </template>
        <b-card class="mt-1" v-if="filterPaymentModal">
      <b-row>
        <b-col md="4"
          ><span>Client Name*</span>
          <v-select
          class="my-custom-select"
            v-model="selectedCompanyPayment"
            :options="clientArrayComputed"
            placeholder="Select the Client"
        /></b-col>

        <b-col md="4">
          <b-form-group>
            <span>From Date</span>
            <VueDatePicker
              format="YYYY-MM-DD"
              style="border: 1px solid #d8d6de; border-radius: 0.357rem"
              id="proposalDate"
              v-model="paymentFromDate"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <span>To Date</span>
            <VueDatePicker
              format="YYYY-MM-DD"
              style="border: 1px solid #d8d6de; border-radius: 0.357rem"
              id="proposalDate"
              v-model="paymentToDate"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8"></b-col>

        <b-col class="text-right"
          ><b-button
            size="sm"
            variant="primary"
            @click="
              () => {
                paymentFromDate = null;
                paymentToDate = null;
                selectedCompanyPayment = null;
              }
            "
            >Reset</b-button
          ></b-col
        >
      </b-row>
    </b-card>
        <b-card class="mt-2" no-body>
          <b-table
            id="payments"
            :per-page="perPagePayment"
            :current-page="currentPagePaymentTable"
            @row-clicked="onRowClickedPaymentItem"
            selectable
            responsive="sm"
            :items="filteredPaymentItems"
            :fields="paymentFields"
            class="mb-0"
            :show-empty="!isLoadingPayment && filteredPaymentItems.length == 0"
          >
            <template #cell(serialNumber)="data">
              {{ (currentPagePaymentTable - 1) * perPagePayment + data.index + 1 }}
            </template>
            <template #row-details="item">
              <b-card no-body class="ml-2 mt-2 mr-2 mb-0">
                <div
                  style="text-transform: uppercase; font-weight: 500"
                  class="d-flex justify-content-between align-items-end"
                >
                  <h4 class="m-0">Payment Receipt</h4>
                  <div>
                    <b-button
                      size="sm"
                      @click="
                        () => {
                          payment.title = 'edit';
                          show_companys.forEach((element) => {
                            if (element.id === item.item.client_id) {
                              payment.client = element;
                            }
                          });
                          $store.state.branches.all.forEach((element) => {
                            if (element.id === item.item.branch_id) {
                              payment.branch = element.name;
                            }
                          });
                          payment.payment.forEach((element) => {
                            item.item.record_pay_invoice.forEach((e) => {
                              if (element.invoice_id === e.invoice_id) {
                                (element.amount = e.paid_amount),
                                  (element.tds = e.tds_deducted);
                              }
                            });
                          });
                          payment_modes.forEach((element) => {
                            if (element.name === item.item.payment_mode) {
                              payment.mode = element;
                            }
                          });
                          //payment.amount = item.item.amount;
                          payment.date = item.item.pay_date;
                          payment.reference_id = item.item.reference_id;
                          payment.notes = item.item.notes;
                          $refs['payment-modal'].show();
                          // editIndex = item.index
                          // pname = item.item.client_name
                          // pperson = item.item.concerned_person
                          // pphrase = item.item.prephase
                          // pfooterdesc = item.item.footer_description
                          // pfootertitle = item.item.footer_title
                          // paddress = item.item.address
                          // psubject = item.item.subject
                          // amountField = []
                          // item.item.proposal_fees.forEach(element => {

                          //   amountField.push({
                          //     id: element.id, description: element.description,
                          //     amount: element.amount
                          //   })

                          // });
                          // pnotes = item.item.internal_notes
                          // proposalFields = []
                          // item.item.proposal_section.forEach(element => {

                          //   proposalFields.push({
                          //     id: element.id,
                          //     title: element.title,
                          //     desc: element.description
                          //   })
                          // });
                          // openModal('proposal-edit-modal_' + item.item.id + '_' + i.item.id);

                          // ;
                        }
                      "
                      variant="primary ml-1"
                    >
                      <span class="text-nowrap"> Edit</span>
                    </b-button>

                    <b-button
                      size="sm"
                      :disabled="loader_payment"
                      variant="primary ml-1"
                      @click="exportToPDFPayment(item)"
                    >
                      <span class="text-nowrap"> PDF</span>
                      <b-spinner
                        class="ml-1"
                        small
                        v-if="loader_payment == true"
                      ></b-spinner>
                    </b-button>
                    <!-- <b-button size="sm" variant="primary ml-1"    @click="destroyPayment(item.item.id)">
                      <span class="text-nowrap"> Delete</span>
                    </b-button> -->
                  </div>
                </div>
                <hr
                  style="
                    height: 2px;
                    width: 100%;
                    border-width: 0;
                    color: red;
                    background-color: red;
                  "
                />

                <!-- for pdf only  -->
                <div id="PaymentpdfContent" style="display: none">
                  <b-row class="invoiceBody justify-content-between align-item-center">
                    <b-col class="invoiceBodyLeft" md="4">
                      <address>
                        <img
                          width="120"
                          :src="imgLogo"
                          alt=""
                          itemprop="logo"
                          class="custom-logo"
                        />
                        <br />
                        <strong>Centrik Legalistic LLP</strong><br />
                        <span
                          >E-11<br />
                          LGF<br />
                          Jangpura Extension<br />
                          New Delhi - 110014</span
                        ><br />
                        <!---->
                        <br />
                        <!---->
                        <br />
                      </address>
                    </b-col>
                    <b-col md="2" class="invoiceBodyRight">
                      <br />
                      <br />
                      <address class="text-left">
                        Bill To<br />
                        <strong>{{ item.item.client_name }}</strong
                        ><br />
                        <span>{{ item.item.address }}</span
                        ><br />
                        <!---->
                      </address>
                    </b-col>
                  </b-row>

                  <hr />

                  <br />
                  <br />
                  <!-- payment receipt start here -->
                  <b-row class="row">
                    <b-col md="12" class="col-md-12">
                      <h4 class="text-uppercase text-center m-b-25">
                        <strong>Payment Receipt</strong>
                      </h4>
                    </b-col>
                  </b-row>
                  <br />
                  <b-row>
                    <b-col md="8" class="col-md-8">
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Payment Date</div>
                        <div class="receipt-value">
                          {{ item.item.pay_date }}
                        </div>
                      </div>
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Reference Number</div>
                        <div class="receipt-value">
                          {{ item.item.reference_id }}
                        </div>
                      </div>
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Payment Mode</div>
                        <div class="receipt-value">
                          {{ item.item.payment_mode }}
                        </div>
                      </div>
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Amount Received In Words</div>
                        <div class="receipt-value">
                          {{ convert(String(item.item.amount)) }}
                        </div>
                      </div>
                    </b-col>
                    <b-col md="4" class="col-md-4">
                      <div class="panel panel-default text-center font-15">
                        <div class="panel-heading">Amount Received</div>
                        <div class="panel-body font-bold">
                          <span>₹</span>
                          {{ item.item.amount }}
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <br />
                  <br />
                  <br />
                  <br />
                  <!-- table will remain same for now -->

                  <table
                    class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                    style="cursor: pointer"
                  >
                    <caption>
                      Payment For
                    </caption>
                    <thead class="invoice-thead-tr">
                      <tr class="invoice-thead-tr">
                        <th
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          Invoice Number
                        </th>
                        <th
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          Invoice Amount
                        </th>
                        <th
                          class=""
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          TDS deducted
                        </th>

                        <th
                          class=""
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          Payment Amount(₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(invoice, index) in item.item.invoice" :key="invoice.id">
                        <td>{{ invoice.invoice_number }}</td>
                        <!-- <td>{{ Number(getTdsForPayment(invoice.id, item.item.record_pay_invoice)) + getFinalPayment(invoice.id, item.item.record_pay_invoice)}}</td> -->
                        <td>{{ item.item.amount }}</td>
                        <td>
                          {{ getTdsForPayment(invoice.id, item.item.record_pay_invoice) }}
                        </td>
                        <td>
                          {{ getFinalPayment(invoice.id, item.item.record_pay_invoice) }}
                        </td>
                      </tr>
                      <!-- <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td class="text-right">{{ item.item.sub_total }}</td>
                                        </tr> -->
                    </tbody>
                  </table>

                  <div class="row" style="border-radius: 0px">
                    <div class="col-md-9">
                      <!---->
                      <!---->
                    </div>
                    <div class="col-md-3">
                      <p class="text-right">
                        <b>Over payment(₹):</b>
                        0.00
                      </p>
                      <p class="text-right">
                        <b>TDS Deducted(₹):</b>
                        0.00
                      </p>
                      <hr />
                      <p class="text-right m-t-30">Authorized Signature</p>
                    </div>
                  </div>
                </div>

                <!-- end of pdf only -->
                <b-row class="invoiceBody justify-content-between align-item-center">
                  <b-col class="invoiceBodyLeft" md="4">
                    <address>
                      <!-- <img width="120"
                :src="imgLogo"
                alt="" itemprop="logo" class="custom-logo"> -->
                      <br />
                      <strong>Centrik Legalistic LLP</strong><br />
                      <span
                        >E-11<br />
                        LGF<br />
                        Jangpura Extension<br />
                        New Delhi - 110014</span
                      ><br />
                      <!---->
                      <br />
                      <!---->
                      <br />
                    </address>
                  </b-col>
                  <b-col md="2" class="invoiceBodyRight">
                    <br />
                    <br />
                    <address class="text-left">
                      Bill To<br />
                      <strong>{{ item.item.client_name }}</strong
                      ><br />
                      <span>{{ item.item.address }}</span
                      ><br />
                      <!---->
                    </address>
                  </b-col>
                </b-row>

                <hr />

                <br />
                <br />
                <!-- payment receipt start here -->
                <div>
                  <b-row class="row">
                    <b-col md="12" class="col-md-12">
                      <h4 class="text-uppercase text-center m-b-25">
                        <strong>Payment Receipt</strong>
                      </h4>
                    </b-col>
                  </b-row>
                  <br />
                  <b-row>
                    <b-col md="8" class="col-md-8">
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Payment Date</div>
                        <div class="receipt-value">
                          {{ item.item.pay_date }}
                        </div>
                      </div>
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Reference Number</div>
                        <div class="receipt-value">
                          {{ item.item.reference_id }}
                        </div>
                      </div>
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Payment Mode</div>
                        <div class="receipt-value">
                          {{ item.item.payment_mode }}
                        </div>
                      </div>
                      <div class="receipt-inline clearfix">
                        <div class="form-label">Amount Received In Words</div>
                        <div class="receipt-value">
                          {{ convert(String(item.item.amount)) }}
                        </div>
                      </div>
                    </b-col>
                    <b-col md="4" class="col-md-4">
                      <div class="panel panel-default text-center font-15">
                        <div class="panel-heading">Amount Received</div>
                        <div class="panel-body font-bold">
                          <span>₹</span>
                          {{ item.item.amount }}
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <br />
                  <br />
                  <br />
                  <br />
                  <!-- table will remain same for now -->

                  <table
                    class="table b-table border b-table-caption-top table b-table b-table-selectable b-table-select-multi"
                    style="cursor: pointer"
                  >
                    <caption>
                      Payment For
                    </caption>
                    <thead class="invoice-thead-tr">
                      <tr class="invoice-thead-tr">
                        <th
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          Invoice Number
                        </th>
                        <th
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          Invoice Amount
                        </th>
                        <th
                          class=""
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          TDS deducted
                        </th>

                        <th
                          class=""
                          style="
                            background-color: #000000a1 !important;
                            color: #fff !important;
                          "
                        >
                          Payment Amount(₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(invoice, index) in item.item.invoice" :key="invoice.id">
                        <td>{{ invoice.invoice_number }}</td>
                        <!-- <td>{{ Number(getTdsForPayment(invoice.id, item.item.record_pay_invoice)) + getFinalPayment(invoice.id, item.item.record_pay_invoice)}}</td> -->
                        <td>{{ item.item.amount }}</td>
                        <td>
                          {{ getTdsForPayment(invoice.id, item.item.record_pay_invoice) }}
                        </td>
                        <td>
                          {{ getFinalPayment(invoice.id, item.item.record_pay_invoice) }}
                        </td>
                      </tr>
                      <!-- <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-right">{{ item.item.sub_total }}</td>
                                  </tr> -->
                    </tbody>
                  </table>

                  <div class="row" style="border-radius: 0px">
                    <div class="col-md-9">
                      <!---->
                      <!---->
                    </div>
                    <div class="col-md-3">
                      <p class="text-right">
                        <b>Over payment(₹):</b>
                        0.00
                      </p>
                      <p class="text-right">
                        <b>TDS Deducted(₹):</b>
                        0.00
                      </p>
                      <hr />
                      <p class="text-right m-t-30">Authorized Signature</p>
                    </div>
                  </div>
                </div>
              </b-card>
            </template>

            <template #cell(payment_mode)="item">
              <b-badge variant="primary">
                {{ item.item.payment_mode }}
              </b-badge>
            </template>
          </b-table>
          <div class="d-flex justify-content-end p-1" v-if="filteredPaymentItems.length">
            <b-pagination
              :total-rows="filteredPaymentItems.length"
              :per-page="perPagePayment"
              v-model="currentPagePaymentTable"
              class="mb-0 mt-1 mt-sm-0"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
            >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
            </b-pagination>
          </div>
        </b-card>
        <div class="text-center">
          <b-spinner v-if="isLoadingPayment" />
        </div>
      </b-tab>
      <!-- <b-tab v-if="setPrivileges.invoice===true"> -->
      <!-- <b-tab v-if="setPrivileges.expenses===true"> -->
      <b-tab>
        <template #title>
          {{ "EXPENSES" }}
        </template>

        <b-card class="mt-2" no-body>
          <b-table
            :show-empty="!isLoadingExpenses && expenses.length == 0"
            :per-page="perPageExpenses"
            :current-page="currentPageExpensesTable"
            id="expenses"
            selectable
            responsive="sm"
            :items="expenses"
            :fields="expenseFields"
            class="mb-0"
            @row-clicked="onRowClickedExpense"
          >
            <template #cell(description)="{ item }">
              <span v-b-tooltip.hover="item.description">
                {{ item.description }}
              </span>
            </template>
            <template #row-details="i">
              <b-card>
                <!-- {{ i.item}} -->
                <b-row>
                  <b-col md="2">
                    <h5>Expense Details</h5>
                  </b-col>
                  <b-col md="8"></b-col>
                  <b-col md="2" class="text-right">
                    <EditExpense
                      :task_details="
                        $store.state.expenses.all.find((e) => e.task_id === taskId)
                      "
                    />

                    <b-button
                      size="sm"
                      variant="primary"
                      v-b-modal.edit-expense
                      class="mr-1"
                      >Edit</b-button
                    >

                    <b-button
                      size="sm"
                      variant="primary"
                      @click="destroyExpense(i.item.expense_id, i.item.id)"
                      >Delete</b-button
                    >
                  </b-col>
                </b-row>
                <hr style="border-color: #f75949" />
                <br />

                <b-row>
                  <b-col md="2">
                    <b> Description: </b>
                  </b-col>
                  <b-col md="2">
                    {{ i.item.description }}
                  </b-col>
                  <b-col md="2">
                    <b> Users: </b>
                  </b-col>
                  <b-col md="2">
                    <!-- {{ i.item }} -->
                    {{ i.item.member }}
                  </b-col>
                  <b-col md="2">
                    <b> Date: </b>
                  </b-col>

                  <b-col md="2">
                    {{ i.item.date }}
                  </b-col>
                </b-row>
              </b-card>
            </template>

            <template #cell(status)="item">
              <b-badge variant="danger">
                <!-- {{ statusCal(item.item.id, item.item.status) }} -->
                <!-- {{ item.item.status }} -->
                Not Invoiced
              </b-badge>
            </template>
          </b-table>
          <div v-if="expenses.length" class="d-flex justify-content-end p-1">
            <b-pagination
              :total-rows="expenses.length"
              :per-page="perPageExpenses"
              v-model="currentPageExpensesTable"
              class="mb-0 mt-1 mt-sm-0"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
            >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
            </b-pagination>
          </div>
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import EditExpense from "./editExpense.vue";

import { ref } from "@vue/composition-api";
import "vue-toastification/dist/index.css";

import imgLogo from "../../../assets/images/logo/centrik-logo.png";
// import imgLogo from "../../../assets/images/logo/";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import html2pdf from "html2pdf.js";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { quillEditor } from "vue-quill-editor";
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

import {
  BPagination,
  VBTooltip,
  BTabs,
  BTab,
  BTable,
  BCard,
  BBadge,
  BButton,
  BContainer,
  BRow,
  BCol,
  VBToggle,
  BCollapse,
  BSpinner,
  BFormInput,
  BFormGroup,
  BFormDatepicker,
  BForm,
  BMediaAside,
  BFormInvalidFeedback,
  BModal,
  BFormTextarea,
  BFormFile,
  // BSelect,
} from "bootstrap-vue";

export default {
  components: {
    EditExpense,
    VueDatePicker,
    BPagination,
    VBTooltip,
    BFormFile,
    BFormTextarea,
    BFormInvalidFeedback,
    ValidationProvider,
    FontAwesomeIcon,
    quillEditor,

    BFormDatepicker,
    // BSelect,
    ValidationObserver,
    BModal,
    BSpinner,
    BTabs,
    BTab,
    BTable,
    BCard,
    BBadge,
    BTab,
    BTable,
    BCard,
    BBadge,
    BButton,
    BContainer,
    BRow,
    BCol,
    VBToggle,
    BCollapse,
    BFormInput,
    BFormGroup,
    vSelect,
    BForm,
    BMediaAside,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  data() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return {
      amountToDisplay:null,
      // remainingPercentage:null,
      // percentagePaymentDone:null,
      // totalProposalAmount:null,
      itemNewDetails:[],
      selectedProposal:null,
      proposalsToDisplay:[],
      CreateInvoicesModalExpand:false,
      proposalAmount:0,
      expandProposal:false,
      currentInvoice:null,
      perPagePaymentTable:10,
      paymentInvoiceArray: [],
      findInvoice: null,
      perPageProposal: 50,
      perPageInvoice: 50,
      perPagePayment: 50,
      perPageExpenses: 50,
      currentPageProposalTable: 1,
      currentPageInvoiceTable: 1,
      currentPagePaymentTable: 1,
      currentPagePaymentTableModel: 1,
      currentPageExpensesTable: 1,
      lastInvoiceId: null,
      showExpensesModal: false,
      // paymentInvoiceArray: [],
      tds_deductedArray: [],
      paymentInvoice: {
        task_id: null,
        invoice_id: null,
        tds_deducted: 0,
        paid_amount: null,
        status: null,
      },
      greaterAmountSingle: false,
      greaterAmount: [],
      paymentTotalAmount: 0,
      paymentTotalArray: [],

      paymentPrefillAmount: "12",
      file_name2: [],
      composeData: {
        to: [],
        bcc: [],
        message: "",
        subject: "",
        from: null,
        file2: null,
      },

      prefixPlusid: null,
      proposalFields: [],
      loader_invoice: false,
      invoiceTitle: "add",

      taskId: null,
      amountField: [{ amount: null, description: "" }],
      proposal_edit_id: 0,

      currentDate: `${year}-${month}-${day}`,
      pdate: `${year}-${month}-${day}`,
      pamount: null,
      pclient: "",
      pcontact: "",
      pname: "",
      paddress: "",
      pperson: "",
      pfeesdesc: "",
      pfootertitle: "Thanking you,",
      pfooterdesc: `${JSON.parse(localStorage.getItem("userData")).name}<br/>For, ${
        JSON.parse(localStorage.getItem("userData")).tenant.organization.name
      }<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)`,
      pNotes: "",
      psubject: "",
      pphrase: "As per discussion, please find below the brief proposal",
      editIndex: null,
      pnotes: "",
      invoices: false,

      // invoice: {
      //   prefix: "yr 22-23/",

      //   client_name: "",
      //   editId: 0,
      //   state_code: 0,
      //   client: null,
      //   gstNumber: "",
      //   item_details: "",
      //   state: null,
      //   id: "",
      //   pdate: `${year}-${month}-${day}`,
      //   due_date: `${year}-${month}-${day}`,
      //   billing_address: "delhi jangpura",
      //   notes: "Thank you for your business.",
      //   amount: null,
      //   discount: null,
      //   taxble_amt: null,
      //   igst: null,
      //   igst_amt: null,
      //   cgst: null,
      //   cgst_amt: null,
      //   sgst: null,
      //   sgst_amt: null,
      //   utgst: null,
      //   utgst_amt: null,
      //   total_amt: 0,
      //   sub_total: 0,
      //   pocket_expense: null,
      //   expense_details: "",
      //   adjustments: 0,
      //   total: 0,
      // },

      payment: {
        edit_id: 0,
        title: "add",
        client: null,
        mode: null,
        tax: false,
        branch: null,
        amount: null,
        date: `${year}-${month}-${day}`,
        reference_id: "",
        notes: "",
        payment: [],
        tds: [],
        prefill: {
          total_amt: 2333,
        },
      },

      groups: [
        {
          label: "Tasks",
          options: this.$store.state.tasks.all,
        },
        {
          label: "Leads",
          options: this.$store.state.leads.all,
        },
      ],
      proposalFormData: {
        client: null,
        branch: null,
        task: null,
        clientName:null,
      },
      invoiceFormData: {
        client: null,
        branch: null,
        task: [],
      },
      paymentFormData: {
        client: null,
        branch: null,
        task: null,
      },
      loader_proposal: false,
      userData: JSON.parse(localStorage.getItem("userData")),
      selectedTask: null,
      filterStatus: null,
      fromDate: null,
      invoiceFromDate: null,
      invoiceToDate: null,
      paymentFromDate: null,
      paymentToDate: null,
      toDate: null,
      selectedCompanyProposal: null,
      selectedCompanyPayment: null,
      selectedCompanyInvoices: null,
      selectedClient: null,
      clientArray: [],
      branchArray: [],
      tasksArray: [],
      pamount: null,
      pclient: "",
      pcontact: "",
      pname: "",
      paddress: "",
      pperson: "",
      pfeesdesc: "",
      activeTab: 0,
      showProposalModal: true,
      showInvoicesModal: false,
      showPaymentModal: false,
      CreateProposalModal: false,
      CreatePaymentModal: false,
      CreateInvoicesModal: false,
      filterProposalModal: false,
      filterPaymentModal: false,
      filterInvoicesModal: false,
      img: this.imgLogo,
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
      selectVal: {
        priority: undefined,
        status_master_id: undefined,
        company_id: undefined,
        contact_person_id: undefined,
        branch_id: undefined,
        category_id: undefined,
      },
      proposalPdf: "PL-0009.pdf",
      previewImage: null,
      file: null,
      image: null,
      // file_name: [],
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
      replySubject: "",
      // composeData: {
      //   message: "",
      //   to: [],
      //   cc: [],
      //   bcc: [],
      //   from: null,
      // },

      loader_payment: false,
      invoice: {
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

      // creating for testing purpose
      invoicesDetailFields: [
        {
          key: "Sl.No",
          thClass: "bg-dark text-white text-left ",
          tdClass: "text-center",
        },
        {
          key: "Description",
          thClass: "bg-dark text-white text-left",
          tdClass: "text-left",
        },
        {
          key: "Amount",
          thClass: "bg-dark text-white text-center",
          tdClass: "text-center",
        },
        {
          key: "TotalAmount",
          thClass: "bg-dark text-white text-right",
          tdClass: "text-right",
        },
      ],
      invoicesDetailsItems: [
        {
          "Sl.No": 1,
          Description: "Contempt against RERA Order- Advance fees",
          Amount: 75000,
          TotalAmount: 75000.0,
        },
      ],

      proposalField: [
        {
          key: "no",
          label: "# ",
          tdClass: "no-padding text-center width-0   ",
          thClass: "extra-space-header  text-center width-0  ",
        },
        {
          key: "task_id",
          label: "Task#",
          tdClass: "text-center width-0 no-padding",
          thClass: "text-center no-padding-header width-0",
        },
        {
          key: "client_name",
          label: "Client Name",
          thClass: "width-0 no-padding-header2 text-center",
          tdClass: "width-0 text-center extra-space-td2 hideOverFlowItemCss",
        },
        {
          key: "concerned_person",
          label: "Contact",
          tdClass:
            "width-0 text-center extra-space-td hideOverFlowItemCss hideOverFlowItemCss ",
          thClass: "width-0 text-center no-padding-header2 ",
          // width:'50px',
        },
        {
          key: "proposal_date",
          label: "Date",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center extra-space-header ",
        },
        {
          key: "amount",
          label: "Amount",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center no-padding-header ",
        },
        {
          key: "subject",
          label: "Subject",
          tdClass: "width-0 hideOverFlowItemCss2 text-center hideOverFlowItemCss",
          thClass: "text-center width-0 no-padding-header ",
        },
        {
          key: "internal_notes",
          label: "Notes",
          tdClass: "text-center width-0 hideOverFlowItemCss2 hideOverFlowItemCss",
          thClass: "text-center width-0 no-padding-header ",
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0 text-center no-padding",
          thClass: "width-0 text-center no-padding-header ",
        },
      ],

      invoiceFields: [
        {
          key: "invoice_number",
          label: "#",
          tdClass: "width-0 text-center no-padding",
          thClass: "text-center width-0 extra-space-header ",
        },
        {
          key: "task_id",
          label: "Task #",
          tdClass: "text-center width-0",
          thClass: "text-center",
        },
        {
          key: "client_name",
          label: "Client Name",
          tdClass: "width-0 text-center hideOverFlowItemCss",
          thClass: " width-0 text-center",
        },
        {
          key: "invoice_date",
          label: "Date",
          tdClass: "width-0 text-center no-padding",
          thClass: " width-0 text-center extra-space-header",
        },
        {
          key: "total_amt",
          label: "Amount",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center",
        },
        {
          key: "recieved",
          label: "Total Recieved(₹)",
          tdClass: "width-0 text-center",
          thClass: " width-0 text-center hideOverFlowItemCss2",
        },
        {
          key: "due",
          label: "Due(₹)",
          tdClass: "text-center width-0",
          thClass: "text-center width-0",
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0 text-center",
          thClass: "width-0 text-center",
        },
      ],
      paymentFields: [
        {
          key: "serialNumber",
          label: "#",
          tdClass: "width-0 text-center no-padding",
          thClass: "text-center extra-space-header",
        },
        {
          key: "client_name",
          label: "Client Name",
          tdClass: "width-0 text-center  noPadding hideOverFlowItemCss",
          thClass: "text-center width-0",
        },
        {
          key: "pay_date",
          label: "Date",
          tdClass: "width-0 text-center no-padding",
          thClass: "text-center extra-space-header",
        },
        {
          key: "invoice_id",
          label: "Invoice #",
          tdClass: "width-0 text-center",
          thClass: "text-center",
        },
        {
          key: "payment_mode",
          label: "Mode",
          tdClass: "width-0 text-center",
          thClass: "text-center",
        },
        {
          key: "amount",
          label: "Amount(₹)",
          tdClass: "text-center width-0",
          thClass: "text-center",
        },
        {
          key: "unused_amount",
          label: "Unused Amount(₹)",
          tdClass: "text-capitalize width-0 text-center ",
          thClass: "text-center hideOverFlowItemCss2",
        },
      ],
      expenseFields: [
        {
          key: "id",
          label: "Task #",
          tdClass: "text-left width-0",
          thClass: "text-left",
        },
        {
          key: "client",
          label: "Client Name",
          tdClass: "width-0 hideOverFlowItemCss",
        },
        { key: "date", label: "Date", tdClass: "width-0" },
        {
          key: "description",
          label: "Description",
          tdClass: "width-0 hideOverFlowItemCss",
        },
        {
          key: "member",
          label: "Member",
          tdClass: "width-0",
          thClass: "text-left",
        },
        {
          key: "expense",
          label: "Expense(₹)",
          tdClass: "text-left width-0",
          thClass: "text-left ",
        },
        { key: "status", tdClass: "text-capitalize width-0" },
      ],
    };
  },
  beforeUpdate() {
    var signAll = [];
    if (this.$store.state.users.signAll != null) {
      signAll.push(this.$store.state.users.signAll);
    }
    // if (signAll.length > 0) {
    //   this.composeData.message = signAll[0].signature;
    // }
    const invoicesAllData = this.$store.state.invoice.allData;
    if (invoicesAllData.length > 0) {
      this.lastInvoiceId = invoicesAllData[invoicesAllData.length - 1].id;
    } else {
      this.lastInvoiceId = 0;
    }
    this.lastInvoiceId = this.lastInvoiceId + 1;
    this.prefixPlusid = this.invoice.prefix + this.lastInvoiceId;
  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const ClientisEditSidebarActive = ref(false);
    const editItem = ref({});
    const editItemClient = ref({});
    const isFilterActive = ref(false);
    const isSearchMessagesActive = ref(false);

    let statusOptions = ["open", "completed", "invoiced", "closed"];

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetForm);
    // const editLead = ref({})
    const perPage = ref(10);
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

  computed: {
   
    proposalToDisplay() {
  
  const taskIds=this.invoiceFormData.task.id
  const proposals = this.$store.state.proposals.allProposals;
  const filteredProposals = proposals.filter(proposal => taskIds===proposal.task_id && (proposal.status==null || proposal.status < 100.00) );
 this.itemNewDetails=filteredProposals


  return filteredProposals;
},

    slicedRows() {
    const start = (this.currentPagePaymentTableModel - 1) * this.perPagePaymentTable;
    const end = start + this.perPagePaymentTable;
    return this.filteredInvoiceClientLessThan100.slice(start, end);
  },
    isLoadingExpenses() {
      return this.$store.state.expenses.isLoading;
    },
    isLoadingProposal() {
      return this.$store.state.proposals.isLoading;
    },
    isLoadingInvoices() {
      return this.$store.state.invoice.isLoading;
    },
    isLoadingPayment() {
      return this.$store.state.recordPayment.isLoading;
    },
    getTotalTdsAmt() {
      return this.tds_deductedArray.reduce((total, amt) => {
        if (amt === "") amt = 0;
        return total + amt;
      }, 0);
    },
    getTotalAmtPayment() {
      return this.paymentTotalArray.reduce((total, amt) => {
        if (amt === "") amt = 0;
        return total + amt;
      }, 0);
    },

    filteredInvoiceClient() {
      return this.$store.state.invoice.allData.filter((invoice) => {
        return invoice.client.name === this.payment.client.name;
      });
    },
    filteredInvoiceClientLessThan100() {
      const data = this.filteredInvoiceClient.filter((clientInvoice) => {
        const paymentIndex = this.paymentInvoiceArray.findIndex(
          (paymentInvoice) => paymentInvoice.invoice_id === clientInvoice.id
        );
        if (paymentIndex !== -1 && this.paymentInvoiceArray[paymentIndex].status < 100) {
          return true;
        }
        return false;
      });
      return data;
    },

    paginated_contactPerson() {
      return this.contactPerson.slice(this.offset, this.limit + this.offset);
    },

    contactPerson() {
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

    tasksAndLeadsCombine() {
      let arr = this.$store.state.leads.all;
      arr = arr.concat(this.$store.state.tasks.all);
      let data = {
        tasksHeader: "Tasks",
        leadsHeader: "Leads",
        data: arr,
        // tasks :  this.$store.state.tasks.all,
        // leads  : this.$store.state.leads.all,
      };

      return data;
    },
    selectedTaskDisplay() {
      if (this.selectedTask) {
        return `#${this.selectedTask.id} - ${this.selectedTask.subject}`;
      }
      return "";
    },

    filteredProposalItems() {
      this.currentPageProposalTable =1;
      const { fromDate, toDate } = this;
      let filteredItems = this.proposalItems;

      if (this.selectedCompanyProposal) {
        filteredItems = filteredItems.filter(

          (item) => 
          {
            if(item.client_name){

              if(item.client_name === this.selectedCompanyProposal)
              {
                return item;
              }
            }
          }
        );
      }

      if (this.filterStatus) {
        const allTasks = this.$store.state.tasks.all;
        filteredItems = filteredItems.filter((item) => {
          const task = allTasks.find((task) => task.id === item.task_id);
          if (
            task &&
            task.status_master &&
            task.status_master.type === this.filterStatus
          ) {
            return true;
          }
          return false;
        });
      }

      if (fromDate && toDate) {
        filteredItems = filteredItems.filter((item) => {
          const proposalDate = item.proposal_date;
          if (!proposalDate) {
            return false;
          }
          const date = new Date(proposalDate);
          const formattedDate = date.toISOString().substr(0, 10);
          return formattedDate >= fromDate && formattedDate <= toDate;
        });
      }

      return filteredItems;
    },
    filteredInvoiceItems() {
      this.currentPageInvoiceTable =1;
      const { invoiceFromDate, invoiceToDate, selectedCompanyInvoices } = this;
      let filteredItems = this.invoicesItems.slice().reverse();
      if (selectedCompanyInvoices) {
        filteredItems = filteredItems.filter(
          (item) => {
          if(item.client !== null){

            if(item.client.name === selectedCompanyInvoices){
              return item;
            }
          }  
          }
        );
      }
      if (invoiceFromDate && invoiceToDate) {
        filteredItems = filteredItems.filter((item) => {
          const invoiceDate = item.invoice_date;
          if (!invoiceDate) {
            return false;
          }
          const date = new Date(invoiceDate);
          const formattedDate = date.toISOString().substr(0, 10);
          return formattedDate >= invoiceFromDate && formattedDate <= invoiceToDate;
        });
      }
      return filteredItems;
    },
    filteredPaymentItems() {
      this.currentPagePaymentTable =1;
      const { paymentFromDate, paymentToDate, selectedCompanyPayment } = this;
      let filteredItems = this.paymentItems;
      if (selectedCompanyPayment) {
        filteredItems = filteredItems.filter(
          (item) => {
            if(item.client_name){

              if(item.client_name === selectedCompanyPayment){
                return item;
              }
            }
          } 
        );
      }
      if (paymentFromDate && paymentToDate) {
        filteredItems = filteredItems.filter((item) => {
          const payDate = item.pay_date;
          if (!payDate) {
            return false;
          }
          const date = new Date(payDate);
          const formattedDate = date.toISOString().substr(0, 10);
          return formattedDate >= paymentFromDate && formattedDate <= paymentToDate;
        });
      }
      return filteredItems;
    },

    clientArrayComputed() {
      return this.$store.state.clients.all.map((client) => client.name);
    },
    branchArrayComputed() {
      return this.$store.state.branches.all.map((branch) => branch.name);
    },

    tasksArrayOnlyProposal() {
      let allProposals = this.$store.state.proposals.allProposals;
      const filterProposalId = allProposals.map((item) => item.task_id);
      let allTasks = this.$store.state.tasks.all;
      const filterTask = allTasks.filter((task) => filterProposalId.includes(task.id));
      return filterTask;
    },
    tasksArrayComputed() {
      return this.$store.state.tasks.all.filter((e)=> e.status_master.type !=="closed");
    },
    leadsArrayComputed() {
      return this.$store.state.leads.all;
    },
    taskOptions() {
      return this.tasksArrayComputed.map((task) => task.id);
    },
    expenses() {
      let arr = this.$store.state.expenses.all;
      let ar = [];
      let client = "";
      arr.forEach((element) => {
        this.$store.state.leads.all.forEach((x) => {
          if (x.id === element.task_id) {
            client = x.company != null ? x.company.name : x.contact_person.name;
          }
        });
        ar.push({
          expense_id : element.id,
          id: element.task_id,
          client: client,
          date: element.date,
          description: element.description,
          member:
            element.users.length > 0 ? element.users[element.users.length - 1].name : "",
          expense: element.expense,
          status: "active",
        });
      });
      return ar;
    },
    branches() {
      var data = [];
      for (let index = 0; index < this.$store.state.branches.all.length; index++) {
        data[index] = this.$store.state.branches.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
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
      return this.branches.slice(this.offset, this.limit + this.offset);
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
    outBoundEmails() {
      return this.$store.state.emails.all_outbound_emails;
    },

    proposalItems() {
      let data = this.$store.state.proposals.allProposals;
      data.forEach((x) => {
        if (x.subject.length > 20) {
          x.subject = x.subject.substr(0, 20);
        }
        let amount = 0;
        let paid = 0;
        this.$store.state.invoice.allData.forEach((z) => {
          if (z.proposal_id === x.id) {
            paid =paid + z.amount;
          }
        });
        x.proposal_fees.forEach((y) => {
          amount = y.amount;
        });
        x.amount = amount;
        if (paid > 0) {
          x.status = (paid / amount) * 100;
          x.status = x.status.toFixed(2);
        }
        x.no = `PL-${("0" + x.id).slice(-2)}-${new Date().getFullYear()}`;
      });

      return data;
    },
    invoicesItems() {
      let data = this.$store.state.invoice.allData;
      data.forEach((x) => {
        let amount = 0;
        this.$store.state.recordPayment.allData.forEach((y) => {
          if (y.record_pay_invoice.length > 0) {
            if (x.id === y.record_pay_invoice[0].invoice_id) {
              y.record_pay_invoice.forEach((z) => {
                amount = amount + z.paid_amount;
              });
            }
          }
        });
        
        x.recieved = amount.toFixed(1);
        x.due = (x.total_amt - x.recieved).toFixed(1);
        if(x.client_name){

          x.client_name = x.client.name;
        }
      });
      return data;
      
    },
    invoicesItemsDetails() {
      let data = this.$store.state.invoice.allData;
      data.forEach((x) => {
        let amount = 0;
        this.$store.state.recordPayment.allData.forEach((y) => {
          if (y.record_pay_invoice.length > 0) {
            if (x.id === y.record_pay_invoice[0].invoice_id) {
              y.record_pay_invoice.forEach((z) => {
                amount = amount + z.paid_amount;
              });
            }
          }
        });
        x.recieved = amount;
        x.due = x.amount - x.recieved;
        if(x.client_name){

          x.client_name = x.client.name;
        }
      });
      return data;
    },
    paymentItems() {
      let data = this.$store.state.recordPayment.allData;
      let d1 = this.$store.state.invoice.allData;
      let allTasks = this.$store.state.tasks.all;
      this.payment.payment = [];
      for (let index = 0; index < d1.length; index++) {
        // const element = array[index];
        const taskId = d1[index].task_id;
        const taskIndex = allTasks.findIndex((task) => task.id === taskId);
        const branchId = taskIndex !== -1 ? allTasks[taskIndex].branch_id : null;

        this.payment.payment.push({
          id: index + 1,
          tds: 0,
          amount: 0,
          invoice_id: d1[index].id,
          task_id: d1[index].task_id,
          branch_id: branchId,
        });
        // this.payment.tds.push({id:index+1,amount:0});
      }
      
      data.forEach((x) => {
        x.unused_amount = 0;
        let amount = 0;
        x.record_pay_invoice.forEach((y) => {
          amount = amount + y.paid_amount;
        });
        x.invoice_id = x.invoice.length > 0 ? x.invoice[0].id : null;
        x.amount = amount;
        let client = this.$store.state.clients.all.filter((z) => {
          return z.id === x.client_id;
        });

        x.client_name = client.length > 0 ? client[0].name : null;
        // if (x.amount > x.invoice[0].total_amt) {
        //   x.unused_amount = x.amount - x.invoice[0].total_amt;
        // }
      });
      return data;

      // const data = [
      //   {
      //     client_name: "Ajnara Balvedere Association",
      //     address: "Noida",
      //     amount: 5000,
      //     audits: [{}],
      //     branch_id: 1,
      //     client_id: 1,
      //     created_at: "2023-03-07t07:51:41.000000Z",
      //     deleted_at: null,
      //     id: 1,
      //     invoice: [
      //       {
      //         amount: 5000,
      //         id: 1,
      //         invoice_number: "1",
      //         pivot: {},
      //         total_amt: 5000,
      //       },
      //     ],
      //     notes: null,
      //     pay_date: "2023-03-07",
      //     payment_mode: "Cash",
      //     record_pay_invoice: [
      //       {
      //         created_at: "2023-03-07T07:51:41.000000Z",
      //         deleted_at: null,
      //         id: 1,
      //         invoice_id: "1",
      //         paid_amount: 5000,
      //         record_payment_id: 1,
      //         tds_deducted: 0,
      //         updated_at: "2023-03-07T07:51:41.000000Z",
      //       },
      //     ],
      //     reference_id: null,
      //     task_id: 1,
      //     title: "payment",
      //     updated_at: "2023-03-07T07:51:41.000000Z",
      //   },
      // ];
      // return data;
    },
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
          if (x.name === "Accounts") {
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


        arr.forEach((x) => {
          console.log(x);
          if (x.name === "Estimates & Invoices") {
            if (x.status === "active") {
              data.invoice = true;
              data.expenses = true;
            }
          } else if (x.name === "Record Payment" || x.name === "Payments") {
            if (x.status === "active") {
              data.payment = true;
            }
          } else if (x.name === "Estimates & Invoices Creation and Edit") {
            if (x.status === "active") {
              data.invoice_create_edit = true;
            }
          } else if (x.name === "Payments Add & Edit") {
            if (x.status === "active") {
              data.payment_add_edit = true;
            }
          } else if (x.name === "Payments Delete") {
            if (x.status === "active") {
              data.payment_delete = true;
            }
          }
        });
      }
      console.log(data, "dddddddddd");
      return data;
    },
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading;
      return data;
    },
    showFilesTask() {
      if (this.$store.state.attachments.all.length > 0) {
        let data = this.$store.state.attachments.all;
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          let split = x.attachment.split("/");
          x.name = split[split.length - 1];
          filter.push(x);
          num++;
        });
        this.taskNum = num;
        console.log(filter, "ffffffffffff");
        return filter;
      } else {
        let data = [];
        if (this.$router.currentRoute.name == "tasks") {
          data = this.$store.state.tasks.all.filter((e) => e.type === "task");
        } else {
          data = this.$store.state.leads.all.filter((e) => e.type === "lead");
        }
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          if (x.id === this.taskId) {
            x.attachments.forEach((y) => {
              if (y.type === "task") {
                let split = y.attachment.split("/");
                y.name = split[split.length - 1];
                filter.push(y);
                num++;
              }
            });
          }
        });
        this.taskNum = num;
        console.log(filter, "ffffffffffff");
        return filter;
      }
    },
    showFilesClient() {
      if (this.$store.state.attachments.all.length > 0) {
        let data = this.$store.state.attachments.all;
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          let split = x.attachment.split("/");
          x.name = split[split.length - 1];
          filter.push(x);
          num++;
        });
        this.clientNum = num;
        return filter;
      } else {
        let data = [];
        if (this.$router.currentRoute.name == "tasks") {
          data = this.$store.state.tasks.all.filter((e) => e.type === "task");
        } else {
          data = this.$store.state.leads.all.filter((e) => e.type === "lead");
        }
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          if (x.id === this.taskId) {
            x.attachments.forEach((y) => {
              if (y.type === "company") {
                let split = y.attachment.split("/");
                y.name = split[split.length - 1];
                filter.push(y);
                num++;
              }
            });
          }
        });
        this.clientNum = num;
        console.log(filter.length, "lllllllllllllllll");
        return filter;
      }
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

      return data;
    },
    show_companys() {
      return this.$store.state.clients.all.reverse();
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
    filterLeads(val) {
      return this.items.filter((item) => {
        let keep = true;

        // This is a basic equality filter. What I did in the actual code was to have an object with filter functions for each key. If a key was missing, it defaulted to straight equality.
        this.fieldKeys.forEach((key) => {
          keep =
            keep &&
            (this.selectVal[key] === undefined || item[key] === this.selectVal[key]);
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
      this.todos = this.$store.state.appTodo.all;
      if (this.$router.currentRoute.name == "tasks") {
        return this.$store.state.tasks.isLoadingLeads;
      } else {
        return this.$store.state.leads.isLoadingLeads;
      }
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
      return this.$store.state.leads.all.filter((e) => e.type === "lead").length;
    },
    items() {
      var items = [];
      if (this.$router.currentRoute.name == "tasks") {
        items = this.$store.state.tasks.all.filter((e) => e.type === "task");
      } else {
        items = this.$store.state.leads.all.filter((e) => e.type === "lead");
      }
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

      return element.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      // return element;

      return items;
    },
    companys() {
      // return this.$store.state.clients.all
      var data = [];
      for (let index = 0; index < this.$store.state.clients.all.length; index++) {
        data[index] = this.$store.state.clients.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    paginated_companys() {
      return this.companys.slice(this.offset, this.limit + this.offset);
    },
    companys_hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(this.companys.slice(nextOffset, this.limit + nextOffset).length);
    },
    companys_hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(this.companys.slice(prevOffset, this.limit + prevOffset).length);
    },
    category() {
      // return this.$store.state.categories.all
      var data = [];
      for (let index = 0; index < this.$store.state.categories.all.length; index++) {
        data[index] = this.$store.state.categories.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
  methods: {
    destroyExpense(id,taskId) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("expenses/destroy", id).then(() => {
          // this.$store.dispatch("expenses/get", taskId);
          this.$store.dispatch("expenses/fetch");


        });
      }
    },
    normalSubmitInvoice(){
      this.expandProposal = true;
      this.$refs['InvoiceSectionModal'].hide();
      
    },
    normalSubmit(){
      this.expandProposal = true;
      this.$refs['AccountSectionModal'].hide();
    },
    getAmountForDueFunc(data){
      let amount = 0;
      
      let percent = this.getStatusForInvoiceNumber(data)

      amount = data.sub_total - ((percent/100)*data.sub_total);
      return amount;
    },
    getAmountForProposals(data){
      console.log("this is inside the function", data)
      let amount = 0;

      let percent = data.status;
      console.log("this is percent", percent);
      amount = data.proposal_fees[0].amount - ((percent/100)*data.proposal_fees[0].amount);
      console.log("this is after the amount",amount);
      // alert(amount);
      return amount;    
    },
    statusCal(id, type) {
      let filtered = []; //.filter(e => e.type === 'task').concat(this.$store.state.leads.all.filter(e => e.type === 'lead'));
      this.$store.state.leads.all.forEach((element) => {
        element.users.forEach((x) => {
          if (x.id === id) {
            filtered.push(element);
          }
        });
      });
      let open = 0;
      let completed = 0;
      let closed = 0;
      let invoiced = 0;
      if (type === "open") {
        open = filtered.filter((e) => e.status_master.type === type).length;
      } else if (type === "completed") {
        completed = filtered.filter((e) => e.status_master.type === type).length;
      } else if (type === "closed") {
        closed = filtered.filter((e) => e.status_master.type === type).length;
      } else if (type === "invoiced") {
        invoiced = filtered.filter((e) => e.status_master.type === type).length;
      }
      // filtered.forEach(x => {
      //   console.log(x.status_master.type, 'hhhhhhhhhhh');
      //   if(x.status_master.type==='open') {
      //     open=open+1;
      //   }
      //   else if(x.status_master.type==='closed') {
      //     closed=closed+1;
      //   }
      //   else if(x.status_master.type==='completed') {
      //     completed=completed+1;
      //   }
      //   else if(x.status_master.type==='invoiced') {
      //     invoiced=invoiced+1;
      //   }
      // })
      // console.log(open, closed, completed, invoiced);
      if (type === "open") {
        return {
          open: open,
        };
      } else if (type === "completed") {
        return {
          completed: completed,
        };
      } else if (type === "closed") {
        return {
          closed: closed,
        };
      } else if (type === "invoiced") {
        return {
          invoiced: invoiced,
        };
      }
    },
    resetReplyModal() {
      console.log("Reply modallllllllllllllllllllllllllllllllllllllllll");
      this.$store.state.tasks.s3_url = [];
      this.file_name2 = [];
      console.log(this.$store.state.tasks.s3_url);
    },
    autofillClientName() {
      this.invoice.client = this.show_companys[0];
    },
    onRowClickedExpense(item) {
      const { detailsRow } = this;
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, "_showDetails", !item._showDetails);
      this.currentPageExpensesTable = item._showDetails
        ? this.currentPageExpensesTable
        : 1;
      this.taskId = item.id;
    },
    resetFormInvoice() {
      this.invoiceFormData = {
        client: null,
        branch: null,
        task: null,
      };

    },resetFormInvoiceExpand() {
      this.invoiceFormData = {
        client: null,
        branch: null,
        task: null,
      };
      

    },

    resetFormProposals() {
      this.proposalFormData = {
        concernedPersonName:null,

        client: null,
        branch: null,
        task:null
      };
      
      this.amountField.forEach((e)=>{
        e.amount =null,
        e.description = ""
      })
      this.amountField.splice(1);
      this.pnotes =""
    },

    resetPaymentSectionModalDetails() {
      console.log("inside the reset ");
      this.payment.payment.map((item) => (item.amount = 0));
      this.payment.amount = null;
      this.payment.client = null;
      this.payment.mode = null;
      this.payment.branch = null;
    },
    fun(index) {
      return this.paymentTotalArray[index];
    },
    editTds(index) {
      const updated = this.paymentTotalArray;
      this.paymentTotalArray[index] = 0;
      this.paymentTotalArray[index] = updated[index];
    },
    prefillInvoice() {
      this.invoiceFormData.client = this.invoiceFormData.task.company.name;
      this.invoiceFormData.branch = this.invoiceFormData.task.branch.name;
    },

    prefillProposal() {
      this.proposalFormData.concernedPersonName=this.proposalFormData.task.contact_person.name
      this.proposalFormData.client = this.proposalFormData.task.company;
      if(this.proposalFormData.client != null){

        this.proposalFormData.clientName = this.proposalFormData.client.name 
      }
      this.proposalFormData.branch = this.proposalFormData.task.branch.name;
    },

    checkGreaterAmount(index) {
      console.log("calling............ ", this.getTotalAmtPayment, this.payment.amount);

      if (this.getTotalAmtPayment > this.payment.amount) {
        let totalAmountTemp = this.getTotalAmtPayment;
        console.log("call cancel", this.paymentTotalArray[index], totalAmountTemp);
        totalAmountTemp = totalAmountTemp - this.paymentTotalArray[index];
        console.log("call cancel", totalAmountTemp);

        this.paymentTotalArray[index] = this.payment.amount - totalAmountTemp;
        console.log("paymentTotalarray", this.paymentTotalArray[index], totalAmountTemp);
      }
    },
    excessPaymentAmount() {
      return this.payment.amount - this.getTotalAmtPayment - this.getTotalTdsAmt;
    },
    putValuePaymentTotalArray() {
      // pending////
      
      this.currentPagePaymentTableModel = 1;
      console.log("calling............ ");
      let allTasks = this.$store.state.tasks.all;

      this.paymentInvoiceArray = this.filteredInvoiceClient.map((item) => {
        this.findInvoice = this.getStatusForInvoiceNumber(item.id);
        console.log("this is percent", this.findInvoice);

        const taskId = item.task_id;
        const taskIndex = allTasks.findIndex((task) => task.id === taskId);
        const branchId = taskIndex !== -1 ? allTasks[taskIndex].branch_id : null;
        let tdsDeducted = 0;
        if (item.tds_deducted) {
          tdsDeducted = item.tds_deducted;
        }
        this.paymentInvoice = {
          invoice_id: item.id,
          task_id: item.task_id,
          paid_amount: this.payment.amount,
          status: this.findInvoice,
          branch_id: branchId,
          tds_deducted: tdsDeducted,
        };

        return this.paymentInvoice;
      });
      this.filteredInvoiceClient = this.filteredInvoiceClient.filter((clientInvoice) => {
        const paymentIndex = this.paymentInvoiceArray.findIndex(
          (paymentInvoice) => paymentInvoice.invoice_id === clientInvoice.id
        );
        if (paymentIndex !== -1 && this.paymentInvoiceArray[paymentIndex].status < 100) {
          return true;
        }
        return false;
      });
      const invoiceUnder100 = this.filtered;
      this.payment.payment.map((item) => {
        return (item.amount = 0);
      });
      this.paymentTotalArray = this.filteredInvoiceClient.map((item) => {
        return 0;
      });
      this.greaterAmount = this.paymentTotalArray.map((item) => {
        return false;
      });
      this.tds_deductedArray = this.filteredInvoiceClient.map((item) => {
        return 0;
      });
      // this.paymentTotalArray[1] = 100;
      // this.paymentTotalAmount = 100;
      console.log(this.paymentTotalArray);
      
    },

    file_upload() {
      console.log("hloo2:file_upload");
      document.getElementById("fileUpload2").click();
      //  this.uploadFileS3(this.file_name2)
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // var base = reader.readAsDataURL(image)
      // console.log(base);
      // console.log(e);
    },
    async onFileChange2(e) {

      let image = e.target.files;
      let image_name = [];
      const filePathsPromises = [];
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file));
        image_name.push(file.name);
      });
      const filePaths = await Promise.all(filePathsPromises, image_name);
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
      }));
      let tempFile = mappedFiles;
      let readyUpload = [];
      tempFile.forEach((obj2) => {
        const exists = this.file_name2.some((obj1) => obj1.name === obj2.name);
        if (!exists) {
          console.log("not duplicate");
          this.file_name2.push(obj2);
          readyUpload.push(obj2);
        }
      });
      
      console.log(mappedFiles);
      this.uploadFileS3(readyUpload);
      
    },
    base64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
      
    },
    removeFileS3(url, index) {
      console.log("url of attachment", url);
      var data = {
        attach_url: url ?? "null",
      };
      this.$store.state.tasks.s3_url.splice(index, 1);
      this.$store
        .dispatch("tasks/remove_file_s3", { data: data })
        .then(() => {
          
        })
        .catch(() => {
          console.log("error");
        });
        this.file_name2.splice(index, 1);

    },
    uploadFileS3(file) {
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

    sendEmail(data2, file_name2) {
      data2.subject = this.$store.state.leads.all.filter(
        (e) => e.id === this.taskId
      )[0].subject;
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
          subject: data2.subject
            ? data2.subject
            : this.$store.state.leads.all.filter((e) => e.id === this.taskId)[0].subject,
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
          subject: data2.subject
            ? data2.subject
            : this.$store.state.leads.all.filter((e) => e.id === this.taskId)[0].subject,
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
      this.$store
        .dispatch("emails/sendEmail", { data })
        .then(() => {
          // console.log(res);
          if (this.successMessage) {
            this.$toast.success("Email Sent Succesfully!", {
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
          // this.s3_url=[];
          while (this.file_name2.length > 0) {
            this.file_name2.pop();
          }

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
        })
        .then(() => {
          this.$store.state.tasks.s3_url = [];
        });
    },
    handleSubmitCreatePayment() {
      if (this.payment.amount < this.getTotalAmt(this.payment.payment)  ) {
        this.$swal("Payment Amount Can't be less than Total", "", "error");
        return;
      }

      if (this.filteredInvoiceClientLessThan100.length === 0) {
        this.$swal("There are no Invoices!!", "", "error");
        return;
      }
      if (this.payment.amount === 0) {
        this.$swal("Payment amount can not be 0", "", "error");
        return;
      }

      var invoice_tds = [];
      // for (let index = 0; index < this.payment.payment.length; index++) {
      //   // const element = array[index];
      //   if (this.payment.payment[index].amount != 0) {
      //     invoice_tds.push({
      //       invoice_id: this.payment.payment[index].invoice_id,
      //       tds_deducted: this.payment.payment[index].tds,
      //       paid_amount: this.payment.payment[index].amount,
      //     });
      //   }
      // }
      console.log(invoice_tds);

      var branch_id = 0;
      this.$store.state.branches.all.forEach((element) => {
        if (element.name == this.payment.branch) {
          branch_id = element.id;
        }
      });
      let paymentArray = this.paymentInvoiceArray.filter((i) => {
        return i.paid_amount > 0;
      });
      const data = {
        // task_id: this.taskId,
        client_id: this.payment.client.id,
        // branch_id: branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: paymentArray,
      };
      console.log(data);
      this.$store.dispatch("recordPayment/storeMultiple", data).then(() => {
        this.$refs["PaymentSectionModal"].hide();
        this.$store.dispatch("recordPayment/fetch");
        this.$toast.success('Payment added Successfully!', {
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

    handleSubmitCreateInvoice() {
      // const invoicesAllData = this.$store.state.invoice.allData;
      // this.lastInvoiceId = invoicesAllData[invoicesAllData.length - 1].id;
      console.log(this.invoiceFormData, "invoice form data");
      const currentDate = new Date().toISOString().slice(0, 10);
      // proposalForInvoice[0].task_id;
      //proposalForInvoice.[proposalForInvoice.length-1]
      let proposalForInvoice = this.$store.state.proposals.allProposals;
      const filteredProposalForInvoice = proposalForInvoice.filter((proposal) => {
        return proposal.task_id === this.invoiceFormData.task.id;
      });
      proposalForInvoice = filteredProposalForInvoice;
      console.log("this is proposalForInvoice", proposalForInvoice);
      let proposalFind = proposalForInvoice[proposalForInvoice.length - 1];

      console.log(proposalFind, "finding");
      const data = {
        proposal_id: proposalFind.id,
        client_id: this.invoiceFormData.task.company.id,
        task_id: this.invoiceFormData.task.id,
        client_gst_number: this.invoice.gstNumber,
        state_code: this.invoice.state,
        invoice_number: this.prefixPlusid,
        invoice_date: this.invoice.pdate,
        due_date: currentDate,
        billing_address: this.invoiceFormData.branch,
        notes: this.invoice.notes,
        item_details: this.invoice.item_details,
        amount: this.invoice.amount,
        discount: this.invoice.discount,
        taxable_amt:this.invoice.taxble_amt,
        igst: this.invoice.igst,
        igst_amt: this.invoice.igst_amt,
        sgst: this.invoice.sgst,
        sgst_amt: this.invoice.sgst_amt,
        cgst: this.invoice.cgst,
        cgst_amt: this.invoice.cgst_amt,
        utgst: this.invoice.utgst,
        utgst_amt: this.invoice.utgst_amt,
        sub_total: this.invoice.sub_total,
        pocket_expenses: this.invoice.pocket_expense,
        expenses_details: this.invoice.expense_details,
        adjustment_amt: this.invoice.adjustments,
        total_amt: this.invoice.total,
      };
      this.$store.dispatch("invoice/store", data).then(() => {
        this.$refs["InvoiceSectionModal2"].hide();
        this.$refs["InvoiceSectionModal"].hide();
        this.$store.dispatch("invoice/fetch");
        this.$toast.success('Invoice created Successfully!', {
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
        this.resetFormInvoice();
        this.resetFormInvoiceExpand();
        
        
      });
    },

    handleSubmitCreateProposal() {
      console.log(this.proposalFormData, "proposal form data");
      // let totalAmount = 0;
      // this.amountField.forEach((e)=>{
      //   console.log("adding this ", e.amount);
      //   totalAmount = totalAmount + e.amount;
      // })
      const data = {
        company_id:this.proposalFormData.client.id,
        task_id: this.proposalFormData.task.id,
        proposal_date: this.proposalFormData.task.due_date,
        client_name: this.proposalFormData.client.name,
        // client_name: this.proposalFormData.client.name,
        company_id: this.proposalFormData.client.id,
        concerned_person: this.proposalFormData.task.contact_person.name,
        address: this.proposalFormData.task.branch.name,
        subject: this.proposalFormData.task.subject,
        prephase: this.pphrase,
        footer_title: this.pfootertitle,
        // footer_description: this.proposalFormData.task.description,
        footer_description: this.pfooterdesc
          ? this.pfooterdesc
          : "",
        internal_notes: this.pnotes?this.pnotes:"",
        proposalSection: [],
        proposalFees: [
          {
            description: this.proposalFormData.task.subject,
            amount: this.totalAmount,
          },
        ],
      };
      this.$store.dispatch("proposals/create", data).then(() => {
        
        this.$refs["AccountSectionModal2"].hide();
        this.$refs["AccountSectionModal"].hide();
        this.$store.dispatch("proposals/getAll");
        this.$toast.success('Proposal added Successfully!', {
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
        this.resetFormProposals();
        
      });
    },
    onTaskSelect(task) {
      this.selectedTask = task;
    },

    showitem(i) {
      console.log(i, "show item");
    },
    onTabChange(tab) {
      console.log(this.active, "this is active tab");
      if (this.activeTab == 2) {
        //modal
        this.showPaymentModal = true;
        this.showInvoicesModal = false;
        this.showProposalModal = false;
        this.showExpensesModal = false;

        // filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      } else if (this.activeTab === 1) {
        this.showExpensesModal = false;

        //modal
        this.showInvoicesModal = true;
        this.showPaymentModal = false;
        this.showProposalModal = false;

        //filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      } else if (this.activeTab === 3) {
        this.showProposalModal = false;
        this.showInvoicesModal = false;
        this.showPaymentModal = false;
        this.showExpensesModal = true;

        //filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      } else if (this.activeTab === 0) {
        this.showExpensesModal = false;

        //modal
        this.showProposalModal = true;
        this.showInvoicesModal = false;
        this.showPaymentModal = false;

        //filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      }
    },
    showCreateProposalModal() {
      this.CreateProposalModal = true;
    },
    showCreatePaymentModal() {
      this.payment.mode = this.payment_modes[0];
      this.CreatePaymentModal = true;
    },
    showCreateInvoicesModal() {
      this.CreateInvoicesModal = true;
    },
    showFilterInvoicesModal() {
      this.filterInvoicesModal = !this.filterInvoicesModal;
      this.filterProposalModal = false;
      this.filterPaymentModal = false;
    },
    showFilterPaymentModal() {
      this.filterPaymentModal = !this.filterPaymentModal;
      this.filterInvoicesModal = false;
      this.filterProposalModal = false;
    },
    showFilterProposalModal() {
      this.filterProposalModal = !this.filterProposalModal;
      this.filterPaymentModal = false;
      this.filterInvoicesModal = false;
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
      let data = {
        attachment: [],
        type: type,
        company_id: c_id,
        task_id: id,
      };
      links.forEach((x) => {
        data.attachment.push({
          attachment_url: x.url,
        });
      });
      console.log(data);
      this.dropTask = false;
      this.dropClient = false;
      this.$store.dispatch("attachments/store", data).then(() => {
        this.file_name = [];
        this.$store.state.attachments.links = [];
        console.log(data);
      });
    },
    removes3(file, i) {
      console.log("bbbb");
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(i, 1);
        this.file_name.splice(i, 1);
      });
    },
    // uploadFile(e) {
    //   console.log(e.target.files);
    //   let image = e.target.files;
    //   console.log("e:", e);
    //   console.log("inside onload before2:", this.file_name2);
    //   image.forEach((x) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       let data = {
    //         file: e.target.result,
    //         name: x.name,
    //       };
    //       console.log("data:", data);
    //       console.log("inside onload before:", this.file_name2);
    //       this.file_name.push(data);
    //       console.log("inside onload:", this.file_name2);
    //       console.log("inside onload:", this.file_name2.length);
    //       this.uploadFileS3(this.file_name2);
    //     };
    //     reader.readAsDataURL(x);
    //   });
    // },
    // uploadFileS3(file) {
    //   let data = {
    //     attach: file ? file : "null",
    //   };
    //   this.$store
    //     .dispatch("attachments/add", { data: data })
    //     .then(() => {
    //       resolve();
    //     })
    //     .catch(() => { });
    // },
    clientAttachmentDropdown(e) {
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
      if (ev.target != this.$refs.taskDrop && !this.$refs.taskDrop.contains(ev.target)) {
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
      var tasks = this.$store.state.tasks.all.filter((e) => e.type === "task");
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead");
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

      this.composeData.from = this.outBoundEmails[0];
      var tasks = this.$store.state.tasks.all.filter((e) => e.type === "task");
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead");
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
        if (details != null) {
          if (details.mailbox != null) {
            if (
              element == details.mailbox.from_email &&
              details.mailbox.folder == "INBOX"
            ) {
              this.composeData.to.push(element);
            }
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
          this.$store.state.leads.all
            .filter((e) => e.type === "lead")
            .filter((e) => e.id === this.taskId)[0].contact_person.name +
          ", Greeting from " +
          JSON.parse(localStorage.getItem("userData")).tenant.id +
          "</p><br><br>";
      } else {
        header =
          header +
          '<p style="margin-left:2rem;">Hi ' +
          this.$store.state.tasks.all
            .filter((e) => e.type === "task")
            .filter((e) => e.id === this.taskId)[0].contact_person.name +
          ", Greeting from " +
          JSON.parse(localStorage.getItem("userData")).tenant.id +
          "</p><br><br>";
      }
      if (signAll.length > 0) {
        this.composeData.message = header + signAll[0].signature;

        return signAll[0].signature || "";
      }
    },
    getStatusColor(percent) {
      if (Number(percent.split("%")[0]) >= 100) {
        return "success";
      } else {
        return "danger";
      }
    },
    getStatusColorNumber(percent) {
      if (percent > 0) {
        return "success";
      } else {
        return "danger";
      }
    },
    getStatusForInvoice(data) {
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
        return percent.toFixed(2) + "% paid";
      } else {
        return 0 + "% paid";
      }
    },
    getStatusForInvoiceNumber(id) {
      var percent = 0;
      var total = 0;
      var state = false;
      var status = 0;
      // console.log(this.paymentItems);
      this.paymentItems.forEach((element) => {
        element.record_pay_invoice.forEach((e) => {
          if (e.invoice_id === id) {
            // total = element
            state = true;
            status = status + e.paid_amount;
          }
        });
        // console.log("outer if else");
        element.invoice.forEach((i) => {
          if (i.id === id) {
            // console.log("inside if else ", i.id, id);
            total = i.total_amt;
          }
        });
      });
      percent = (status / total) * 100;
      // console.log(percent);
      if (state) {
        return percent.toFixed(2);
      } else {
        return 0;
      }
    },
    getStatusForInvoiceNumber3(data) {
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
    getStatusForInvoiceNumber2(id) {
      var percent = 0;
      var total = 0;
      var state = false;
      var status = 0;
      // console.log(this.paymentItems);
      this.paymentItems.forEach((element) => {
        element.record_pay_invoice.forEach((e) => {
          if (e.invoice_id === id) {
            // total = element
            state = true;
            status = status + e.paid_amount;
          }
        });
        element.invoice.forEach((i) => {
          if (i.id === id) {
            total = i.total_amt;
          }
        });
      });
      percent = (status / total) * 100;
      // console.log(percent);
      if (state) {
        return percent.toFixed(2);
      }
    },
    getStatusForProposal(data) {
      console.log(data,"kkkkkkkkkkkkkkkkk");
     
      
      var total = 0;
      var final=0;
      this.$store.state.invoice.allData.forEach((element)=>{
        // alert('hello')
        element.proposal.forEach(e => {
          
          if(e.proposal_id===data.id){
                // e.proposal_fees.forEach(cb => {
                  // alert(e.amount)
                total=total+e.amount
                // if()
                final=element.amount
              // });
              }
              this.amountToDisplay=final-total
        });
      //   if(element.proposal.length === 1)
      //   {

        
       
      // }else{
      //   element.proposal.forEach(e => {
          
      //     if(e.proposal_id===data.id){
      //           // e.proposal_fees.forEach(cb => {
      //             // alert(e.amount)
      //           total=total+e.amount
      //           // if()
      //           final=final+element.amount
      //         // });
      //         }
      //         this.amountToDisplay=final-total
      //   });
      // }
    
      })
      // let amt = final - total

      return final//amt


     
    },
    getStatusForProposalNumber(data) {
      var percent = 0;
      var total = 0;
      var status = 0;
      var state = false;
      this.$store.state.invoice.allData.forEach((element) => {
        element.proposal.forEach((e) => {
          if (e.proposal_id === Number(data.id)) {
            state = true;
            total = element.amount;
            status = status + e.amount;
          }
        });
      });
      percent = (total / status) * 100;

      if (state) {
        console.log(percent.toFixed(1));
        return percent.toFixed(1);
      }
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
      var invoice_tds = [];
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        if (this.payment.payment[index].amount != 0) {
          invoice_tds.push({
            invoice_id: this.payment.payment[index].invoice_id,
            tds_deducted: this.payment.payment[index].tds,
            paid_amount: this.payment.payment[index].amount,
          });
        }
      }
      let taskObj = this.$store.state.tasks.all.find((i)=>{
        if(i.id === this.taskId){
          return i;
        }
      })
      // var branch_id = 0;
      // this.$store.state.branches.all.forEach((element) => {
      //   if (element.name == this.payment.branch) {
      //     branch_id = element.id;
      //   }
      // });
      const data = {
        task_id: this.taskId,
        client_id: this.payment.client.id,
        branch_id: taskObj.branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: invoice_tds,
      };
      console.log(data);
      this.$store.dispatch("recordPayment/store", data).then(() => {
        this.$store.dispatch("recordPayment/fetch", this.taskId);
        this.$refs["payment-modal2"].hide();
        this.$toast.success('Payment added Successfully!', {
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
    getExcess() {
      // if(this.payment.amount > Number(this.getTotalAmt(this.payment.payment) ))// ?  payment.amount - Number(getTotalAmt(this.payment.payment) )  : 0}}
      //             {
      //               return this.payment.amount - Number(this.getTotalAmt(this.payment.payment) )
      //             }else
      // if(this.payment.amount < Number(this.getTotalAmt(this.payment.payment) ))
      // if(this.payment.amount != 0)

      // {
      return this.payment.amount - Number(this.getTotalAmt(this.payment.payment));

      // }else{
      //   return 0
      // }
    },
    // addPayment(){

    setPayment(index, e) {
      console.log([index, e]);
      // let tempTotalAmount = getTotalAmt(this.payment.payment);
      // console.log("before update ", this.getTotalAmt(this.payment.payment));
      this.payment.payment.forEach((element) => {
        if (element.invoice_id == index) {
          element.amount = Number(e);

          if (this.getTotalAmt(this.payment.payment) > this.payment.amount) {
            element.amount = Number(0);
          }
        }
        this.$forceUpdate();
      });
      // console.log(this.payment, "this is this.payment");
      // this.payment.payment[index].amount = Number(e)
      this.paymentInvoiceArray.forEach((i) => {
        if (i.invoice_id == index) {
          i.paid_amount = Number(e);
        }
      });
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
      this.paymentInvoiceArray.forEach((i) => {
        if (i.invoice_id == index) {
          i.tds_deducted = Number(e);
          if (i.tds_deducted != 0) {
            i.paid_amount = i.paid_amount - i.tds_deducted;
          }
        }
      });
      // this.payment.payment[index].tds = Number(e)
      // this.payment.payment[index].amount = this.payment.payment[index].amount - this.payment.payment[index].tds
    },
    // },
    getinvoiceBranch(task_id) {
      console.log(task_id, "taskid from branch");
      var task = [];
      var name = "";
      // combine task and lead
      let arr = this.$store.state.leads.all;
      arr = arr.concat(this.$store.state.tasks.all);
      // if (this.$router.currentRoute.name == "tasks") {
      //   task = this.$store.state.tasks.all;
      // } else {
      //   task = this.$store.state.leads.all;
      // }
      task = arr;
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
        this.invoice.id = Math.max(...array) + 1;
        // let prefix = invoice.filter(e => e.id = this.invoice.id).invoice_number
        // this.invoice.id = prefix+'/'+this.invoice.id
        // return Math.max(...array) + 1
        let prefix = invoice.filter((e) => (e.id = this.invoice.id))[0].invoice_number;
        this.invoice.id = prefix + "/" + this.invoice.id;
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
        let newText = this.text.substring(0, 400);
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
      console.log(this.invoice, "this is add invoice from accounts");
      const data = {
        id: Number(this.invoice.id),
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
          this.$toast.success("Updated Successfully!", {
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
        (Number(this.invoice.taxble_amt ?? 0) / 100) * Number(this.invoice.igst ?? 0);
      this.invoice.sgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) * Number(this.invoice.sgst ?? 0);
      this.invoice.cgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) * Number(this.invoice.cgst ?? 0);
      this.invoice.utgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) * Number(this.invoice.utgst ?? 0);

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
          this.$store.dispatch("proposals/getAll");
        });
      }
    },
    destroyInvoice(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("invoice/destroy", id).then(() => {
          this.$store.dispatch("invoice/fetch");
        });
      }
    },
    destroyPayment(id) {
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
        username = username + ", " + this.timeFormat(comments[latest_index].created_at);
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
      console.log(data, "this is data edit ");
      this.$store
        .dispatch("proposals/proposal_update", {
          payload: data,
          id: this.proposal_edit_id,
        })
        .then(() => {
          this.$refs["proposal-edit-modal"].hide();
          this.$store.dispatch("proposals/getAll").then(() => {});
          console.log(this.proposals.map((e) => e.total));
        });
    },
    // onRowClickedProposal(i) {
    //   const { detailsRowProposal } = this;
    //   if (detailsRowProposal && detailsRowProposal !== i) {
    //     detailsRowProposal._showDetails = false;
    //   }

    //   this.$set(i, "_showDetails", !i._showDetails);
    //   console.log(i);
    //   if (i.title == "invoice") {
    //     this.invoice.editId = i.id;
    //   } else if (i.title == "payment") {
    //     this.payment.edit_id = i.id;
    //   } else {
    //     this.proposal_edit_id = i.id;
    //     this.taskId = i;
    //   }
    //   this.detailsRowProposal = i;
    // },
    onRowClicked(item) {
      console.log("on row clicked", item);
      const { detailsRow } = this;
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, "_showDetails", !item._showDetails);
      this.detailsRow = item;
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
      this.$store.dispatch("comments/getMailComment", item.id).then(() => {});
      this.$store.dispatch("invoice/get", item.id).then(() => {
        // console.log(this.allProposals)
      });
      this.$store.dispatch("recordPayment/get", item.id);

      if (item.description) {
        this.text = item.description.replace(/(<([^>]+)>)/gi, "");
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
      this.subtask_mentions.push({ id: item.id, name: item.name });
      console.log(item, `has been replaced with ${replacedWith}`);
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
      this.proposalFormData.clientName = this.proposalFormData.client.name;

      var data = [];
      for (let index = 0; index < this.$store.state.clients.all.length; index++) {
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
        // this.proposalFormData.clientName = filtered[0].replace(/['"]+/g, "");

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
        // filtered = data.filter((data) => data === this.pcontact.name);
        filtered = data.filter((data) => data === this.proposalFormData.task.contact_person.name);
      }
      if (filtered.length > 0) {
        // this.pperson = filtered[0].replace(/['"]+/g, "");
        this.proposalFormData.concernedPersonName = filtered[0].replace(/['"]+/g, "");
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

    inline_due_date(due_date, task_id) {
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
                rtl: false,
              });
            }
          });
        } else {
          this.$store.dispatch("tasks/inline_update", { date }).then(() => {
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
                rtl: false,
              });
            }
          });
        }
      }

      this.startDate2 = "";
    },
    inline_user_update(user_id, task_id) {
      var t = "info";

      var user_data = {
        user_id: user_id,
        task_id: task_id,
      };
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { user_data }).then(() => {
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
              rtl: false,
            });
          }
        });
      } else {
        this.$store.dispatch("tasks/inline_update", { user_data }).then(() => {
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
              rtl: false,
            });
          }
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
            rtl: false,
          });
          // }
        });
      } else {
        this.$store.dispatch("tasks/inline_update", { data }).then(() => {
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
      this.filterUsers = "";
      this.filtercompany = "";
      this.FilterPriority = "";
      this.filterBranch = "";
      this.fetchAll();
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
      console.log(this.filterStatus);
      if (this.$router.currentRoute.name == "leads") {
        this.$store
          .dispatch("leads/filter", {
            status: this.filterStatus,
            branch: this.filterBranch,
            company: this.filtercompany,
            category: this.filterCategory,
            search: this.filterSearch,
            priority: this.FilterPriority,
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
      console.log(this.$router.currentRoute.params.status);
      if (this.$router.currentRoute.params.status) {
        if (this.$router.currentRoute.name == "tasks") {
          this.$store.dispatch("tasks/get", this.$router.currentRoute.params.lead_id);
        } else {
          this.$store.dispatch("leads/get", this.$router.currentRoute.params.lead_id);
        }
      }
      if (!this.$router.currentRoute.params.status) {
        if (this.$router.currentRoute.name == "tasks") {
          this.$store.dispatch("tasks/fetch");
        } else {
          this.$store.dispatch("leads/fetch");
        }
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
      return `${dates.getDate()} ${ms[dates.getMonth()]} ${dates.getFullYear()}`;
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end;
      const diffInMs = new Date(endDate) - new Date();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      diffInDays = Math.round(diffInDays);
      // eslint-disable-next-line no-bitwise
      return diffInDays | 0;
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
      if (status == "active" || status=='100.00') {
        return "success";
      } else if (status == "completed" || status=="Not invoiced" || status=='0') {
        return "primary";
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

    onRowClickedProposal(i) {
      console.log("on row clicked proposal", i);
      const { detailsRowProposal } = this;
      if (detailsRowProposal && detailsRowProposal !== i) {
        detailsRowProposal._showDetails = false;
      }
      this.$set(i, "_showDetails", !i._showDetails);
      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      
      console.log( "tis is proposal ",i);
      // if (i.title == 'invoice') {

      //   this.invoice.editId = i.id
      // } else if (i.title == 'payment') {
      //   this.payment.edit_id = i.id
      // }
      // else {
      //   this.proposal_edit_id = i.id
      // }
      this.composeData.subject = i.subject;
      this.proposal_edit_id = i.id;
      if (i.subject.includes("Re:")) {
        this.replySubject = i.subject;
      }
      if (!i.subject.includes("Re:")) {
        this.replySubject = "re: " + i.subject;
      }
      this.taskId = i.task_id;
      this.detailsRowProposal = i;
      this.invoice.amount = i.amount;
    }
    },
    onRowClickedPaymentItem(i) {
      console.log("on row clicked payment item", i);
      const { detailsRowPayments } = this;

      // Close the previously opened row item, if there is one
      if (detailsRowPayments && detailsRowPayments !== i) {
        detailsRowPayments._showDetails = false;
      }

      // Open or close the current row item
      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      
      this.$set(i, "_showDetails", !i._showDetails);
      console.log(i);

      // Update the data for the Compose component and the proposal_edit_id
      this.composeData.subject = i.subject;
      this.proposal_edit_id = i.id;
      // if (i.subject.includes("Re:")) {
      //   this.replySubject = i.subject;
      // }
      // if (!i.subject.includes("Re:")) {
      //   this.replySubject = "re: " + i.subject;
      // }
      this.taskId = i.task_id;

      // Update the detailsRowPayments property to keep track of the currently opened row item
      this.detailsRowPayments = i;

      // Reset the current page if the row item was closed
      this.currentPagePaymentTable = i._showDetails ? this.currentPagePaymentTable : 1;
      }
    },

    // onRowClickedInvoices(item) {
    //   console.log(item, "this is item");
    //   const { detailsRowInvoices } = this;
    //   if (detailsRowInvoices && detailsRowInvoices !== item) {
    //     detailsRowInvoices._showDetails = false;
    //   }

    //   this.$set(item, "_showDetails", !item._showDetails);
    //   console.log(item, "this is item");
    //   // if (i.title == 'invoice') {

    //   //   this.invoice.editId = i.id
    //   // } else if (i.title == 'payment') {
    //   //   this.payment.edit_id = i.id
    //   // }
    //   // else {
    //   //   this.proposal_edit_id = i.id
    //   // }
    //   this.taskId = item.
    //   this.detailsRowInvoices = item;
    //   this.composeData.subject = item.subject;
    // },
    getPaymentAmt() {
      var amount = 0;
      this.paymentItems.forEach((element) => {
        amount = amount + element.amount;
      });
      return amount;
    },
    getTotal(data) {
      var amount = 0;
      this.proposalItems.forEach((element) => {
        amount = amount + element.amount;
      });
      return amount;
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
    getTdsForPayment(invoice_id, record_pay_invoice) {
      var tds = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          tds = element.tds_deducted;
        }
      });
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
    // onRowClickedProposal(item) {
    //   const { detailsRowProposal } = this;
    //   if (detailsRowProposal && detailsRowProposal !== item) {
    //     detailsRowProposal._showDetails = false;

    //   }
    //   this.taskId = item;
    //   this.$set(item, "_showDetails", !item._showDetails);
    //   this.detailsRowProposal = item;
    // },
    onRowClickedInvoices(i) {
      console.log("this is invoicesssssssssssssss ", i);
      const { detailsRowInvoices } = this;
      if (detailsRowInvoices && detailsRowInvoices !== i) {
        detailsRowInvoices._showDetails = false;
      }

      this.$set(i, "_showDetails", !i._showDetails);
      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      
      this.detailsRowInvoices = i;
      this.taskId = i.task_id;
      this.invoice.editId = i.id;
      this.currentInvoice = i;
      this.payment.client = i.client
      this.payment.amount = i.total_amt
      }
      // this.composeData.subject = i.subject;
    },
    onRowClickedPayments(item) {
      const { detailsRowPayments } = this;
      if (detailsRowPayments && detailsRowPayments !== item) {
        detailsRowPayments._showDetails = false;
      }

      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      }
      this.$set(item, "_showDetails", !item._showDetails);
      this.detailsRowPayments = item;
    },
    fetchingDescription() {},
  },

  created() {
    
    this.$store.dispatch("expenses/fetch");
    if (this.$store.state.branches.all.length === 0) {
      this.$store.dispatch("branches/fetch");
      this.$store.dispatch("branches/states");
    }
    if (this.outBoundEmails.length === 0) {
      this.$store.dispatch("emails/fetch_all_out_mails");
    }
    // this.$store.dispatch("emails/fetch_all_out_mails");
    this.$store.dispatch("contactPeople/fetch");
    this.$store.dispatch('contactPeople/fetchForLeads')
    this.$store.dispatch("proposals/getAll");
    this.$store.dispatch("invoice/fetch");

    this.$store.dispatch(`recordPayment/fetch`);
    if (this.$store.state.clients.all.length === 0) {
      this.$store.dispatch(`clients/fetch`);
    }
    if (this.$store.state.users.all.length === 0) {
      this.$store.dispatch(`users/fetch`);
    }
    // if(this.$store.state.)

    this.$store.dispatch("tasks/fetch");
    if (this.$store.state.expenses.all.length === 0) {
      this.$store.dispatch("expenses/fetch");
    }
    this.payment.amount = null;
  },
};
</script>

<style>
.v-select-placeholder {
  color: #999;
}
.my-custom-select ::placeholder {
  font-size: 1rem;
  color: rgba(128, 128, 128, 0.8) !important;
/* color: rgb(85, 81, 81)!important; */

}
.alert {
  margin: 0 !important;
  padding: 0 !important;
  background: none !important;
}
.no-padding {
  padding: 0 0 0 5px !important;
}

.no-padding-header2 {
  padding: 10px 0 !important;
}
.hideOverFlowItemCss {
  white-space: nowrap; /* Prevent line breaks within the element */
  overflow: hidden; /* Hide the overflow */
  text-overflow: ellipsis; /* Display an ellipsis (...) to indicate truncated text */
  max-width: 140px;
}

.hideOverFlowItemCss2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 150px;
}
.noPadding {
  padding-right: 0 !important;
}

.extra-space-td {
  padding: 0 20px !important;
}

.extra-space-td2 {
  padding: 15px 50px 10px 50px !important;
}

.no-padding-header {
  padding: 10px 10 10px 10px !important;
}

.extra-space-header {
  padding: 0 60px !important;
  padding-top: 10px !important;
}

.truncate-description {
  max-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-option {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: black;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}

.custom-option:hover {
  color: white;
  background: red;
}

.custom-option2 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: black;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}

.custom-option2 input {
  width: 0;
}

.custom-option2:hover {
  color: white;
  background: red;
}

.invoiceBodyRight .invoiceBodyRightTitle {
  font-size: 29px;
}

.invoiceBodyRight .invoiceBodyRightText {
  font-size: 19px;
}
</style>
