<template>
  <q-layout view="lHh Lpr lFf">
    <header-component v-if="$store.getters.isAuthenticated" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "LayoutDefault",
  components: {
    HeaderComponent,
  },
  mounted() {
    this.$store.dispatch("fetchBikeSpots");
    this.$store.dispatch("fetchCarSpots");
  },
});
</script>
