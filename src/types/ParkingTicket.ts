interface ParkingTicket {
  id: number;
  plate: string;
  entryDate: string;
  leaveDate: string;
  vehicleType: string;
  charge: number;
}

export default ParkingTicket;
