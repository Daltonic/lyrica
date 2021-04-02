<template>
  <div class="justified-center text-center my-12">
    <div v-for="note in notes" :key="note.key" class="lyric__note my-4">
      <h4>{{note.type}}</h4>
      <div class="preserve-char" v-html="note.text"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { db } from "../firebase";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      notes: [],
    };
  },
  created() {
      this.listNotes()
  },
  methods: {
    ...mapMutations(["overlay"]),
    listNotes() {
      this.overlay(true);
      const notesRef = db.ref(`/songs/${this.id}/notes`);
      const notes = [];

      notesRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          notes.push({ ...data, key });
        });
        this.notes = notes;
        this.overlay(false);
      });
    },
  },
};
</script>
<style scoped>
.preserve-char {
  white-space: pre-wrap;
}
</style>