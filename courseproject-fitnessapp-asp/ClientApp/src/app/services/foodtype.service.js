"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FoodTypeService = /** @class */ (function () {
    function FoodTypeService(http) {
        this.http = http;
        this.url = "api/FoodTypes";
    }
    FoodTypeService.prototype.getFoodTypes = function () {
        return this.http.get(this.url + '/');
    };
    FoodTypeService.prototype.getFoodType = function (id) {
        return this.http.get(this.url + '/' + id);
    };
    FoodTypeService.prototype.createFoodType = function (newtype) {
        return this.http.post(this.url, newtype);
    };
    FoodTypeService.prototype.deleteFoodType = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    return FoodTypeService;
}());
exports.FoodTypeService = FoodTypeService;
//# sourceMappingURL=foodtype.service.js.map