import { Store } from "vuex";
import ParkingTicket from "./types/ParkingTicket";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    appName: string;
    carSpots: Array<ParkingTicket>;
    bikeSpots: Array<ParkingTicket>;
    authenticationToken: string;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
