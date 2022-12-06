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
          console.log('NextAuth:error:', error)
        }
        
        if(user) {
          delete user.password
          return  user
        }
    
        return null
      }
    })
  ],
  secret: 'mySecret',
  callbacks: {
    async signIn ({ user }) {
      return user
    },
    async session({ session, token }) {
      /* if needed info in your session id -- could be another db call
        // const profile = await getUserInfo({email: token.email})
        // session.profile = profile
      */
      console.log('____ session ____')
      console.log('token')
      session.profile = token
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      token.user = user;
      if (user)  {
        token.user = user
        token.newUser = isNewUser
      }

      /* Will see token displayed twice on sign in. Believe first time is your access token.
        access token/ authorization token will contain user information. 
        the other time will be your session/authentication 
        token wont contain user information - just email  
      */
     console.log('______ jwt _______')
      console.log('token:', token)
      
      return token;
    },
    
  },
})