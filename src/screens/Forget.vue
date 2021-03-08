<template>
  <div>
    <img
      src="https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg"
      id="bg"
      alt=""
    />
    <v-row justify="center" align="center" class="mt-15">
      <v-col cols="12" md="6" sm="12">
        <v-card class="mx-auto" color="dark" outlined>
          <v-form
            @submit.prevent="onSubmit"
            class="ma-6"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']"
                  label="E-mail"
                  type="email"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn type="submit" color="red" :loading="requesting">
                  Send
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { auth } from "../firebase";
export default {
  data: () => ({
    valid: true,
    requesting: false,
    form: {
      email: "",
    },
  }),

  methods: {
    onSubmit() {
      this.requesting = true;
      auth
        .sendPasswordResetEmail(this.form.email)
        .then(() => this.$router.push({ name: "login" }))
        .catch((error) => console.log(error))
        .finally(() => (this.requesting = false));
    },
  },
};
</script>

<style scoped>
#bg {
  position: fixed;
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}
</style>