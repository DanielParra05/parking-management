import Axios from "axios";
import ParkingTicket from "./types/ParkingTicket";

const url = "http://localhost:3000";

function getVehiclesType(): Promise<string[]> {
  return Axios.get<string[]>(`${url}/vehicle-types`).then(
    (response) => response.data
  );
}

function createParkingTicket(
  parkingTicket: ParkingTicket
): Promise<ParkingTicket> {
  return Axios.post<ParkingTicket>(
    `${url}/parking-tickets`,
    parkingTicket
  ).then((response) => response.data);
}

function updateParkingTicket(parkingTicket: ParkingTicket): void {
  Axios.put<ParkingTicket>(
    `${url}/parking-tickets/${parkingTicket.id}`,
    parkingTicket
  );
}

function getParkingTickets(): Promise<ParkingTicket[]> {
  return Axios.get<ParkingTicket[]>(`${url}/parking-tickets`).then(
    (response) => response.data
  );
}

function getCarSpots(): ParkingTicket[] {
  let carSpots: ParkingTicket[] = new Array<ParkingTicket>();
  Axios.get<ParkingTicket[]>(`${url}/car-spots`).then(
    (response) => (carSpots = response.data)
  );
  return carSpots;
}

function pushCarSpot(parkingTicket: ParkingTicket): void {
  Axios.post<ParkingTicket>(`${url}/car-spots`, parkingTicket);
}

function removeCarSpot(parkingTicket: ParkingTicket): void {
  Axios.delete<ParkingTicket>(`${url}/car-spots/${parkingTicket.id}`);
}

function getBikeSpots(): ParkingTicket[] {
  let bikeSpots: ParkingTicket[] = new Array<ParkingTicket>();
  Axios.get<ParkingTicket[]>(`${url}/bike-spots`).then(
    (response) => (bikeSpots = response.data)
  );
  return bikeSpots;
}

function pushBikeSpot(parkingTicket: ParkingTicket): void {
  Axios.post<ParkingTicket>(`${url}/bike-spots`, parkingTicket);
}

function removeBikeSpot(parkingTicket: ParkingTicket): void {
  Axios.delete<ParkingTicket>(`${url}/bike-spots/${parkingTicket.id}`);
}

function login(userEmail: string, userPass: string): Promise<any> {
  return Axios.post(`${url}/login`, {
    email: userEmail,
    password: userPass,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
}

export default {
  getVehiclesType,
  createParkingTicket,
  getParkingTickets,
  updateParkingTicket,
  getCarSpots,
  getBikeSpots,
  pushCarSpot,
  pushBikeSpot,
  removeCarSpot,
  removeBikeSpot,
  login,
};
