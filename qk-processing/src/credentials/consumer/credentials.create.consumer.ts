import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { User } from "@prisma/client";
import { Job } from "bull";

import { UserFactory } from "../../user/user.factory";
import { UserRepository } from "../../user/user.repository";
import { CredentialsChangeFactory } from "../credentials-change.factory";
import { CredentialsChangeRepository } from "../credentials-change.repository";
import { CredentialsFactory } from "../credentials.factory";
import { CredentialHashableDataDto } from "../dto/credential.hashable-data.dto";
import { Hasher } from "../helper/hasher";

@Processor("credentials-create")
export class CredentialsCreateConsumer {
  constructor(
        private userFactory: UserFactory,
        private userRepository: UserRepository,
        private credentialsFactory: CredentialsFactory,
        private credentialsChangeFactory: CredentialsChangeFactory,
        private credentialsChangeRepository: CredentialsChangeRepository,
  ) {
  }

    @Process("create")
  async handleCreate(job: Job): Promise<void> {
    Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
    const dto: CredentialHashableDataDto = job.data.credentialHashableDataDto;

    try {
      const dataHash = Hasher.hash(JSON.stringify(dto));

      // check if credentialChange has such hash
      if (await this.credentialsChangeRepository.hasHash(dataHash)) {
        // if yes - warn and stop creating credentials
        Logger.warn(`CredentialsChange with hash ${dataHash} already exists`);
        await job.moveToCompleted();
        return;
      }

      // check if user exists
      let user: User;
      if (await this.userRepository.has(dto.email)) {
        Logger.debug(`User with email - ${dto.email} already exists`);
        user = await this.userRepository.get(dto.email);
      } else {
        Logger.debug(`User with email - ${dto.email} does not exists, creating...`);
        user = await this.userFactory.createStudent(dto.email, dto.graduatedName);
        Logger.debug(`User created - ${dto.email}`);
      }

      // create credentials and credentialsChange
      const credentials = await this.credentialsFactory.create(dto, user);
      Logger.debug(`Credentials created - ${credentials.uuid}`);
      const credentialsChange = await this.credentialsChangeFactory.create(credentials, dataHash);
      Logger.debug(`CredentialsChange created - ${credentialsChange.id}`);

      // TODO: save to SC
    } catch (err) {
      Logger.error(err, err.stack);
      return;
    }
    await job.moveToCompleted();
  }

    @OnQueueActive()
    onActive(job: Job): void {
      Logger.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
}