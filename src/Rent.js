"use strict";

module.exports = class Rent {
  constructor(id, startDate, endDate) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  end(newEndDate = new Date()) {
    if (newEndDate < this.endDate) {
      // if (newEndDate < this.startDate) this.startDate = newEndDate;
      this.endDate = newEndDate;
      console.log(`Rent endDate changed`);
      return true;
    } else {
      console.log(`Rent has already ended`);
      return false;
    }
  }
};
