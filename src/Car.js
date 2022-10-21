"use strict";

const Rent = require("./Rent");

module.exports = class Car {
  constructor(carNumber, pricePerDay = 20, mileage = 0, numberOfSeats = 5) {
    this.carNumber = carNumber;
    this.pricePerDay = pricePerDay;
    this.mileage = mileage;
    this.numberOfSeats = numberOfSeats;
    this.rentalList = [];
    this.damageList = [];
  }

  rent(id, startDate, endDate) {
    if (this.isAvailable(startDate, endDate)) {
      this.rentalList.push(new Rent(id, startDate, endDate));
      this.#sortRentalList();
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
      rentalList.splice(indexOfRent, 1);
      return true;
    }

    let result = this.rentalList[indexOfRent].end(newEndDate);
    return result;
  }

  // whenAvailable() {}

  isAvailable(startDate, endDate) {
    for (const rent of this.rentalList) {
      if (
        (startDate > rent.startDate && startDate < rent.endDate) ||
        (endDate > rent.startDate && endDate < rent.endDate) ||
        (startDate < rent.startDate && endDate > rent.endDate)
      )
        return false;
    }
    return true;
  }

  addDamage(damage) {
    this.damageList.push(damage);
  }

  #sortRentalList() {
    rentalList.sort((a, b) => a.startDate - b.startDate);
  }
};
