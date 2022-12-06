import { hash, compare } from 'bcryptjs'

export async function hashPassword(password) {
  const encrptedPassword =  await hash(password, 12)
  return encrptedPassword
}

export async function comparePassword(password, encryptedPassword) {
  const isSame = await compare(password, encryptedPassword)
  return isSame
}