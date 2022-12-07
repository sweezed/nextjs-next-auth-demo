import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react'

function AuthPage() {
  return <AuthForm />;
}

export default AuthPage;


export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({req})

  if(session) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile',
      },
    }
  }

  return {
    props: {},
  }
}