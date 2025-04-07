"use client";

import React, { useState } from "react";
import theme from "@/styles/theme";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from "@mui/material";
import { LoginDialogProvider } from "@/contexts/LoginDialogContext";
import { usePathname } from "next/navigation";

const Avatar = dynamic(() => import("./Avatar"), { ssr: false });

export const Topbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const pathname = usePathname();

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  const navItems = [
    { label: "探索新專案", href: "/" },
    { label: "關於Co-Side", href: "/about" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
        pl: "4%",
        pr: "4%",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "1224px", pl: "0 !important", pr: "0 !important" }}>
        <Toolbar disableGutters sx={{ py: 2 }}>
          {/* Logo - desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <Link href="/" passHref>
              <Image src="/theme-logo.svg" alt="Co-Side" width={174} height={40} priority />
            </Link>
          </Box>

          {/* Mobile menu burger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="navigation menu"
              onClick={handleOpenDrawer}
              sx={{ p: 0 }}
            >
              <Image src="/mobile_menu_btn.svg" alt="menu" width={48} height={48} />
            </IconButton>

            <Drawer
              anchor="top"
              open={openDrawer}
              onClose={handleCloseDrawer}
              disableScrollLock
              slotProps={{
                backdrop: {
                  invisible: true,
                },
              }}
              PaperProps={{
                sx: {
                  width: '100%',
                  height: 'auto', // 根據內容自動延伸高度
                  maxHeight: '100vh', // 避免超過螢幕
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: theme.figma.Primary.white,
                  padding: "16px",
                },
              }}
            >
              <Image
                onClick={handleCloseDrawer}
                src="/mobile_menu_close.svg"
                alt="close"
                width={48}
                height={48}
                style={{
                  cursor: "pointer",
                }}
              />
              <hr style={{
                border: "none",
                borderTop: `1px solid ${theme.figma.neutral[80]}`,
                margin: "16px 0",
              }} />
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <Box
                      component="span"
                      onClick={handleCloseDrawer}
                      sx={{
                        textDecoration: "none",
                        color:
                          pathname === item.href
                            ? theme.figma.Primary.normal_blue
                            : theme.figma.Primary.black,
                        fontSize: "20px",
                        lineHeight: "23px",
                        display: "block",
                        cursor: "pointer",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </Box>
                  </Link>
                ))}
              </Box>
            </Drawer>
          </Box>

          {/* Logo - mobile (centered) */}
          <Box 
            sx={{ 
              position: "absolute", 
              left: "50%", 
              transform: "translateX(-50%)",
              display: { xs: "flex", md: "none" }
            }}
          >
            <Link href="/" passHref>
              <Image src="/coside_icon_mobile.svg" alt="Co-Side" width={42} height={39} priority />
            </Link>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: "48px", justifyContent: "flex-end" }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  disableRipple
                  sx={{
                    position: "relative",
                    color:
                      pathname === item.href
                        ? theme.figma.Primary.normal_blue
                        : theme.figma.Primary.black,
                    fontSize: "20px",
                    lineHeight: "23px",
                    p: 0,
                    backgroundColor: "transparent",
                    "&:hover": {
                      color: theme.figma.Primary.normal_blue,
                      backgroundColor: "transparent",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "block",
                      width: pathname === item.href ? "60%" : 0,
                      height: "2px",
                      backgroundColor: theme.figma.Primary.normal_blue,
                      marginTop: "4px",
                      transition: "width 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "60%",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Avatar */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" }, ml: "auto" }}>
            <LoginDialogProvider>
              <Avatar />
            </LoginDialogProvider>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};