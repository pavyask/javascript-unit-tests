"use strict";

let expect = require("chai").expect;
const Rent = require("../src/Rent");

describe("Rent Tests", function () {
  let rent;
  const id = 1;
  const startDate = new Date("2022-10-10");
  const endDate = new Date("2022-11-10");
  const dateBefore = new Date("2022-9-10");
  const dateDuring = new Date("2022-10-20");
  const dateAfter = new Date("2022-12-10");

  beforeEach(function () {
    rent = new Rent(id, startDate, endDate);
  });

  // End
  it("Rent endDate must be changed", function () {
    const result = rent.end(dateDuring);
    expect(result).to.be.true;
  });

  it("Rent endDate must not be changed (rent already ended)", function () {
    const result = rent.end(dateAfter);
    expect(result).to.be.false;
  });
});
