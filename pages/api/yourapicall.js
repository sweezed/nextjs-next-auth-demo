import { getToken } from "next-auth/jwt";

export default async function handler (req, res, next) {
  const secret = process.env.next_auth_secret

  let token
  try {
   token = await getToken({req, secret})
   if (!token) throw new Error("No token")
  } catch (error) {
    return res.status('404').json({message: error.message})
  }
  

  console.log('JSON WEB TOKEN: ' + token)
  return res.status(200).json({message: 'token found', token: token})
}