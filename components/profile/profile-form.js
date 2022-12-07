import classes from './profile-form.module.css';


function ProfileForm({onChangePassword}) {
  function submitHandler(event) {
    event.preventDefault();

    const form = event.target
    const formData = new FormData(form)
    const oldPassword = formData.get('old-password')
    const newPassword = formData.get('new-password')

    onChangePassword({
      oldPassword,
      newPassword,
    })
  }

  return (
    <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' name='new-password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' name='old-password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
