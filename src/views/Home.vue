<template>
  <div class="row justify-center items-start">
    <q-btn color="secondary" label="New ticket" size="lg" @click="goToForm()" />
  </div>
  <div class="flex-center" style="padding: 1.5%">
    <tickets-table-component
      :tableTitle="`Tickets Summary 🎟️`"
      :parkingTicketsList="parkingTicketsList"
    ></tickets-table-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TicketsTableComponent from "../components/TicketsTableComponent.vue";
import ParkingTicket from "../types/ParkingTicket";
import ApiConsumer from "../ApiConsumer";

export default defineComponent({
  name: "Home",
  components: { TicketsTableComponent },
  data() {
    return {
      parkingTicketsList: new Array<ParkingTicket>(),
    };
  },
  methods: {
    goToForm() {
      this.$router.push({ name: "parking-form" });
    },
  },
  created() {
    ApiConsumer.getParkingTickets().then((response) => {
      this.parkingTicketsList = response;
    });
  },
});
</script>
