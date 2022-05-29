import { NotFoundException } from "@nestjs/common";

export class CredentialsNotFoundException extends NotFoundException {
  constructor(did: string) {
    super(`Credentials with did ${did} not found.`);
  }
}