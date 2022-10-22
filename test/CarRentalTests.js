"use strict";

let expect = require("chai").expect;

const Rent = require("../src/Rent");
const Car = require("../src/Car");
const Damage = require("../src/Damage");
const CarRental = require("../src/CarRental");

const damageDataSet = new Set();
[
  "Front bumper damage",
  "Back bumper damage",
  "Broken headlights",
  "Fender damage",
  "Car grill damage",
  "Wheels damage",
  "Scratches in the paint",
  "Dings in the hood",
  "Dings in the windshield",
  "Punctured tires",
  "Road rash” on wheels",
].forEach((item) => damageDataSet.add(item));

function rentNTimes(car, n) {
  for (let i = 0; i < n; i++) {
    let date1 = new Date();
    date1.setDate(date1.getDate() + i * 2);
    let date2 = new Date();
    date2.setDate(date2.getDate() + (i * 2 + 1));
    car.rentalList.push(new Rent(i + 1, date1, date2));
  }
}

function damegeNTimes(car, n) {
  for (let i = 0; i < n; i++) {
    car.damageList.push(
      new Damage(
        i + 1,
        (damageDataSet) =>
          [...damageDataSet][Math.floor(Math.random() * damageDataSet.size)]
      )
    );
  }
}

describe("CarRental Tests", function () {
  const currDate = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let afterMonth = new Date();
  afterMonth.setMonth(afterMonth.getMonth() + 1);
  let after2Month = new Date();
  after2Month.setMonth(after2Month.getMonth() + 2);

  const expectedMostDamagedCars = [];
  const expectedMostRentedCars = [];
  const carsAmount = 20;
  const rentedNowCars = [];
  const rentedAfterNextMonth = [];

  for (let i = 0; i < carsAmount / 2; i++) {
    let car = new Car(i);
    car.rent(yesterday, tomorrow);
    rentedNowCars.push(car);
  }

  for (let i = carsAmount / 2; i < carsAmount; i++) {
    let car = new Car(i);
    car.rent(afterMonth, after2Month);
    rentedAfterNextMonth.push(car);
  }
  for (let i = carsAmount + 10; i > carsAmount; i--) {
    let car = new Car(i);
    rentNTimes(car, i);
    expectedMostRentedCars.push(car);
  }

  for (let i = carsAmount + 20; i > carsAmount + 10; i--) {
    let car = new Car(i);
    damegeNTimes(car, i);
    expectedMostDamagedCars.push(car);
  }

  let carRental = new CarRental();
  carRental.cars = rentedNowCars.concat(rentedAfterNextMonth);

  // NumberOfRentedNowCars
  it(`Number of rented now cars must be equal to ${rentedNowCars.length}`, function () {
    const result = carRental.numberOfRentedNowCars();
    expect(result).to.eql(rentedNowCars.length);
  });

  // AvailableCarsInTimeInterval
  it(`Available cars from ${yesterday.toLocaleDateString()} to ${tomorrow.toLocaleDateString()} must be cars from rentedAfterNextMonth array`, function () {
    const carsAvailable = carRental.availableCarsInTimeInterval(
      yesterday,
      tomorrow
    );
    expect(carsAvailable).to.eql(rentedAfterNextMonth);
  });

  // MostFrequentlyRentedCars
  it(`Most frequently rented cars must be from expectedMostRentedCars array`, function () {
    carRental.cars = carRental.cars.concat(expectedMostRentedCars);
    const mostRentedCars = carRental.mostFrequentlyRentedCars();
    expect(mostRentedCars).to.eql(expectedMostRentedCars);
  });
  // MostFrequentlyDamagedCars;
  it(`Most frequently rented cars must be from expectedMostDamagedCars array`, function () {
    carRental.cars = carRental.cars.concat(expectedMostDamagedCars);
    const mostDamagedCars = carRental.mostFrequentlyDamagedCars();
    expect(mostDamagedCars).to.eql(expectedMostDamagedCars);
  });
});
