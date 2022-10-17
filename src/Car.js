"use strict";

const Rent = require("./Rent");

module.exports = class Car {
  #available;

  constructor(carNumber, numberOfPassengers, pricePerDay, mileage = 0) {
    this.carNumber = carNumber;
    this.numberOfPassengers = numberOfPassengers;
    this.pricePerDay = pricePerDay;
    this.mileage = mileage;
    this.rentalList = [];
    this.damageList = [];
    this.#available = true;
  }

  rent() {
    if (this.#available === true) {
      this.rentalList.push(new Rent());
      this.#available = false;
      console.log(`Car number ${this.carNumber} rented successfully`);
      return true;
    } else {
      console.log(`Car number ${this.carNumber} can't be rented`);
      return false;
    }
  }

  return() {
    if (this.#available === false) {
      this.rentalList[this.rentalList.length - 1].endDate = new Date();
      this.#available = true;
      console.log(`Car number ${this.carNumber} returned successfully`);
      return true;
    } else {
      console.log(`Car number ${this.carNumber} is not rented`);
      return false;
    }
  }

  isAvailable() {
    return this.#available;
  }

  addDamage(damage) {
    this.damageList.push(damage);
  }
};
