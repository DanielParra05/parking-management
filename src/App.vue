<template>
  <q-layout view="lHh Lpr lFf">
      <header-component />
      <q-page-container>
         <q-page class="q-pa-md">
        <router-view/>
         </q-page>
      </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'

export default defineComponent({
  name: 'LayoutDefault',
  components: {
    HeaderComponent
  }
})
</script>
