import React, { useState, useRef, useEffect } from "react";
import theme from "@/styles/theme";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const MobileSwipeableDrawer = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  const [bottomValue, setBottomValue] = useState("-270px");
  const contentRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  useEffect(() => {
    const contentHeight = contentRef.current?.offsetHeight;
    console.log(`-${contentHeight}px`)
    setBottomValue(open ? "0px" : `-${contentHeight}px`);
  }, [open, contentRef, isMobile]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMaskClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <Box
          onClick={handleMaskClick}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
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
          display: { xs: "block", sm: "block", md: "none" },
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
              color: theme.figma.Primary.dark_gray,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "19px",
              color: theme.figma.Primary.normal_blue,
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