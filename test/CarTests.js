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
  const dateBefore = new Date("2022-9-10");
  const dateDuring = new Date("2022-10-20");
  const dateAfter = new Date("2022-12-10");

  beforeEach(function () {
    this.sinon.stub(console, "log");
    car = new Car(carNumber);
    car.rent(id, startDate, endDate);
  });

  // End
  it("Rent succes", function () {
    let msg = `Car number ${car.carNumber} rented successfully`;
    car.rent(id2, dateBefore, startDate);
    expect(console.log.calledOnce).to.be.true;
    expect(console.log.calledWith(msg)).to.be.true;
  });

//   it("Rent failure", function () {
//     let msg = `Rent has already ended`;
//     rent.end(dateAfter);
//     expect(console.log.calledOnce).to.be.true;
//     expect(console.log.calledWith(msg)).to.be.true;
//   });
});
