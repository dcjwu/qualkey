import { Credential, CredentialChange } from "@prisma/client";

/**
 * Data Transfer Object with all data required to show Credentials Info
 */
export class CredentialViewDataDto {
  constructor(
      private readonly credentials: Credential,
      private readonly credentialsChange: CredentialChange,
  ) {
  }
}