import ProfileForm from './profile-form';
import { useSession, useEffect } from 'next-auth/react';

import classes from './user-profile.module.css';


function UserProfile() {
 const {data: session, status} = useSession()

 if(status === 'loading') {
  return <p className={classes.profile}>Loading...</p>
 }

 if (!session) {
  window.location.href='auth'
 }

 async function changePasswordHandler({oldPassword, newPassword}) {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify({ oldPassword, newPassword }),
    Headers: {'Content-Type': 'application/json'}
  })
  const data = await response.json()
  console.log('*** changePasswordHandler response:', data)
 }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
