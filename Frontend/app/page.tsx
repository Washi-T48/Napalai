"use client"

import Image from "next/image"
import Navber from "./component/navber";
import LoginBox from "./component/loginBox";
import { useState } from "react";
import { count } from "console";
import Link from "next/link";

function Home() {


  return (
    <>
    <Navber/>
    <LoginBox/>
    </>
  )
}

export default Home;