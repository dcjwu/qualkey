import { Credential, CredentialChange } from "@prisma/client";

/**
 * Data Transfer Object with all data required to show Credentials Info
 */
export class CredentialViewDataDto {
  // TODO: delete
  constructor(
      private readonly credentials: Credential,
      private readonly credentialsChange: CredentialChange,
  ) {
  }
}