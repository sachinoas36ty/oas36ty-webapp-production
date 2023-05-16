<template>
    <div>
        
        
        <b-modal no-close-on-backdrop id="template-new-modal" ref="template-new-modal" size="md" :title="modalTitle" class="b-overlay position-relative"
            hide-footer>
            <template #modal-header>
                <h5 class="modal-title">{{ "Add Proposal Template" }}</h5>
                <!-- <button type="button" aria-label="Close" class="close">x</button> -->
                <feather-icon icon="XIcon" size="24" class="cursor-pointer" @click="() => {
                    remove_all_fields()
                    $refs['template-new-modal'].hide()
                }" />

            </template>
            <!-- <b-form-input  /> -->
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

                <b-form @submit.prevent="handleSubmit(
                modalTitle == 'add proposal template' ? updateTemplate : createTemplate)">

                    <b-row>
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="temp_name" vid="template"
                                rules="required">

                                <b-form-group label="Template Name">

                                    <b-form-input v-model="temp_name"  
                                        id="template" placeholder="Template Name" />
                                    <b-form-invalid-feedback class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                    <!-- </b-form-input> -->
                                </b-form-group>
                            </validation-provider>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="temp_title" vid="title"
                                rules="required">

                                <b-form-group label="Title">

                                    <b-form-input v-model="tempFields[0].title" id="title"
                                          placeholder="Enter Title" />
                                    <b-form-invalid-feedback class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>

                                </b-form-group>
                            </validation-provider>
                        </b-col>
                        <b-col md="12">
                            <b-form-group label="Description">

                                <quill-editor v-model="tempFields[0].description"
                                    :options="editorOption"></quill-editor>
                            </b-form-group>
                            <div class="text-right">
                                 <b-button size="sm"    @click="addTemplate()" class="cursor-pointer" variant="outline-primary">
                                    Add more
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>

                    <b-row v-for="(items, index) in templateFields" :key="items.template">
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="temp_title" :vid="'title' + index"
                                rules="required">

                                <b-form-group label="Title">

                                    <b-form-input v-model="templateFields[index].title" :id="'title' + index"
                                          placeholder="Enter Title" />
                                    <b-form-invalid-feedback class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>

                                </b-form-group>
                            </validation-provider>
                        </b-col>
                        <b-col md="12">
                            <b-form-group label="Description">

                                <quill-editor v-model="templateFields[index].description"
                                    :options="editorOption"></quill-editor>
                            </b-form-group>
                            <div class="text-right">
                                 <b-button size="sm"   class="mr-1" @click="removeTemplate(index)"
                                    variant="outline-primary">
                                    Remove
                                </b-button>
                                 <b-button size="sm"   @click="addTemplate()" variant="outline-primary">
                                    Add more
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                    <div class="text-right mt-3">
                         <b-button size="sm" class="mr-1" type="reset" @click="() => {
                            remove_all_fields()
                            $refs['template-new-modal'].hide()
                        }" variant="primary">
                            Cancel
                        </b-button>
                         <b-button size="sm" :disabled="isLoading" type="submit " variant="primary">
                            {{ modalTitle == 'add proposal template' ? 'Update' : 'Create'}}
                            <b-spinner style="margin-left: 0.5rem;" small v-if="isLoading" />
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
            <div v-if="isLoading" class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;/* display: none; */">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
                <br><span>Adding Proposal Template..</span>
              </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { BFormInvalidFeedback, BContainer, BSpinner, BRow, BTable, BCard, BCol, BButton, BModal, BFormInput, BFormGroup, BForm, } from 'bootstrap-vue'
import { quillEditor } from 'vue-quill-editor'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@/@core/comp-functions/forms/form-validation'
import { ElementType } from 'htmlparser2'

export default {
    name: 'Template',
    components: {
        BRow, BCol, BButton, BSpinner, BTable, BCard, ValidationObserver, BFormInvalidFeedback,
        BModal, BFormInput, BFormGroup, quillEditor, BForm, ValidationProvider, BContainer,
    },
    data() {
        return {
            TemplateTable: [{key:'id',label:'#',thClass:'width-7'},{ key: 'temp_name', label: 'template name' }],
            editorOption: {
                modules: {
                    toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
                },
                placeholder: 'Message',
            },
            edit_temp_id: 0,
            temp_name: '',
            tempFields: [
                {

                    title: null,
                    description: null
                }
            ],
            templateFields: [],
            modalTitle: ''

        }
    },
    computed: {
        items() {

            // let arr = []
            this.$store.state.proposals.all.forEach((element,index) => {
                element.index = index + 1
            });
            return this.$store.state.proposals.all;

        },
        isLoading() {


            return this.$store.state.proposals.isLoading;

        }
    },
    // created() {
    //     this.$store.dispatch('proposals/fetch')

    // },
    methods: {
        remove_all_fields() {

            while (this.templateFields.length > 0) {
                this.templateFields.pop()
            }
            this.tempFields[0].title = null
            this.tempFields[0].description = null
            this.temp_name = null


        },
        createTemplate() {
            var arr = [];
            arr.push(this.tempFields[0])
            this.templateFields.forEach(element => {
                arr.push(element)
            });
            // this.templateFields.push(this.tempFields[0]);
            const data = {
                template_name: this.temp_name,
                templateSection: arr
            };

            this.$store.dispatch('proposals/store', data).then(() => {
                this.$refs['template-new-modal'].hide()
                this.$store.dispatch('proposals/fetch')
                this.remove_all_fields()
            })
        },
        updateTemplate() {
            // alert(this.edit_temp_id)
            var arr = [];
            arr.push(this.tempFields[0])
            this.templateFields.forEach(element => {
                arr.push(element)
            });
            // this.templateFields.push(this.tempFields[0]);
            const data = {
                template_name: this.temp_name,
                templateSection: arr
            };
            this.$store.dispatch('proposals/update', {payload: 
                {

                    template_name: this.temp_name,
                    templateSection: arr
                },
                id: this.edit_temp_id
                }).then(() => {
                    this.$refs['template-new-modal'].hide()
                    this.$store.dispatch('proposals/fetch')
                    this.remove_all_fields()
                })
        },
        removeTemplate(index) {
            this.templateFields.splice(index, 1)
        },
        addTemplate() {
            this.templateFields.push({
                title: null,
                description: null
            })
            // console.log(this.inputs)
        },
        openModal(name,  edit_id) {
            
           
                this.modalTitle = 'add proposal template'
                this.$refs[name].show()
            
        },
        onRowClicked(item) {
            const { detailsRow } = this
            if (detailsRow && detailsRow !== item) {
                detailsRow._showDetails = false;
            }

            this.$set(item, '_showDetails', !item._showDetails
            )
            this.detailsRow = item;
        }
    },
    setup() {
        const { refFormObserver, getValidationState, resetForm } =
            formValidation(resetForm);
        return {
            refFormObserver,
            getValidationState,
            resetForm,
            formValidation,
        }
    }


}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>
<style>
#template-new-modal .modal-dialog {
    max-width: 880px;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
    height: 10rem !important;
}
</style>