<template>
  <q-page class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-grey-8 text-white">
        <div class="row">
          <q-icon name="garage" size="md" />
          <div class="text-h6">Vehicle Entry</div>
        </div>
      </q-card-section>
      <q-card-actions vertical style="padding-bottom: 1.5%">
        <q-form @submit="createParkingTicket">
          <div class="row">
            <div class="col-6" style="padding: 1%">
              <q-select
                v-model="parkingTicket.vehicleType"
                rounded
                outlined
                label="Vehicle type"
                :options="vehicleTypes"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col-6" style="padding: 1%">
              <q-input
                style="text-transform: uppercase"
                v-model="parkingTicket.plate"
                rounded
                outlined
                label="Vehicle plate"
                :rules="[
                  (val) => validatePlate(val) || 'Invalid plate',
                  (val) => !!val || 'Field is required',
                ]"
              />
            </div>
          </div>
          <div class="row" align="center" style="padding-bottom: 3%">
            <div class="col">
              <q-btn color="primary" label="Save" size="md" type="submit" />
            </div>
          </div>
        </q-form>
      </q-card-actions>
    </q-card>

    <dialog-component
      :title="dialogTitle"
      :message="dialogBodyMessage"
      :alert="dialogVisible"
      :type="dialogType"
      @ok-click="dialogVisible = false"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiConsumer from "../ApiConsumer";
import ParkingTicket from "../types/ParkingTicket";
import DialogComponent from "@/components/DialogComponent.vue";

export default defineComponent({
  name: "ParkingForm",

  components: { DialogComponent },
  data() {
    return {
      dialogVisible: false,
      dialogBodyMessage: "",
      dialogType: "",
      dialogTitle: "",
      parkingTicket: {} as ParkingTicket,
      vehicleTypes: new Array<string>(),
    };
  },
  created() {
    ApiConsumer.getVehiclesType().then((response) => {
      this.vehicleTypes = response;
    });
  },
  methods: {
    validatePlate(plate: string) {
      return this.parkingTicket.vehicleType === "Car"
        ? /^([ A-Za-z]{3}[0-9]{3})$/.test(plate)
        : /^([ A-Za-z]{3}[0-9]{2}[ A-Za-z]{1})$/.test(plate);
    },
    createParkingTicket(event: Event) {
      this.parkingTicket.id = Math.floor(Math.random() * 100);
      this.parkingTicket.entryDate = new Date().toString();
      this.parkingTicket.plate = this.parkingTicket.plate.toUpperCase();
      ApiConsumer.createParkingTicket(this.parkingTicket as ParkingTicket);
      this.dialogBodyMessage = `Parking ticket with plate ${this.parkingTicket.plate} was created.`;
      this.dialogType = "success";
      this.dialogTitle = "Ticket created!";
      this.dialogVisible = true;
      this.parkingTicket = {} as ParkingTicket;
      (event.target as HTMLFormElement).reset();
    },
  },
});
</script>
