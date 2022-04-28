import { User } from "@prisma/client";

import { RoleNotFoundException } from "../exceptions/role-not-found.exception";

const routeMapping = new Map([
  ["STUDENT", "/student-dashboard"],
  ["INSTITUTION_REPRESENTATIVE", "/institution-dashboard"],
]);

export class RouteProvider {
    
  onLogin(user: User):string {
    if (routeMapping.has(user.role)) return routeMapping.get(user.role);

    throw new RoleNotFoundException(user.role);
  }
}