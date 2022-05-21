import { OnEvent } from "@nestjs/event-emitter";

import { CredentialsCheckEvent } from "../event/credentials.check-event";

export class CredentialsEventListener {

    @OnEvent("credentials.check")
  async handleCredentialsCheckEvent(event: CredentialsCheckEvent): Promise<void> {
    console.log(event.credentialHashableDataDto);
  }
}