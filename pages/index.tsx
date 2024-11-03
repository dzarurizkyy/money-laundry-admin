import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Index: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const login = localStorage.getItem("login")
    login ? router.push("/home") : router.push("/login")
  }, [])

  return null
};

export default Index;
