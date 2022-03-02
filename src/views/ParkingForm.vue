<template>
  <q-card class="my-card">
    <q-card-section class="bg-grey-8 text-white">
      <div class="row">
        <q-icon name="garage" size="md" />
        <div class="text-h6">Vehicle Entry</div>
      </div>
    </q-card-section>
    <q-card-actions vertical style="padding-bottom: 1.5%">
        <div class="row">
          <div class="col-6" style="padding: 1%">
            <q-select
              v-model="parkingTicket.vehicleType"
              rounded
              outlined
              label="Vehicle type"
              :options="vehicleTypes"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
          <div class="col-6" style="padding: 1%">
            <q-input
              v-model="parkingTicket.plate"
              rounded
              outlined
              label="Vehicle plate"
              :rules="[val => validatePlate(val) || 'Invalid plate', val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="row" align="center" style="padding-top: 1.5%">
          <div class="col">
            <q-btn color="primary" label="New entry" size="md" />
          </div>
        </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiConsumer from '../ApiConsumer'
import ParkingTicket from '@/types/ParkingTicket'

export default defineComponent({
  name: 'ParkingForm',
  data () {
    return {
      parkingTicket: {} as ParkingTicket,
      vehicleTypes: new Array<string>()
    }
  },
  created () {
    ApiConsumer.getVehiclesType().then((response) => {
      this.vehicleTypes = response
    })
  },
  methods: {
    validatePlate (plate : string) {
        return this.parkingTicket.vehicleType == "Car"?
         (/^([ A-Za-z]{3}[0-9]{3})$/.test(plate)):
         (/^([ A-Za-z]{3}[0-9]{2}[ A-Za-z]{1})$/.test(plate));
    },
    saveTicket (){
      
    }
  }
})
</script>
