import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../components/Client";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(false);

  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let data = JSON.parse(localStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      setfName(token.user.user_metadata.first_name);
      setlName(token.user.user_metadata.last_name);
    }
  }, [token]);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, website");
      const { error } = await supabase.auth.signIn({ email });
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, website");
      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Login successful:", data);
        setToken(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Login successful:", data);
        setToken(data);
      }
      // console.log(data);

      // navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleSignOut = async function () {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    setToken(false);
    setEmail("");
    setPassword("");
    // navigate("/");
  };
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     const [data, error] = await supabase.auth.signInWithPassword({
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     if (error) throw error;
  //     console.log(data);
  //     setToken(data);
  //     navigate("/");
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  const value = {
    token,
    handleLogin,
    setEmail,
    setPassword,
    handleSignOut,
    fname,
    lname,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
