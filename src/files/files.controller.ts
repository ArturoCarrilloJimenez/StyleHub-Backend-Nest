import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { DirNameFile } from './interfaces/fileType.interface';
import { DirNameFilePipe } from './pipes/dir-name-file/dir-name-file.pipe';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files, Get and Uploads')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':type/:fileName')
  @ApiTags()
  findProductImage(
    @Res() res: Response,
    @Param('type', DirNameFilePipe) type: DirNameFile,
    @Param('fileName') fileName: string,
  ) {
    const path = this.filesService.getStaticFile(type, fileName);
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  ) // Interceptor
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File, // Si usas de base Express este es el tipo file
  ) {
    if (!file) throw new BadRequestException('file is missing');

    return {
      secureUrl: `${this.configService.get('HOST_API')}files/product/${file.filename}`,
    };
  }
}
