import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const {data: session, status,  } = useSession()

 function signOutHandler() {
    signOut()
  }
  
  console.log('MainNavigation: session', session, status)
  return (
    <header className={classes.header}>
      <Link href='/'>
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status !== 'loading' &&
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          }
          {session && (
            <>
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={() => signOutHandler()}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
