<template>
  <q-header elevated>
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
  methods: {},
  created() {
    console.log(this.$store.getters.getCurrentPlate);
  },
});
</script>
