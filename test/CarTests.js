"use strict";

let expect = require("chai").expect;
require("mocha-sinon");
const Rent = require("../src/Rent");
const Car = require("../src/Car");
const Damage = require("../src/Damage");

describe("Car Tests", function () {
  let car;
  const carNumber = 1;
  const id = 1;
  const id2 = 2;
  const startDate = new Date("2022-10-10");
  const endDate = new Date("2022-11-10");
  const dateBefore = new Date("2022-8-10");
  const dateBefore2 = new Date("2022-9-10");
  const dateDuring = new Date("2022-10-20");
  const dateAfter = new Date("2022-12-10");
  const dateAfter2 = new Date("2022-12-20");
  const damageDescription = "Damage description 2";

  beforeEach(function () {
    this.sinon.stub(console, "log");
    car = new Car(carNumber);
    car.rent(startDate, endDate);
    car.addDamage("Damage description 1");
  });

  // Rent
  it("Car rental success", function () {
    let msg = `Car number ${car.carNumber} rented successfully`;
    car.rent(dateBefore, startDate);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental failed", function () {
    let msg = `Car number ${car.carNumber} can't be rented at that time`;
    car.rent(dateBefore, dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  // Return
  it("Car return success (rent cancelled)", function () {
    let msg = `Car number ${car.carNumber}, rent with id=${id} cancelled`;
    car.return(id, dateBefore);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car return success (rent endDate must be changed to an earlier date)", function () {
    let msg = `Car number ${car.carNumber}, rent with id=${id} endDate is changed to ${dateDuring}`;
    car.return(id, dateDuring);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car return failed (rent has already ended)", function () {
    let msg = `Car number ${car.carNumber}, rent with id=${id} has already ended`;
    car.return(id, dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  // IsAvailableInInterval
  it("Car rental is available in time interval", function () {
    let msg = `Car ${car.carNumber} rental is available from ${dateAfter} to ${dateAfter2}`;
    car.isAvailableInInterval(dateAfter, dateAfter2);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available in time interval (endDate in the middle of another rent)", function () {
    let msg = `Car ${car.carNumber} rental isn't available from ${dateBefore} to ${startDate}`;
    car.isAvailableInInterval(dateBefore, startDate);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available in time interval (startDate in the middle of another rent)", function () {
    let msg = `Car ${car.carNumber} rental isn't available from ${endDate} to ${dateAfter}`;
    car.isAvailableInInterval(endDate, dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available in time interval (another rent in the middle of the range)", function () {
    let msg = `Car ${car.carNumber} rental isn't available from ${dateBefore} to ${dateAfter}`;
    car.isAvailableInInterval(dateBefore, dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  // isAvailableAtDate
  it("Car rental is available at date", function () {
    let msg = `Car ${car.carNumber} rental is available at ${dateAfter}`;
    car.isAvailableAtDate(dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available at date", function () {
    let msg = `Car ${car.carNumber} rental isn't available at ${dateDuring}`;
    car.isAvailableAtDate(dateDuring);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  // AddDamage
  it("Damage added to the damageList successfully", function () {
    car.damageList = [];
    let damageListLength = car.damageList.length;
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
