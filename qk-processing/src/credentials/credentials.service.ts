import { Injectable } from "@nestjs/common";

@Injectable()
export class CredentialsService {

  getStudentCredentials():string {
    return JSON.stringify("Student dashboard page!");
  }

  getInstitutionCredentials():string {
    return JSON.stringify("Institution dashboard page!");
  }
}
