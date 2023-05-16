<template>
    <div style="cursor: pointer;">
        <!-- <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" /> -->

        <div class="block-header" style="margin-bottom: 12px;
                    min-height: 60px;margin-top:-1rem;">

            <div class="row" style="        background: #fff;
                                margin: 0;">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="h-left clearfix">
                        <div class="card">
                            <div class="header d-flex justify-content-between">
                                <div>

                                    <h2 class="text-uppercase text-20-black ">
                                        getting started with oas36ty
                                    </h2>
                                </div>
                                <div class=" d-flex justify-content-end">
                                    <div class="d-inline-flex ">
                                        <b-button @click="() => {
                                            $router.push({ name: 'dashboard' })
                                        }" size="sm" variant="primary" class="mr-1">
                                            <span class="text-nowrap">
                                                <feather-icon icon="SkipForwardIcon" />
                                                Skip
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
        
        <div class="user-onboarding-body mt-1">
            <div class="jumbotron welcome text-black " style="background-color: #beced24f;">
                <h3 class="display-3">Welcome {{ name }},
                </h3>
                <p class="lead">You’ve taken the first step towards an amazing end-to-end office journey!</p>
                <div class="completed-progress-info"><small>Progress...</small> <small>{{ percentage }}%</small></div>
                <div class="m-b-5 progress">
                    <div id="progressBar" role="progressbar" aria-valuemin="0" aria-valuemax="6" aria-valuenow="3"
                        :class="{ 'width-99': $store.state.leads.all.length > 0 && $store.state.users.all.length > 1 && checkToken, 'width-33': checkToken && $store.state.users.all.length === 1 && $store.state.leads.all.length === 0, 'width-66': ($store.state.leads.all.filter(e => e.type === 'lead').length > 0 && $store.state.users.all.length > 1) ||($store.state.leads.all.filter(e => e.type === 'lead').length > 0 && checkToken) || (checkToken && $store.state.users.all.length > 1), 'width-0': !checkToken && $store.state.leads.all.length === 0 && $store.state.users.all.length === 1 }"
                        class="progress-bar progress-bar-success active pointer bg-success progress-bar-striped"><!---->
                    </div>
                </div> <small><i class="zmdi zmdi-help-outline admin-help"></i>
                    You have to fill the mandatory fields to complete the setup process.
                </small><br> <small><i class="zmdi zmdi-help-outline admin-help"></i>
                    In Case of any assistance please contact our support team.
                </small>
            </div>
        </div>
        
        <b-row>
            {{ global_id }}
            <b-col md="4"  title="Link your google drive">
                <a :href="url + '/google/login?global_id='+global_ids" target="_blank">
                    <!-- <div data-aos-duration="1000" data-aos-delay="100" data-aos="flip-left" class="card aos-item"> -->
                        <b-card class="G-drive-container">
                        <div class="body">
                            <div class="member-card-2">
                                <div class=" member-thumb"></div>
                                <div class="p-5">
                                    <h4 class="m-b-5 m-t-0 text-uppercase font-14">Link your google drive
                                    </h4>
                                    <p class="text-muted">
                                        G-drive is used to store your data for complete transparency
                                    </p>
                                </div>
                            </div>
                        </div>
                    </b-card>
                </a>
            </b-col>
            <b-col md="4" title="Add your Team" v-b-modal.modal-user>
                <b-card>

                    <div class="body">
                        <div class="member-card-2">
                            <div class=" member-thumb"></div>
                            <div class="p-5">
                                <h4 class="m-b-5 m-t-0 text-uppercase font-14">Add Your team</h4>
                                <p class="text-muted">
                                    Your whole team can be here and work with better efficiency
                                </p>
                            </div>
                        </div>
                    </div>
                </b-card>
                </b-col>
      
            <b-col md="4" v-b-modal.modal-leads title="Add Your Lead">
                <b-card>
                    <div class="body">
                        <div class="member-card-2">
                            <div class=" member-thumb "></div>
                            <div class="p-5">
                                <h4 class="m-b-5 m-t-0 text-uppercase font-14">Add Your Leads</h4>
                                <p class="text-muted">
                                    Your whole team can be here and work with better efficiency
                                </p>
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
            
        </b-row>

    </div>
</template>
<script>
import {BCard, BRow,BCol,BButton } from 'bootstrap-vue'
import CreateSidebar from "./pages/leads/CreateSidebar.vue";
// import Url from '../api/Url.js'
export default {
    components: {
        BButton,BCard,
        BRow,BCol,
        CreateSidebar
    },

    created() {
        // if (this.$store.state.leads.all.filter(e => e.type === 'lead').length === 0) {

        //     this.$store.dispatch('leads/fetch')
        // }
        if (this.$store.state.contactPeople.allForLeads.length === 0) {

            this.$store.dispatch('contactPeople/fetchForLeads')
        }
        if (this.$store.state.clients.all.length === 0) {

            this.$store.dispatch('clients/fetch')
        }
        if (this.$store.state.branches.all.length === 0) {

            this.$store.dispatch('branches/fetch')
        }
    },
    data(){
        return {
            global_ids: null

        }
    },
    computed: {
        checkToken(){
            var accessToken2 = null;
            // this.$store.state.users.all.forEach(element => {
            //     if(element.email === JSON.parse(localStorage.getItem('userData')).email){
            //         accessToken = element.accessToken
            //     }
            // });
            if(this.$store.state.users.accessToken){

            if(this.$store.state.users.accessToken.access_token !=null){
                accessToken2 = this.$store.state.users.accessToken.access_token
            }
        }

            // accessToken2 =  ?null : this.$store.state.users.accessToken.access_token
            if(accessToken2 ){
                return true
            }else{
                return false
            }
        },
        url() {
            return JSON.parse(localStorage.getItem('url'))
        },
        name() {
            return JSON.parse(localStorage.getItem('userData')).name
        },
        global_id() {
            let id = '';
            this.$store.state.users.all.forEach(element => {
                // if(element.email === JSON.parse(localStorage.getItem('userData')).email){
                    if(element.id === 1){

                        this.global_ids = element.global_id
                    }
                // }
            });
            return;
            // return JSON.parse(localStorage.getItem('userData')).
        },
        percentage() {
            var percent = 0
            if ((this.$store.state.leads.all.filter(e => e.type === 'lead').length > 0 && this.$store.state.users.all.length > 1) ||(this.$store.state.leads.all.filter(e => e.type === 'lead').length > 0 && this.checkToken) || (this.checkToken && this.$store.state.users.all.length > 1)) {
                percent = 66
            }
             if (this.$store.state.leads.all.filter(e => e.type === 'lead').length > 0 || this.checkToken || this.$store.state.users.all.length > 0) {
                if (!this.$store.state.users.all.length > 1) {
                    percent = 33
                }
            }  if (this.$store.state.users.all.length === 1 && this.$store.state.leads.all.filter(e => e.type === 'lead').length === 0 && !this.checkToken) {
                percent = 0
            } if(this.$store.state.users.all.length > 1 && this.$store.state.leads.all.filter(e => e.type === 'lead').length > 0 && this.checkToken){
                percent = 100
            }
            return percent
        }
    },
    beforeUpdate() {
        // document.getElementById('progressBar').classList.add('width-50')
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('leads/fetchwithoutLoading')
        }
    },
    setup() {
        // const isCreateSidebarActive = ref(false);
        return {
            // isCreateSidebarActive,
        }
    }
}
</script>