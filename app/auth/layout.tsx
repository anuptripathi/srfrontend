import { Box } from "@mui/material";
import { Logo } from "../menus/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="h-screen flex  flex-col items-center justify-center">
      <Box
        className="items-center justify-center"
        sx={{ marginBottom: "20px", display: "flex", minWidth: "300px" }}
      >
        <Logo open={true} />
      </Box>
      <Box sx={{ minWidth: "300px" }}>{children}</Box>
    </Box>
  );
}
