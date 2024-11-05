"use client";

import { Alert, Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "./create-user";
import { textAlign } from "@mui/system";

export default function Signup() {
  const [state, formAction] = useFormState(createUser, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack sx={{ textAlign: "center" }}>
        <Alert severity="error" sx={{ textAlign: "center" }}>
          Signup not supported.
        </Alert>
      </Stack>
    </form>
  );
}
