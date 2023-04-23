import { ReactNode, createContext, useContext, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api";

type TUser = {
  name: string;
  email: string;
  avatar: string;
  imageUrl: string;
};

interface AppContextInterface {
  user: TUser | undefined;
  error: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  setError: (error: boolean) => void;
}

const AuthContext = createContext<AppContextInterface | undefined>(undefined);

export function ProviderAuth({ children }: { children: ReactNode }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState<TUser>();
  const [error, setError] = useState(false);

  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const signIn = async (email: string, password: string) => {
    const { data: access_token } = await axios.post(
      endPoints.auth.login,
      {
        email,
        password,
      },
      options
    );

    if (access_token) {
      const token = access_token.access_token;
      Cookie.set("token", token, { expires: 5 });

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }

    // console.log(access_token);
  };

  return {
    user,
    signIn,
    error,
    setError,
  };
}
