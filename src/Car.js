"use strict";

const Rent = require("./Rent");

module.exports = class Car {
  #rentalIdCounter;

  constructor(carNumber, pricePerDay = 20, mileage = 0, numberOfSeats = 5) {
    this.carNumber = carNumber;
    this.pricePerDay = pricePerDay;
    this.mileage = mileage;
    this.numberOfSeats = numberOfSeats;
    this.rentalList = [];
    this.#rentalIdCounter = 1;
    this.damageList = [];
  }

  rent(startDate, endDate) {
    if (this.isAvailable(startDate, endDate)) {
      this.rentalList.push(new Rent(this.#rentalIdCounter, startDate, endDate));
      this.#sortRentalList();
      this.#rentalIdCounter++;
      console.log(`Car number ${this.carNumber} rented successfully`);
      return true;
    } else {
      console.log(`Car number ${this.carNumber} can't be rented at that time`);
      return false;
    }
  }

  return(rentId, newEndDate) {
    const indexOfRent = this.rentalList.findIndex((rent) => rent.id === rentId);

    if (newEndDate < this.rentalList[indexOfRent].startDate) {
      console.log(
        `Car number ${this.carNumber}, rent with id=${rentId} cancelled`
      );
      this.rentalList.splice(indexOfRent, 1);
      return true;
    }

    let result = this.rentalList[indexOfRent].end(newEndDate);
    if (result === true)
      console.log(
        `Car number ${this.carNumber}, rent with id=${rentId} endDate is changed to ${newEndDate}`
      );
    else
      console.log(
        `Car number ${this.carNumber}, rent with id=${rentId} has already ended`
      );
    return result;
  }

  // whenAvailable() {}

  isAvailable(startDate, endDate) {
    for (const rent of this.rentalList) {
      if (
        (startDate >= rent.startDate && startDate <= rent.endDate) ||
        (endDate >= rent.startDate && endDate <= rent.endDate) ||
        (startDate <= rent.startDate && endDate >= rent.endDate)
      ) {
        console.log(
          `Car ${this.carNumber} rental isn't available from ${startDate} to ${endDate}`
        );
        return false;
      }
    }
    console.log(
      `Car ${this.carNumber} rental is available from ${startDate} to ${endDate}`
    );
    return true;
  }

  addDamage(damage) {
    this.damageList.push(damage);
    console.log(
      `Car ${this.carNumber}, damage:"${damage}" added successfully to the damageList`
    );
  }

  #sortRentalList() {
    this.rentalList.sort((a, b) => a.startDate - b.startDate);
  }
};
