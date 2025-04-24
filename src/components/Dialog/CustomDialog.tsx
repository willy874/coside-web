"use client";

import { Dialog, DialogContent, Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function CustomDialog({
  themeColor = "blue",
  open,
  onClose,
  title,
  description,
  buttons = [],
}: {
  themeColor?: "red" | "blue";
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: {
    text: string;
    onClick: () => void;
    variant: "fill" | "outline";
    icon?: React.ReactNode;
  }[];
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const themeColors = {
    red: {
      colorFill: theme.figma.btn.fill.content_default,
      bgFill: theme.figma.status.normal_red,
      bgFillHover: "#de4545",
      colorOutline: theme.figma.form.placeholder_input,
      colorOutlineHover: theme.figma.neutral[100],
      bgOutline: theme.figma.neutral[100],
      bgOutlineHover:theme.figma.form.placeholder_input,
      borderOutline: theme.figma.form.placeholder_input,
    },
    blue: {
      colorFill: theme.figma.btn.fill.content_default,
      bgFill: theme.figma.btn.fill.bg_default_blue,
      bgFillHover: theme.figma.btn.fill.bg_hover_blue,
      colorOutline: theme.figma.Primary.normal_blue,
      colorOutlineHover: theme.figma.Primary.normal_blue,
      bgOutline: theme.figma.neutral[100],
      bgOutlineHover: theme.figma.Primary.extra_light_blue,
      borderOutline: theme.figma.Primary.normal_blue,
    },
  };

  const activeTheme = themeColors[themeColor];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock
      PaperProps={{
        sx: {
          maxWidth: "370px",
          width: "100%",
          gap: "32px",
          borderRadius: "12px",
          padding: isMobile ? "48px 24px 24px" : "40px 32px",
          mx: "20px",
          height: "auto",
          overflowY: "visible",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          gap: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Title section */}
          {title && (
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                color: theme.figma.form.text_default,
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              }}
            >
              {title}
            </Typography>
          )}

          {/* Description section */}
          {description && (
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                color: theme.figma.form.text_default,
                textAlign: "center",
                width: "100%",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* Buttons section */}
        {buttons.length > 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: "12px", md: "20px" },
              mt: 0, // Removed margin top to fix spacing
            }}
          >
            {buttons.map((btn, idx) => (
              <Button
                key={idx}
                onClick={btn.onClick}
                variant={btn.variant === "fill" ? "contained" : "outlined"}
                sx={{
                  display: "block",
                  fontWeight: "normal",
                  boxShadow: "none",
                  maxWidth: { xs: "none", md: "288px" },
                  width: "100%",
                  color:
                    btn.variant === "fill"
                      ? activeTheme.colorFill
                      : activeTheme.colorOutline,
                  bgcolor:
                    btn.variant === "fill"
                      ? activeTheme.bgFill
                      : activeTheme.bgOutline,
                  border:
                    btn.variant === "fill"
                      ? "none"
                      : `1px solid ${activeTheme.borderOutline}`,
                  borderRadius: "12px",
                  textDecoration: "none",
                  padding: btn.variant === "fill" ? "11px 16px" : "10px 16px",
                  fontSize: "16px",
                  lineHeight: "19px",
                  "&:hover": {
                    color:
                      btn.variant === "fill"
                        ? activeTheme.colorFill
                        : activeTheme.colorOutlineHover,
                    boxShadow: "none",
                    bgcolor:
                      btn.variant === "fill"
                        ? activeTheme.bgFillHover
                        : activeTheme.bgOutlineHover,
                    borderColor:
                      btn.variant === "fill"
                        ? "transparent"
                        : activeTheme.borderOutline,
                  },
                }}
              >
                {btn.icon && (
                  <Box
                    component="span"
                    sx={{
                      mr: 1,
                      display: "inline-flex",
                      verticalAlign: "middle",
                    }}
                  >
                    {btn.icon}
                  </Box>
                )}
                {btn.text}
              </Button>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
