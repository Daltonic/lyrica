<template>
  <div class="my-12">
    <v-row v-if="notes.length > 0" justify="center">
      <v-col v-for="(note, i) in notes" :key="i" cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>{{ note.type }}</v-expansion-panel-header>
            <v-expansion-panel-content>{{
              note.text
            }}</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-row justify="center" align="center" class="mt-2">
          <v-btn icon color="indigo" @click="editNote(note)">
            <v-icon>mdi-notebook-edit</v-icon>
          </v-btn>
          <v-btn icon color="pink" @click="onRemNote(note)">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else justify="center" align="center">
      <v-col cols="12" md="8" sm="12">
        <v-alert border="right" colored-border type="info" elevation="2">
          You're at the right place, click on the big plus button at the bottom
          right to start adding notes.
        </v-alert>
      </v-col>
    </v-row>

    <v-form v-model="valid" lazy-validation ref="form" justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Note</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    :items="types"
                    :rules="[(v) => !!v || 'Item is required']"
                    v-model="note.type"
                    label="Select The Note Type Here"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    counter
                    clearable
                    v-model="note.text"
                    clear-icon="mdi-close-circle"
                    label="Write The Note..."
                    :rules="[(v) => !!v || 'Note text is required']"
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
              @click="addNote"
            >
              Add Note
            </v-btn>
            <v-btn
              v-else
              type="submit"
              color="blue darken-1"
              text
              @click="updateNote"
            >
              Update Note
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>

    <v-dialog v-model="remDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text
          >You are about to delete this "{{ note.type }}"!</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onClose"> Cancel </v-btn>
          <v-btn color="pink darken-1" text @click="remNote"> Delete </v-btn>
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

    <v-snackbar v-model="snackbar" timeout="2000">
      Note successfully deleted!

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    dialog: false,
    remDialog: false,
    notes: [],
    types: ["Verse", "Hooks", "Chorus", "Bridge", "Instrument"],
    note: { text: "", type: "", key: "" },
    valid: false,
    edit: false,
  }),
  methods: {
    addNote() {
      if (this.valid) {
        this.note.key = String(Math.random() * (100 - 1) + 1)
          .split(".")
          .join("");
        this.notes.push({ ...this.note });
        this.dialog = !this.dialog;
        this.reset();
      } else {
        this.validate();
      }
    },
    updateNote() {
      if (this.valid) {
        const index = this.notes.findIndex((i) => i.key == this.note.key);
        this.notes[index] = { ...this.note };
        this.notes = [...this.notes];
        this.dialog = !this.dialog;
        this.reset();
      } else {
        this.validate();
      }
    },
    onRemNote(note) {
      this.note = { ...note };
      this.remDialog = !this.remDialog;
    },
    remNote() {
      const index = this.notes.findIndex((i) => i.key == this.note.key);
      this.notes.splice(index, 1);
      this.remDialog = !this.remDialog;
      this.snackbar = !this.snackbar;
    },
    editNote(note) {
      this.edit = true;
      this.note = { ...note };
      this.dialog = !this.dialog;
    },
    reset() {
      this.edit = false;
      this.note.text = "";
      this.note.type = "";
      this.note.key = "";
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