<template>
  <v-app class="backgroundcustom">
    <v-layout row wrap justify-center mx-3 py-10>
      <v-card max-width="344" height="380" elevation="4">
        <v-card-text>
          <UserForm :isLogin="false"></UserForm>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-footer color="rgb(21 130 208 / 24%)" dark padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — Creado por <strong>Nicolás Forero</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
import UserForm from "../components/UserForm";
import { mapState } from "vuex";
export default {
  name: "editUser",
  components: {
    UserForm
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["workspaceId"])
  },
  methods: {}
};
</script>
<style scoped>
.backgroundcustom {
  background-image: url("~@/assets/backgroud.jpg");
  position: relative;
  top: 0;
  left: 0;
  background-size: cover;
  background-color: whitesmoke;
}
</style>
