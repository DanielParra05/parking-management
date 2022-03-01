<template>
  <q-layout view="lHh Lpr lFf">
  <header-component />
    <q-page-container>
      <hello-world />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import HeaderComponent from './components/HeaderComponent.vue'

export default defineComponent({
  name: 'LayoutDefault',
  components: {
    HelloWorld,
    HeaderComponent
  }
})
</script>
