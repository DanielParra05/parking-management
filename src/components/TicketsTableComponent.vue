<template>
  <q-table
    :title="tableTitle"
    :rows="parkingTicketsList"
    :columns="tableColumns"
    row-key="id"
  >
    <template v-slot:header-cell="props">
      <q-th :props="props" style="font-size: medium; font-weight: bold">
        {{ props.col.label }}
      </q-th>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div>
          <q-btn
            :disabled="isTicketClosed(`${props.value}`)"
            @click="generateFinalTicket(`${props.value}`)"
            round
            color="secondary"
            icon="exit_to_app"
          />
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-charge="props">
      <q-td :props="props">
        {{
          props.value
            ? "$" + new Intl.NumberFormat("es-CO").format(props.value)
            : "--"
        }}
      </q-td>
    </template>
    <template v-slot:body-cell-leaveDate="props">
      <q-td :props="props">
        {{ props.value ? props.value : "--" }}
      </q-td>
    </template>
  </q-table>

  <dialog-component
    :title="`Ticket closed successfully`"
    :message="`Mesg con datos del tiquete`"
    :alert="alert"
    :type="`success`"
    @ok-click="alert = false"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ParkingTicket from "../types/ParkingTicket";
import DialogComponent from "./DialogComponent.vue";

export default defineComponent({
  name: "TicketsTableComponent",

  props: {
    parkingTicketsList: Array as PropType<Array<ParkingTicket>>,
    tableTitle: String,
  },
  components: { DialogComponent },
  data() {
    return {
      alert: false,
      tableColumns: [
        {
          name: "vehicleType",
          label: "Vehicle Type",
          field: "vehicleType",
          align: "left",
        },
        {
          name: "plate",
          label: "Vehicle Plate",
          field: "plate",
          align: "left",
        },
        {
          name: "entryDate",
          label: "Entry Date/Hour",
          field: "entryDate",
          align: "left",
        },
        {
          name: "leaveDate",
          label: "Leave Date/Hour",
          field: "leaveDate",
          align: "left",
        },
        { name: "charge", label: "Charged 💵", field: "charge", align: "left" },
        { name: "actions", label: "Actions", align: "center", field: "id" },
      ],
    };
  },
  methods: {
    generateFinalTicket(id: string) {
      this.alert = true;
      console.log(id);
    },
    getByIdFromTickets(id: number): ParkingTicket | undefined {
      // eslint-disable-next-line
      return this.parkingTicketsList?.find((ticket) => id == ticket.id);
    },
    isTicketClosed(id: string) {
      const parkingTicket: ParkingTicket | undefined = this.getByIdFromTickets(
        parseInt(id)
      );
      return parkingTicket && parkingTicket.charge && parkingTicket.charge > 0;
    },
  },
});
</script>
<style>
th {
  font-size: 100%;
}
</style>
