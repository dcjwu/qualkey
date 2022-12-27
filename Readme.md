#### Context:
__April 2022 - August 2022.__ Development of commercial application MVP to manage credentials of graduates made by Alexey Kucenko (frontend and auth) and Igor Abramov (rest of the backend). The main idea was to make process of certificate validation easier to potential employers.

#### Description:
- 2FA login with OTP
- Roles: Admin, SuperAdmin, Institution, Student
- CSV file upload with error handling, fields checking and then map in to the database
- Upload credentials data to Hedera Hashgraph
- Credential activation through Stripe API
- Credentials withdrawal, expiration, etc synced with Hedara Hashgraph
- Internal notifications
- Credentials sharing to potential employers

#### Technologies used:
- NestJS
- Next.js
- Hedera SDK
- Solidity

#### Status:
MVP is finished.

#### After cloning the project start it by executing this command: ```make go```


