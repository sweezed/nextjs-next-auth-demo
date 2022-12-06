import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials"
import { authenticateUser, getUserInfo } from '../../../dataBase/dbQuery'

export default NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialProvider({
      type:"credentials",
      authorize: async (credentials) => {
        let user
        try {
          user = await authenticateUser(credentials)
        } catch (error) {
          throw new Error(error.message)
        }
        
        if(user) {
          delete user.password
          return  user
        }
    
        return null
      }
    })
  ],
  secret: process.env.next_auth_secret,
  callbacks: {
    async signIn ({ user }) {
      return user
    },
    async session({ session, token }) {
      console.log('____ session ____')

      if (token.session) {
        session = token.session
      }
      
      if (token.access) {
        session = token.access
      }
    
      console.log('retuning session:', session)
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      /*
         *** called twice 
          - first time called will be for access token. 
            add your profile/ account contents here(wont have token.iat)
          - second time called will be token for session will have iat
      */
      
      console.log(' ____ jwt ___', token)
      if (token.iat) {
        // session token
        token.session =  token.email
      } else {
        //access token
        token.access = {
          profile: {
            ...user,
            newUser: isNewUser
          }
        }
      }
      console.log('returning token:', token)
      return token;
    },
  },
})