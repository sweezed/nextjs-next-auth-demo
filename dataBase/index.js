import { MongoClient } from 'mongodb'

async function getConnection() {
    const password = process.env.mongodb_password
    const user = process.env.mongodb_username 
    const cluster = process.env.mongodb_clustername 
    const database = process.env.mongodb_database 

    const connectionString = `mongodb+srv://${user}:${password}@${cluster}.izl7m77.mongodb.net/?retryWrites=true&w=majority`
    const client = await MongoClient.connect(connectionString)
    const db = await client.db(database)
    const disconnect = () => client.close()
    return {db, disconnect}
}


export { getConnection }