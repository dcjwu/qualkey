import { Role, User } from "@prisma/client";

import { RoleNotFoundException } from "../exception";
import { RouteProvider } from "./route.provider";

describe("Route Provider Unit Tests", () => {
  const routeProvider: RouteProvider = new RouteProvider();

  const dataSet = [
    [Role.STUDENT, "/student-dashboard"],
    [Role.INSTITUTION_REPRESENTATIVE, "/institution-dashboard"],
  ];

  it.each(dataSet)("Should return correct redirect link", (role: Role, link: string) => {
    const user: User = {
      uuid: "uuid2",
      email: "",
      password: "",
      role: role,
      createdAt: undefined,
      updatedAt: undefined,
      firstName: "",
      lastName: "",
    };
    expect(routeProvider.onLogin(user)).toEqual(link);
  });

  it("Should throw error on incorrect role", () => {
    const user: User = {
      uuid: "uuid2",
      email: "",
      password: "",
      role: Role.ADMIN,
      createdAt: undefined,
      updatedAt: undefined,
      firstName: "",
      lastName: "",
    };
    expect(() => routeProvider.onLogin(user)).toThrowError(new RoleNotFoundException(user.role));
    expect(() => routeProvider.onLogin(user)).toThrowError(`Role not found ${user.role}`);
  });
});