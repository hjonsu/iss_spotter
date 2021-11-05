const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require("./iss");


// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);

// });

// fetchCoordsByIP((err, coords) => {
//   if (err) {
//     console.log("It didn't work", err);
//     return;
//   }
//   console.log('It worked! The coords are:', coords);

// });

// fetchISSFlyOverTimes({
//   latitude: 20,
//   longitude: 20
// }, (err, flytimes) => {
//   if (err) {
//     console.log("It didn't work", err);
//     return;
//   }
//   console.log('It worked! The coords are:', flytimes);

// });

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});