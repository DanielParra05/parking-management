<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-6">
        <div class="row" style="padding: 4%">
          <div
            v-for="carTicket in activeCarParkingTickets"
            :key="carTicket.id"
            class="col-2"
          >
            <div class="row">
              <q-icon name="drive_eta" size="4.4em"></q-icon>
            </div>
            <div class="row">
              <q-badge color="yellow-6" text-color="black" class="plateStyle">
                {{ carTicket.plate }}
              </q-badge>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row" style="padding: 4%">
          <div
            v-for="bikeTicket in activeMotorbikeParkingTickets"
            :key="bikeTicket.id"
            class="col-2"
          >
            <div class="row">
              <q-icon name="two_wheeler" size="4.4em"></q-icon>
            </div>
            <div class="row">
              <q-badge color="yellow-6" text-color="black" class="plateStyle">
                {{ bikeTicket.plate }}
              </q-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import ParkingTicket from "../types/ParkingTicket";
import { useStore } from "vuex";

const store = useStore();

const activeCarParkingTickets: ParkingTicket[] = reactive(
  store.getters.getCarSpots
);
const activeMotorbikeParkingTickets: ParkingTicket[] = reactive(
  store.getters.getBikeSpots
);
</script>

<style scoped>
.plateStyle {
  font-weight: bold;
}
</style>
