import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/react'

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const { req } = context

  const session = await  getSession({req})

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return  {
    props: {
      session
    }
  }
}

export default ProfilePage;
