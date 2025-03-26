import * as bcrypt from 'bcrypt';

export class EncryptingData {
  encrypt(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  isValidate(data: string, encryptData: string) {
    return bcrypt.compareSync(data, encryptData);
  }
}
