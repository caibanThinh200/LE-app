import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadService(file: Express.Multer.File) {
    return file;
  }
}
