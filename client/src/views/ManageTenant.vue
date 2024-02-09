<template>
    <div class="background-2">
        <div>
            <v-btn :to="{ name: 'adminHome' }" :ripple="false" variant="plain">
                <v-icon size="90">mdi-arrow-left-circle</v-icon>
            </v-btn>
            <h1 style="margin-top: 50px">Manage Tenants</h1>
        </div>

        <div class="container">
            <p>Search For</p>
            <v-text-field
                v-model="searchBar"
                variant="solo"
                class="no-underline"
                rounded
                placeholder="Search for tenant name"
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
                    <th class="text-left">ID #:</th>
                    <th class="text-center">Tenant Name</th>
                    <th class="text-center">Tenant Email</th>
                    <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tenant, index) in itemsToDisplay" :key="tenant._id">
                    <td>{{ tenants.findIndex(t => t._id === tenant._id) + 1 }}</td>
                    <td class="text-center"> {{ tenant.fName + ' ' + tenant.lName }}</td>
                    <td class="text-center"> {{ tenant.email }}</td>
                    <td class="text-center">
                        <v-btn @click="toggleBan(tenant)" :color="tenant.isBanned ? 'red' : 'green'">
                        {{ tenant.isBanned ? 'Unban' : 'Ban' }}
                        </v-btn>
                    </td>
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
      searchBar: '',
      select: '',
      items: ['Name', 'Email'],
      tenants: [],
      user: null,
    };
  },
  computed: {
    itemsToDisplay() {
      return this.state.noSearch ? this.tenants : this.state.searchResults;
    },

    
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    try {
      this.tenants = await AdminAPI.fetchTenants();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    handleSort() {
        let sortedTenants = [...this.tenants]; // Create a new array
        if (this.select === 'Name') {
            sortedTenants.sort((a, b) => (a.fName + ' ' + a.lName).localeCompare(b.fName + ' ' + b.lName));
        } else if (this.select === 'Email') {
            sortedTenants.sort((a, b) => a.email.localeCompare(b.email));
        }
        this.tenants = sortedTenants;
    },

    async toggleBan(tenant) {
      try {
        const updatedTenant = await AdminAPI.updateTenant(tenant._id, { isBanned: !tenant.isBanned });
        const newTenant = { ...tenant, isBanned: !tenant.isBanned };
        this.tenants = this.tenants.map(t => t._id === tenant._id ? newTenant : t);
      } catch (error) {
        console.log(error);
      }
    },

    async search() {
        let search = parseInt(this.searchBar, 10);
        if (isNaN(search)) {
            this.state.noSearch = true;
            return;
        }
        this.state.noSearch = false;
        this.state.searchResults = this.tenants.filter((tenant, index) =>
            index + 1 === search
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