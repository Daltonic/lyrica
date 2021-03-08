<template>
  <v-app>
    <v-app-bar color="white" dense fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-icon>mdi-vuetify</v-icon>
        Lyrica
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      class="deep-purple accent-4"
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      dark
      v-model="drawer"
      absolute
      temporary
      height="100vh"
      style="position: fixed"
    >
      <v-list-item nav dense>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
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

    <v-main>
      <v-container class="my-12">
        <router-view></router-view>
      </v-container>
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
        { title: "Lyrics", icon: "mdi-view-dashboard", link: "/" },
        { title: "Profile", icon: "mdi-account-box", link: "/profile" },
        { title: "Create", icon: "mdi-file", link: "/create" },
        { title: "Backup", icon: "mdi-backup-restore", link: "/backup" },
        { title: "Settings", icon: "mdi-hammer-wrench", link: "/settings" },
      ],
    };
  },
};
</script>
