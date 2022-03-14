import ApiConsumer from "@/ApiConsumer";
import ParkingTicket from "@/types/ParkingTicket";
import { useStore } from "vuex";

const prices: Map<string, number> = new Map<string, number>([
  ["CarHour", 1000],
  ["MotorbikeHour", 500],
  ["CarDay", 8000],
  ["MotorbikeDay", 4000],
]);

/**
 * Close a ticket and returns an amount to charge
 */
function useCloseTicket(): (parkingTicket: ParkingTicket) => void {
  const store = useStore();
  function closeTicket(parkingTicket: ParkingTicket) {
    parkingTicket.leaveDate = new Date().toString();
    parkingTicket.charge = calculateFinalPrice(parkingTicket);
    ApiConsumer.updateParkingTicket(parkingTicket);
    parkingTicket.vehicleType === "Car"
      ? store.commit("freeCarSpot", parkingTicket)
      : store.commit("freeBikeSpot", parkingTicket);
  }
  return closeTicket;
}

function calculateFinalPrice(parkingTicket: ParkingTicket): number {
  const hours: number =
    Math.abs(
      Date.parse(parkingTicket.leaveDate).valueOf() -
        Date.parse(parkingTicket.entryDate).valueOf()
    ) / 36e5;
  const priceDay: number | undefined = prices.get(
    parkingTicket.vehicleType + "Day"
  );
  const priceHour: number | undefined = prices.get(
    parkingTicket.vehicleType + "Hour"
  );
  if (priceDay !== undefined && priceHour !== undefined) {
    return calculateCharge(Math.ceil(hours), priceHour, priceDay, 0);
  }
  return 0;
}

function calculateCharge(
  hours: number,
  priceHour: number,
  priceDay: number,
  accumulatedCharge: number
): number {
  let totalDays = 0;
  if (hours >= 24) {
    totalDays = Math.floor(hours / 24);
    accumulatedCharge += totalDays * priceDay;
    hours = hours - totalDays * 24;
    return calculateCharge(hours, priceHour, priceDay, accumulatedCharge);
  } else if (hours >= 8) {
    totalDays = Math.floor(hours / 8);
    hours = hours - totalDays * 8;
    accumulatedCharge += totalDays * priceDay;
    return calculateCharge(hours, priceHour, priceDay, accumulatedCharge);
  } else {
    accumulatedCharge += priceHour * hours;
    return Math.floor(accumulatedCharge);
  }
}

export default useCloseTicket;
