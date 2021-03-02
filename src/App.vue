<template>
  <v-app>
     <v-main>
      <List />
      <SideBar />
    </v-main>
  </v-app>
</template>

<script>
import List from "./screens/lyric/List";
import SideBar from "./components/SideBar";

export default {
  name: "App",

  components: {
    List,
    SideBar,
  },

  data: () => ({
    //
  })
};
</script>
