import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role, User } from "@prisma/client";
import { Express } from "express";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { UploadDto } from "./dto";
import { UploadService } from "./upload.service";
import { AwsS3Service } from "../aws/aws.s3.service";

/**
 * This is the API gateway for mass-upload, all requests regarding mass-upload come here
 */
@Controller("upload")
@UseGuards(JwtGuard)
export class UploadController {
  constructor(
      private uploadService: UploadService,
      @Inject(AwsS3Service)
      private awsS3Service: AwsS3Service,
  ) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
  async massUpload(@GetUser() user: User, @UploadedFile() file: Express.Multer.File, @Body() dto: UploadDto): Promise<void> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();
    const filename = await this.awsS3Service.upload(file);
    await this.uploadService.processUpload(filename, dto.mapping, user);
  }
}
