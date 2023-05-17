<template>
  <div>
    <create-sidebar
      :is-create-sidebar-active.sync="isCreateSidebarActive"
      :cp-id="cpID"
      @refetch-data="fetchAll"
    />
    <edit-sidebar
      :is-edit-sidebar-active.sync="isEditSidebarActive"
      :edit-item.sync="editItem"
      :cp-id="cpID"
      @refetch-data="fetchAll"
    />

    <b-card no-body>
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
          </b-col>
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <!-- <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              /> -->
               <b-button size="sm" variant="primary" @click="isCreateSidebarActive = true">
                <span class="text-nowrap">Create</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-table responsive :items="items" :fields="fields" class="mb-0">
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
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { BCard, BRow, BCol, BTable, BButton } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import CreateSidebar from "./CreateSidebar.vue";
import EditSidebar from "./EditSidebar.vue";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    CreateSidebar,
    EditSidebar,
  },
  data() {
    return {
      fields: ["id", "email", "actions"],
      cpID: this.$route.params.cpID,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.contactPersonEmails.isLoading;
    },
    successMessage() {
      return this.$store.state.contactPersonEmails.successMessage;
    },
    errorMessage() {
      return this.$store.state.contactPersonEmails.errorMessage;
    },
    errors() {
      return JSON.parse(
        JSON.stringify(this.$store.state.contactPersonEmails.errors)
      );
    },
    items() {
      return this.$store.state.contactPersonEmails.all;
    },
  },
  methods: {
    fetchAll() {
      this.$store.dispatch("contactPersonEmails/fetch", this.cpID);
    },
    destroyItem(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store
          .dispatch("contactPersonEmails/destroy", { cpID: this.cpID, id: id })
          .then(() => {
            this.fetchAll();
          });
      }
    },
  },
  created() {
    this.fetchAll();
  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const editItem = ref({});

    return {
      // Sidebar
      isCreateSidebarActive,
      isEditSidebarActive,
      editItem,
    };
  },
};
</script>

<style></style>
