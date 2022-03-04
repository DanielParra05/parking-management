import { createStore } from "vuex";
import ApiConsumer from "../ApiConsumer";
import ParkingTicket from "../types/ParkingTicket";

export default createStore({
  state: {
    appName: "Parking Management",
    carSpots: ApiConsumer.getCarSpots(),
    bikeSpots: ApiConsumer.getBikeSpots()
  },
  mutations: {
    fillCarSpot(state, car: ParkingTicket) {
      state.carSpots.push(car);
      ApiConsumer.pushCarSpot(car);
    },
    fillBikeSpot(state, bike: ParkingTicket) {
      state.bikeSpots.push(bike);
      ApiConsumer.pushBikeSpot(bike);
    },
    freeBikeSpot(state, bike: ParkingTicket) {
      var index: number = state.bikeSpots.findIndex(ticket => {
        return ticket.id === bike.id;
      });
      state.bikeSpots.splice(index, 1);
      ApiConsumer.removeBikeSpot(bike);
    },
    freeCarSpot(state, car: ParkingTicket) {
      var index: number = state.carSpots.findIndex(ticket => {
        return ticket.id === car.id;
      });
      state.carSpots.splice(index, 1);
      ApiConsumer.removeCarSpot(car);
    }
  },
  actions: {},
  modules: {},
  getters: {
    getAppName: (state) => state.appName,
    getCarSpots: (state) => state.carSpots,
    getBikeSpots: (state) => state.bikeSpots
  },
});
