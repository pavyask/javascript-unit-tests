"use strict";

module.exports = class Car {
  #rentalList = [];
  #damageList = [];

  constructor(carNumber, pricePerDay, mileage = 0, numberOfPassengers = 0) {
    this.carNumber = carNumber;
    this.pricePerDay = pricePerDay;
    this.mileage = mileage;
    this.numberOfPassengers = numberOfPassengers;
  }

  rent() {}

  return() {}

  whenAvailable() {}

  addDamage(damage) {}
};
