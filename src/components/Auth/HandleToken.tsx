"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import useLoginStore from "@/stores/loginStore";
import test from "@/app/api/test";
import axios from "axios";

export default function HandleToken() {
  const searchParams = useSearchParams()
  const { setToken } = useLoginStore();
  const [isReady, setIsReady] = useState(false);

  

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsReady(true); 
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    // console.log(params.get("token"));
    const token: string = params.get("token")
    setToken(token);
    
  }, [isReady, searchParams,setToken]);

  return null;
}
