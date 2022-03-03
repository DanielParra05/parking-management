import Axios from 'axios'
import ParkingTicket from './types/ParkingTicket'

const url = 'http://localhost:3000'

function getVehiclesType(): Promise<String[]> {
  return Axios.get<string[]>(`${url}/vehicle-types`).then((response) => (response.data));
}

function createParkingTicket(parkingTicket: ParkingTicket) {
  Axios.post<ParkingTicket>(`${url}/parking-tickets`, parkingTicket);
}

function getParkingTickets(): Promise<ParkingTicket[]> {
  return Axios.get<ParkingTicket[]>(`${url}/parking-tickets`).then((response) => (response.data));
}

export default {
  getVehiclesType,
  createParkingTicket,
  getParkingTickets
}
