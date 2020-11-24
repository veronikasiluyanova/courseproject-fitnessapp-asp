"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FoodService = /** @class */ (function () {
    function FoodService(http) {
        this.http = http;
        this.url = "api/FoodItems";
    }
    FoodService.prototype.getFoodItems = function () {
        return this.http.get(this.url + '/');
    };
    FoodService.prototype.getFoodItem = function (id) {
        return this.http.get(this.url + '/' + id);
    };
    FoodService.prototype.createFoodItem = function (newitem) {
        return this.http.post(this.url, newitem);
    };
    FoodService.prototype.updateFoodItem = function (item) {
        return this.http.put(this.url, item);
    };
    FoodService.prototype.deleteFoodItem = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    return FoodService;
}());
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map