import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LoginContainer() {
  const nameField = (
    <input name="name" type="text" placeholder="Name" />
  );

  const [signUp, setSignUp] = React.useState(false);
  const [action, setAction] = React.useState('/login');
  const [button, setButton] = React.useState(<button type="button" onClick={() => setSignUp(true)}>Click Here To Sign Up</button>);

  React.useEffect(() => {
    if (signUp) {
      setAction('/signup');
      setButton(<button type="button" onClick={() => setSignUp(false)}>Back to Login Page</button>);
    } else {
      setAction('/login');
      setButton(<button type="button" onClick={() => setSignUp(true)}>Click Here To Sign Up</button>);
    }
  }, [signUp]);

  return (
    <>
      <h2>Eatr</h2>
      <form method="POST" action={action}>
        {signUp ? nameField : <> </>}
        <input name="username" type="text" placeholder="User Name" />
        <input name="password" type="text" placeholder="Password" />
        <input type="submit" value="Submit " />
        {button}
      </form>
      
    </>
  );
}

export default LoginContainer;
