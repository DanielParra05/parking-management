<template>
  <q-page class="q-pa-md">
<div class="row justify-center items-start">
    <button-component :label="buttonName"></button-component>
</div>
<div class="row flex-center">
   <div class="column" style="height: 250px">
      <div class="col">
      </div>
      <div class="col-11">
       <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
      </div>
    </div>
</div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonComponent from '../components/ButtonComponent.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ButtonComponent
  },
  data  () {
    return {
      buttonName: 'Test',
      columns: [
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' }
      ],
      rows: [
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87
        }, {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87
        }, {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87
        }, {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87
        }, {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87

        }
      ]

    }
  }
})
</script>
