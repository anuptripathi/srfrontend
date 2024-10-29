"use client";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useContext(AuthContext);
  const router = useRouter();
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  return (
    !isAuthenticated && (
      <Box className="h-screen flex items-center justify-center">
        {children}
      </Box>
    )
  );
}
