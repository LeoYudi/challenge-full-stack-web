import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static hash = async (value: string): Promise<string> =>
    await bcrypt.hash(value, 10);

  static compare = async (value: string, hash: string): Promise<boolean> =>
    await bcrypt.compare(value, hash);
}
