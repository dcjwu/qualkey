import {
  Body,
  Controller,
  ForbiddenException, HttpCode, HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role, User } from "@prisma/client";
import { Express } from "express";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { AwsS3Service } from "../aws/aws.s3.service";
import { UploadDecisionDto, UploadDto } from "./dto";
import { UploadService } from "./upload.service";

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

  /**
   * Post mass-upload endpoint
   */
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async massUpload(@GetUser() user: User, @UploadedFile() file: Express.Multer.File, @Body() dto: UploadDto): Promise<void> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();
    const filename = await this.awsS3Service.upload(file);
    await this.uploadService.processUpload(filename, dto.mapping, user);
  }

  /**
   * Approve mass-upload endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("approve")
  async approveUpload(
      @GetUser() user: User,
      @Body() dto: UploadDecisionDto,
  ): Promise<void> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();

    await this.uploadService.approveUpload(dto.uuid, user, Number(dto.actionId));
  }

  /**
   * Reject mass-upload endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("reject")
  async rejectUpload(
      @GetUser() user: User,
      @Body() dto: UploadDecisionDto,
  ): Promise<void> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();

    await this.uploadService.rejectUpload(dto.uuid, user);
  }
}
