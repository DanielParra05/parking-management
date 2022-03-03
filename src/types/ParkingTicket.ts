interface ParkingTicket {
    id: number,
    plate: string,
    entryDate: Date,
    leaveDate: Date,
    vehicleType: string
    charge: number
}

export default ParkingTicket
