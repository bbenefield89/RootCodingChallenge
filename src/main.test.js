import { createDriversRecordsHash } from './main'

describe('Main.js', () => {
  test('createDriversRecordsHash', () => {
    let driverRecordsData = 'Driver Dan\n'
    driverRecordsData += 'Driver Alex\n'
    driverRecordsData += 'Driver Bob\n'
    driverRecordsData += 'Trip Dan 07:15 07:45 17.3\n'
    driverRecordsData += 'Trip Dan 06:12 06:32 21.8\n'
    driverRecordsData += 'Trip Alex 12:01 13:16 42.0'

    const hardCodedDriverRecordHash = {
      "Alex": {
          "__driverName": "Alex",
          "__milesPerHour": 0,
          "__totalDrivingDistInMiles": 42,
          "__totalDrivingTimeInHrs": 1.25,
        },
        "Bob": {
          "__driverName": "Bob",
          "__milesPerHour": 0,
          "__totalDrivingDistInMiles": 0,
          "__totalDrivingTimeInHrs": 0,
        },
        "Dan": {
          "__driverName": "Dan",
          "__milesPerHour": 0,
          "__totalDrivingDistInMiles": 39,
          "__totalDrivingTimeInHrs": 0.833333333333333,
        },
      }
    
    const driverRecordHash = createDriversRecordsHash(driverRecordsData)
    expect(driverRecordHash).toEqual(hardCodedDriverRecordHash)
  })
})