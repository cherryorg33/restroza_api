import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./multer.config";
import type { Multer } from "multer";

@Controller("upload")
export class UploadController {
  // ✅ Single File Upload
  @Post("single")
  @UseInterceptors(FileInterceptor("file", multerOptions))
  uploadFile(@UploadedFile() file: Multer.File) {
    return {
      message: "File uploaded successfully",
      file,
    };
  }

  // ✅ Multiple Files Upload
  @Post("multiple")
  @UseInterceptors(FilesInterceptor("files", 5, multerOptions))
  uploadMultiple(@UploadedFiles() files: Multer.File[]) {
    return {
      message: "Files uploaded successfully",
      files,
    };
  }
}
