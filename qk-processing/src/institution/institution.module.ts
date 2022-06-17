import { Module } from "@nestjs/common";

import { InstitutionRepository } from "./repository/institution.repository";

@Module({
  exports: [InstitutionRepository],
  providers: [InstitutionRepository],
})
export class InstitutionModule {}
