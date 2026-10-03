import { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./Auth.context.jsx";
import { useCallback } from "react";

const employee_context = createContext(null);

export function useEmployee() {
  return useContext(employee_context);
}

let restored_session = null;

async function fetch_session(access_token) {
  const response = await fetch(
    "http://localhost:3000/api/user/admin/get-employee-list",
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result.data;
}

export function Employee_Provider({ children }) {
  const { access_token } = useAuth();
  const [employee, set_employee] = useState([]);
  const [loading, set_loading] = useState(true);

  const refresh_employee = useCallback(
    async function () {
      try {
        if (!restored_session) {
          restored_session = fetch_session(access_token);
        }
        const data = await restored_session;
        set_employee(data.employee_list);
      } catch (error) {
        console.log("refresh failed:", error.message);
        set_employee([]);
      } finally {
        set_loading(false);
        restored_session = null;
      }
    },
    [access_token],
  );

  useEffect(
    function () {
      refresh_employee();
    },
    [refresh_employee],
  );

  return (
    <employee_context.Provider value={{ employee, loading, refresh_employee }}>
      {children}
    </employee_context.Provider>
  );
}
