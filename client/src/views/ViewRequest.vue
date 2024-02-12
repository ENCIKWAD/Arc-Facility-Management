<template>
    <div class="background-2">
        <div>
            <v-btn :to="{ name: 'adminHome' }" :ripple="false" variant="plain">
                <v-icon size="90">mdi-arrow-left-circle</v-icon>
            </v-btn>
            <h1 style="margin-top: 50px">View Lease Request</h1>
        </div>

        <div class="container">
            <p>Search For</p>
            <v-text-field
                v-model="searchBar"
                variant="solo"
                class="no-underline"
                rounded
                placeholder="Search for lease request ID"
                prepend-inner-icon="mdi-magnify"
                hide-details
                color="primary"
                bg-color="white"
                @keyup="search"
            ></v-text-field>
            <p>Sort By</p>
            
            <v-select
                v-model="select"
                :items="items"
                @update:model-value="handleSort"
                :value="select"
                    rounded="xl"
                    variant="solo"
                    label="Select"
                    single-line
                    hide-details
            ></v-select>
        </div>

        <div>
            <v-table>
                <thead>
                <tr>
                    <th class="text-left">Number</th>
                    <th class="text-center">Tenant Name</th>
                    <th class="text-center">Tenant ID</th>
                    <th class="text-center">Duration</th>
                    <th class="text-center">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="request in itemsToDisplay" :key="request._id">
                    <td>{{ leaseRequests.findIndex(r => r._id === request._id) + 1 }}</td>
                    <td class="text-center"> {{ request.tenantName }}</td>
                    <td class="text-center"> {{ request.tenantId }}</td>
                    <td class="text-center">{{ formatTime(request.startTime) }} - {{ formatTime(request.endTime) }}</td>
                    <td class="text-center" :class="{'status-pending': request.status === 'Pending'
                                                    , 'status-accepted': request.status === 'Accepted',
                                                    'status-rejected': request.status === 'Rejected'}">
                                                     {{ request.status }}</td>
                </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>
import AdminAPI from '@/API/adminAPI';
import {reactive } from 'vue';
export default {
  name: 'ManageTenant',
  setup() {
    const state = reactive({
      searchResults: [],
      noSearch: true,
    });

    return {
      state,
    };
  },
  data() {
    return {
        leaseRequests: [],
        searchBar: '',
        select: '',
        items: ['pending', 'accepted'],
        sortOrder: true,
    };
  },
  computed: {
    itemsToDisplay() {
      if (this.state.noSearch) {
        return this.leaseRequests;
      } else {
        return this.state.searchResults;
      }
    }
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    try {
        const leaseRequests = await AdminAPI.fetchRequests();
        for (let request of leaseRequests) {
        request.tenantName = await this.fetchTenantName(request.tenantId);
        }
        this.leaseRequests = leaseRequests;
    } catch (error) {
        console.log(error);
    }
  },
  methods: {

    async fetchTenantName(tenantId) {
        try {
        return await AdminAPI.getTenantNameById(tenantId);
        } catch (error) {
        console.error(error);
        }
    },
    formatTime(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  return strTime;
},

    handleSort() {
    let sortedRequests = [...this.itemsToDisplay]; // Create a new array
    if (this.sortOrder) {
      sortedRequests.sort((a, b) => b.status.localeCompare(a.status));
    } else {
      sortedRequests.sort((a, b) => a.status.localeCompare(b.status));
    }
    this.leaseRequests = sortedRequests;
    this.sortOrder = !this.sortOrder; // Toggle the sort order for the next click
  },

    search() {
        const search = this.searchBar.trim().toLowerCase();
        console.log('Search term:', search);
        if (!search) {
            this.state.noSearch = true;
            return;
            }
            this.state.noSearch = false;
            this.state.searchResults = this.leaseRequests.filter(request =>
            String(request._id).toLowerCase().includes(search)
        );
    },
  }
}
</script>

<style scoped>
.background-2 {
  background-color: #f1ebe8;
  min-height: 100vh;
  padding: 2rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.no-underline .v-input__slot::before {
  border: none !important;
}

.v-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.status-pending {
  color: rgb(248, 153, 0);
}

.status-accepted {
  color: green;
}

.status-rejected {
  color: red;
}

.v-table th,
.v-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.v-table th {
  padding-top: 10px;
  padding-bottom: 12px;
  text-align: left;
  background-color: gray;
  color: white;
}

</style>