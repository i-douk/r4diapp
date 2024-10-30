import bcrypt from 'bcrypt';

async function hashPassword(password: string | Buffer) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export default hashPassword ;
