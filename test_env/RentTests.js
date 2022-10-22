"use strict";

var expect = require("chai").expect;
var Rent = require("../src/Rent");
describe("Rent Tests", function () {
  var rent;
  var id = 1;
  var startDate = new Date("2022-10-10");
  var endDate = new Date("2022-11-10");
  var dateBefore = new Date("2022-9-10");
  var dateDuring = new Date("2022-10-20");
  var dateAfter = new Date("2022-12-10");
  beforeEach(function () {
    rent = new Rent(id, startDate, endDate);
  });

  // End
  it("Rent endDate must be changed", function () {
    var result = rent.end(dateDuring);
    expect(result).to.be["true"];
  });
  it("Rent endDate must not be changed (rent already ended)", function () {
    var result = rent.end(dateAfter);
    expect(result).to.be["false"];
  });
});