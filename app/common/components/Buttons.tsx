import * as React from "react";
import { Button, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  disabled?: boolean;
  disableElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  type?: "button" | "submit" | "reset";
  autoFocus?: boolean; // Add autoFocus prop
}

export const LightButton: React.FC<ButtonProps> = ({
  variant = "outlined",
  size = "medium",
  color = "primary",
  disabled = false,
  disableElevation = false,
  disableFocusRipple = false,
  disableRipple = false,
  endIcon,
  fullWidth = false,
  startIcon,
  onClick,
  className,
  children,
  sx,
  type = "button",
  autoFocus = false, // default value for autoFocus
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      disableElevation={disableElevation}
      disableFocusRipple={disableFocusRipple}
      disableRipple={disableRipple}
      endIcon={endIcon}
      fullWidth={fullWidth}
      startIcon={startIcon}
      className={className}
      onClick={onClick}
      sx={sx}
      type={type}
      autoFocus={autoFocus} // Pass autoFocus to Button
    >
      {children}
    </Button>
  );
};

// SolidButton component with different default values
export const SolidButton: React.FC<ButtonProps> = ({
  variant = "contained",
  size = "medium",
  color = "primary",
  disabled = false,
  disableElevation = true,
  disableFocusRipple = false,
  disableRipple = false,
  endIcon,
  fullWidth = false,
  startIcon,
  onClick,
  className,
  children,
  sx,
  type = "button",
  autoFocus = false, // default value for autoFocus
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      disableElevation={disableElevation}
      disableFocusRipple={disableFocusRipple}
      disableRipple={disableRipple}
      endIcon={endIcon}
      fullWidth={fullWidth}
      startIcon={startIcon}
      className={className}
      onClick={onClick}
      sx={sx}
      type={type}
      autoFocus={autoFocus} // Pass autoFocus to Button
    >
      {children}
    </Button>
  );
};
