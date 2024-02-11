<template>
  <div class="background-1">
    <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role" :userLName="user.lName" :userId="user._id"></navBar>

    <v-container class="d-flex justify-center align-center">
      <v-form ref="form" @submit.prevent="submitReport">
        <v-card
          rounded="l"
          width="600"
          :style="{
            height:
              selected !== 'What do you want to report?' ? '700px' : '200px',
          }"
          class="pa-4"
        >
          <v-card-title style="font-size: 35px" class="text-center"
            >Report</v-card-title
          >
          <v-divider></v-divider>
          <div class="select-container">
            <v-select
              v-if="user.role === 'owner'"
              v-model="selected"
              @update:model-value="handleSelect"
              class="mt-15"
              bg-color="#DCDCDC"
              color="primary"
              variant="outlined"
              :items="ownerReportTypes"
            >
            </v-select>
            <v-select
              v-if="user.role === 'tenant'"
              v-model="selected"
              @update:model-value="handleSelect"
              class="mt-15"
              bg-color="#DCDCDC"
              color="primary"
              variant="outlined"
              :items="tenantReportTypes"
            >
            </v-select>
          </div>
          <div class="select-container">
            <v-text-field
              v-model="report.title"
              variant="outlined"
              label="Your Subject"
              color="primary"
              bg-color="#DCDCDC"
            ></v-text-field>
          </div>
          <v-textarea
            v-model="report.message"
            color="primary"
            bg-color="#DCDCDC"
            variant="outlined"
            label="Fill your report message here"
          >
          </v-textarea>
          <div class="select-container">
            <v-autocomplete
              v-if="selected === ownerReportTypes[0] || selected === tenantReportTypes[0]"
              v-model="selectedFacility"
              @update:model-value="handleFacilityChange"
              @focus="selectedFacility = ''"
              @blur="selectedFacility = 'Select a Facility'"
              :items="facilities"
              class="mt-15"
              bg-color="#DCDCDC"
              color="primary"
              variant="outlined"
            >
            </v-autocomplete>
            <v-autocomplete
              v-if="selected === ownerReportTypes[1]"
              v-model="selectedTenant"
              @focus="selectedTenant = ''"
              @blur="selectedTenant = 'Select a Tenant'"
              @update:model-value="handleTenantChange"
              class="mt-15"
              :items="tenants"
              bg-color="#DCDCDC"
              color="primary"
              variant="outlined"
            ></v-autocomplete>
            <div class="center-btn">
              <v-btn
                height="50"
                width="180"
                type="submit"
                class="mt-10 ml-16"
                color="green"
                >Submit</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-form>
    </v-container>
    <v-alert
      class="alert"
      border="left"
      closable
      close-text="Close Alert"
      color="red"
      dark
      dismissible
      v-if="this.toggleAlert"
    >
      {{ this.message }}
    </v-alert>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import { TenantReportType } from "../ReportType.js";
import { OwnerReportType } from "../ReportType.js";
import OwnerAPI from "../API/ownerAPI.js";
import userAPI from "../API/userAPI.js";
export default {
  name: "Report",
  components: {
    navBar,
  },
  data() {
    return {
      user: null,
      facilities: [],
      tenants: {
        title: "",
        tenantId: "",
      },
      report: {
        title: "",
        type: "",
        message: "",
        date: "",
        tenantId: "",
        facilityId: "",
        userId: ""
      },
        toggleAlert: false,
        message: "",
      selected: "What do you want to report?",
      selectedFacility: "Select a facility",
      selectedTenant: "Select a tenant",
    };
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.facilities = await OwnerAPI.fetchFacilities();
    const tenant = await OwnerAPI.getTenants();
    this.tenants = tenant.map((tenant) => ({
      title: tenant.email,
      _id: tenant._id,
    }));
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ownerReportTypes() {
      return Object.values(OwnerReportType);
    },
    tenantReportTypes() {
      return Object.values(TenantReportType);
    },
  },
  methods: {
    handleSelect() {
      this.report.type = this.selected;
    },
    handleFacilityChange() {
      for (let i = 0; i < this.facilities.length; i++) {
        if (this.facilities[i].title === this.selectedFacility) {
          this.report.facilityId = this.facilities[i]._id;
          break;
        }
      }
    },
    handleTenantChange() {
      for (let i = 0; i < this.tenants.length; i++) {
        if (this.tenants[i].title === this.selectedTenant) {
          this.report.tenantId = this.tenants[i]._id;
          break;
        }
      }
    },
    async submitReport() {
      try {
        let reportData = {
          title: this.report.title,
          type: this.report.type,
          message: this.report.message,
          userId: this.user._id
        };

        if (this.report.tenantId) {
          reportData.tenantId = this.report.tenantId;
        }

        if (this.report.facilityId) {
          reportData.facilityId = this.report.facilityId;
        }
        const response = await userAPI.createReport(reportData);
        this.$router.push({
          name: `${this.user.role}Home`,
          query: { message: response.message },
        });
      } catch (err) {
        this.toggleAlert = true;
        this.message = err.response.data.message;
        this.$nextTick(() => {
            setTimeout(() => {
                this.toggleAlert = false;
            }, 5000)
        })
      }
    },
  },
};
</script>

<style>
.select-container {
  width: 25vw;
}

.center-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btndiv {
  width: 100%;
}
</style>

<style scoped>
.alert {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 1000;
}

</style>