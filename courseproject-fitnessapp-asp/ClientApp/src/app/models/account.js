"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = /** @class */ (function () {
    function Account(
    // public id?: Guid,
    id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
    return Account;
}());
exports.Account = Account;
var Role;
(function (Role) {
    Role[Role["User"] = 0] = "User";
    Role[Role["Admin"] = 1] = "Admin";
})(Role = exports.Role || (exports.Role = {}));
//# sourceMappingURL=account.js.map