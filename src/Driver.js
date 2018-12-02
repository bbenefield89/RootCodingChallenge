class Driver {
  constructor(driverName) {
    this.__driverName = driverName
    this.__totalDrivingTimeInHrs = 0
    this.__totalDrivingDistInMiles = 0
    this.__milesPerHour = 0
  }

  getDriverName() {
    return this.__driverName
  }
  
  getTotalDrivingTimeInHrs() {
    return this.__totalDrivingTimeInHrs
  }
  
  setTotalDrivingTimeInHrs(drivingTime) {
    const [startDrivingTime, endDrivingTime, ..._rest] = drivingTime
    const [startHour, startMin] = this.__convertDrivingTimeIntoNumber(
      startDrivingTime
    )
    const [endHour, endMin] = this.__convertDrivingTimeIntoNumber(
      endDrivingTime
    )
    const drivingTimes = { startHour, startMin, endHour, endMin }
    this.__totalDrivingTimeInHrs += this.__calcTotalDrivingTimeInHrs(
      drivingTimes
    )
  }

  __convertDrivingTimeIntoNumber(drivingTime) {
    drivingTime = drivingTime.split(':')
    let [hour, minute] = drivingTime
    hour = Number(hour)
    minute = Number(minute)
    return [hour, minute]
  }

  __calcTotalDrivingTimeInHrs(drivingTimes) {
    const { startHour, startMin, endHour, endMin } = drivingTimes
    return (endHour + endMin / 60) - (startHour + startMin / 60)
  }

  getTotalDrivingDistInMiles() {
    return this.__totalDrivingDistInMiles
  }
  
  setTotalDrivingDistInMiles(distInMiles) {
    this.__totalDrivingDistInMiles += distInMiles
    return this.__totalDrivingDistInMiles
  }

  getMilesPerHour() {
    return this.__milesPerHour 
  }
  
  setMilesPerHour() {
    this.__milesPerHour = Math.round(
      this.__totalDrivingDistInMiles / this.__totalDrivingTimeInHrs
    )
  }

  toString() {
    let driverDescription = ''
    driverDescription += `${ this.__driverName }: `
    driverDescription += `${ this.__totalDrivingDistInMiles } miles`

    const driverHasTraveled = this.__totalDrivingDistInMiles
    if (driverHasTraveled) {
      driverDescription += ' @ '
      driverDescription += `${ this.__milesPerHour } mph`
    }

    return driverDescription
  }
}

export default Driver