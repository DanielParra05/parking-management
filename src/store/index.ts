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
