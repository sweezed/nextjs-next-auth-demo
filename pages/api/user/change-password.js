import { getSession } from "next-auth/react"
import { changePassword } from "../../../dataBase/dbQuery"

export default async function handler (req, res, next) {
  if (req.method !== 'PATCH') {
    return res.status(500).json({message: 'Invalid request'})
  }

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({message: 'Not authenticated'})
  }

  const email = session.profile.email
  const oldpassword = req.body.oldPassword
  const newpassword = req.body.newPassword

  console.log(email, oldpassword, newpassword)
  try {
    await changePassword({oldpassword, newpassword, email})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

  return res.status(200).json({message: 'Successfully updated password'})
}