import bcrypt from 'bcrypt';

export default function hashPassword(
  password: string,
) {
  return bcrypt.hashSync(
    password,
    parseInt(process.env.APP_ROUND_SALT, 10),
  );
}
