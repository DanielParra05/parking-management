<template>
<q-btn color="primary" :label="label" size ="lg" @click="buttonClick" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    buttonClick () {
      this.$emit('custom-click')
    }
  }
})
</script>
