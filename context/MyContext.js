"use client";
import React, { createContext, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        router.push("/sign-up"); // Adjust the route as per your application
      } else {
        setUid(user.uid);
        fetchUserr(user.uid);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const fetchUserr = async (uid) => {
    try {
      const res = await fetch(`/api/getUsers`);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const userData = await res.json();
      const data = userData.find((user) => user.uid === uid);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/getUsers`);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const userData = await res.json();
      const data = userData.find((user) => user.uid === uid);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <MyContext.Provider value={{ isOpen, setIsOpen, user, setUser, fetchUser }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
