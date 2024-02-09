<template>
  <div class="background-2">
    <h1>Admin Home page</h1>
    <v-card class="mx-auto" max-width="1000" rounded>
      <v-card-title>
        <div class="overline mb-4"></div>
      </v-card-title>
      <v-card-title class="title">
        Dashboard
      </v-card-title>
      <v-card-actions>
        <v-layout row wrap>
          <v-flex xs4>
            <div class="button-container">
              <v-btn
                :to="{ name: 'manageAnnouncement' }"
                block
                class="text-center"
                variant="elevated"
                rounded="xl" 
                color="#5F3DAC"
              >
                <v-stack>
                  <v-icon color="black" size="70">mdi-bullhorn</v-icon>
                  <div>Manage Announcement</div>
                </v-stack>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs4>
            <div class="button-container">
              <v-btn
                :to="{ name: 'report' }"
                block
                class="text-center"
                variant="elevated"
                rounded="xl" 
                color="#5F3DAC"
              >
                <v-stack>
                  <v-icon color="black" size="70">mdi-file-alert</v-icon>
                  <div>Manage Report</div>
                </v-stack>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs4>
            <div class="button-container">
              <v-btn
                :to="{ name: 'manageTenant' }"
                block
                class="text-center"
                variant="elevated"
                rounded="xl" 
                color="#5F3DAC"
              >
                <v-stack>
                  <v-icon color="black" size="70">mdi-account-group</v-icon>
                  <div>Manage Tenant</div>
                </v-stack>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.background-2 {
  background-color: #f1ebe8;
  min-height: 100vh;
  padding: 2rem;
}

.title {
  font-size: 2em;
  text-align: center;
  width: 100%;
}

.button-container {
  margin: 60px;
  height: 200px;
  width: 200px;
}

.button-container > .v-btn {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>