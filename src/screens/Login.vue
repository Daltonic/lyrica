<template>
  <div>
    <img
      src="https://css-tricks.com/examples/FullPageBackgroundImage/images/bg.jpg"
      id="bg"
      alt=""
    />
    <v-row justify="center" align="center" class="mt-15">
      <v-col cols="12" md="6" sm="12">
        <v-card class="mx-auto" color="dark" outlined>
          <v-form class="ma-6" ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  type="email"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn type="submit" color="red"> Submit </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    form: {
      email: "",
      password: ""
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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