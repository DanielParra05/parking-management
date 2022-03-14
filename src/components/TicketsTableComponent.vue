<template>
  <q-table
    id="ticketsTable"
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
        {{ props.value ? formatDate(props.value) : "--" }}
      </q-td>
    </template>

    <template v-slot:body-cell-entryDate="props">
      <q-td :props="props">
        {{ formatDate(props.value) }}
      </q-td>
    </template>
  </q-table>

  <dialog-component
    :title="dialogTitle"
    :message="dialogBodyMessage"
    :alert="dialogVisible"
    :type="dialogType"
    @ok-click="dialogVisible = false"
  />
</template>

<script lang="ts" setup>
import { PropType, ref, defineProps } from "vue";
import ParkingTicket from "../types/ParkingTicket";
import DialogComponent from "./DialogComponent.vue";
import useCloseTicket from "./Logic/UseCloseTicket";

const props = defineProps({
  parkingTicketsList: Array as PropType<Array<ParkingTicket>>,
  tableTitle: String,
});
const dialogVisible = ref<boolean>(false);
const dialogBodyMessage = ref<string>("");
const dialogType = ref<string>("");
const dialogTitle = ref<string>("");
const tableColumns = [
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
];
const closeTicket = useCloseTicket();

function generateFinalTicket(id: string) {
  const parkingTicket: ParkingTicket | undefined = getByIdFromTickets(
    parseInt(id)
  );
  if (parkingTicket) {
    closeTicket(parkingTicket);
    showDialog(
      `The ticket with plate ${
        parkingTicket.plate
      } was closed successfully. Final amount to charge: $${new Intl.NumberFormat(
        "es-CO"
      ).format(parkingTicket.charge)}`,
      "success",
      "Ticket closed successfully"
    );
  } else {
    showDialog(
      "Error",
      "error",
      "There was an error. Try again later, please :'v"
    );
  }
}

function showDialog(bodyMessage: string, type: string, title: string): void {
  dialogBodyMessage.value = bodyMessage;
  dialogType.value = type;
  dialogTitle.value = title;
  dialogVisible.value = true;
}

function getByIdFromTickets(id: number): ParkingTicket | undefined {
  // eslint-disable-next-line
  return props.parkingTicketsList?.find((ticket) => id == ticket.id);
}

function isTicketClosed(id: string) {
  const parkingTicket: ParkingTicket | undefined = getByIdFromTickets(
    parseInt(id)
  );
  return parkingTicket && parkingTicket.charge && parkingTicket.charge > 0;
}

function formatDate(date: string): string {
  return date.replace("GMT-0500 (Colombia Standard Time)", "");
}
</script>
