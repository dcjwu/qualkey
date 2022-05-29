import {
  Body,
  Controller,
  ForbiddenException, Get,
  Inject,
  Post, Query, StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role, Upload, User } from "@prisma/client";
import { Express } from "express";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { AwsS3Service } from "../aws/aws.s3.service";
import { PrismaService } from "../prisma/prisma.service";
import { UploadDto, UploadGetFileDto } from "./dto";
import { UploadApprovedEvent } from "./event";
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
      private eventEmitter: EventEmitter2,
      private prisma: PrismaService,
  ) {}

  @Get("test")
  async getMe(@GetUser() user: User, @Query("uuid") uuid: string): Promise<void> {
    const upload = await this.prisma.upload.findUnique({ where:{ uuid: uuid } });
    const uploadApprovedEvent = new UploadApprovedEvent();
    uploadApprovedEvent.upload = upload;
    uploadApprovedEvent.representatives = [];
    uploadApprovedEvent.approvedBy = user;
    this.eventEmitter.emit("upload.approved", uploadApprovedEvent);
  }

  /**
   * Post mass-upload endpoint
   */
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async massUpload(@GetUser() user: User, @UploadedFile() file: Express.Multer.File, @Body() dto: UploadDto): Promise<void> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();
    const filename = await this.awsS3Service.upload(file);
    await this.uploadService.processUpload(filename, file.originalname, dto.mapping, user);
  }

  /**
   * Get upload file by upload uuid
   */
  @Get()
  async getUploadFile(
      @GetUser() user: User,
      @Query() dto: UploadGetFileDto,
  ): Promise<StreamableFile> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();
    const upload: Upload = await this.uploadService.getCheckedUpload(dto.uuid, user);
    const type = upload.originalFilename.split('.').pop();

    return new StreamableFile(this.awsS3Service.get(upload.filename), {
      type: `application/${type}`,
      disposition: `attachment; filename="${upload.uuid}.${type}"`,
    });
  }
}
