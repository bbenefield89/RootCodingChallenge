import Driver from '../Driver'

import {
  createDriversRecordsHash,
  getCurrentDriver,
  sortDriversByDistInMilesDescending,
  getDriversRecordsOutput
} from './utils'

const hardCodedDriverRecordHash = {
  "Alex": {
    "__driverName": "Alex",
    "__milesPerHour": 34,
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
    "__milesPerHour": 47,
    "__totalDrivingDistInMiles": 39,
    "__totalDrivingTimeInHrs": 0.833333333333333,
  },
}

const hardCodedDriversNotSorted = [
  new Driver('Dan'),
  new Driver('Alex'),
  new Driver('Bob')
]

describe('utils.js', () => {
  test('createDriversRecordsHash -- should return a hash map of drivers', () => {
    let driverRecordsData = 'Driver Dan\n'
    driverRecordsData += 'Driver Alex\n'
    driverRecordsData += 'Driver Bob\n'
    driverRecordsData += 'Trip Dan 07:15 07:45 17.3\n'
    driverRecordsData += 'Trip Dan 06:12 06:32 21.8\n'
    driverRecordsData += 'Trip Alex 12:01 13:16 42.0'

    const driverRecordHash = createDriversRecordsHash(driverRecordsData)
    expect(driverRecordHash).toEqual(hardCodedDriverRecordHash)
  })

  test('getCurrentDriver -- should return correct driver "Bob"', () => {
    const correctDriver = getCurrentDriver(hardCodedDriverRecordHash, 'Bob')
    const expectedDriver = hardCodedDriverRecordHash.Bob
    expect(correctDriver).toEqual(expectedDriver)
  })

  test('getDriversRecordsOutput -- should return correct output of each drivers travel experiences', () => {
    const driveTimes = [
      ['07:15', '07:45'],
      ['06:12', '06:32'],
      ['12:01', '13:16']
    ]
    let i = 0
    hardCodedDriversNotSorted.forEach(driver => {
      driver.setTotalDrivingTimeInHrs(driveTimes[i])
      driver.setTotalDrivingDistInMiles(i++)
      driver.setMilesPerHour()
    })

    let expectedDriverOutput = 'Dan: 0 miles\n'
    expectedDriverOutput += 'Alex: 1 miles @ 3 mph\n'
    expectedDriverOutput += 'Bob: 2 miles @ 2 mph\n'
    const driverOutput = getDriversRecordsOutput(hardCodedDriversNotSorted)
    
    expect(driverOutput).toEqual(expectedDriverOutput)
  })

  test('sortDriversByDistInMilesDescending -- should return a list of drivers sorted in DESC order by miles', () => {
    const driversSortedInDescOrderByMiles = sortDriversByDistInMilesDescending(hardCodedDriversNotSorted)
    expect(driversSortedInDescOrderByMiles).toEqual(hardCodedDriversNotSorted)
  })
})