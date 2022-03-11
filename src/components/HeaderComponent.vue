<template>
  <q-header id="header" elevated>
    <q-toolbar>
      <q-avatar>
        <router-link to="/">
          <q-icon
            name="local_parking"
            size="md"
            style="background-color: white"
          />
        </router-link>
      </q-avatar>
      <q-toolbar-title> {{ $store.state.appName }} </q-toolbar-title>
      <q-tabs>
        <q-btn
          color="red"
          size="sm"
          rounded
          @click="redirectToWithVueRouter('/current-ocupation')"
          glossy
          label="Current Ocupation"
        />
      </q-tabs>
      <q-btn flat round dense icon="logout" @click="logout">
        <q-tooltip> Logout </q-tooltip></q-btn
      >
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      alert: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("removeToken");
      this.redirectToWithVueRouter("login");
    },
    redirectToWithVueRouter(route: string) {
      this.$router.push(route);
    },
  },
});
</script>
