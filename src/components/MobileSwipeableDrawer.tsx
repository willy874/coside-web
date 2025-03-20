import React, { useState, useRef, useEffect } from "react";
import theme from "@/styles/theme";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const MobileSwipeableDrawer = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  const [bottomValue, setBottomValue] = useState("-270px");
  const contentRef = useRef(null);
  const muiTheme = useTheme();
  const isBelowMd = useMediaQuery(muiTheme.breakpoints.down("md"));

  useEffect(() => {
    const contentHeight = contentRef.current?.offsetHeight;
    setBottomValue(open ? "0px" : `-${contentHeight}px`);
  }, [open, contentRef]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMaskClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  if (!isBelowMd) {
    return null; // 如果不是 md 尺寸以下，則不渲染
  }

  return (
    <>
      {open && (
        <Box
          onClick={handleMaskClick}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1199,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: bottomValue,
          left: 0,
          right: 0,
          zIndex: 1200,
          transition: "bottom 0.3s ease-in-out",
          bgcolor: "#fff",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <Box
          onClick={toggleDrawer}
          sx={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            boxShadow: "0px -2px 12px rgba(0, 0, 0, 0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: open ? "12px 12px 8px" : "6px 16px 16px",
            cursor: "pointer",
            gap: "5px",
          }}
        >
          <DragHandleIcon
            sx={{
              fontSize: "24px",
              lineHeight: "24px",
              color: theme.primary.dark_gray,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "19px",
              color: theme.primary.normal_blue,
              textAlign: "center",
              fontWeight: "bold",
              display: open ? "none" : "block",
            }}
          >
            {title || "選單標題"}
          </Typography>
        </Box>

        <Box
          ref={contentRef}
          sx={{
            backgroundColor: "#fff",
            padding: "0 16px 16px 16px",
          }}
        >
          {content}
        </Box>
      </Box>
    </>
  );
};

export default MobileSwipeableDrawer;