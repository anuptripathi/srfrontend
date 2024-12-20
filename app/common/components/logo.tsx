import AnalyticsIcon from "@mui/icons-material/Analytics";
import Typography from "@mui/material/Typography/Typography";
import Link from "next/link";
export const Logo = ({ open }: any) =>
  open && (
    <>
      <AnalyticsIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component={Link}
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        SiteRel
      </Typography>
    </>
  );
