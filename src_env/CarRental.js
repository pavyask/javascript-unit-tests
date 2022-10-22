"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
module.exports = /*#__PURE__*/function () {
  function CarRental() {
    _classCallCheck(this, CarRental);
    this.cars = [];
  }
  _createClass(CarRental, [{
    key: "numberOfRentedNowCars",
    value: function numberOfRentedNowCars() {
      var counter = 0;
      var currDate = new Date();
      this.cars.forEach(function (car) {
        if (car.isAvailableAtDate(currDate) === false) counter++;
      });
      return counter;
    }
  }, {
    key: "availableCarsInTimeInterval",
    value: function availableCarsInTimeInterval(startDate, endDate) {
      var availableCars = [];
      this.cars.forEach(function (car) {
        if (car.isAvailableInInterval(startDate, endDate) === true) availableCars.push(car);
      });
      return availableCars;
    }
  }, {
    key: "mostFrequentlyRentedCars",
    value: function mostFrequentlyRentedCars() {
      var carArrayCopy = _toConsumableArray(this.cars);
      carArrayCopy.sort(function (a, b) {
        return b.rentalList.length - a.rentalList.length;
      });
      return carArrayCopy.slice(0, 10);
    }
  }, {
    key: "mostFrequentlyDamagedCars",
    value: function mostFrequentlyDamagedCars() {
      var carArrayCopy = _toConsumableArray(this.cars);
      carArrayCopy.sort(function (a, b) {
        return b.damageList.length - a.damageList.length;
      });
      return carArrayCopy.slice(0, 10);
    }
  }]);
  return CarRental;
}();