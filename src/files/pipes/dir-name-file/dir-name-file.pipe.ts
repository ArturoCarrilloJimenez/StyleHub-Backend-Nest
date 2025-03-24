import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { DirNameFile } from 'src/files/interfaces/fileType.interface';

@Injectable()
export class DirNameFilePipe implements PipeTransform {
  private readonly allowedTypes = Object.values(DirNameFile);

  transform(value: any, metadata: ArgumentMetadata) {
    if (this.allowedTypes.includes(value))
      throw new BadRequestException(`Type ${value} is not valid`);

    return value;
  }
}
