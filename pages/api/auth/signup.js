import { addUser } from '../../../dataBase/dbQuery'

function isValid({email, password}) {
  const valid = email && email.includes('@') && email.trim() !== '' &&  password.split("").length > 5
  return valid
}

export default async function handler(req, res) {
  const method = req.method
  if (method !== 'POST') return

  const { email, password } = req.body
  if (!isValid({email, password})) return res.status(422).json({message: 'Invalid credentials'}) 

  try {
    const result = await addUser({email, password})
    return res.status(201).json({message: 'User added successfully.', user: result})
  } catch (error) {
    return res.status(500).json({message: `Failed!, Error: ${error.message}`})
  }
}