"use strict";

let expect = require("chai").expect;
const Car = require("../src/Car");

describe("Car Tests", function () {
  let car;
  const carNumber = 1;
  const id = 1;
  const startDate = new Date("2022-10-10");
  const endDate = new Date("2022-11-10");
  const dateBefore = new Date("2022-8-10");
  const dateBefore2 = new Date("2022-9-10");
  const dateDuring = new Date("2022-10-20");
  const dateAfter = new Date("2022-12-10");
  const dateAfter2 = new Date("2022-12-20");
  const damageDescription = "Damage description 2";

  beforeEach(function () {
    car = new Car(carNumber);
    car.rent(startDate, endDate);
    car.addDamage("Damage description 1");
  });

  // Rent
  it("Car rental success", function () {
    const result = car.rent(dateBefore, dateBefore2);
    expect(result).to.be.true;
  });

  it("Car rental failed", function () {
    const result = car.rent(dateBefore, dateAfter);
    expect(result).to.be.false;
  });

  // Return
  it("Car return success (rent cancelled)", function () {
    const result = car.return(id, dateBefore);
    expect(result).to.be.true;
  });

  it("Car return success (rent endDate must be changed to an earlier date)", function () {
    const result = car.return(id, dateDuring);
    expect(result).to.be.true;
  });

  it("Car return failed (rent has already ended)", function () {
    const result = car.return(id, dateAfter);
    expect(result).to.be.false;
  });

  // IsAvailableInInterval
  it("Car rental is available in time interval", function () {
    const result = car.isAvailableInInterval(dateAfter, dateAfter2);
    expect(result).to.be.true;
  });

  it("Car rental isn't available in time interval (endDate in the middle of another rent)", function () {
    const result = car.isAvailableInInterval(dateBefore, startDate);
    expect(result).to.be.false;
  });

  it("Car rental isn't available in time interval (startDate in the middle of another rent)", function () {
    const result = car.isAvailableInInterval(endDate, dateAfter);
    expect(result).to.be.false;
  });

  it("Car rental isn't available in time interval (another rent in the middle of the range)", function () {
    const result = car.isAvailableInInterval(dateBefore, dateAfter);
    expect(result).to.be.false;
  });

  // isAvailableAtDate
  it("Car rental is available at date", function () {
    const reuslt = car.isAvailableAtDate(dateAfter);
    expect(reuslt).to.be.true;
  });

  it("Car rental isn't available at date", function () {
    const result = car.isAvailableAtDate(dateDuring);
    expect(result).to.be.false;
  });

  // AddDamage
  it("Damage added to the damageList successfully", function () {
    car.damageList = [];
    const damageListLength = car.damageList.length;
    car.addDamage(damageDescription);
    expect(car.damageList.length).to.eql(damageListLength + 1);
    expect(car.damageList.slice(-1)[0].damageDescription).to.eql(
      damageDescription
    );
  });

  // SortRentalsChronogically
  it("Rental list sorted successfully (Rent.startDate ascending)", function () {
    car.rentalList = [];

    const rentDates1 = [new Date("2000-10-10"), new Date("2001-11-10")];
    const rentDates2 = [new Date("2001-11-11"), new Date("2001-11-13")];
    const rentDates3 = [new Date("2001-12-13"), new Date("2002-10-10")];
    const rentDates4 = [new Date("2003-09-22"), new Date("2004-11-27")];
    const rentDates5 = [new Date("2005-03-11"), new Date("2005-11-12")];

    car.rent(rentDates4[0], rentDates4[1]);
    car.rent(rentDates5[0], rentDates5[1]);
    car.rent(rentDates2[0], rentDates2[1]);
    car.rent(rentDates1[0], rentDates1[1]);
    car.rent(rentDates3[0], rentDates3[1]);

    expect(car.rentalList[0].startDate).to.eql(rentDates1[0]);
    expect(car.rentalList[1].startDate).to.eql(rentDates2[0]);
    expect(car.rentalList[2].startDate).to.eql(rentDates3[0]);
    expect(car.rentalList[3].startDate).to.eql(rentDates4[0]);
    expect(car.rentalList[4].startDate).to.eql(rentDates5[0]);
  });
});
