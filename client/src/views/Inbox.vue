<template>
  <div class="background-1 pa-4">
    <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role" :userLName="user.lName"></navBar>

    <v-container
      :class="{ margin: this.$route.query.message }"
      class="d-flex justify-center align-center inbox-container"
    >
      <div class="inbox-title">
        <v-icon class="mr-3" size="35">mdi-email</v-icon>
        <h3 style="font-size: 35px">Inbox</h3>
      </div>
      <div class="main-container d-flex">
        <div class="left-container">
          <v-card
            style="
              width: 400px;
              height: 500px;
              overflow-y: auto;
              background-color: #f2eeee;
            "
          >
            <div v-for="(user, index) in userInbox" :key="index">
              <InboxList
                @data="emitData"
                class="inbox-item"
                :user="user"
                :inbox="inboxes[index]"
              ></InboxList>
              <v-divider></v-divider>
            </div>
          </v-card>
        </div>
        <div v-if="selectedUser" class="right-container">
          <div class="avatar-flex">
            <v-avatar class="mr-4" size="60">
              <v-img cover :src="this.selectedUser.image"></v-img>
            </v-avatar>
            <div>
              <p style="font-size: 25px; text-align: end">
                {{ this.selectedUser.fName + " " + this.selectedUser.lName }}
              </p>
              <p style="font-size: 17px; text-align: center">
                {{ this.selectedUser.email }}
              </p>
            </div>
          </div>
          <v-card-title style="font-size: 25px"
            >Subject: {{ this.selectedInbox.title }}</v-card-title
          >
          <v-card class="report-container pa-4">
            <div v-if="this.selectedFacility != null" class="left-card">
              <v-img
                cover
                height="250"
                width="360"
                :src="this.selectedFacility.image"
              ></v-img>
            </div>
            <div v-if="this.user.role === 'admin'" class="right-card">
              <v-card-title v-if="this.selectedFacility != null">{{
                this.selectedFacility.title
              }}</v-card-title>
              <v-card-text v-if="this.selectedInbox.message">{{
                this.selectedInbox.message
              }}</v-card-text>
              <v-card-text v-if="this.selectedInbox.tenantId != null"
                >Tenant ID: {{ this.selectedInbox.tenantId }}</v-card-text
              >
              <v-card-text
                >Date: {{ formatDate(this.selectedInbox.date) }}</v-card-text
              >
              <div class="report-delete">
                <v-btn
                  :to="{
                    name: 'deleteReport',
                    params: { id: this.selectedInbox._id },
                  }"
                  variant="plain"
                  ><v-icon size="30" color="red">mdi-delete</v-icon></v-btn
                >
              </div>
            </div>
            <div
              v-if="this.user.role === 'owner' && this.selectedFacility != null"
              class="right-card"
            >
              <v-card-title>{{ this.selectedFacility.title }}</v-card-title>
              <v-card-text
                >Date:
                {{ formatDateOnly(this.selectedInbox.startDate) }}</v-card-text
              >
              <v-card-text>Duration: {{ duration }}</v-card-text>
              <v-card-text
                >Capacity: {{ this.selectedInbox.minCap }}</v-card-text
              >
              <v-card-text
                >Location: {{ this.selectedFacility.location }}</v-card-text
              >
              <v-card-text style="color: green"
                >{{ formatCurrency(this.selectedInbox.price) }}/hr</v-card-text
              >
              <div v-if="!toggleBtn" class="lease-btn">
                <v-btn @click="handleReject" color="red">Reject Lease</v-btn>
                <v-btn @click="handleAccept" color="green">Accept Lease</v-btn>
              </div>
              <v-card-text
                style="color: green; font-size: 30px"
                v-if="toggleBtn && this.selectedInbox.status === 'accepted'"
                >Lease {{ this.selectedInbox.status }}</v-card-text
              >
              <v-card-text
                style="color: red; font-size: 30px"
                v-if="toggleBtn && this.selectedInbox.status === 'rejected'"
                >Lease {{ this.selectedInbox.status }}</v-card-text
              >
            </div>
          </v-card>
        </div>
      </div>
    </v-container>
    <v-alert
      class="alert"
      border="left"
      closable
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      @click:close="this.$router.push({ name: 'inbox' })"
      v-if="this.$route.query.message"
    >
      {{ this.$route.query.message }}
    </v-alert>
  </div>
</template>

<script>
import AdminAPI from "@/API/adminAPI";
import navBar from "../components/navBar.vue";
import InboxList from "@/components/InboxList.vue";
export default {
  name: "inbox",
  data() {
    return {
      user: null,
      inboxes: [],
      userInbox: [],
      selectedInbox: null,
      selectedUser: null,
      selectedFacility: null,
      toggleBtn: false,
      temp: [
        {
          _id: "123",
          title: "lease request",
          facilityId: "65a55549d329cca9b53fdd2b",
          tenantId: "65b147f4ae5704d94f8f1206",
          minCap: 5,
          price: 100,
          startDate: new Date(),
          endDate: new Date(),
          status: "pending",
        },
        {
          _id: "222",
          title: "lease request",
          facilityId: "65a55549d329cca9b53fdd2b",
          tenantId: "65b147f4ae5704d94f8f1206",
          minCap: 5,
          price: 100,
          startDate: new Date(),
          endDate: new Date(),
          status: "pending",
        },
      ],
    };
  },
  components: {
    navBar,
    InboxList,
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user.role === "admin") {
      this.inboxes = await AdminAPI.getReports();
      this.inboxes.sort((a, b) => new Date(b.date) - new Date(a.date));
      for (let i = 0; i < this.inboxes.length; i++) {
        let user = await AdminAPI.getUserById(this.inboxes[i].userId);
        this.userInbox.push(user);
      }
      console.log(this.userInbox)
    } else if (this.user.role === "owner") {
      this.inboxes = this.temp;
      this.inboxes = this.inboxes
        .filter((item) => item.status === "pending")
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      for (let i = 0; i < this.inboxes.length; i++) {
        let user = await AdminAPI.getUserById(this.inboxes[i].tenantId);
        this.userInbox.push(user);
      }
    } else {
    }
  },
  methods: {
    async emitData(data) {
      this.selectedUser = data.user;
      this.selectedInbox = data.inbox;
      if (this.selectedInbox.facilityId !== null) {
        this.selectedFacility = await AdminAPI.getFacilityById(
          this.selectedInbox.facilityId
        );
      } else {
        this.selectedFacility = null;
      }
      if (
        this.selectedInbox.status === "accepted" ||
        this.selectedInbox.status === "rejected"
      ) {
        this.toggleBtn = true;
      } else {
        this.toggleBtn = false;
      }
    },
    formatDate(date) {
      let d = new Date(date);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(d);
    },
    formatDateOnly(date) {
      let d = new Date(date);
      return d.toLocaleDateString("en-US");
    },
    formatCurrency(value) {
      if (value === undefined) {
        return "MYR 0";
      }
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "MYR",
      });
    },
    handleReject() {
      for (let i = 0; i < this.inboxes.length; i++) {
        if (this.inboxes[i]._id === this.selectedInbox._id) {
          this.inboxes[i].status = "rejected";
          this.toggleBtn = true;
          break;
        }
      }
    },
    handleAccept() {
      for (let i = 0; i < this.inboxes.length; i++) {
        if (this.inboxes[i]._id === this.selectedInbox._id) {
          this.inboxes[i].status = "accepted";
          this.toggleBtn = true;
          break;
        }
      }
    },
  },
  computed: {
    duration() {
      let start = new Date(this.selectedInbox.startDate);
      let end = new Date(this.selectedInbox.endDate);
      let startTime = start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      let endTime = end.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${startTime} - ${endTime}`;
    },
  },
};
</script>

<style>
.report-delete {
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
}

.inbox-container {
  background-color: white;
  flex-direction: column;
  border-radius: 19px;
}

.inbox-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.lease-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.left-container {
  flex: 1 0 30%;
  border: black solid 1px;
}

.right-container {
  flex: 2 0 60%;
  margin-left: 20px;
}

.report-container {
  display: flex;
  flex-direction: row;
}

.main-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.margin {
  margin-top: 80px;
}

.inbox-item {
  width: 100%;
  background-color: #a5a5a5;
  height: 70px;
}

.avatar-flex {
  display: flex;
  flex-direction: row;
  padding: 12px;
  gap: 5px;
  align-content: center;
  background-color: #b5b5b5;
  border: 1px solid black;
}

.right-card {
  width: 100%;
}

.alert {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>



