import { Injectable, NotFoundException } from '@nestjs/common';
import { DirNameFile } from './interfaces/fileType.interface';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  constructor() {}

  getStaticFile(type: DirNameFile, fileName: string) {
    const dirName = DirNameFile[type];
    const path = join(__dirname, '../../static/', dirName, fileName);

    if (!existsSync(path))
      throw new NotFoundException(
        `File of type ${type} and name ${fileName} not find`,
      );

    return path;
  }
}
