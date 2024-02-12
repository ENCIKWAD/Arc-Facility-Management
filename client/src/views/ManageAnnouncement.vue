<template>
    <div class="background-2">
        <div>
            <v-btn :to="{ name: 'adminHome' }" :ripple="false" variant="plain">
                <v-icon size="90">mdi-arrow-left-circle</v-icon>
            </v-btn>
            <h1 style="margin-top: 50px">Manage Announcements</h1>
        </div>

        <div class="container">
            <p>Search For</p>
            <v-text-field
                v-model="searchBar"
                variant="solo"
                class="no-underline"
                rounded
                placeholder="Search for announcement title"
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
        <v-btn
            :to="{ name: 'addAnnouncement' }"
            style="margin-bottom: 20px"
            rounded="l" 
            color="green"
            >Add New Announcement
        </v-btn>

        <div>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">ID :#</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="(announcement, index) in itemsToDisplay" :key="announcement._id">
                        <td> {{ announcements.findIndex(a => a._id === announcement._id) + 1 }}</td>
                        <td class="text-center"> {{ announcement.title }}</td>
                        <td class="text-center" :class="{ 'not-published': !isPublished(announcement) }"> {{ formatDate(announcement.publishDate) }}</td>
                        <td class="text-center">
                            <v-btn
                                :to="{ name: 'editAnnouncement', params: { id: announcement._id }}"
                                rounded="l"
                                variant="plain"
                            ><v-icon size="30">mdi-pencil</v-icon></v-btn>
                            <v-btn
                                :to="{ name: 'deleteAnnouncement', params: { id: announcement._id }}"
                                rounded="l"
                                color="red"
                                variant="plain"
                                >
                            <v-icon size="30">mdi-delete</v-icon></v-btn></td>
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
  name: 'ManageAnnouncement',
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
      items: ['Title', 'Date'],
      announcements: [],
      user: null,
    };
  },
  computed: {
    itemsToDisplay() {
      return this.state.noSearch ? this.announcements : this.state.searchResults;
    },
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    try {
      this.announcements = await AdminAPI.fetchAnnouncement();
      console.log(this.announcements);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    handleSort() {
      if (this.select === 'Title') {
        this.announcements.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.select === 'Date') {
        this.announcements.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
      }
    },
    async search() {
      let search = this.searchBar.toLowerCase();
      if (search === "") {
        this.state.noSearch = true;
        return;
      }
      this.state.noSearch = false;
      this.state.searchResults = this.announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(search)
      );
    },

    isPublished(announcement) {
      return new Date(announcement.publishDate) <= new Date();
    },

    formatDate(date) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [day, month, year].join('-');
    }
  }
}
</script>

<style>
.background-2 {
  background-color: #f1ebe8;
  min-height: 100vh;
  padding: 2rem;
}

.container {
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  margin-top: 70px;
}

.data-container {
  width: 50vw;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}
</style>

<style scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.v-table th {
  padding-top: 10px;
  padding-bottom: 12px;
  text-align: left;
  background-color: gray;
  color: white;
}

.reset-icon {
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: none !important;
  box-shadow: none !important;
}

.not-published {
  color: red;
}
</style>