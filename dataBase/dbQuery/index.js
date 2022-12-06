import { getConnection } from '..'
import { hashPassword, comparePassword } from '../../lib/auth'

export async function addUser({email, password}) {
  let connection
  try {
    connection = await getConnection()
    const userExist = await connection.db.collection('Users').count({email: email}, { limit: 1})
    if(userExist) throw Error('Email already Exist')
 
    const encryptedPassword = await hashPassword(password)
    const result = await connection.db.collection('Users').insertOne({email, password: encryptedPassword})
    connection.disconnect()
    return result
  } catch (error) {
    connection.disconnect()
    throw new Error(error)
  }
}

export async function authenticateUser({email, password}) {
  let connection
  try {
    connection = await getConnection()
    const userExist = await connection.db.collection('Users').findOne({email})
    console.log('*** userExist:', userExist)
    if(!userExist) throw Error('User Not Found')

    const authenticate = await comparePassword(password, userExist.password)
    console.log('*** authenticated:', authenticate)
    if (!authenticate) throw Error('User Not Authenticated')
    
    connection.disconnect()
    return userExist
  } catch (error) {
    connection.disconnect()
    throw error
  }
}

export async function getUserInfo({email}) {
  let connection
  let userExist
  
  try {
    connection = await getConnection()
    userExist = await connection.db.collection('Users').findOne({email})
    if(!userExist) throw Error('User Not Found')
  } catch (error){
    connection.disconnect()
    throw error
  }

  delete userExist.password
  return userExist
}