import { useIDMesh } from 'idmesh-react';
import React, { useEffect, useState } from 'react';


function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, getAccessTokenSilently } = useIDMesh();
  const onLogin = () => loginWithRedirect();
  const onLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });
  const userInfoString = JSON.stringify(user, undefined, 4);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      setAccessToken(await getAccessTokenSilently());
    };
    if (isAuthenticated) {
      getToken();
    } else {
      setAccessToken('');
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      <h1>
        Hello IDMesh
      </h1>
      <button onClick={onLogin} disabled={isLoading || isAuthenticated}>Login In</button>
      <button onClick={onLogout} style={{ marginLeft: '6px' }} disabled={isLoading || !isAuthenticated}>Log Out</button>
      { isLoading && <div>loading...</div>}
      {
        accessToken && (<>
         <h2>Access Token:</h2>
          <pre>{ accessToken }</pre>
        </>)
      }
      {
        isAuthenticated && (<>
         <h2>User Info:</h2>
          <pre>{ userInfoString }</pre>
        </>)
      }
    </>
  );
}

export default App;
