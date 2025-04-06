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
} from "@mui/material";
import { LoginDialogProvider } from "@/contexts/LoginDialogContext";
import { usePathname } from "next/navigation";

const Avatar = dynamic(() => import("./Avatar"), { ssr: false });

export const Topbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="navigation menu"
              onClick={handleOpenNavMenu}
              sx={{ p: 0 }}
            >
              <Image src="/mobile_menu_btn.svg" alt="menu" width={48} height={48} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              disableScrollLock={true}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.href} onClick={handleCloseNavMenu}>
                  <Link href={item.href} passHref>
                    <Box
                      component="span"
                      sx={{
                        textDecoration: "none",
                        color: theme.figma.Primary.black,
                      }}
                    >
                      {item.label}
                    </Box>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-start" }}>
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
                  onClick={handleCloseNavMenu}
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
          <Box sx={{ flexGrow: 0 }}>
            <LoginDialogProvider>
              <Avatar />
            </LoginDialogProvider>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
