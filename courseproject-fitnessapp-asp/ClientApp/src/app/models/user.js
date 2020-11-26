"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, account_id, email, username, gender, birthday, goal_id, goal_weight, protein_norm, fats_norm, carbs_norm, kcal_norm, additional_info) {
        this.id = id;
        this.account_id = account_id;
        this.email = email;
        this.username = username;
        this.gender = gender;
        this.birthday = birthday;
        this.goal_id = goal_id;
        this.goal_weight = goal_weight;
        this.protein_norm = protein_norm;
        this.fats_norm = fats_norm;
        this.carbs_norm = carbs_norm;
        this.kcal_norm = kcal_norm;
        this.additional_info = additional_info;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map