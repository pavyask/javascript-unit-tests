"use strict";

let expect = require("chai").expect;
require("mocha-sinon");
const Rent = require("../src/Rent");
const Car = require("../src/Car");

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

  beforeEach(function () {
    this.sinon.stub(console, "log");
    car = new Car(carNumber);
    car.rent(startDate, endDate);
    car.damageList.push("Damage description 1");
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

  // IsAvailable
  it("Car rental is available at the specified time interval", function () {
    let msg = `Car ${carNumber} rental is available from ${dateAfter} to ${dateAfter2}`;
    car.isAvailable(dateAfter, dateAfter2);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available (endDate in the middle of another rent)", function () {
    let msg = `Car ${carNumber} rental isn't available from ${dateBefore} to ${startDate}`;
    car.isAvailable(dateBefore, startDate);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available (startDate in the middle of another rent)", function () {
    let msg = `Car ${carNumber} rental isn't available from ${endDate} to ${dateAfter}`;
    car.isAvailable(endDate, dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  it("Car rental isn't available (another rent in the middle of the range)", function () {
    let msg = `Car ${carNumber} rental isn't available from ${dateBefore} to ${dateAfter}`;
    car.isAvailable(dateBefore, dateAfter);
    expect(console.log.calledWith(msg)).to.be.true;
  });

  // AddDamage
  it("Damage added to the damageList successfully", function () {
    let damageListLength = car.damageList.length;
    let lastDamage = car.damageList.slice(-1)[0];
    car.isAvailable(dateAfter, dateAfter2);
    expect(console.log.calledWith(msg)).to.be.true;
  });
});
