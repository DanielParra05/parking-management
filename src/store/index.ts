import { createStore } from "vuex";
import ApiConsumer from "../ApiConsumer";
import ParkingTicket from "../types/ParkingTicket";

export default createStore({
  state: {
    appName: "Parking Management",
    carSpots: new Array<ParkingTicket>(),
    bikeSpots: new Array<ParkingTicket>(),
    authenticationToken: "",
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
      const index: number = state.bikeSpots.findIndex((ticket) => {
        return ticket.id === bike.id;
      });
      state.bikeSpots.splice(index, 1);
      ApiConsumer.removeBikeSpot(bike);
    },
    freeCarSpot(state, car: ParkingTicket) {
      const index: number = state.carSpots.findIndex((ticket) => {
        return ticket.id === car.id;
      });
      state.carSpots.splice(index, 1);
      ApiConsumer.removeCarSpot(car);
    },
    fillAuthenticationToken(state, token: string) {
      state.authenticationToken = token;
    },
    removeToken(state) {
      state.authenticationToken = "";
    },
    setCarSpots(state, carSpots: ParkingTicket[]) {
      state.carSpots = carSpots;
    },
    setBikeSpots(state, bikeSpots: ParkingTicket[]) {
      state.bikeSpots = bikeSpots;
    },
  },
  actions: {
    fetchBikeSpots({ commit }) {
      ApiConsumer.getBikeSpots().then((response) =>
        commit("setBikeSpots", response)
      );
    },
    fetchCarSpots({ commit }) {
      ApiConsumer.getCarSpots().then((response) =>
        commit("setCarSpots", response)
      );
    },
  },
  getters: {
    getAppName: (state) => state.appName,
    getCarSpots: (state) => state.carSpots,
    getBikeSpots: (state) => state.bikeSpots,
    isAuthenticated: (state) => state.authenticationToken !== "",
  },
});
