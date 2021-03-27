<template>
  <div class="my-12">
    <v-timeline
      v-if="songs.length > 0"
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item v-for="(song, i) in songs" :key="i" :color="song.color">
        <template v-slot:opposite>
          <span>{{formatDate(song.createdAt)}}</span>
        </template>

        <v-card :color="song.color" dark>
          <v-card-title class="title">
            {{ song.title }}
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>{{ song.description }}</p>
            <v-btn :color="song.color" class="mx-0" outlined> Enter </v-btn>
            <v-btn :color="song.color" class="mx-2" @click="onAction(song)">
              Actions
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <v-row v-else justify="center" align="center">
      <v-col cols="12" md="8" sm="12">
        <v-alert border="right" colored-border type="info" elevation="2">
          You're at the right place, click on the big plus button at the bottom
          right to start adding songs.
        </v-alert>
      </v-col>
    </v-row>

    <v-form v-model="valid" lazy-validation ref="form" justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Song</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="song.title"
                    :rules="[(v) => !!v || 'Title is required']"
                    label="Title"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="song.description"
                    label="What's the song about?"
                    :rules="[(v) => !!v || 'Description is required']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-color-picker
                    label="Choose Color"
                    dot-size="29"
                    hide-canvas
                    hide-inputs
                    hide-sliders
                    show-swatches
                    swatches-max-height="100"
                    v-model="song.color"
                  ></v-color-picker>
                </v-col>
              </v-row>
            </v-container>
            <small>All fields are required</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="button" color="blue darken-1" text @click="onClose">
              Close
            </v-btn>
            <v-btn
              v-if="!edit"
              type="submit"
              color="blue darken-1"
              text
              @click="addSong"
            >
              Add
            </v-btn>
            <v-btn
              v-else
              type="submit"
              color="blue darken-1"
              text
              @click="updateSong"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>

    <v-dialog v-model="remDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text
          >You are about to delete this "{{ song.title }}"!</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onClose"> Cancel </v-btn>
          <v-btn color="pink darken-1" text @click="remSong"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-model="sheet">
      <v-sheet height="200px">
        <v-list>
          <v-subheader>Actions for "{{ song.title }}"</v-subheader>
          <v-list-item @click="editSong()">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onRemSong()">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>

    <v-fab-transition>
      <v-btn
        key="mdi-plus"
        color="primary"
        fab
        large
        dark
        absolute
        bottom
        right
        style="bottom: 100px"
        @click="dialog = !dialog"
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
  data: () => ({
    sheet: false,
    tiles: [
      { img: "keep.png", title: "Keep" },
      { img: "inbox.png", title: "Inbox" },
      { img: "hangouts.png", title: "Hangouts" },
      { img: "messenger.png", title: "Messenger" },
      { img: "google.png", title: "Google+" },
    ],
    dialog: false,
    remDialog: false,
    songs: [],
    song: {
      title: "",
      description: "",
      color: "",
      key: "",
      uid: "",
      writer: "",
      createdAt: "",
      updatedAt: "",
    },
    valid: false,
    edit: false,
  }),
  created() {
    this.listSongs();
  },
  methods: {
    ...mapMutations(["snackbar"]),
    onAction(song) {
      this.song = song;
      this.sheet = !this.sheet;
    },
    listSongs() {
      const songsRef = db.ref("/songs");
      const uid = auth.currentUser.uid;
      const songs = [];

      songsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          if (data.uid == uid) songs.push({ ...data, key });
        });
        this.songs = songs;
      });
    },
    addSong() {
      if (this.valid) {
        this.requesting = true;
        const songsRef = db.ref("/songs");
        this.song.writer = auth.currentUser.displayName;
        this.song.uid = auth.currentUser.uid;
        this.song.createdAt = new Date().toJSON();
        this.song.updatedAt = new Date().toJSON();

        songsRef
          .push(this.song)
          .then((data) => {
            this.song.key = data.key;
            this.songs.push({ ...this.song });
            this.dialog = !this.dialog;
            this.reset();
            this.snackbar({
              show: true,
              msg: "Song created, start adding songs!",
            });
          })
          .catch((error) => this.snackbar({ show: true, msg: error.message }));
      } else {
        this.validate();
      }
    },
    updateSong() {
      if (this.valid) {
        const index = this.songs.findIndex((i) => i.key == this.song.key);
        this.songs[index] = { ...this.song };
        // this.songs = [...this.songs];
        this.dialog = !this.dialog;
        this.reset();
      } else {
        this.validate();
      }
    },
    onRemSong() {
      this.sheet = !this.sheet;
      this.remDialog = !this.remDialog;
    },
    remSong() {
      const index = this.songs.findIndex((i) => i.key == this.song.key);
      this.songs.splice(index, 1);
      this.remDialog = !this.remDialog;
      this.snackbar = !this.snackbar;
      this.reset();
    },
    editSong() {
      this.edit = true;
      this.sheet = !this.sheet;
      this.dialog = !this.dialog;
    },
    reset() {
      this.edit = false;
      this.song.title = "";
      this.song.description = "";
      this.song.key = "";
      this.$refs.form.reset();
    },
    onClose() {
      this.dialog = false;
      this.remDialog = false;
    },
    validate() {
      this.$refs.form.validate();
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>