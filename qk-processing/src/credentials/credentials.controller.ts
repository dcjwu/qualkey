import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";

import { Roles } from "../auth/decorator";
import { JwtGuard, RolesGuard } from "../auth/guard";
import { CredentialsService } from "./credentials.service";

@Controller("credentials")
@UseGuards(JwtGuard)
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) {}
  
    @HttpCode(HttpStatus.OK)
    @Get("student")
    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
  getStudentCredentials():string {
    return this.credentialsService.getStudentCredentials();
  }

  @HttpCode(HttpStatus.OK)
  @Get("institution")
  @UseGuards(RolesGuard)
  @Roles(Role.INSTITUTION_REPRESENTATIVE)
    getInstitutionCredentials():string {
      return this.credentialsService.getInstitutionCredentials();
    }
}
