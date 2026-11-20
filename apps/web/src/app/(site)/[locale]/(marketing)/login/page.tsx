"use client";
import { useEffect } from "react";

export default function LoginRedirect() {
  useEffect(() => {
    window.location.href = "http://localhost:3001/login";
  }, []);
  return null;
}
