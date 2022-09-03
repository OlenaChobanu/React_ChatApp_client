import React, { useEffect, useState } from "react";
import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";
import jwt_decode from "jwt-decode";

export default function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JTW ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "649630173160-rc9d4jlqtd596262rv0vr2kjbcp9gv1s.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div id="signInDiv"></div>
      {user.name !== undefined && (
        <div className="__main">
          <div id="signOutDiv">
            <button className="sign-out-btn" onClick={(e) => handleSignOut(e)}>
              Sign Out
            </button>
          </div>
          <ChatBody my_name={user.name} my_img={user.picture} />
        </div>
      )}
    </>
  );
}
