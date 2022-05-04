"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteProvider = void 0;
const role_not_found_exception_1 = require("../exceptions/role-not-found.exception");
const routeMapping = new Map([
    ["STUDENT", "/student-dashboard"],
    ["INSTITUTION_REPRESENTATIVE", "/institution-dashboard"],
]);
class RouteProvider {
    onLogin(user) {
        if (routeMapping.has(user.role))
            return routeMapping.get(user.role);
        throw new role_not_found_exception_1.RoleNotFoundException(user.role);
    }
}
exports.RouteProvider = RouteProvider;
//# sourceMappingURL=route-provider.js.map