<template>
  <div class="my-12">
    <v-row v-if="songs.length > 0" justify="center">
      <v-col v-for="(song, i) in songs" :key="i" cols="12">
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item>
            <template v-slot:opposite>
              <span>Tus eu perfecto</span>
            </template>

            <v-card dark>
              <v-card-title class="title"> {{song.title}} </v-card-title>
              <v-card-text class="white text--primary">
                <p>song.description</p>
                <v-btn class="mx-0" outlined>
                  Button
                </v-btn>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

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
            <span class="headline">song</span>
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
                  <v-textarea
                    counter
                    clearable
                    v-model="song.description"
                    clear-icon="mdi-close-circle"
                    label="What's the song about?"
                    :rules="[(v) => !!v || 'Description is required']"
                    required
                  ></v-textarea>
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
              Add Song
            </v-btn>
            <v-btn
              v-else
              type="submit"
              color="blue darken-1"
              text
              @click="updatesong"
            >
              Update song
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
export default {
  data: () => ({
    snackbar: false,
    dialog: false,
    remDialog: false,
    songs: [],
    song: {
      title: "",
      description: "",
      key: "",
    },
    valid: false,
    edit: false,
  }),
  methods: {
    ...mapMutations(["snackbar"]),
    addSong() {
      if (this.valid) {
        this.song.key = String(Math.random() * (100 - 1) + 1)
          .split(".")
          .join("");
        this.songs.push({ ...this.song });
        this.dialog = !this.dialog;
        this.reset();
        this.snackbar({ show: true, msg: "Song created, start adding songs!" });
      } else {
        this.validate();
      }
    },
    updateSong() {
      if (this.valid) {
        const index = this.songs.findIndex((i) => i.key == this.song.key);
        this.songs[index] = { ...this.song };
        this.songs = [...this.songs];
        this.dialog = !this.dialog;
        this.reset();
      } else {
        this.validate();
      }
    },
    onRemSong(song) {
      this.song = { ...song };
      this.remDialog = !this.remDialog;
    },
    remSong() {
      const index = this.songs.findIndex((i) => i.key == this.song.key);
      this.songs.splice(index, 1);
      this.remDialog = !this.remDialog;
      this.snackbar = !this.snackbar;
    },
    editSong(song) {
      this.edit = true;
      this.song = { ...song };
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
      this.reset();
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>