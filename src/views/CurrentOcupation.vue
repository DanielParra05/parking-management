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
              <q-icon
                name="drive_eta"
                size="4.4em"
                style="cursor: pointer"
                @click="handleTicketClick(carTicket)"
                ><q-tooltip> Close ticket </q-tooltip></q-icon
              >
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
              <q-icon
                name="two_wheeler"
                size="4.4em"
                style="cursor: pointer"
                @click="handleTicketClick(bikeTicket)"
                ><q-tooltip> Close ticket </q-tooltip></q-icon
              >
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
    <dialog-component
      :title="dialogTitle"
      :message="dialogBodyMessage"
      :alert="dialogVisible"
      :type="dialogType"
      @ok-click="dialogVisible = false"
    />
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import ParkingTicket from "../types/ParkingTicket";
import { useStore } from "vuex";
import useCloseTicket from "../components/Logic/UseCloseTicket";
import DialogComponent from "../components/DialogComponent.vue";

const store = useStore();
const closeTicket = useCloseTicket();
const activeCarParkingTickets: ParkingTicket[] = reactive(
  store.getters.getCarSpots
);
const activeMotorbikeParkingTickets: ParkingTicket[] = reactive(
  store.getters.getBikeSpots
);
const dialogTitle = ref<string>("");
const dialogBodyMessage = ref<string>("");
const dialogType = ref<string>("");
const dialogVisible = ref<boolean>(false);

function handleTicketClick(parkingTicket: ParkingTicket) {
  closeTicket(parkingTicket);
  dialogTitle.value = "Ticket closed successfully";
  dialogBodyMessage.value = `The ticket with plate ${
    parkingTicket.plate
  } was closed successfully. Final amount to charge: $${new Intl.NumberFormat(
    "es-CO"
  ).format(parkingTicket.charge)}`;
  dialogType.value = "success";
  dialogVisible.value = true;
}
</script>

<style scoped>
.plateStyle {
  font-weight: bold;
}
</style>
