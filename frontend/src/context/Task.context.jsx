import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useAuth } from "./Auth.context.jsx";

const task_context = createContext(null);

export function useTaskCenter() {
  return useContext(task_context);
}

let restored_session = null;

async function fetch_session(access_token) {
  const response = await fetch(
    "http://localhost:3000/api/task/get-tasks",
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export function Tasks_Provider({ children }) {
  const { access_token } = useAuth();
  const [tasks, set_tasks] = useState([]);
  const [loading, set_loading] = useState(true);

  const refresh_tasks = useCallback(
    async function () {
      try {
        if (!restored_session) {
          restored_session = fetch_session(access_token);
        }
        const data = await restored_session;
        set_tasks(data.tasks);
      } catch (error) {
        console.log("refresh failed:", error.message);
        set_tasks([]);
      } finally {
        set_loading(false);
        restored_session = null;
      }
    },
    [access_token],
  );

  useEffect(
    function () {
      refresh_tasks();
    },
    [refresh_tasks],
  );

  return (
    <task_context.Provider value={{ tasks, loading, refresh_tasks }}>
      {children}
    </task_context.Provider>
  );
}
