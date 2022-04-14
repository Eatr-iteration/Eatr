import React from 'react';
import MainContainer from './Containers/MainContainer.jsx';
import LoginContainer from './Containers/LoginContainer.jsx';
import Cookies from 'js-cookie'

function App() {
  const [renderContainer, setRenderContainer] = React.useState();

  React.useEffect(() => {
    if (!Cookies.get('isLoggedIn')) {
      setRenderContainer(<LoginContainer />);
    } else {
      setRenderContainer(<MainContainer />);
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {renderContainer}
    </>

  );
}

export default App;
