import './App.css';
import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useEffect, useState} from 'react';

function App() {
  const clientId = '835585676683-p3uj7ktuqfsniamfrc0ck41psc3s8bu0.apps.googleusercontent.com';
  const [ profile, setProfile ] = useState([]);
  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
            clientId: clientId,
            scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
      console.log('success:', res);
      setProfile(res.profileObj);
    };
    const onFailure = (err) => {
      console.log('failed:', err);
    };
    const logOut = () => {
      setProfile(null);
  };

  return (
    <div>
    <h2>QR Scanner Google Login</h2>
    <br />
    <br />
    {profile ? (
        <div>
            <img src={profile.imageUrl} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
    ) : (
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )}
</div>
);
  }


export default App;