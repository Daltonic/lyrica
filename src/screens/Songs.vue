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
              :to="`/songs/${song.key}`"
              outlined
            >
              Enter
            </v-btn>
            <v-btn :color="song.color" class="mx-2" @click="onAction(song)">
              Actions
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

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
          >You are about to delete this
          <strong>"{{ song.title }}"</strong>!</v-card-text
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
          <v-list-item @click="publishSong()">
            <v-list-item-title
              >{{ song.published ? "Unp" : "P" }}ublish</v-list-item-title
            >
          </v-list-item>

          <v-list-item @click="editSong()">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onRemSong()">
            <v-list-item-title color="red">Delete</v-list-item-title>
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
        fixed
        bottom
        right
        style="bottom: 100px"
        @click="onAddSong()"
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
    sheet: false,
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
      published: false,
    },
    valid: false,
    edit: false,
  }),
  created() {
    this.listSongs();
  },
  methods: {
    ...mapMutations(["snackbar", "overlay"]),
    onAction(song) {
      this.song = song;
      this.sheet = !this.sheet;
    },
    listSongs() {
      this.overlay(true);
      const songsRef = db.ref("/songs");
      const uid = auth.currentUser.uid;
      const songs = [];

      songsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          if (data.uid == uid) songs.unshift({ ...data, key });
        });
        this.songs = songs;
        this.overlay(false);
      });
    },
    onAddSong() {
      this.dialog = !this.dialog;
    },
    addSong() {
      if (this.valid) {
        const songsRef = db.ref("/songs");
        this.song.writer = auth.currentUser.displayName;
        this.song.uid = auth.currentUser.uid;
        this.song.createdAt = new Date().toJSON();
        this.song.updatedAt = new Date().toJSON();

        songsRef
          .push(this.song)
          .then((data) => {
            this.song.key = data.key;
            this.songs.unshift({ ...this.song });
            this.dialog = !this.dialog;
            this.snackbar({
              show: true,
              msg: "Song successfully created!",
            });
            this.reset();
          })
          .catch((error) => {
            this.snackbar({ show: true, msg: error.message });
          });
      } else {
        this.validate();
      }
    },
    updateSong() {
      if (this.valid) {
        this.song.updatedAt = new Date().toJSON();
        const songsRef = db.ref("/songs");

        songsRef
          .child(this.song.key)
          .set(this.song)
          .then(() => {
            const index = this.songs.findIndex((i) => i.key == this.song.key);
            this.songs[index] = { ...this.song };
            this.songs = [...this.songs];
            this.dialog = !this.dialog;
            this.snackbar({
              show: true,
              msg: "Song successfully updated!",
            });
            this.reset();
          })
          .catch((error) => {
            this.snackbar({ show: true, msg: error.message });
          });
      } else {
        this.validate();
      }
    },
    onRemSong() {
      this.sheet = !this.sheet;
      this.remDialog = !this.remDialog;
    },
    remSong() {
      const songsRef = db.ref(`/songs`);
      songsRef
        .child(this.song.key)
        .remove()
        .then(() => {
          const index = this.songs.findIndex((i) => i.key == this.song.key);
          this.songs.splice(index, 1);
          this.remDialog = !this.remDialog;

          this.snackbar({
            show: true,
            msg: "Song successfully removed!",
          });
          this.reset();
        })
        .catch((error) => this.snackbar({ show: true, msg: error.message }));
    },
    editSong() {
      this.edit = true;
      this.sheet = !this.sheet;
      this.dialog = !this.dialog;
    },
    publishSong() {
      this.song.updatedAt = new Date().toJSON();
      this.song.published = !this.song.published;
      const songsRef = db.ref("/songs");

      songsRef
        .child(this.song.key)
        .set(this.song)
        .then(() => {
          const index = this.songs.findIndex((i) => i.key == this.song.key);
          this.songs[index] = { ...this.song };
          this.songs = [...this.songs];
          this.sheet = !this.sheet;
          this.snackbar({
            show: true,
            msg: `Song successfully ${
              this.song.published ? "Unp" : "P"
            }ublished!`,
          });
        })
        .catch((error) => {
          this.snackbar({ show: true, msg: error.message });
        });
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
  },
};
</script>