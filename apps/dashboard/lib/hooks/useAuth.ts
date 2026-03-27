import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth-store";
import { getCurrentUser } from "../api/services/auth.api";

export const useAuth = () => {
  const { setUser, setLoading } = useAuthStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const init = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        setLoading(false);
      }
    };

    init();
  }, [setUser, setLoading]);
};
