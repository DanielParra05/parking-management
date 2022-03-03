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
    :title="dialogTitle"
    :message="dialogBodyMessage"
    :alert="dialogVisible"
    :type="dialogType"
    @ok-click="dialogVisible = false"
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
      dialogVisible: false,
      dialogBodyMessage: "",
      dialogType: "",
      dialogTitle: "",
      prices: new Map<string, number>([
        ["CarHour", 1000],
        ["MotorbikeHour", 500],
        ["CarDay", 8000],
        ["MotorbikeDay", 4000],
      ]),
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
      const parkingTicket: ParkingTicket | undefined = this.getByIdFromTickets(
        parseInt(id)
      );
      if (parkingTicket) {
        parkingTicket.leaveDate = new Date().toString();
        parkingTicket.charge = this.calculateFinalPrice(parkingTicket);
        this.showDialog(
          `The ticket with plate ${
            parkingTicket.plate
          } was closed successfully. Final amount to charge: $${new Intl.NumberFormat(
            "es-CO"
          ).format(parkingTicket.charge)}`,
          "success",
          "Ticket closed successfully"
        );
      } else {
        this.showDialog(
          "Error",
          "error",
          "There was an error. Try again later, please :'v"
        );
      }
    },
    showDialog(
      dialogBodyMessage: string,
      dialogType: string,
      dialogTitle: string
    ): void {
      this.dialogBodyMessage = dialogBodyMessage;
      this.dialogType = dialogType;
      this.dialogTitle = dialogTitle;
      this.dialogVisible = true;
    },
    calculateFinalPrice(parkingTicket: ParkingTicket): number {
      const hours: number =
        Math.abs(
          Date.parse(parkingTicket.leaveDate).valueOf() -
            Date.parse(parkingTicket.entryDate).valueOf()
        ) / 36e5;
      const priceDay: number | undefined = this.prices.get(
        parkingTicket.vehicleType + "Day"
      );
      const priceHour: number | undefined = this.prices.get(
        parkingTicket.vehicleType + "Hour"
      );
      if (priceDay !== undefined && priceHour !== undefined) {
        return this.calculateCharge(Math.ceil(hours), priceHour, priceDay, 0);
      }
      return 0;
    },
    calculateCharge(
      hours: number,
      priceHour: number,
      priceDay: number,
      accumulatedCharge: number
    ): number {
      console.log("Hours -->" + hours);
      var totalDays: number = 0;
      if (hours >= 24) {
        totalDays = Math.floor(hours / 24);
        accumulatedCharge += totalDays * priceDay;
        hours = hours - totalDays * 24;
        return this.calculateCharge(
          hours,
          priceHour,
          priceDay,
          accumulatedCharge
        );
      } else if (hours >= 8) {
        totalDays = Math.floor(hours / 8);
        hours = hours - totalDays * 8;
        accumulatedCharge += totalDays * priceDay;
        return this.calculateCharge(
          hours,
          priceHour,
          priceDay,
          accumulatedCharge
        );
      } else {
        accumulatedCharge += priceHour * hours;
        return Math.floor(accumulatedCharge);
      }
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
