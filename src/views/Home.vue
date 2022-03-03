<template>
  <div class="row justify-center items-start">
    <q-btn color="secondary" label="New entry" size="lg" @click="goToForm()" />
  </div>
  <div class="row flex-center">
    <div class="column" style="height: 250px">
      <div class="col"></div>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  data() {
    return {
      columns: [
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true,
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
      ],
      rows: [
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
        },
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
        },
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
        },
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
        },
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
        },
      ],
    };
  },
  methods: {
    goToForm() {
      this.$router.push({ name: "parking-form" });
    },
  },
});
</script>
