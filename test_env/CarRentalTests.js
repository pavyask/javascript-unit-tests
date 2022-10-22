"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var expect = require("chai").expect;
var Rent = require("../src/Rent");
var Car = require("../src/Car");
var Damage = require("../src/Damage");
var CarRental = require("../src/CarRental");
var damageDataSet = new Set();
["Front bumper damage", "Back bumper damage", "Broken headlights", "Fender damage", "Car grill damage", "Wheels damage", "Scratches in the paint", "Dings in the hood", "Dings in the windshield", "Punctured tires", "Road rash” on wheels"].forEach(function (item) {
  return damageDataSet.add(item);
});
function rentNTimes(car, n) {
  for (var i = 0; i < n; i++) {
    var date1 = new Date();
    date1.setDate(date1.getDate() + i * 2);
    var date2 = new Date();
    date2.setDate(date2.getDate() + (i * 2 + 1));
    car.rentalList.push(new Rent(i + 1, date1, date2));
  }
}
function damegeNTimes(car, n) {
  for (var i = 0; i < n; i++) {
    car.damageList.push(new Damage(i + 1, function (damageDataSet) {
      return _toConsumableArray(damageDataSet)[Math.floor(Math.random() * damageDataSet.size)];
    }));
  }
}
describe("CarRental Tests", function () {
  var currDate = new Date();
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterMonth = new Date();
  afterMonth.setMonth(afterMonth.getMonth() + 1);
  var after2Month = new Date();
  after2Month.setMonth(after2Month.getMonth() + 2);
  var expectedMostDamagedCars = [];
  var expectedMostRentedCars = [];
  var carsAmount = 20;
  var rentedNowCars = [];
  var rentedAfterNextMonth = [];
  for (var i = 0; i < carsAmount / 2; i++) {
    var car = new Car(i);
    car.rent(yesterday, tomorrow);
    rentedNowCars.push(car);
  }
  for (var _i = carsAmount / 2; _i < carsAmount; _i++) {
    var _car = new Car(_i);
    _car.rent(afterMonth, after2Month);
    rentedAfterNextMonth.push(_car);
  }
  for (var _i2 = carsAmount + 10; _i2 > carsAmount; _i2--) {
    var _car2 = new Car(_i2);
    rentNTimes(_car2, _i2);
    expectedMostRentedCars.push(_car2);
  }
  for (var _i3 = carsAmount + 20; _i3 > carsAmount + 10; _i3--) {
    var _car3 = new Car(_i3);
    damegeNTimes(_car3, _i3);
    expectedMostDamagedCars.push(_car3);
  }
  var carRental = new CarRental();
  carRental.cars = rentedNowCars.concat(rentedAfterNextMonth);

  // NumberOfRentedNowCars
  it("Number of rented now cars must be equal to ".concat(rentedNowCars.length), function () {
    var result = carRental.numberOfRentedNowCars();
    expect(result).to.eql(rentedNowCars.length);
  });

  // AvailableCarsInTimeInterval
  it("Available cars from ".concat(yesterday.toLocaleDateString(), " to ").concat(tomorrow.toLocaleDateString(), " must be cars from rentedAfterNextMonth array"), function () {
    var carsAvailable = carRental.availableCarsInTimeInterval(yesterday, tomorrow);
    expect(carsAvailable).to.eql(rentedAfterNextMonth);
  });

  // MostFrequentlyRentedCars
  it("Most frequently rented cars must be from expectedMostRentedCars array", function () {
    carRental.cars = carRental.cars.concat(expectedMostRentedCars);
    var mostRentedCars = carRental.mostFrequentlyRentedCars();
    expect(mostRentedCars).to.eql(expectedMostRentedCars);
  });
  // MostFrequentlyDamagedCars;
  it("Most frequently rented cars must be from expectedMostDamagedCars array", function () {
    carRental.cars = carRental.cars.concat(expectedMostDamagedCars);
    var mostDamagedCars = carRental.mostFrequentlyDamagedCars();
    expect(mostDamagedCars).to.eql(expectedMostDamagedCars);
  });
});