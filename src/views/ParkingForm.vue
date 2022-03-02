<template>
  <q-card class="my-card">
    <q-card-section class="bg-grey-8 text-white">
         <div class="row">
      <q-icon name="garage" size="md"/>
      <div class="text-h6">Vehicle Entry</div>
         </div>
    </q-card-section>
    <q-card-actions vertical style="padding-bottom: 1.5%">
      <div class="row">
        <div class="col-6" style="padding: 1%">
          <q-input rounded outlined label="Vehicle plate" />
        </div>
        <div class="col-6" style="padding: 1%">
          <q-select rounded outlined label="Vehicle type" />
        </div>
      </div>

      <div class="row" align="center" style="padding-top: 1.5%">
    <div class="col">
      <button-component :label="`Registrar`"></button-component>
    </div>
  </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ParkingForm'
})
</script>
