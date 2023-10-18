import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { useUser } from '../../Context/UserContext';
import { BACKEND_URL } from "../../../utils";

const Google = () => {
  
  const [user, setUser] = useState({})
  const { signIn, signOut } = useUser();

  const lastTab = localStorage.getItem('lastTab')

  const checkToken = () => {
    const token = localStorage.getItem("logged")
    if (token) {
      setUser(token);
      document.getElementById("signInDiv").hidden = true;
    } else {
      document.getElementById("signInDiv").hidden = false; // Show the signInDiv if there is no token
    }
  }

  const handleCallbackResponse = async (response) => {
    //console.log("JWT: " + response.credential)
    var userObj = jwt_decode(response.credential);

    const existingUser = await checkIfUserExists(userObj.email);

    if (!existingUser) {
      await createUser(userObj);
    }

    setUser(userObj);
    signIn(response.credential);
    document.getElementById("signInDiv").hidden = true;

    window.location.href = lastTab
  };

  async function checkIfUserExists(email) {
    try {
      const response = await fetch(`${BACKEND_URL}/users/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.exists;
      } else {
        console.error('Error al verificar si el usuario existe');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function createUser(userObj) {
    try {
      const response = await fetch(`${BACKEND_URL}/users/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });

      if (response.ok) {
        console.log('Usuario creado con éxito');
      } else {
        console.error('Error al crear el usuario');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignOut = (event) => {
    setUser({})
    // localStorage.removeItem("logged")
    signOut();
    document.getElementById("signInDiv").hidden = false;

  }

  useEffect(() => {
    checkToken();
    /* global google */

    google.accounts.id.initialize({ 
      client_id: import.meta.env.VITE_VERCEL_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  )
}

export default Google
