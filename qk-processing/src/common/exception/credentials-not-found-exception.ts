import { NotFoundException } from "@nestjs/common";

export class CredentialsNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Credentials with did ${id} not found.`);
  }
}