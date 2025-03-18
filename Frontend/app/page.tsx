"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      router.push("/viewPage"); 
    }
    else {
      router.push("/login")
    }
  }, [router]);

  return (
    <>
    </>
  );
}

export default Home;