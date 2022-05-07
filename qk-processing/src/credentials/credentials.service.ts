import { ForbiddenException, Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";

import { CredentialsRepository } from "./credentials.repository";

/**
 * Master class for the work related to credentials
 */
@Injectable()
export class CredentialsService {
  constructor(private credentialsRepository: CredentialsRepository) {
  }

  getCredentials(user: User):string {
    if (user.role === Role.STUDENT) return this.credentialsRepository.getStudentCredentials(user);
    if (user.role === Role.INSTITUTION_REPRESENTATIVE) return this.credentialsRepository.getInstitutionCredentials(user);
    
    throw new ForbiddenException();
  }
}
