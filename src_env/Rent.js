"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
module.exports = /*#__PURE__*/function () {
  function Rent(id, startDate, endDate) {
    _classCallCheck(this, Rent);
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  _createClass(Rent, [{
    key: "end",
    value: function end() {
      var newEndDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
      if (newEndDate < this.endDate) {
        this.endDate = newEndDate;
        console.log("Rent endDate changed");
        return true;
      } else {
        console.log("Rent has already ended");
        return false;
      }
    }
  }]);
  return Rent;
}();