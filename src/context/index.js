import { createContext, useContext, useState } from "react";
import { loginUser } from "../Api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (values) => {
    try {
      const res = await loginUser(values);
      if (res?.data?.success) {
        localStorage.setItem("user", JSON.stringify(res?.data));
        setUser({ isAuth: true, ...res?.data });
        // toast.success(`${res?.data?.message}`, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        if (res?.data?.role === "Admin") {
          navigation("/blog");
        } else {
          navigation(`/doc/${res?.data?.userId}`);
        }
      }
    } catch (error) {
      // toast.error(`${error?.response?.data.message}`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      navigation("/signup");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
