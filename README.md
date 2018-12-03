# Root Coding Challenge

![Node](https://img.shields.io/badge/NodeJS-10.14.1-brightgreen.svg?style=flat-square)


## Usage
- Clone this repo or download the zip file

- From inside the root directory of this project install the dependencies using either `yarn` or `npm i`

- After dependencies have been installed you need to build the project using `yarn build` or `npm build`. This will trigger webpack to place all relevant code into a single minimized file at `<root dir>/build/main.js`.

- From the root directory we can now run the application in our command line using `node build/main.js src/resources/input.txt` and you will get a list of drivers including their mileage and speed.


## Approach
Knowing that this application requires a single file with a list of drivers including their name, distance driven, and how long each trip took the driver, NodeJS comes with a built-in library, `FileSystem` a.k.a. `fs`.

Using `fs`, we can asynchronously read the entire file with `fs.readFile()` and return the file as a single string. The only downside of using this method is the nature of asynchronous methods. You never know when the method will return the data so any code that needs to work with the returning data must be within the scope of the asynchronous method, but the pros of using a non-blocking method greatly outweighs this small con.

To make working with the `fs` module from Node easier, I decided to wrap the entire method, `fs.readFile()`, in a `Promise`. Using a Promise in this way makes the code more predictable in that we know something will be returned, either through the `resolve` or `reject` methods that come with a JavaScript Promise.

If a proper file has been given as an argument to the application, in this case `input.txt`, we know that each line will have one of two available commands, `Driver`, and `Trip`, and each line will end with a newline unless it is the last line of the file.

Given the `Driver` command we know we will only find the drivers first name after the command, e.g. `Driver Dan`. This set up of `[command, name]` format allows us to easily create a HashMap consisting of drivers names. This HashMap allows for extremely quick lookups of existing drivers, `O(1) time complexity`, and for whatever reason we can also loop over each `key` in the HashMap as if it were an aray. Note that I am referring to a JavaScript Object Literal as a HashMap as they both can be used to achieve the same result.

When presented with a `Driver` command, we use the `split()` method built in to JavaScript to split the line at every white space character. This gives us an array that we can use to quickly create new `keys` in the HashMap containing a new driver which is created using the `Driver` class found in `Driver.js`. Creating a single class to represent each driver makes dealing with driver-specific logic a lot easier because now each instance of a driver handles its own internal values. Not only that, but all we need to do is instantiate a new instance of a driver by calling the `Driver constructor` method, pass in the drivers name, and now each method built in to the Driver class can be used the exact same way and it does not matter who the driver is.

The next available command we will find in the input file is going to be the `Trip` command. The `Trip` command comes with four additional arguments representing the drivers trip including: driver name, time trip started, time trip ended, and the total distance in miles for this trip. Now that we've created this HashMap containing each driver, we can use the drivers name given to us in the `Trip` to know exactly where to put this new trip data. So given the `Trip` command, we call each relevant method on this particular Driver: `setTotalDrivingDistInMiles`, `setTotalDrivingTimeInHrs`, `setMilesPerHour`, which will set the value for each corresponding property on that particular driver.

Given a distance of miles, all we need to do is add the current distance of miles with the new distance in the `Trip` command to get a total distance. Calculating the total drive time of each trip is a little tricky. We need to convert the drive time to a decimal that accurately displays the amount of time each trip took. So given a trip time of `07:15 - 07:45`, we know this is 30 minutes but how do we let a computer know? Separating the `hour` and `minutes` from a given time, we can convert this with `T = h + (m / 60)` or `T = 7 + (45 / 60)`.

- T = time
- h = hour
- m = minute

Once we convert each trips time, we then subtract the end time with the start time to get the total amount of time this trip took. `(endHour + endMinute / 60) - (startHour + startMinute / 60)` or `T = (7 + (45 / 60)) - (7 + (15 / 60))`.

Once the total distance and total trip time have been calculated and saved for each driver we can now calculate each drivers speed during the trip. Given the formula `s = d / t`

- s = speed
- d = distance
- t = time

We can take the total distance of a trip and divide that by the total amount of time for each trip.

Now that the difficult part is over, it's finally time to build an output string that will be logged to the users terminal. We need to make sure the output is in **descending** order by each drivers trip distance, but make sure to omit drivers going under 5mph and over 100mph, while including drivers who did not take a trip at all, i.e. drivers that have 0 miles as their trip distance.

We have the ability to loop over the drivers HashMap and we do. For each driver we make sure to call the `toString()` method, built in to the Driver class, which returns a string containing information about the driver. After each driver has had a chance to build their own unique string, then each string is saved into a variable and returned from the `readDriversRecordsFile()` function.

Lastly, because the `readDriversRecordsFile()` function returns a `Promise` we can use the `async/await` syntax to `await` the `async`hronous call from `readDriversRecordsFile()`. After the `Promise` has been returned, we use the `.then()` chain to log the drivers records to the users terminal.