import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createUser({email, password}) {
  const response = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  if(!response.ok) throw new Error(data.message || 'Something went wrong')

  return data
}

function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const { data: session, status } = useSession()
  const emailRef = useRef()
  const passwordRef = useRef()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value
    const password = passwordRef.current.value
  
    if (isLogin) {
      // log user in
      const results = await signIn('credentials', {redirect: false, email, password})
      console.log('results:', results)
      if(!results.error) {
        router.replace('/profile')
      }
    } else {
      try {
        const result = await createUser({email, password})
        console.log('result', result)
        setIsLogin(true)
      } catch (error) {
        console.log('*** createUser:error:', error)
      }
    }
  }

  console.log('session', session)
  console.log('status', status)
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
