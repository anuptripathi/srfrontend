"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import login from "./login";
import { SolidButton } from "@/app/common/components/Buttons";

export default function Login() {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          error={!!state?.error}
          helperText={state?.error}
          name="email"
          label="Email"
          variant="outlined"
          type="email"
        />
        <TextField
          error={!!state?.error}
          helperText={state?.error}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <SolidButton type="submit">Login</SolidButton>
      </Stack>
    </form>
  );
}
