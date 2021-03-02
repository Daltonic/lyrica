<template>
  <v-app>
    <v-main>
      <v-card color="grey lighten-4" flat tile>
        <v-toolbar dense>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>
            
            Lyrica
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>

      <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        v-model="drawer"
        absolute
        temporary
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Profile", icon: "mdi-account-box" },
        { title: "Create", icon: "mdi-file" },
        { title: "Backup", icon: "mdi-backup-restore" },
        { title: "Settings", icon: "mdi-hammer-wrench" },
      ],
    };
  },
};
</script>
