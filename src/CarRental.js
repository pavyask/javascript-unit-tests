"use strict";

module.exports = class CarRental {
  constructor() {
    this.carArray = [];
  }

  numberOfRentedCars() {
    let counter = 0;
    let currDate = new Date();
    this.carArray.forEach((car) => {
      if (car.isAvailableAtDate(currDate) === false) counter++;
    });
    return counter;
  }

  availableCarsInTimeInterval(startDate, endDate) {
    let availableCars = [];
    this.carArray.forEach((car) => {
      if (car.isAvailableInInterval(startDate, endDate) === true)
        availableCars.push(car);
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