import { createStore } from "vuex";

export default createStore({
  state: {
    appName: "Parking Management",
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getCurrentPlate: (state) => state.appName,
  },
});
