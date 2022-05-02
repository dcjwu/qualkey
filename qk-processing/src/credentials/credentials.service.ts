import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { CredentialsRepository } from "./credentials.repository";

@Injectable()
export class CredentialsService {
  constructor(private credentialsRepository: CredentialsRepository) {
  }

  getCredentials(user: User):string {
    if (user.role === "STUDENT") return this.credentialsRepository.getStudentCredentials(user);
    if (user.role === "INSTITUTION_REPRESENTATIVE") return this.credentialsRepository.getInstitutionCredentials(user);
    
    throw new ForbiddenException();
  }
}
