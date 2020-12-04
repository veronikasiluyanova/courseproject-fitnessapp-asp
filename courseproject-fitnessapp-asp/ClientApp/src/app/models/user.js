"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, 
    // public account_id?: Guid,
    account_id, email, username, gender, birthday, goal_id, start_weight, goal_weight, height, activity, protein_norm, fats_norm, carbs_norm, kcal_norm, water_norm) {
        this.id = id;
        this.account_id = account_id;
        this.email = email;
        this.username = username;
        this.gender = gender;
        this.birthday = birthday;
        this.goal_id = goal_id;
        this.start_weight = start_weight;
        this.goal_weight = goal_weight;
        this.height = height;
        this.activity = activity;
        this.protein_norm = protein_norm;
        this.fats_norm = fats_norm;
        this.carbs_norm = carbs_norm;
        this.kcal_norm = kcal_norm;
        this.water_norm = water_norm;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map