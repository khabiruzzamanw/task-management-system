import { useState, useEffect, useContext, createContext } from "react";

const auth_context = createContext(null);

export function useAuth() {
  return useContext(auth_context);
}

let restored_session = null;

async function fetch_session() {
  const response = await fetch(
    "http://localhost:3000/api/authentication/refresh-tokens",
    { credentials: "include" },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export function Auth_Provider({ children }) {
  const [user, set_user] = useState(null);
  const [access_token, set_access_token] = useState(null);
  const [loading, set_loading] = useState(true);

  useEffect(function () {
    async function refresh_session() {
      try {
        if (!restored_session) {
          restored_session = fetch_session();

        }
        const data = await restored_session;
        set_user(data.user);
        set_access_token(data.accessToken);
      } catch (error) {
          console.log("refresh failed:", error.message);
        set_user(null);
        set_access_token(null);
      } finally {
        set_loading(false);
          restored_session = null;
      }
    }

    refresh_session();
  }, []);

  return (
    <auth_context.Provider
      value={{ user, set_user, access_token, set_access_token, loading }}
    >
      {children}
    </auth_context.Provider>
  );
}
