// components/Breadcrumb.tsx
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation";

interface BreadcrumbProps {
  items?: { name: string; link?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter();
  const currPath = usePathname();
  const currentPath = currPath.split("/").filter(Boolean);
  const pageName =
    currentPath.length > 0 ? currentPath[currentPath.length - 1] : "Dashboard";
  const formattedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1);

  const defaultBreadcrumbs = [
    <Link key="1" href="/" style={{ textDecoration: "none", color: "#1976d2" }}>
      Dashboard
    </Link>,
    <Typography key="2" color="text.primary">
      {formattedPageName}
    </Typography>,
  ];

  const providedBreadcrumbs = items
    ? items.map((item, index) =>
        item.link ? (
          <Link
            key={index}
            href={item.link}
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            {item.name}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.name}
          </Typography>
        )
      )
    : defaultBreadcrumbs;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {providedBreadcrumbs}
    </Breadcrumbs>
  );
}
