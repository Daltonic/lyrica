<template>
  <div ref="container" class="my-12">
    <v-timeline
      v-if="songs.length > 0"
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="(song, i) in songs"
        :key="i"
        :color="song.color"
        icon="mdi-music-note"
        fill-dot
      >
        <template v-slot:opposite>
          <span>{{ song.createdAt | formatDate }}</span>
        </template>

        <v-card :color="song.color" dark>
          <v-card-title class="title">
            {{ song.title }}
          </v-card-title>
          <v-card-text class="white text--primary py-5">
            <p>{{ song.description | truncate(100) }}</p>
            <v-btn
              :color="song.color"
              class="mx-0"
              :to="`/lyrics/${song.key}`"
              outlined
            >
              Enter
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <v-fab-transition>
      <v-btn
        key="mdi-plus"
        color="primary"
        fab
        large
        dark
        fixed
        bottom
        right
        style="bottom: 100px"
        to="/songs"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { auth, db } from "../firebase";
export default {
  name: "songs",
  data: () => ({
    songs: [],
    valid: false,
  }),
  created() {
    this.listSongs();
  },
  methods: {
    ...mapMutations(["overlay"]),
    listSongs() {
      this.overlay(true);
      const songsRef = db.ref("/songs");
      const uid = auth.currentUser.uid;
      const songs = [];

      songsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          if (data.uid == uid && data.published)
            songs.unshift({ ...data, key });
        });
        this.songs = songs;
        this.overlay(false);
      });
    },
  },
};
</script>