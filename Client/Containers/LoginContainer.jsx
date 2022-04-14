import React from 'react';

function LoginContainer() {
  const nameField = (
    <input name="name" type="text" placeholder="Name" />
  );

  const [header, setHeader] = React.useState('Log In');
  const [signUp, setSignUp] = React.useState(false);
  const [action, setAction] = React.useState('/login');
  const [button, setButton] = React.useState(<button type="button" onClick={() => setSignUp(true)}>Click Here To Sign Up</button>);

  React.useEffect(() => {
    if (signUp) {
      setHeader('Signup');
      setAction('/signup');
      setButton(<button type="button" onClick={() => setSignUp(false)}>Back to Login Page</button>);
    } else {
      setHeader('Log In');
      setAction('/login');
      setButton(<button type="button" onClick={() => setSignUp(true)}>Click Here To Sign Up</button>);
    }
  }, [signUp]);

  return (
    <form method="POST" action={action}>
      {header}
      {signUp ? nameField : <> </>}
      <input name="username" type="text" placeholder="User Name" />
      <input name="password" type="text" placeholder="Password" />
      <input type="submit" value="Submit" id="submit" />
      {button}
    </form>
  );
}

export default LoginContainer;
