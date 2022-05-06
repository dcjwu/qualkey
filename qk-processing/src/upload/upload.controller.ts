import { Body, Controller, ForbiddenException, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role, User } from "@prisma/client";
import { Express } from "express";

import { multerOptions } from "../../config/multer.config";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { UploadDto } from "./dto";
import { UploadService } from "./upload.service";

@Controller("upload")
@UseGuards(JwtGuard)
export class UploadController {
  constructor(private uploadService: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file", multerOptions))
  async massUpload(@GetUser() user: User, @UploadedFile() file: Express.Multer.File, @Body() dto: UploadDto): Promise<void> {
    if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();

    await this.uploadService.processUpload(file.filename, dto.mapping, user);
  }
}
