"use strict";

module.exports = class Rent {
  constructor(startDate = new Date()) {
    this.startDate = startDate;
    this.endDate = undefined;
  }
};
