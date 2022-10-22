"use strict";

var _rentalIdCounter, _damageIdCounter, _sortRentalsChronogically;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var Damage = require("./Damage");
var Rent = require("./Rent");
module.exports = (_rentalIdCounter = /*#__PURE__*/new WeakMap(), _damageIdCounter = /*#__PURE__*/new WeakMap(), _sortRentalsChronogically = /*#__PURE__*/new WeakSet(), /*#__PURE__*/function () {
  function Car(carNumber) {
    var pricePerDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var mileage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var numberOfSeats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
    _classCallCheck(this, Car);
    _classPrivateMethodInitSpec(this, _sortRentalsChronogically);
    _classPrivateFieldInitSpec(this, _rentalIdCounter, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _damageIdCounter, {
      writable: true,
      value: void 0
    });
    this.carNumber = carNumber;
    this.pricePerDay = pricePerDay;
    this.mileage = mileage;
    this.numberOfSeats = numberOfSeats;
    this.rentalList = [];
    _classPrivateFieldSet(this, _rentalIdCounter, 1);
    _classPrivateFieldSet(this, _damageIdCounter, 1);
    this.damageList = [];
  }
  _createClass(Car, [{
    key: "rent",
    value: function rent(startDate, endDate) {
      if (this.isAvailableInInterval(startDate, endDate)) {
        var _this$rentalIdCounter, _this$rentalIdCounter2;
        this.rentalList.push(new Rent(_classPrivateFieldGet(this, _rentalIdCounter), startDate, endDate));
        _classPrivateMethodGet(this, _sortRentalsChronogically, _sortRentalsChronogically2).call(this);
        _classPrivateFieldSet(this, _rentalIdCounter, (_this$rentalIdCounter = _classPrivateFieldGet(this, _rentalIdCounter), _this$rentalIdCounter2 = _this$rentalIdCounter++, _this$rentalIdCounter)), _this$rentalIdCounter2;
        console.log("Car number ".concat(this.carNumber, " rented successfully"));
        return true;
      } else {
        console.log("Car number ".concat(this.carNumber, " can't be rented at that time"));
        return false;
      }
    }
  }, {
    key: "return",
    value: function _return(rentId, newEndDate) {
      var indexOfRent = this.rentalList.findIndex(function (rent) {
        return rent.id === rentId;
      });
      if (newEndDate < this.rentalList[indexOfRent].startDate) {
        console.log("Car number ".concat(this.carNumber, ", rent with id=").concat(rentId, " cancelled"));
        this.rentalList.splice(indexOfRent, 1);
        return true;
      }
      var result = this.rentalList[indexOfRent].end(newEndDate);
      if (result === true) console.log("Car number ".concat(this.carNumber, ", rent with id=").concat(rentId, " endDate is changed to ").concat(newEndDate.toLocaleDateString()));else console.log("Car number ".concat(this.carNumber, ", rent with id=").concat(rentId, " has already ended"));
      return result;
    }
  }, {
    key: "isAvailableInInterval",
    value: function isAvailableInInterval(startDate, endDate) {
      var _iterator = _createForOfIteratorHelper(this.rentalList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rent = _step.value;
          if (startDate >= rent.startDate && startDate <= rent.endDate || endDate >= rent.startDate && endDate <= rent.endDate || startDate <= rent.startDate && endDate >= rent.endDate) {
            console.log("Car ".concat(this.carNumber, " rental isn't available from ").concat(startDate.toLocaleDateString(), " to ").concat(endDate.toLocaleDateString()));
            return false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      console.log("Car ".concat(this.carNumber, " rental is available from ").concat(startDate.toLocaleDateString(), " to ").concat(endDate.toLocaleDateString()));
      return true;
    }
  }, {
    key: "isAvailableAtDate",
    value: function isAvailableAtDate() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
      var _iterator2 = _createForOfIteratorHelper(this.rentalList),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var rent = _step2.value;
          if (date >= rent.startDate && date <= rent.endDate) {
            console.log("Car ".concat(this.carNumber, " rental isn't available at ").concat(date.toLocaleDateString()));
            return false;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      console.log("Car ".concat(this.carNumber, " rental is available at ").concat(date.toLocaleDateString()));
      return true;
    }
  }, {
    key: "addDamage",
    value: function addDamage(damageDescription) {
      var _this$damageIdCounter, _this$damageIdCounter2;
      this.damageList.push(new Damage(_classPrivateFieldGet(this, _damageIdCounter), damageDescription));
      _classPrivateFieldSet(this, _damageIdCounter, (_this$damageIdCounter = _classPrivateFieldGet(this, _damageIdCounter), _this$damageIdCounter2 = _this$damageIdCounter++, _this$damageIdCounter)), _this$damageIdCounter2;
      console.log("Car ".concat(this.carNumber, ", damage:\"").concat(damageDescription, "\" added successfully to the damageList"));
    }
  }]);
  return Car;
}());
function _sortRentalsChronogically2() {
  this.rentalList.sort(function (a, b) {
    return a.startDate - b.startDate;
  });
}