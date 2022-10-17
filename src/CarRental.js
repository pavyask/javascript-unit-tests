"use strict";

module.exports = class CarRental {
  constructor() {
    this.carArray = [];
  }

  numberOfRentedCars() {
    let counter = 0;
    this.carArray.forEach((car) => {
      if (car.isAvailable === false) counter++;
    });
    return counter;
  }

  availableCars() {
    let availableCars = [];
    this.carArray.forEach((car) => {
      if (car.isAvailable === true) availableCars.push(car);
    });
    return availableCars;
  }

  mostFrequentlyRentedCars() {
    let carArrayCopy = [...this.carArray];
    carArrayCopy.sort((a, b) => b.rentalList.length - a.rentalList.length);
    return carArrayCopy.slice(0, 10);
  }

  mostFrequentlyDamagedCars() {
    let carArrayCopy = [...this.carArray];
    carArrayCopy.sort((a, b) => b.damageList.length - a.damageList.length);
    return carArrayCopy.slice(0, 10);
  }
};
