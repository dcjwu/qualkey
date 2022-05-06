"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteProvider = void 0;
const exception_1 = require("../exception");
const routeMapping = new Map([
    ["STUDENT", "/dashboard"],
    ["INSTITUTION_REPRESENTATIVE", "/dashboard"],
]);
class RouteProvider {
    onLogin(user) {
        if (routeMapping.has(user.role))
            return routeMapping.get(user.role);
        throw new exception_1.RoleNotFoundException(user.role);
    }
}
exports.RouteProvider = RouteProvider;
//# sourceMappingURL=route.provider.js.map